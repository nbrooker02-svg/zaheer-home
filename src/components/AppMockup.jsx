// Three on-brand visual mockups, picked by app id.
// Pure JSX/CSS — no external assets. Mirrors the design language of TerminalMockup.

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

function Shell({ title, children }) {
  return (
    <div
      style={{
        background: '#2A2926',
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 24px 64px rgba(65, 64, 60, 0.35)',
        width: '100%',
        maxWidth: 480,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}
    >
      <WindowChrome title={title} />
      <div style={{ padding: 22 }}>{children}</div>
    </div>
  )
}

function PermitPilotMockup() {
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
      <WindowChrome title="permitpilot · austin, tx" />
      <div
        style={{
          padding: 14,
          background: 'linear-gradient(180deg, #2A2926 0%, #1E1C1A 100%)',
        }}
      >
        <img
          src="/permitpilot-checklist.png"
          alt="PermitPilot — real lookup result for an Austin, TX roofing permit, showing a checklist of documents required before submittal"
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

function BackBillMockup() {
  const bars = Array.from({ length: 28 }, (_, i) => {
    const seed = Math.sin(i * 1.7) * Math.cos(i * 0.6)
    return Math.abs(seed) * 26 + 6
  })
  return (
    <Shell title="backbill · change order #047">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#AA210F',
            boxShadow: '0 0 0 4px rgba(170,33,15,0.18)',
          }}
        />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8rem',
            color: 'rgba(237,239,238,0.85)',
            fontWeight: 600,
          }}
        >
          Recording
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.78rem',
            color: 'rgba(237,239,238,0.5)',
          }}
        >
          0:34
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 40, marginBottom: 18 }}>
        {bars.map((h, i) => (
          <span
            key={i}
            style={{
              width: 3,
              height: h,
              background: i < 22 ? '#D08856' : 'rgba(208,136,86,0.25)',
              borderRadius: 2,
            }}
          />
        ))}
      </div>

      <div
        style={{
          padding: '12px 14px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 6,
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.82rem',
          color: 'rgba(237,239,238,0.78)',
          lineHeight: 1.55,
          marginBottom: 14,
          fontStyle: 'italic',
        }}
      >
        "Add four extra outlets on the north wall plus a 50-amp circuit
        for the EV charger. Materials and two extra hours."
      </div>

      <div
        style={{
          padding: '14px 16px',
          background: 'rgba(170,33,15,0.12)',
          border: '1px solid rgba(170,33,15,0.3)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              color: 'rgba(237,239,238,0.55)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 4,
            }}
          >
            COR drafted
          </div>
          <div
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.92rem',
              color: '#EDEFEE',
              fontWeight: 700,
            }}
          >
            Change Order #047
          </div>
        </div>
        <div
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '1.4rem',
            color: '#56C57A',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          +$1,240
        </div>
      </div>
    </Shell>
  )
}

function MarketReadMockup() {
  const sectors = [
    { name: 'Energy', change: '+4.2%', up: true },
    { name: 'Tech', change: '-1.8%', up: false },
    { name: 'Healthcare', change: '+0.6%', up: true },
    { name: 'Financials', change: '+2.1%', up: true },
  ]
  // sparkline points
  const pts = [4, 8, 6, 10, 14, 12, 18, 22, 19, 24, 28, 26, 32]
  const max = Math.max(...pts)
  const path = pts
    .map((p, i) => {
      const x = (i / (pts.length - 1)) * 100
      const y = 100 - (p / max) * 100
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  return (
    <Shell title="market-read · weekly · apr 27">
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.72rem',
          color: 'rgba(237,239,238,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 6,
        }}
      >
        US Markets · Week of Apr 27
      </div>
      <div
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '1rem',
          color: '#EDEFEE',
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        Sector breakdown
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {sectors.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 10px',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: 'rgba(237,239,238,0.85)' }}>
              {s.name}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.82rem',
                fontWeight: 600,
                color: s.up ? '#56C57A' : '#D08856',
              }}
            >
              {s.up ? '▲' : '▼'} {s.change}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.7rem',
            color: 'rgba(237,239,238,0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 6,
          }}
        >
          XLE · Energy · 30d
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: 36 }}>
          <path d={path} fill="none" stroke="#56C57A" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 6,
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.74rem',
          }}
        >
          <span style={{ color: 'rgba(237,239,238,0.5)' }}>Top pick</span>
          <span style={{ color: '#D08856', fontWeight: 600 }}>$XOM · +6.4%</span>
        </div>
      </div>
    </Shell>
  )
}

const map = {
  permitpilot: PermitPilotMockup,
  backbill: BackBillMockup,
  marketread: MarketReadMockup,
}

export default function AppMockup({ kind }) {
  const Cmp = map[kind] || PermitPilotMockup
  return <Cmp />
}
