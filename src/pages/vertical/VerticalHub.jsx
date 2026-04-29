import VerticalLayout from '../../components/vertical/VerticalLayout'
import VerticalSEO from '../../components/vertical/VerticalSEO'
import VerticalHero from '../../components/vertical/VerticalHero'
import VerticalProductCard from '../../components/vertical/VerticalProductCard'
import VerticalProductPreview from '../../components/vertical/VerticalProductPreview'
import VerticalTrust from '../../components/vertical/VerticalTrust'
import VerticalFAQ from '../../components/vertical/VerticalFAQ'
import VerticalContact from '../../components/vertical/VerticalContact'

// Reusable hub page for any vertical. Drives entirely off the config object.
// To add a new vertical: copy data/verticals/_template.js, fill in, register
// a route in main.jsx pointing at this component with the new config.

function buildJsonLd(config) {
  const { brand, slug, seo, products, faq } = config
  const baseUrl = `https://www.zaheer.studio/${slug}`

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand,
    url: baseUrl,
    logo: 'https://www.zaheer.studio/zs-logo.png',
    description: seo.description,
    email: 'info@zaheer.studio',
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brand,
    url: baseUrl,
  }

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${brand} — Tools`,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: p.name,
        description: p.description,
        url: `https://www.zaheer.studio${p.href}`,
        applicationCategory: p.schema?.applicationCategory || 'BusinessApplication',
        operatingSystem: 'Web',
        offers: p.schema?.offers
          ? { '@type': 'Offer', ...p.schema.offers }
          : undefined,
        audience: p.schema?.audience
          ? { '@type': 'Audience', audienceType: p.schema.audience }
          : undefined,
        publisher: { '@type': 'Organization', name: brand, url: baseUrl },
      },
    })),
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: brand, item: baseUrl },
    ],
  }

  return [organization, website, itemList, faqPage, breadcrumbs]
}

export default function VerticalHub({ config }) {
  const jsonLd = buildJsonLd(config)

  return (
    <VerticalLayout config={config}>
      <VerticalSEO config={config} jsonLd={jsonLd} />

      <VerticalHero hero={config.hero} />

      {/* Audience strip */}
      <section
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-surface)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Built for
          </span>
          {config.audiences.map(a => (
            <span
              key={a}
              className="text-sm"
              style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}
            >
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* Tools — alternating product feature blocks */}
      <section id="tools" className="px-6" style={{ paddingTop: 80 }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <span className="section-label">The tools</span>
            <h2
              className="font-serif font-bold mt-3 mx-auto"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                maxWidth: 720,
              }}
            >
              {config.brand} tools.
            </h2>
            <p
              className="text-base mt-4 mx-auto"
              style={{ color: 'var(--text-secondary)', maxWidth: 560, lineHeight: 1.6 }}
            >
              Pick the tool. Open the app. Get back to work.
            </p>
          </div>

          <div className="flex flex-col" style={{ marginTop: 16 }}>
            {config.products.map((product, i) => (
              <div
                key={product.id}
                style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}
              >
                <VerticalProductCard
                  product={product}
                  reverse={i % 2 === 1}
                  visual={
                    <VerticalProductPreview preview={product.preview} fallbackName={product.name} />
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <VerticalTrust trust={config.trust} />
      <VerticalFAQ faq={config.faq} />
      <VerticalContact contact={config.contact} />
    </VerticalLayout>
  )
}
