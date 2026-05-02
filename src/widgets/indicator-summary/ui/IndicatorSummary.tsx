interface IndicatorSummaryProps {
  isLoading: boolean
}

const INDICATORS = [
  { label: 'MA(50)', value: '148.33' },
  { label: 'BB Upper/Lower (MA)', value: '39.9980' },
  { label: 'BB Upper/Lower (BB)', value: '35.0980' },
  { label: 'RSI', value: '70.37' },
]

export function IndicatorSummary({ isLoading }: IndicatorSummaryProps) {
  return (
    <div className="flex flex-col h-full rounded-[22px] border border-white/8 bg-white/4 backdrop-blur overflow-hidden">
      <div className="shrink-0 px-4 py-3 border-b border-white/8">
        <div className="text-sm font-semibold text-(--page-text)">Indicator Summary</div>
        <div className="text-xs text-(--text-muted) mt-0.5">MA / BB / RSI</div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-3 space-y-3">
        {INDICATORS.map((ind) => (
          <div key={ind.label} className="flex items-center justify-between gap-3">
            <span className="text-xs text-(--text-muted) shrink-0">{ind.label}</span>
            <span className="text-sm font-semibold text-(--page-text) tabular-nums">
              {isLoading ? '—' : ind.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
