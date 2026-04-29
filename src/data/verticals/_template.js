// Vertical config template.
// Copy this file to a new vertical (e.g. `builders.js`, `finance.js`) and
// adjust the values. Then register a route in src/main.jsx that renders
// <VerticalHub config={builders} /> at /builders, and add a matching
// public/<slug>/llms.txt and entries in public/sitemap.xml + robots.txt.
//
// Layout, components, and SEO are driven entirely by this object — the only
// per-vertical code change needed is the route registration.

export const _verticalTemplate = {
  // Routing + identity
  slug: 'verticalslug', // path under root: zaheer.studio/verticalslug
  brand: 'Zaheer Studio Vertical', // brand name shown in nav, footer, og:site_name
  pillarTagline: 'One-line tagline shown under the brand wordmark in footer.',

  // SEO — root vertical hub page
  seo: {
    title: 'H1-aligned page title — vertical-focused, keyword-loaded',
    description: 'Meta description for the vertical hub page. Lead with the audience and core value — about 150-160 chars.',
    keywords: 'comma-separated, vertical-specific, keywords',
    canonical: 'https://www.zaheer.studio/verticalslug',
    ogImage: 'https://www.zaheer.studio/zs-logo.png', // override per vertical when ready
  },

  // Navigation — internal vertical links only. NO links to zaheer.studio main.
  nav: {
    primary: [
      // Anchors on the hub page for one-page nav
      { label: 'Tools', href: '#tools' },
      { label: 'Why us', href: '#why-us' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: { label: 'Get started', href: '#contact' },
  },

  // Hero — top of hub page
  hero: {
    eyebrow: 'Brand or category eyebrow',
    h1: 'Vertical-specific H1 — what does this vertical solve?',
    sub: 'Subhead — one or two sentences. Audience-specific. No buzzwords.',
    primaryCta: { label: 'Browse tools', href: '#tools' },
    secondaryCta: { label: 'Talk to us', href: '#contact' },
  },

  // Audience strip — quick band of who you serve
  audiences: ['Audience 1', 'Audience 2', 'Audience 3'],

  // Products — one per app in this vertical
  products: [
    {
      id: 'product-id',
      name: 'Product Name',
      tagline: 'One-line tagline.',
      description: '2-3 sentence description of what it does and who for.',
      bullets: [
        'Feature one — what it does for the user',
        'Feature two',
        'Feature three',
      ],
      audience: 'Built for: trade or role',
      status: 'live', // 'live' | 'development' | 'coming-soon'
      href: '/verticalslug/product-id',
      cta: 'Open Product',
      pricing: 'Free to try',
      // For JSON-LD SoftwareApplication
      schema: {
        applicationCategory: 'BusinessApplication',
        offers: { price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      },
    },
  ],

  // Trust strip — placeholder
  trust: {
    eyebrow: 'Built for the work',
    h2: 'Why this vertical exists.',
    points: [
      { title: 'Point 1', body: 'One sentence on why this matters to the buyer.' },
      { title: 'Point 2', body: 'One sentence.' },
      { title: 'Point 3', body: 'One sentence.' },
    ],
  },

  // FAQ — also rendered as FAQPage JSON-LD for AIO
  faq: [
    { q: 'Question 1?', a: 'Answer with specifics. LLMs cite specifics, not buzzwords.' },
    { q: 'Question 2?', a: 'Answer.' },
  ],

  // Contact section
  contact: {
    h2: 'Ready to get started?',
    body: 'One-line invitation.',
    email: 'info@zaheer.studio',
    primaryCta: { label: 'Email us', href: 'mailto:info@zaheer.studio' },
  },

  // Footer — internal links only
  footer: {
    columns: [
      {
        title: 'Tools',
        links: [
          { label: 'Product 1', href: '/verticalslug/product-1' },
        ],
      },
      {
        title: 'Vertical',
        links: [
          { label: 'About', href: '/verticalslug#why-us' },
          { label: 'FAQ', href: '/verticalslug#faq' },
          { label: 'Contact', href: 'mailto:info@zaheer.studio' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Terms', href: '/verticalslug/terms' },
          { label: 'Privacy', href: '/verticalslug/privacy' },
        ],
      },
    ],
    copyright: '© 2026 Zaheer Studio Vertical. All rights reserved.',
  },
}
