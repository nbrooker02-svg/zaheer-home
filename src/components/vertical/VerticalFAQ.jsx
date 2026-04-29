import { useState } from 'react'

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

export default function VerticalFAQ({ faq }) {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <section id="faq" className="px-6 py-24" style={{ borderTop: '1px solid var(--border)' }}>
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
            {faq.map((f, i) => (
              <FAQItem
                key={i}
                faq={f}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
