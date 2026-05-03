import { useState } from 'react'
import { motion } from 'framer-motion'
import { MagnifyingGlass } from '@phosphor-icons/react'

export default function MiniHero({ image, icon: Icon, badge, title, highlight, subtitle, searchPlaceholder, onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) onSearch(query)
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    if (onSearch) onSearch(e.target.value)
  }

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-xl mb-8" style={{ minHeight: 220 }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#008753]/30 border border-[#008753]/50 backdrop-blur-sm mb-4"
        >
          {Icon && <Icon size={14} weight="duotone" className="text-[#008753]" />}
          <span className="text-xs font-semibold tracking-wider text-white uppercase">{badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="font-display font-black text-white mb-2"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
        >
          {title} <span className="text-[#008753]">{highlight}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-white/70 text-sm mb-6 max-w-md"
        >
          {subtitle}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="w-full max-w-md flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-2.5 shadow-lg"
        >
          <MagnifyingGlass size={16} className="text-white/60 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={searchPlaceholder}
            className="flex-1 bg-transparent text-white placeholder-white/50 text-sm outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); if (onSearch) onSearch('') }}
              className="text-white/50 hover:text-white text-xs transition"
            >
              ✕
            </button>
          )}
        </motion.form>
      </div>
    </div>
  )
}
