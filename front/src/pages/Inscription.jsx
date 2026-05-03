import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, EyeSlash, ArrowRight, GoogleLogo, FacebookLogo, CheckCircle, WarningCircle, UserPlus } from '@phosphor-icons/react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 } })
}

function Field({ type = 'text', name, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  return (
    <div
      className="relative rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: focused ? 'rgba(0,135,83,0.05)' : 'rgba(0,0,0,0.03)',
        border: `1.5px solid ${focused ? '#008753' : 'rgba(0,0,0,0.15)'}`,
        boxShadow: focused ? '0 0 0 3px rgba(0,135,83,0.12)' : 'none'
      }}
    >
      <input
        type={isPassword && showPassword ? 'text' : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-2.5 bg-transparent text-gray-900 dark:text-white text-sm placeholder-gray-500 outline-none"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
        >
          {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  )
}

export default function Inscription() {
  const [formData, setFormData] = useState({ nom: '', email: '', password: '', confirmPassword: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); if (error) setError('') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.nom || !formData.email || !formData.password || !formData.confirmPassword) { setError('Veuillez remplir tous les champs'); return }
    if (formData.password !== formData.confirmPassword) { setError('Les mots de passe ne correspondent pas'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.nom, email: formData.email, password: formData.password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'inscription")
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setSubmitted(true)
      setTimeout(() => { window.location.href = '/' }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-xl mx-auto">

        {/* En-tête */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 bg-[#008753]/10 border border-[#008753]/30">
            <UserPlus size={11} weight="duotone" className="text-[#008753]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#008753]">Inscription</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Rejoignez-<span className="text-[#008753]">nous</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Créez votre compte en quelques secondes</p>
        </motion.div>

        {/* Carte formulaire */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show"
          className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg border border-gray-200 dark:border-white/10 p-5"
        >
          <div className="h-1 w-full rounded-full bg-gradient-to-r from-[#008753] via-[#FCD116] to-[#E8112D] mb-5" />

          <AnimatePresence>
            {submitted && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl mb-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <CheckCircle size={14} weight="fill" className="text-[#008753]" />
                <p className="text-sm text-green-700 dark:text-green-400">Inscription réussie ! Redirection...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl mb-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <WarningCircle size={14} weight="fill" className="text-[#E8112D]" />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2.5">
              <Field type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom complet" />
              <Field type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Adresse email" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <Field type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" />
              <Field type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmer" />
            </div>

            <button
              type="submit"
              disabled={submitting || submitted}
              className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-[#008753] to-[#006b42] text-white hover:opacity-90 transition disabled:opacity-60 shadow-md shadow-[#008753]/20"
            >
              {submitting ? 'Inscription...' : submitted
                ? <><CheckCircle size={14} weight="fill" /> Inscrit !</>
                : <><ArrowRight size={14} /> S'inscrire</>}
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
            <span className="text-xs text-gray-500 font-medium">ou continuer avec</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2 rounded-xl border border-gray-300 dark:border-white/10 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition font-medium">
              <GoogleLogo size={15} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2 rounded-xl border border-gray-300 dark:border-white/10 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition font-medium">
              <FacebookLogo size={15} weight="fill" /> Facebook
            </button>
          </div>
        </motion.div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Déjà inscrit ?{' '}
          <Link to="/connexion" className="text-[#008753] font-semibold hover:underline">Se connecter</Link>
        </p>
      </div>
    </main>
  )
}
