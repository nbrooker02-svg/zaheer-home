import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { packs } from '../src/data/packs.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const config = { api: { bodyParser: false } }

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

async function sendWelcomeEmail({ email, mode, packId }) {
  if (!email || !process.env.RESEND_API_KEY) return

  const isSub = mode === 'subscription'
  const pack = packs.find(p => p.id === packId)
  const packName = pack?.name || packId

  const subject = isSub
    ? 'Studio All-Access activated — every pack is yours'
    : `Welcome to Zaheer Studios — your ${packName} is ready`

  const intro = isSub
    ? `<p>Thanks for going All-Access. Every pack we ship — current and future — is yours.</p>`
    : `<p>Thanks for grabbing <strong>${packName}</strong>. You're set up.</p>`

  const futureLine = isSub
    ? `<p>We'll email you when new packs ship. You don't need to do anything to get them — they'll just appear in your library.</p>`
    : ''

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #41403C; max-width: 560px; margin: 0 auto; padding: 24px; line-height: 1.6;">
      <h1 style="font-size: 22px; margin: 0 0 16px;">${isSub ? 'All-Access activated' : `Your ${packName} is ready`}</h1>
      ${intro}
      <p style="margin-top: 24px;"><strong>To download:</strong></p>
      <ol style="padding-left: 20px;">
        <li>Sign in at <a href="https://zaheer.studio/studio/auth" style="color: #AA210F;">zaheer.studio/studio/auth</a> using <strong>${email}</strong></li>
        <li>Open your library — your ${isSub ? 'packs are' : 'pack is'} there</li>
        <li>Hit Download — you'll get the zip</li>
      </ol>
      ${futureLine}
      <p style="margin-top: 24px;">Questions or issues? Just reply to this email.</p>
      <p style="margin-top: 32px; color: #6B6A67;">— Nathan<br/>Zaheer Studios</p>
    </div>
  `

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Zaheer Studios <noreply@zaheer.studio>',
        to: [email],
        reply_to: 'hello@zaheer.studio',
        subject,
        html,
      }),
    })
  } catch (err) {
    console.error('Welcome email failed:', err)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const rawBody = await getRawBody(req)
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).json({ error: `Webhook error: ${err.message}` })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const { userId, packId } = session.metadata
        if (!userId) break

        if (session.mode === 'payment') {
          await supabase.from('purchases').insert({
            user_id: userId,
            pack_id: packId,
            stripe_session_id: session.id,
            amount: session.amount_total,
          })
        }

        if (session.mode === 'subscription') {
          await supabase.from('subscriptions').upsert({
            user_id: userId,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            status: 'active',
            plan: packId === 'all-access-yearly' ? 'yearly' : 'monthly',
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' })
        }

        // Fire welcome email — non-blocking, errors are swallowed inside
        const buyerEmail = session.customer_details?.email || session.customer_email
        await sendWelcomeEmail({ email: buyerEmail, mode: session.mode, packId })
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object
        await supabase
          .from('subscriptions')
          .update({
            status: sub.status,
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', sub.id)
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return res.status(500).json({ error: 'Internal error' })
  }

  return res.status(200).json({ received: true })
}
