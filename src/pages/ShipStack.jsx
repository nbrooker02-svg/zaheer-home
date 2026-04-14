import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'

const tableFiles = [
  { file: 'CLAUDE.md', desc: "The agent's brain — loaded every session, holds your stack, your apps, and your preferences" },
  { file: 'MEMORY.md', desc: 'Running memory — updated automatically as the agent learns how you work' },
  { file: 'ACCOUNTS.md', desc: 'Tracks all your tools and account statuses in one place' },
  { file: 'APPS.md', desc: 'Every app you build gets logged here automatically' },
  { file: 'BUSINESS_RULES.md', desc: 'The rules your agent follows to keep you focused and protected' },
  { file: 'STACK.md', desc: 'Your full tech stack — options, recommendations, and your chosen defaults' },
  { file: 'APP_BUILD_PROCESS.md', desc: 'The exact process your agent follows to build and ship every app' },
  { file: 'ONBOARDING.md', desc: 'First-time setup — runs once, personalizes everything to you' },
  { file: 'SKILLS.md', desc: 'How the skills system works and how to create new ones' },
  { file: 'README.md', desc: 'Overview of the full system and how to use it' },
]

const bullets = [
  'Non-technical founders who have app ideas but no developer — go from idea to live product in 48 hours without writing a line of code',
  'Developers and coders who want to move faster — skip the setup, skip the config, get straight to building with an agent that already knows your stack',
  'Side project builders who want a system that remembers everything and gets smarter over time — your agent improves every single session',
]

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

function DisabledCTA() {
  return (
    <button
      disabled
      className="text-sm font-semibold px-6 py-3 rounded-lg cursor-default"
      style={{ background: 'rgba(255,255,255,0.07)', color: '#C4956A' }}
    >
      Launching Soon
    </button>
  )
}

export default function ShipStack() {
  return (
    <div className="min-h-screen antialiased" style={{ background: '#0e0e0e', color: '#F5EDE6', fontFamily: "'Inter', sans-serif" }}>
      <Nav />

      {/* ── Hero ── */}
      <section
        className="relative z-10 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #2a0800 0%, #0e0e0e 70%)',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6"
              style={{ color: '#FF5500', background: 'rgba(255,85,0,0.1)', border: '1px solid rgba(255,85,0,0.2)' }}
            >
              Agent
            </span>
            <h1
              className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F5EDE6' }}
            >
              Ship Stack
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#C4956A', maxWidth: '540px' }}>
              Your Claude Code agent for building and shipping web apps. Type your idea — it handles the stack, the build, the deploy, and the launch.
            </p>
            <div
              className="text-4xl font-bold mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF5500' }}
            >
              $97
            </div>
            <div className="flex flex-col gap-3">
              <DisabledCTA />
              <p className="text-xs" style={{ color: '#C4956A' }}>
                Built for Claude Code — requires Claude Pro or higher
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What It Does ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <SectionLabel>What It Does</SectionLabel>
        <div className="max-w-2xl flex flex-col gap-5">
          {[
            "Ship Stack gives Claude Code a complete brain for building web apps. Once set up, your agent knows your stack, your tools, your preferences, and exactly how to build and deploy apps from start to finish.",
            "You type your idea. It handles everything else — scaffolding the frontend, writing the backend, deploying to Vercel, connecting your domain, and setting up payments. From idea to live URL in 48 hours.",
            "It also updates itself. Every session it remembers what it learns about how you work. Every month you get updated files that make it smarter. The longer you use it the better it gets.",
          ].map((para, i) => (
            <p key={i} className="text-base leading-relaxed" style={{ color: '#C4956A' }}>
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ── What's Inside ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>What's Inside</SectionLabel>
        <p className="text-base mb-8" style={{ color: '#C4956A' }}>Everything in the folder — and what each file does.</p>
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: '#2A1A12' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #2A1A12', background: '#161616' }}>
                <th className="text-left px-5 py-3 font-semibold tracking-wide text-xs uppercase" style={{ color: '#C4956A', width: '38%' }}>File</th>
                <th className="text-left px-5 py-3 font-semibold tracking-wide text-xs uppercase" style={{ color: '#C4956A' }}>What it does</th>
              </tr>
            </thead>
            <tbody>
              {tableFiles.map((row, i) => (
                <tr
                  key={row.file}
                  style={{
                    borderTop: i === 0 ? 'none' : '1px solid #2A1A12',
                    background: i % 2 === 0 ? '#0e0e0e' : '#161616',
                  }}
                >
                  <td className="px-5 py-3.5 font-mono text-xs" style={{ color: '#FF5500' }}>{row.file}</td>
                  <td className="px-5 py-3.5 leading-relaxed" style={{ color: '#C4956A' }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>Who It's For</SectionLabel>
        <ul className="max-w-2xl flex flex-col gap-4">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#FF5500' }} />
              <p className="text-base leading-relaxed" style={{ color: '#C4956A' }}>{b}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Getting Started ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>Getting Started</SectionLabel>
        <p className="text-base mb-10" style={{ color: '#C4956A' }}>Here's a preview of how easy setup is.</p>
        <div className="max-w-lg flex flex-col gap-4">
          {[
            { n: 1, label: 'Download and unzip the folder' },
            { n: 2, label: 'Open it in VS Code or your terminal' },
          ].map(({ n, label }) => (
            <div key={n} className="flex gap-4 items-start">
              <div
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'rgba(255,85,0,0.12)', color: '#FF5500', border: '1px solid rgba(255,85,0,0.25)' }}
              >
                {n}
              </div>
              <p className="text-base leading-relaxed pt-0.5" style={{ color: '#F5EDE6' }}>{label}</p>
            </div>
          ))}
          {/* Locked steps */}
          {[3, 4, 5].map(n => (
            <div key={n} className="flex gap-4 items-start opacity-30">
              <div
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: '#161616', border: '1px solid #2A1A12' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="3" y="5" width="6" height="5" rx="1" stroke="#C4956A" strokeWidth="1.2" />
                  <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="#C4956A" strokeWidth="1.2" />
                </svg>
              </div>
              <div className="flex-1 h-4 rounded mt-1.5" style={{ background: '#2A1A12' }} />
            </div>
          ))}
        </div>
        <p className="text-sm mt-8" style={{ color: '#C4956A', opacity: 0.6 }}>
          Full setup guide unlocks after purchase.
        </p>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <div className="max-w-sm flex flex-col gap-4">
          <p className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F5EDE6' }}>
            $97 — one-time purchase. Yours forever.
          </p>
          <div className="flex flex-col gap-3">
            <DisabledCTA />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
