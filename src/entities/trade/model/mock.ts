import type { TradeRow } from './types'

export const TRADE_ROWS: TradeRow[] = [
  { time: '17:33:33', price: '1,989.50', amount: '1,000,000', side: 'buy' },
  { time: '17:33:31', price: '1,989.50', amount: '500,000',   side: 'sell' },
  { time: '17:33:29', price: '1,989.50', amount: '750,000',   side: 'sell' },
  { time: '17:33:28', price: '1,989.50', amount: '1,200,000', side: 'buy' },
  { time: '17:33:26', price: '1,989.50', amount: '300,000',   side: 'neutral' },
  { time: '17:33:25', price: '1,989.50', amount: '1,000,000', side: 'sell' },
  { time: '17:33:23', price: '1,989.50', amount: '880,000',   side: 'sell' },
  { time: '17:33:21', price: '1,989.50', amount: '1,000,000', side: 'buy' },
]
