import { apps } from '../data/apps'

function AppCard({ app }) {
  const isLive = app.status === 'live'

  const inner = (
    <div
      className="card flex flex-col gap-4"
      style={{ opacity: isLive ? 1 : 0.7, height: '100%' }}
    >
      <div className="flex items-start justify-between">
        <span className="badge">{app.category}</span>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-sm"
          style={{
            background: isLive ? 'var(--success-soft)' : 'var(--orange-soft)',
            color: isLive ? 'var(--success)' : 'var(--warning)',
          }}
        >
          {isLive ? 'Live' : 'In Development'}
        </span>
      </div>
      <div>
        <h3
          className="font-serif font-normal text-xl mb-2"
          style={{ color: 'var(--text-primary)', lineHeight: 1.3 }}
        >
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
        {isLive ? (
          <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
            Open app &rarr;
          </span>
        ) : (
          <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Coming soon
          </span>
        )}
      </div>
    </div>
  )

  if (isLive && app.href) {
    return (
      <a href={app.href} style={{ display: 'block' }}>
        {inner}
      </a>
    )
  }
  return inner
}

export default function Apps() {
  const liveApps = apps.filter(a => a.status === 'live')
  const devApps = apps.filter(a => a.status === 'development')

  return (
    <>
      {/* Header */}
      <section
        className="px-6"
        style={{ paddingTop: '80px', paddingBottom: '64px', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            Web Apps
          </span>
          <h1
            className="font-serif font-normal mt-3"
            style={{
              fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
          >
            AI tools that work in your browser.
          </h1>
          <p
            className="text-lg mt-4"
            style={{ color: 'var(--text-secondary)', maxWidth: '560px', lineHeight: 1.65 }}
          >
            Purpose-built for one job. No setup, no accounts unless the app needs them.
            Pay once, use forever.
          </p>
        </div>
      </section>

      {/* Live apps grid */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {liveApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>

      {/* In Development */}
      {devApps.length > 0 && (
        <section
          className="px-6 py-20"
          style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>
                In Development
              </span>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                What's being built next.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {devApps.map(app => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
