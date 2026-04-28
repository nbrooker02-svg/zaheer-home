import { useState } from 'react'
import { Link } from 'react-router-dom'
import { apps } from './data/apps'
import { packs } from './data/packs'
import AppMockup from './components/AppMockup'

const audiences = [
  'Contractors & GCs',
  'Electrical subs',
  'Retail investors',
  'Solo founders',
  'Freelancers',
  'Small businesses',
]

const faqs = [
  {
    q: 'What is Zaheer Studio?',
    a: 'Zaheer Studio is a one-person studio that builds focused AI apps for specific people and small businesses, plus Claude Code agent packs you can install and use yourself. Every app solves one specific problem really well — instead of being a bloated, $300-a-month tool built for fifty-person teams.',
  },
  {
    q: 'Who are these AI tools for?',
    a: 'Contractors, electrical subcontractors, retail investors, solo founders, freelancers, and small businesses who don\'t have a budget for enterprise SaaS. If you\'ve ever looked at a $200/month tool and thought "this is overkill for what I actually need" — that\'s exactly who Zaheer Studio builds for.',
  },
  {
    q: 'Are the apps free to use?',
    a: 'PermitPilot is free to try. BackBill will be $29/month with a 14-day free trial when it launches. Market Read pricing is TBD. We don\'t do "contact sales" — every price is on the page.',
  },
  {
    q: 'Can I build my own AI tools with Zaheer Studio?',
    a: 'Yes. The Studio sells Claude Code agent packs — the same ones we use to build every app on this site. The Free AI Agent Starter Kit is no-credit-card. Ship Stack ($49) is a full AI app-builder agent. Studio All-Access ($19/month) gets you every current and future pack.',
  },
  {
    q: 'What is Claude Code?',
    a: 'Claude Code is Anthropic\'s official AI coding agent that runs in your terminal. It\'s free to download and runs with a Claude Pro subscription. Zaheer Studio packs are configuration layers that give Claude Code a permanent memory of your stack, your goals, and your workflow.',
  },
  {
    q: 'Where does Zaheer Studio run?',
    a: 'The web apps run on zaheer.studio. The agent packs run locally on your machine inside Claude Code — your data stays on your laptop. Auth is handled by Supabase or Clerk depending on the app. Payments via Stripe.',
  },
]

function FAQItem({ faq, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={onToggle}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span
          className="text-base font-semibold pr-8"
          style={{ color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}
        >
          {faq.q}
        </span>
        <span
          style={{
            color: 'var(--accent)',
            fontSize: '1.2rem',
            flexShrink: 0,
            transform: open ? 'rotate(45deg)' : '',
            transition: 'transform 150ms',
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p className="text-sm leading-relaxed pb-5" style={{ color: 'var(--text-secondary)', maxWidth: 720 }}>
          {faq.a}
        </p>
      )}
    </div>
  )
}

function StatusBadge({ status }) {
  if (status === 'live') {
    return (
      <span
        className="text-xs font-semibold px-2.5 py-1 rounded-sm"
        style={{ background: 'var(--success-soft)', color: 'var(--success)' }}
      >
        ● Live
      </span>
    )
  }
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-sm"
      style={{ background: 'var(--warm-soft)', color: 'var(--warning)' }}
    >
      In Development
    </span>
  )
}

function AppFeature({ app, reverse }) {
  const Cta = () => {
    if (app.href) {
      return (
        <a href={app.href} className="btn-primary">
          {app.cta} &rarr;
        </a>
      )
    }
    return (
      <a href="/contact" className="btn-secondary">
        {app.cta} &rarr;
      </a>
    )
  }

  return (
    <article
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      style={{ paddingTop: 64, paddingBottom: 64 }}
    >
      <div className={reverse ? 'lg:order-2' : ''}>
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="badge">{app.category}</span>
          <StatusBadge status={app.status} />
        </div>
        <h3
          className="font-serif font-bold mb-3"
          style={{
            fontSize: 'clamp(1.6rem, 2.6vw, 2.25rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}
        >
          {app.name} — {app.tagline}
        </h3>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: 'var(--text-secondary)', maxWidth: 480 }}
        >
          {app.description}
        </p>
        <ul className="flex flex-col gap-2.5 mb-6">
          {app.bullets.map(b => (
            <li
              key={b}
              className="flex gap-2.5 items-start text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>✓</span>
              {b}
            </li>
          ))}
        </ul>
        <p
          className="text-xs font-semibold tracking-wide uppercase mb-6"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {app.audience}
        </p>
        <div className="flex items-center gap-4">
          <Cta />
          <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            {app.price}
          </span>
        </div>
      </div>
      <div className={`flex justify-center ${reverse ? 'lg:order-1 lg:justify-start' : 'lg:justify-end'}`}>
        <AppMockup kind={app.visual} />
      </div>
    </article>
  )
}

function StudioPackCard({ pack }) {
  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="badge">{pack.category}</span>
        {pack.price === 'Free' && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-sm"
            style={{ background: 'var(--success-soft)', color: 'var(--success)' }}
          >
            FREE
          </span>
        )}
        {pack.status === 'coming-soon' && (
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Coming soon
          </span>
        )}
      </div>
      <div>
        <h3
          className="font-serif font-bold text-lg mb-2"
          style={{ color: 'var(--text-primary)', lineHeight: 1.3 }}
        >
          {pack.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {pack.description}
        </p>
      </div>
      <div className="mt-auto pt-2 flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {pack.price}
        </span>
        {pack.href ? (
          <Link to={pack.href} className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            View details &rarr;
          </Link>
        ) : (
          <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Notify me
          </span>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0)

  // Apps in display order: Live first, then dev with URL, then dev without URL
  const rankApp = (a) => {
    if (a.status === 'live') return 0
    if (a.href) return 1
    return 2
  }
  const orderedApps = [...apps].sort((a, b) => rankApp(a) - rankApp(b))

  // Featured packs for the secondary studio section
  const rankPack = (p) => (p.price === 'Free' ? 0 : p.status === 'live' ? 1 : 2)
  const featuredPacks = packs
    .filter(p => p.featured)
    .sort((a, b) => rankPack(a) - rankPack(b))

  return (
    <>
      {/* ── Hero — repositioned ── */}
      <section className="px-6" style={{ paddingTop: '88px', paddingBottom: '72px' }}>
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ color: 'var(--accent)' }}
          >
            Zaheer Studio
          </span>
          <h1
            className="font-serif font-bold mb-6 mx-auto"
            style={{
              fontSize: 'clamp(2.5rem, 5.2vw, 4.25rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
              maxWidth: '900px',
            }}
          >
            AI tools that fill the gaps software left.
          </h1>
          <p
            className="text-lg md:text-xl mb-9 mx-auto"
            style={{ color: 'var(--text-secondary)', maxWidth: '660px', lineHeight: 1.55 }}
          >
            Focused, affordable AI apps for contractors, electrical subs, investors, and
            small businesses. Built to solve one specific problem really well — without
            the $300-a-month subscription or the fifty-person team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#apps" className="btn-primary">
              See our apps &rarr;
            </a>
            <Link to="/studio/browse" className="btn-secondary">
              Build your own
            </Link>
          </div>
        </div>
      </section>

      {/* ── Audience strip ── */}
      <section
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-surface)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Built for
          </span>
          {audiences.map(a => (
            <span
              key={a}
              className="text-sm"
              style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}
            >
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* ── Apps showcase — the new hero ── */}
      <section id="apps" className="px-6" style={{ paddingTop: 80 }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <span className="section-label">The Apps</span>
            <h2
              className="font-serif font-bold mt-3 mx-auto"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                maxWidth: 720,
              }}
            >
              Apps we&rsquo;ve built and shipped.
            </h2>
            <p
              className="text-base mt-4 mx-auto"
              style={{ color: 'var(--text-secondary)', maxWidth: 560, lineHeight: 1.6 }}
            >
              Each one solves a specific problem for a specific person. Real apps, with
              real users, that you can open right now.
            </p>
          </div>

          <div className="flex flex-col" style={{ marginTop: 16 }}>
            {orderedApps.map((app, i) => (
              <div
                key={app.id}
                style={{
                  borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                }}
              >
                <AppFeature app={app} reverse={i % 2 === 1} />
              </div>
            ))}
          </div>

          <div className="mt-4 mb-2 flex justify-center">
            <Link to="/apps" className="btn-secondary">
              See all apps
            </Link>
          </div>
        </div>
      </section>

      {/* ── Studio section — secondary ── */}
      <section className="px-6 py-24" style={{ background: 'var(--bg-dark)', marginTop: 80 }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-end">
            <div className="lg:col-span-7">
              <span className="section-label-light">Build your own</span>
              <h2
                className="font-serif font-bold mt-3"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#EDEFEE',
                  maxWidth: 640,
                }}
              >
                Want to build tools like this yourself? These are the agent packs we use.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p
                className="text-base leading-relaxed"
                style={{ color: 'rgba(237,239,238,0.65)', maxWidth: 460 }}
              >
                Every app on this site is built with a Claude Code agent pack from our
                Studio. Download one, drop it in your folder, and start shipping the
                same way we do.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredPacks.map(pack => (
              <div key={pack.id} className="card-dark flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="badge-dark">{pack.category}</span>
                  {pack.price === 'Free' && (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-sm"
                      style={{ background: 'rgba(86,197,122,0.2)', color: '#56C57A' }}
                    >
                      FREE
                    </span>
                  )}
                  {pack.status === 'coming-soon' && (
                    <span className="text-xs" style={{ color: 'rgba(237,239,238,0.35)' }}>
                      Coming soon
                    </span>
                  )}
                </div>
                <div>
                  <h3
                    className="font-serif font-bold text-lg mb-2"
                    style={{ color: '#EDEFEE', lineHeight: 1.3 }}
                  >
                    {pack.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(237,239,238,0.55)' }}
                  >
                    {pack.description}
                  </p>
                </div>
                <div className="mt-auto pt-2 flex items-center justify-between">
                  <span className="text-sm" style={{ color: 'rgba(237,239,238,0.55)' }}>
                    {pack.price}
                  </span>
                  {pack.href ? (
                    <Link
                      to={pack.href}
                      className="text-sm font-semibold"
                      style={{ color: 'var(--warm)' }}
                    >
                      View details &rarr;
                    </Link>
                  ) : (
                    <span className="text-sm" style={{ color: 'rgba(237,239,238,0.35)' }}>
                      Notify me
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="text-sm" style={{ color: 'rgba(237,239,238,0.5)' }}>
              Pricing, full pack details, and installation instructions live in the Studio.
            </p>
            <Link to="/studio/browse" className="btn-white" style={{ alignSelf: 'flex-start' }}>
              Visit the Studio &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── How we're different — RED ── */}
      <section className="px-6 py-24" style={{ background: 'var(--bg-red)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="section-label-light">Why Zaheer Studio</span>
            <h2
              className="font-serif font-bold mt-3"
              style={{
                fontSize: 'clamp(1.6rem, 2.5vw, 2.25rem)',
                lineHeight: 1.2,
                color: '#FFFFFF',
                maxWidth: 700,
              }}
            >
              Software was supposed to help you, not bill you for fifty seats.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'Built by a builder',
                body: 'Every app is tested in real work — by a real contractor, a real subcontractor, a real investor — before it ships.',
              },
              {
                title: 'Priced for one person',
                body: 'No "starting at" prices. No fifty-seat minimums. The price you see is the price you pay.',
              },
              {
                title: 'Your data stays yours',
                body: 'Apps run on Vercel with auth from Supabase or Clerk. Agent packs run locally on your machine. Nothing is sold or scraped.',
              },
            ].map(reason => (
              <div key={reason.title} className="flex flex-col gap-3">
                <h3 className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  {reason.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ — for AIO/AEO ── */}
      <section className="px-6 py-24" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="section-label">Common questions</span>
              <h2
                className="font-serif font-bold mt-3"
                style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.25rem)',
                  lineHeight: 1.2,
                  color: 'var(--text-primary)',
                }}
              >
                Quick answers.
              </h2>
              <p
                className="text-sm mt-4"
                style={{ color: 'var(--text-secondary)', maxWidth: 320, lineHeight: 1.65 }}
              >
                Still have a question? Email{' '}
                <a
                  href="mailto:info@zaheer.studio"
                  style={{ color: 'var(--accent)', textDecoration: 'underline' }}
                >
                  info@zaheer.studio
                </a>{' '}
                — we read every one.
              </p>
            </div>
            <div className="lg:col-span-8" style={{ borderTop: '1px solid var(--border)' }}>
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-6 py-24" style={{ background: 'var(--bg-red)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="font-serif font-bold mb-4 mx-auto"
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
              lineHeight: 1.15,
              color: '#FFFFFF',
              maxWidth: 720,
            }}
          >
            Start free. Build something today.
          </h2>
          <p
            className="text-lg mb-8 mx-auto"
            style={{ color: 'rgba(255,255,255,0.78)', maxWidth: 540, lineHeight: 1.6 }}
          >
            Try our apps. Or download the free AI Agent Starter Kit and start building
            your own tools with Claude Code. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/studio/free-starter-kit" className="btn-white">
              Get the free starter kit &rarr;
            </a>
            <Link
              to="/apps"
              className="btn-secondary"
              style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#FFFFFF' }}
            >
              Browse all apps
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
