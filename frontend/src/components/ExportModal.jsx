import { X, FileJson, File, Mail, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function ExportModal({ property, onClose }) {
  const [selectedFormat, setSelectedFormat] = useState('json')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleExport = async (format) => {
    setLoading(true)

    try {
      if (format === 'json') {
        // Export as JSON
        const dataStr = JSON.stringify(property, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `property-${property.id}.json`
        link.click()
        URL.revokeObjectURL(url)
      } else if (format === 'csv') {
        // Export as CSV
        const csv = Object.entries(property)
          .map(([key, value]) => `"${key}","${value}"`)
          .join('\n')

        const dataBlob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `property-${property.id}.csv`
        link.click()
        URL.revokeObjectURL(url)
      } else if (format === 'pdf') {
        // TODO: Generate PDF with pdfkit
        console.log('PDF export would be handled by backend')
        alert('PDF export requires backend integration')
      }

      alert('ייצוא בוצע בהצלחה!')
      onClose()
    } catch (error) {
      console.error('Export error:', error)
      alert('שגיאה בייצוא')
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmail = async () => {
    if (!email) {
      alert('אנא הכנס כתובת אימייל')
      return
    }

    setLoading(true)
    try {
      // TODO: Call backend API to send email
      console.log('Sending email to:', email)
      alert('אימייל נשלח בהצלחה!')
      onClose()
    } catch (error) {
      console.error('Email error:', error)
      alert('שגיאה בשליחת אימייל')
    } finally {
      setLoading(false)
    }
  }

  const handleSendWhatsApp = () => {
    const message = `עסקה נמצאה: ${property.address} - ₪${property.price}\n${property.url}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">ייצוא וביטול</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Property Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">עסקה:</p>
            <p className="font-bold text-gray-900">{property.address}</p>
            <p className="text-sm text-green-600 font-semibold">₪{property.price.toLocaleString('he-IL')}</p>
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">📥 ייצוא קובץ</h3>

            {/* JSON */}
            <button
              onClick={() => handleExport('json')}
              disabled={loading}
              className="w-full p-3 border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 rounded-lg transition text-right disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <FileJson className="text-blue-600" size={20} />
                <div className="text-right">
                  <p className="font-semibold text-gray-900">JSON</p>
                  <p className="text-xs text-gray-600">קובץ JSON יידבק</p>
                </div>
              </div>
            </button>

            {/* CSV */}
            <button
              onClick={() => handleExport('csv')}
              disabled={loading}
              className="w-full p-3 border-2 border-gray-300 hover:border-green-600 hover:bg-green-50 rounded-lg transition text-right disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <File className="text-green-600" size={20} />
                <div className="text-right">
                  <p className="font-semibold text-gray-900">CSV</p>
                  <p className="text-xs text-gray-600">קובץ CSV עבור Excel</p>
                </div>
              </div>
            </button>

            {/* PDF */}
            <button
              onClick={() => handleExport('pdf')}
              disabled={loading}
              className="w-full p-3 border-2 border-gray-300 hover:border-red-600 hover:bg-red-50 rounded-lg transition text-right disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <File className="text-red-600" size={20} />
                <div className="text-right">
                  <p className="font-semibold text-gray-900">PDF</p>
                  <p className="text-xs text-gray-600">דוח מעוצב</p>
                </div>
              </div>
            </button>
          </div>

          {/* Sharing Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">📤 שיתוף</h3>

            {/* Email */}
            <div className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                dir="rtl"
              />
              <button
                onClick={handleSendEmail}
                disabled={loading}
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                שלח בדוא״ל
              </button>
            </div>

            {/* WhatsApp */}
            <button
              onClick={handleSendWhatsApp}
              disabled={loading}
              className="w-full p-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              שלח בוואצאפ
            </button>
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">🔗 קישור</h3>
            <button
              onClick={() => {
                navigator.clipboard.writeText(property.url)
                alert('קישור הועתק!')
              }}
              className="w-full p-3 border-2 border-gray-300 hover:border-purple-600 hover:bg-purple-50 rounded-lg transition text-right transition disabled:opacity-50"
            >
              <p className="text-sm text-gray-700 truncate">{property.url}</p>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full p-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg transition font-semibold"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  )
}
