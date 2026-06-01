import { useState } from 'react'
import { X } from 'lucide-react'
import type { TradeRow } from '../../../entities/trade'

// ── 주문내역 타입 ──────────────────────────────
type OrderStatus = '대기' | '완료' | '취소'
type OrderSide = 'buy' | 'sell'
type OrderType = '지정가' | '시장가'

interface OrderRecord {
  id: string
  time: string
  coin: string
  side: OrderSide
  orderType: OrderType
  price: string
  amount: string
  filled: string
  status: OrderStatus
}

const STATUS_STYLE: Record<OrderStatus, string> = {
  대기: 'text-yellow-400',
  완료: 'text-(--color-up)',
  취소: 'text-(--text-muted)',
}

const OPEN_ORDERS: OrderRecord[] = [
  { id: '1', time: '17:41:02', coin: 'BTC/KRW', side: 'buy',  orderType: '지정가', price: '118,000,000', amount: '0.0050', filled: '0.0000', status: '대기' },
  { id: '2', time: '17:38:15', coin: 'ETH/KRW', side: 'sell', orderType: '지정가', price: '4,100,000',   amount: '0.2000', filled: '0.0000', status: '대기' },
]

const FILLED_ORDERS: OrderRecord[] = [
  { id: '3', time: '17:33:45', coin: 'BTC/KRW', side: 'buy',  orderType: '시장가', price: '120,463,339', amount: '0.0010', filled: '0.0010', status: '완료' },
  { id: '4', time: '16:55:12', coin: 'SOL/KRW', side: 'buy',  orderType: '지정가', price: '238,000',     amount: '5.0000', filled: '5.0000', status: '완료' },
  { id: '5', time: '15:20:08', coin: 'ETH/KRW', side: 'sell', orderType: '지정가', price: '3,950,000',   amount: '0.5000', filled: '0.5000', status: '완료' },
  { id: '6', time: '14:02:33', coin: 'BTC/KRW', side: 'sell', orderType: '지정가', price: '121,000,000', amount: '0.0020', filled: '0.0010', status: '취소' },
]

const INDICATORS = [
  { label: 'MA(50)',              value: '148.33'  },
  { label: 'BB Upper/Lower (MA)', value: '39.9980' },
  { label: 'BB Upper/Lower (BB)', value: '35.0980' },
  { label: 'RSI',                 value: '70.37'   },
]

// ── 탭 정의 ───────────────────────────────────
type Tab = '거래내역' | '미체결' | '체결내역' | '주문내역' | '지표 요약'

const TABS: Tab[] = ['거래내역', '미체결', '체결내역', '주문내역', '지표 요약']

// ── Props ─────────────────────────────────────
interface MarketPanelProps {
  tradeRows: TradeRow[]
  isLoading?: boolean
  isLoggedIn?: boolean
}

export function MarketPanel({ tradeRows, isLoading = false, isLoggedIn = false }: MarketPanelProps) {
  const [tab, setTab] = useState<Tab>('거래내역')
  const [openOrders, setOpenOrders] = useState(OPEN_ORDERS)

  function cancelOrder(id: string) {
    setOpenOrders((prev) => prev.filter((o) => o.id !== id))
  }

  const orderRows: OrderRecord[] =
    tab === '미체결'   ? openOrders :
    tab === '체결내역' ? FILLED_ORDERS :
    [...openOrders, ...FILLED_ORDERS]

  return (
    <div className="rounded-[22px] border border-white/8 bg-white/4 backdrop-blur overflow-hidden">

      {/* 탭 헤더 */}
      <div className="flex items-center gap-1 px-4 pt-3 pb-0 border-b border-white/8">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={[
              'px-3 pb-2.5 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap',
              tab === t
                ? 'text-(--page-text) border-(--color-up)'
                : 'text-(--text-muted) border-transparent hover:text-(--page-text)',
            ].join(' ')}
          >
            {t}
          </button>
        ))}

        {/* 실시간 표시 (거래내역 탭에만) */}
        {tab === '거래내역' && (
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-up) animate-pulse" />
            <span className="text-xs text-(--text-muted)">실시간</span>
          </div>
        )}
      </div>

      {/* ── 비로그인 안내 ── */}
      {!isLoggedIn && (
        <div className="h-[220px] flex items-center justify-center">
          <span className="text-sm text-(--text-muted)">로그인을 완료해주세요!</span>
        </div>
      )}

      {/* ── 거래내역 ── */}
      {isLoggedIn && tab === '거래내역' && (
        <div className="overflow-auto h-[220px]">
          <div className="grid grid-cols-3 px-4 py-2 text-[10px] font-medium text-(--text-muted) border-b border-white/6 sticky top-0 bg-(--page-bg,#0f172a) z-10">
            <span>시간</span>
            <span className="text-center">가격</span>
            <span className="text-right">수량</span>
          </div>
          {tradeRows.map((r, idx) => (
            <div key={idx} className="grid grid-cols-3 px-4 py-[5px] text-xs hover:bg-white/4 transition-colors">
              <span className="text-(--text-muted) tabular-nums">{r.time}</span>
              <span className={[
                'text-center tabular-nums font-medium',
                r.side === 'buy' ? 'text-(--color-up)' : r.side === 'sell' ? 'text-(--color-down)' : 'text-(--text-muted)',
              ].join(' ')}>
                {r.price}
              </span>
              <span className="text-right text-(--text-muted) tabular-nums">{r.amount}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── 미체결 / 체결내역 / 주문내역 ── */}
      {isLoggedIn && (tab === '미체결' || tab === '체결내역' || tab === '주문내역') && (
        <div className="overflow-auto h-[220px]">
          <table className="w-full text-xs border-separate border-spacing-0">
            <thead className="sticky top-0 z-10 bg-(--page-bg,#0f172a)">
              <tr>
                <th className="text-left px-4 py-2 text-(--text-muted) font-medium whitespace-nowrap">시간</th>
                <th className="text-left px-3 py-2 text-(--text-muted) font-medium whitespace-nowrap">코인</th>
                <th className="text-left px-3 py-2 text-(--text-muted) font-medium whitespace-nowrap">유형</th>
                <th className="text-right px-3 py-2 text-(--text-muted) font-medium whitespace-nowrap">주문가격</th>
                <th className="text-right px-3 py-2 text-(--text-muted) font-medium whitespace-nowrap">주문수량</th>
                <th className="text-right px-3 py-2 text-(--text-muted) font-medium whitespace-nowrap">체결수량</th>
                <th className="text-center px-3 py-2 text-(--text-muted) font-medium whitespace-nowrap">상태</th>
                {tab === '미체결' && (
                  <th className="text-center px-4 py-2 text-(--text-muted) font-medium whitespace-nowrap">취소</th>
                )}
              </tr>
            </thead>
            <tbody>
              {orderRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-(--text-muted)">
                    {tab === '미체결' ? '미체결 주문이 없습니다' : '내역이 없습니다'}
                  </td>
                </tr>
              ) : orderRows.map((r) => (
                <tr key={r.id} className="hover:bg-white/4 transition-colors">
                  <td className="px-4 py-2.5 text-(--text-muted) tabular-nums whitespace-nowrap">{r.time}</td>
                  <td className="px-3 py-2.5 text-(--page-text) font-medium whitespace-nowrap">{r.coin}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span className={r.side === 'buy' ? 'text-(--color-up) font-medium' : 'text-(--color-down) font-medium'}>
                      {r.side === 'buy' ? '매수' : '매도'}
                    </span>
                    <span className="text-(--text-muted) ml-1">{r.orderType}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right text-(--page-text) tabular-nums whitespace-nowrap">{r.price}</td>
                  <td className="px-3 py-2.5 text-right text-(--page-text) tabular-nums whitespace-nowrap">{r.amount}</td>
                  <td className="px-3 py-2.5 text-right text-(--text-muted) tabular-nums whitespace-nowrap">{r.filled}</td>
                  <td className={`px-3 py-2.5 text-center font-medium whitespace-nowrap ${STATUS_STYLE[r.status]}`}>
                    {r.status}
                  </td>
                  {tab === '미체결' && (
                    <td className="px-4 py-2.5 text-center">
                      <button
                        type="button"
                        onClick={() => cancelOrder(r.id)}
                        className="flex items-center justify-center mx-auto h-5 w-5 rounded-full bg-white/6 text-(--text-muted) hover:bg-rose-500/20 hover:text-(--color-down) transition-colors"
                        aria-label="주문 취소"
                      >
                        <X size={10} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── 지표 요약 ── */}
      {isLoggedIn && tab === '지표 요약' && (
        <div className="px-4 py-3 h-[220px] overflow-auto">
          <div className="text-xs text-(--text-muted) mb-3">MA / BB / RSI</div>
          <div className="space-y-3">
            {INDICATORS.map((ind) => (
              <div key={ind.label} className="flex items-center justify-between gap-3">
                <span className="text-xs text-(--text-muted)">{ind.label}</span>
                <span className="text-sm font-semibold text-(--page-text) tabular-nums">
                  {isLoading ? '—' : ind.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
