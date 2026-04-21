import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

export default function Account() {
  const { user, subscription } = useAuth()
  const navigate = useNavigate()
  const [portalLoading, setPortalLoading] = useState(false)
  const [portalError, setPortalError] = useState(null)

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  async function handleManageBilling() {
    setPortalLoading(true)
    setPortalError(null)
    try {
      const res = await fetch('/api/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      })
      const { url, error } = await res.json()
      if (url) window.location.href = url
      else setPortalError(error || 'Could not open billing portal.')
    } catch {
      setPortalError('Something went wrong. Try again or email hello@zaheer.studio.')
    }
    setPortalLoading(false)
  }

  const isActive = subscription?.status === 'active'

  return (
    <>
      <section
        className="px-6"
        style={{ paddingTop: '80px', paddingBottom: '64px', background: 'var(--bg-dark)' }}
      >
        <div className="max-w-6xl mx-auto">
          <span className="section-label-light">Account</span>
          <h1
            className="font-serif font-bold mt-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: '#EDEFEE' }}
          >
            Your account.
          </h1>
        </div>
      </section>

      <section className="px-6 py-16">
        <div style={{ maxWidth: '480px' }} className="flex flex-col gap-6">

          <div className="card flex flex-col gap-2">
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Email
            </p>
            <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              {user?.email}
            </p>
          </div>

          <div className="card flex flex-col gap-4">
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Plan
            </p>
            {isActive ? (
              <>
                <div className="flex items-center gap-3">
                  <span
                    className="font-serif font-bold text-xl"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Studio All-Access
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-sm"
                    style={{ background: 'var(--success-soft)', color: 'var(--success)' }}
                  >
                    ACTIVE
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {subscription.plan === 'yearly' ? 'Annual subscription' : 'Monthly subscription'}
                  {subscription.current_period_end &&
                    ` · renews ${new Date(subscription.current_period_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                </p>
                {portalError && (
                  <p className="text-sm" style={{ color: 'var(--accent)' }}>{portalError}</p>
                )}
                <button
                  onClick={handleManageBilling}
                  disabled={portalLoading}
                  className="btn-secondary"
                  style={{ alignSelf: 'flex-start', opacity: portalLoading ? 0.7 : 1 }}
                >
                  {portalLoading ? 'Opening...' : 'Manage billing →'}
                </button>
              </>
            ) : (
              <>
                <p className="text-base" style={{ color: 'var(--text-primary)' }}>
                  Free / Individual packs
                </p>
                <a href="/pricing" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Upgrade to All-Access →
                </a>
              </>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <button
              onClick={handleSignOut}
              className="text-sm"
              style={{ color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Sign out →
            </button>
          </div>

        </div>
      </section>
    </>
  )
}
