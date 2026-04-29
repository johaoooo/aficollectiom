import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Needle, ArrowRight, WhatsappLogo, GraduationCap, Clock, Users, Star } from '@phosphor-icons/react';

export default function TrainingCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1A1A1A] to-[#0a2e1a] text-white relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#008753] blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-[#E8112D] blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          
          {/* Icône principale avec effet */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FCD116]/20 border border-[#FCD116]/30 mb-6"
          >
            <Needle size={32} weight="duotone" className="text-[#FCD116]" />
          </motion.div>
          
          {/* Titre avec icône décorative */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star size={12} weight="fill" className="text-[#FCD116]" />
            <span className="text-[#FCD116] text-xs font-bold tracking-widest uppercase">Centre de Formation Dorcas</span>
            <Star size={12} weight="fill" className="text-[#FCD116]" />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
            Apprenez un savoir-faire
          </h2>
          <p className="text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FCD116] to-[#E8112D] mb-6">
            qui dure toute une vie
          </p>
          
          <p className="text-white/60 text-sm max-w-xl mx-auto mb-8">
            4 filières professionnelles certifiantes. Formation intensive avec Mme TOSSA Afiavi, artisane primée internationalement.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <GraduationCap size={16} className="text-[#FCD116]" />
              <span>Certification reconnue</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Clock size={16} className="text-[#FCD116]" />
              <span>1 à 3 mois</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Users size={16} className="text-[#FCD116]" />
              <span>500+ formés</span>
            </div>
          </div>
          
          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/formations"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl
                bg-[#FCD116] text-[#1A1A1A] font-bold text-sm
                hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FCD116]/20">
              Voir les formations
              <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/2290196062287" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl
                border-2 border-white/20 text-white font-semibold text-sm
                hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10
                transition-all duration-300">
              <WhatsappLogo weight="fill" size={16} />
              S'inscrire via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
