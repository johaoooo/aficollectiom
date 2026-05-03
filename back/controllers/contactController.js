const prisma = require('../config/database')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const sendContact = async (req, res) => {
  const { name, email, phone, subject, message, subBrand } = req.body
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Nom, email et message sont obligatoires' })
  }
  
  const contact = await prisma.message.create({
    data: { name, email, phone, subject, message, subBrand }
  })
  
  try {
    await transporter.sendMail({
      from: `"AFI Collection" <${process.env.EMAIL_USER}>`,
      to: 'afiavitossa@gmail.com',
      subject: `[AFI Collection] Nouveau message de ${name}`,
      html: `<h2>Nouveau message</h2><p><strong>Nom:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}${subBrand ? `<p><strong>Collection:</strong> ${subBrand}</p>` : ''}<p><strong>Message:</strong></p><p>${message}</p>`
    })
  } catch (emailError) {
    console.error('Erreur envoi email:', emailError)
  }
  
  res.json({ success: true, message: 'Message envoyé avec succès' })
}

const getMessages = async (req, res) => {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  })
  res.json(messages)
}

module.exports = { sendContact, getMessages }
