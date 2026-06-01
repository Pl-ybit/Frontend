import { useState } from 'react'

interface OrderFormProps {
  isLoggedIn?: boolean
  onLoginClick?: () => void
}

type OrderSide = 'buy' | 'sell'
type OrderType = '지정가' | '시장가' | '예약'

const ORDER_TYPES: OrderType[] = ['지정가', '시장가', '예약']
const PCT_STEPS = ['10%', '25%', '50%', '75%', '100%']
const FEE_RATE = 0.0005

const MOCK_ASSETS = [
  { symbol: 'KRW', amount: '1,234,567' },
  { symbol: 'BTC', amount: '0.0234' },
  { symbol: 'ETH', amount: '1.4820' },
  { symbol: 'SOL', amount: '28.5000' },
]

function formatKrw(n: number) {
  return Math.round(n).toLocaleString()
}

export function OrderForm({ isLoggedIn = false, onLoginClick }: OrderFormProps) {
  const [side, setSide] = useState<OrderSide>('buy')
  const [orderType, setOrderType] = useState<OrderType>('지정가')
  const [price, setPrice] = useState('120463339')
  const [amount, setAmount] = useState('')
  const [sliderPct, setSliderPct] = useState(0)

  const isBuy = side === 'buy'
  const numPrice = parseFloat(price.replace(/,/g, '')) || 0
  const numAmount = parseFloat(amount) || 0
  const orderTotal = numPrice * numAmount
  const fee = orderTotal * FEE_RATE
  const finalAmount = isBuy ? orderTotal + fee : orderTotal - fee

  function handlePct(pct: string) {
    const val = parseInt(pct) / 100
    setSliderPct(parseInt(pct))
    if (numPrice > 0) {
      const maxBtc = 1234567 / numPrice
      setAmount((maxBtc * val).toFixed(4))
    }
  }

  function adjustPrice(delta: number) {
    const next = Math.max(0, numPrice + delta)
    setPrice(next.toLocaleString())
  }

  return (
    <div className="rounded-[22px] border border-white/8 bg-white/4 backdrop-blur overflow-hidden">
      <div className="grid grid-cols-[1fr_1px_360px]">

        {/* ── 왼쪽: 입력 영역 ── */}
        <div className="flex flex-col">

          {/* 매수/매도 탭 */}
          <div className="grid grid-cols-2 border-b border-white/8">
            <button
              type="button"
              onClick={() => setSide('buy')}
              className={[
                'py-3 text-sm font-bold transition-colors',
                isBuy ? 'bg-(--color-up-bg) text-white' : 'text-(--text-muted) hover:text-(--page-text)',
              ].join(' ')}
            >
              매수
            </button>
            <button
              type="button"
              onClick={() => setSide('sell')}
              className={[
                'py-3 text-sm font-bold transition-colors',
                !isBuy ? 'bg-(--color-down-bg) text-white' : 'text-(--text-muted) hover:text-(--page-text)',
              ].join(' ')}
            >
              매도
            </button>
          </div>

          {/* 주문 유형 + 주문가능 */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <div className="flex gap-1">
              {ORDER_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setOrderType(t)}
                  className={[
                    'px-3 py-1 rounded-lg text-xs font-medium transition-colors',
                    orderType === t
                      ? 'bg-white/12 text-(--page-text)'
                      : 'text-(--text-muted) hover:bg-white/6',
                  ].join(' ')}
                >
                  {t}
                </button>
              ))}
            </div>
            <span className="text-xs text-(--text-muted)">
              주문가능 <span className="text-(--page-text) font-medium tabular-nums ml-1">0 BTC</span>
            </span>
          </div>

          {/* 주문가격 */}
          <div className="px-4 pb-2">
            <div className="text-xs text-(--text-muted) mb-1.5">주문가격</div>
            <div className="flex items-center rounded-xl bg-white/6 border border-white/10">
              <input
                type="text"
                value={numPrice ? numPrice.toLocaleString() : ''}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="flex-1 bg-transparent px-3 py-2 text-sm tabular-nums text-(--page-text) placeholder:text-(--text-muted) focus:outline-none text-right"
              />
              <span className="text-xs text-(--text-muted) pr-2">KRW</span>
              <div className="flex border-l border-white/10">
                <button
                  type="button"
                  onClick={() => adjustPrice(-1000)}
                  className="px-2.5 py-2 text-(--text-muted) hover:text-(--page-text) transition-colors text-sm"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => adjustPrice(1000)}
                  className="px-2.5 py-2 text-(--text-muted) hover:text-(--page-text) transition-colors border-l border-white/10 text-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 주문수량 */}
          <div className="px-4 pb-3">
            <div className="text-xs text-(--text-muted) mb-1.5">주문수량</div>
            <div className="flex items-center rounded-xl bg-white/6 border border-white/10">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0000"
                className="flex-1 bg-transparent px-3 py-2 text-sm tabular-nums text-(--page-text) placeholder:text-(--text-muted) focus:outline-none text-right"
              />
              <span className="text-xs text-(--text-muted) px-3">BTC</span>
            </div>
          </div>

          {/* % 버튼 + 슬라이더 */}
          <div className="px-4 pb-4 space-y-2">
            <div className="flex gap-1.5">
              {PCT_STEPS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePct(p)}
                  className="flex-1 py-1.5 rounded-lg text-[11px] font-medium bg-white/6 text-(--text-muted) hover:bg-white/12 hover:text-(--page-text) transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderPct}
              onChange={(e) => {
                const v = Number(e.target.value)
                setSliderPct(v)
                if (numPrice > 0) {
                  const maxBtc = 1234567 / numPrice
                  setAmount((maxBtc * v / 100).toFixed(4))
                }
              }}
              className="w-full accent-(--color-up-bg) cursor-pointer"
            />
          </div>
        </div>

        {/* 구분선 */}
        <div className="bg-white/8" />

        {/* ── 오른쪽: 요약 + 자산 ── */}
        <div className="flex flex-col justify-between px-5 py-4">

          {/* 주문 요약 */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-(--page-text)">주문하기</div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-(--text-muted)">주문총액</span>
                <span className="tabular-nums text-(--page-text) font-medium">{formatKrw(orderTotal)} <span className="text-(--text-muted)">KRW</span></span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-(--text-muted)">수수료 (0.05%)</span>
                <span className="tabular-nums text-(--page-text) font-medium">{formatKrw(fee)} <span className="text-(--text-muted)">KRW</span></span>
              </div>
              <div className="h-px bg-white/8 my-1" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-(--text-muted)">최종 {isBuy ? '결제' : '수령'} 금액</span>
                <span className="tabular-nums text-(--color-up) font-bold">{formatKrw(finalAmount)} <span className="text-(--color-up)/70">KRW</span></span>
              </div>
            </div>

            {/* 주문 버튼 */}
            {isLoggedIn ? (
              <button
                type="button"
                className={[
                  'w-full mt-3 py-3 rounded-xl text-sm font-bold text-white transition-colors',
                  isBuy ? 'bg-(--color-up-bg) hover:bg-(--color-up-bg-hover)' : 'bg-(--color-down-bg) hover:bg-(--color-down-bg-hover)',
                ].join(' ')}
              >
                {isBuy ? '매수' : '매도'}
              </button>
            ) : (
              <button
                type="button"
                onClick={onLoginClick}
                className="w-full mt-3 py-3 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/16 transition-colors"
              >
                로그인하러 가기 →
              </button>
            )}
          </div>

          {/* 내 자산 */}
          <div className="pt-4 border-t border-white/8 mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-(--page-text)">내 자산</span>
              <button type="button" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                입금 →
              </button>
            </div>
            <div className="space-y-1.5">
              {MOCK_ASSETS.map((a) => (
                <div key={a.symbol} className="flex items-center justify-between text-xs">
                  <span className="text-(--text-muted)">{a.symbol}</span>
                  <span className="tabular-nums text-(--page-text) font-medium">{a.amount}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
