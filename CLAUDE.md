# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # tsc -b && vite build (type-check + bundle)
npm run lint       # ESLint check
npm run preview    # Preview production build
```

No test runner is configured yet.

## Architecture

This project uses **Feature-Sliced Design (FSD)**. The layer import rule is strict: lower layers must not import from higher ones.

```
app → pages → widgets → features → entities → shared
```

- **app/** — `ThemeProvider` (Context API). Theme is stored in `body[data-theme]` and `localStorage`.
- **pages/market/** — Single page (`MarketPage`). Currently owns all mock data as module-level constants. When the backend is ready, data fetching and WebSocket logic should live here or be delegated to Zustand stores in `entities/`.
- **widgets/** — Each widget is a self-contained block: `market-scanner`, `trading-chart`, `trade-history`, `indicator-summary`, `order-book`. They receive data via props; they do not fetch.
- **entities/** — Domain types only right now (`CoinRow`, `OrderBook`, `OrderBookEntry`). Zustand stores will be added here when real-time data arrives.
- **shared/ui/** — Primitive components (`Button`, `Input`, `Card`, `Table`, `Badge`, `Skeleton`, `TopBar`). All are purely presentational.

## Theming

CSS custom properties drive both themes. Default (dark) variables are on `:root`; light overrides are on `body[data-theme='light']`. When adding new colors, always add both a dark default on `:root` and a light override in `body[data-theme='light']` inside `src/index.css`. Never hardcode color values in components — use `var(--token-name)` or Tailwind semantic classes.

## Real-time data (planned)

The README describes the intended architecture:
- **WebSocket** from the Spring Boot backend → throttled to ~150ms batches via `requestAnimationFrame` before writing to Zustand.
- **Web Workers** for heavy indicator calculations (MA, Bollinger Bands, RSI) to keep the main thread free.
- **`React.memo`** on list rows (`MarketScanner`, `OrderBook`) so only changed rows re-render.

All of this is unimplemented. The current data in `MarketPage` is hardcoded mock data. Zustand (`zustand` v5) and Axios (`axios` v1) are already installed.

## TradingView Chart

`widgets/trading-chart` embeds the TradingView Advanced Chart as an iframe widget (not `lightweight-charts`). The README mentions migrating to `lightweight-charts` with a custom Datafeed for OHLC from the backend — that migration has not happened yet.