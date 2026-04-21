const tree = [
  { indent: 0, type: 'dir',  label: 'ship-stack/' },
  { indent: 1, type: 'dir',  label: '.claude/' },
  { indent: 2, type: 'file', label: 'CLAUDE.md', note: 'agent brain' },
  { indent: 2, type: 'dir',  label: 'commands/' },
  { indent: 3, type: 'file', label: 'research.md' },
  { indent: 3, type: 'file', label: 'draft.md' },
  { indent: 3, type: 'file', label: 'plan.md' },
  { indent: 3, type: 'file', label: 'review.md' },
  { indent: 1, type: 'dir',  label: 'skills/' },
  { indent: 2, type: 'file', label: 'market-research.md' },
  { indent: 2, type: 'file', label: 'content-writer.md' },
  { indent: 2, type: 'file', label: 'sprint-planner.md' },
  { indent: 1, type: 'file', label: 'README.md', note: 'start here' },
]

const INDENT = 16

export default function PackFileTree() {
  return (
    <div
      style={{
        background: '#1E1C1A',
        borderRadius: '10px',
        overflow: 'hidden',
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        maxWidth: '420px',
        width: '100%',
      }}
    >
      {/* Window bar */}
      <div
        style={{
          background: '#252422',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#AA210F', display: 'inline-block' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#D08856', display: 'inline-block' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
        <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.03em' }}>
          what you get
        </span>
      </div>

      {/* File tree */}
      <div style={{ padding: '18px 20px 22px' }}>
        {tree.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '6px',
              paddingLeft: item.indent * INDENT,
              marginBottom: item.type === 'dir' && item.indent === 0 ? '10px' : '5px',
            }}
          >
            <span style={{
              fontSize: '0.7rem',
              color: item.type === 'dir' ? '#D08856' : 'rgba(255,255,255,0.35)',
              flexShrink: 0,
            }}>
              {item.type === 'dir' ? '▾' : '·'}
            </span>
            <span style={{
              fontSize: '0.78rem',
              color: item.indent === 0
                ? '#EDEFEE'
                : item.type === 'dir'
                ? 'rgba(237,239,238,0.75)'
                : 'rgba(237,239,238,0.5)',
              fontWeight: item.indent === 0 ? 700 : 400,
            }}>
              {item.label}
            </span>
            {item.note && (
              <span style={{ fontSize: '0.68rem', color: 'rgba(86,197,122,0.7)', marginLeft: '6px' }}>
                # {item.note}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
