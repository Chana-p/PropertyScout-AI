import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Menu, LogOut, Settings, Home } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        {/* לוגו */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">🏘️</span>
          </div>
          <span className="hidden sm:inline">PropertyScout AI</span>
        </Link>

        {/* ניווט ראשי */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
            <Home size={18} />
            <span>דוחות</span>
          </Link>
          <Link to="/parameters" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
            <span>⚙️</span>
            <span>פרמטרים</span>
          </Link>
        </nav>

        {/* פרטי משתמש וכפתורים */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-700">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span>{user?.name?.[0] || '👤'}</span>
            </div>
            <span>{user?.name || 'משתמש'}</span>
          </div>

          {/* מוקד ניווט סלולרי */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* כפתור יציאה */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">יציאה</span>
          </button>
        </div>
      </div>

      {/* תפריט סלולרי */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <div className="container py-4 flex flex-col gap-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">דוחות</Link>
            <Link to="/parameters" className="text-gray-700 hover:text-blue-600">פרמטרים</Link>
            <Link to="/settings" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <Settings size={18} />
              הגדרות
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
