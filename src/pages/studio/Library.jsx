import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { packs } from '../../data/packs'

export default function Library() {
  const { user, subscription } = useAuth()
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const justPurchased = searchParams.get('success') === 'true'

  useEffect(() => {
    if (!user) return
    supabase
      .from('purchases')
      .select('pack_id')
      .eq('user_id', user.id)
      .then(({ data }) => {
        setPurchases(data?.map(p => p.pack_id) ?? [])
        setLoading(false)
      })
  }, [user])

  const hasAllAccess = subscription?.status === 'active'

  const accessiblePacks = packs.filter(p =>
    p.status === 'live' && (hasAllAccess || purchases.includes(p.id) || p.price === 'Free')
  )

  return (
    <>
      <section
        className="px-6"
        style={{ paddingTop: '80px', paddingBottom: '48px', background: 'var(--bg-dark)' }}
      >
        <div className="max-w-6xl mx-auto">
          <span className="section-label-light">Your Library</span>
          <h1
            className="font-serif font-bold mt-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: '#EDEFEE' }}
          >
            {loading
              ? 'Loading...'
              : hasAllAccess
              ? 'All-access unlocked.'
              : accessiblePacks.length === 0
              ? 'Nothing here yet.'
              : `${accessiblePacks.length} pack${accessiblePacks.length !== 1 ? 's' : ''} available.`}
          </h1>
          {hasAllAccess && (
            <p className="text-base mt-3" style={{ color: 'rgba(237,239,238,0.55)' }}>
              Every current pack and every future pack we ship.
            </p>
          )}
        </div>
      </section>

      {justPurchased && (
        <div
          className="px-6 py-4"
          style={{ background: 'rgba(86,197,122,0.08)', borderBottom: '1px solid rgba(86,197,122,0.2)' }}
        >
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold" style={{ color: '#56C57A' }}>
              Purchase confirmed. Your pack is ready below.
            </p>
          </div>
        </div>
      )}

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Loading your library...</p>
          ) : accessiblePacks.length === 0 ? (
            <div className="text-center py-20">
              <p
                className="font-serif font-bold text-xl mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                No packs yet.
              </p>
              <p className="text-sm mb-8" style={{ color: 'var(--text-tertiary)' }}>
                Browse the studio to find your first pack.
              </p>
              <Link to="/studio/browse" className="btn-primary">
                Browse packs &rarr;
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {accessiblePacks.map(pack => (
                <div key={pack.id} className="card flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="badge">{pack.category}</span>
                    {pack.price === 'Free' && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-sm"
                        style={{ background: 'var(--success-soft)', color: 'var(--success)' }}
                      >
                        FREE
                      </span>
                    )}
                  </div>
                  <div>
                    <h3
                      className="font-serif font-bold text-lg mb-2"
                      style={{ color: 'var(--text-primary)', lineHeight: 1.3 }}
                    >
                      {pack.name}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {pack.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-2">
                    {pack.downloadUrl ? (
                      <a href={pack.downloadUrl} className="btn-primary" style={{ display: 'inline-block' }}>
                        Download &rarr;
                      </a>
                    ) : (
                      <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                        Download link coming soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {!hasAllAccess && (
        <section className="px-6 py-16" style={{ background: 'var(--bg-red)' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
              <h2
                className="font-serif font-bold mb-2"
                style={{ fontSize: '1.5rem', color: '#FFFFFF' }}
              >
                Get everything with All-Access.
              </h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Every current pack. Every future pack we ship. $19/mo.
              </p>
            </div>
            <Link to="/pricing" className="btn-white" style={{ flexShrink: 0 }}>
              See all plans &rarr;
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
