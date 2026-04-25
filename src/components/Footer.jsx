import { Link } from 'react-router-dom'

const products = [
  { label: 'Apps', href: '/apps', internal: true },
  { label: 'Studio', href: '/studio/browse', internal: true },
  { label: 'Pricing', href: '/pricing', internal: true },
  { label: 'Free Starter Kit', href: '/studio/free-starter-kit', internal: false },
]

const company = [
  { label: 'About', href: '/about', internal: true },
  { label: 'Contact', href: '/contact', internal: true },
  { label: 'Terms', href: '/terms', internal: true },
  { label: 'Privacy', href: '/privacy', internal: true },
  { label: 'Refunds', href: '/refunds', internal: true },
]

function FooterLink({ item }) {
  const style = { color: 'rgba(237,239,238,0.55)', fontSize: '0.875rem', transition: 'color 150ms' }
  const handlers = {
    onMouseEnter: e => { e.currentTarget.style.color = '#EDEFEE' },
    onMouseLeave: e => { e.currentTarget.style.color = 'rgba(237,239,238,0.55)' },
  }
  if (item.internal) {
    return <Link to={item.href} style={style} {...handlers}>{item.label}</Link>
  }
  return <a href={item.href} style={style} {...handlers}>{item.label}</a>
}

export default function Footer() {
  return (
    <footer className="px-6 py-16" style={{ background: 'var(--bg-dark)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/zs-logo.png"
                alt="Zaheer Studios"
                style={{ height: '28px', width: 'auto', display: 'block' }}
              />
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#EDEFEE' }}>
                Zaheer Studio
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(237,239,238,0.5)', maxWidth: '240px' }}>
              The AI toolkit for people who build things solo.
            </p>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(237,239,238,0.3)' }}>
              Products
            </p>
            <nav className="flex flex-col gap-2.5">
              {products.map(item => <FooterLink key={item.href} item={item} />)}
            </nav>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(237,239,238,0.3)' }}>
              Company
            </p>
            <nav className="flex flex-col gap-2.5">
              {company.map(item => <FooterLink key={item.href} item={item} />)}
            </nav>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-sm" style={{ color: 'rgba(237,239,238,0.3)' }}>
            &copy; 2026 Zaheer Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
