import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Images, X, ArrowRight, Heart, Share, Download,
  Calendar, MapPin, Eye
} from '@phosphor-icons/react'

const categories = ['Tous', 'Sacs', 'Pagnes', 'Chaussures', 'Vêtements', 'Accessoires', 'Événements']

const galleryItems = [
  {
    id: 1,
    title: 'Sac AFISAC Royal',
    category: 'Sacs',
    image: '/afi.jpeg',
    date: '15 mars 2026',
    location: 'Cotonou, Bénin',
    likes: 234,
    views: 1245
  },
  {
    id: 2,
    title: 'Collection Pagnes Tissés Main',
    category: 'Pagnes',
    image: '/afi2.jpeg',
    date: '10 mars 2026',
    location: 'Abomey-Calavi, Bénin',
    likes: 189,
    views: 892
  },
  {
    id: 3,
    title: 'Sandales Artisanales',
    category: 'Chaussures',
    image: '/afi7.jpeg',
    date: '5 mars 2026',
    location: 'Porto-Novo, Bénin',
    likes: 156,
    views: 734
  },
  {
    id: 4,
    title: 'Robe en Pagne Tissé',
    category: 'Vêtements',
    image: '/afi.jpeg',
    date: '28 février 2026',
    location: 'Parakou, Bénin',
    likes: 278,
    views: 1567
  },
  {
    id: 5,
    title: 'Bracelets Macramé',
    category: 'Accessoires',
    image: '/afi2.jpeg',
    date: '20 février 2026',
    location: 'Cotonou, Bénin',
    likes: 145,
    views: 678
  },
  {
    id: 6,
    title: 'Exposition AFI Collection',
    category: 'Événements',
    image: '/afi7.jpeg',
    date: '15 février 2026',
    location: 'Lomé, Togo',
    likes: 423,
    views: 2456
  },
  {
    id: 7,
    title: 'Sac Bohème Tissé Main',
    category: 'Sacs',
    image: '/afi.jpeg',
    date: '10 février 2026',
    location: 'Cotonou, Bénin',
    likes: 198,
    views: 987
  },
  {
    id: 8,
    title: 'Ensemble Cérémonie',
    category: 'Vêtements',
    image: '/afi2.jpeg',
    date: '5 février 2026',
    location: 'Abidjan, Côte d\'Ivoire',
    likes: 312,
    views: 1987
  },
  {
    id: 9,
    title: 'Ceinture Tressée',
    category: 'Accessoires',
    image: '/afi7.jpeg',
    date: '30 janvier 2026',
    location: 'Cotonou, Bénin',
    likes: 98,
    views: 456
  }
]

export default function Galerie() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selectedImage, setSelectedImage] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  const filteredItems = selectedCategory === 'Tous' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <main className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carte principale avec bords arrondis */}
        <div className="relative w-full mx-auto rounded-3xl overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl p-6 md:p-8">
          
          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#008753]/10 dark:bg-[#008753]/20 mb-4">
              <Images size={24} weight="duotone" className="text-[#008753]" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
              Galerie
            </h1>
            <div className="flex justify-center items-center gap-2">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#008753]"></div>
              <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Nos créations</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#E8112D]"></div>
            </div>
            <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">
              Découvrez nos plus belles créations artisanales en images
            </p>
          </motion.div>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === category
                    ? 'bg-[#008753] text-white shadow-lg shadow-[#008753]/20'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-[#008753]/10 hover:text-[#008753]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grille d'images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div 
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Overlay au survol */}
                    <div className={`absolute inset-0 bg-[#008753]/80 flex items-center justify-center transition-all duration-300
                      ${hoveredId === item.id ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="text-center text-white">
                        <Eye size={24} className="mx-auto mb-2" />
                        <span className="text-sm font-medium">Voir le détail</span>
                      </div>
                    </div>
                    
                    {/* Catégorie badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Infos */}
                  <div className="p-4">
                    <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={12} />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-1">
                        <Heart size={14} weight="fill" className="text-[#E8112D]" />
                        <span className="text-xs text-gray-500">{item.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{item.views}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Barre de couleur */}
                  <div className="h-1 w-0 group-hover:w-full transition-all duration-500 bg-[#008753]" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal lightbox */}
          {selectedImage && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X size={18} />
                </button>
                
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title}
                  className="w-full h-96 object-cover"
                />
                
                <div className="p-6">
                  <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
                    {selectedImage.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{selectedImage.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{selectedImage.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart size={14} weight="fill" className="text-[#E8112D]" />
                      <span>{selectedImage.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye size={14} className="text-gray-400" />
                      <span>{selectedImage.views} vues</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#008753] text-white text-sm font-medium hover:bg-[#006b42] transition-all">
                      <Heart size={16} weight="fill" />
                      J'aime
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm font-medium hover:border-[#008753] hover:text-[#008753] transition-all">
                      <Share size={16} />
                      Partager
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm font-medium hover:border-[#008753] hover:text-[#008753] transition-all">
                      <Download size={16} />
                      Télécharger
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
        </div>
      </div>
    </main>
  )
}
