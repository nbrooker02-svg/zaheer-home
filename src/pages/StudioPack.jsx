import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { packs } from '../data/packs'
import TerminalMockup from '../components/TerminalMockup'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span className="text-base font-semibold pr-8" style={{ color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
          {faq.q}
        </span>
        <span style={{ color: 'var(--accent)', fontSize: '1.2rem', flexShrink: 0, transform: open ? 'rotate(45deg)' : '', transition: 'transform 150ms' }}>
          +
        </span>
      </button>
      {open && (
        <p className="text-sm leading-relaxed pb-5" style={{ color: 'var(--text-secondary)' }}>
          {faq.a}
        </p>
      )}
    </div>
  )
}

export default function StudioPack() {
  const { packId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, subscription } = useAuth()
  const [buyLoading, setBuyLoading] = useState(false)
  const [hasPurchase, setHasPurchase] = useState(false)
  const pack = packs.find(p => p.id === packId)

  const isFree = pack?.price === 'Free'
  const isSubscribed = subscription?.status === 'active'
  const hasAccess = !!user && (isFree || isSubscribed || hasPurchase)

  useEffect(() => {
    if (!user || !pack || isFree || isSubscribed) {
      setHasPurchase(false)
      return
    }
    supabase
      .from('purchases')
      .select('id')
      .eq('user_id', user.id)
      .eq('pack_id', pack.id)
      .maybeSingle()
      .then(({ data }) => setHasPurchase(!!data))
  }, [user, pack?.id, isFree, isSubscribed])

  async function handleBuy() {
    if (!user) {
      navigate('/studio/auth')
      return
    }
    if (hasAccess) {
      // Owned — fetch a signed URL and trigger the download directly
      setBuyLoading(true)
      try {
        const res = await fetch('/api/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, packId: pack.id }),
        })
        const { url, error } = await res.json()
        if (url) window.open(url, '_blank')
        else alert(error || 'Download failed.')
      } catch {
        alert('Download failed. Try again.')
      }
      setBuyLoading(false)
      return
    }
    setBuyLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productKey: pack.id, userId: user.id, cancelPath: location.pathname }),
      })
      const { url, error } = await res.json()
      if (url) window.location.href = url
      else alert(error || 'Something went wrong.')
    } catch {
      alert('Something went wrong. Try again.')
    }
    setBuyLoading(false)
  }

  const ctaLabel = (() => {
    if (!user) return isFree ? 'Sign up to download →' : `Buy ${pack?.price} →`
    if (hasAccess) return 'Download →'
    return `Buy ${pack?.price} →`
  })()

  if (!pack) {
    return (
      <div className="px-6 py-32 text-center max-w-6xl mx-auto">
        <h1 className="font-serif font-bold text-3xl mb-4" style={{ color: 'var(--text-primary)' }}>Pack not found.</h1>
        <Link to="/studio/browse" className="btn-primary">Back to Studio</Link>
      </div>
    )
  }

  if (pack.status === 'coming-soon') {
    return (
      <>
        <section className="px-6 py-32 text-center" style={{ background: 'var(--bg-red)' }}>
          <div className="max-w-2xl mx-auto">
            <span className="badge-dark mb-6 inline-block">{pack.category}</span>
            <h1
              className="font-serif font-bold mt-4 mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: '#FFFFFF' }}
            >
              {pack.name}
            </h1>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>{pack.tagline}</p>
            <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              This pack is coming soon. Be the first to know when it ships.
            </p>
            <a
              href="mailto:hello@zaheer.studio?subject=Notify me: {pack.name}"
              className="btn-white"
            >
              Notify me when it's ready &rarr;
            </a>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="px-6" style={{ paddingTop: '80px', paddingBottom: '80px', background: 'var(--bg-red)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-dark mb-4 inline-block">{pack.category}</span>
              <h1
                className="font-serif font-bold mb-4"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF' }}
              >
                {pack.name}
              </h1>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
                {pack.tagline}
              </p>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-serif font-bold" style={{ fontSize: '2.5rem', color: '#FFFFFF' }}>{pack.price}</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{pack.priceNote}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="btn-white" onClick={handleBuy} disabled={buyLoading}>
                  {buyLoading ? 'Loading...' : ctaLabel}
                </button>
                {!isFree && !hasAccess && (
                  <Link to="/pricing" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#FFFFFF' }}>
                    Or get all packs &rarr;
                  </Link>
                )}
              </div>
              <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {hasAccess
                  ? (isSubscribed ? 'You have All-Access. Download anytime from your library.' : 'You own this pack. Download anytime from your library.')
                  : (isFree ? 'Free forever. Account required so you can re-download anytime.' : 'All sales final — see refunds policy.')}
              </p>
            </div>
            <div>
              <TerminalMockup />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="px-6 py-20" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-label">What's Included</span>
              <h2
                className="font-serif font-bold mt-3 mb-8"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.2, color: 'var(--text-primary)' }}
              >
                Everything you need to start shipping.
              </h2>
              <ul className="flex flex-col gap-4">
                {pack.includes.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-sm flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
                      <span style={{ color: 'var(--accent)', fontSize: '0.6rem' }}>&#10003;</span>
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="section-label">The Problem</span>
              <p className="text-base leading-relaxed mt-3 mb-8" style={{ color: 'var(--text-secondary)' }}>
                {pack.problem}
              </p>
              <span className="section-label">The Solution</span>
              <p className="text-base leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>
                {pack.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes — RED */}
      {pack.outcomes.length > 0 && (
      <section className="px-6 py-20" style={{ background: 'var(--bg-red)' }}>
        <div className="max-w-6xl mx-auto">
          <span className="section-label-light">What You'll Actually Do</span>
          <h2
            className="font-serif font-bold mt-3 mb-10"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.2, color: '#FFFFFF' }}
          >
            Concrete outcomes. Not feature promises.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pack.outcomes.map((outcome, i) => (
              <div
                key={i}
                className="flex gap-4 items-start rounded p-5"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', flexShrink: 0, lineHeight: 1 }}>{i + 1}.</span>
                <span className="text-sm leading-relaxed font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      )}

      {/* Setup Steps — DARK */}
      {pack.setupSteps.length > 0 && (
      <section className="px-6 py-20" style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-6xl mx-auto">
          <span className="section-label-light">Setup</span>
          <h2
            className="font-serif font-bold mt-3 mb-10"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.2, color: '#EDEFEE' }}
          >
            Up and running in 3 steps.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pack.setupSteps.map((s) => (
              <div key={s.step} className="flex flex-col gap-4">
                <span className="font-serif font-bold" style={{ fontSize: '3rem', lineHeight: 1, color: 'rgba(237,239,238,0.15)' }}>
                  {s.step}
                </span>
                <h3 className="text-base font-semibold" style={{ color: '#EDEFEE' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(237,239,238,0.55)' }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      )}

      {/* Pricing options — paid packs only, and only if not already owned */}
      {!isFree && !hasAccess && (
      <section className="px-6 py-20" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <span className="section-label">Pricing</span>
          <h2
            className="font-serif font-bold mt-3 mb-10"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.2, color: 'var(--text-primary)' }}
          >
            Two ways to get it.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            <div className="card flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>This Pack</p>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-4xl" style={{ color: 'var(--text-primary)' }}>{pack.price}</span>
                <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>one-time</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Lifetime access. Free minor updates. Yours to keep.
              </p>
              <button className="btn-primary mt-auto" onClick={handleBuy} disabled={buyLoading}>
                {buyLoading ? 'Loading...' : `Buy ${pack.price} →`}
              </button>
            </div>
            <div className="card flex flex-col gap-4" style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}>
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>All-Access</p>
                <span className="text-xs font-bold px-2 py-0.5 rounded-sm" style={{ background: 'var(--accent)', color: '#FFFFFF' }}>BEST VALUE</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-4xl" style={{ color: 'var(--text-primary)' }}>$19</span>
                <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>/ month</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Every current pack. Every future pack. Updates included.
              </p>
              <Link to="/pricing" className="btn-primary mt-auto">Start all-access &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      )}

      {/* FAQ */}
      {pack.faq.length > 0 && (
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <span className="section-label">FAQ</span>
            <h2
              className="font-serif font-bold mt-3 mb-10"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.2, color: 'var(--text-primary)' }}
            >
              Common questions.
            </h2>
            <div style={{ maxWidth: '680px', borderTop: '1px solid var(--border)' }}>
              {pack.faq.map((faq, i) => <FAQItem key={i} faq={faq} />)}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA — RED */}
      <section className="px-6 py-20" style={{ background: 'var(--bg-red)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15, color: '#FFFFFF' }}
          >
            Ready to ship faster?
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '420px', margin: '0 auto 2rem' }}>
            Get {pack.name} and start working today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="btn-white" onClick={handleBuy} disabled={buyLoading}>
              {buyLoading ? 'Loading...' : ctaLabel}
            </button>
            {!isFree && !hasAccess && (
              <Link to="/pricing" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#FFFFFF' }}>
                See all plans
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
