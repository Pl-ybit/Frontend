import type { CSSProperties, HTMLAttributes } from 'react'

export type SkeletonProps = {
  width?: number | string
  height?: number | string
  roundedClassName?: string
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function Skeleton({
  width,
  height,
  roundedClassName = 'rounded-xl',
  className,
  style,
  ...rest
}: SkeletonProps) {
  const skeletonStyle: CSSProperties = {
    ...(width !== undefined ? { width } : null),
    ...(height !== undefined ? { height } : null),
    ...style,
  }

  return (
    <div
      {...rest}
      style={skeletonStyle}
      className={[
        'bg-[color:var(--skeleton-bg)] animate-pulse',
        roundedClassName,
        className ?? '',
      ].join(' ')}
    />
  )
}

