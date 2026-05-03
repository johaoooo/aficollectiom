const express = require('express')
const router = express.Router()
const { sendContact, getMessages } = require('../controllers/contactController')
const { authMiddleware, adminMiddleware } = require('../middlewares/auth')

router.post('/', sendContact)
router.get('/', authMiddleware, adminMiddleware, getMessages)

module.exports = router
