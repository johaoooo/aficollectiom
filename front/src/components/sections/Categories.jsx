import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Needle, Swatches, Leaf, Flower, 
  CaretDown, CaretUp, ArrowRight, GridFour
} from '@phosphor-icons/react';

const categories = [
  {
    id: 'macrame',
    name: 'Macramé & Tricotage',
    icon: Needle,
    color: '#008753',
    href: '/formations/macrame',
    description: 'Sacs, vêtements, ameublement et formation',
    subItems: [
      { name: 'Sacs Macramé', href: '/catalogue/afisac' },
      { name: 'Vêtements Macramé', href: '/catalogue/afi-vetement' },
      { name: 'Ameublement & Décoration', href: '/catalogue/ameublement' },
      { name: 'Formation Macramé', href: '/formations/macrame' }
    ]
  },
  {
    id: 'pagne',
    name: 'Teinture de Pagne',
    icon: Swatches,
    color: '#FCD116',
    href: '/catalogue/afi-page',
    description: 'Pagnes, tenues, revêtements et décoration',
    subItems: [
      { name: 'Pagnes bruts', href: '/catalogue/afi-page' },
      { name: 'Tenues traditionnelles', href: '/catalogue/afi-vetement' },
      { name: 'Revêtements & Couvertures', href: '/catalogue/revetements' },
      { name: 'Rideaux & Décoration', href: '/catalogue/deco' }
    ]
  },
  {
    id: 'sesame',
    name: 'Filière Sésame',
    icon: Leaf,
    color: '#E8112D',
    href: '/formations/sesame',
    description: 'Produits dérivés du sésame',
    subItems: [
      { name: 'Sauce sésame', href: '/produits/sauce-sesame' },
      { name: 'Bouillie sésame', href: '/produits/bouillie-sesame' },
      { name: 'Chips sésame', href: '/produits/chips-sesame' },
      { name: 'Épices sésame', href: '/produits/epices-sesame' }
    ]
  },
  {
    id: 'soja',
    name: 'Filière Soja',
    icon: Flower,
    color: '#008753',
    href: '/formations/soja',
    description: 'Produits dérivés du soja',
    subItems: [
      { name: 'Bouillie soja', href: '/produits/bouillie-soja' },
      { name: 'Chips soja', href: '/produits/chips-soja' },
      { name: 'Sauce soja', href: '/produits/sauce-soja' },
      { name: 'Épices soja', href: '/produits/epices-soja' }
    ]
  }
];

export default function Categories() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête avec icône */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#008753]/10 dark:bg-[#008753]/20 mb-4 mx-auto">
            <GridFour size={24} weight="duotone" className="text-[#008753] dark:text-[#2ECC85]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-3">
            Nos domaines d'excellence
          </h2>
          <div className="flex justify-center items-center gap-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#008753]"></div>
            <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Savoir-faire</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#E8112D]"></div>
          </div>
        </motion.div>

        {/* Grille des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isExpanded = expandedId === category.id;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => toggleExpand(category.id)}
                    className="w-full text-left p-6 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${category.color}15`, color: category.color }}
                      >
                        <Icon size={28} weight="duotone" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h3>
                          <div className="transition-transform duration-300" style={{ color: category.color }}>
                            {isExpanded ? <CaretUp size={20} /> : <CaretDown size={20} />}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{category.description}</p>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-700">
                          <div className="grid grid-cols-2 gap-3">
                            {category.subItems.map((item, idx) => (
                              <Link key={idx} to={item.href} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#008753] dark:hover:text-[#2ECC85] transition-colors duration-200 group/link">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: category.color }} />
                                <span className="group-hover/link:translate-x-1 transition-transform">{item.name}</span>
                              </Link>
                            ))}
                          </div>
                          <Link to={category.href} className="inline-flex items-center gap-2 mt-4 text-xs font-medium transition-all duration-200 group/btn" style={{ color: category.color }}>
                            Voir tout <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl transition-all duration-300" style={{ backgroundColor: category.color, opacity: isExpanded ? 1 : 0 }} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link to="/formations" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#008753] transition-colors group">
            Découvrir toutes nos formations
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
