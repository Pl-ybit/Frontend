import { Input } from '../../../shared/ui'

interface SearchCoinProps {
  value: string
  onChange: (value: string) => void
}

export function SearchCoin({ value, onChange }: SearchCoinProps) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="코인 이름 또는 심볼"
      aria-label="coin search"
    />
  )
}