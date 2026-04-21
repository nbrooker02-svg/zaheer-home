import { Link } from 'react-router-dom'

const products = [
  { label: 'Apps', href: '/apps', internal: true },
  { label: 'Studio', href: '/studio/browse', internal: false },
  { label: 'Pricing', href: '/pricing', internal: false },
  { label: 'Free Starter Kit', href: '/studio/free-starter-kit', internal: false },
]

const company = [
  { label: 'About', href: '/about', internal: true },
  { label: 'Blog', href: '/blog', internal: false },
  { label: 'Contact', href: '/contact', internal: true },
  { label: 'Terms', href: '/terms', internal: false },
  { label: 'Privacy', href: '/privacy', internal: false },
]

function FooterLink({ item }) {
  const style = { color: 'var(--text-secondary)', fontSize: '0.875rem', transition: 'color 150ms' }
  const handlers = {
    onMouseEnter: e => { e.currentTarget.style.color = 'var(--text-primary)' },
    onMouseLeave: e => { e.currentTarget.style.color = 'var(--text-secondary)' },
  }

  if (item.internal) {
    return (
      <Link to={item.href} style={style} {...handlers}>
        {item.label}
      </Link>
    )
  }
  return (
    <a href={item.href} style={style} {...handlers}>
      {item.label}
    </a>
  )
}

export default function Footer() {
  return (
    <footer
      className="px-6 py-16"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.1rem', color: 'var(--accent)' }}>
                &#9679;
              </span>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                Zaheer Studio
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', maxWidth: '240px' }}>
              The AI toolkit for people who build things solo.
            </p>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-4">
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Products
            </p>
            <nav className="flex flex-col gap-2.5">
              {products.map(item => <FooterLink key={item.href} item={item} />)}
            </nav>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Company
            </p>
            <nav className="flex flex-col gap-2.5">
              {company.map(item => <FooterLink key={item.href} item={item} />)}
            </nav>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            &copy; 2026 Zaheer Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
