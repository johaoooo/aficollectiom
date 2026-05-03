const prisma = require('../config/database')

const getProducts = async (req, res) => {
  const { category, brand, minPrice, maxPrice, search } = req.query
  
  const where = {}
  if (category) where.category = category
  if (brand) where.brand = brand
  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) where.price.gte = parseInt(minPrice)
    if (maxPrice) where.price.lte = parseInt(maxPrice)
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ]
  }
  
  const products = await prisma.product.findMany({ where })
  res.json(products)
}

const getProductById = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(req.params.id) }
  })
  
  if (!product) {
    return res.status(404).json({ error: 'Produit non trouvé' })
  }
  
  res.json(product)
}

module.exports = { getProducts, getProductById }
