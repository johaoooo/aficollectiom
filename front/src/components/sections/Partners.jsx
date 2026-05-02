import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Handshake, Buildings, Users, Star } from '@phosphor-icons/react'

const partners = [
  { name: 'Centre de Formation Dorcas', description: 'Partenaire formation depuis 2015', icon: Users, color: '#008753' },
  { name: 'GRAAD GLOBAL', description: 'Ambassadrice depuis 2025', icon: Star, color: '#FCD116' },
  { name: 'Ministère du Tourisme Bénin', description: 'Soutien à l\'artisanat local', icon: Buildings, color: '#E8112D' },
  { name: 'AFRICAN ARTISANAT', description: 'Réseau panafricain', icon: Handshake, color: '#008753' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } }
}

export default function Partners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête animé */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008753]/10 dark:bg-[#008753]/20 mb-4"
          >
            <Handshake size={16} weight="duotone" className="text-[#008753]" />
            <span className="text-xs font-semibold tracking-wider text-[#008753] uppercase">Nos partenaires</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white"
          >
            Ils nous font confiance
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-500 text-sm mt-3 max-w-md mx-auto"
          >
            Des partenaires engagés pour promouvoir l'artisanat béninois
          </motion.p>
        </motion.div>

        {/* Grille des partenaires avec animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {partners.map((partner, index) => {
            const Icon = partner.icon
            return (
              <motion.div
                key={partner.name}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${partner.color}15` }}
                  >
                    <Icon size={32} weight="duotone" style={{ color: partner.color }} />
                  </motion.div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Ligne de confiance animée */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-2 text-xs text-gray-400">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></span>
            <span className="animate-pulse">✦</span>
            <span>Et plus de 10 autres partenaires à travers le monde</span>
            <span className="animate-pulse">✦</span>
            <span className="w-10 h-px bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
