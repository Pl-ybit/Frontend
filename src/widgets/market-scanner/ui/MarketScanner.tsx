import { Input } from '../../../shared/ui'
import type { CoinRow } from '../../../entities/coin'

interface MarketScannerProps {
  rows: CoinRow[]
  search: string
  onSearchChange: (value: string) => void
}

const DOT_COLOR: Record<CoinRow['variant'], string> = {
  up: 'bg-emerald-400',
  down: 'bg-rose-400',
  neutral: 'bg-slate-400',
}

const CHANGE_COLOR: Record<CoinRow['variant'], string> = {
  up: 'text-emerald-400',
  down: 'text-rose-400',
  neutral: 'text-slate-400',
}

export function MarketScanner({ rows, search, onSearchChange }: MarketScannerProps) {
  const filtered = rows.filter((r) =>
    r.symbol.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-4 pt-4 pb-3 border-b border-white/8">
        <div className="text-sm font-semibold text-(--page-text) mb-3">Market Search &amp; Filtering</div>
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="검색창"
          aria-label="coin search"
        />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-(--page-bg,#0f172a)">
            <tr>
              <th className="text-left px-4 py-2 text-(--text-muted) font-medium">Pair</th>
              <th className="text-right px-3 py-2 text-(--text-muted) font-medium">Price</th>
              <th className="text-right px-4 py-2 text-(--text-muted) font-medium">24h %</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.symbol}
                className="cursor-pointer hover:bg-white/4 transition-colors"
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`shrink-0 h-2.5 w-2.5 rounded-full ${DOT_COLOR[r.variant]}`} />
                    <span className="text-(--page-text) font-medium truncate">{r.symbol.replace('/KRW', '/krw')}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-right text-(--page-text) tabular-nums">{r.price}</td>
                <td className={`px-4 py-2.5 text-right tabular-nums font-medium ${CHANGE_COLOR[r.variant]}`}>
                  {r.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
