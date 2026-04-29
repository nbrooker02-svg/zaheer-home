import VerticalLayout from '../../components/vertical/VerticalLayout'
import VerticalSEO from '../../components/vertical/VerticalSEO'

// Reusable legal-page shell for any vertical. Renders supplied JSX content
// inside the vertical's nav + footer. Drives SEO from a small page-specific
// override on top of the vertical's base config.

export default function VerticalLegalPage({ config, slug, title, lastUpdated, children }) {
  const canonical = `https://www.zaheer.studio/${config.slug}/${slug}`
  const seo = {
    pageTitle: `${title} · ${config.brand}`,
    pageDescription: `${title} for ${config.brand}. ${config.pillarTagline}`,
    pageCanonical: canonical,
  }

  return (
    <VerticalLayout config={config}>
      <VerticalSEO config={config} jsonLd={[]} {...seo} />

      <section className="px-6" style={{ paddingTop: '64px', paddingBottom: '48px', background: 'var(--bg-dark)' }}>
        <div className="max-w-3xl mx-auto">
          <span className="section-label-light">Legal</span>
          <h1
            className="font-serif font-bold mt-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: '#EDEFEE' }}
          >
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm mt-3" style={{ color: 'rgba(237,239,238,0.5)' }}>
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="prose-zaheer mx-auto" style={{ maxWidth: '680px' }}>
          {children}
        </div>
      </section>
    </VerticalLayout>
  )
}
