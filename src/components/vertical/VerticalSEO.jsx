import { useEffect } from 'react'

// Imperatively manage <title>, meta tags, and JSON-LD scripts in document.head
// for client-rendered vertical routes. The host page (zaheer.studio main) has
// its own static meta in index.html; this component overrides it once the
// vertical route hydrates.
//
// Usage:
//   <VerticalSEO config={trades} jsonLd={[{...}, {...}]} />
//
// All injected nodes are tagged with `data-vertical-seo="true"` so they can
// be cleaned up on route change.

const SEO_TAG = 'data-vertical-seo'

function setMeta(selector, attrs) {
  let el = document.head.querySelector(`${selector}[${SEO_TAG}]`)
  if (!el) {
    el = document.createElement(selector.split('[')[0])
    el.setAttribute(SEO_TAG, 'true')
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null) continue
    el.setAttribute(k, v)
  }
  return el
}

function setJsonLd(scripts) {
  // Remove any prior vertical JSON-LD
  document.head
    .querySelectorAll(`script[type="application/ld+json"][${SEO_TAG}]`)
    .forEach(n => n.remove())
  for (const obj of scripts) {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.setAttribute(SEO_TAG, 'true')
    s.text = JSON.stringify(obj)
    document.head.appendChild(s)
  }
}

export default function VerticalSEO({ config, jsonLd = [], pageTitle, pageDescription, pageCanonical }) {
  const { seo, brand } = config
  const title = pageTitle || seo.title
  const description = pageDescription || seo.description
  const canonical = pageCanonical || seo.canonical

  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    // Robots, description, keywords, theme color
    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[name="keywords"]', { name: 'keywords', content: seo.keywords })
    setMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large' })

    // Canonical
    setMeta('link[rel="canonical"]', { rel: 'canonical', href: canonical })

    // Open Graph
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: brand })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: seo.ogImage })
    setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: brand })

    // Twitter
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: seo.ogImage })

    // JSON-LD
    setJsonLd(jsonLd)

    return () => {
      document.title = prevTitle
      document.head
        .querySelectorAll(`[${SEO_TAG}]`)
        .forEach(n => n.remove())
    }
  }, [title, description, canonical, seo.keywords, seo.ogImage, brand, jsonLd])

  return null
}
