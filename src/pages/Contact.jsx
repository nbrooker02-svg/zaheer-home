export default function Contact() {
  return (
    <>
      <section
        className="px-6"
        style={{ paddingTop: '80px', paddingBottom: '64px', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            Contact
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
            Get in touch.
          </h1>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div style={{ maxWidth: '480px' }} className="flex flex-col gap-8">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Questions about an app, a pack, or whether Zaheer Studio is a fit for your work -- reach out directly.
            </p>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>
                Email
              </p>
              <a
                href="mailto:hello@zaheer.studio"
                className="text-base font-medium transition-colors duration-150"
                style={{ color: 'var(--accent)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-hover)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--accent)' }}
              >
                hello@zaheer.studio
              </a>
            </div>

            <div
              className="pt-4"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Response time is typically within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
