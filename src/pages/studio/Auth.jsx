import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export default function Auth() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) navigate('/studio/library', { replace: true })
  }, [user, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/studio/library`,
      },
    })

    if (error) setError(error.message)
    else setSent(true)
    setLoading(false)
  }

  return (
    <>
      <section className="px-6" style={{ paddingTop: '80px', paddingBottom: '64px', background: 'var(--bg-red)' }}>
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Studio
          </span>
          <h1
            className="font-serif font-bold mt-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: '#FFFFFF' }}
          >
            {sent ? 'Check your email.' : 'Sign in to your studio.'}
          </h1>
          {!sent && (
            <p className="text-lg mt-4" style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '400px' }}>
              Enter your email — we'll send a magic link. No password needed.
            </p>
          )}
        </div>
      </section>

      <section className="px-6 py-16">
        <div style={{ maxWidth: '400px' }} className="mx-auto">
          {sent ? (
            <div className="flex flex-col gap-5">
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                We sent a sign-in link to{' '}
                <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>.
                Click it to access your library.
              </p>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Don't see it? Check your spam folder.
              </p>
              <button
                className="text-sm text-left"
                style={{ color: 'var(--accent)' }}
                onClick={() => { setSent(false); setEmail('') }}
              >
                Use a different email &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="rounded px-4 py-3 text-sm outline-none"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'border-color 150ms',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                />
              </div>
              {error && (
                <p className="text-sm" style={{ color: 'var(--accent)' }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || !email}
                className="btn-primary"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Sending...' : 'Send magic link →'}
              </button>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                New here? Same flow — enter your email and you're in.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
