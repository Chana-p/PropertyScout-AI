import PDFDocument from 'pdfkit'
import logger from './logger.js'

export function generatePropertyPDF(properties) {
  try {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 40
      })

      let buffers = []
      doc.on('data', buffers.push.bind(buffers))
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers)
        resolve(pdfBuffer)
      })
      doc.on('error', reject)

      // Title
      doc.fontSize(20).font('Helvetica-Bold').text('דו"ח נדלן', { align: 'right' })
      doc.fontSize(10).text(`תאריך: ${new Date().toLocaleDateString('he-IL')}`, { align: 'right' })
      doc.moveDown(1)

      // Summary
      doc.fontSize(12).font('Helvetica-Bold').text('סיכום:', { align: 'right' })
      doc.fontSize(10).font('Helvetica').text(`סה"כ נכסים: ${properties.length}`, { align: 'right' })
      doc.moveDown(1)

      // Properties table header
      doc.fontSize(11).font('Helvetica-Bold')
      const headers = ['דירוג', 'כתובת', 'עיר', 'מחיר', 'גודל']
      const columnWidths = [60, 150, 80, 100, 80]
      let x = 40
      let positions = []

      for (let i = 0; i < headers.length; i++) {
        positions.push(x)
        doc.text(headers[headers.length - 1 - i], x, doc.y, { width: columnWidths[i], align: 'right' })
        x += columnWidths[i]
      }

      doc.moveTo(40, doc.y).lineTo(550, doc.y).stroke()
      doc.moveDown(0.5)

      // Properties rows
      doc.fontSize(9).font('Helvetica')
      properties.slice(0, 20).forEach((property, index) => {
        const y = doc.y
        const values = [
          property.score || 'N/A',
          property.address || '',
          property.city || '',
          property.price ? `₪${(property.price / 1000).toFixed(0)}K` : '',
          property.size ? `${property.size}m²` : ''
        ]

        for (let i = 0; i < values.length; i++) {
          doc.text(values[values.length - 1 - i], positions[i], y, { width: columnWidths[i], align: 'right' })
        }

        doc.moveDown(1.5)

        if (doc.y > 750) {
          doc.addPage()
        }
      })

      doc.end()
    })
  } catch (error) {
    logger.error('PDF generation error', error.message)
    throw error
  }
}
