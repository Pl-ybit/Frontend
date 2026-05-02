import { useEffect, useState } from 'react'
import { TopBar } from '../../../shared/ui'
import { useTheme } from '../../../app/providers'
import { MarketScanner } from '../../../widgets/market-scanner'
import { TradingChart } from '../../../widgets/trading-chart'
import { OrderBook } from '../../../widgets/order-book'
import { TradeHistory } from '../../../widgets/trade-history'
import { IndicatorSummary } from '../../../widgets/indicator-summary'
import type { CoinRow } from '../../../entities/coin'
import type { OrderBook as OrderBookData } from '../../../entities/orderbook'

const COIN_ROWS: CoinRow[] = [
  { symbol: 'BTC/KRW', price: '88,933,500', change: '+6.12%', variant: 'up' },
  { symbol: 'ETH/KRW', price: '3,932,500', change: '-0.83%', variant: 'down' },
  { symbol: 'SOL/KRW', price: '239,100', change: '+1.44%', variant: 'up' },
  { symbol: 'XRP/KRW', price: '1,234', change: '0.00%', variant: 'neutral' },
  { symbol: 'BNB/KRW', price: '912,000', change: '+2.31%', variant: 'up' },
  { symbol: 'ADA/KRW', price: '784', change: '-1.20%', variant: 'down' },
  { symbol: 'DOGE/KRW', price: '230', change: '+0.87%', variant: 'up' },
  { symbol: 'MATIC/KRW', price: '1,120', change: '-0.55%', variant: 'down' },
  { symbol: 'DOT/KRW', price: '12,400', change: '+0.34%', variant: 'up' },
  { symbol: 'AVAX/KRW', price: '58,200', change: '-2.10%', variant: 'down' },
  { symbol: 'LINK/KRW', price: '21,300', change: '+1.08%', variant: 'up' },
  { symbol: 'UNI/KRW', price: '18,750', change: '0.00%', variant: 'neutral' },
]

function makeOrderRows(basePrice: number, count: number, step: number) {
  return Array.from({ length: count }, (_, i) => {
    const price = basePrice + i * step
    const amount = Math.round(8000 + Math.random() * 6000)
    return { price, amount, total: Math.round(price * amount), variant: 'up' as const }
  })
}

const ASK_BASE = 1934.5
const BID_BASE = 1932.3
const ORDER_BOOK: OrderBookData = {
  asks: makeOrderRows(ASK_BASE, 16, 0.1).reverse(),
  bids: makeOrderRows(BID_BASE - 15 * 0.1, 16, 0.1).reverse(),
  marketPrice: 2923500,
  spread: 1525000,
}

const TRADE_ROWS = [
  { time: '17:33:33', price: '1,989.50', amount: '1,000,000', side: 'buy' as const },
  { time: '17:33:31', price: '1,989.50', amount: '500,000', side: 'sell' as const },
  { time: '17:33:29', price: '1,989.50', amount: '750,000', side: 'sell' as const },
  { time: '17:33:28', price: '1,989.50', amount: '1,200,000', side: 'buy' as const },
  { time: '17:33:26', price: '1,989.50', amount: '300,000', side: 'neutral' as const },
  { time: '17:33:25', price: '1,989.50', amount: '1,000,000', side: 'sell' as const },
  { time: '17:33:23', price: '1,989.50', amount: '880,000', side: 'sell' as const },
  { time: '17:33:21', price: '1,989.50', amount: '1,000,000', side: 'buy' as const },
]

export function MarketPage() {
  const { theme, setTheme } = useTheme()
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 900)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col h-screen bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,1)
    _0%,rgba(2,6,23,1)_60%)]">
      <TopBar
        siteName="Play-Bit"
        theme={theme}
        onThemeChange={setTheme}
        isLoggedIn={false}
        onSignupClick={() => {}}
        onLoginClick={() => {}}
      />

      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <aside className="w-[280px] shrink-0 flex flex-col border-r border-(--border-weak) 
        bg-slate-950/60 overflow-hidden">
          <MarketScanner rows={COIN_ROWS} search={search} onSearchChange={setSearch} />
        </aside>

        {/* Center */}
        <main className="flex-1 min-w-0 flex flex-col gap-3 p-3 overflow-hidden">
          <div className="flex-1 min-h-0">
            <TradingChart theme={theme} />
          </div>
          <div className="shrink-0 grid grid-cols-[1fr_240px] gap-3 h-[220px]">
            <TradeHistory rows={TRADE_ROWS} />
            <IndicatorSummary isLoading={isLoading} />
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[300px] shrink-0 flex flex-col border-l border-(--border-weak) 
        bg-slate-950/60 overflow-hidden">
          <OrderBook data={ORDER_BOOK} />
        </aside>
      </div>
    </div>
  )
}
