import { useEffect, useRef } from 'react'

interface TradingViewChartProps {
  symbol?: string
  theme?: 'dark' | 'light'
}

export function TradingViewChart({ symbol = 'UPBIT:BTCKRW', theme = 'dark' }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    el.innerHTML = ''

    const widget = document.createElement('div')
    widget.className = 'tradingview-widget-container__widget'
    widget.style.cssText = 'height:100%;width:100%;'

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: '60',
      timezone: 'Asia/Seoul',
      theme,
      style: '1',
      locale: 'kr',
      allow_symbol_change: false,
      save_image: false,
      withdateranges: true,
      hide_side_toolbar: false,
      ...(theme === 'light' && {
        backgroundColor: '#fefae0',
        gridLineColor: '#e0d9b8',
      }),
    })

    el.appendChild(widget)
    el.appendChild(script)

    return () => { el.innerHTML = '' }
  }, [symbol, theme])

  return <div ref={containerRef} className="tradingview-widget-container h-full w-full" />
}
