import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Bag, Swatches, Sneaker, TShirt, Scissors, Sparkle,
  ArrowRight, GridFour, MagnifyingGlass
} from '@phosphor-icons/react'
import { subBrands } from '../data/products'
import MiniHero from '../components/ui/MiniHero'

const brandIcons = {
  'afisac': Bag,
  'afi-pagne': Swatches,
  'afi-chaussure': Sneaker,
  'afi-vetement': TShirt,
  'afi-tissu': Scissors,
  'afi-mode': Sparkle,
}

const collectionImages = {
  'afisac': '/afi.jpeg',
  'afi-pagne': '/afi2.jpeg',
  'afi-chaussure': '/afi7.jpeg',
  'afi-vetement': '/afi.jpeg',
  'afi-tissu': '/afi2.jpeg',
  'afi-mode': '/afi7.jpeg'
}

export default function CatalogueIndex() {
  const [search, setSearch] = useState('')

  const collectionsFiltrees = subBrands.filter(brand =>
    brand.name.toLowerCase().includes(search.toLowerCase()) ||
    brand.tagline.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen pt-2 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full mx-auto rounded-3xl overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl p-6 md:p-8">
          
          <MiniHero
            image="/afi.jpeg"
            icon={GridFour}
            badge="Collections"
            title="Nos"
            highlight="Collections"
            subtitle="Six univers artisanaux pour célébrer l'excellence du savoir-faire béninois"
            searchPlaceholder="Rechercher une collection..."
            onSearch={setSearch}
          />

          {search && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 text-center">
              {collectionsFiltrees.length} résultat{collectionsFiltrees.length !== 1 ? 's' : ''} pour "<span className="text-[#008753] font-medium">{search}</span>"
            </p>
          )}

          {collectionsFiltrees.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <GridFour size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Aucune collection trouvée.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collectionsFiltrees.map((brand, index) => {
                const Icon = brandIcons[brand.id]
                return (
                  <motion.div
                    key={brand.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link to={`/catalogue/${brand.id}`} className="block h-full">
                      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={collectionImages[brand.id]} 
                            alt={brand.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                        <div className="relative p-6">
                          <div className="absolute -top-6 left-6">
                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center" style={{ color: brand.color }}>
                              <Icon size={24} weight="duotone" />
                            </div>
                          </div>
                          <div className="mt-4">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">{brand.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{brand.tagline}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-400">{brand.products.length} produits</span>
                              <div className="inline-flex items-center gap-1 text-sm font-semibold transition-all duration-300 group-hover:gap-2" style={{ color: brand.color }}>
                                Voir la collection
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="h-1 w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: brand.color }} />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
