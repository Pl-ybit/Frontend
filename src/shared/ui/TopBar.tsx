import { useEffect, useMemo, useState } from 'react'
import type { ButtonVariant } from './Button'
import { Button } from './Button'

export type ThemeMode = 'dark' | 'light'

export type TopBarProps = {
  siteName: string
  theme: ThemeMode
  onThemeChange: (next: ThemeMode) => void
  /**
   * 로그인 상태가 없으면 "회원가입 / 로그인" 버튼을 보여줍니다.
   */
  isLoggedIn?: boolean
  onLoginClick?: () => void
  onSignupClick?: () => void
  onLogoutClick?: () => void
}

function formatKstTime(d: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(d)
}

export function TopBar({
  siteName,
  theme,
  onThemeChange,
  isLoggedIn = false,
  onLoginClick,
  onSignupClick,
  onLogoutClick,
}: TopBarProps) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const themeToggleLabel = useMemo(() => {
    return theme === 'dark' ? 'Light' : 'Dark'
  }, [theme])

  const secondaryVariant: ButtonVariant = 'secondary'

  return (
    <header className="sticky top-0 z-50 border-b border-(--border-weak) bg-(--topbar-bg) backdrop-blur">
      <div className="mx-auto flex h-[68px] w-full max-w-[1600px] items-center justify-between gap-6 px-5">
        {/* Left: logo + clock */}
        <div className="flex items-center gap-10 min-w-0">
          <span className="font-space-grotesk text-3xl font-bold tracking-tight text-(--topbar-title) select-none">
            {siteName}
          </span>
          <span className="font-space-grotesk text-base font-medium tabular-nums text-(--text-muted)">
            {formatKstTime(now)}
          </span>
        </div>

        {/* Right: auth + theme */}
        <div className="flex items-center gap-2 shrink-0">
          {!isLoggedIn ? (
            <>
              <Button size="sm" variant={secondaryVariant} className="!rounded-[30px] font-pretendard" onClick={onSignupClick}>
                회원가입
              </Button>
              <Button size="sm" variant={secondaryVariant} className="!rounded-[30px] font-pretendard" onClick={onLoginClick}>
                로그인
              </Button>
            </>
          ) : (
            <Button size="sm" variant={secondaryVariant} className="!rounded-[30px] font-pretendard" onClick={onLogoutClick}>
              로그아웃
            </Button>
          )}

          <button
            type="button"
            onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
            aria-label={themeToggleLabel}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-(--text-muted) hover:bg-white/8 hover:text-(--page-text) transition-colors"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

