import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarBlank, MapPin, Clock, Users, ArrowRight, CheckCircle, XCircle, HourglassHigh, Funnel } from '@phosphor-icons/react'
import MiniHero from '../components/ui/MiniHero'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

const evenements = [
  {
    id: 1,
    image: '/afi.jpeg',
    titre: 'Atelier Macramé — Initiation',
    date: '15 Juin 2026',
    heure: '10h00 – 13h00',
    lieu: 'Zoundja, Abomey-Calavi',
    description: 'Apprenez les bases du macramé avec nos artisanes expertes. Matériaux fournis. Ouvert à tous niveaux.',
    places: 12,
    statut: 'à venir',
    accent: '#008753',
  },
  {
    id: 2,
    image: '/afi2.jpeg',
    titre: 'Exposition — Teintures du Bénin',
    date: '20 Mai 2026',
    heure: '09h00 – 18h00',
    lieu: 'Centre Culturel de Cotonou',
    description: 'Une exposition unique mettant en lumière les techniques de teinture artisanale béninoise et leurs histoires.',
    places: 0,
    statut: 'complet',
    accent: '#E8112D',
  },
  {
    id: 3,
    image: '/afi7.jpeg',
    titre: 'Formation — Entrepreneuriat Artisanal',
    date: '10 Juillet 2026',
    heure: '08h00 – 17h00',
    lieu: 'Siège AFI Collection, Bénin',
    description: 'Formation intensive de 2 jours pour lancer votre activité artisanale. Certification AFI Collection incluse.',
    places: 8,
    statut: 'à venir',
    accent: '#008753',
  },
  {
    id: 4,
    image: '/afi.jpeg',
    titre: 'Salon de l\'Artisanat Africain',
    date: '5 Mars 2026',
    heure: '10h00 – 20h00',
    lieu: 'Palais des Congrès, Lomé',
    description: 'AFI Collection était présente au grand salon panafricain de l\'artisanat avec plus de 200 exposants.',
    places: 0,
    statut: 'passé',
    accent: '#6B7280',
  },
  {
    id: 5,
    image: '/afi2.jpeg',
    titre: 'Atelier Teinture Naturelle',
    date: '28 Avril 2026',
    heure: '14h00 – 17h00',
    lieu: 'Zoundja, Abomey-Calavi',
    description: 'Découvrez les pigments naturels utilisés par nos artisanes pour créer des couleurs uniques et durables.',
    places: 0,
    statut: 'récent',
    accent: '#FCD116',
  },
  {
    id: 6,
    image: '/afi7.jpeg',
    titre: 'Journée Portes Ouvertes AFI',
    date: '2 Mai 2026',
    heure: '09h00 – 16h00',
    lieu: 'Siège AFI Collection, Bénin',
    description: 'Venez visiter nos ateliers, rencontrer nos artisanes et découvrir nos nouvelles collections en avant-première.',
    places: 0,
    statut: 'récent',
    accent: '#FCD116',
  },
]

const statutConfig = {
  'à venir': { label: 'À venir',  icon: HourglassHigh, bg: 'bg-[#008753]/10', text: 'text-[#008753]', border: 'border-[#008753]/20' },
  'complet': { label: 'Complet',  icon: XCircle,       bg: 'bg-[#E8112D]/10', text: 'text-[#E8112D]', border: 'border-[#E8112D]/20' },
  'récent':  { label: 'Récent',   icon: CalendarBlank, bg: 'bg-[#FCD116]/20', text: 'text-[#B8860B]', border: 'border-[#FCD116]/40' },
  'passé':   { label: 'Passé',    icon: CheckCircle,   bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-500', border: 'border-gray-200 dark:border-gray-600' },
}

const filtres = [
  { key: 'tous',     label: 'Tous' },
  { key: 'à venir',  label: 'À venir' },
  { key: 'complet',  label: 'Complet' },
  { key: 'récent',   label: 'Récents' },
  { key: 'passé',    label: 'Passés' },
]

export default function Evenements() {
  const [filtre, setFiltre] = useState('tous')
  const [search, setSearch] = useState('')

  const evenementsFiltres = evenements
    .filter(e => filtre === 'tous' || e.statut === filtre)
    .filter(e =>
      e.titre.toLowerCase().includes(search.toLowerCase()) ||
      e.lieu.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <main className="min-h-screen pt-2 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden p-6 md:p-8">

          <MiniHero
            image="/afi2.jpeg"
            icon={CalendarBlank}
            badge="Agenda"
            title="Nos"
            highlight="Événements"
            subtitle="Ateliers, expositions & formations — rejoignez-nous"
            searchPlaceholder="Rechercher un événement, un lieu..."
            onSearch={setSearch}
          />

          {/* Filtres avec bords arrondis */}
          <div className="flex items-center gap-2 flex-wrap justify-center mb-6">
            <Funnel size={16} weight="duotone" className="text-gray-400" />
            {filtres.map(f => (
              <button
                key={f.key}
                onClick={() => setFiltre(f.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border
                  ${filtre === f.key
                    ? 'bg-[#008753] text-white border-[#008753] shadow-md'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-[#008753] hover:text-[#008753]'
                  }`}
              >
                {f.label}
                <span className="ml-1.5 opacity-60">
                  ({f.key === 'tous'
                    ? evenements.length
                    : evenements.filter(e => e.statut === f.key).length})
                </span>
              </button>
            ))}
          </div>

          {search && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 text-center">
              {evenementsFiltres.length} résultat{evenementsFiltres.length !== 1 ? 's' : ''} pour "<span className="text-[#008753] font-medium">{search}</span>"
            </p>
          )}

          <AnimatePresence mode="wait">
            {evenementsFiltres.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 text-gray-400"
              >
                <CalendarBlank size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Aucun événement trouvé.</p>
              </motion.div>
            ) : (
              <motion.div
                key={filtre + search}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {evenementsFiltres.map((evt, i) => {
                  const cfg = statutConfig[evt.statut]
                  const StatutIcon = cfg.icon
                  const isPasse = evt.statut === 'passé'
                  const isRecent = evt.statut === 'récent'
                  const isComplet = evt.statut === 'complet'
                  const isGrise = isPasse || isRecent

                  return (
                    <motion.div
                      key={evt.id}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="show"
                      className="rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-white/60 dark:bg-gray-800/40"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={evt.image}
                          alt={evt.titre}
                          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${isGrise ? 'grayscale' : ''}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.text} ${cfg.border} backdrop-blur-sm`}>
                          <StatutIcon size={11} weight="fill" />
                          {cfg.label}
                        </div>
                      </div>

                      <div className="p-4 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md">
                        <h3 className="font-display font-bold text-gray-900 dark:text-white text-base mb-3">{evt.titre}</h3>
                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <CalendarBlank size={13} weight="duotone" style={{ color: evt.accent }} />{evt.date}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <Clock size={13} weight="duotone" style={{ color: evt.accent }} />{evt.heure}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <MapPin size={13} weight="duotone" style={{ color: evt.accent }} />{evt.lieu}
                          </div>
                          {!isGrise && (
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <Users size={13} weight="duotone" style={{ color: evt.accent }} />
                              {isComplet ? 'Aucune place disponible' : `${evt.places} places restantes`}
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{evt.description}</p>
                        <button
                          disabled={isComplet || isGrise}
                          className={`w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300
                            ${isGrise
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                              : isComplet
                              ? 'bg-[#E8112D]/10 text-[#E8112D] cursor-not-allowed border border-[#E8112D]/20'
                              : 'bg-gradient-to-r from-[#008753] to-[#006b42] text-white hover:scale-[1.02] shadow-md'
                            }`}
                        >
                          {isGrise ? 'Événement terminé' : isComplet ? 'Complet' : <><span>S'inscrire</span><ArrowRight size={12} /></>}
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </main>
  )
}
