export default function About() {
  return (
    <>
      <section
        className="px-6"
        style={{ paddingTop: '80px', paddingBottom: '64px', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            About
          </span>
          <h1
            className="font-serif font-bold mt-3"
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--text-primary)', maxWidth: '720px' }}
          >
            Software was supposed to help you.
          </h1>
          <p
            className="text-lg mt-5"
            style={{ color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.6 }}
          >
            Somewhere along the way it became something you have to fight to afford.
            We're building the tools that fix that.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div style={{ maxWidth: '640px' }} className="flex flex-col gap-8">

            <div className="flex flex-col gap-5">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Most software wasn't built for you. It was built for teams of fifty.
                Priced for departments with budgets. Stuffed with features designed to
                justify a sales call.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                The contractor at midnight pricing a job. The marketer juggling five clients.
                The freelancer who just wants to send a clean invoice. None of you were the customer.
              </p>
            </div>

            <div className="flex flex-col gap-5 pt-4">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Zaheer Studios builds for the people software forgot.</strong>
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Every product replaces something you'd otherwise pay $50 to $300 a month for &mdash;
                with a $49 download you own forever, or a free app that solves one specific problem.
                The marketing agent priced for agencies. The research tool priced for hedge funds.
                The automation built for enterprises.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                We build it once. We ship it once. And you keep it.
              </p>
            </div>

            <div
              className="my-4 px-6 py-6 rounded"
              style={{ background: 'var(--accent-soft)', borderLeft: '3px solid var(--accent)' }}
            >
              <p
                className="font-serif text-xl leading-snug"
                style={{ color: 'var(--text-primary)', fontWeight: 600 }}
              >
                One rule decides what we ship: it has to save you time or save you money.
                Usually both. If it can't do that, it doesn't get made.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                No bloat. No subscription tiers designed to upsell you. No "contact sales for pricing."
                What you see is what it costs.
              </p>
            </div>

            <div className="flex flex-col gap-5 pt-4">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I'm Nathan. I built this studio because I needed it first. Every agent in the
                studio runs in my own work before it ships to anyone else.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                You can email me directly. I read everything that comes in.
              </p>
            </div>

            <div className="flex flex-col gap-1 pt-8 mt-2" style={{ borderTop: '1px solid var(--border)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Nathan Brooker</p>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Founder, Zaheer Studios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Red CTA */}
      <section className="px-6 py-20" style={{ background: 'var(--bg-red)' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', lineHeight: 1.15, color: '#FFFFFF' }}
          >
            See what we're building.
          </h2>
          <p className="text-base mb-6" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '480px' }}>
            Apps and agents that save you time. Or money. Usually both.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/studio/browse" className="btn-white">Browse the studio &rarr;</a>
            <a href="/apps" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#FFFFFF' }}>
              See the apps
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
