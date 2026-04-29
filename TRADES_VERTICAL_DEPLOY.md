# /trades vertical — deployment & manual ops

Reference doc for shipping the `/trades` restructure across three repos:
**zaheer-home**, **permitpilot**, **backbill**. After deploy, repeat the
"clone a new vertical" recipe at the bottom for `/finance`, `/builders`, etc.

---

## What's in this restructure

| Repo | URL change | Risk |
|---|---|---|
| zaheer-home | new `/trades` route, vercel.json rewrites, robots/sitemap/llms.txt | None (additive). Main homepage untouched. |
| permitpilot | basePath `/apps/permitpilot` → `/trades/permitpilot` | **Live URLs change.** 301s in place. |
| backbill | base `/apps/backbill` → `/trades/backbill` | None (no shared URLs yet). |

---

## Manual ops you must do (cannot be done in code)

### 1 · Clerk dashboard — both apps

Open https://dashboard.clerk.com → select each app's instance → **Customization → Paths**.

**PermitPilot — production instance** (`pk_live_...`):
- Sign-in URL: `/trades/permitpilot/sign-in`
- Sign-up URL: `/trades/permitpilot/sign-up`
- After sign-in: `/trades/permitpilot/dashboard`
- After sign-up: `/trades/permitpilot/dashboard`
- After sign-out: `/trades/permitpilot/`

Then **Customization → Domains** — verify `clerk.zaheer.studio` is still the
production frontend domain (no change).

**BackBill — production instance**:
- Same pattern but with `/trades/backbill/...` paths.

### 2 · Stripe — Customer Portal return URL

Stripe → **Settings → Billing → Customer Portal** → Default return URL.
- For the BackBill account flow this is set in code (`api/billing.js`), no
  dashboard change needed.
- For PermitPilot it's set in code (`app/api/billing/portal/route.ts`), no
  dashboard change needed.

If either app uses **a Stripe-hosted webhook** with a hard-coded return URL
in the webhook config, update it to `https://www.zaheer.studio/trades/<app>`.

### 3 · Vercel env vars

**zaheer-home** — no changes.

**permitpilot** — Vercel dashboard → permitpilot project → Settings → Env Vars:
- No new vars needed. The basePath is in `next.config.mjs`. Confirm
  `NEXT_PUBLIC_APP_URL` (if set) is updated to `https://www.zaheer.studio/trades/permitpilot`.

**backbill** — Vercel dashboard → backbill project → Settings → Env Vars:
- Update `APP_URL` to `https://www.zaheer.studio/trades/backbill` (was
  `https://www.zaheer.studio/apps/backbill`). The code falls back to the new
  path if unset, but setting it explicitly is safer.

### 4 · Resend / email links

- BackBill: `api/cors/[id]/send.js` uses `APP_URL` for the COR review URL —
  follows the env var update above.
- PermitPilot: emails (if any) use the basePath via Next.js routing — no
  manual change.

### 5 · Sentry

PermitPilot uses Sentry. The org slug `zaheer-studio` and project `permitpilot`
in `next.config.mjs` are just identifiers — no change needed.

### 6 · Search Console (optional but recommended)

After deploy:
1. Submit the new sitemap: https://www.zaheer.studio/sitemap.xml
2. Submit the per-app sitemaps: `/trades/permitpilot/sitemap.xml`, `/trades/backbill/sitemap.xml`.
3. Use Google Search Console's URL Inspection tool to request re-indexing of:
   - `/trades`
   - `/trades/permitpilot`
   - `/trades/backbill`
4. Old `/apps/permitpilot/*` URLs will fall out of the index over a few weeks
   as Google honors the 301s.

---

## Deploy order

The 301s rely on two-repo coordination. Deploy in this exact order to
minimize the broken-URL window for `/apps/permitpilot/*` traffic.

### Pre-flight (do once)

- [ ] Land all three repos' commits locally
- [ ] Run `npm run build` in each — all three should pass
- [ ] Update Clerk dashboard paths for both apps (§1 above) **before** deploying
- [ ] Update Vercel env var for backbill APP_URL (§3 above)

### Deploy sequence

1. **Deploy permitpilot first.** `cd apps/permitpilot && vercel --prod` (or
   push to `main`). Wait for the deployment to finish and verify
   https://permitpilot-topaz.vercel.app/trades/permitpilot loads.

   ⚠️ During this ~2-min window, `https://www.zaheer.studio/apps/permitpilot`
   will 404 because zaheer-home is still proxying to the old upstream path.
   Pick a low-traffic time. If you have any active users, consider posting a
   brief notice.

2. **Deploy zaheer-home immediately after.** Push to `main` or `vercel --prod`.
   This activates the 301 (`/apps/permitpilot/*` → `/trades/permitpilot/*`)
   and the new rewrite. After this lands, old bookmarks resolve correctly.

3. **Deploy backbill any time.** `cd apps/backbill && vercel --prod`. No
   shared URLs to worry about; the 301 in zaheer-home covers `/apps/backbill`
   if anything was linked to it.

### Post-deploy smoke test

```bash
# 301 redirects
curl -sI https://www.zaheer.studio/apps/permitpilot         # expect 308 → /trades/permitpilot
curl -sI https://www.zaheer.studio/apps/backbill            # expect 308 → /trades/backbill

# New paths resolve
curl -sI https://www.zaheer.studio/trades                   # 200
curl -sI https://www.zaheer.studio/trades/permitpilot       # 200
curl -sI https://www.zaheer.studio/trades/backbill          # 200

# SEO files
curl -s  https://www.zaheer.studio/robots.txt
curl -s  https://www.zaheer.studio/sitemap.xml
curl -s  https://www.zaheer.studio/trades/llms.txt
```

Auth flows to test in a browser:
- Open `https://www.zaheer.studio/trades/permitpilot/sign-in`, sign in, land
  on `/trades/permitpilot/dashboard`
- Repeat for `/trades/backbill/sign-in`
- Click any "Start subscription" CTA in PermitPilot → confirm the Stripe
  checkout success URL is `https://www.zaheer.studio/trades/permitpilot/settings?upgraded=true`

### Rollback plan

If anything breaks, revert the three commits:
- zaheer-home: `git revert <commit>` and redeploy
- permitpilot: revert and redeploy (basePath returns to `/apps/permitpilot`)
- backbill: revert and redeploy

The 301 in zaheer-home also functions in reverse — pointing the redirect
the other way for a quick band-aid.

---

## Cloning for a new vertical (e.g. `/finance`, `/builders`)

1. Copy `src/data/verticals/_template.js` → `src/data/verticals/finance.js`
2. Fill in: slug, brand, copy, products, FAQ, footer.
3. In `src/main.jsx`, add:
   ```jsx
   import { finance } from './data/verticals/finance'
   // ...
   <Route path="/finance" element={<VerticalHub config={finance} />} />
   ```
4. Add `public/finance/llms.txt` (copy `public/trades/llms.txt` and update).
5. Append `/finance`, `/finance/<product>` URLs to `public/sitemap.xml`.
6. Add an `Allow: /finance` line to `public/robots.txt`.
7. For each product app under that vertical (if any): repeat the basePath
   migration the same way PermitPilot/BackBill were done — change Vite/Next
   `base`/`basePath`, update Clerk paths, update billing fallbacks, point
   nav/footer links at `/finance` only.
8. Add the rewrite + 301 to zaheer-home `vercel.json`:
   ```json
   { "source": "/apps/<app>", "destination": "/finance/<app>", "permanent": true },
   { "source": "/finance/<app>", "destination": "https://<vercel-url>/finance/<app>" }
   ```

That's it — no layout, nav, footer, or SEO code is rewritten. The vertical
config is the source of truth.
