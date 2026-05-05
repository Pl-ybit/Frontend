import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { TopBar } from '../../../shared/ui'
import { useTheme } from '../../../app/providers'
import { SocialButtons } from '../../login/ui/SocialButtons'

const inputBase =
  'w-full rounded-xl border border-(--input-border) bg-(--input-bg) text-(--input-text) placeholder:text-(--text-muted) py-2.5 text-sm transition-colors focus:outline-none focus:outline-2 focus:outline-(--focus-outline) focus:outline-offset-2'

export function SignupPage() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

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
            <h1 className="text-2xl font-bold text-(--page-text) mb-1">회원가입</h1>
            <p className="text-sm text-(--text-muted)">몇 초만에 계정을 만들어보세요</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-(--text-muted)">이메일</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--text-muted)" />
                <input type="email" placeholder="you@example.com" className={`${inputBase} pl-10 pr-3`} />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-(--text-muted)">비밀번호</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--text-muted)" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="8자 이상 입력"
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
            </div>

            {/* Password confirm */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-(--text-muted)">비밀번호 확인</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--text-muted)" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 입력하세요"
                  className={`${inputBase} pl-10 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--page-text) transition-colors"
                  aria-label={showConfirm ? '비밀번호 숨기기' : '비밀번호 보기'}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-(--btn-primary-bg) text-(--btn-primary-text) border border-(--btn-primary-border) hover:bg-(--btn-primary-hover-bg) py-2.5 text-sm font-semibold transition-colors mt-1"
            >
              계정 만들기 →
            </button>

            <div className="flex items-center gap-3 my-1">
              <span className="flex-1 h-px bg-(--border-weak)" />
              <span className="text-xs text-(--text-muted)">OR</span>
              <span className="flex-1 h-px bg-(--border-weak)" />
            </div>

            <SocialButtons />

            <p className="text-center text-xs text-(--text-muted) leading-relaxed mt-1">
              계정을 만들면 Play-Bit의{' '}
              <button type="button" className="underline hover:text-(--page-text) transition-colors">이용약관</button>
              {' '}및{' '}
              <button type="button" className="underline hover:text-(--page-text) transition-colors">개인정보처리방침</button>
              에 동의하게 됩니다.
            </p>

            <p className="text-center text-sm text-(--text-muted)">
              이미 계정이 있으신가요?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                로그인
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
