import { ThemeProvider } from './app/providers'
import { MarketPage } from './pages/market'

function App() {
  return (
    <ThemeProvider>
      <MarketPage />
    </ThemeProvider>
  )
}

export default App
