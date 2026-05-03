const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../config/database')

const register = async (req, res) => {
  const { email, password, name } = req.body
  
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires' })
  }
  
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return res.status(400).json({ error: 'Cet email est déjà utilisé' })
  }
  
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name, role: 'user' }
  })
  
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
  
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
}

const login = async (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }
  
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
  }
  
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
  }
  
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
  
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
}

const getMe = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  })
  
  if (!user) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' })
  }
  
  res.json(user)
}

module.exports = { register, login, getMe }
