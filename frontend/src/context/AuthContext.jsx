import { createContext, useContext, useMemo, useState } from 'react'

const API_BASE_URL = 'https://student-dashboard-backend-scvs.onrender.com/api'

const AuthContext = createContext(null)
const SESSION_KEY = 'planner_user'
const TOKEN_KEY = 'token'

const getInitialSession = () => {
  const rawUser = localStorage.getItem(SESSION_KEY)
  const rawToken = localStorage.getItem(TOKEN_KEY)
  return {
    user: rawUser ? JSON.parse(rawUser) : null,
    token: rawToken || '',
  }
}

export function AuthProvider({ children }) {
  const initialSession = getInitialSession()
  const [user, setUser] = useState(initialSession.user)
  const [token, setToken] = useState(initialSession.token)

  const login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(data.user))
    localStorage.setItem(TOKEN_KEY, data.token)
    setUser(data.user)
    setToken(data.token)
    return data
  }

  const register = async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(data.user))
    localStorage.setItem(TOKEN_KEY, data.token)
    setUser(data.user)
    setToken(data.token)
    return data
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
    setToken('')
  }

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      register,
      logout,
    }),
    [user, token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
