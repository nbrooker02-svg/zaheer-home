import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'

// ─── Data ─────────────────────────────────────────────────────────────────────

const packs = [
  {
    name: 'Ship Stack',
    type: 'Agent',
    status: 'Live',
    description: 'Your Claude Code agent for building and shipping web apps. Type your idea — it handles the stack, the build, the deploy, and the launch.',
    price: '$97',
    buttonLabel: 'View Agent →',
    buttonHref: '/packs/ship-stack',
  },
]

const liveApps = [
  {
    name: 'Resume Rewriter',
    tag: 'Career',
    status: 'Live',
    description: 'Paste your resume, name your target job. Claude rewrites it in seconds — professional language, right keywords, real experience reframed.',
    buttonLabel: 'Open App →',
    href: '/resume-rewrite',
  },
]

const devApps = [
  {
    name: 'Market Read',
    tag: 'Finance',
    status: 'Developing',
    description: 'Select a market sector and get a full AI-powered weekly breakdown — performance, key developments, stock picks, and what to watch next.',
  },
  {
    name: 'PermitPilot',
    tag: 'Construction',
    status: 'Developing',
    description: 'Jurisdiction-specific building permit checklists for contractors. Stop guessing what documents you need — get a plain-English checklist before you submit.',
  },
]

// ─── Components ───────────────────────────────────────────────────────────────

function Tag({ children }) {
  return (
    <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#FF5500' }}>
      {children}
    </span>
  )
}

function StatusBadge({ status }) {
  const isLive = status === 'Live'
  const isDeveloping = status === 'Developing'
  const bg = isLive ? 'rgba(255,85,0,0.12)' : isDeveloping ? 'rgba(255,85,0,0.07)' : 'rgba(255,255,255,0.05)'
  const color = isLive ? '#FF5500' : isDeveloping ? '#C4956A' : '#C4956A'
  const border = isLive ? 'rgba(255,85,0,0.3)' : 'rgba(196,149,106,0.2)'
  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-full border"
      style={{ backgroundColor: bg, color, borderColor: border }}
    >
      {status}
    </span>
  )
}

function PackCard({ pack }) {
  const isLive = pack.status === 'Live'
  return (
    <div
      className="group rounded-xl border p-6 flex flex-col gap-4 transition-all duration-300"
      style={{
        background: '#161616',
        borderColor: '#2A1A12',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = isLive ? 'rgba(255,85,0,0.35)' : '#2A1A12' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A1A12' }}
    >
      <div className="flex items-start justify-between">
        <Tag>{pack.type}</Tag>
        <StatusBadge status={pack.status} />
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F5EDE6' }}>
          {pack.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#C4956A' }}>
          {pack.description}
        </p>
      </div>
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-base font-bold" style={{ color: '#F5EDE6' }}>{pack.price}</span>
        {isLive ? (
          <a
            href={pack.buttonHref}
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
            style={{ background: '#FF5500', color: '#F5EDE6' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e04a00' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FF5500' }}
          >
            {pack.buttonLabel}
          </a>
        ) : (
          <button
            disabled
            className="text-sm font-semibold px-4 py-2 rounded-lg cursor-not-allowed"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#C4956A' }}
          >
            {pack.buttonLabel}
          </button>
        )}
      </div>
    </div>
  )
}

function AppCard({ app }) {
  return (
    <a
      href={app.href}
      className="group rounded-xl border p-6 flex flex-col gap-4 transition-all duration-300"
      style={{ background: '#161616', borderColor: '#2A1A12', display: 'flex' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,85,0,0.35)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A1A12' }}
    >
      <div className="flex items-start justify-between">
        <Tag>{app.tag}</Tag>
        <StatusBadge status={app.status} />
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F5EDE6' }}>
          {app.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#C4956A' }}>
          {app.description}
        </p>
      </div>
      <div className="mt-auto pt-2">
        <span className="text-sm font-semibold" style={{ color: '#FF5500' }}>
          {app.buttonLabel}
        </span>
      </div>
    </a>
  )
}

function DevCard({ app }) {
  return (
    <div
      className="rounded-xl border p-6 flex flex-col gap-4"
      style={{ background: '#161616', borderColor: '#2A1A12', opacity: 0.75 }}
    >
      <div className="flex items-start justify-between">
        <Tag>{app.tag}</Tag>
        <StatusBadge status={app.status} />
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F5EDE6' }}>
          {app.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#C4956A' }}>
          {app.description}
        </p>
      </div>
      <div className="mt-auto pt-2">
        <button
          disabled
          className="text-sm font-semibold px-4 py-2 rounded-lg cursor-not-allowed"
          style={{ background: 'rgba(255,255,255,0.05)', color: '#C4956A' }}
        >
          Coming Soon
        </button>
      </div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <h2 className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#C4956A', fontFamily: "'Inter', sans-serif" }}>
        {children}
      </h2>
      <div className="flex-1 h-px" style={{ background: '#2A1A12' }} />
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen antialiased" style={{ background: '#0e0e0e', color: '#F5EDE6', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Nav ── */}
      <Nav />

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative z-10 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #2a0800 0%, #0e0e0e 70%)',
          paddingTop: '96px',
          paddingBottom: '96px',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ color: '#FF5500', background: 'rgba(255,85,0,0.1)', border: '1px solid rgba(255,85,0,0.2)' }}
            >
              AI Solutions Studio
            </span>
            <h1
              className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F5EDE6', marginTop: '12px' }}
            >
              Simple tools.<br />Serious results.
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#C4956A', maxWidth: '540px' }}>
              We build AI-powered apps, agents, and skill packs made for people who want to move fast and build things that actually work.
            </p>
          </div>
        </div>
      </section>

      {/* ── Packs & Agents ── */}
      <section id="packs" className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <SectionLabel>Packs & Agents</SectionLabel>
        <p className="text-base leading-relaxed mb-10" style={{ color: '#C4956A', maxWidth: '640px' }}>
          Pre-built Claude Code agents and skill packs you can download and run today. Each one is a ready-to-go system built for a specific job — open the folder, start Claude, and get to work.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {packs.map(p => <PackCard key={p.name} pack={p} />)}
        </div>

      </section>

      {/* ── Apps ── */}
      <section id="apps" className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>Apps</SectionLabel>
        <p className="text-base leading-relaxed mb-10" style={{ color: '#C4956A', maxWidth: '540px' }}>
          Real tools, live right now. Each one solves one problem and does it well.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {liveApps.map(a => <AppCard key={a.name} app={a} />)}
        </div>
      </section>

      {/* ── In Development ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>In Development</SectionLabel>
        <p className="text-base leading-relaxed mb-10" style={{ color: '#C4956A', maxWidth: '540px' }}>
          What's being built next in the studio.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {devApps.map(a => <DevCard key={a.name} app={a} />)}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>What We're About</SectionLabel>
        <div className="max-w-xl flex flex-col gap-5">
          {[
            "Zaheer Studios is a small independent studio. We build AI-powered tools, agents, and apps — and we sell the systems we build so other people can use them too.",
            "No bloated platforms. No feature creep. Just focused tools that do exactly what they say.",
            "We believe the best software solves one thing and solves it well. Everything we ship is built to that standard.",
          ].map((para, i) => (
            <p key={i} className="text-base leading-relaxed" style={{ color: '#C4956A' }}>
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />

    </div>
  )
}
