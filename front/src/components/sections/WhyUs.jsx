import { motion } from 'framer-motion';
import { Hand, Leaf, Users, Globe, Sparkle, Heart } from '@phosphor-icons/react';

const reasons = [
  {
    id: 1,
    title: '100% Fait main',
    description: 'Chaque pièce est tissée, teinte et confectionnée à la main par des artisanes béninoises passionnées.',
    icon: Hand,
    color: '#008753'
  },
  {
    id: 2,
    title: 'Teinture naturelle',
    description: 'Des pigments 100% naturels pour des couleurs vibrantes et respectueuses de l\'environnement.',
    icon: Leaf,
    color: '#FCD116'
  },
  {
    id: 3,
    title: 'Savoir-faire unique',
    description: 'Plus de 35 ans d\'expertise transmise de génération en génération avec amour et précision.',
    icon: Sparkle,
    color: '#E8112D'
  },
  {
    id: 4,
    title: 'Engagement social',
    description: 'Formation et autonomisation de plus de 500 femmes artisanes à travers nos programmes.',
    icon: Users,
    color: '#008753'
  }
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Heart size={14} weight="fill" className="text-[#E8112D]" />
            <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Pourquoi nous choisir
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
            L'excellence artisanale
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Des valeurs fortes qui font la différence
          </p>
        </motion.div>

        {/* Grille 4 colonnes ou 2 sur tablette/mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="group text-center">
                  {/* Cercle icône */}
                  <div 
                    className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center
                      transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{ 
                      backgroundColor: `${reason.color}15`,
                      color: reason.color
                    }}
                  >
                    <Icon size={28} weight="duotone" />
                  </div>
                  
                  {/* Titre */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {reason.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Badge supplémentaire */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <Globe size={12} className="text-[#008753]" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Fièrement fabriqué au Bénin
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
