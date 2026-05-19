import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LOGS_DIR = path.join(__dirname, '../../logs')

// Create logs directory if it doesn't exist
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true })
}

const logger = {
  info: (message, data = '') => {
    const timestamp = new Date().toISOString()
    const log = `[${timestamp}] INFO: ${message} ${data}`
    console.log(`ℹ️ ${log}`)
    logToFile(log)
  },

  error: (message, error = '') => {
    const timestamp = new Date().toISOString()
    const log = `[${timestamp}] ERROR: ${message} ${error}`
    console.error(`❌ ${log}`)
    logToFile(log)
  },

  warn: (message, data = '') => {
    const timestamp = new Date().toISOString()
    const log = `[${timestamp}] WARN: ${message} ${data}`
    console.warn(`⚠️ ${log}`)
    logToFile(log)
  },

  success: (message, data = '') => {
    const timestamp = new Date().toISOString()
    const log = `[${timestamp}] SUCCESS: ${message} ${data}`
    console.log(`✅ ${log}`)
    logToFile(log)
  }
}

function logToFile(message) {
  const logFile = path.join(LOGS_DIR, `app-${new Date().toISOString().split('T')[0]}.log`)
  fs.appendFileSync(logFile, message + '\n')
}

export default logger
