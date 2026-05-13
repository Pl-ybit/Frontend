import { useState } from 'react'
import { X } from 'lucide-react'

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

type Tab = '미체결' | '체결내역' | '주문내역'
const TABS: Tab[] = ['미체결', '체결내역', '주문내역']

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

const ALL_ORDERS = [...OPEN_ORDERS, ...FILLED_ORDERS]

const STATUS_STYLE: Record<OrderStatus, string> = {
  대기: 'text-yellow-400',
  완료: 'text-blue-400',
  취소: 'text-(--text-muted)',
}

export function OrderHistory() {
  const [tab, setTab] = useState<Tab>('미체결')
  const [openOrders, setOpenOrders] = useState(OPEN_ORDERS)

  function cancelOrder(id: string) {
    setOpenOrders((prev) => prev.filter((o) => o.id !== id))
  }

  const rows =
    tab === '미체결' ? openOrders :
    tab === '체결내역' ? FILLED_ORDERS :
    ALL_ORDERS

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
              'px-3 pb-2.5 text-sm font-medium transition-colors border-b-2 -mb-px',
              tab === t
                ? 'text-(--page-text) border-blue-400'
                : 'text-(--text-muted) border-transparent hover:text-(--page-text)',
            ].join(' ')}
          >
            {t}
            {t === '미체결' && openOrders.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-semibold">
                {openOrders.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 테이블 */}
      <div className="overflow-auto max-h-[220px]">
        <table className="w-full text-xs border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-(--sidebar-bg)">
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
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-(--text-muted)">
                  {tab === '미체결' ? '미체결 주문이 없습니다' : '내역이 없습니다'}
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="hover:bg-white/4 transition-colors">
                  <td className="px-4 py-2.5 text-(--text-muted) tabular-nums whitespace-nowrap">{r.time}</td>
                  <td className="px-3 py-2.5 text-(--page-text) font-medium whitespace-nowrap">{r.coin}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span className={r.side === 'buy' ? 'text-blue-400 font-medium' : 'text-rose-400 font-medium'}>
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
                        className="flex items-center justify-center mx-auto h-5 w-5 rounded-full bg-white/6 text-(--text-muted) hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                        aria-label="주문 취소"
                      >
                        <X size={10} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}