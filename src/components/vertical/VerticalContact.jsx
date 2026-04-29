export default function VerticalContact({ contact }) {
  return (
    <section id="contact" className="px-6 py-24" style={{ background: 'var(--bg-red)' }}>
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
          {contact.h2}
        </h2>
        <p
          className="text-lg mb-8 mx-auto"
          style={{ color: 'rgba(255,255,255,0.78)', maxWidth: 540, lineHeight: 1.6 }}
        >
          {contact.body}
        </p>
        <a href={contact.primaryCta.href} className="btn-white">
          {contact.primaryCta.label} &rarr;
        </a>
      </div>
    </section>
  )
}
