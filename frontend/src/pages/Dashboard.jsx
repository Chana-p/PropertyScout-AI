import { useState, useEffect } from 'react'
import PropertyCard from '../components/PropertyCard'
import PropertyTable from '../components/PropertyTable'
import ExportModal from '../components/ExportModal'
import { RefreshCw, BarChart2, Grid3x3 } from 'lucide-react'
import { resultsAPI } from '../services/api'

export default function Dashboard() {
  const [properties, setProperties] = useState([])
  const [view, setView] = useState('cards')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [exportModal, setExportModal] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    avgPrice: 0,
    avgScore: 0
  })

  // Load results from Backend
  useEffect(() => {
    loadResults()
  }, [])

  const loadResults = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await resultsAPI.getResults()
      const props = data.properties || []

      setProperties(props)
      setLastUpdate(new Date().toLocaleTimeString('he-IL'))

      // Calculate stats
      if (props.length > 0) {
        const avgPrice = Math.round(props.reduce((sum, p) => sum + p.price, 0) / props.length)
        const avgScore = Math.round(props.reduce((sum, p) => sum + p.score, 0) / props.length)

        setStats({
          total: props.length,
          avgPrice,
          avgScore
        })
      }
    } catch (err) {
      console.error('Error loading results:', err)
      setError('שגיאה בטעינת הנתונים')
      // Load mock data as fallback
      loadMockData()
    } finally {
      setLoading(false)
    }
  }

  const loadMockData = () => {
    const mockData = [
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
        reason: 'דירה זולה שדורשת שיפוץ',
        description: 'דירה ברחוב ראשי, קרובה לתחנה',
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
        reason: 'עמדת בנייה אחרי רנובציה',
        description: 'דירה חדישה לאחר שיפוץ מלא',
        url: 'https://www.yad2.co.il'
      }
    ]

    setProperties(mockData)
    setStats({
      total: mockData.length,
      avgPrice: Math.round(mockData.reduce((sum, p) => sum + p.price, 0) / mockData.length),
      avgScore: Math.round(mockData.reduce((sum, p) => sum + p.score, 0) / mockData.length)
    })
  }

  const handleRefresh = async () => {
    setLoading(true)
    try {
      await resultsAPI.refreshResults()
      await loadResults()
    } catch (err) {
      console.error('Error refreshing results:', err)
      setError('שגיאה בעדכון הנתונים')
    }
  }

  const handleExport = (property) => {
    setExportModal(property)
  }

  const handleShare = (property) => {
    console.log('Share property:', property)
  }

  if (loading && properties.length === 0) {
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

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Results */}
      {properties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg mb-2">📭 לא נמצאו עסקאות</p>
          <p className="text-gray-400 text-sm mb-4">
            אנא רענן את הנתונים או עדכן את הפרמטרים
          </p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold"
          >
            רענן נתונים
          </button>
        </div>
      ) : (
        <>
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

          {/* Results Display */}
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
        </>
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
