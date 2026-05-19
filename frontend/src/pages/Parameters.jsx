import { useState } from 'react'
import { Save, Plus, Trash2, Play } from 'lucide-react'

export default function Parameters() {
  const [criteria, setCriteria] = useState([
    {
      id: 1,
      name: 'דירה זולה שדורשת שיפוץ',
      type: 'apartment',
      priceMin: 150000,
      priceMax: 500000,
      sizeMin: 50,
      locations: ['תל אביב', 'ראשון לציון'],
      weight: 1.5
    },
    {
      id: 2,
      name: 'בנין לפני פינוי-בינוי',
      type: 'building',
      priceMin: 800000,
      priceMax: 3000000,
      sizeMin: 500,
      locations: ['תל אביב', 'ירושלים'],
      weight: 2
    }
  ])

  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)

  const cities = ['תל אביב', 'ירושלים', 'ראשון לציון', 'הרצליה', 'בת ים', 'גבעתיים']

  const handleAddCriteria = () => {
    const newId = Math.max(...criteria.map(c => c.id), 0) + 1
    setCriteria([...criteria, {
      id: newId,
      name: 'קריטריון חדש',
      type: 'apartment',
      priceMin: 100000,
      priceMax: 1000000,
      sizeMin: 50,
      locations: [],
      weight: 1
    }])
  }

  const handleDeleteCriteria = (id) => {
    setCriteria(criteria.filter(c => c.id !== id))
  }

  const handleUpdateCriteria = (id, field, value) => {
    setCriteria(criteria.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ))
  }

  const handleSave = async () => {
    setSaving(true)
    // TODO: Call API to save parameters
    setTimeout(() => {
      alert('קריטריונים נשמרו בהצלחה!')
      setSaving(false)
    }, 1000)
  }

  const handleTest = async () => {
    // TODO: Call API to test parameters
    alert('בדיקה מתחילה... (צריך integration עם Backend)')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">⚙️ הגדרות חיפוש</h1>
        <button
          onClick={handleAddCriteria}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-semibold"
        >
          <Plus size={18} />
          קריטריון חדש
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          💡 הגדר קריטריונים שונים לכל סוג עסקה שמתעניין בה. ה-AI Agent ידרג את העסקאות לפי העדיפות שלך.
        </p>
      </div>

      {/* Criteria List */}
      <div className="space-y-4">
        {criteria.map((criterion) => (
          <div key={criterion.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={criterion.name}
                  onChange={(e) => handleUpdateCriteria(criterion.id, 'name', e.target.value)}
                  className="text-xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none w-full mb-2"
                />
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">סוג:</span>
                  <select
                    value={criterion.type}
                    onChange={(e) => handleUpdateCriteria(criterion.id, 'type', e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="apartment">דירה</option>
                    <option value="building">בנין</option>
                    <option value="house">בית</option>
                    <option value="other">אחר</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => handleDeleteCriteria(criterion.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Grid of fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  טווח מחיר
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={criterion.priceMin}
                      onChange={(e) => handleUpdateCriteria(criterion.id, 'priceMin', parseInt(e.target.value))}
                      placeholder="מינימום"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">מינימום</p>
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={criterion.priceMax}
                      onChange={(e) => handleUpdateCriteria(criterion.id, 'priceMax', parseInt(e.target.value))}
                      placeholder="מקסימום"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">מקסימום</p>
                  </div>
                </div>
              </div>

              {/* Minimum Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  גודל מינימלי (מ״ר)
                </label>
                <input
                  type="number"
                  value={criterion.sizeMin}
                  onChange={(e) => handleUpdateCriteria(criterion.id, 'sizeMin', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Weight/Priority */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  עדיפות (weight)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={criterion.weight}
                    onChange={(e) => handleUpdateCriteria(criterion.id, 'weight', parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-12 text-center font-bold text-blue-600">{criterion.weight}</span>
                </div>
              </div>

              {/* Locations */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  עירות (בחר את המועדפות)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {cities.map(city => (
                    <label key={city} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={criterion.locations.includes(city)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleUpdateCriteria(criterion.id, 'locations', [...criterion.locations, city])
                          } else {
                            handleUpdateCriteria(criterion.id, 'locations', criterion.locations.filter(c => c !== city))
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{city}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
              <p>
                ✓ <strong>{criterion.locations.length}</strong> עירות נבחרות |
                ✓ מחיר: <strong>₪{criterion.priceMin.toLocaleString('he-IL')} - ₪{criterion.priceMax.toLocaleString('he-IL')}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 bg-white p-4 rounded-lg shadow-lg flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold"
        >
          <Save size={18} />
          {saving ? 'שמירה...' : 'שמור קריטריונים'}
        </button>
        <button
          onClick={handleTest}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-semibold"
        >
          <Play size={18} />
          בדוק קריטריונים
        </button>
      </div>
    </div>
  )
}
