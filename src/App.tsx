import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, AuthProvider } from './app/providers'
import { HomePage } from './pages/home'
import { MarketPage } from './pages/market'
import { LoginPage } from './pages/login'
import { SignupPage } from './pages/signup'

function App() {
  return (
    <AuthProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exchange" element={<MarketPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
  )
}

export default App
