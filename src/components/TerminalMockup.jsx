const lines = [
  { type: 'prompt', text: 'build me a resume rewriter with payments' },
  { type: 'gap' },
  { type: 'step', text: 'Reading CLAUDE.md' },
  { type: 'step', text: 'Scaffolding React + Vite' },
  { type: 'step', text: 'Writing /api/rewrite endpoint' },
  { type: 'step', text: 'Adding Stripe payment gate' },
  { type: 'step', text: 'Deploying to Vercel' },
  { type: 'gap' },
  { type: 'done', text: 'zaheer.studio/resume-rewrite' },
  { type: 'note', text: '47 minutes from prompt to paid app.' },
]

export default function TerminalMockup() {
  return (
    <div
      className="rounded-lg overflow-hidden w-full"
      style={{
        background: '#2A2926',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 24px 64px rgba(65, 64, 60, 0.35)',
        fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', monospace",
        fontSize: '0.82rem',
        lineHeight: 1.65,
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#252422' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#AA210F' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#D08856' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#EDEFEE', opacity: 0.3 }} />
        <span className="ml-3 text-xs" style={{ color: 'rgba(237,239,238,0.4)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em' }}>
          claude / ship-stack
        </span>
      </div>

      {/* Terminal content */}
      <div className="px-5 py-5 flex flex-col">
        {lines.map((line, i) => {
          if (line.type === 'gap') return <div key={i} className="h-3" />

          if (line.type === 'prompt') return (
            <div key={i} className="flex gap-2 items-start">
              <span style={{ color: '#D08856', userSelect: 'none', flexShrink: 0 }}>›</span>
              <span style={{ color: '#EDEFEE' }}>{line.text}</span>
            </div>
          )

          if (line.type === 'step') return (
            <div key={i} className="flex gap-2 items-start">
              <span style={{ color: 'rgba(208,136,86,0.5)', userSelect: 'none', flexShrink: 0 }}>◆</span>
              <span style={{ color: 'rgba(237,239,238,0.45)' }}>{line.text}</span>
            </div>
          )

          if (line.type === 'done') return (
            <div key={i} className="flex gap-2 items-start">
              <span style={{ color: '#56C57A', userSelect: 'none', flexShrink: 0 }}>✓</span>
              <span style={{ color: '#D08856', fontWeight: 600 }}>{line.text}</span>
            </div>
          )

          if (line.type === 'note') return (
            <div key={i} className="flex gap-2 items-start">
              <span style={{ color: 'transparent', userSelect: 'none', flexShrink: 0 }}>✓</span>
              <span style={{ color: 'rgba(237,239,238,0.35)', fontSize: '0.78rem' }}>{line.text}</span>
            </div>
          )

          return null
        })}
      </div>
    </div>
  )
}
