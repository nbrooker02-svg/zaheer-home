import { useState } from 'react'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'

// ─── Data ─────────────────────────────────────────────────────────────────────

const accordionItems = [
  {
    title: 'Turn ideas into real apps instantly',
    summary: 'Just type what you want in plain English. It handles the planning, coding, and building for you.',
    expanded: 'You type your idea the same way you\'d tell a friend about it. Ship Stack figures out the rest — what to build, how to build it, what tools to use, and how to get it live. No prompt engineering. No technical knowledge required. Just describe what you want and watch it take shape.',
  },
  {
    title: 'Skip weeks of setup and confusion',
    summary: 'No more getting stuck choosing stacks, wiring things together, or debugging from scratch. It does the heavy lifting.',
    expanded: 'Most people spend more time setting up than actually building. Ship Stack arrives already configured — the right stack, the right structure, the right process baked in. You open it, answer a few questions once, and you\'re building on day one.',
  },
  {
    title: 'Remembers everything',
    summary: 'It keeps your preferences, past builds, and decisions so every new app gets faster and easier.',
    expanded: 'Every preference you share, every correction you make, every decision you land on — Ship Stack saves it. Next session it already knows how you work. The more you use it the less you have to explain. It just gets you.',
  },
  {
    title: 'Gets better over time',
    summary: 'Continuous updates unlock new features, smarter builds, and more powerful capabilities without you doing anything.',
    expanded: 'Every month new update files arrive — new skills, smarter build processes, new app templates, and fixes based on real usage. Drop them in your folder and your agent levels up instantly. No reinstalling, no reconfiguring, no starting over.',
  },
  {
    title: 'One agent for every idea',
    summary: 'SaaS products, tools, dashboards, experiments. If you can think it, you can launch it.',
    expanded: 'SaaS products, internal tools, client dashboards, side projects, experiments. Ship Stack doesn\'t care what you\'re building — it adapts to the idea in front of it. One setup, unlimited builds.',
  },
  {
    title: 'Built around you from day one',
    summary: 'One quick onboarding and it learns your tools, preferences, and goals. After that, it runs your way automatically.',
    expanded: 'The first time you open Ship Stack it walks you through a short onboarding — your name, your tools, your goals, your experience level. After that it never asks again. Everything it does from that point is shaped around exactly how you work.',
  },
  {
    title: 'No experience needed',
    summary: 'Don\'t know where to start? Doesn\'t matter. No frameworks, no setup headaches, no hours lost figuring things out.',
    expanded: 'Never set up a backend before? Never deployed anything? Doesn\'t matter. Ship Stack knows what to do and walks you through every step when you need it. You bring the idea. It brings everything else.',
  },
]

const tableFiles = [
  { file: 'CLAUDE.md', desc: "The agent's brain — loaded every session, holds your stack, your apps, and your preferences" },
  { file: 'MEMORY.md', desc: 'Running memory — updated automatically as the agent learns how you work' },
  { file: 'ACCOUNTS.md', desc: 'Tracks all your tools and account statuses in one place' },
  { file: 'APPS.md', desc: 'Every app you build gets logged here automatically' },
  { file: 'BUSINESS_RULES.md', desc: 'The rules your agent follows to keep you focused and on track' },
  { file: 'STACK.md', desc: 'Your full tech stack — options, recommendations, and your chosen defaults' },
  { file: 'APP_BUILD_PROCESS.md', desc: 'The exact process your agent follows to build and ship every app' },
  { file: 'ONBOARDING.md', desc: 'First-time setup — runs once, personalizes everything to you' },
  { file: 'SKILLS.md', desc: 'How the skills system works and how to create your own' },
  { file: 'README.md', desc: 'Overview of the full system and how to use it' },
]

const whoCards = [
  'Non-technical founders who have app ideas but no developer — go from idea to live product without writing a single line of code',
  'Developers and builders who want to move faster — skip the config, skip the setup, get straight to building with an agent that already knows your stack',
  'Side project builders who want a system that grows with them — your agent improves every session and gets a full upgrade every month',
]

// ─── Components ───────────────────────────────────────────────────────────────

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

// TEST MODE: points to getting started page with a test token so the full download
// flow can be verified before the real Stripe link is activated.
// Replace with the real Stripe URL once confirmed working.
const STRIPE_LINK = '/packs/ship-stack/start?session_id=test_preview_2026'

function BuyCTA() {
  return (
    <a
      href={STRIPE_LINK}
      className="inline-flex items-center text-sm font-semibold px-6 py-3 rounded-lg w-fit transition-all duration-200"
      style={{ background: '#FF5500', color: '#F5EDE6' }}
      onMouseEnter={e => { e.currentTarget.style.background = '#e04a00' }}
      onMouseLeave={e => { e.currentTarget.style.background = '#FF5500' }}
    >
      Buy Now — $97
    </a>
  )
}

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div
      className="rounded-xl border transition-all duration-200"
      style={{
        background: '#161616',
        borderColor: isOpen ? 'rgba(255,85,0,0.3)' : '#2A1A12',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left cursor-pointer bg-transparent border-0"
      >
        <div className="flex flex-col gap-1.5">
          <span className="text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F5EDE6' }}>
            {item.title}
          </span>
          <span className="text-sm leading-relaxed" style={{ color: '#C4956A' }}>
            {item.summary}
          </span>
        </div>
        <span
          className="shrink-0 mt-0.5 text-lg font-light leading-none"
          style={{ color: '#FF5500', width: '20px', textAlign: 'center' }}
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <div className="h-px mb-4" style={{ background: '#2A1A12' }} />
          <p className="text-sm leading-relaxed" style={{ color: '#C4956A' }}>
            {item.expanded}
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShipStack() {
  const [openIndex, setOpenIndex] = useState(null)

  function toggle(i) {
    setOpenIndex(prev => (prev === i ? null : i))
  }

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
              className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ color: '#FF5500', background: 'rgba(255,85,0,0.1)', border: '1px solid rgba(255,85,0,0.2)' }}
            >
              Claude Code Agent
            </span>
            <h1
              className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F5EDE6', marginTop: '12px' }}
            >
              Stop Thinking.<br />Start Building.
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#C4956A' }}>
              The agent that fast tracks web app creation.
            </p>
            <div
              className="text-4xl font-extrabold mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FF5500' }}
            >
              $97
            </div>
            <p className="text-sm mb-6" style={{ color: '#C4956A' }}>One-time purchase. Yours forever.</p>
            <div className="flex flex-col gap-3">
              <BuyCTA />
              <p className="text-xs" style={{ color: '#C4956A' }}>
                Built for Claude Code — requires Claude Pro or higher
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Ship Stack Does ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <SectionLabel>What Ship Stack Does</SectionLabel>
        <div className="flex flex-col gap-3">
          {accordionItems.map((item, i) => (
            <AccordionItem
              key={item.title}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </section>

      {/* ── What's Inside ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>What's Inside</SectionLabel>
        <p className="text-base mb-8" style={{ color: '#C4956A' }}>Every file in the folder and what it does.</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {whoCards.map((text, i) => (
            <div
              key={i}
              className="rounded-xl border p-6"
              style={{ background: '#161616', borderColor: '#2A1A12' }}
            >
              <p className="text-sm leading-relaxed" style={{ color: '#C4956A' }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Getting Started ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>Getting Started</SectionLabel>
        <p className="text-base mb-10" style={{ color: '#C4956A' }}>Setup takes under 10 minutes.</p>
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
        <div className="flex flex-col gap-4">
          <p style={{ fontSize: '18px', color: '#F5EDE6', fontFamily: "'Inter', sans-serif" }}>
            $97 — one-time purchase. Yours forever.
          </p>
          <BuyCTA />
        </div>
      </section>

      <Footer />
    </div>
  )
}
