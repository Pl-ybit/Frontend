import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { TopBar } from '../../../shared/ui'
import { useTheme } from '../../../app/providers'
import { useAuth } from '../../../app/providers'
import { SocialButtons } from './SocialButtons'

const inputBase =
  'w-full rounded-xl border border-(--input-border) bg-(--input-bg) text-(--input-text) placeholder:text-(--text-muted) py-2.5 text-sm transition-colors focus:outline-none focus:outline-2 focus:outline-(--focus-outline) focus:outline-offset-2'

export function LoginPage() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const { login } = useAuth()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)

  function handleLogin() {
    const success = login(id, password)
    if (success) {
      navigate('/exchange')
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--page-gradient)' }}>
      <TopBar
        siteName="Play-Bit"
        theme={theme}
        onThemeChange={setTheme}
        showBack
        onBackClick={() => navigate('/')}
      />

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px] rounded-2xl border border-(--border-weak) bg-(--card-bg) backdrop-blur p-10 shadow-xl">

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-(--page-text) mb-1">로그인</h1>
            <p className="text-sm text-(--text-muted)">Play-Bit에 오신 것을 환영합니다</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* ID */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-(--text-muted)">아이디</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--text-muted)" />
                <input
                  type="text"
                  placeholder="아이디 입력"
                  value={id}
                  onChange={(e) => { setId(e.target.value); setError(false) }}
                  className={`${inputBase} pl-10 pr-3`}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-(--text-muted)">비밀번호</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--text-muted)" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false) }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className={`${inputBase} pl-10 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--page-text) transition-colors"
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="text-right">
                <button type="button" className="text-xs text-(--text-muted) hover:text-(--page-text) transition-colors">
                  비밀번호를 잊으셨나요?
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-400 text-center -mt-1">
                아이디 또는 비밀번호가 올바르지 않습니다
              </p>
            )}

            <button
              type="button"
              onClick={handleLogin}
              className="w-full rounded-xl bg-(--btn-primary-bg) text-(--btn-primary-text) border border-(--btn-primary-border) hover:bg-(--btn-primary-hover-bg) py-2.5 text-sm font-semibold transition-colors mt-1"
            >
              로그인 →
            </button>

            <div className="flex items-center gap-3 my-1">
              <span className="flex-1 h-px bg-(--border-weak)" />
              <span className="text-xs text-(--text-muted)">OR</span>
              <span className="flex-1 h-px bg-(--border-weak)" />
            </div>

            <SocialButtons />

            <p className="text-center text-sm text-(--text-muted) mt-1">
              계정이 없으신가요?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-(--color-up) hover:text-(--color-up)/70 font-medium transition-colors"
              >
                회원가입
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
