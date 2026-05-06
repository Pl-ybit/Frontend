import { useEffect, useState, type ReactNode } from 'react'
import type { ThemeMode } from '../../shared/ui'
import { ThemeContext } from './ThemeContext'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = window.localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches
    return prefersLight ? 'light' : 'dark'
  })

  useEffect(() => {
    document.body.dataset.theme = theme
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
