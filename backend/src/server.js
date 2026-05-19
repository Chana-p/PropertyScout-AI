import express from 'express'
import cors from 'cors'
import config from './config.js'
import logger from './utils/logger.js'
import routes from './api/routes.js'

const app = express()

// Middleware
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api', routes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

// Error handler
app.use((err, req, res, next) => {
  logger.error('Server Error', err.message)
  res.status(500).json({ error: 'Internal Server Error' })
})

// Start server
app.listen(config.PORT, () => {
  logger.success(`🚀 Server running on port ${config.PORT}`)
  logger.info(`Environment: ${config.NODE_ENV}`)
  logger.info(`Frontend URL: ${config.FRONTEND_URL}`)
})

export default app
