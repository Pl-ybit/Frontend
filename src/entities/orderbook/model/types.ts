export type OrderBookVariant = 'up' | 'down' | 'neutral'

export interface OrderBookEntry {
  price: number
  amount: number
  total: number
  variant: OrderBookVariant
}

export interface OrderBook {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
  marketPrice: number
  spread: number
}
