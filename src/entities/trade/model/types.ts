export type TradeSide = 'buy' | 'sell' | 'neutral'

export interface TradeRow {
  time: string
  price: string
  amount: string
  side: TradeSide
}
