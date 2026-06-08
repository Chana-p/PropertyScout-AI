import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Results API
export const resultsAPI = {
  getResults: () => api.get('/results'),
  refreshResults: () => api.post('/results/refresh')
}

// Parameters API
export const parametersAPI = {
  getParameters: () => api.get('/parameters'),
  saveParameters: (criteria) => api.post('/parameters', { searchCriteria: criteria })
}

// Export API
export const exportAPI = {
  exportJSON: (properties) => api.post('/export/json', { properties }),
  exportPDF: (properties) => api.post('/export/pdf', { properties }),
  exportExcel: (properties) => api.post('/export/excel', { properties })
}

// Share API
export const shareAPI = {
  shareEmail: (email, properties) => api.post('/share/email', { email, properties }),
  shareWhatsApp: (phone, properties) => api.post('/share/whatsapp', { phone, properties })
}

export default api
