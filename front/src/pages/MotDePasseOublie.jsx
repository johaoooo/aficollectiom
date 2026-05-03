import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Envelope, CheckCircle, WarningCircle, ArrowLeft } from '@phosphor-icons/react'

export default function MotDePasseOublie() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) { setError('Veuillez entrer votre email'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Une erreur est survenue')
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-white/10"
      >
        <div className="h-1 w-full rounded-full bg-gradient-to-r from-[#008753] via-[#FCD116] to-[#E8112D] mb-8" />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#008753]/10 flex items-center justify-center mx-auto mb-4">
                  <Envelope size={26} weight="duotone" className="text-[#008753]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mot de passe oublié</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Entrez votre email et nous vous enverrons un lien de réinitialisation.
                </p>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <WarningCircle size={15} weight="fill" className="text-[#E8112D]" />
                    <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
                  placeholder="Votre adresse email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#008753] transition"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#008753] to-[#006b42] hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Envoi...' : 'Envoyer le lien'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} weight="fill" className="text-[#008753]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email envoyé !</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Si un compte est associé à <span className="font-semibold text-gray-700 dark:text-gray-300">{email}</span>, vous recevrez un lien de réinitialisation sous peu.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 text-center">
          <Link to="/connexion" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-[#008753] transition">
            <ArrowLeft size={14} /> Retour à la connexion
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
