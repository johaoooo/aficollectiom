const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const trainingRoutes = require('./routes/trainings')
const eventRoutes = require('./routes/events')
const contactRoutes = require('./routes/contact')
const adminRoutes = require('./routes/admin')

const app = express()

// Sécurité
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite de 100 requêtes par fenêtre
})
app.use('/api/', limiter)

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/trainings', trainingRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'AFI Collection', version: '2.0' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`✅ AFI Collection API démarrée — port ${PORT}`)
  console.log(`📍 http://localhost:${PORT}`)
  console.log(`🔐 Admin: admin@aficollection.com / admin123`)
})
