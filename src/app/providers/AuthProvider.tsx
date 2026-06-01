import { useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'

const MOCK_ID = 'dlwngud'
const MOCK_PW = 'dlwngud'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function login(id: string, password: string) {
    if (id === MOCK_ID && password === MOCK_PW) {
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  function logout() {
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
