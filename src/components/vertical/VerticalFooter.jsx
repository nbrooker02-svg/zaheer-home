// Vertical footer. Links only into vertical-internal paths (anchors, product
// pages, vertical legal pages, mailto). Never links to zaheer.studio main.

export default function VerticalFooter({ config }) {
  const { brand, slug, pillarTagline, footer } = config
  const homeHref = `/${slug}`

  return (
    <footer className="px-6 py-16" style={{ background: 'var(--bg-dark)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <a href={homeHref} className="flex items-center gap-2.5" aria-label={`${brand} — home`}>
              <img
                src="/zs-logo.png"
                alt={brand}
                style={{ height: '28px', width: 'auto', display: 'block' }}
              />
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#EDEFEE' }}>
                {brand}
              </span>
            </a>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(237,239,238,0.5)', maxWidth: '240px' }}>
              {pillarTagline}
            </p>
          </div>

          {footer.columns.map(col => (
            <div key={col.title} className="flex flex-col gap-4">
              <p
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'rgba(237,239,238,0.3)' }}
              >
                {col.title}
              </p>
              <nav className="flex flex-col gap-2.5">
                {col.links.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{ color: 'rgba(237,239,238,0.55)', fontSize: '0.875rem', transition: 'color 150ms' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#EDEFEE' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(237,239,238,0.55)' }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-sm" style={{ color: 'rgba(237,239,238,0.3)' }}>
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
