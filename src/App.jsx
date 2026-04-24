import { Link } from 'react-router-dom'
import { packs } from './data/packs'
import TerminalMockup from './components/TerminalMockup'
import PackFileTree from './components/PackFileTree'

const steps = [
  {
    number: '01',
    title: 'Choose your pack',
    body: 'Agents organized by profession. Marketing, real estate, design, sales, and more.',
  },
  {
    number: '02',
    title: 'Install in minutes',
    body: 'Download, drop in your folder, open Claude Code. Onboarding runs automatically.',
  },
  {
    number: '03',
    title: 'Ship faster',
    body: 'Your agent remembers your voice, your tools, your goals. Every task gets faster over time.',
  },
]

const reasons = [
  {
    title: 'Built by a builder, not a corporation',
    body: 'Every pack is tested in real work before it ships. No bloat. No filler.',
  },
  {
    title: 'Built to improve over time',
    body: 'Subscribe once, get every future pack we ship — automatically.',
  },
  {
    title: 'Your data, your machine',
    body: 'Runs locally in Claude Code. Nothing gets sent to us. Works offline.',
  },
]

function DarkPackCard({ pack }) {
  return (
    <div className="card-dark flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="badge-dark">{pack.category}</span>
        {pack.price === 'Free' && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-sm" style={{ background: 'rgba(86,197,122,0.2)', color: '#56C57A' }}>
            FREE
          </span>
        )}
        {pack.status === 'coming-soon' && (
          <span className="text-xs" style={{ color: 'rgba(237,239,238,0.35)' }}>Coming soon</span>
        )}
      </div>
      <div>
        <h3
          className="font-serif font-bold text-lg mb-2"
          style={{ color: '#EDEFEE', lineHeight: 1.3 }}
        >
          {pack.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(237,239,238,0.55)' }}>
          {pack.description}
        </p>
      </div>
      <div className="mt-auto pt-2 flex items-center justify-between">
        <span className="text-sm" style={{ color: 'rgba(237,239,238,0.35)' }}>{pack.price}</span>
        {pack.href ? (
          <Link to={pack.href} className="text-sm font-semibold" style={{ color: 'var(--warm)' }}>
            View details &rarr;
          </Link>
        ) : (
          <span className="text-sm" style={{ color: 'rgba(237,239,238,0.35)' }}>Notify me &rarr;</span>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  const featuredPacks = packs
    .filter(p => p.featured)
    .sort((a, b) => (a.status === 'live' ? 0 : 1) - (b.status === 'live' ? 0 : 1))

  return (
    <>
      {/* ── Hero — split layout ── */}
      <section className="px-6" style={{ paddingTop: '100px', paddingBottom: '96px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text */}
            <div>
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase mb-6"
                style={{ color: 'var(--accent)' }}
              >
                Zaheer Studio
              </span>
              <h1
                className="font-serif font-bold mb-6"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                }}
              >
                The AI toolkit for people who build things solo.
              </h1>
              <p
                className="text-lg mb-10"
                style={{ color: 'var(--text-secondary)', maxWidth: '480px', lineHeight: 1.65 }}
              >
                AI-powered web apps and Claude Code agents built for solo founders,
                freelancers, and one-person operations. No team required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/studio/browse" className="btn-primary">
                  Browse Agents &amp; Skills &rarr;
                </Link>
                <Link to="/apps" className="btn-secondary">
                  Try Our Apps
                </Link>
              </div>
            </div>

            {/* Right: terminal */}
            <div className="lg:pl-4">
              <TerminalMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { value: '3', label: 'Packs available' },
            { value: '$49', label: 'Per pack, one-time' },
            { value: '$19/mo', label: 'All-access subscription' },
            { value: '100%', label: 'Runs locally' },
          ].map((stat, i) => (
            <div
              key={i}
              className="px-8 py-7 flex flex-col gap-1"
              style={{ borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}
            >
              <span
                className="font-serif font-bold"
                style={{ fontSize: '1.75rem', lineHeight: 1, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
              >
                {stat.value}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Packs — DARK ── */}
      <section className="px-6 py-24" style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="section-label-light">Studio Packs</span>
            <h2
              className="font-serif font-bold mt-3"
              style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.25rem)', lineHeight: 1.2, color: '#EDEFEE' }}
            >
              Ready to install. Ready to work.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredPacks.map(pack => (
              <DarkPackCard key={pack.id} pack={pack} />
            ))}
          </div>
          <div className="mt-10 pt-10 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-sm" style={{ color: 'rgba(237,239,238,0.4)' }}>
              More packs shipping.
            </p>
            <Link to="/studio/browse" className="text-sm font-semibold" style={{ color: 'var(--warm)' }}>
              See all packs &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works — LIGHT ── */}
      <section className="px-6 py-24" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Steps */}
            <div>
              <span className="section-label">How It Works</span>
              <h2
                className="font-serif font-bold mt-3 mb-12"
                style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.25rem)', lineHeight: 1.2, color: 'var(--text-primary)' }}
              >
                From download to working in minutes.
              </h2>
              <div className="flex flex-col gap-10">
                {steps.map((step, i) => (
                  <div key={step.number} className="flex gap-6 items-start">
                    <span
                      className="font-serif font-bold flex-shrink-0"
                      style={{ fontSize: '2.5rem', lineHeight: 1, color: 'var(--border)', width: '52px' }}
                    >
                      {step.number}
                    </span>
                    <div className="flex flex-col gap-2 pt-1">
                      <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Visual */}
            <div className="flex justify-center lg:justify-end">
              <PackFileTree />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why It's Different — RED ── */}
      <section className="px-6 py-24" style={{ background: 'var(--bg-red)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="section-label-light">Why Zaheer Studio</span>
            <h2
              className="font-serif font-bold mt-3"
              style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.25rem)', lineHeight: 1.2, color: '#FFFFFF' }}
            >
              Built for one-person operations.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {reasons.map(reason => (
              <div key={reason.title} className="flex flex-col gap-4">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <span style={{ color: '#FFFFFF', fontSize: '0.7rem' }}>&#9679;</span>
                </div>
                <h3 className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {reason.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Also: Live Apps — LIGHT ── */}
      <section className="px-6 py-20" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">Also From Zaheer Studio</span>
              <h2
                className="font-serif font-bold mt-3 mb-4"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.2, color: 'var(--text-primary)' }}
              >
                Live apps. No install.
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
                Beyond the studio, we build and ship standalone apps — web, mobile, and more.
                A look at what else we're working on.
              </p>
              <Link to="/apps" className="btn-secondary">Browse all apps &rarr;</Link>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Resume Rewriter', desc: 'Rewrites your resume to match any job posting.', tag: 'Live' },
                { name: 'Market Read', desc: 'AI sector analysis on any market or industry.', tag: 'Live' },
                { name: 'PermitPilot', desc: 'Permit checklists for contractors, by jurisdiction.', tag: 'Live', href: '/apps/permitpilot' },
              ].map(app => (
                <div
                  key={app.name}
                  className="flex items-center justify-between gap-4 rounded px-5 py-4"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)' }}
                >
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{app.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{app.desc}</p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-sm flex-shrink-0"
                    style={{
                      background: app.tag === 'Live' ? 'var(--success-soft)' : 'var(--bg-elevated)',
                      color: app.tag === 'Live' ? 'var(--success)' : 'var(--text-tertiary)',
                    }}
                  >
                    {app.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Free Pack CTA — RED ── */}
      <section className="px-6 py-24" style={{ background: 'var(--bg-red)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.15, color: '#FFFFFF' }}
          >
            Start with the free kit.
          </h2>
          <p
            className="text-lg mb-8 mx-auto"
            style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '500px', lineHeight: 1.65 }}
          >
            Learn the Zaheer system with our free AI Agent Starter Kit.
            Download it, use it, build from it. No credit card needed.
          </p>
          <a href="/studio/free-starter-kit" className="btn-white">
            Get the Free Kit &rarr;
          </a>
        </div>
      </section>
    </>
  )
}
