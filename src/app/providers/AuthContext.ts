import { createContext } from 'react'

export type AuthContextValue = {
  isLoggedIn: boolean
  login: (id: string, password: string) => boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  login: () => false,
  logout: () => {},
})