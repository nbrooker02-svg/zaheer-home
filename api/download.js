import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { userId, packId } = req.body
  if (!userId || !packId) return res.status(400).json({ error: 'Missing params' })

  // Verify user has access: purchased this pack or has active subscription
  const [{ data: purchase }, { data: subscription }] = await Promise.all([
    supabase.from('purchases').select('id').eq('user_id', userId).eq('pack_id', packId).single(),
    supabase.from('subscriptions').select('status').eq('user_id', userId).single(),
  ])

  const hasAccess = !!purchase || subscription?.status === 'active'
  if (!hasAccess) return res.status(403).json({ error: 'No access' })

  // Map pack ID to storage path
  const storagePaths = {
    'ship-stack': 'ship-stack/ship-stack.zip',
  }

  const path = storagePaths[packId]
  if (!path) return res.status(404).json({ error: 'File not found' })

  const { data, error } = await supabase.storage
    .from('packs')
    .createSignedUrl(path, 3600) // 1 hour expiry

  if (error) return res.status(500).json({ error: error.message })

  return res.status(200).json({ url: data.signedUrl })
}
