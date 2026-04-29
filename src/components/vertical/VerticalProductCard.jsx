// Large alternating product feature row. Reusable for any vertical.

function StatusBadge({ status }) {
  if (status === 'live') {
    return (
      <span
        className="text-xs font-semibold px-2.5 py-1 rounded-sm"
        style={{ background: 'var(--success-soft)', color: 'var(--success)' }}
      >
        ● Live
      </span>
    )
  }
  if (status === 'development') {
    return (
      <span
        className="text-xs font-semibold px-2.5 py-1 rounded-sm"
        style={{ background: 'var(--warm-soft)', color: 'var(--warning)' }}
      >
        In Development
      </span>
    )
  }
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-sm"
      style={{ background: 'var(--bg-elevated)', color: 'var(--text-tertiary)' }}
    >
      Coming soon
    </span>
  )
}

export default function VerticalProductCard({ product, reverse, visual }) {
  return (
    <article
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      style={{ paddingTop: 64, paddingBottom: 64 }}
    >
      <div className={reverse ? 'lg:order-2' : ''}>
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <StatusBadge status={product.status} />
        </div>
        <h3
          className="font-serif font-bold mb-3"
          style={{
            fontSize: 'clamp(1.6rem, 2.6vw, 2.25rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}
        >
          {product.name} — {product.tagline}
        </h3>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: 'var(--text-secondary)', maxWidth: 480 }}
        >
          {product.description}
        </p>
        <ul className="flex flex-col gap-2.5 mb-6">
          {product.bullets.map(b => (
            <li
              key={b}
              className="flex gap-2.5 items-start text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>✓</span>
              {b}
            </li>
          ))}
        </ul>
        <p
          className="text-xs font-semibold tracking-wide uppercase mb-6"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {product.audience}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <a href={product.href} className="btn-primary">
            {product.cta} &rarr;
          </a>
          <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            {product.pricing}
          </span>
        </div>
      </div>
      <div className={`flex justify-center ${reverse ? 'lg:order-1 lg:justify-start' : 'lg:justify-end'}`}>
        {visual}
      </div>
    </article>
  )
}
