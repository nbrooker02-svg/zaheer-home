import { Link } from 'react-router-dom'
import { packs } from './data/packs'

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
    title: 'Updated monthly',
    body: 'Subscribe once, get every future pack and update automatically.',
  },
  {
    title: 'Your data, your machine',
    body: 'Runs locally in Claude Code. Nothing gets sent to us. Works offline.',
  },
]

function FeaturedPackCard({ pack }) {
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
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Coming soon</span>
        )}
      </div>
      <div>
        <h3
          className="font-serif font-normal text-xl mb-2"
          style={{ color: 'var(--text-primary)', lineHeight: 1.3 }}
        >
          {pack.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {pack.description}
        </p>
      </div>
      <div className="mt-auto pt-2 flex items-center justify-between">
        <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{pack.price}</span>
        {pack.href ? (
          <a href={pack.href} className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
            View details &rarr;
          </a>
        ) : (
          <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Notify me &rarr;</span>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  const featuredPacks = packs.filter(p => p.featured)

  return (
    <>
      {/* Hero */}
      <section
        className="px-6"
        style={{ paddingTop: '128px', paddingBottom: '96px' }}
      >
        <div className="max-w-6xl mx-auto">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: 'var(--accent)' }}
            >
              Zaheer Studio
            </span>
            <h1
              className="font-serif font-normal mb-6"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              The AI toolkit for people who build things solo.
            </h1>
            <p
              className="text-lg mb-10 mx-auto"
              style={{ color: 'var(--text-secondary)', maxWidth: '580px', lineHeight: 1.65 }}
            >
              AI-powered web apps and Claude Code agents built for solo founders,
              freelancers, and one-person operations. No team required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/studio/browse" className="btn-primary">
                Browse Agents &amp; Skills &rarr;
              </a>
              <Link to="/apps" className="btn-secondary">
                Try Our Apps
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Two Paths */}
      <section
        className="px-6 py-24"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card flex flex-col gap-5" style={{ padding: '40px' }}>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
                Live Web Apps
              </span>
              <h2
                className="font-serif font-normal"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.2, color: 'var(--text-primary)' }}
              >
                Use them right in your browser.
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Purpose-built AI tools that solve one problem exactly.
                Resume rewriting, market research, content generation.
                Pay once, use forever.
              </p>
              <Link to="/apps" className="text-sm font-medium mt-auto" style={{ color: 'var(--accent)' }}>
                See all apps &rarr;
              </Link>
            </div>

            <div className="card flex flex-col gap-5" style={{ padding: '40px' }}>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
                Agents &amp; Skills
              </span>
              <h2
                className="font-serif font-normal"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.2, color: 'var(--text-primary)' }}
              >
                Download, install, own.
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Pre-configured Claude Code agents for specific professions.
                Run locally. Your data stays with you. Works offline.
                Updates monthly if you subscribe.
              </p>
              <a href="/studio/browse" className="text-sm font-medium mt-auto" style={{ color: 'var(--accent)' }}>
                Browse Studio &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packs */}
      <section
        className="px-6 py-24"
        style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>
              Studio Packs
            </span>
            <h2
              className="font-serif font-normal mt-3"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.2, color: 'var(--text-primary)' }}
            >
              Ready to install. Ready to work.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredPacks.map(pack => (
              <FeaturedPackCard key={pack.id} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="px-6 py-24"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>
              How It Works
            </span>
            <h2
              className="font-serif font-normal mt-3"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.2, color: 'var(--text-primary)' }}
            >
              From download to working in minutes.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map(step => (
              <div key={step.number} className="flex flex-col gap-4">
                <span
                  className="font-serif font-normal"
                  style={{ fontSize: '3.5rem', lineHeight: 1, color: 'var(--border)' }}
                >
                  {step.number}
                </span>
                <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It's Different */}
      <section
        className="px-6 py-24"
        style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>
              Why Zaheer Studio
            </span>
            <h2
              className="font-serif font-normal mt-3"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.2, color: 'var(--text-primary)' }}
            >
              Built for one-person operations.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {reasons.map(reason => (
              <div key={reason.title} className="flex flex-col gap-3">
                <div
                  className="w-6 h-6 rounded-sm flex items-center justify-center"
                  style={{ background: 'var(--accent-soft)' }}
                >
                  <span style={{ color: 'var(--accent)', fontSize: '0.6rem' }}>&#9679;</span>
                </div>
                <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {reason.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section
        className="px-6 py-24"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center" style={{ maxWidth: '520px', margin: '0 auto' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: 'var(--text-tertiary)' }}>
              Early Access
            </p>
            <p
              className="font-serif font-normal"
              style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', lineHeight: 1.5, color: 'var(--text-secondary)' }}
            >
              "Early access users are shipping faster."
            </p>
            <p className="text-sm mt-6" style={{ color: 'var(--text-tertiary)' }}>
              Testimonials coming soon. Using it? Tell us what changed.
            </p>
          </div>
        </div>
      </section>

      {/* Free Pack CTA */}
      <section
        className="px-6 py-24"
        style={{ background: 'var(--accent-soft)', borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="font-serif font-normal mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.2, color: 'var(--text-primary)' }}
          >
            Start with the free kit.
          </h2>
          <p
            className="text-lg mb-8 mx-auto"
            style={{ color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.65 }}
          >
            Learn the Zaheer system with our free AI Agent Starter Kit.
            Download it, use it, build from it. No credit card needed.
          </p>
          <a href="/studio/free-starter-kit" className="btn-primary">
            Get the Free Kit &rarr;
          </a>
        </div>
      </section>
    </>
  )
}
