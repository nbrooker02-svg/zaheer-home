import fs from 'fs'
import path from 'path'
import Stripe from 'stripe'

// IMPORTANT: Add STRIPE_SECRET_KEY to Vercel environment variables before going live.
// Dashboard → Project → Settings → Environment Variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { sessionId } = req.body

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId' })
  }

  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return res.status(403).json({ error: 'Invalid session ID' })
  }

  if (session.payment_status !== 'paid') {
    return res.status(403).json({ error: 'Payment not completed' })
  }

  // IMPORTANT: ship-stack.zip must be added to the public/ folder before going live.
  const zipPath = path.join(process.cwd(), 'public', 'ship-stack.zip')

  if (!fs.existsSync(zipPath)) {
    return res.status(503).json({ error: 'File not yet available' })
  }

  const fileBuffer = fs.readFileSync(zipPath)

  res.setHeader('Content-Type', 'application/zip')
  res.setHeader('Content-Disposition', 'attachment; filename="ship-stack.zip"')
  res.setHeader('Content-Length', fileBuffer.length)
  return res.status(200).send(fileBuffer)
}
