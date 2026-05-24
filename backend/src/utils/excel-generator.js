import XLSX from 'xlsx'
import logger from './logger.js'

export function generatePropertyExcel(properties) {
  try {
    // Prepare data for Excel
    const data = properties.map(prop => ({
      'דירוג': prop.score || 'N/A',
      'כתובת': prop.address || '',
      'עיר': prop.city || '',
      'שכונה': prop.neighborhood || '',
      'סוג נכס': prop.type || '',
      'מחיר': prop.price ? `₪${prop.price}` : '',
      'גודל': prop.size ? `${prop.size}m²` : '',
      'חדרים': prop.rooms || '',
      'קישור': prop.url || ''
    }))

    // Create workbook
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(data, { header: 1 })

    // Set column widths
    const colWidths = [8, 20, 12, 15, 12, 15, 10, 8, 30]
    worksheet['!cols'] = colWidths.map(width => ({ wch: width }))

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'נכסים')

    // Convert to buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })
    return excelBuffer
  } catch (error) {
    logger.error('Excel generation error', error.message)
    throw error
  }
}
