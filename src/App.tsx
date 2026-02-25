import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { ActivityScreen } from './screens/ActivityScreen'
import { RewardScreen } from './screens/RewardScreen'
import { CollectionScreen } from './screens/CollectionScreen'
import { useAppStore } from './store/useAppStore'

function AutoStart({ bookId }: { bookId: string }) {
  const navigate = useNavigate()
  const startSession = useAppStore((s) => s.startSession)

  useEffect(() => {
    startSession(bookId)
    navigate('/activity', { replace: true })
  }, [bookId, startSession, navigate])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AutoStart bookId="school-way" />} />
        <Route path="/activity" element={<ActivityScreen />} />
        <Route path="/reward" element={<RewardScreen />} />
        <Route path="/collection" element={<CollectionScreen />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 flex justify-center">
        <AnimatedRoutes />
      </div>
    </HashRouter>
  )
}
