import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant = 'up' | 'down' | 'neutral'

export type BadgeProps = {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function Badge({
  children,
  variant = 'neutral',
  className,
  ...rest
}: BadgeProps) {
  const cls =
    variant === 'up'
      ? 'border-blue-500/30 bg-blue-500/15 text-blue-200'
      : variant === 'down'
        ? 'border-rose-500/30 bg-rose-500/15 text-rose-200'
        : 'border-[color:var(--badge-neutral-border)] bg-[color:var(--badge-neutral-bg)] text-[color:var(--badge-neutral-text)]'

  return (
    <div
      {...rest}
      className={[
        'inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-[11px] font-semibold',
        cls,
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export type TableProps = {
  children: ReactNode
  className?: string
}

export function Table({ children, className }: TableProps) {
  return (
    <div
      className={[
        'w-full overflow-hidden rounded-2xl border border-[color:var(--border-weak)] bg-[color:var(--table-bg)]',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export type TableHeaderProps = {
  children: ReactNode
  className?: string
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <div
      className={[
        'bg-[color:var(--table-head-bg)]',
        'border-b border-[color:var(--border-weak)]',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export type TableBodyProps = {
  children: ReactNode
  className?: string
}

export function TableBody({ children, className }: TableBodyProps) {
  return <div className={className}>{children}</div>
}

export type TableRowProps = {
  children: ReactNode
  className?: string
}

export function TableRow({ children, className }: TableRowProps) {
  return (
    <div
      className={[
        'flex',
        'border-t border-[color:var(--border-weak)]',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export type TableHeadProps = {
  children: ReactNode
  className?: string
}

export function TableHead({ children, className }: TableHeadProps) {
  return (
    <div
      className={[
        'flex-1',
        'px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export type TableCellProps = {
  children: ReactNode
  className?: string
}

export function TableCell({ children, className }: TableCellProps) {
  return (
    <div
      className={[
        'flex-1',
        'px-3 py-2 text-sm text-[color:var(--table-cell-text)]',
        'truncate',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

