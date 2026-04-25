import { useState } from 'react'
import { Link } from 'react-router-dom'
import { packs } from '../data/packs'

const categories = ['All', 'Coding', 'Marketing', 'Free']

function PackCard({ pack }) {
  const isLive = pack.status === 'live'

  return (
    <div className="card flex flex-col gap-4" style={{ opacity: isLive ? 1 : 0.8 }}>
      <div className="flex items-center gap-2">
        <span className="badge">{pack.category}</span>
        {pack.price === 'Free' && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-sm" style={{ background: 'var(--success-soft)', color: 'var(--success)' }}>
            FREE
          </span>
        )}
        {pack.status === 'coming-soon' && (
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Coming soon</span>
        )}
      </div>
      <div>
        <h3 className="font-serif font-bold text-lg mb-2" style={{ color: 'var(--text-primary)', lineHeight: 1.3 }}>
          {pack.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {pack.description}
        </p>
      </div>
      <div className="mt-auto pt-2 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{pack.price}</span>
          {pack.priceNote && (
            <span className="text-xs ml-1.5" style={{ color: 'var(--text-tertiary)' }}>{pack.priceNote}</span>
          )}
        </div>
        {isLive && pack.href ? (
          <Link to={pack.href} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            View details
          </Link>
        ) : (
          <span className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>Notify me &rarr;</span>
        )}
      </div>
    </div>
  )
}

export default function Studio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const rank = (p) => p.price === 'Free' ? 0 : (p.status === 'live' ? 1 : 2)
  const filtered = packs
    .filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory
      const matchQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchQuery
    })
    .sort((a, b) => rank(a) - rank(b))

  return (
    <>
      {/* Header — RED */}
      <section className="px-6" style={{ paddingTop: '80px', paddingBottom: '64px', background: 'var(--bg-red)' }}>
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
            The Studio
          </span>
          <h1
            className="font-serif font-bold mt-3"
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#FFFFFF' }}
          >
            Agent packs and skills for one-person operations.
          </h1>
          <p className="text-lg mt-4" style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '560px', lineHeight: 1.65 }}>
            Pre-configured Claude Code agents organized by profession.
            Download, install, and start working in minutes.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="px-6 py-8" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <input
            type="text"
            placeholder="Search packs and skills..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="text-sm rounded px-4 py-2.5 flex-1 max-w-xs outline-none transition-all"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs font-semibold px-4 py-2 rounded transition-all duration-150"
                style={{
                  background: activeCategory === cat ? 'var(--accent)' : 'var(--bg-elevated)',
                  color: activeCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                  border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pack grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(pack => <PackCard key={pack.id} pack={pack} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No packs found.</p>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Coming soon teaser — DARK */}
      <section className="px-6 py-20" style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div>
            <span className="section-label-light">Coming Soon</span>
            <h2
              className="font-serif font-bold mt-3"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1.2, color: '#EDEFEE' }}
            >
              Real Estate, Finance, Design, Sales, and more.
            </h2>
            <p className="text-sm mt-3" style={{ color: 'rgba(237,239,238,0.5)', maxWidth: '420px' }}>
              New packs ship as they're ready. Subscribe to get every new pack automatically.
            </p>
          </div>
          <Link to="/pricing" className="btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            See all-access pricing &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
