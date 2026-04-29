import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Needle, Swatches, Leaf, Flower,
  Clock, Users, Certificate, ArrowRight,
  WhatsappLogo, Calendar, CheckCircle, Star,
  GraduationCap
} from '@phosphor-icons/react'

const formations = [
  {
    id: 'macrame',
    title: 'Macramé-Tricotage',
    icon: Needle,
    color: '#008753',
    duration: '1,5 - 3 mois',
    price: '100 000 - 150 000 FCFA',
    students: 245,
    modules: [
      'Techniques de base du macramé',
      'Création de sacs et accessoires',
      'Vêtements en macramé',
      'Ameublement et décoration'
    ],
    description: 'Maîtrisez l\'art du macramé pour créer des sacs, vêtements et objets de décoration uniques.',
    image: '/afi.jpeg'
  },
  {
    id: 'teinture',
    title: 'Teinture de Pagne',
    icon: Swatches,
    color: '#FCD116',
    duration: '1 - 2 mois',
    price: '80 000 - 120 000 FCFA',
    students: 189,
    modules: [
      'Préparation des tissus',
      'Teinture naturelle',
      'Création de motifs',
      'Finition et entretien'
    ],
    description: 'Apprenez l\'art ancestral de la teinture de pagne avec des pigments naturels.',
    image: '/afi2.jpeg'
  },
  {
    id: 'sesame',
    title: 'Filière Sésame',
    icon: Leaf,
    color: '#E8112D',
    duration: '1 mois',
    price: '50 000 FCFA',
    students: 98,
    modules: [
      'Transformation du sésame',
      'Sauce sésame',
      'Bouillie et chips',
      'Épices et conditionnement'
    ],
    description: 'Valorisez le sésame à travers des produits alimentaires de qualité.',
    image: '/afi7.jpeg'
  },
  {
    id: 'soja',
    title: 'Filière Soja',
    icon: Flower,
    color: '#008753',
    duration: '1 mois',
    price: '50 000 FCFA',
    students: 112,
    modules: [
      'Transformation du soja',
      'Bouillie et chips soja',
      'Sauce soja',
      'Épices et conservation'
    ],
    description: 'Découvrez les multiples possibilités de transformation du soja.',
    image: '/afi2.jpeg'
  }
]

function FormationCard({ formation, index }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        
        {/* Image d'en-tête */}
        <div className="relative h-48 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${formation.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badge durée */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm">
              <Clock size={12} className="text-white" />
              <span className="text-white text-xs font-medium">{formation.duration}</span>
            </div>
          </div>
        </div>
        
        {/* Contenu */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${formation.color}15` }}
            >
              <formation.icon size={20} weight="duotone" style={{ color: formation.color }} />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white">
                {formation.title}
              </h3>
            </div>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">
            {formation.description}
          </p>
          
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500">{formation.students} apprenants</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Certificate size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500">Certification</span>
            </div>
          </div>
          
          <div className="mb-4">
            <span className="text-2xl font-black" style={{ color: formation.color }}>
              {formation.price}
            </span>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#008753] transition-colors mb-3"
          >
            <span>Modules de formation</span>
            <ArrowRight size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 space-y-1.5"
            >
              {formation.modules.map((module, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <CheckCircle size={10} weight="fill" style={{ color: formation.color }} />
                  <span>{module}</span>
                </div>
              ))}
            </motion.div>
          )}
          
          <div className="flex flex-col gap-2 mt-4">
            <a
              href={`https://wa.me/2290196062287?text=Bonjour, je suis intéressé(e) par la formation ${formation.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: formation.color }}
            >
              <WhatsappLogo size={16} weight="fill" />
              S'inscrire maintenant
            </a>
            <Link
              to={`/formations/${formation.id}`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-[#008753] hover:text-[#008753] transition-all"
            >
              En savoir plus
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        
        <div className="h-1 w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: formation.color }} />
      </div>
    </motion.div>
  )
}

export default function Formations() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Conteneur avec bords arrondis comme la page d'accueil */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carte principale avec bords arrondis */}
        <div className="relative w-full mx-auto rounded-3xl overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl p-6 md:p-8">
          
          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#008753]/10 dark:bg-[#008753]/20 mb-4">
              <GraduationCap size={24} weight="duotone" className="text-[#008753]" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
              Nos formations
            </h1>
            <div className="flex justify-center items-center gap-2">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#008753]"></div>
              <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Centre Dorcas</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#E8112D]"></div>
            </div>
            <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">
              Des formations certifiantes pour acquérir un savoir-faire unique et valorisant
            </p>
          </motion.div>

          {/* Grille des formations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formations.map((formation, index) => (
              <FormationCard key={formation.id} formation={formation} index={index} />
            ))}
          </div>

          {/* Section avantages avec bords arrondis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-12 p-6 md:p-8 bg-gradient-to-br from-[#008753]/5 to-[#FCD116]/5 dark:from-[#008753]/10 dark:to-[#FCD116]/10 rounded-2xl"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Pourquoi nous former ?</h3>
              <p className="text-gray-500 text-sm mt-1">Une formation de qualité reconnue internationalement</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#008753]/10 flex items-center justify-center mx-auto mb-3">
                  <Certificate size={20} className="text-[#008753]" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Certification officielle</h4>
                <p className="text-xs text-gray-500 mt-1">Diplôme reconnu</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#FCD116]/10 flex items-center justify-center mx-auto mb-3">
                  <Users size={20} className="text-[#FCD116]" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Formatrices expérimentées</h4>
                <p className="text-xs text-gray-500 mt-1">35 ans d'expertise</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#E8112D]/10 flex items-center justify-center mx-auto mb-3">
                  <Star size={20} className="text-[#E8112D]" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Pédagogie pratique</h4>
                <p className="text-xs text-gray-500 mt-1">80% de pratique</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#008753]/10 flex items-center justify-center mx-auto mb-3">
                  <WhatsappLogo size={20} className="text-[#008753]" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Accompagnement</h4>
                <p className="text-xs text-gray-500 mt-1">Suivi personnalisé</p>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </main>
  )
}
