import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { User, Envelope, Lock, Eye, EyeSlash, ArrowRight, GoogleLogo, FacebookLogo, CheckCircle, WarningCircle, UserPlus } from '@phosphor-icons/react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 } }) }

function Field({ type = 'text', name, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className="relative rounded-xl overflow-hidden transition-all duration-300" style={{ background: focused ? 'rgba(0,135,83,0.05)' : 'rgba(0,0,0,0.02)', border: `1px solid ${focused ? 'rgba(0,135,83,0.6)' : 'rgba(0,0,0,0.1)'}`, boxShadow: focused ? '0 0 0 3px rgba(0,135,83,0.12)' : 'none' }}>
      <div className="relative">
        <input type={isPassword && showPassword ? 'text' : type} name={name} value={value} onChange={onChange} placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className="w-full px-4 py-2.5 bg-transparent text-gray-900 dark:text-white text-sm placeholder-gray-400 outline-none" />
        {isPassword && <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">{showPassword ? <EyeSlash size={14} /> : <Eye size={14} />}</button>}
      </div>
    </div>
  )
}

export default function Inscription() {
  const [formData, setFormData] = useState({ nom: '', email: '', password: '', confirmPassword: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); if (error) setError('') }
  const handleSubmit = (e) => { e.preventDefault(); if (!formData.nom || !formData.email || !formData.password || !formData.confirmPassword) { setError('Veuillez remplir tous les champs'); return } if (formData.password !== formData.confirmPassword) { setError('Les mots de passe ne correspondent pas'); return } setSubmitting(true); setTimeout(() => { setSubmitting(false); setSubmitted(true); setTimeout(() => setSubmitted(false), 2000) }, 800) }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-sm mx-auto px-4 py-8">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-6">
          <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3 bg-[#008753]/10 dark:bg-[#008753]/15"><UserPlus size={10} weight="duotone" className="text-[#008753]" /><span className="text-[9px] font-semibold tracking-widest uppercase text-[#008753]">Inscription</span></motion.div>
          <motion.h2 custom={1} variants={fadeUp} className="text-gray-900 dark:text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 600 }}>Rejoignez-nous</motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-[10px] text-gray-500 dark:text-gray-400">Créez votre compte en quelques secondes</motion.p>
        </motion.div>

        <motion.div custom={3} variants={fadeUp} className="relative rounded-2xl overflow-hidden mb-4 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none border border-gray-200 dark:border-white/10">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#008753] via-[#FCD116] to-[#E8112D]" />
          <div className="p-4">
            <AnimatePresence>{submitted && (<motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-3 px-3 py-1.5 rounded-lg flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"><CheckCircle size={12} weight="fill" className="text-[#008753]" /><p className="text-[10px] font-medium text-green-700 dark:text-green-400">Inscription réussie !</p></motion.div>)}</AnimatePresence>
            <AnimatePresence>{error && (<motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-3 px-3 py-1.5 rounded-lg flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"><WarningCircle size={12} weight="fill" className="text-[#E8112D]" /><p className="text-[10px] text-red-700 dark:text-red-400">{error}</p></motion.div>)}</AnimatePresence>
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <Field type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom complet *" />
              <Field type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email *" />
              <Field type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe *" />
              <Field type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmer le mot de passe *" />
              <button type="submit" disabled={submitting || submitted} className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-[#008753] to-[#006b42] text-white">{submitting ? <span className="text-xs">Inscription...</span> : submitted ? <><CheckCircle size={12} weight="fill" /><span className="text-xs">Inscrit !</span></> : <><ArrowRight size={12} /><span className="text-xs">S'inscrire</span></>}</button>
            </form>
          </div>
        </motion.div>

        <div className="flex items-center gap-3 my-4"><div className="flex-1 h-px bg-gray-200 dark:bg-white/10"></div><span className="text-[9px] text-gray-400">ou</span><div className="flex-1 h-px bg-gray-200 dark:bg-white/10"></div></div>
        <div className="space-y-2"><button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-gray-200 dark:border-white/10 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition"><GoogleLogo size={14} /> Google</button><button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-gray-200 dark:border-white/10 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition"><FacebookLogo size={14} weight="fill" /> Facebook</button></div>
        <p className="text-center text-[10px] text-gray-500 dark:text-gray-400 mt-5">Déjà inscrit ? <Link to="/connexion" className="text-[#008753] font-semibold hover:underline">Se connecter</Link></p>
      </div>
    </main>
  )
}
