import express from 'express'
import * as controllers from './controllers.js'

const router = express.Router()

// Results endpoints
router.get('/results', controllers.getResults)
router.post('/results/refresh', controllers.refreshResults)

// Parameters endpoints
router.get('/parameters', controllers.getParameters)
router.post('/parameters', controllers.saveParameters)

// Export endpoints
router.post('/export/json', controllers.exportJSON)
router.post('/export/pdf', controllers.exportPDF)
router.post('/export/excel', controllers.exportExcel)

// Share endpoints
router.post('/share/email', controllers.shareEmail)
router.post('/share/whatsapp', controllers.shareWhatsApp)

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'Backend API OK' })
})

export default router
