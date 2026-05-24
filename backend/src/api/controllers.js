import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from '../utils/logger.js'
import { analyzeProperties } from '../agents/analyzer.js'
import { generatePropertyPDF } from '../utils/pdf-generator.js'
import { generatePropertyExcel } from '../utils/excel-generator.js'
import { sendPropertyEmail } from '../utils/emailer.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '../../data')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

const PARAMETERS_FILE = path.join(DATA_DIR, 'parameters.json')
const LISTINGS_FILE = path.join(DATA_DIR, 'listings.json')
const RESULTS_FILE = path.join(DATA_DIR, 'results.json')

// Helper functions
function readJSON(filePath, defaultValue = null) {
  try {
    if (!fs.existsSync(filePath)) {
      return defaultValue
    }
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    logger.error(`Error reading ${filePath}`, error.message)
    return defaultValue
  }
}

function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    logger.success(`Saved to ${path.basename(filePath)}`)
  } catch (error) {
    logger.error(`Error writing ${filePath}`, error.message)
    throw error
  }
}

// Controllers
export async function getResults(req, res) {
  try {
    const results = readJSON(RESULTS_FILE, { properties: [], lastUpdate: null })
    res.json(results)
  } catch (error) {
    logger.error('Error getting results', error.message)
    res.status(500).json({ error: 'Failed to get results' })
  }
}

export async function refreshResults(req, res) {
  try {
    logger.info('Refreshing results...')

    // For now, just return mock data
    // In production, this would:
    // 1. Call scraper to get new listings
    // 2. Call analyzer to match and score

    const mockResults = {
      properties: [
        {
          id: 1,
          address: 'רחוב דיזנגוף 100',
          city: 'תל אביב',
          price: 450000,
          score: 87,
          type: 'apartment'
        }
      ],
      lastUpdate: new Date().toISOString()
    }

    writeJSON(RESULTS_FILE, mockResults)
    logger.success('Results refreshed')
    res.json({ success: true, message: 'Results refreshed successfully' })
  } catch (error) {
    logger.error('Error refreshing results', error.message)
    res.status(500).json({ error: 'Failed to refresh results' })
  }
}

export async function getParameters(req, res) {
  try {
    const parameters = readJSON(PARAMETERS_FILE, { searchCriteria: [] })
    res.json(parameters)
  } catch (error) {
    logger.error('Error getting parameters', error.message)
    res.status(500).json({ error: 'Failed to get parameters' })
  }
}

export async function saveParameters(req, res) {
  try {
    const { searchCriteria } = req.body

    if (!searchCriteria || !Array.isArray(searchCriteria)) {
      return res.status(400).json({ error: 'Invalid parameters format' })
    }

    const parameters = { searchCriteria, lastSaved: new Date().toISOString() }
    writeJSON(PARAMETERS_FILE, parameters)

    logger.success(`Saved ${searchCriteria.length} search criteria`)
    res.json({ success: true, message: 'Parameters saved' })
  } catch (error) {
    logger.error('Error saving parameters', error.message)
    res.status(500).json({ error: 'Failed to save parameters' })
  }
}

export async function exportJSON(req, res) {
  try {
    const { properties } = req.body

    if (!properties) {
      return res.status(400).json({ error: 'No properties provided' })
    }

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', 'attachment; filename="properties.json"')
    res.send(JSON.stringify(properties, null, 2))

    logger.info(`Exported ${properties.length} properties as JSON`)
  } catch (error) {
    logger.error('Error exporting JSON', error.message)
    res.status(500).json({ error: 'Failed to export' })
  }
}

export async function exportPDF(req, res) {
  try {
    const { properties } = req.body

    if (!properties || !Array.isArray(properties)) {
      return res.status(400).json({ error: 'Invalid properties data' })
    }

    const pdfBuffer = await generatePropertyPDF(properties)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename="properties.pdf"')
    res.send(pdfBuffer)

    logger.info(`Exported ${properties.length} properties as PDF`)
  } catch (error) {
    logger.error('Error exporting PDF', error.message)
    res.status(500).json({ error: 'Failed to export PDF' })
  }
}

export async function exportExcel(req, res) {
  try {
    const { properties } = req.body

    if (!properties || !Array.isArray(properties)) {
      return res.status(400).json({ error: 'Invalid properties data' })
    }

    const excelBuffer = generatePropertyExcel(properties)

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename="properties.xlsx"')
    res.send(excelBuffer)

    logger.info(`Exported ${properties.length} properties as Excel`)
  } catch (error) {
    logger.error('Error exporting Excel', error.message)
    res.status(500).json({ error: 'Failed to export Excel' })
  }
}

export async function shareEmail(req, res) {
  try {
    const { email, properties } = req.body

    if (!email || !properties || !Array.isArray(properties)) {
      return res.status(400).json({ error: 'Missing or invalid email or properties' })
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    await sendPropertyEmail(email, properties)
    logger.info(`Sent properties email to ${email}`)
    res.json({ success: true, message: `Email sent to ${email}` })
  } catch (error) {
    logger.error('Error sending email', error.message)
    res.status(500).json({ error: 'Failed to send email' })
  }
}

export async function shareWhatsApp(req, res) {
  try {
    const { phone, properties } = req.body

    if (!phone || !properties || !Array.isArray(properties)) {
      return res.status(400).json({ error: 'Missing or invalid phone or properties' })
    }

    // Create WhatsApp message with property summary
    const propertyCount = properties.length
    const totalPrice = properties.reduce((sum, p) => sum + (p.price || 0), 0)

    const message = `
מצאתי ${propertyCount} נכסים לפיכם:
סה"כ מחיר משוער: ₪${totalPrice.toLocaleString('he-IL')}

עיינו במערכת PropertyScout AI לפרטים מלאים!
    `.trim()

    // Encode for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`

    logger.info(`Created WhatsApp share link for ${phone}`)
    res.json({
      success: true,
      message: 'WhatsApp link created',
      url: whatsappUrl,
      directShare: `https://wa.me/${phone}`
    })
  } catch (error) {
    logger.error('Error creating WhatsApp link', error.message)
    res.status(500).json({ error: 'Failed to create WhatsApp link' })
  }
}
