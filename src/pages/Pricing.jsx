import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const faqs = [
  {
    q: "What's the difference between one-time and subscription?",
    a: "One-time gives you a single pack forever. Subscription gives you every pack we've built and every pack we'll ever build -- automatically, at no extra cost.",
  },
  {
    q: "Do I lose access if I cancel?",
    a: "No. You keep everything you've downloaded. Canceling just stops future pack deliveries.",
  },
  {
    q: "Can I upgrade from one-time to subscription later?",
    a: "Yes. Email hello@zaheer.studio and we'll apply a credit toward your subscription.",
  },
  {
    q: "When do new packs ship?",
    a: "New packs ship as they're ready. Subscribers get them automatically. One-time buyers can purchase new packs individually.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards via Stripe. No PayPal at this time.",
  },
]

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

export default function Pricing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loadingPlan, setLoadingPlan] = useState(null)

  async function handleSubscribe(plan) {
    if (!user) { navigate('/studio/auth'); return }
    setLoadingPlan(plan)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productKey: plan, userId: user.id, cancelPath: '/pricing' }),
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
    <>
      {/* Header — RED */}
      <section className="px-6" style={{ paddingTop: '80px', paddingBottom: '64px', background: 'var(--bg-red)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Pricing
          </span>
          <h1
            className="font-serif font-bold mt-3"
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#FFFFFF' }}
          >
            Simple pricing. No surprises.
          </h1>
          <p className="text-lg mt-4 mx-auto" style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '480px', lineHeight: 1.65 }}>
            Start free. Buy what you need. Or get everything for one monthly price.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
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
                {['Any single pack of your choice', 'Lifetime access to current version', 'Free updates included', 'Email support'].map(item => (
                  <li key={item} className="flex gap-2.5 items-start text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--warm)', flexShrink: 0, marginTop: '1px' }}>&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/studio/browse" className="btn-secondary mt-auto">
                Browse Packs
              </Link>
            </div>

            {/* All-Access — highlighted */}
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
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <span className="section-label">FAQ</span>
          <h2
            className="font-serif font-bold mt-3 mb-10"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.2, color: 'var(--text-primary)' }}
          >
            Common questions.
          </h2>
          <div style={{ maxWidth: '680px', borderTop: '1px solid var(--border)' }}>
            {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
          </div>
        </div>
      </section>

      {/* Bottom CTA — DARK */}
      <section className="px-6 py-20" style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', lineHeight: 1.2, color: '#EDEFEE' }}
          >
            Not ready to commit? Start free.
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(237,239,238,0.55)', maxWidth: '380px', margin: '0 auto 2rem' }}>
            Download the free starter kit. No credit card. No account.
          </p>
          <a href="/studio/free-starter-kit" className="btn-primary">
            Get the Free Kit &rarr;
          </a>
        </div>
      </section>
    </>
  )
}
