import type { OrderBook as OrderBookData } from '../../../entities/orderbook'

interface OrderBookProps {
  data: OrderBookData
}

const MAX_DEPTH_PCT = 80

function calcBarPct(amount: number, max: number) {
  return Math.min((amount / max) * MAX_DEPTH_PCT, MAX_DEPTH_PCT)
}

export function OrderBook({ data }: OrderBookProps) {
  const maxAsk = Math.max(...data.asks.map((r) => r.amount))
  const maxBid = Math.max(...data.bids.map((r) => r.amount))
  const maxAll = Math.max(maxAsk, maxBid)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-white/8">
        <div className="text-sm font-semibold text-(--page-text)">호가창 (Order Book)</div>
        <div className="grid grid-cols-3 mt-2 text-[10px] font-medium text-(--text-muted)">
          <span>Price</span>
          <span className="text-center">Amount</span>
          <span className="text-right">Total</span>
        </div>
      </div>

      {/* Asks (sells) */}
      <div className="flex-1 overflow-auto flex flex-col-reverse">
        <div className="flex flex-col">
          {[...data.asks].reverse().map((r, i) => {
            const pct = calcBarPct(r.amount, maxAll)
            return (
              <div key={`ask-${i}`} className="relative grid grid-cols-3 px-4 py-[5px] text-xs hover:bg-rose-500/5 cursor-pointer">
                <div
                  className="absolute inset-y-0 right-0 bg-rose-500/15"
                  style={{ width: `${pct}%` }}
                />
                <span className="relative text-rose-400 font-medium tabular-nums">{r.price.toLocaleString()}</span>
                <span className="relative text-center text-(--page-text) tabular-nums">{r.amount.toLocaleString()}</span>
                <span className="relative text-right text-(--text-muted) tabular-nums">{r.total.toLocaleString()}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Market Price */}
      <div className="shrink-0 px-4 py-2.5 border-y border-white/8 bg-white/4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-blue-400 tabular-nums">
              {data.marketPrice.toLocaleString()}
            </span>
            <span className="text-blue-400 text-sm">↑</span>
            <span className="text-[10px] text-(--text-muted) ml-1">Market Price</span>
          </div>
        </div>
        <div className="text-[10px] text-(--text-muted) mt-0.5">
          Spread: {data.spread.toLocaleString()}
        </div>
      </div>

      {/* Bids (buys) */}
      <div className="flex-1 overflow-auto">
        {data.bids.map((r, i) => {
          const pct = calcBarPct(r.amount, maxAll)
          return (
            <div key={`bid-${i}`} className="relative grid grid-cols-3 px-4 py-[5px] text-xs hover:bg-blue-500/5 cursor-pointer">
              <div
                className="absolute inset-y-0 right-0 bg-blue-500/15"
                style={{ width: `${pct}%` }}
              />
              <span className="relative text-blue-400 font-medium tabular-nums">{r.price.toLocaleString()}</span>
              <span className="relative text-center text-(--page-text) tabular-nums">{r.amount.toLocaleString()}</span>
              <span className="relative text-right text-(--text-muted) tabular-nums">{r.total.toLocaleString()}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
