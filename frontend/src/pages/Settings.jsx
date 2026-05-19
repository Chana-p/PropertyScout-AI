import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Bell, Lock, Palette, Clock, Save } from 'lucide-react'

export default function Settings() {
  const { user, logout } = useAuth()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    dailyDigest: true,
    theme: 'light',
    timezone: 'Israel'
  })
  const [saving, setSaving] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleSettingChange = (field, value) => {
    setSettings({ ...settings, [field]: value })
  }

  const handleSave = async () => {
    setSaving(true)
    // TODO: Call API to save settings
    setTimeout(() => {
      alert('הגדרות נשמרו!')
      setSaving(false)
    }, 500)
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">⚙️ הגדרות</h1>

      {/* User Profile Card */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl">
            {user?.avatar || '👤'}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name || 'משתמש'}</h2>
            <p className="text-blue-100">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
            <Bell size={20} className="text-blue-600" />
            התראות
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">קבל התראות בדוא״ל</p>
                <p className="text-sm text-gray-600">הודעות על עסקאות חדשות המתאימות לקריטריונים שלך</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  className="w-5 h-5"
                />
              </label>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="font-semibold text-gray-900">סיכום יומי</p>
                <p className="text-sm text-gray-600">קבל סיכום העסקאות החדשות כל בוקר</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.dailyDigest}
                  onChange={(e) => handleSettingChange('dailyDigest', e.target.checked)}
                  className="w-5 h-5"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
            <Palette size={20} className="text-purple-600" />
            תצוגה
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🎨 ערכת צבעים
              </label>
              <select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">בהיר</option>
                <option value="dark">כהה</option>
                <option value="auto">אוטומטי</option>
              </select>
            </div>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
            <Clock size={20} className="text-orange-600" />
            הגדרות אזוריות
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🌍 אזור זמן
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Israel">ישראל (IST)</option>
                <option value="UTC">UTC</option>
                <option value="London">לונדון (GMT)</option>
                <option value="NewYork">ניו יורק (EST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
            <Lock size={20} className="text-green-600" />
            אבטחה ופרטיות
          </h3>

          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              ✓ הנתונים שלך מאוחסנים בצורה מאובטחת<br />
              ✓ לא אנחנו שומרים פרטי בנק או פרטים אישיים<br />
              ✓ אתה יכול למחוק את החשבון שלך בכל עת
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
              → קרא את מדיניות הפרטיות המלאה
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-900 mb-4">⚠️ אזור הסכנה</h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-red-800 mb-3">
                פעולות אלה הן בלתי הפיכות. אנא היזהר!
              </p>

              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold"
              >
                🚪 התנתקות
              </button>

              <button
                className="w-full px-4 py-2 mt-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition font-semibold"
              >
                🗑️ מחק חשבון (לא זמין עדיין)
              </button>
            </div>
          </div>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-sm w-full mx-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">התנתק?</h3>
              <p className="text-gray-600 mb-6">
                האם אתה בטוח שתרצה להתנתק? תצטרך להתחבר שוב כדי להשתמש במערכת.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg transition font-semibold"
                >
                  בטל
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold"
                >
                  התנתק
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="sticky bottom-0 bg-white p-4 rounded-lg shadow-lg">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold"
        >
          <Save size={18} />
          {saving ? 'שמירה...' : 'שמור הגדרות'}
        </button>
      </div>
    </div>
  )
}
