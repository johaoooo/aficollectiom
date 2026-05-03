const prisma = require('../config/database')

const getEvents = async (req, res) => {
  const { status, search } = req.query
  
  const where = {}
  if (status) where.status = status
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { location: { contains: search, mode: 'insensitive' } }
    ]
  }
  
  const events = await prisma.event.findMany({ where })
  res.json(events)
}

const getEventById = async (req, res) => {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(req.params.id) }
  })
  
  if (!event) {
    return res.status(404).json({ error: 'Événement non trouvé' })
  }
  
  res.json(event)
}

module.exports = { getEvents, getEventById }
