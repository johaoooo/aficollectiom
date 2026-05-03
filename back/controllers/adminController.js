const prisma = require('../config/database')

const getStats = async (req, res) => {
  const [users, products, trainings, events, messages, orders] = await Promise.all([
    prisma.user.count(), prisma.product.count(), prisma.training.count(),
    prisma.event.count(), prisma.message.count(), prisma.order.count()
  ])
  res.json({ users, products, trainings, events, messages, orders })
}

const getProducts = async (req, res) => {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(products)
}
const createProduct = async (req, res) => {
  const { name, description, price, category, brand, image, stock } = req.body
  const product = await prisma.product.create({ data: { name, description, price: parseInt(price), category, brand, image, stock: parseInt(stock) } })
  res.json(product)
}
const updateProduct = async (req, res) => {
  const { id } = req.params
  const product = await prisma.product.update({ where: { id: parseInt(id) }, data: req.body })
  res.json(product)
}
const deleteProduct = async (req, res) => {
  const { id } = req.params
  await prisma.product.delete({ where: { id: parseInt(id) } })
  res.json({ success: true })
}

const getTrainings = async (req, res) => {
  const trainings = await prisma.training.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(trainings)
}
const createTraining = async (req, res) => {
  const { title, description, duration, price, modules, students, image, color } = req.body
  const training = await prisma.training.create({ data: { title, description, duration, price, modules, students: parseInt(students), image, color } })
  res.json(training)
}
const updateTraining = async (req, res) => {
  const { id } = req.params
  const training = await prisma.training.update({ where: { id: parseInt(id) }, data: req.body })
  res.json(training)
}
const deleteTraining = async (req, res) => {
  const { id } = req.params
  await prisma.training.delete({ where: { id: parseInt(id) } })
  res.json({ success: true })
}

const getEvents = async (req, res) => {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } })
  res.json(events)
}
const createEvent = async (req, res) => {
  const { title, description, date, time, location, places, status, image, accent } = req.body
  const event = await prisma.event.create({ data: { title, description, date, time, location, places: parseInt(places), status, image, accent } })
  res.json(event)
}
const updateEvent = async (req, res) => {
  const { id } = req.params
  const event = await prisma.event.update({ where: { id: parseInt(id) }, data: req.body })
  res.json(event)
}
const deleteEvent = async (req, res) => {
  const { id } = req.params
  await prisma.event.delete({ where: { id: parseInt(id) } })
  res.json({ success: true })
}

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  })
  res.json(users)
}
const updateUserRole = async (req, res) => {
  const { id } = req.params
  const { role } = req.body
  const user = await prisma.user.update({ where: { id: parseInt(id) }, data: { role } })
  res.json(user)
}
const deleteUser = async (req, res) => {
  const { id } = req.params
  await prisma.user.delete({ where: { id: parseInt(id) } })
  res.json({ success: true })
}

const getMessages = async (req, res) => {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(messages)
}
const markMessageAsRead = async (req, res) => {
  const { id } = req.params
  const message = await prisma.message.update({ where: { id: parseInt(id) }, data: { read: true } })
  res.json(message)
}
const deleteMessage = async (req, res) => {
  const { id } = req.params
  await prisma.message.delete({ where: { id: parseInt(id) } })
  res.json({ success: true })
}

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: { include: { product: { select: { id: true, name: true, image: true } } } }
      },
      orderBy: { id: 'desc' }
    })
    res.json(orders)
  } catch (error) {
    console.error('Erreur getOrders:', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes' })
  }
}
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const order = await prisma.order.update({ where: { id: parseInt(id) }, data: { status } })
    res.json(order)
  } catch (error) {
    console.error('Erreur updateOrderStatus:', error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour' })
  }
}

module.exports = {
  getStats,
  getProducts, createProduct, updateProduct, deleteProduct,
  getTrainings, createTraining, updateTraining, deleteTraining,
  getEvents, createEvent, updateEvent, deleteEvent,
  getUsers, updateUserRole, deleteUser,
  getMessages, markMessageAsRead, deleteMessage,
  getOrders, updateOrderStatus
}
