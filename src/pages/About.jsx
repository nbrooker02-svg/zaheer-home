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
            className="font-serif font-normal mt-3"
            style={{
              fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
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

            <div
              className="flex flex-col gap-1 pt-8 mt-4"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Nathan Brooker
              </p>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Founder, Zaheer Studio
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
