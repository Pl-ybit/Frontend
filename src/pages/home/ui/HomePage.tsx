import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../../../shared/ui'
import { useTheme } from '../../../app/providers'
import { COIN_ROWS } from '../../../entities/coin'
import type { CoinRow } from '../../../entities/coin'

const NAV_ITEMS = [
  { label: '홈', key: 'home' },
  { label: '시세', key: 'market' },
  { label: '거래소', key: 'exchange' },
]

const KOREAN_NAMES: Record<string, string> = {
  'BTC/KRW': '비트코인', 'ETH/KRW': '이더리움', 'SOL/KRW': '솔라나',
  'XRP/KRW': '리플',     'BNB/KRW': '바이낸스',  'ADA/KRW': '에이다',
  'DOGE/KRW': '도지코인', 'MATIC/KRW': '폴리곤', 'DOT/KRW': '폴카닷',
  'AVAX/KRW': '아발란체', 'LINK/KRW': '체인링크', 'UNI/KRW': '유니스왑',
}

const SPARKLINES: Record<string, string> = {
  'BTC/KRW':  'M0,30 C10,26 22,22 34,16 C46,10 58,8  72,4',
  'ETH/KRW':  'M0,6  C10,9  22,14 34,18 C46,20 58,24 72,28',
  'SOL/KRW':  'M0,26 C14,22 28,20 42,15 C56,10 64,8  72,6',
  'XRP/KRW':  'M0,20 C14,19 28,21 42,18 C56,20 64,18 72,20',
  'BNB/KRW':  'M0,24 C14,20 28,18 42,14 C56,10 64,9  72,6',
  'ADA/KRW':  'M0,8  C14,12 28,15 42,20 C56,24 64,26 72,30',
  'DOGE/KRW': 'M0,28 C14,24 28,20 42,15 C56,11 64,8  72,5',
  'MATIC/KRW':'M0,7  C14,11 28,15 42,20 C56,24 64,27 72,30',
}

const FEATURES = [
  { num: '01', title: '한 화면에서 끝',   desc: '시세·차트·호가·주문이 한 뷰에. 탭 이동 없이 바로 거래.' },
  { num: '02', title: '다크/라이트 자유', desc: '환경에 맞는 테마. 토글 한 번으로 즉시 전환.' },
  { num: '03', title: '필요한 데이터만',  desc: '쓸데없는 위젯 없음. 정렬·여백·타이포로만 정보 위계 구성.' },
]

// Normalized [open, high, low, close] 0=bottom 1=top — used for BTC hero card mini chart
const HERO_CANDLES: [number, number, number, number][] = [
  [0.42,0.50,0.36,0.38],[0.38,0.46,0.32,0.44],[0.44,0.52,0.38,0.40],
  [0.40,0.50,0.35,0.48],[0.48,0.55,0.42,0.44],[0.44,0.54,0.40,0.52],
  [0.52,0.60,0.46,0.48],[0.48,0.58,0.44,0.56],[0.56,0.62,0.50,0.52],
  [0.52,0.62,0.48,0.60],[0.60,0.66,0.54,0.56],[0.56,0.65,0.52,0.63],
  [0.63,0.68,0.58,0.60],[0.60,0.68,0.56,0.66],[0.66,0.72,0.60,0.62],
  [0.62,0.72,0.58,0.70],[0.70,0.74,0.64,0.66],[0.66,0.75,0.62,0.73],
  [0.73,0.78,0.67,0.69],[0.69,0.78,0.64,0.76],[0.76,0.80,0.70,0.72],
  [0.72,0.82,0.68,0.79],[0.79,0.84,0.73,0.75],[0.75,0.88,0.70,0.86],
]

function HeroCandleChart() {
  const W = 460, H = 170, PX = 8, PY = 14
  const bodyW = 9
  const step = (W - 2 * PX - bodyW) / (HERO_CANDLES.length - 1)
  const toX = (i: number) => PX + bodyW / 2 + i * step
  const toY = (v: number) => PY + (1 - v) * (H - 2 * PY)

  const maPoints = HERO_CANDLES.map(([,,,], i) => {
    const slice = HERO_CANDLES.slice(Math.max(0, i - 4), i + 1)
    const avg = slice.reduce((s, [,,,cc]) => s + cc, 0) / slice.length
    return `${toX(i).toFixed(1)},${toY(avg).toFixed(1)}`
  }).join(' ')

  const refY = toY(0.82)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <line x1={PX} y1={refY} x2={W - 55} y2={refY}
        stroke="#ef4444" strokeWidth="1" strokeDasharray="5,4" opacity="0.45" />
      <polyline points={maPoints} fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.85" />
      {HERO_CANDLES.map(([open, high, low, close], i) => {
        const x = toX(i)
        const isUp = close >= open
        const bt = toY(Math.max(open, close))
        const bh = Math.max(2, toY(Math.min(open, close)) - bt)
        return (
          <g key={i}>
            <line x1={x} y1={toY(high)} x2={x} y2={toY(low)} stroke="#f97316" strokeWidth="1" />
            <rect x={x - bodyW / 2} y={bt} width={bodyW} height={bh}
              fill={isUp ? '#f97316' : '#1e293b'} stroke="#f97316" strokeWidth="0.8" rx="1" />
          </g>
        )
      })}
      <rect x={W - 72} y={toY(0.90) - 9} width={66} height={18} rx="3" fill="#1e3a8a" opacity="0.9" />
      <text x={W - 39} y={toY(0.90) + 5} textAnchor="middle" fill="white" fontSize="9.5" fontFamily="monospace">120,211,379</text>
    </svg>
  )
}


function CoinCard({ row }: { row: CoinRow }) {
  const isUp = row.variant === 'up'
  const isDown = row.variant === 'down'
  const color = isUp ? 'text-blue-400' : isDown ? 'text-rose-400' : 'text-slate-400'
  const strokeColor = isUp ? '#60a5fa' : isDown ? '#fb7185' : '#94a3b8'
  const path = SPARKLINES[row.symbol] ?? SPARKLINES['XRP/KRW']
  const ticker = row.symbol.split('/')[0]
  const name = KOREAN_NAMES[row.symbol] ?? ''

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 flex flex-col gap-3 hover:border-white/20 transition-colors cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-white">{ticker}</span>
            <span className="text-[11px] text-slate-400">{name}</span>
          </div>
          <div className={`text-lg font-bold tabular-nums mt-0.5 ${color}`}>{row.price}</div>
        </div>
        <span className={`text-sm font-semibold tabular-nums ${color}`}>{row.change}</span>
      </div>
      <svg viewBox="0 0 72 36" className="w-full h-9" fill="none">
        <path d={path} stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function HomePage() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const marketRef = useRef<HTMLElement>(null)

  const uniqueCoins = COIN_ROWS.filter(
    (row, i, arr) => arr.findIndex(r => r.symbol === row.symbol) === i
  ).slice(0, 8)

  function handleNav(key: string) {
    if (key === 'exchange') navigate('/exchange')
    if (key === 'market') marketRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ background: 'var(--page-gradient)' }} className="min-h-screen">
      <TopBar
        siteName="Play-Bit"
        theme={theme}
        onThemeChange={setTheme}
        navItems={NAV_ITEMS}
        activeNav="home"
        onNavClick={handleNav}
        isLoggedIn={false}
        onSignupClick={() => navigate('/signup')}
        onLoginClick={() => navigate('/login')}
      />

      {/* ─── Hero ─── */}
      <section className="flex items-center gap-12 px-8 py-12 max-w-[1400px] mx-auto">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            LIVE · KRW MARKET
          </div>

          <h1 className="text-[clamp(2.8rem,4.5vw,4.2rem)] font-extrabold leading-tight tracking-tight text-(--page-text) mb-5">
            깔끔한 차트.<br />
            <span className="text-blue-400">빠른 거래.</span>
          </h1>

          <p className="text-(--text-muted) text-base leading-relaxed max-w-[460px] mb-10">
            Play-Bit은 핵심에만 집중한 현물 거래 인터페이스입니다. 과한 정보 없이, 정말 필요한 데이터만 가장 잘 보이는 자리에.
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            <button
              onClick={() => navigate('/exchange')}
              className="px-6 py-3 rounded-xl bg-(--btn-primary-bg) text-(--btn-primary-text) border border-(--btn-primary-border) hover:bg-(--btn-primary-hover-bg) font-semibold text-sm transition-colors"
            >
              거래소 둘러보기 →
            </button>
            <button
              onClick={() => marketRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-xl border border-(--border-strong) text-(--page-text) font-semibold text-sm hover:bg-white/6 transition-colors"
            >
              시세 보기
            </button>
          </div>

          <div className="flex gap-10 border-t border-(--border-weak) pt-8">
            {[
              { value: '384억', label: '24h 거래대금' },
              { value: '12종',  label: '지원 마켓' },
              { value: '45ms', label: '평균 응답' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-(--page-text)">{value}</div>
                <div className="text-xs text-(--text-muted) mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: BTC card */}
        <div className="w-[680px] h-[480px] shrink-0 hidden lg:block">
          <div className="h-full flex flex-col rounded-2xl border border-(--border-weak) bg-(--card-bg) backdrop-blur p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">B</div>
                <div>
                  <div className="text-sm font-bold text-(--page-text)">BTC/KRW</div>
                  <div className="text-xs text-(--text-muted)">비트코인 · 1시간</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-400 tabular-nums">120,578,000</div>
                <div className="text-sm text-blue-400 font-medium">+6.12%</div>
              </div>
            </div>

            <div className="flex-1 min-h-0 mb-4">
              <HeroCandleChart />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '24h 고가', value: '121,420,000', cls: 'text-blue-400' },
                { label: '24h 저가', value: '116,200,000', cls: 'text-rose-400' },
                { label: '거래량',   value: '384.2 BTC',   cls: 'text-(--page-text)' },
              ].map(({ label, value, cls }) => (
                <div key={label} className="rounded-xl bg-black/20 p-3">
                  <div className="text-[10px] text-(--text-muted) mb-1">{label}</div>
                  <div className={`text-xs font-bold tabular-nums ${cls}`}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 실시간 시세 ─── */}
      <div className="bg-gray border-t border-(--border-weak)">
        <section ref={marketRef} className="px-8 py-16 max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">실시간 시세</h2>
            <button
              onClick={() => navigate('/exchange')}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              전체보기 →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {uniqueCoins.map((row) => (
              <CoinCard key={row.symbol} row={row} />
            ))}
          </div>
        </section>
      </div>

      {/* ─── 왜 Play-Bit인가 ─── */}
      <section className="px-8 py-20 border-t border-(--border-weak)">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-(--page-text) mb-3">왜 Play-Bit인가</h2>
            <p className="text-(--text-muted)">핵심 3가지에만 집중했습니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
            {FEATURES.map(({ num, title, desc }) => (
              <div key={num} className="rounded-2xl border border-(--border-weak) bg-(--card-bg) backdrop-blur p-8">
                <div className="text-xs font-semibold text-blue-400 mb-4">{num}</div>
                <h3 className="text-lg font-bold text-(--page-text) mb-3">{title}</h3>
                <p className="text-sm text-(--text-muted) leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-8 py-20 border-t border-(--border-weak)">
        <div className="max-w-[560px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-(--page-text) mb-4">지금 바로 둘러보세요</h2>
          <p className="text-(--text-muted) mb-10">
            로그인 없이도 모든 시세와 인터페이스를 체험할 수 있습니다.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/exchange')}
              className="px-6 py-3 rounded-xl border border-(--border-strong) text-(--page-text) font-semibold text-sm hover:bg-white/6 transition-colors"
            >
              Level 1 · 시세 뷰어
            </button>
            <button
              onClick={() => navigate('/exchange')}
              className="px-6 py-3 rounded-xl bg-(--btn-primary-bg) text-(--btn-primary-text) border border-(--btn-primary-border) hover:bg-(--btn-primary-hover-bg) font-semibold text-sm transition-colors"
            >
              Level 2 · 거래소 →
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-(--border-weak) py-8 text-center">
        <p className="text-xs text-(--text-muted)">
          © 2026 Play-Bit · Portfolio Project · Designed &amp; Built for demonstration only
        </p>
      </footer>
    </div>
  )
}
