import { useNavigate, useLocation } from 'react-router-dom'

export default function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  function handleNavLink(id) {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <header className="relative z-20 px-6 py-4" style={{ borderBottom: '1px solid #2A1A12' }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
          <img src="/no-back-zaheer-logo.png" alt="Zaheer Studios" style={{ height: '72px', width: 'auto' }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '18px', color: '#F5EDE6', lineHeight: 1 }}>
            Zaheer Studios
          </span>
        </a>
        <nav className="flex items-center gap-6">
          {[
            { label: 'Packs & Agents', id: 'packs' },
            { label: 'Apps', id: 'apps' },
            { label: 'About', id: 'about' },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNavLink(id)}
              className="text-sm font-medium transition-colors duration-150 bg-transparent border-0 cursor-pointer"
              style={{ color: '#C4956A', fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.color = '#F5EDE6' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#C4956A' }}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
