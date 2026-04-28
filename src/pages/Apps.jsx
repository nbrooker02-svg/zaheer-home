import { apps } from '../data/apps'

function AppCard({ app }) {
  const isLive = app.status === 'live'
  const hasLink = !!app.href

  const inner = (
    <div className="card flex flex-col gap-4" style={{ opacity: isLive || hasLink ? 1 : 0.7, height: '100%' }}>
      <div className="flex items-start justify-between">
        <span className="badge">{app.category}</span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-sm"
          style={{
            background: isLive ? 'var(--success-soft)' : 'var(--warm-soft)',
            color: isLive ? 'var(--success)' : 'var(--warning)',
          }}
        >
          {isLive ? 'Live' : 'In Development'}
        </span>
      </div>
      <div>
        <h3 className="font-serif font-bold text-lg mb-2" style={{ color: 'var(--text-primary)', lineHeight: 1.3 }}>
          {app.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {app.description}
        </p>
      </div>
      <div className="mt-auto pt-2 flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
          {app.price}
        </span>
        {hasLink ? (
          <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            {isLive ? 'Open app' : 'See preview'} &rarr;
          </span>
        ) : (
          <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Coming soon
          </span>
        )}
      </div>
    </div>
  )

  if (hasLink) {
    return <a href={app.href} style={{ display: 'block' }}>{inner}</a>
  }
  return inner
}

export default function Apps() {
  const liveApps = apps.filter(a => a.status === 'live')
  const devApps = apps.filter(a => a.status === 'development')

  return (
    <>
      <section
        className="px-6"
        style={{ paddingTop: '80px', paddingBottom: '64px', background: '#3D2B1F', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(208,136,86,0.8)' }}>
            Apps
          </span>
          <h1
            className="font-serif font-bold mt-3"
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#EDEFEE' }}
          >
            AI apps that fill the gaps.
          </h1>
          <p className="text-lg mt-4" style={{ color: 'rgba(237,239,238,0.65)', maxWidth: '600px', lineHeight: 1.65 }}>
            Standalone web apps for contractors, electrical subs, investors, and small
            businesses. Each one solves a specific problem for a specific person — no
            bloat, no fifty-seat minimum.
          </p>
        </div>
      </section>

      {liveApps.length > 0 && (
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <span className="section-label">Live now</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {liveApps.map(app => <AppCard key={app.id} app={app} />)}
            </div>
          </div>
        </section>
      )}

      {devApps.length > 0 && (
        <section className="px-6 py-20" style={{ background: 'var(--bg-dark)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <span className="section-label-light">In Development</span>
              <p className="mt-2 text-sm" style={{ color: 'rgba(237,239,238,0.5)' }}>
                What's being built next.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {devApps.map(app => {
                const hasLink = !!app.href
                const inner = (
                  <div
                    className="card-dark flex flex-col gap-4"
                    style={{ opacity: hasLink ? 0.95 : 0.7, height: '100%' }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="badge-dark">{app.category}</span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-sm"
                        style={{ background: 'rgba(208,136,86,0.15)', color: 'var(--warm)' }}
                      >
                        In Development
                      </span>
                    </div>
                    <div>
                      <h3
                        className="font-serif font-bold text-lg mb-2"
                        style={{ color: '#EDEFEE', lineHeight: 1.3 }}
                      >
                        {app.name}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'rgba(237,239,238,0.5)' }}
                      >
                        {app.description}
                      </p>
                    </div>
                    <div className="mt-auto pt-2 flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'rgba(237,239,238,0.4)' }}>
                        {app.price}
                      </span>
                      {hasLink ? (
                        <span className="text-sm font-semibold" style={{ color: 'var(--warm)' }}>
                          See preview &rarr;
                        </span>
                      ) : (
                        <span className="text-sm" style={{ color: 'rgba(237,239,238,0.3)' }}>
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                )
                if (hasLink) {
                  return (
                    <a key={app.id} href={app.href} style={{ display: 'block' }}>
                      {inner}
                    </a>
                  )
                }
                return <div key={app.id}>{inner}</div>
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
