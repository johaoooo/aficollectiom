import { motion } from 'framer-motion';
import { Hand, Leaf, Users, Sparkle, Heart, Star } from '@phosphor-icons/react';

const reasons = [
  { id: 1, title: '100% Fait main', description: 'Chaque pièce est tissée, teinte et confectionnée à la main par des artisanes béninoises passionnées.', icon: Hand, color: '#008753' },
  { id: 2, title: 'Teinture naturelle', description: 'Des pigments 100% naturels pour des couleurs vibrantes et respectueuses de l\'environnement.', icon: Leaf, color: '#FCD116' },
  { id: 3, title: 'Savoir-faire unique', description: 'Plus de 35 ans d\'expertise transmise de génération en génération avec amour et précision.', icon: Sparkle, color: '#E8112D' },
  { id: 4, title: 'Engagement social', description: 'Formation et autonomisation de plus de 500 femmes artisanes à travers nos programmes.', icon: Users, color: '#008753' }
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête avec icône */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E8112D]/10 dark:bg-[#E8112D]/20 mb-4 mx-auto">
            <Heart size={24} weight="duotone" className="text-[#E8112D]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white mb-3">
            Pourquoi nous choisir
          </h2>
          <div className="flex justify-center items-center gap-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#008753]"></div>
            <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Nos valeurs</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#E8112D]"></div>
          </div>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">Des valeurs fortes qui font la différence</p>
        </motion.div>

        {/* Grille */}
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
                className="group text-center"
              >
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 shadow-md" style={{ backgroundColor: `${reason.color}15`, color: reason.color }}>
                  <Icon size={28} weight="duotone" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{reason.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }} className="text-center mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <Star size={12} className="text-[#FCD116]" weight="fill" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Fièrement fabriqué au Bénin</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
