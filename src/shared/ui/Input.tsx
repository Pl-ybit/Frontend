import type { InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react'

export type InputProps = {
  className?: string
  /**
   * 트레이딩 검색창 기본 UI에 맞춰 돋보기 아이콘을 기본으로 표시합니다.
   */
  withSearchIcon?: boolean
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

export function Input({
  className,
  withSearchIcon = true,
  disabled,
  type = 'text',
  ...rest
}: InputProps) {
  return (
    <div className="relative">
      {withSearchIcon ? (
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--text-muted)]"
          aria-hidden="true"
        />
      ) : null}
      <input
        type={type}
        disabled={disabled}
        className={[
          'w-full rounded-xl border bg-[color:var(--input-bg)] text-[color:var(--input-text)] placeholder:text-[color:var(--text-muted)]',
          'border-[color:var(--input-border)] px-3 py-2 text-sm',
          withSearchIcon ? 'pl-10' : '',
          'transition-colors',
          'focus-visible:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--focus-outline)] focus-visible:outline-offset-2',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className ?? '',
        ].join(' ')}
        {...rest}
      />
    </div>
  )
}

