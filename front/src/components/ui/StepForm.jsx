import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, ArrowLeft, Image, Video, FileText, Tag, CurrencyDollar, Package } from '@phosphor-icons/react'

export default function StepForm({ onSubmit, initialData = {}, isEditing = false }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    category: initialData.category || '',
    brand: initialData.brand || '',
    image: initialData.image || '',
    stock: initialData.stock || '',
    videoUrl: initialData.videoUrl || '',
    ...initialData
  })

  const steps = [
    { number: 1, title: 'Infos générales', icon: Tag, fields: ['name', 'category', 'brand'] },
    { number: 2, title: 'Prix & Stock', icon: CurrencyDollar, fields: ['price', 'stock'] },
    { number: 3, title: 'Média', icon: Image, fields: ['image', 'videoUrl'] },
    { number: 4, title: 'Description', icon: FileText, fields: ['description'] },
  ]

  const categories = ['sacs', 'pagnes', 'chaussures', 'vetements', 'tissus', 'accessoires']
  const brands = ['afisac', 'afi-pagne', 'afi-chaussure', 'afi-vetement', 'afi-tissu', 'afi-mode']

  const nextStep = () => { if (step < steps.length) setStep(step + 1) }
  const prevStep = () => { if (step > 1) setStep(step - 1) }

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="p-4">
      {/* Indicateur d'étapes */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((s) => (
          <div key={s.number} className="flex-1 flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all
              ${step >= s.number ? 'bg-[#008753] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
              {step > s.number ? <CheckCircle size={14} weight="fill" /> : s.number}
            </div>
            {s.number < steps.length && (
              <div className={`flex-1 h-0.5 mx-2 ${step > s.number ? 'bg-[#008753]' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* Étape 1 : Infos générales */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Nom du produit *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Catégorie *</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" required>
                    <option value="">Sélectionner</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Marque *</label>
                  <select name="brand" value={formData.brand} onChange={handleChange} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" required>
                    <option value="">Sélectionner</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Étape 2 : Prix & Stock */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Prix (FCFA) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Stock *</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" required />
                </div>
              </div>
            </motion.div>
          )}

          {/* Étape 3 : Média (image + vidéo) */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2"><Image size={14} /> Image (URL)</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="/afi.jpeg" className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2"><Video size={14} /> Vidéo (URL YouTube ou Vimeo)</label>
                <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="https://youtube.com/..." className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
              </div>
            </motion.div>
          )}

          {/* Étape 4 : Description */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2"><FileText size={14} /> Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm resize-none" required />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boutons navigation */}
        <div className="flex justify-between gap-3 mt-6">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <ArrowLeft size={14} /> Précédent
            </button>
          )}
          {step < steps.length ? (
            <button type="button" onClick={nextStep} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[#008753] text-white ml-auto hover:scale-105 transition">
              Suivant <ArrowRight size={14} />
            </button>
          ) : (
            <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[#008753] text-white ml-auto hover:scale-105 transition">
              {isEditing ? 'Modifier' : 'Ajouter'} <CheckCircle size={14} />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
