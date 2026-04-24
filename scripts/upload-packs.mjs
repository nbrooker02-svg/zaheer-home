// Zip every folder in packs-source/ and upload to the Supabase Storage `packs` bucket.
// Run: npm run packs:upload   (or with --pack=ship-stack to upload one)
//
// Reads SUPABASE creds from .env.local. Each subfolder becomes:
//   packs-source/<id>/         →   packs bucket: <id>/<id>.zip
//
// Files are private. Site downloads happen via signed URLs from /api/download.

import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'
import AdmZip from 'adm-zip'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SOURCE_DIR = join(ROOT, 'packs-source')
const BUCKET = 'packs'

// Load .env.local manually so we don't need dotenv as a runtime dep
const envPath = join(ROOT, '.env.local')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m && !process.env[m[1]]) {
      let value = m[2].trim()
      // Strip wrapping quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      process.env[m[1]] = value
    }
  }
}

const url = process.env.VITE_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } })

// --pack=<id> filter
const onlyPack = process.argv.find(a => a.startsWith('--pack='))?.split('=')[1]

const packs = readdirSync(SOURCE_DIR)
  .filter(name => statSync(join(SOURCE_DIR, name)).isDirectory())
  .filter(name => !name.startsWith('.'))
  .filter(name => !onlyPack || name === onlyPack)

if (packs.length === 0) {
  console.log(onlyPack ? `No pack folder named "${onlyPack}".` : 'No pack folders found in packs-source/.')
  process.exit(0)
}

for (const packId of packs) {
  const packDir = join(SOURCE_DIR, packId)
  const entries = readdirSync(packDir).filter(n => !n.startsWith('.'))
  if (entries.length === 0) {
    console.log(`⊘  ${packId} — folder is empty, skipping`)
    continue
  }

  let buffer
  const zipFiles = entries.filter(n => n.toLowerCase().endsWith('.zip'))

  if (zipFiles.length === 1 && entries.length === 1) {
    // Pre-built zip dropped in — upload as-is
    buffer = readFileSync(join(packDir, zipFiles[0]))
    console.log(`   ${packId} — using pre-built zip: ${zipFiles[0]}`)
  } else if (zipFiles.length > 0) {
    console.error(`✗  ${packId} — folder contains both .zip files and other files. Either drop in a single .zip OR raw files, not both.`)
    process.exit(1)
  } else {
    // Build a zip from raw files, ignoring hidden/system files
    const zip = new AdmZip()
    zip.addLocalFolder(packDir, packId, (filename) => {
      const base = filename.split('/').pop()
      return !base.startsWith('.')
    })
    buffer = zip.toBuffer()
  }

  const remotePath = `${packId}/${packId}.zip`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(remotePath, buffer, {
      contentType: 'application/zip',
      upsert: true,
    })

  if (error) {
    console.error(`✗  ${packId} — upload failed:`, error.message)
    process.exit(1)
  }
  const sizeKb = (buffer.length / 1024).toFixed(1)
  console.log(`✓  ${packId} → ${BUCKET}/${remotePath}  (${sizeKb} KB)`)
}

console.log('\nDone.')
