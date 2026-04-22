import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) loadSubscription(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await loadSubscription(session.user.id)
        } else {
          setSubscription(null)
          setLoading(false)
        }
      }
    )

    return () => authSub.unsubscribe()
  }, [])

  async function loadSubscription(userId) {
    const timeout = new Promise(resolve => setTimeout(() => resolve({ data: [] }), 5000))
    try {
      const { data } = await Promise.race([
        supabase.from('subscriptions').select('*').eq('user_id', userId).limit(1),
        timeout,
      ])
      setSubscription(data?.[0] ?? null)
    } catch {
      setSubscription(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, subscription, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
