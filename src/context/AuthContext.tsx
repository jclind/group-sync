import { useContext, useEffect, useState } from 'react'
import { UserCredential } from 'firebase/auth'
import React from 'react'
import { auth } from '../services/firestore'

type AuthContextValueType = {
  user: UserCredential['user'] | null
}
const AuthContext = React.createContext<AuthContextValueType | null>(null)
export function useAuth() {
  return useContext(AuthContext)
}

type AuthProviderProps = {
  children: React.ReactElement
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserCredential['user'] | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for auth status on page load
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userInstance => {
      if (userInstance) {
        setUser(userInstance)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value: AuthContextValueType = {
    user,
  }
  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className='auth-loading-container'>
          <h2>Auth Loading...</h2>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
