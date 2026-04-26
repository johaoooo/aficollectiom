import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MapPin, Phone, Envelope, WhatsappLogo, PaperPlaneTilt, CheckCircle } from '@phosphor-icons/react'
import { subBrands } from '../data/products'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch (e) { /* backend optionnel en dev */ }
    setSent(true)
  }

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#FAF6F0]">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-[#008753] font-semibold tracking-widest uppercase text-sm mb-3">Nous joindre</p>
          <h1 className="font-display text-4xl md:text-5xl font-black text-[#1A1A1A]">Contact & Commandes</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Infos */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A] mb-8">Nous trouver</h2>
            <div className="space-y-6 mb-10">
              {[
                { icon: <MapPin weight="duotone" size={24} />, label: "Adresse", value: "Zoundja, Abomey-Calavi, Bénin", color: "#008753" },
                { icon: <Phone weight="duotone" size={24} />, label: "Téléphone", value: "+229 01 96 06 22 87", color: "#FCD116" },
                { icon: <Envelope weight="duotone" size={24} />, label: "Email", value: "afiavitossa@gmail.com", color: "#E8112D" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.color + '15', color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                    <p className="font-semibold text-[#1A1A1A]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://wa.me/22901960622 87" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white
                px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all hover:shadow-lg hover:shadow-[#25D366]/30">
              <WhatsappLogo size={22} weight="fill" />
              Commander via WhatsApp
            </a>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle size={64} weight="duotone" className="text-[#008753] mb-4" />
                <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-2">Message envoyé !</h3>
                <p className="text-gray-500">Nous vous répondrons dans les 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nom complet *</label>
                  <input {...register('name', { required: true })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm outline-none
                      focus:border-[#008753] focus:ring-2 focus:ring-[#008753]/20 transition-all
                      ${errors.name ? 'border-[#E8112D]' : 'border-gray-200'}`}
                    placeholder="Votre nom" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                  <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    type="email"
                    className={`w-full border rounded-xl px-4 py-3 text-sm outline-none
                      focus:border-[#008753] focus:ring-2 focus:ring-[#008753]/20 transition-all
                      ${errors.email ? 'border-[#E8112D]' : 'border-gray-200'}`}
                    placeholder="votre@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Téléphone</label>
                  <input {...register('phone')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none
                      focus:border-[#008753] focus:ring-2 focus:ring-[#008753]/20 transition-all"
                    placeholder="+229 00 00 00 00" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Collection concernée</label>
                  <select {...register('subBrand')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none
                      focus:border-[#008753] focus:ring-2 focus:ring-[#008753]/20 transition-all bg-white">
                    <option value="">Choisir une collection</option>
                    {subBrands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                    <option value="Formation">Formation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                  <textarea {...register('message', { required: true })} rows={4}
                    className={`w-full border rounded-xl px-4 py-3 text-sm outline-none
                      focus:border-[#008753] focus:ring-2 focus:ring-[#008753]/20 transition-all resize-none
                      ${errors.message ? 'border-[#E8112D]' : 'border-gray-200'}`}
                    placeholder="Décrivez votre demande ou commande..." />
                </div>
                <button type="submit"
                  className="w-full bg-[#008753] text-white py-4 rounded-xl font-semibold
                    flex items-center justify-center gap-2 hover:bg-[#006b42]
                    transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#008753]/30">
                  <PaperPlaneTilt size={18} weight="fill" />
                  Envoyer le message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}
