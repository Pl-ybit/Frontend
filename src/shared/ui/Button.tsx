import type { ButtonHTMLAttributes, ReactNode } from 'react'

// 'ghost' 변형과 'icon' 사이즈를 추가했습니다.
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'destructive' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export type ButtonProps = {
  children: ReactNode
  className?: string
  variant?: ButtonVariant
  size?: ButtonSize
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-[color:var(--btn-primary-bg)] text-[color:var(--btn-primary-text)] border border-[color:var(--btn-primary-border)] hover:bg-[color:var(--btn-primary-hover-bg)]',
  secondary:
    'bg-[color:var(--btn-secondary-bg)] text-[color:var(--btn-secondary-text)] border border-[color:var(--btn-secondary-border)] hover:bg-[color:var(--btn-secondary-hover-bg)]',
  success:
    'bg-(--color-up)/15 text-blue-200 border border-(--color-up)/30 hover:bg-(--color-up)/25',
  destructive:
    'bg-(--color-down)/15 text-rose-200 border border-(--color-down)/30 hover:bg-(--color-down)/25',
  // 헤더 아이콘 버튼에 사용할 ghost 스타일 추가
  ghost: 
    'bg-transparent border-none text-slate-400 hover:bg-[#252A30] hover:text-white',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-xl',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-5 py-2.5 text-base rounded-2xl',
  // 아이콘 전용 정사각형 사이즈 추가
  icon: 'p-2 rounded-lg',
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-(--focus-outline) focus-visible:outline-offset-2',
        sizeClass[size],
        variantClass[variant],
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className ?? '',
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}