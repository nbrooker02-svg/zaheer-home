import { createClient } from '@supabase/supabase-js'
import { packs } from '../src/data/packs.js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { userId, packId } = req.body
  if (!userId || !packId) return res.status(400).json({ error: 'Missing params' })

  const pack = packs.find(p => p.id === packId)
  if (!pack || !pack.storageKey) return res.status(404).json({ error: 'File not found' })

  // Free packs only require a logged-in user. Paid packs require purchase or active sub.
  if (pack.price !== 'Free') {
    const [{ data: purchase }, { data: subscription }] = await Promise.all([
      supabase.from('purchases').select('id').eq('user_id', userId).eq('pack_id', packId).maybeSingle(),
      supabase.from('subscriptions').select('status').eq('user_id', userId).maybeSingle(),
    ])

    const hasAccess = !!purchase || subscription?.status === 'active'
    if (!hasAccess) return res.status(403).json({ error: 'No access' })
  }

  const { data, error } = await supabase.storage
    .from('packs')
    .createSignedUrl(pack.storageKey, 3600)

  if (error) return res.status(500).json({ error: error.message })

  return res.status(200).json({ url: data.signedUrl })
}
