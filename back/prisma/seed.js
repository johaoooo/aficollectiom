const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Démarrage du seed...')

  // 1. Créer un utilisateur admin
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aficollection.com' },
    update: {},
    create: {
      email: 'admin@aficollection.com',
      password: adminPassword,
      name: 'Admin AFI',
      role: 'admin'
    }
  })
  console.log('✅ Admin créé:', admin.email)

  // 2. Produits
  const products = [
    { name: 'Sac AFISAC Royal', description: 'Sac en macramé de luxe, pièce unique', price: 35000, category: 'sacs', brand: 'afisac', image: '/afi.jpeg', stock: 10 },
    { name: 'Sac AFISAC Bohème', description: 'Sac bohème en macramé', price: 25000, category: 'sacs', brand: 'afisac', image: '/afi.jpeg', stock: 8 },
    { name: 'Pagne Tissé Main', description: 'Pagne traditionnel teint à la main', price: 25000, category: 'pagnes', brand: 'afi-pagne', image: '/afi2.jpeg', stock: 15 },
    { name: 'Tenue Cérémonie', description: 'Ensemble pagne pour cérémonie', price: 65000, category: 'pagnes', brand: 'afi-pagne', image: '/afi2.jpeg', stock: 5 },
    { name: 'Sandales Artisanales', description: 'Sandales en cuir fait main', price: 20000, category: 'chaussures', brand: 'afi-chaussure', image: '/afi7.jpeg', stock: 8 },
    { name: 'Mocassins Tressés', description: 'Mocassins en cuir tressé', price: 35000, category: 'chaussures', brand: 'afi-chaussure', image: '/afi7.jpeg', stock: 6 },
    { name: 'Robe Pagne Tissé', description: 'Robe élégante en pagne tissé', price: 45000, category: 'vetements', brand: 'afi-vetement', image: '/afi.jpeg', stock: 7 },
    { name: 'Ensemble Homme', description: 'Ensemble boubou traditionnel', price: 55000, category: 'vetements', brand: 'afi-vetement', image: '/afi.jpeg', stock: 4 },
    { name: 'Tissu Faso Dan Fani', description: 'Tissu traditionnel au mètre', price: 15000, category: 'tissus', brand: 'afi-tissu', image: '/afi2.jpeg', stock: 50 },
    { name: 'Tissu Macramé', description: 'Tissu décoratif', price: 20000, category: 'tissus', brand: 'afi-tissu', image: '/afi2.jpeg', stock: 30 },
    { name: 'Bracelet Macramé', description: 'Bracelet tissé main', price: 5000, category: 'accessoires', brand: 'afi-mode', image: '/afi7.jpeg', stock: 25 },
    { name: 'Collier Perles', description: 'Collier en perles artisanales', price: 12000, category: 'accessoires', brand: 'afi-mode', image: '/afi7.jpeg', stock: 15 }
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id || 0 },
      update: {},
      create: product
    })
  }
  console.log(`✅ ${products.length} produits ajoutés`)

  // 3. Formations
  const trainings = [
    {
      title: 'Macramé-Tricotage',
      description: 'Maîtrisez l\'art du macramé pour créer des sacs, vêtements et objets de décoration uniques.',
      duration: '1,5 - 3 mois',
      price: '100 000 - 150 000 FCFA',
      modules: ['Techniques de base du macramé', 'Création de sacs et accessoires', 'Vêtements en macramé', 'Ameublement et décoration'],
      students: 245,
      image: '/afi.jpeg',
      color: '#008753'
    },
    {
      title: 'Teinture de Pagne',
      description: 'Apprenez l\'art ancestral de la teinture de pagne avec des pigments naturels.',
      duration: '1 - 2 mois',
      price: '80 000 - 120 000 FCFA',
      modules: ['Préparation des tissus', 'Teinture naturelle', 'Création de motifs', 'Finition et entretien'],
      students: 189,
      image: '/afi2.jpeg',
      color: '#FCD116'
    },
    {
      title: 'Filière Sésame',
      description: 'Valorisez le sésame à travers des produits alimentaires de qualité.',
      duration: '1 mois',
      price: '50 000 FCFA',
      modules: ['Transformation du sésame', 'Sauce sésame', 'Bouillie et chips', 'Épices et conditionnement'],
      students: 98,
      image: '/afi7.jpeg',
      color: '#E8112D'
    },
    {
      title: 'Filière Soja',
      description: 'Découvrez les multiples possibilités de transformation du soja.',
      duration: '1 mois',
      price: '50 000 FCFA',
      modules: ['Transformation du soja', 'Bouillie et chips soja', 'Sauce soja', 'Épices et conservation'],
      students: 112,
      image: '/afi2.jpeg',
      color: '#008753'
    }
  ]

  for (const training of trainings) {
    await prisma.training.upsert({
      where: { id: training.id || 0 },
      update: {},
      create: training
    })
  }
  console.log(`✅ ${trainings.length} formations ajoutées`)

  // 4. Événements
  const events = [
    {
      title: 'Atelier Macramé — Initiation',
      description: 'Apprenez les bases du macramé avec nos artisanes expertes.',
      date: '15 Juin 2026',
      time: '10h00 – 13h00',
      location: 'Zoundja, Abomey-Calavi',
      places: 12,
      status: 'à venir',
      image: '/afi.jpeg',
      accent: '#008753'
    },
    {
      title: 'Exposition — Teintures du Bénin',
      description: 'Une exposition unique mettant en lumière les techniques de teinture artisanale.',
      date: '20 Mai 2026',
      time: '09h00 – 18h00',
      location: 'Centre Culturel de Cotonou',
      places: 0,
      status: 'complet',
      image: '/afi2.jpeg',
      accent: '#E8112D'
    },
    {
      title: 'Formation — Entrepreneuriat Artisanal',
      description: 'Formation intensive pour lancer votre activité artisanale.',
      date: '10 Juillet 2026',
      time: '08h00 – 17h00',
      location: 'Siège AFI Collection, Bénin',
      places: 8,
      status: 'à venir',
      image: '/afi7.jpeg',
      accent: '#008753'
    },
    {
      title: 'Salon de l\'Artisanat Africain',
      description: 'AFI Collection était présente au grand salon panafricain de l\'artisanat.',
      date: '5 Mars 2026',
      time: '10h00 – 20h00',
      location: 'Palais des Congrès, Lomé',
      places: 0,
      status: 'passé',
      image: '/afi.jpeg',
      accent: '#6B7280'
    },
    {
      title: 'Atelier Teinture Naturelle',
      description: 'Découvrez les pigments naturels utilisés par nos artisanes.',
      date: '28 Avril 2026',
      time: '14h00 – 17h00',
      location: 'Zoundja, Abomey-Calavi',
      places: 0,
      status: 'récent',
      image: '/afi2.jpeg',
      accent: '#FCD116'
    },
    {
      title: 'Journée Portes Ouvertes AFI',
      description: 'Visitez nos ateliers et découvrez nos nouvelles collections.',
      date: '2 Mai 2026',
      time: '09h00 – 16h00',
      location: 'Siège AFI Collection, Bénin',
      places: 0,
      status: 'récent',
      image: '/afi7.jpeg',
      accent: '#FCD116'
    }
  ]

  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id || 0 },
      update: {},
      create: event
    })
  }
  console.log(`✅ ${events.length} événements ajoutés`)

  console.log('🎉 Seed terminé avec succès !')
  console.log('👤 Admin: admin@aficollection.com / admin123')
}

main()
  .catch(e => {
    console.error('❌ Erreur lors du seed:', e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
