import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Apps', href: '/apps' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header
      className="sticky top-0 z-50"
      style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-main)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.25rem', color: 'var(--accent)' }}>
            &#9679;
          </span>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 400 }}>
            Zaheer Studio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className="btn-ghost"
              style={{ color: location.pathname.startsWith(link.href) ? 'var(--text-primary)' : 'var(--text-secondary)' }}
            >
              {link.label}
            </Link>
          ))}
          <div className="w-px h-4 mx-3" style={{ background: 'var(--border)' }} />
          <a href="/studio/browse" className="btn-primary" style={{ padding: '8px 18px' }}>
            Browse Studio
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-px transition-transform duration-200"
            style={{ background: 'var(--text-primary)', transform: open ? 'rotate(45deg) translate(0, 4px)' : '' }}
          />
          <span
            className="block w-5 h-px transition-opacity duration-200"
            style={{ background: 'var(--text-primary)', opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px transition-transform duration-200"
            style={{ background: 'var(--text-primary)', transform: open ? 'rotate(-45deg) translate(0, -4px)' : '' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-5 flex flex-col gap-1"
          style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-main)' }}
        >
          {links.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className="py-2.5 text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/studio/browse"
            className="btn-primary mt-3 text-center"
            onClick={() => setOpen(false)}
          >
            Browse Studio
          </a>
        </div>
      )}
    </header>
  )
}
