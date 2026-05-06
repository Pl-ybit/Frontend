import { createContext } from 'react'
import type { ThemeMode } from '../../shared/ui'

export interface ThemeContextValue {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
