import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, Envelope, MapPin, PaperPlaneRight,
  ChatCircle, CheckCircle, WarningCircle,
  CaretDown, CaretUp
} from '@phosphor-icons/react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
}

function Field({ as: Tag = 'input', name, value, onChange, placeholder, rows }) {
  const [focused, setFocused] = useState(false)

  return (
    <div
      className="relative rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: focused ? 'rgba(0,135,83,0.05)' : 'rgba(0,0,0,0.02)',
        border: `1px solid ${focused ? 'rgba(0,135,83,0.6)' : 'rgba(0,0,0,0.1)'}`,
        boxShadow: focused ? '0 0 0 3px rgba(0,135,83,0.12)' : 'none',
      }}
    >
      <Tag
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-2.5 bg-transparent text-gray-900 dark:text-white text-sm placeholder-gray-400 outline-none resize-none"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />
    </div>
  )
}

function CoordCard({ icon: Icon, title, value, sub, accent, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center text-center p-3 rounded-xl transition-all duration-400 bg-white dark:bg-gray-800/50"
      style={{
        border: `1px solid ${hovered ? accent : 'rgba(0,0,0,0.1)'}`,
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-all duration-300"
        style={{
          background: `${accent}15`,
          color: accent,
        }}
      >
        <Icon size={14} weight="duotone" />
      </div>
      <h3 className="font-semibold text-[10px] mb-0.5 text-gray-700 dark:text-white/80">{title}</h3>
      <p className="text-[9px] font-medium text-gray-500 dark:text-white/50">{value}</p>
      <p className="text-[8px] text-gray-400 dark:text-white/30">{sub}</p>
    </motion.div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ nom: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nom || !formData.email || !formData.message) {
      setError('Veuillez remplir tous les champs')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setError('')
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ nom: '', email: '', message: '' })
      }, 2000)
    }, 800)
  }

  const coords = [
    { icon: Phone, title: 'Téléphone', value: '+229 01 96 06 22 87', sub: 'Lun–Sam · 9h–18h', accent: '#008753' },
    { icon: Envelope, title: 'Email', value: 'afiavitossa@gmail.com', sub: 'Réponse sous 24h', accent: '#FCD116' },
    { icon: MapPin, title: 'Adresse', value: 'Zoundja, Abomey-Calavi', sub: 'Bénin', accent: '#E8112D' },
  ]

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md mx-auto px-4 py-8">
        
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-6">
          <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3 bg-[#008753]/10 dark:bg-[#008753]/15">
            <ChatCircle size={10} weight="duotone" className="text-[#008753]" />
            <span className="text-[9px] font-semibold tracking-widest uppercase text-[#008753]">Contact</span>
          </motion.div>
          <motion.h2 custom={1} variants={fadeUp} className="text-gray-900 dark:text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 600 }}>
            Écrivez-
            <span className="bg-gradient-to-r from-[#008753] to-[#FCD116] bg-clip-text text-transparent">nous</span>
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-[10px] text-gray-500 dark:text-gray-400">Une question ? Notre équipe vous répond rapidement.</motion.p>
        </motion.div>

        <motion.div custom={3} variants={fadeUp} className="relative rounded-2xl overflow-hidden mb-4 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none border border-gray-200 dark:border-white/10">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#008753] via-[#FCD116] to-[#E8112D]" />
          <div className="p-4">
            <AnimatePresence>
              {submitted && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-3 px-3 py-1.5 rounded-lg flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <CheckCircle size={12} weight="fill" className="text-[#008753]" />
                  <p className="text-[10px] font-medium text-green-700 dark:text-green-400">Message envoyé !</p>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-3 px-3 py-1.5 rounded-lg flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <WarningCircle size={12} weight="fill" className="text-[#E8112D]" />
                  <p className="text-[10px] text-red-700 dark:text-red-400">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <Field name="nom" value={formData.nom} onChange={handleChange} placeholder="Votre nom *" />
              <Field type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Votre email *" />
              <Field as="textarea" name="message" value={formData.message} onChange={handleChange} placeholder="Votre message *" rows={3} />
              <button type="submit" disabled={submitting || submitted} className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-[#008753] to-[#006b42] text-white">
                {submitting ? <span className="text-xs">Envoi...</span> : submitted ? <><CheckCircle size={12} weight="fill" /><span className="text-xs">Envoyé !</span></> : <><PaperPlaneRight size={12} weight="bold" /><span className="text-xs">Envoyer</span></>}
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div custom={4} variants={fadeUp} className="text-center mb-3">
          <button onClick={() => setIsInfoOpen(!isInfoOpen)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400">
            {isInfoOpen ? <CaretUp size={10} /> : <CaretDown size={10} />}
            {isInfoOpen ? 'Masquer les coordonnées' : 'Voir nos coordonnées'}
          </button>
        </motion.div>

        <AnimatePresence>
          {isInfoOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="grid grid-cols-3 gap-2">
                {coords.map((c, i) => <CoordCard key={c.title} {...c} index={i} />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
