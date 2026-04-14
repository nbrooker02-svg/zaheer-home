import fs from 'fs'
import path from 'path'

// TEST MODE token — remove this once the real Stripe flow is confirmed working
const TEST_SESSION_ID = 'test_preview_2026'

// Actual ZIP filename in public/
const ZIP_FILENAME = 'Zaheer Studio |Ship Stack - AI App Builder Agent.zip'
const ZIP_DOWNLOAD_NAME = 'ship-stack.zip'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { sessionId } = req.body

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId' })
  }

  // Test mode bypass — skips Stripe verification so the download flow can be tested
  // without a real payment. Remove this block once confirmed working.
  if (sessionId !== TEST_SESSION_ID) {
    // IMPORTANT: Add STRIPE_SECRET_KEY to Vercel environment variables before going live.
    // Dashboard → Project → Settings → Environment Variables
    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    let session
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId)
    } catch {
      return res.status(403).json({ error: 'Invalid session ID' })
    }

    if (session.payment_status !== 'paid') {
      return res.status(403).json({ error: 'Payment not completed' })
    }
  }

  const zipPath = path.join(process.cwd(), 'public', ZIP_FILENAME)

  if (!fs.existsSync(zipPath)) {
    return res.status(503).json({ error: 'File not yet available' })
  }

  const fileBuffer = fs.readFileSync(zipPath)

  res.setHeader('Content-Type', 'application/zip')
  res.setHeader('Content-Disposition', `attachment; filename="${ZIP_DOWNLOAD_NAME}"`)
  res.setHeader('Content-Length', fileBuffer.length)
  return res.status(200).send(fileBuffer)
}
