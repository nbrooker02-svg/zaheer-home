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
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}
          >
            Built by a builder.
          </h1>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div style={{ maxWidth: '640px' }} className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Zaheer Studio is an independent studio. We build AI-powered tools, agents, and apps -- and we sell the systems we build so other people can use them too.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              No bloated platforms. No feature creep. Just focused tools that do exactly what they say.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              The best software solves one thing and solves it well. Everything we ship is built to that standard.
            </p>
            <div className="flex flex-col gap-1 pt-8 mt-4" style={{ borderTop: '1px solid var(--border)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Nathan Brooker</p>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Founder, Zaheer Studio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Red CTA */}
      <section className="px-6 py-20" style={{ background: 'var(--bg-red)' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.2, color: '#FFFFFF' }}
          >
            Want to see what we're building?
          </h2>
          <p className="text-base mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Browse the apps and agent packs in the studio.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/studio/browse" className="btn-white">Browse Studio &rarr;</a>
          </div>
        </div>
      </section>
    </>
  )
}
