import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Info, Hand, Leaf, Users, Sparkle, Heart,
  Trophy, Calendar, MapPin, Star,
  ArrowRight, CheckCircle
} from '@phosphor-icons/react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
}

const valeurs = [
  { title: 'Authenticité', description: 'Chaque création est unique, tissée ou teinte à la main avec des techniques traditionnelles.', icon: Hand, accent: '#008753' },
  { title: 'Excellence', description: 'Plus de 35 ans d\'expertise au service de la qualité et d\'une précision sans compromis.', icon: Sparkle, accent: '#FCD116' },
  { title: 'Transmission', description: 'Formation et autonomisation de plus de 5000 personnes à travers l\'Afrique de l\'Ouest.', icon: Users, accent: '#E8112D' },
  { title: 'Durabilité', description: 'Utilisation de matériaux naturels et techniques respectueuses de l\'environnement.', icon: Leaf, accent: '#008753' },
]

const distinctions = [
  { title: 'Prix Africain de l\'Artisanat', year: '2026', location: 'Togo', icon: Trophy },
  { title: 'Ambassadrice GRAAD GLOBAL', year: '2025', location: 'Londres, Royaume-Uni', icon: Star },
  { title: 'Prix de l\'Excellence Artisanale', year: '2024', location: 'Bénin', icon: Trophy },
  { title: 'Médaille d\'Or du Savoir-Faire', year: '2023', location: 'Côte d\'Ivoire', icon: Star },
]

const stats = [
  { value: 2015, label: 'Fondation', sub: 'Abomey-Calavi', color: '#008753', suffix: '' },
  { value: 35, label: 'Années', sub: "d'expertise", color: '#FCD116', suffix: '+' },
  { value: 5000, label: 'Personnes', sub: 'formées', color: '#E8112D', suffix: '+' },
  { value: 10, label: 'Pays', sub: 'à travers le monde', color: '#008753', suffix: '+' },
]

function AnimatedCounter({ target, suffix = '', color }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let start = 0, duration = 2000, step = Math.ceil(target / 40)
    const timer = setInterval(() => { start += step; if (start >= target) { setCount(target); clearInterval(timer) } else { setCount(start) } }, duration / 40)
    return () => clearInterval(timer)
  }, [isVisible, target])

  return <span ref={ref} className="font-black" style={{ color }}>{count.toLocaleString('fr-FR')}{suffix}</span>
}

function ValeurCard({ valeur, index }) {
  const [hovered, setHovered] = useState(false)
  const Icon = valeur.icon

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-5 rounded-2xl transition-all duration-300 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/10"
      style={{ boxShadow: hovered ? `0 8px 30px ${valeur.accent}20` : 'none' }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${valeur.accent}15`, color: valeur.accent }}>
        <Icon size={18} weight="duotone" />
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">{valeur.title}</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{valeur.description}</p>
    </motion.div>
  )
}

function DistinctionItem({ item, index }) {
  const Icon = item.icon
  return (
    <motion.div custom={index} variants={fadeUp} initial="hidden" animate="show" className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-white/10">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FCD116]/10"><Icon size={14} weight="fill" className="text-[#FCD116]" /></div>
      <div className="flex-1"><h3 className="font-semibold text-xs text-gray-900 dark:text-white">{item.title}</h3><div className="flex items-center gap-3 text-[10px] text-gray-500"><span className="flex items-center gap-1"><Calendar size={9} />{item.year}</span><span className="flex items-center gap-1"><MapPin size={9} />{item.location}</span></div></div>
      <CheckCircle size={14} weight="fill" className="text-[#008753]" />
    </motion.div>
  )
}

export default function About() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carte principale */}
        <div className="relative w-full mx-auto rounded-2xl overflow-hidden bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none border border-gray-200 dark:border-white/10 p-6 md:p-8">
          
          {/* En-tête */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-10">
            <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-4 bg-[#008753]/10 dark:bg-[#008753]/15">
              <Info size={10} weight="duotone" className="text-[#008753]" />
              <span className="text-[9px] font-semibold tracking-widest uppercase text-[#008753]">Notre histoire</span>
            </motion.div>
            <motion.h1 custom={1} variants={fadeUp} className="text-gray-900 dark:text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 600 }}>
              À propos <span className="bg-gradient-to-r from-[#008753] via-[#FCD116] to-[#E8112D] bg-clip-text text-transparent">d'AFI Collection</span>
            </motion.h1>
            <div className="flex justify-center items-center gap-2 mb-3"><div className="w-12 h-px bg-gradient-to-r from-transparent to-[#008753]"></div><span className="text-[9px] font-semibold tracking-wider text-gray-500 uppercase">L'art béninois, tissé à la main</span><div className="w-12 h-px bg-gradient-to-l from-transparent to-[#E8112D]"></div></div>
            <motion.p custom={2} variants={fadeUp} className="text-xs text-gray-600 dark:text-gray-400 max-w-lg mx-auto">Une maison fondée sur la passion, portée par la tradition, reconnue sur la scène internationale.</motion.p>
          </motion.div>

          {/* Histoire */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-gray-900 dark:text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 600 }}>Née d'une passion, <span className="text-[#008753]">tissée dans la tradition</span></h2>
              <div className="space-y-3 text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                <p>Fondée le <strong className="text-gray-900 dark:text-white">14 septembre 2015</strong> à Zoundja, Abomey-Calavi, par <strong className="text-gray-900 dark:text-white">Mme TOSSA Afiavi Gbèssito Honorine</strong>, artisane de renommée internationale.</p>
                <p>Forte de plus de <strong className="text-gray-900 dark:text-white">35 ans d'expérience</strong>, elle a bâti un écosystème unique alliant création, vente et formation.</p>
                <p>Aujourd'hui, AFI Collection c'est <strong className="text-gray-900 dark:text-white">6 sous-marques</strong>, <strong className="text-gray-900 dark:text-white">5000+ personnes formées</strong>, et des créations présentes dans plus de <strong className="text-gray-900 dark:text-white">10 pays</strong>.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-white/10">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 ring-4 ring-[#008753]/30 shadow-xl"><img src="/log.jpeg" alt="Mme TOSSA Afiavi" className="w-full h-full object-cover" /></div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">Mme TOSSA Afiavi</h3>
                <p className="text-[#008753] font-semibold text-xs mb-3">Fondatrice & PDG</p>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div><div className="font-bold text-lg text-[#008753]">35+</div><div className="text-[9px] text-gray-500">Années</div></div>
                  <div><div className="font-bold text-lg text-[#FCD116]">12</div><div className="text-[9px] text-gray-500">Prix</div></div>
                  <div><div className="font-bold text-lg text-[#E8112D]">5000+</div><div className="text-[9px] text-gray-500">Formés</div></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Valeurs */}
          <div className="mb-12">
            <div className="text-center mb-6"><div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3 bg-[#E8112D]/10 dark:bg-[#E8112D]/15"><Heart size={10} weight="fill" className="text-[#E8112D]" /><span className="text-[9px] font-semibold tracking-widest uppercase text-[#E8112D]">Nos valeurs</span></div><h2 className="text-gray-900 dark:text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 600 }}>Ce qui guide chacun de nos gestes</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{valeurs.map((v, i) => <ValeurCard key={v.title} valeur={v} index={i} />)}</div>
          </div>

          {/* Distinctions */}
          <div className="mb-12">
            <div className="text-center mb-6"><div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3 bg-[#FCD116]/10 dark:bg-[#FCD116]/15"><Trophy size={10} weight="fill" className="text-[#FCD116]" /><span className="text-[9px] font-semibold tracking-widest uppercase text-[#FCD116]">Distinctions</span></div><h2 className="text-gray-900 dark:text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 600 }}>Un savoir-faire reconnu <span className="text-[#FCD116]">sur la scène internationale</span></h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{distinctions.map((item, i) => <DistinctionItem key={item.title} item={item} index={i} />)}</div>
          </div>

          {/* Stats */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="rounded-xl p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            <div className="text-center mb-5"><Trophy size={18} weight="duotone" className="mx-auto mb-1 text-[#008753]" /><p className="text-[9px] font-black tracking-[0.3em] uppercase text-gray-500">AFI Collection en chiffres</p></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (<div key={s.label} className="text-center"><div className="font-black text-2xl" style={{ color: s.color, fontFamily: "'Cormorant Garamond', Georgia, serif" }}><AnimatedCounter target={s.value} suffix={s.suffix} color={s.color} /></div><div className="text-xs font-semibold text-gray-700 dark:text-white">{s.label}</div><div className="text-[9px] text-gray-500">{s.sub}</div></div>))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mt-8">
            <Link to="/catalogue" className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#008753] to-[#006b42] text-white shadow-lg shadow-[#008753]/20 hover:scale-105 transition-all duration-300">Explorer nos collections <ArrowRight size={12} /></Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
