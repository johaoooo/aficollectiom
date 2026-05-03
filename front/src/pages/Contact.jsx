import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, Envelope, MapPin, PaperPlaneRight,
  CheckCircle, WarningCircle
} from '@phosphor-icons/react'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
}

function Field({ as: Tag = 'input', name, value, onChange, placeholder, rows, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: focused ? 'rgba(0,135,83,0.05)' : 'rgba(0,0,0,0.03)',
        border: `1.5px solid ${focused ? '#008753' : 'rgba(0,0,0,0.1)'}`,
        boxShadow: focused ? '0 0 0 3px rgba(0,135,83,0.1)' : 'none',
      }}
    >
      <Tag
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white text-sm placeholder-gray-400 outline-none resize-none"
      />
    </div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ nom: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.nom || !formData.email || !formData.message) {
      setError('Veuillez remplir tous les champs')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.nom, email: formData.email, message: formData.message })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'envoi")
      setSubmitted(true)
      setError('')
      setFormData({ nom: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen flex items-start justify-center pt-16 px-4 py-6">
      <div className="w-full max-w-3xl mx-auto -mt-6">

        {/* En-tête */}
        <motion.div variants={fadeUp} custom={0} initial="hidden" animate="show" className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Écrivez-<span className="text-[#008753]">nous</span>
          </h2>
          <p className="text-sm text-gray-400">Notre équipe vous répond rapidement.</p>
        </motion.div>

        {/* Formulaire */}
        <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show"
          className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-white/10 shadow-md p-6"
        >
          {/* Barre déco */}
          <div className="h-1 w-full rounded-full bg-gradient-to-r from-[#008753] via-[#FCD116] to-[#E8112D] mb-6" />

          <AnimatePresence>
            {submitted && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <CheckCircle size={15} weight="fill" className="text-[#008753]" />
                <p className="text-sm text-green-700 dark:text-green-400">Message envoyé avec succès !</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <WarningCircle size={15} weight="fill" className="text-[#E8112D]" />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nom + Email côte à côte */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <Field name="nom" value={formData.nom} onChange={handleChange} placeholder="Votre nom" />
            <Field type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Votre email" />
          </div>

          {/* Message court */}
          <div className="mb-4">
            <Field as="textarea" name="message" value={formData.message} onChange={handleChange} placeholder="Votre message" rows={2} />
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting || submitted}
            className="w-full py-3 rounded-xl text-sm font-semibold flex items-start justify-center pt-16 gap-2 bg-gradient-to-r from-[#008753] to-[#006b42] text-white hover:opacity-90 transition-opacity disabled:opacity-60 shadow-md shadow-[#008753]/20"
          >
            {submitting ? 'Envoi en cours...' : submitted
              ? <><CheckCircle size={15} weight="fill" /> Message envoyé !</>
              : <><PaperPlaneRight size={15} weight="bold" /> Envoyer le message</>}
          </button>
        </motion.div>

        {/* Coordonnées */}
        <motion.div variants={fadeUp} custom={2} initial="hidden" animate="show"
          className="grid grid-cols-3 gap-3 mt-4"
        >
          {[
            { icon: Phone, label: '+229 01 96 06 22 87', sub: 'Lun–Sam · 9h–18h', accent: '#008753' },
            { icon: Envelope, label: 'afiavitossa@gmail.com', sub: 'Réponse sous 24h', accent: '#FCD116' },
            { icon: MapPin, label: 'Abomey-Calavi, Bénin', sub: 'Zoundja', accent: '#E8112D' },
          ].map(({ icon: Icon, label, sub, accent }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white dark:bg-gray-800/60 border-l-4 shadow-sm"
              style={{ borderLeftColor: accent, borderTop: '1px solid rgba(0,0,0,0.06)', borderRight: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}15`, color: accent }}>
                <Icon size={20} weight="duotone" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </main>
  )
}
