// Zaheer Studio Trades — vertical config.
// Copy as-is from _template.js, fill in the trades-specific content.
// All copy here is PLACEHOLDER — Nathan will replace later.

export const trades = {
  slug: 'trades',
  brand: 'Zaheer Studio Trades',
  pillarTagline: 'Software built for the trades.',

  seo: {
    title: 'Zaheer Studio Trades — Software built for contractors and subcontractors',
    description: 'Focused, jobsite-grade software for general contractors, electrical subs, mechanical subs, and specialty trades. Permit research, voice-to-COR change orders, and more — built by people who actually know the trades.',
    keywords: 'contractor software, subcontractor software, trades software, building permit checklist, change order software, COR software, electrical subcontractor tools, jobsite tools',
    canonical: 'https://www.zaheer.studio/trades',
    ogImage: 'https://www.zaheer.studio/zs-logo.png',
  },

  nav: {
    primary: [
      { label: 'Tools', href: '#tools' },
      { label: 'Why us', href: '#why-us' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: { label: 'Get started', href: '#contact' },
  },

  hero: {
    eyebrow: 'Zaheer Studio Trades',
    h1: 'AI tools designed for the trades.',
    sub: 'Focused tools that streamline the work you actually do — permits, change orders, and the bleed-points that cost trades businesses real money. No fluff. No enterprise pricing. Just tools that pay for themselves.',
    primaryCta: { label: 'See the tools', href: '#tools' },
    secondaryCta: { label: 'Get in touch', href: '#contact' },
  },

  audiences: [
    'General contractors',
    'Electrical subs',
    'Mechanical & HVAC subs',
    'Plumbing subs',
    'Remodelers',
    'Specialty trades',
  ],

  products: [
    {
      id: 'permitpilot',
      name: 'PermitPilot',
      tagline: 'Stop guessing what permits you need.',
      description: 'Jurisdiction-specific building permit checklists for contractors, GCs, and remodelers. Pick a city, pick a project type, get a plain-English checklist of every permit, document, and inspection required before you submit.',
      bullets: [
        'Coverage for 49+ US jurisdictions, expanding weekly',
        'Plain-English checklists — no code-speak',
        'Project-type filters: ADU, remodel, new build, electrical, plumbing',
      ],
      audience: 'Built for general contractors, subs, and remodelers',
      status: 'live',
      href: '/trades/permitpilot',
      cta: 'Open PermitPilot',
      pricing: 'Free to try',
      schema: {
        applicationCategory: 'BusinessApplication',
        offers: { price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
        audience: 'Contractors, general contractors, remodelers, subcontractors',
      },
    },
    {
      id: 'backbill',
      name: 'BackBill',
      tagline: 'Never miss an extra expense again.',
      description: 'Voice-first change order requests for electrical and specialty subs. Talk through a job-site change, get a polished, signature-ready COR in under a minute — and a one-click approval link your GC actually uses.',
      bullets: [
        'Speak or type change orders — update pricing, labor, and materials in seconds',
        'Polished COR PDFs auto-sent for approval, with full line items and totals',
        'One-click sign-off — track what\'s sent, signed, and paid',
      ],
      audience: 'Built for electrical subcontractors and small trade crews',
      status: 'development',
      href: '/trades/backbill',
      cta: 'Preview BackBill',
      pricing: '$29/mo',
      schema: {
        applicationCategory: 'BusinessApplication',
        offers: { price: '29', priceCurrency: 'USD', availability: 'https://schema.org/PreOrder' },
        audience: 'Electrical subcontractors, mechanical subcontractors, specialty trade contractors',
      },
    },
  ],

  trust: {
    eyebrow: 'Built for the work',
    h2: 'Why Zaheer Studio Trades exists.',
    points: [
      {
        title: 'Trades keep the country running',
        body: 'Plumbing, electrical, framing, HVAC, roofing — the work everything else depends on. We build software for the people who actually do it, because most of the industry has been ignored by software for decades.',
      },
      {
        title: 'Priced like a tool, not a license',
        body: 'No fifty-seat minimums. No "contact sales." Clear monthly pricing or one-time costs you can put on a job and stop thinking about.',
      },
      {
        title: 'Built around where trades bleed money',
        body: 'Permits that take half a day to research. Change orders that never get written up. The small inefficiencies that quietly eat thousands a year. Each tool we build goes after one of those bleed-points specifically.',
      },
    ],
  },

  faq: [
    {
      q: 'Who is Zaheer Studio Trades for?',
      a: 'Contractors, electrical subcontractors, mechanical and plumbing subs, remodelers, and specialty trade businesses. If you work in the field and need software that doesn\'t treat you like a fifty-person enterprise, this is for you.',
    },
    {
      q: 'What tools are in Zaheer Studio Trades right now?',
      a: 'Two: PermitPilot (jurisdiction-specific permit research and checklists for contractors) and BackBill (voice-to-COR change order software for electrical and specialty subs).',
    },
    {
      q: 'Are these tools free?',
      a: 'PermitPilot is free to try. BackBill is $29 per month with a 14-day free trial — no card required to start.',
    },
    {
      q: 'Do these tools work on mobile?',
      a: 'Yes. Both tools are designed mobile-first because the work happens in the truck, on the jobsite, and in the field — not behind a desk.',
    },
    {
      q: 'How do I request a feature or a city?',
      a: 'Email us at info@zaheer.studio. New jurisdictions for PermitPilot ship on request. Feature requests for BackBill go straight to the roadmap.',
    },
  ],

  contact: {
    h2: 'Got a part of your business that\'s costing you time or money?',
    body: 'Permit research. Change orders. Scheduling. Invoicing. Whatever\'s eating into your week — tell us about it, and we\'ll see if it\'s worth building a tool for. Email goes straight to a real person, not a ticket queue.',
    email: 'info@zaheer.studio',
    primaryCta: { label: 'Email info@zaheer.studio', href: 'mailto:info@zaheer.studio' },
  },

  footer: {
    columns: [
      {
        title: 'Tools',
        links: [
          { label: 'PermitPilot', href: '/trades/permitpilot' },
          { label: 'BackBill', href: '/trades/backbill' },
        ],
      },
      {
        title: 'Zaheer Studio Trades',
        links: [
          { label: 'Why us', href: '/trades#why-us' },
          { label: 'FAQ', href: '/trades#faq' },
          { label: 'Contact', href: 'mailto:info@zaheer.studio' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Terms', href: '/trades/terms' },
          { label: 'Privacy', href: '/trades/privacy' },
        ],
      },
    ],
    copyright: '© 2026 Zaheer Studio Trades. All rights reserved.',
  },
}
