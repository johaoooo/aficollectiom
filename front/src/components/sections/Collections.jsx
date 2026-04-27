import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Bag, Swatches, Sneaker, TShirt, Scissors, Sparkle,
  ArrowRight, Star, ShoppingBag, GridFour
} from '@phosphor-icons/react';

const collections = [
  {
    id: 'afisac',
    name: 'AFISAC',
    fullName: 'Sacs Macramé',
    icon: Bag,
    color: '#008753',
    href: '/catalogue/afisac',
    count: 12,
    description: 'Sacs artisanaux tissés à la main',
    image: '/afi.jpeg',
    price: '15 000 - 35 000 FCFA'
  },
  {
    id: 'afi-pagne',
    name: 'AFI PAGNE',
    fullName: 'Teinture & Pagnes',
    icon: Swatches,
    color: '#FCD116',
    href: '/catalogue/afi-page',
    count: 8,
    description: 'Couleurs vibrantes et motifs traditionnels',
    image: '/afi2.jpeg',
    price: '10 000 - 65 000 FCFA'
  },
  {
    id: 'afi-chaussure',
    name: 'AFI CHAUSSURE',
    fullName: 'Chaussures artisanales',
    icon: Sneaker,
    color: '#E8112D',
    href: '/catalogue/afi-chaussure',
    count: 6,
    description: 'Sandales et mocassins uniques',
    image: '/afi7.jpeg',
    price: '20 000 - 40 000 FCFA'
  },
  {
    id: 'afi-vetement',
    name: 'AFI VÊTEMENT',
    fullName: 'Robes & Ensembles',
    icon: TShirt,
    color: '#008753',
    href: '/catalogue/afi-vetement',
    count: 10,
    description: 'Élégance africaine moderne',
    image: '/afi.jpeg',
    price: '15 000 - 80 000 FCFA'
  },
  {
    id: 'afi-tissu',
    name: 'AFI TISSU',
    fullName: 'Tissus au mètre',
    icon: Scissors,
    color: '#FCD116',
    href: '/catalogue/afi-tissu',
    count: 15,
    description: 'Faso Dan Fani, macramé traditionnel',
    image: '/afi2.jpeg',
    price: '10 000 - 30 000 FCFA/m'
  },
  {
    id: 'afi-mode',
    name: 'AFI MODE',
    fullName: 'Accessoires',
    icon: Sparkle,
    color: '#E8112D',
    href: '/catalogue/afi-mode',
    count: 20,
    description: 'Bijoux, ceintures et accessoires tendance',
    image: '/afi7.jpeg',
    price: '5 000 - 20 000 FCFA'
  }
];

export default function Collections() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section - CENTRÉ AVEC STYLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Badge décoratif */}
          <div className="inline-flex items-center justify-center mb-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#008753]/10 dark:bg-[#008753]/20">
              <GridFour size={16} weight="bold" className="text-[#008753] dark:text-[#2ECC85]" />
              <span className="text-xs font-semibold tracking-wider text-[#008753] dark:text-[#2ECC85] uppercase">
                Collections exclusives
              </span>
            </div>
          </div>
          
          {/* Titre avec dégradé */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black mb-4">
            <span className="bg-gradient-to-r from-[#008753] via-[#FCD116] to-[#E8112D] bg-clip-text text-transparent">
              Nos Collections
            </span>
          </h2>
          
          {/* Ligne décorative */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#008753]"></div>
            <div className="w-2 h-2 rounded-full bg-[#008753]"></div>
            <div className="w-2 h-2 rounded-full bg-[#FCD116]"></div>
            <div className="w-2 h-2 rounded-full bg-[#E8112D]"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#E8112D]"></div>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Six univers artisanaux pour célébrer l'excellence du savoir-faire béninois
          </p>
        </motion.div>

        {/* Grille des collections - 3 colonnes avec images carrées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className={`
                    group relative h-full bg-white dark:bg-gray-800 rounded-2xl 
                    transition-all duration-500 overflow-hidden
                    ${isHovered 
                      ? 'shadow-2xl shadow-black/15 -translate-y-2' 
                      : 'shadow-lg shadow-black/5'
                    }
                  `}>
                    
                    {/* Image avec effet zoom */}
                    <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img 
                        src={collection.image} 
                        alt={collection.name}
                        className={`
                          w-full h-full object-cover transition-all duration-700
                          ${isHovered ? 'scale-110' : 'scale-100'}
                        `}
                      />
                      {/* Overlay gradient sur l'image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Badge prix */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm">
                          <span className="text-white text-xs font-semibold">{collection.price}</span>
                        </div>
                      </div>
                      
                      {/* Icône au survol */}
                      <div className={`
                        absolute top-3 right-3 z-10 transition-all duration-300
                        ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
                      `}>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                          <ShoppingBag size={14} weight="fill" className="text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Contenu */}
                    <div className="p-5">
                      {/* Catégorie avec icône */}
                      <div className="flex items-center gap-2 mb-3">
                        <div 
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${collection.color}15` }}
                        >
                          <Icon size={16} weight="bold" style={{ color: collection.color }} />
                        </div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {collection.fullName}
                        </span>
                      </div>
                      
                      {/* Titre */}
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                        {collection.name}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {collection.description}
                      </p>
                      
                      {/* Lien explorer */}
                      <div 
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/link"
                        style={{ color: collection.color }}
                      >
                        <span>Découvrir</span>
                        <ArrowRight 
                          size={14} 
                          className="transition-all duration-300 group-hover/link:translate-x-1"
                        />
                      </div>
                    </div>
                    
                    {/* Barre de couleur */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500"
                      style={{ 
                        backgroundColor: collection.color,
                        width: isHovered ? '100%' : '0%'
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bouton Voir tout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link 
            to="/catalogue/afisac"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
              text-sm font-semibold
              bg-gradient-to-r from-[#008753] to-[#006b42]
              text-white shadow-lg shadow-[#008753]/20
              hover:shadow-xl hover:shadow-[#008753]/30 hover:scale-105
              transition-all duration-300"
          >
            <span>Explorer toutes nos collections</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
