import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ShipStack from './pages/ShipStack.jsx'
import GettingStarted from './pages/GettingStarted.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/packs/ship-stack" element={<ShipStack />} />
        <Route path="/packs/ship-stack/start" element={<GettingStarted />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
