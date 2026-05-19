import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { AlertCircle } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDemoLogin = async () => {
    setLoading(true)
    setError('')

    // דמו לוגין לצרכי פיתוח
    setTimeout(() => {
      login({
        id: 'demo-user',
        name: 'משתמש דמו',
        email: email || 'demo@example.com',
        avatar: '👤'
      })
      setLoading(false)
    }, 1000)
  }

  const handleGoogleLogin = () => {
    setError('Google Login - צריך הגדרת OAuth credentials')
    // בהמשך: integration עם @react-oauth/google
  }

  const handleFacebookLogin = () => {
    setError('Facebook Login - צריך הגדרת OAuth credentials')
    // בהמשך: integration עם react-facebook-login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* כרטיסייה ראשית */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                🏘️
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center">PropertyScout AI</h1>
            <p className="text-blue-100 text-center mt-2">מציאת עסקאות נדלן חכמה בישראל</p>
          </div>

          {/* תוכן */}
          <div className="p-8">
            {/* הודעת שגיאה */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-2">
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Email Input - למטרות דמו */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                אימייל (דמו)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* כפתור דמו לוגין */}
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200 mb-4"
            >
              {loading ? 'טוען...' : 'התחברות דמו'}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">או</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 hover:border-gray-400 rounded-lg transition mb-3 text-gray-700 font-semibold"
            >
              <span className="text-xl">🔵</span>
              Google
            </button>

            {/* Facebook Login */}
            <button
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 hover:border-gray-400 rounded-lg transition text-gray-700 font-semibold"
            >
              <span className="text-xl">📘</span>
              Facebook
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t">
            <p className="text-center text-xs text-gray-600">
              בהתחברות אתה מסכים לתנאי השימוש שלנו ולמדיניות הפרטיות
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-white bg-opacity-80 backdrop-blur rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3">🎯 מה זה PropertyScout AI?</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex gap-2">
              <span>✓</span>
              <span>סינון חכם של עסקאות נדלן לפי קריטריונים שלך</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>דירוג אוטומטי של הזדמנויות השקעה</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>ייצוא וביטול עסקאות בקלות</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>עדכונים יומיים אוטומטיים</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
