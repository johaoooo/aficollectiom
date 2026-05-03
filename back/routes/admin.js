const express = require('express')
const router = express.Router()
const { authMiddleware, adminMiddleware } = require('../middlewares/auth')
const {
  getStats,
  getProducts, createProduct, updateProduct, deleteProduct,
  getTrainings, createTraining, updateTraining, deleteTraining,
  getEvents, createEvent, updateEvent, deleteEvent,
  getUsers, updateUserRole, deleteUser,
  getMessages, markMessageAsRead, deleteMessage,
  getOrders, updateOrderStatus
} = require('../controllers/adminController')

router.use(authMiddleware, adminMiddleware)

router.get('/stats', getStats)

router.get('/products', getProducts)
router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

router.get('/trainings', getTrainings)
router.post('/trainings', createTraining)
router.put('/trainings/:id', updateTraining)
router.delete('/trainings/:id', deleteTraining)

router.get('/events', getEvents)
router.post('/events', createEvent)
router.put('/events/:id', updateEvent)
router.delete('/events/:id', deleteEvent)

router.get('/users', getUsers)
router.put('/users/:id/role', updateUserRole)
router.delete('/users/:id', deleteUser)

router.get('/messages', getMessages)
router.put('/messages/:id/read', markMessageAsRead)
router.delete('/messages/:id', deleteMessage)

router.get('/orders', getOrders)
router.put('/orders/:id', updateOrderStatus)

module.exports = router
