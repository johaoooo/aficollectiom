import { Link } from 'react-router-dom';
import { 
  FacebookLogo, InstagramLogo, WhatsappLogo, LinkedinLogo,
  Envelope, Phone, MapPin, Clock, ArrowRight, Heart
} from '@phosphor-icons/react';

const quickLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Collections', href: '/catalogue/afisac' },
  { name: 'Formations', href: '/formations' },
  { name: 'Galerie', href: '/galerie' },
  { name: 'À propos', href: '/a-propos' },
  { name: 'Contact', href: '/contact' },
];

const collections = [
  { name: 'AFISAC - Sacs', href: '/catalogue/afisac' },
  { name: 'AFI PAGNE', href: '/catalogue/afi-page' },
  { name: 'AFI CHAUSSURE', href: '/catalogue/afi-chaussure' },
  { name: 'AFI VÊTEMENT', href: '/catalogue/afi-vetement' },
  { name: 'AFI TISSU', href: '/catalogue/afi-tissu' },
  { name: 'AFI MODE', href: '/catalogue/afi-mode' },
];

const formations = [
  { name: 'Macramé-Tricotage', href: '/formations/macrame' },
  { name: 'Teinture de Pagne', href: '/formations/teinture' },
  { name: 'Filière Sésame', href: '/formations/sesame' },
  { name: 'Filière Soja', href: '/formations/soja' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] dark:bg-black text-white">
      
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-display font-bold mb-2">
                Recevez nos actualités
              </h3>
              <p className="text-white/50 text-sm">
                Inscrivez-vous pour découvrir nos nouvelles collections
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#008753] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#008753] text-white font-semibold text-sm hover:bg-[#006b42] transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                S'inscrire
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Colonne 1 - Logo avec couleurs AFI */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#008753] flex items-center justify-center">
                  <span className="text-white font-black text-lg">AFI</span>
                </div>
                <div>
                  <div className="flex">
                    <span className="text-xl font-bold text-[#008753]">A</span>
                    <span className="text-xl font-bold text-[#FCD116]">F</span>
                    <span className="text-xl font-bold text-[#E8112D]">I</span>
                  </div>
                  <p className="text-[10px] text-white/40 tracking-wider">L'art béninois, tissé à la main</p>
                </div>
              </div>
            </Link>
            <p className="text-white/50 text-sm mb-4 leading-relaxed">
              Depuis 2015, AFI Collection sublime le patrimoine artisanal du Bénin à travers six collections uniques.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#008753] transition-all">
                <FacebookLogo size={14} weight="fill" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FCD116] transition-all hover:text-[#1A1A1A]">
                <InstagramLogo size={14} weight="fill" />
              </a>
              <a href="https://wa.me/2290196062287" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-all">
                <WhatsappLogo size={14} weight="fill" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E8112D] transition-all">
                <LinkedinLogo size={14} weight="fill" />
              </a>
            </div>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/50 text-sm hover:text-[#008753] transition-colors flex items-center gap-2 group">
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Collections */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Nos collections</h4>
            <ul className="space-y-2">
              {collections.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-white/50 text-sm hover:text-[#FCD116] transition-colors flex items-center gap-2 group">
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={16} className="text-[#008753] shrink-0 mt-0.5" />
                <span>Zoundja, Abomey-Calavi, Bénin</span>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Phone size={16} className="text-[#008753]" />
                <a href="tel:+2290196062287" className="hover:text-[#008753] transition-colors">+229 01 96 06 22 87</a>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Envelope size={16} className="text-[#008753]" />
                <a href="mailto:afiavitossa@gmail.com" className="hover:text-[#008753] transition-colors">afiavitossa@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <Clock size={16} className="text-[#FCD116] shrink-0 mt-0.5" />
                <span>Lun - Sam: 9h - 18h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Formations rapides */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h4 className="font-display font-bold text-white text-sm mb-2">Nos formations</h4>
              <div className="flex flex-wrap gap-4">
                {formations.map((item) => (
                  <Link key={item.name} to={item.href} className="text-white/40 text-xs hover:text-[#E8112D] transition-colors">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 text-white/30 text-xs">
              <span>© {currentYear} AFI Collection</span>
              <Heart size={10} weight="fill" className="text-[#E8112D]" />
              <span>Tous droits réservés</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
