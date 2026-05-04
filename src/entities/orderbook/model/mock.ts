import type { OrderBook, OrderBookEntry } from './types'

function makeOrderRows(basePrice: number, count: number, step: number): OrderBookEntry[] {
  return Array.from({ length: count }, (_, i) => {
    const price = basePrice + i * step
    const amount = Math.round(8000 + Math.random() * 6000)
    return { price, amount, total: Math.round(price * amount), variant: 'up' as const }
  })
}

const ASK_BASE = 1934.5
const BID_BASE = 1932.3

export const ORDER_BOOK: OrderBook = {
  asks: makeOrderRows(ASK_BASE, 16, 0.1).reverse(),
  bids: makeOrderRows(BID_BASE - 15 * 0.1, 16, 0.1).reverse(),
  marketPrice: 2923500,
  spread: 1525000,
}
