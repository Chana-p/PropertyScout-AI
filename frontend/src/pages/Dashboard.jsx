import { useState, useEffect } from 'react'
import PropertyCard from '../components/PropertyCard'
import PropertyTable from '../components/PropertyTable'
import ExportModal from '../components/ExportModal'
import { RefreshCw, BarChart2, Grid3x3 } from 'lucide-react'

export default function Dashboard() {
  const [properties, setProperties] = useState([])
  const [view, setView] = useState('cards') // 'cards' or 'table'
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [exportModal, setExportModal] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    avgPrice: 0,
    avgScore: 0
  })

  // Load sample data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleData = [
        {
          id: 1,
          address: 'רחוב דיזנגוף 100',
          city: 'תל אביב',
          neighborhood: 'מרכז',
          type: 'דירה',
          price: 450000,
          size: 75,
          rooms: 3,
          score: 87,
          reason: 'דירה זולה שדורשת שיפוץ - מחיר טוב למיקום',
          description: 'דירה ברחוב ראשי, קרובה לתחנה, צנועה אך בפוטנציאל תיקום גבוה',
          url: 'https://www.yad2.co.il'
        },
        {
          id: 2,
          address: 'רחוב בנגוריון 50',
          city: 'ירושלים',
          neighborhood: 'גבעת מורג',
          type: 'דירה',
          price: 380000,
          size: 65,
          rooms: 2,
          score: 92,
          reason: 'עמדת בנייה אחרי רנובציה - השקעה מעולה',
          description: 'דירה חדישה לאחר שיפוץ מלא, מצב מעולה',
          url: 'https://www.yad2.co.il'
        },
        {
          id: 3,
          address: 'רחוב עיז אדין 200',
          city: 'ראשון לציון',
          neighborhood: 'מרכז עיר',
          type: 'דירה',
          price: 520000,
          size: 85,
          rooms: 4,
          score: 75,
          reason: 'בנין לפני פינוי-בינוי - הזדמנות פיתוח',
          description: 'בנין פרטי, דירה גדולה וצעירה, אזור מתפתח',
          url: 'https://www.yad2.co.il'
        },
        {
          id: 4,
          address: 'קיבוץ גלויות 15',
          city: 'הרצליה',
          neighborhood: 'כנתות',
          type: 'דירה',
          price: 350000,
          size: 60,
          rooms: 2,
          score: 68,
          reason: 'דיור בגבול למקום עבודה',
          description: 'דירה זקנה אבל במיקום טוב, דורש שיפוץ',
          url: 'https://www.yad2.co.il'
        },
        {
          id: 5,
          address: 'אבן גבירול 300',
          city: 'תל אביב',
          neighborhood: 'דרום',
          type: 'דירה',
          price: 620000,
          size: 120,
          rooms: 4,
          score: 84,
          reason: 'דירה גדולה במיקום מודולי',
          description: 'דירה מרווחת, קרובה לים וחנויות',
          url: 'https://www.yad2.co.il'
        }
      ]

      setProperties(sampleData)
      setLastUpdate(new Date().toLocaleTimeString('he-IL'))

      // Calculate stats
      const avgPrice = Math.round(sampleData.reduce((sum, p) => sum + p.price, 0) / sampleData.length)
      const avgScore = Math.round(sampleData.reduce((sum, p) => sum + p.score, 0) / sampleData.length)

      setStats({
        total: sampleData.length,
        avgPrice,
        avgScore
      })

      setLoading(false)
    }, 500)
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLastUpdate(new Date().toLocaleTimeString('he-IL'))
      setLoading(false)
    }, 1000)
  }

  const handleExport = (property) => {
    setExportModal(property)
  }

  const handleShare = (property) => {
    console.log('Share property:', property)
    // TODO: Implement share functionality
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען עסקאות...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 דוחות עסקאות</h1>
          <p className="text-sm text-gray-600 mt-1">
            {lastUpdate && `עדכון אחרון: ${lastUpdate}`}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          רענן
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-blue-600">
          <p className="text-gray-600 text-sm font-semibold mb-1">סה״כ עסקאות</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-green-600">
          <p className="text-gray-600 text-sm font-semibold mb-1">ממוצע מחיר</p>
          <p className="text-3xl font-bold text-green-600">
            ₪{stats.avgPrice.toLocaleString('he-IL')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-yellow-600">
          <p className="text-gray-600 text-sm font-semibold mb-1">ממוצע ניקוד</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.avgScore}/100</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 bg-white p-4 rounded-lg shadow-md">
        <button
          onClick={() => setView('cards')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
            view === 'cards'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Grid3x3 size={18} />
          כרטיסים
        </button>
        <button
          onClick={() => setView('table')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
            view === 'table'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <BarChart2 size={18} />
          טבלה
        </button>
      </div>

      {/* Results */}
      {view === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onExport={handleExport}
              onShare={handleShare}
            />
          ))}
        </div>
      ) : (
        <PropertyTable
          properties={properties}
          onExport={handleExport}
          onShare={handleShare}
        />
      )}

      {/* Export Modal */}
      {exportModal && (
        <ExportModal
          property={exportModal}
          onClose={() => setExportModal(null)}
        />
      )}
    </div>
  )
}
