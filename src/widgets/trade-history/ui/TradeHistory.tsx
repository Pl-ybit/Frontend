import type { TradeRow } from '../../../entities/trade'

interface TradeHistoryProps {
  rows: TradeRow[]
}

export function TradeHistory({ rows }: TradeHistoryProps) {
  return (
    <div className="flex flex-col h-full rounded-[22px] border border-white/8 bg-white/4 backdrop-blur overflow-hidden">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/8">
        <div className="text-sm font-semibold text-(--page-text)">Trade History</div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-(--text-muted)">Updated in real-time</span>
        </div>
      </div>

      {/* Column headers */}
      <div className="shrink-0 grid grid-cols-3 px-4 py-2 text-[10px] font-medium text-(--text-muted) border-b border-white/6">
        <span>Time</span>
        <span className="text-center">Price</span>
        <span className="text-right">Amount</span>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-auto">
        {rows.map((r, idx) => (
          <div key={idx} className="grid grid-cols-3 px-4 py-[5px] text-xs hover:bg-white/4 transition-colors">
            <span className="text-(--text-muted) tabular-nums">{r.time}</span>
            <span
              className={[
                'text-center tabular-nums font-medium',
                r.side === 'buy' ? 'text-emerald-400' : r.side === 'sell' ? 'text-rose-400' : 'text-(--text-muted)',
              ].join(' ')}
            >
              {r.price}
            </span>
            <span className="text-right text-(--text-muted) tabular-nums">{r.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
