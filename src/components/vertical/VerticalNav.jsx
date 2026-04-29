import { useState } from 'react'

// Sticky vertical-specific nav. Drives entirely off the vertical config.
// Uses plain <a> for anchor links and product paths. Never links to the
// main zaheer.studio site.

export default function VerticalNav({ config }) {
  const [open, setOpen] = useState(false)
  const { brand, slug, nav } = config
  const homeHref = `/${slug}`

  return (
    <header
      className="sticky top-0 z-50"
      style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-main)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href={homeHref} className="flex items-center gap-2.5" aria-label={`${brand} — home`}>
          <img
            src="/zs-logo.png"
            alt={brand}
            style={{ height: '30px', width: 'auto', display: 'block' }}
          />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            {brand}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {nav.primary.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="btn-ghost text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </a>
          ))}
          {nav.cta && (
            <a
              href={nav.cta.href}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.85rem', marginLeft: '8px' }}
            >
              {nav.cta.label}
            </a>
          )}
        </nav>

        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px" style={{ background: 'var(--text-primary)', transform: open ? 'rotate(45deg) translate(0, 4px)' : '' }} />
          <span className="block w-5 h-px" style={{ background: 'var(--text-primary)', opacity: open ? 0 : 1 }} />
          <span className="block w-5 h-px" style={{ background: 'var(--text-primary)', transform: open ? 'rotate(-45deg) translate(0, -4px)' : '' }} />
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-6 pb-5 flex flex-col gap-1"
          style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-main)' }}
        >
          {nav.primary.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="py-2.5 text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {nav.cta && (
            <a
              href={nav.cta.href}
              className="btn-primary text-center mt-2"
              onClick={() => setOpen(false)}
            >
              {nav.cta.label}
            </a>
          )}
        </div>
      )}
    </header>
  )
}
