export type CoinVariant = 'up' | 'down' | 'neutral'

export interface CoinRow {
  symbol: string
  price: string
  change: string
  variant: CoinVariant
}