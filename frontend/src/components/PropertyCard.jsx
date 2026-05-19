import { MapPin, Home, Ruler, TrendingUp, Share2, Download, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function PropertyCard({ property, onExport, onShare }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
      {/* תמונה placeholder */}
      <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-6xl">
        🏠
      </div>

      {/* תוכן */}
      <div className="p-6">
        {/* דרגה וניקוד */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(property.score || 0)}
            </div>
            <span className="text-sm text-gray-600">/100</span>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < Math.round((property.score || 0) / 20)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>

        {/* כותרת - כתובת */}
        <h2 className="text-lg font-bold text-gray-900 mb-2">{property.address}</h2>

        {/* מחיר */}
        <div className="text-2xl font-bold text-green-600 mb-4">
          ₪{(property.price || 0).toLocaleString('he-IL')}
        </div>

        {/* נתונים בסיסיים */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {/* סוג */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Home size={16} className="text-blue-600" />
              <span className="text-xs text-gray-600">סוג</span>
            </div>
            <p className="font-semibold text-sm">{property.type || 'נכס'}</p>
          </div>

          {/* גודל */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Ruler size={16} className="text-blue-600" />
              <span className="text-xs text-gray-600">גודל</span>
            </div>
            <p className="font-semibold text-sm">{property.size || '—'} מ״ר</p>
          </div>

          {/* חדרים */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-600">🔑</span>
              <span className="text-xs text-gray-600">חדרים</span>
            </div>
            <p className="font-semibold text-sm">{property.rooms || '—'}</p>
          </div>
        </div>

        {/* מיקום */}
        <div className="flex items-start gap-2 mb-4 text-gray-700">
          <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">{property.city}</p>
            <p className="text-xs text-gray-500">{property.neighborhood}</p>
          </div>
        </div>

        {/* סיבת ההמלצה */}
        {property.reason && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-2 items-start">
              <TrendingUp size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold text-xs mb-1">למה זה מומלץ:</p>
                <p>{property.reason}</p>
              </div>
            </div>
          </div>
        )}

        {/* תיאור */}
        {property.description && (
          <div className="mb-4">
            <p className="text-sm text-gray-700 line-clamp-2">{property.description}</p>
            {property.description.length > 100 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 text-xs font-semibold mt-2 flex items-center gap-1"
              >
                {expanded ? 'הסתר' : 'קרא עוד'}
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        )}

        {/* תיאור מלא (if expanded) */}
        {expanded && property.description && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
            {property.description}
          </div>
        )}

        {/* כפתורים */}
        <div className="flex gap-2 pt-4 border-t">
          <button
            onClick={() => onExport?.(property)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition text-sm font-semibold"
          >
            <Download size={16} />
            ייצוא
          </button>
          <button
            onClick={() => onShare?.(property)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition text-sm font-semibold"
          >
            <Share2 size={16} />
            שיתוף
          </button>
        </div>

        {/* קישור דיוק */}
        <a
          href={property.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-center py-2 px-3 border border-gray-300 hover:bg-gray-50 rounded-lg transition text-sm font-semibold text-gray-700"
        >
          → בדוק באתר
        </a>
      </div>
    </div>
  )
}
