import { useState } from 'react'
import { Star } from 'lucide-react'
import { Input } from '../../../shared/ui'
import type { CoinRow } from '../../../entities/coin'

interface MarketScannerProps {
  rows: CoinRow[]
  search: string
  onSearchChange: (value: string) => void
  isLoggedIn?: boolean
}

type Tab = '관심' | 'KRW' | '보유'

const TABS: Tab[] = ['관심', 'KRW', '보유']

const CHANGE_COLOR: Record<CoinRow['variant'], string> = {
  up: 'text-(--color-up)',
  down: 'text-(--color-down)',
  neutral: 'text-slate-400',
}

export function MarketScanner({ rows, search, onSearchChange, isLoggedIn = false }: MarketScannerProps) {
  const [tab, setTab] = useState<Tab>('KRW')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  function toggleFavorite(symbol: string) {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(symbol)) {
        next.delete(symbol)
      } else {
        next.add(symbol)
      }
      return next
    })
  }

  const tabFiltered = rows.filter((r) => {
    if (tab === '관심') return favorites.has(r.symbol)
    if (tab === 'KRW') return r.symbol.endsWith('/KRW')
    return false
  })

  const filtered = tabFiltered.filter((r) =>
    r.symbol.split('/')[0].toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-4 pt-4 pb-0 border-b border-white/8">
        <div className="text-sm font-semibold text-(--page-text) mb-3">Market Search &amp; Filtering</div>
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="검색"
          aria-label="coin search"
        />

        {/* Tabs */}
        <div className="flex mt-3">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={[
                'flex-1 pb-2 text-xs font-medium transition-colors border-b-2',
                tab === t
                  ? 'text-blue-400 border-blue-400'
                  : 'text-(--text-muted) border-transparent hover:text-(--page-text)',
              ].join(' ')}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 비로그인 관심/보유 안내 */}
      {!isLoggedIn && (tab === '관심' || tab === '보유') && (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-sm text-(--text-muted)">로그인을 완료해주세요!</span>
        </div>
      )}

      {/* Table */}
      {(isLoggedIn || tab === 'KRW') && <div className="flex-1 overflow-auto">
        <table className="w-full text-xs border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-(--page-bg,#0f172a)">
            <tr>
              <th className="text-left px-4 py-2 text-(--text-muted) font-medium">Pair</th>
              <th className="text-right px-3 py-2 text-(--text-muted) font-medium">Price</th>
              <th className="text-right px-4 py-2 text-(--text-muted) font-medium">24h %</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.symbol}
                className="cursor-pointer hover:bg-white/4 transition-colors"
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(r.symbol) }}
                      className="shrink-0 text-(--text-muted) hover:text-yellow-400 transition-colors"
                      aria-label={favorites.has(r.symbol) ? '관심 해제' : '관심 추가'}
                    >
                      <Star
                        size={13}
                        className={favorites.has(r.symbol) ? 'fill-yellow-400 text-yellow-400' : ''}
                      />
                    </button>
                    <span className="text-(--page-text) font-medium truncate">{r.symbol.replace('/KRW', '/krw')}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-right text-(--page-text) tabular-nums">{r.price}</td>
                <td className={`px-4 py-2.5 text-right tabular-nums font-medium ${CHANGE_COLOR[r.variant]}`}>
                  {r.change}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-(--text-muted) text-xs">
                  {tab === '관심' ? '별표를 눌러 관심 코인을 추가하세요' : tab === '보유' ? '보유 코인이 없습니다' : '검색 결과가 없습니다'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>}
    </div>
  )
}
