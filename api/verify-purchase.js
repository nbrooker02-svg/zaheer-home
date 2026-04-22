import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { sessionId } = req.body
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' })

  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return res.status(403).json({ error: 'Invalid session' })
  }

  if (session.payment_status !== 'paid' && session.status !== 'complete') {
    return res.status(400).json({ error: 'Payment not completed' })
  }

  const { userId, packId } = session.metadata
  if (!userId) return res.status(400).json({ error: 'Missing userId in session' })

  try {
    if (session.mode === 'payment') {
      await supabase.from('purchases').upsert({
        user_id: userId,
        pack_id: packId,
        stripe_session_id: session.id,
        amount: session.amount_total,
      }, { onConflict: 'stripe_session_id' })
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

    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
