import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Bag, Swatches, Sneaker, TShirt, Scissors, Sparkle,
  ArrowRight, Star, ShoppingBag, GridFour
} from '@phosphor-icons/react';

const collections = [
  {
    id: 'afisac', name: 'AFISAC', fullName: 'Sacs Macramé', icon: Bag, color: '#008753', href: '/catalogue/afisac', count: 12,
    description: 'Sacs artisanaux tissés à la main', image: '/afi.jpeg', price: '15 000 - 35 000 FCFA'
  },
  {
    id: 'afi-pagne', name: 'AFI PAGNE', fullName: 'Teinture & Pagnes', icon: Swatches, color: '#FCD116', href: '/catalogue/afi-page', count: 8,
    description: 'Couleurs vibrantes et motifs traditionnels', image: '/afi2.jpeg', price: '10 000 - 65 000 FCFA'
  },
  {
    id: 'afi-chaussure', name: 'AFI CHAUSSURE', fullName: 'Chaussures artisanales', icon: Sneaker, color: '#E8112D', href: '/catalogue/afi-chaussure', count: 6,
    description: 'Sandales et mocassins uniques', image: '/afi7.jpeg', price: '20 000 - 40 000 FCFA'
  },
  {
    id: 'afi-vetement', name: 'AFI VÊTEMENT', fullName: 'Robes & Ensembles', icon: TShirt, color: '#008753', href: '/catalogue/afi-vetement', count: 10,
    description: 'Élégance africaine moderne', image: '/afi.jpeg', price: '15 000 - 80 000 FCFA'
  },
  {
    id: 'afi-tissu', name: 'AFI TISSU', fullName: 'Tissus au mètre', icon: Scissors, color: '#FCD116', href: '/catalogue/afi-tissu', count: 15,
    description: 'Faso Dan Fani, macramé traditionnel', image: '/afi2.jpeg', price: '10 000 - 30 000 FCFA/m'
  },
  {
    id: 'afi-mode', name: 'AFI MODE', fullName: 'Accessoires', icon: Sparkle, color: '#E8112D', href: '/catalogue/afi-mode', count: 20,
    description: 'Bijoux, ceintures et accessoires', image: '/afi7.jpeg', price: '5 000 - 20 000 FCFA'
  }
];

export default function Collections() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête avec icône */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FCD116]/10 dark:bg-[#FCD116]/20 mb-4 mx-auto">
            <GridFour size={24} weight="duotone" className="text-[#FCD116]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-3">
            Nos collections
          </h2>
          <div className="flex justify-center items-center gap-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#FCD116]"></div>
            <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Créations uniques</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#E8112D]"></div>
          </div>
          <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">Six univers artisanaux pour célébrer l'excellence du savoir-faire béninois</p>
        </motion.div>

        {/* Grille des collections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => {
            const Icon = collection.icon;
            const isHovered = hoveredId === collection.id;
            
            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(collection.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link to={collection.href} className="block h-full">
                  <div className={`group relative h-full bg-white dark:bg-gray-800 rounded-2xl transition-all duration-500 overflow-hidden ${isHovered ? 'shadow-2xl shadow-black/15 -translate-y-2' : 'shadow-lg shadow-black/5'}`}>
                    <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img src={collection.image} alt={collection.name} className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 z-10"><div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm"><span className="text-white text-xs font-semibold">{collection.price}</span></div></div>
                      <div className={`absolute top-3 right-3 z-10 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"><ShoppingBag size={14} weight="fill" className="text-white" /></div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${collection.color}15` }}>
                          <Icon size={16} weight="bold" style={{ color: collection.color }} />
                        </div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{collection.fullName}</span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{collection.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{collection.description}</p>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/link" style={{ color: collection.color }}>
                        <span>Découvrir</span>
                        <ArrowRight size={14} className="transition-all duration-300 group-hover/link:translate-x-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500" style={{ backgroundColor: collection.color, width: isHovered ? '100%' : '0%' }} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }} className="text-center mt-10">
          <Link to="/catalogue/afisac" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#008753] to-[#006b42] text-white shadow-lg shadow-[#008753]/20 hover:shadow-xl hover:shadow-[#008753]/30 hover:scale-105 transition-all duration-300">
            Explorer toutes nos collections <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
