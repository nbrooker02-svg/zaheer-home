export default function VerticalHero({ hero }) {
  return (
    <section className="px-6" style={{ paddingTop: '88px', paddingBottom: '64px' }}>
      <div className="max-w-4xl mx-auto text-center">
        <span
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ color: 'var(--accent)' }}
        >
          {hero.eyebrow}
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
          {hero.h1}
        </h1>
        <p
          className="text-lg md:text-xl mb-9 mx-auto"
          style={{ color: 'var(--text-secondary)', maxWidth: '660px', lineHeight: 1.55 }}
        >
          {hero.sub}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={hero.primaryCta.href} className="btn-primary">
            {hero.primaryCta.label} &rarr;
          </a>
          {hero.secondaryCta && (
            <a href={hero.secondaryCta.href} className="btn-secondary">
              {hero.secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
