import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const ACCOUNTS_KEY = 'planner_accounts'
const SESSION_KEY = 'planner_user'

const getInitialUser = () => {
  const rawUser = localStorage.getItem(SESSION_KEY)
  return rawUser ? JSON.parse(rawUser) : null
}

const getStoredAccounts = () => {
  const rawAccounts = localStorage.getItem(ACCOUNTS_KEY)
  return rawAccounts ? JSON.parse(rawAccounts) : []
}

const persistAccounts = (accounts) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser)

  const login = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase()
    const accounts = getStoredAccounts()

    const matchedAccount = accounts.find(
      (account) =>
        account.email.toLowerCase() === normalizedEmail &&
        account.password === password,
    )

    if (!matchedAccount) {
      throw new Error('Account not found or password is incorrect')
    }

    const nextUser = {
      id: matchedAccount.id,
      name: matchedAccount.name,
      email: matchedAccount.email,
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser))
    setUser(nextUser)

    return { user: nextUser }
  }

  const register = async (name, email, password) => {
    const trimmedName = name.trim()
    const normalizedEmail = email.trim().toLowerCase()
    const accounts = getStoredAccounts()

    const accountExists = accounts.some(
      (account) => account.email.toLowerCase() === normalizedEmail,
    )

    if (accountExists) {
      throw new Error('Email is already registered')
    }

    const nextAccount = {
      id: crypto.randomUUID(),
      name: trimmedName,
      email: normalizedEmail,
      password,
    }

    const nextAccounts = [...accounts, nextAccount]
    persistAccounts(nextAccounts)

    const nextUser = {
      id: nextAccount.id,
      name: nextAccount.name,
      email: nextAccount.email,
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser))
    setUser(nextUser)

    return { user: nextUser }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user],
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
