import { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'

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

function CheckItem({ children }) {
  return (
    <li className="flex gap-3 items-start">
      <span
        className="shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center"
        style={{ background: 'rgba(255,85,0,0.1)', border: '1px solid rgba(255,85,0,0.25)' }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2.5 2.5L8 2.5" stroke="#FF5500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-sm leading-relaxed" style={{ color: '#C4956A' }}>{children}</span>
    </li>
  )
}

function Step({ n, children }) {
  return (
    <li className="flex gap-4 items-start">
      <div
        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
        style={{ background: 'rgba(255,85,0,0.12)', color: '#FF5500', border: '1px solid rgba(255,85,0,0.25)' }}
      >
        {n}
      </div>
      <p className="text-sm leading-relaxed pt-0.5" style={{ color: '#C4956A' }}>{children}</p>
    </li>
  )
}

function Code({ children }) {
  return (
    <code
      className="px-1.5 py-0.5 rounded text-xs font-mono"
      style={{ background: 'rgba(255,85,0,0.1)', color: '#FF5500', border: '1px solid rgba(255,85,0,0.2)' }}
    >
      {children}
    </code>
  )
}

function TroubleItem({ title, children }) {
  return (
    <li className="flex flex-col gap-1">
      <span className="text-sm font-semibold" style={{ color: '#F5EDE6' }}>{title}</span>
      <span className="text-sm leading-relaxed" style={{ color: '#C4956A' }}>{children}</span>
    </li>
  )
}

export default function GettingStarted() {
  const [sessionId, setSessionId] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSessionId(params.get('session_id'))
  }, [])

  async function handleDownload() {
    if (!sessionId) return
    try {
      const res = await fetch('/api/verify-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'ship-stack.zip'
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch {
      // silently fail — button remains disabled
    }
  }

  return (
    <div className="min-h-screen antialiased" style={{ background: '#0e0e0e', color: '#F5EDE6', fontFamily: "'Inter', sans-serif" }}>
      <Nav />

      {/* ── Header ── */}
      <section
        className="relative z-10 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #2a0800 0%, #0e0e0e 70%)',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-xl">
            <h1
              className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F5EDE6' }}
            >
              You're in. Let's get you set up.
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#C4956A' }}>
              Follow the steps below. You'll be up and running in under 10 minutes.
            </p>
            <div className="flex flex-col gap-2">
              {/* Download button — disabled until purchase verification is active */}
              <button
                disabled
                onClick={handleDownload}
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg cursor-not-allowed w-fit"
                style={{ background: 'rgba(255,255,255,0.07)', color: '#C4956A', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Download Ship Stack
              </button>
              <p className="text-xs" style={{ color: '#C4956A', opacity: 0.6 }}>
                Download activates after purchase verification
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Before You Begin ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <SectionLabel>Before You Begin</SectionLabel>
        <p className="text-base mb-8" style={{ color: '#C4956A' }}>Make sure you have these ready.</p>
        <ul className="flex flex-col gap-4 max-w-lg">
          <CheckItem>Claude Code installed — claude.ai/code</CheckItem>
          <CheckItem>Active Claude Pro subscription or higher — claude.com/pricing</CheckItem>
          <CheckItem>VS Code installed (recommended) — code.visualstudio.com</CheckItem>
        </ul>
      </section>

      {/* ── Option A: VS Code ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>Option A — VS Code</SectionLabel>
        <span
          className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-8"
          style={{ color: '#FF5500', background: 'rgba(255,85,0,0.1)', border: '1px solid rgba(255,85,0,0.2)' }}
        >
          Recommended
        </span>
        <ol className="flex flex-col gap-5 max-w-xl">
          <Step n={1}>Download the ZIP above and unzip it — you'll get a folder called "Ship Stack - AI App Builder Agent"</Step>
          <Step n={2}>Open VS Code</Step>
          <Step n={3}>Click <strong style={{ color: '#F5EDE6' }}>File</strong> in the top menu — click <strong style={{ color: '#F5EDE6' }}>Open Folder</strong></Step>
          <Step n={4}>Find and select the "Ship Stack - AI App Builder Agent" folder — click <strong style={{ color: '#F5EDE6' }}>Open</strong></Step>
          <Step n={5}>Open a new terminal: click <strong style={{ color: '#F5EDE6' }}>Terminal</strong> in the top menu — <strong style={{ color: '#F5EDE6' }}>New Terminal</strong></Step>
          <Step n={6}>In the terminal, type <Code>claude</Code> and press Enter</Step>
          <Step n={7}>A prompt will appear: "Do you trust this folder?" — click <strong style={{ color: '#F5EDE6' }}>Yes, I trust this folder</strong></Step>
          <Step n={8}>Type <Code>Begin</Code> and press Enter</Step>
          <Step n={9}>Your agent introduces itself and walks you through onboarding — takes about 10 minutes and only happens once</Step>
        </ol>
      </section>

      {/* ── Option B: Mac Terminal ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>Option B — Mac Terminal</SectionLabel>
        <ol className="flex flex-col gap-5 max-w-xl">
          <Step n={1}>Download the ZIP above and unzip it</Step>
          <Step n={2}>Open Terminal — press Cmd+Space, type Terminal, press Enter</Step>
          <Step n={3}>Type <Code>cd </Code> with a space after, then drag the unzipped folder into the terminal window — the path fills in automatically. Press Enter.</Step>
          <Step n={4}>Type <Code>claude</Code> and press Enter</Step>
          <Step n={5}>Type <Code>Begin</Code> and press Enter</Step>
          <Step n={6}>Your agent introduces itself and walks you through the rest</Step>
        </ol>
      </section>

      {/* ── Option C: Windows ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>Option C — Windows</SectionLabel>
        <ol className="flex flex-col gap-5 max-w-xl">
          <Step n={1}>Download the ZIP above and unzip it</Step>
          <Step n={2}>Open the unzipped folder in File Explorer</Step>
          <Step n={3}>Click the address bar at the top, type <Code>cmd</Code>, press Enter — a terminal opens pointed at that folder</Step>
          <Step n={4}>Type <Code>claude</Code> and press Enter</Step>
          <Step n={5}>Type <Code>Begin</Code> and press Enter</Step>
          <Step n={6}>Your agent introduces itself and walks you through the rest</Step>
        </ol>
      </section>

      {/* ── What to Expect ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>What to Expect</SectionLabel>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#C4956A' }}>
          When you type Begin your agent introduces itself and asks a series of questions — your name, your tools, your experience level, and what you want to build first. This onboarding takes about 10 minutes and only happens once. After that your agent remembers everything. Your first build prompt can be as simple as: I want to build a cover letter generator.
        </p>
      </section>

      {/* ── Troubleshooting ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20" style={{ borderTop: '1px solid #2A1A12' }}>
        <SectionLabel>Something Not Working?</SectionLabel>
        <ul className="flex flex-col gap-6 max-w-2xl">
          <TroubleItem title={<><Code>claude</Code> command not found</>}>
            Claude Code is not installed. Go to claude.ai/code
          </TroubleItem>
          <TroubleItem title='"Permission denied" on Mac'>
            Type <Code>sudo claude</Code> instead
          </TroubleItem>
          <TroubleItem title="Agent not reading your files">
            Make sure you opened the folder itself, not a file inside it
          </TroubleItem>
          <TroubleItem title="Agent skipping onboarding">
            Open CLAUDE.md and check that your name still shows as [YOUR_NAME] in brackets. If so, type Begin again.
          </TroubleItem>
        </ul>
      </section>

      <Footer />
    </div>
  )
}
