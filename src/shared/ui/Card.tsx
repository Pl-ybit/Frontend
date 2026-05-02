import type { ReactNode } from 'react'

export type CardProps = {
  children: ReactNode
  className?: string
  /**
   * 기본 padding을 조절하고 싶을 때만 사용하세요.
   * (Tailwind className override가 더 유연합니다.)
   */
  paddingClassName?: string
}

export function Card({
  children,
  className,
  paddingClassName = 'p-4',
}: CardProps) {
  return (
    <section
      className={[
        'rounded-[22px] border border-[color:var(--border-weak)] bg-[color:var(--card-bg)]',
        'backdrop-blur-sm',
        'shadow-[inset_0_1px_0_rgba(148,163,184,0.08)]',
        paddingClassName,
        className ?? '',
      ].join(' ')}
    >
      {children}
    </section>
  )
}

