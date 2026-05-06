import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TopBar } from '../../../shared/ui/TopBar'
import { useTheme } from '../../../app/providers'
import { MarketScanner } from '../../../widgets/market-scanner'
import { TradingChart } from '../../../widgets/trading-chart'
import { OrderBook } from '../../../widgets/order-book'
import { TradeHistory } from '../../../widgets/trade-history'
import { IndicatorSummary } from '../../../widgets/indicator-summary'
import { COIN_ROWS } from '../../../entities/coin'
import { ORDER_BOOK } from '../../../entities/orderbook'
import { TRADE_ROWS } from '../../../entities/trade'


export function MarketPage() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [leftOpen, setLeftOpen] = useState(true)
  const [rightOpen, setRightOpen] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 900)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col h-screen" style={{ background: 'var(--page-gradient)' }}>
      <TopBar
        siteName="Play-Bit"
        theme={theme}
        onThemeChange={setTheme}
        navItems={[
          { label: '홈', key: 'home' },
          { label: '시세', key: 'market' },
          { label: '거래소', key: 'exchange' },
        ]}
        activeNav="exchange"
        onNavClick={(key: string) => {
          if (key === 'home') navigate('/')
        }}
        isLoggedIn={false}
        onSignupClick={() => navigate('/signup')}
        onLoginClick={() => navigate('/login')}
      />

      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <div className="relative shrink-0 h-full">
          <aside className={`h-full flex flex-col border-r border-(--border-weak) bg-(--sidebar-bg) overflow-hidden transition-[width] duration-300 ${leftOpen ? 'w-[280px]' : 'w-0'}`}>
            <MarketScanner rows={COIN_ROWS} search={search} onSearchChange={setSearch} />
          </aside>
          <button
            type="button"
            onClick={() => setLeftOpen(v => !v)}
            className="absolute top-6 right-0 translate-x-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-(--border-strong) bg-(--sidebar-bg) text-(--text-muted) hover:text-(--page-text) transition-colors shadow"
          >
            {leftOpen
              ? <ChevronLeft size={18} strokeWidth={2.5} />
              : <ChevronRight size={18} strokeWidth={2.5} />}
          </button>
        </div>

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
        <div className="relative shrink-0 h-full">
          <button
            type="button"
            onClick={() => setRightOpen(v => !v)}
            className="absolute top-6 left-0 -translate-x-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-(--border-strong) bg-(--sidebar-bg) text-(--text-muted) hover:text-(--page-text) transition-colors shadow"
          >
            {rightOpen
              ? <ChevronRight size={18} strokeWidth={2.5} />
              : <ChevronLeft size={18} strokeWidth={2.5} />}
          </button>
          <aside className={`h-full flex flex-col border-l border-(--border-weak) bg-(--sidebar-bg) overflow-hidden transition-[width] duration-300 ${rightOpen ? 'w-[300px]' : 'w-0'}`}>
            <OrderBook data={ORDER_BOOK} />
          </aside>
        </div>
      </div>
    </div>
  )
}
