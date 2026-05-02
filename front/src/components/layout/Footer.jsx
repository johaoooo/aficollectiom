import { Link } from 'react-router-dom';
import { 
  FacebookLogo, InstagramLogo, WhatsappLogo, LinkedinLogo,
  Envelope, Phone, MapPin, Clock, ArrowRight, Heart,
  ShoppingBag, GraduationCap, Images, ChatCircleDots
} from '@phosphor-icons/react';

const quickLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Galerie', href: '/galerie' },
  { name: 'À propos', href: '/a-propos' },
  { name: 'Contact', href: '/contact' },
];

const collections = [
  { name: 'AFISAC — Sacs macramé', href: '/catalogue/afisac' },
  { name: 'AFI PAGNE', href: '/catalogue/afi-pagne' },
  { name: 'AFI CHAUSSURE', href: '/catalogue/afi-chaussure' },
  { name: 'AFI VÊTEMENT', href: '/catalogue/afi-vetement' },
  { name: 'AFI TISSU', href: '/catalogue/afi-tissu' },
  { name: 'AFI MODE', href: '/catalogue/afi-mode' },
];

const formations = [
  { name: 'Macramé & Tricotage', href: '/formations/macrame' },
  { name: 'Teinture de Pagne', href: '/formations/teinture' },
  { name: 'Filière Sésame', href: '/formations/sesame' },
  { name: 'Filière Soja', href: '/formations/soja' },
];

const socials = [
  { icon: FacebookLogo, href: '#', hover: 'hover:bg-[#1877F2]', label: 'Facebook' },
  { icon: InstagramLogo, href: '#', hover: 'hover:bg-gradient-to-br hover:from-[#F58529] hover:to-[#DD2A7B]', label: 'Instagram' },
  { icon: WhatsappLogo, href: 'https://wa.me/2290196062287', hover: 'hover:bg-[#25D366]', label: 'WhatsApp' },
  { icon: LinkedinLogo, href: '#', hover: 'hover:bg-[#0A66C2]', label: 'LinkedIn' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0D1F17] dark:bg-[#040E09] text-white overflow-hidden">

      {/* Décor de fond — lignes géométriques subtiles */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #008753 0px, #008753 1px,
            transparent 1px, transparent 40px
          )`
        }}
      />

      {/* Bande accent couleurs AFI */}
      <div className="relative h-1 flex">
        <div className="flex-1 bg-[#008753]" />
        <div className="flex-1 bg-[#FCD116]" />
        <div className="flex-1 bg-[#E8112D]" />
      </div>

      {/* Newsletter */}
      <div className="relative border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-1 tracking-tight">
                Restez dans la boucle
              </h3>
              <p className="text-white/40 text-sm">
                Nouvelles collections, formations et actualités artisanales
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-2 w-full max-w-md"
            >
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10
                  text-white placeholder-white/25 text-sm
                  focus:outline-none focus:border-[#008753]/60 focus:bg-white/[0.08]
                  transition-all duration-200"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#008753] text-white font-semibold text-sm
                  hover:bg-[#006b42] active:scale-95 transition-all duration-200
                  flex items-center justify-center gap-2 whitespace-nowrap"
              >
                S'inscrire <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Corps principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Colonne logo — plus large */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/lo.svg"
                alt="AFI Collection"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Depuis 2015, AFI Collection sublime le patrimoine artisanal du Bénin
              à travers six collections uniques, tissées à la main avec passion.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex gap-2 mb-8">
              {socials.map(({ icon: Icon, href, hover, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10
                    flex items-center justify-center text-white/50
                    ${hover} hover:text-white hover:border-transparent
                    transition-all duration-200`}
                >
                  <Icon size={15} weight="fill" />
                </a>
              ))}
            </div>

            {/* Contact rapide */}
            <ul className="space-y-2.5">
              <li className="flex items-start gap-3 text-white/40 text-sm">
                <MapPin size={15} className="text-[#008753] shrink-0 mt-0.5" />
                <span>Zoundja, Abomey-Calavi, Bénin</span>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Phone size={15} className="text-[#008753] shrink-0" />
                <a href="tel:+2290196062287" className="hover:text-[#008753] transition-colors">
                  +229 01 96 06 22 87
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Envelope size={15} className="text-[#008753] shrink-0" />
                <a href="mailto:afiavitossa@gmail.com" className="hover:text-[#008753] transition-colors">
                  afiavitossa@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Clock size={15} className="text-[#FCD116] shrink-0" />
                <span>Lun – Sam : 9h – 18h</span>
              </li>
            </ul>
          </div>

          {/* Liens rapides */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors
                      flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#008753] transition-all duration-200 overflow-hidden" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-4 flex items-center gap-2">
              <ShoppingBag size={13} className="text-[#FCD116]" /> Collections
            </h4>
            <ul className="space-y-2.5">
              {collections.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-white/50 text-sm hover:text-[#FCD116] transition-colors
                      flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#FCD116] transition-all duration-200 overflow-hidden" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Formations */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-4 flex items-center gap-2">
              <GraduationCap size={13} className="text-[#E8112D]" /> Formations
            </h4>
            <ul className="space-y-2.5 mb-6">
              {formations.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-white/50 text-sm hover:text-[#E8112D] transition-colors
                      flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#E8112D] transition-all duration-200 overflow-hidden" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA WhatsApp */}
            <a
              href="https://wa.me/2290196062287"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366]
                hover:bg-[#25D366]/20 hover:border-[#25D366]/40
                text-sm font-semibold transition-all duration-200"
            >
              <WhatsappLogo size={16} weight="fill" />
              Commander maintenant
            </a>
          </div>
        </div>
      </div>

      {/* Barre de bas de page */}
      <div className="relative border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/25 text-xs">
              © {currentYear} AFI Collection — Tous droits réservés
            </p>
            <div className="flex items-center gap-1.5 text-white/20 text-xs">
              <span>Fait avec</span>
              <Heart size={10} weight="fill" className="text-[#E8112D]" />
              <span>pour l'artisanat béninois</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
