import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5174',

  // Email
  SMTP: {
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT,
    USER: process.env.SMTP_USER,
    PASS: process.env.SMTP_PASS
  },

  // OAuth
  OAUTH: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET
  },

  // Scraping
  SCRAPER: {
    DELAY: parseInt(process.env.SCRAPER_DELAY || '2000'),
    USER_AGENT: process.env.SCRAPER_USER_AGENT || 'Mozilla/5.0'
  },

  // Paths
  DATA_DIR: path.join(__dirname, '../data'),
  LOGS_DIR: path.join(__dirname, '../logs')
}
