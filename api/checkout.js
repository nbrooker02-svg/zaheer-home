import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PRICES = {
  'ship-stack': process.env.STRIPE_SHIP_STACK_PRICE_ID,
  'all-access-monthly': process.env.STRIPE_MONTHLY_PRICE_ID,
  'all-access-yearly': process.env.STRIPE_YEARLY_PRICE_ID,
}

const SITE_URL = process.env.SITE_URL || 'https://www.zaheer.studio'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { productKey, userId, cancelPath } = req.body
  const priceId = PRICES[productKey]

  if (!priceId) return res.status(400).json({ error: 'Unknown product' })

  const isSubscription = productKey.startsWith('all-access')

  try {
    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? 'subscription' : 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${SITE_URL}/studio/library?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}${cancelPath || '/pricing'}`,
      phone_number_collection: { enabled: false },
      metadata: {
        userId: userId || '',
        packId: productKey,
      },
      ...(isSubscription && {
        subscription_data: { metadata: { userId: userId || '' } },
      }),
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
