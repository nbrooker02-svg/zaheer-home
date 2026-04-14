const apps = [
  {
    name: 'Resume Rewriter',
    description: 'Paste your resume, name your target job. Claude rewrites it in seconds — professional language, right keywords, real experience reframed.',
    url: '/resume-rewrite',
    tag: 'Career',
    status: 'Live',
  },
  {
    name: 'Market Read',
    description: 'Select a market sector and get a full AI-powered weekly breakdown — performance, key developments, stock picks, and what to watch next.',
    url: null,
    tag: 'Finance',
    status: 'Developing',
  },
]

function AppCard({ app }) {
  const isLive = app.status === 'Live'

  const cardClass = `group relative block rounded-2xl border p-6 transition-all duration-300 ${
    isLive
      ? 'border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-white/8 cursor-pointer'
      : 'border-white/5 bg-white/3 cursor-default opacity-60'
  }`

  const statusClass = isLive
    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
    : 'bg-amber-500/15 text-amber-400 border-amber-500/20'

  const inner = (
    <>
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400">
          {app.tag}
        </span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusClass}`}>
          {app.status}
        </span>
      </div>
      <h3 className={`text-lg font-bold text-white mb-2 ${isLive ? 'group-hover:text-indigo-300' : ''} transition-colors`}>
        {app.name}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-5">
        {app.description}
      </p>
      {isLive && (
        <span className="text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
          Open app →
        </span>
      )}
    </>
  )

  if (!isLive) return <div className={cardClass}>{inner}</div>
  return <a href={app.url} className={cardClass}>{inner}</a>
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#07070f] text-slate-100 antialiased">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-white tracking-tight">Zaheer Studio</span>
          </div>
          <span className="text-xs text-slate-500 font-medium tracking-wide">zaheer.studio</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400 mb-5">
            AI-Powered Web Apps
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            Simple tools.<br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Serious results.
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
            We build focused AI-powered web apps that solve one real problem at a fair price. No subscriptions to forget, no dashboards you'll never use — just tools that work.
          </p>
        </div>
      </section>

      {/* Apps */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-32">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-slate-500">
            What We've Built
          </h2>
          <div className="flex-1 h-px bg-white/5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <AppCard key={app.name} app={app} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm text-slate-600">
            © {new Date().getFullYear()} Zaheer Studio
          </span>
          <span className="text-sm text-slate-600">
            Built with Claude
          </span>
        </div>
      </footer>

    </div>
  )
}
