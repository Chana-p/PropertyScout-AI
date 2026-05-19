import { ChevronUp, ChevronDown, Download, Share2 } from 'lucide-react'
import { useState } from 'react'

export default function PropertyTable({ properties, onExport, onShare }) {
  const [sortField, setSortField] = useState('score')
  const [sortOrder, setSortOrder] = useState('desc')

  const sorted = [...properties].sort((a, b) => {
    let aVal = a[sortField]
    let bVal = b[sortField]

    // מטפל בערכים חסרים
    if (aVal === undefined || aVal === null) aVal = 0
    if (bVal === undefined || bVal === null) bVal = 0

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
    }

    // sort strings
    aVal = String(aVal).toLowerCase()
    bVal = String(bVal).toLowerCase()
    return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
  })

  const SortHeader = ({ field, label }) => (
    <th className="px-4 py-3 bg-gray-50 text-right text-xs font-semibold text-gray-700 border-b">
      <button
        onClick={() => {
          if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
          } else {
            setSortField(field)
            setSortOrder('desc')
          }
        }}
        className="flex items-center gap-2 hover:text-blue-600 transition w-full"
      >
        <span>{label}</span>
        {sortField === field && (
          sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
        )}
      </button>
    </th>
  )

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <SortHeader field="score" label="ניקוד" />
              <SortHeader field="price" label="מחיר" />
              <SortHeader field="address" label="כתובת" />
              <SortHeader field="city" label="עיר" />
              <SortHeader field="type" label="סוג" />
              <SortHeader field="size" label="גודל" />
              <SortHeader field="rooms" label="חדרים" />
              <th className="px-4 py-3 bg-gray-50 text-right text-xs font-semibold text-gray-700 border-b">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((property, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-blue-50 transition"
              >
                {/* ניקוד */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                      {Math.round(property.score || 0)}
                    </div>
                    <span className="text-yellow-500">
                      {'⭐'.repeat(Math.min(5, Math.round((property.score || 0) / 20)))}
                    </span>
                  </div>
                </td>

                {/* מחיר */}
                <td className="px-4 py-3 text-right font-semibold text-green-600">
                  ₪{(property.price || 0).toLocaleString('he-IL')}
                </td>

                {/* כתובת */}
                <td className="px-4 py-3 text-right">
                  <p className="font-semibold text-gray-900 text-sm">
                    {property.address}
                  </p>
                </td>

                {/* עיר */}
                <td className="px-4 py-3 text-right text-sm text-gray-700">
                  {property.city}
                </td>

                {/* סוג */}
                <td className="px-4 py-3 text-right">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                    {property.type || '—'}
                  </span>
                </td>

                {/* גודל */}
                <td className="px-4 py-3 text-right text-sm text-gray-700">
                  {property.size ? `${property.size} מ״ר` : '—'}
                </td>

                {/* חדרים */}
                <td className="px-4 py-3 text-right text-sm text-gray-700">
                  {property.rooms || '—'}
                </td>

                {/* פעולות */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onExport?.(property)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded transition"
                      title="ייצוא"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => onShare?.(property)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded transition"
                      title="שיתוף"
                    >
                      <Share2 size={16} />
                    </button>
                    <a
                      href={property.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded transition"
                      title="בדוק באתר"
                    >
                      🔗
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">📭 לא נמצאו עסקאות</p>
          <p className="text-gray-400 text-sm">
            אנא עדכן את הפרמטרים או בחר קריטריונים אחרים
          </p>
        </div>
      )}

      {sorted.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-600 text-right">
          מציג {sorted.length} עסקאות
        </div>
      )}
    </div>
  )
}
