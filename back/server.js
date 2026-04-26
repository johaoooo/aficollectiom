const express    = require('express')
const cors       = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok', brand: 'AFI Collection' }))

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message, subBrand } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' })
  }
  console.log('Nouveau message AFI Collection:', { name, email, phone, subBrand, message })
  res.json({ success: true, message: 'Message reçu. Nous vous répondrons dans les 24h.' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`AFI Collection API démarrée — port ${PORT}`))
