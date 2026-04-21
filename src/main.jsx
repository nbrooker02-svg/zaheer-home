import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Home from './App'
import Apps from './pages/Apps'
import About from './pages/About'
import Contact from './pages/Contact'
import Studio from './pages/Studio'
import StudioPack from './pages/StudioPack'
import Pricing from './pages/Pricing'
import Auth from './pages/studio/Auth'
import Library from './pages/studio/Library'
import Account from './pages/studio/Account'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/studio/browse" element={<Studio />} />
            <Route path="/studio/:packId" element={<StudioPack />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/studio/auth" element={<Auth />} />
            <Route
              path="/studio/library"
              element={<ProtectedRoute><Library /></ProtectedRoute>}
            />
            <Route
              path="/studio/account"
              element={<ProtectedRoute><Account /></ProtectedRoute>}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
