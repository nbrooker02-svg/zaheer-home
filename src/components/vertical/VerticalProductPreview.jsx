// Frames a product preview screenshot in a dark window-chrome shell so a
// plain white-on-white app screenshot reads as intentional UI on the page.
// Falls back to a placeholder block when the product has no preview defined.
//
// Used by VerticalHub to render the side-by-side visual next to each product.

function WindowChrome({ title }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: '#252422',
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#AA210F' }} />
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#D08856' }} />
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(237,239,238,0.3)' }} />
      <span
        style={{
          marginLeft: 10,
          fontSize: '0.7rem',
          color: 'rgba(237,239,238,0.45)',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.02em',
        }}
      >
        {title}
      </span>
    </div>
  )
}

export default function VerticalProductPreview({ preview, fallbackName }) {
  if (!preview?.image) {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          aspectRatio: '4 / 3',
          borderRadius: 10,
          background: 'linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-surface) 100%)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-tertiary)',
          fontSize: '0.85rem',
        }}
      >
        [ {fallbackName} preview — coming soon ]
      </div>
    )
  }

  return (
    <div
      style={{
        background: '#2A2926',
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 24px 64px rgba(65, 64, 60, 0.35)',
        width: '100%',
        maxWidth: 540,
      }}
    >
      <WindowChrome title={preview.chrome || fallbackName.toLowerCase()} />
      <div style={{ padding: 14, background: 'linear-gradient(180deg, #2A2926 0%, #1E1C1A 100%)' }}>
        <img
          src={preview.image}
          alt={preview.alt}
          loading="lazy"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        />
      </div>
    </div>
  )
}
