import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { subBrands } from '../data/products'
import { 
  ShoppingCart, ArrowLeft, WhatsappLogo, 
  Funnel, X, Star, Package, GridFour, List,
  CaretDown, CaretUp, MagnifyingGlass
} from '@phosphor-icons/react'
import MiniHero from '../components/ui/MiniHero'

export default function Catalogue() {
  const { id } = useParams()
  const brand = subBrands.find(b => b.id === id) || subBrands[0]
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [filteredProducts, setFilteredProducts] = useState(brand.products)
  const [search, setSearch] = useState('')

  const collectionImages = {
    'afisac': '/afi.jpeg',
    'afi-pagne': '/afi2.jpeg',
    'afi-chaussure': '/afi7.jpeg',
    'afi-vetement': '/afi.jpeg',
    'afi-tissu': '/afi2.jpeg',
    'afi-mode': '/afi7.jpeg'
  }

  useEffect(() => {
    let products = [...brand.products]
    products = products.filter(p => 
      p.price >= priceRange[0] && 
      p.price <= priceRange[1] &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
       p.description.toLowerCase().includes(search.toLowerCase()))
    )
    if (sortBy === 'price-asc') {
      products.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      products.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name-asc') {
      products.sort((a, b) => a.name.localeCompare(b.name))
    }
    setFilteredProducts(products)
  }, [brand.products, sortBy, priceRange, search])

  const minPrice = Math.min(...brand.products.map(p => p.price))
  const maxPrice = Math.max(...brand.products.map(p => p.price))

  return (
    <main className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full mx-auto rounded-3xl overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl p-6 md:p-8">
          
          <MiniHero
            image={collectionImages[brand.id]}
            icon={GridFour}
            badge="Collection exclusive"
            title={brand.name}
            highlight=""
            subtitle={brand.tagline}
            searchPlaceholder="Rechercher un produit..."
            onSearch={setSearch}
          />

          {search && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 text-center">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''} pour "<span className="text-[#008753] font-medium">{search}</span>"
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#008753] transition-colors"
              >
                <Funnel size={16} />
                Filtres
                {showFilters ? <CaretUp size={14} /> : <CaretDown size={14} />}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">{filteredProducts.length} produits</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:border-[#008753] transition-colors"
              >
                <option value="default">Trier par défaut</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name-asc">Nom A-Z</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Filtres</h3>
                    <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Prix (FCFA)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                          placeholder="Min"
                        />
                        <span className="text-gray-400">—</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPriceRange([minPrice, maxPrice])}
                    className="mt-4 text-sm text-[#008753] hover:underline"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Package size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Aucun produit trouvé.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br" style={{ background: `linear-gradient(135deg, ${brand.color}20, ${brand.color}05)` }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity">
                      <span className="text-7xl font-display font-black" style={{ color: brand.color }}>{brand.name.slice(0,2)}</span>
                    </div>
                    {product.id % 3 === 0 && (
                      <div className="absolute top-3 left-3 z-10">
                        <div className="px-2 py-0.5 rounded-full bg-[#008753] text-white text-[10px] font-bold">Nouveau</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">{product.name}</h3>
                      <div className="flex items-center gap-0.5">
                        <Star size={12} weight="fill" className="text-[#FCD116]" />
                        <span className="text-xs text-gray-500">5.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="font-black text-xl" style={{ color: brand.color }}>
                          {product.price.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                      <a
                        href={`https://wa.me/2290196062287?text=Bonjour, je suis intéressé(e) par ${product.name} (${brand.name})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:scale-105"
                        style={{ backgroundColor: brand.color }}
                      >
                        <WhatsappLogo size={14} weight="fill" />
                        Commander
                      </a>
                    </div>
                  </div>
                  <div className="h-1 w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: brand.color }} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
