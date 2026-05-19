import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Parameters from './pages/Parameters'
import Settings from './pages/Settings'
import Login from './pages/Login'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/parameters" element={<Parameters />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
