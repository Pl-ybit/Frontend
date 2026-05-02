import { useState } from 'react'
import { TradingViewChart } from './TradingViewChart'

type Timeframe = '1m' | '5m' | '1h' | '1d'
type Indicator = 'MA' | 'BB' | 'RSI'

interface TradingChartProps {
  theme?: 'dark' | 'light'
}

const TIMEFRAMES: Timeframe[] = ['1m', '5m', '1h', '1d']
const INDICATORS: Indicator[] = ['MA', 'BB', 'RSI']

export function TradingChart({ theme = 'dark' }: TradingChartProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>('1h')
  const [activeIndicators, setActiveIndicators] = useState<Set<Indicator>>(new Set(['MA']))

  function toggleIndicator(ind: Indicator) {
    setActiveIndicators((prev) => {
      const next = new Set(prev)
      next.has(ind) ? next.delete(ind) : next.add(ind)
      return next
    })
  }

  const tvInterval: Record<Timeframe, string> = { '1m': '1', '5m': '5', '1h': '60', '1d': 'D' }

  return (
    <div className="flex flex-col h-full rounded-[22px] border border-white/8 bg-white/4 backdrop-blur overflow-hidden">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between gap-4 px-4 py-3 border-b border-white/8">
        <div>
          <div className="text-sm font-semibold text-(--page-text)">Chart Board</div>
          <div className="text-xs text-(--text-muted) mt-0.5">BTC/KRW</div>
        </div>

        <div className="flex items-center gap-5">
          {/* 타임프레임 */}
          <div className="flex flex-col gap-1">
            <div className="text-[10px] font-medium text-(--text-muted)">타임프레임</div>
            <div className="flex gap-1">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setTimeframe(tf)}
                  className={[
                    'px-2 py-1 rounded-lg text-xs font-medium transition-colors',
                    timeframe === tf
                      ? 'bg-(--btn-primary-bg) text-(--btn-primary-text)'
                      : 'bg-white/6 text-(--text-muted) hover:bg-white/10',
                  ].join(' ')}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* 지표 설정 */}
          <div className="flex flex-col gap-1">
            <div className="text-[10px] font-medium text-(--text-muted)">지표 설정</div>
            <div className="flex gap-1">
              {INDICATORS.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => toggleIndicator(ind)}
                  className={[
                    'px-2 py-1 rounded-lg text-xs font-medium transition-colors',
                    activeIndicators.has(ind)
                      ? 'bg-(--btn-primary-bg) text-(--btn-primary-text)'
                      : 'bg-white/6 text-(--text-muted) hover:bg-white/10',
                  ].join(' ')}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <TradingViewChart symbol="UPBIT:BTCKRW" theme={theme} key={tvInterval[timeframe]} />
      </div>
    </div>
  )
}
