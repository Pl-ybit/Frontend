import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './app/providers'
import { MarketPage } from './pages/market'
import { LoginPage } from './pages/login'
import { SignupPage } from './pages/signup'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MarketPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
