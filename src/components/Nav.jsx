import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const links = [
  { label: 'Apps', href: '/apps' },
  { label: 'Studio', href: '/studio/browse' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()

  const isActive = (href) => {
    if (href === '/studio/browse') return location.pathname.startsWith('/studio')
    return location.pathname.startsWith(href)
  }

  return (
    <header
      className="sticky top-0 z-50"
      style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-main)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/zs-logo.png"
            alt="Zaheer Studios"
            style={{ height: '32px', width: 'auto', display: 'block' }}
          />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            Zaheer Studio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className="btn-ghost text-sm"
              style={{
                color: isActive(link.href) ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isActive(link.href) ? 500 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="w-px h-4 mx-3" style={{ background: 'var(--border)' }} />
          {user ? (
            <>
              <Link
                to="/studio/account"
                className="btn-ghost text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                Account
              </Link>
              <Link
                to="/studio/library"
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                My Library
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/studio/auth"
                className="btn-ghost text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                Sign in
              </Link>
              <Link
                to="/studio/auth?mode=signup"
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                Create account
              </Link>
            </>
          )}
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
          <div className="mt-3 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/studio/library"
                  className="btn-primary text-center block"
                  onClick={() => setOpen(false)}
                >
                  My Library
                </Link>
                <Link
                  to="/studio/account"
                  className="text-sm text-center py-2"
                  style={{ color: 'var(--text-secondary)' }}
                  onClick={() => setOpen(false)}
                >
                  Account
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/studio/auth?mode=signup"
                  className="btn-primary text-center block"
                  onClick={() => setOpen(false)}
                >
                  Create account
                </Link>
                <Link
                  to="/studio/auth"
                  className="text-sm text-center py-2"
                  style={{ color: 'var(--text-secondary)' }}
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
