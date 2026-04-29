export default function VerticalTrust({ trust }) {
  return (
    <section id="why-us" className="px-6 py-24" style={{ background: 'var(--bg-red)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="section-label-light">{trust.eyebrow}</span>
          <h2
            className="font-serif font-bold mt-3"
            style={{
              fontSize: 'clamp(1.6rem, 2.5vw, 2.25rem)',
              lineHeight: 1.2,
              color: '#FFFFFF',
              maxWidth: 700,
            }}
          >
            {trust.h2}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {trust.points.map(p => (
            <div key={p.title} className="flex flex-col gap-3">
              <h3 className="text-base font-semibold" style={{ color: '#FFFFFF' }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
