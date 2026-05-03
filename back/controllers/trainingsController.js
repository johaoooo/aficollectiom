const prisma = require('../config/database')

const getTrainings = async (req, res) => {
  const trainings = await prisma.training.findMany()
  res.json(trainings)
}

const getTrainingById = async (req, res) => {
  const training = await prisma.training.findUnique({
    where: { id: parseInt(req.params.id) }
  })
  
  if (!training) {
    return res.status(404).json({ error: 'Formation non trouvée' })
  }
  
  res.json(training)
}

module.exports = { getTrainings, getTrainingById }
