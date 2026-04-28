import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { packs } from '../data/packs'
import { useAuth } from '../contexts/AuthContext'

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

function PricingSection() {
  const { user, subscription } = useAuth()
  const navigate = useNavigate()
  const [loadingPlan, setLoadingPlan] = useState(null)
  const isSubscribed = subscription?.status === 'active'

  async function handleSubscribe(plan) {
    if (!user) { navigate('/studio/auth'); return }
    if (isSubscribed) { navigate('/studio/account'); return }
    setLoadingPlan(plan)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productKey: plan, userId: user.id, cancelPath: '/studio/browse' }),
      })
      const { url, error } = await res.json()
      if (url) window.location.href = url
      else alert(error || 'Something went wrong.')
    } catch {
      alert('Something went wrong. Try again.')
    }
    setLoadingPlan(null)
  }

  return (
    <section className="px-6 py-20" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">Pricing</span>
          <h2
            className="font-serif font-bold mt-3 mx-auto"
            style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.25rem)', lineHeight: 1.2, color: 'var(--text-primary)', maxWidth: 640 }}
          >
            Start free. Pay once, or get everything for one monthly price.
          </h2>
          <p
            className="text-base mt-4 mx-auto"
            style={{ color: 'var(--text-secondary)', maxWidth: 520, lineHeight: 1.6 }}
          >
            No "contact sales." No fifty-seat minimums. The price you see is what you pay.
          </p>
        </div>

        {isSubscribed && (
          <div
            className="mb-10 px-5 py-4 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ background: 'var(--success-soft)', border: '1px solid rgba(22,101,52,0.15)' }}
          >
            <p className="text-sm font-semibold" style={{ color: 'var(--success)' }}>
              ✓ You have Studio All-Access — every pack is unlocked.
            </p>
            <a href="/studio/library" className="text-sm font-semibold" style={{ color: 'var(--success)' }}>
              Go to your library →
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {/* Free */}
          <div className="card flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-tertiary)' }}>
                Free Starter
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-serif font-bold text-4xl" style={{ color: 'var(--text-primary)' }}>Free</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>no credit card needed</p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              The bare-bones template. Learn the system.
            </p>
            <ul className="flex flex-col gap-3">
              {['Core agent template', 'Setup instructions', '1 example skill', 'Email-based support'].map(item => (
                <li key={item} className="flex gap-2.5 items-start text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--warm)', flexShrink: 0, marginTop: '1px' }}>&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="/studio/free-starter-kit" className="btn-secondary mt-auto">
              Get the Free Kit
            </a>
          </div>

          {/* One-Time */}
          <div className="card flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-tertiary)' }}>
                Individual Pack
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-serif font-bold text-4xl" style={{ color: 'var(--text-primary)' }}>$49</span>
                <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>one-time</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>per pack</p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Buy what you need. Keep it forever.
            </p>
            <ul className="flex flex-col gap-3">
              {['Any single pack of your choice', 'Lifetime access to current version', 'Email support'].map(item => (
                <li key={item} className="flex gap-2.5 items-start text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--warm)', flexShrink: 0, marginTop: '1px' }}>&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#packs" className="btn-secondary mt-auto">
              Browse packs above
            </a>
          </div>

          {/* All-Access */}
          <div
            className="flex flex-col gap-5 rounded p-6"
            style={{ background: 'var(--bg-red)', border: '2px solid var(--accent)' }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Studio All-Access
                </p>
                <span className="text-xs font-bold px-2 py-0.5 rounded-sm" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }}>
                  BEST VALUE
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-serif font-bold text-4xl" style={{ color: '#FFFFFF' }}>$19</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>/ month</span>
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>or $149/year (save $79)</p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Everything. Including every future pack.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                'Every current pack',
                'Every future pack we build',
                'Updates to all packs included',
                'Priority support',
                'Community access',
              ].map(item => (
                <li key={item} className="flex gap-2.5 items-start text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  <span style={{ color: '#FFFFFF', flexShrink: 0, marginTop: '1px' }}>&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 mt-auto">
              {isSubscribed ? (
                <>
                  <div
                    className="text-center text-sm font-semibold py-3 rounded"
                    style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }}
                  >
                    ✓ Active subscription
                  </div>
                  <a
                    href="/studio/account"
                    className="text-sm font-semibold py-2 text-center"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                  >
                    Manage in Account →
                  </a>
                </>
              ) : (
                <>
                  <button
                    className="btn-white"
                    onClick={() => handleSubscribe('all-access-monthly')}
                    disabled={!!loadingPlan}
                  >
                    {loadingPlan === 'all-access-monthly' ? 'Loading...' : 'Start Monthly →'}
                  </button>
                  <button
                    className="text-sm font-semibold py-2"
                    style={{ color: 'rgba(255,255,255,0.75)', background: 'none', border: 'none', cursor: 'pointer' }}
                    onClick={() => handleSubscribe('all-access-yearly')}
                    disabled={!!loadingPlan}
                  >
                    {loadingPlan === 'all-access-yearly' ? 'Loading...' : 'Or pay yearly ($149) →'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-sm mt-8" style={{ color: 'var(--text-tertiary)' }}>
          See full pricing FAQ on the{' '}
          <Link to="/pricing" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
            pricing page
          </Link>.
        </p>
      </div>
    </section>
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
            Claude Code agent packs for one-person operations.
          </h1>
          <p className="text-lg mt-4" style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '620px', lineHeight: 1.65 }}>
            Pre-configured Claude Code agents organized by profession. The same packs we
            use to build every app on Zaheer Studio. Download, install, and start working
            in minutes.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <section id="packs" className="px-6 py-8" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
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

      {/* Pricing — moved here from main nav */}
      <PricingSection />

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
          <Link to="/studio/auth?mode=signup" className="btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            Create an account &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
