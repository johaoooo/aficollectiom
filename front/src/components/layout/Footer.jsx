import { Link } from 'react-router-dom'
import { WhatsappLogo, FacebookLogo, InstagramLogo, MapPin, Phone, Envelope } from '@phosphor-icons/react'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

        <div className="md:col-span-2">
          <div className="font-display text-3xl font-black mb-4">
            <span className="text-[#008753]">A</span>
            <span className="text-[#FCD116]">F</span>
            <span className="text-[#E8112D]">I</span>
            <span className="text-white ml-1 text-xl font-light">Collection</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
            L'art béninois, tissé à la main. Depuis 2015, nous valorisons le patrimoine artisanal du Bénin.
          </p>
          <div className="flex gap-4">
            <a href="https://wa.me/22901960622 87" target="_blank" rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                hover:bg-[#25D366] transition-colors">
              <WhatsappLogo size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors">
              <FacebookLogo size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E1306C] transition-colors">
              <InstagramLogo size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm tracking-widest uppercase text-[#FCD116] mb-4">Collections</h4>
          <ul className="space-y-2 text-sm text-white/50">
            {['afisac','afi-pagne','afi-chaussure','afi-vetement','afi-tissu','afi-mode'].map(id => (
              <li key={id}><Link to={`/catalogue/${id}`} className="hover:text-white transition-colors capitalize">{id.replace('-',' ')}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm tracking-widest uppercase text-[#FCD116] mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> Zoundja, Abomey-Calavi, Bénin</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +229 01 96 06 22 87</li>
            <li className="flex items-center gap-2"><Envelope size={16} /> afiavitossa@gmail.com</li>
          </ul>
        </div>

      </div>
      <div className="border-t border-white/10 pt-6 text-center text-white/30 text-xs">
        © 2026 AFI Collection — Zoundja, Abomey-Calavi, Bénin. Tous droits réservés.
      </div>
    </footer>
  )
}
