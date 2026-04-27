import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CaretLeft, CaretRight, ShoppingBag, ArrowRight,
  WhatsappLogo, Star, Users, Package, Globe, Sparkle
} from '@phosphor-icons/react';

const slides = [
  {
    image: '/afi.jpeg',
    title: "L'art du macramé",
    subtitle: 'Sacs uniques tissés à la main par des artisanes du Bénin',
    badge: 'AFI COLLECTION',
    subBadge: 'AFISAC',
    accent: '#008753',
    description: 'Découvrez l\'excellence de l\'artisanat béninois, chaque pièce est unique et raconte une histoire.'
  },
  {
    image: '/afi2.jpeg',
    title: 'Teinture artisanale',
    subtitle: 'Couleurs vives et traditions centenaires du Bénin',
    badge: 'AFI COLLECTION',
    subBadge: 'AFI PAGNE',
    accent: '#FCD116',
    description: 'Des teintures naturelles aux pigments éclatants, un savoir-faire transmis depuis des générations.'
  },
  {
    image: '/afi7.jpeg',
    title: 'Excellence artisanale',
    subtitle: 'Plus de 35 ans de savoir-faire transmis avec passion',
    badge: 'AFI COLLECTION',
    subBadge: 'AFI Collection',
    accent: '#E8112D',
    description: 'Reconnue internationalement, Mme TOSSA Afiavi perpétue et modernise l\'artisanat africain.'
  },
];

const stats = [
  { icon: Star, value: '35+', label: "Années d'expertise" },
  { icon: Users, value: '500+', label: 'Artisans formés' },
  { icon: Package, value: '1000+', label: 'Produits vendus' },
  { icon: Globe, value: '10+', label: 'Pays couverts' },
];

function Counter({ target }) {
  const [count, setCount] = useState(0);
  const num = parseInt(target);
  const hasSuffix = target.includes('+');
  
  useEffect(() => {
    let frame;
    const duration = 1800;
    const startTime = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [num]);
  
  return <>{count}{hasSuffix ? '+' : ''}</>;
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const DURATION = 6000;

  const next = () => { 
    setCurrent(p => (p + 1) % slides.length);
    setProgress(0);
  };
  
  const prev = () => { 
    setCurrent(p => (p - 1 + slides.length) % slides.length);
    setProgress(0);
  };
  
  const goTo = (i) => { 
    setCurrent(i);
    setProgress(0);
  };

  useEffect(() => {
    if (!isPlaying) return;
    
    intervalRef.current = setInterval(() => {
      next();
    }, DURATION);
    
    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / DURATION) * 100;
      setProgress(Math.min(newProgress, 100));
    }, 30);
    
    return () => { 
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, [current, isPlaying]);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-6 px-3 sm:px-6">
      
      <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Background avec transition fluide (sans blanc) */}
        <AnimatePresence mode="sync">
          {/* Image précédente qui reste visible pendant la transition */}
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1.0 }}
              transition={{ duration: 8, ease: 'easeOut' }}
            />
            
            {/* Overlays constants (ne changent pas avec la transition) */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60 dark:from-black/80 dark:via-black/60 dark:to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 dark:from-black/90 dark:via-black/40 dark:to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 dark:from-black/60 dark:via-transparent dark:to-black/40" />
            
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 blur-[120px] opacity-25 transition-colors duration-1000"
              style={{ backgroundColor: slide.accent }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Grain texture - reste constant */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        {/* Compteur */}
        <div className="absolute top-4 right-4 z-10 hidden md:flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-[9px] tracking-[0.3em] uppercase font-light">Collection</span>
            <span className="text-white/90 font-display text-lg font-bold tracking-wider">{String(current + 1).padStart(2, '0')}</span>
            <span className="text-white/30 font-light text-xs">/ {String(slides.length).padStart(2, '0')}</span>
          </div>
          
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-[2px] rounded-full overflow-hidden"
                style={{ width: i === current ? 28 : 10, backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                {i === current && (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-white"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.03 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu principal avec animations indépendantes */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 md:py-10 min-h-[550px]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${current}`}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-2 mb-5"
            >
              <div className="relative">
                <div 
                  className="px-5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase
                    backdrop-blur-md shadow-lg text-white"
                  style={{ 
                    backgroundColor: `${slide.accent}25`,
                    border: `1px solid ${slide.accent}50`,
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  {slide.badge}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/40" />
                <div className="flex items-center gap-2">
                  <Sparkle size={12} weight="fill" color={slide.accent} />
                  <span className="text-[11px] font-semibold tracking-wide text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    {slide.subBadge}
                  </span>
                  <Sparkle size={12} weight="fill" color={slide.accent} />
                </div>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/40" />
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${current}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display font-black leading-[1.2] mb-3 max-w-3xl text-white"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              {slide.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span 
                className="bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc, ${slide.accent}80)`,
                  textShadow: 'none'
                }}
              >
                {slide.title.split(' ').slice(-1)[0]}
              </span>
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${current}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-white/85 text-sm md:text-base font-normal leading-relaxed mb-2 max-w-lg"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            >
              {slide.subtitle}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-white/50 text-xs max-w-md mb-6"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
            >
              {slide.description}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <Link to="/catalogue/afisac">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl
                  font-bold text-white text-sm transition-all duration-300 shadow-lg"
                style={{ 
                  backgroundColor: slide.accent,
                  boxShadow: `0 4px 15px rgba(0,0,0,0.3), 0 0 0 1px ${slide.accent}40`
                }}
              >
                <ShoppingBag size={16} weight="fill" />
                Découvrir les collections
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            
            <a href="https://wa.me/2290196062287" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold
                  text-white text-sm bg-black/30 backdrop-blur-md border border-white/25
                  hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/15
                  transition-all duration-300 shadow-lg"
              >
                <WhatsappLogo size={16} weight="fill" />
                Commander via WhatsApp
              </motion.button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-2xl"
          >
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2, scale: 1.02 }}
                className="group px-3 py-2 rounded-xl backdrop-blur-md bg-black/30 dark:bg-black/50
                  border border-white/15 hover:bg-black/40 dark:hover:bg-black/60 hover:border-white/25
                  transition-all duration-300"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                    <Icon size={16} weight="fill" color="#FCD116" />
                  </div>
                  <div className="font-bold text-xl text-white leading-none tracking-wide"
                       style={{ fontFamily: 'Calibri, "Segoe UI", Arial, sans-serif', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    <Counter target={value} />
                  </div>
                  <div className="text-white/75 text-[9px] font-medium uppercase tracking-wide"
                       style={{ fontFamily: 'Calibri, "Segoe UI", Arial, sans-serif' }}>
                    {label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full
            bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center
            text-white/70 hover:text-white hover:bg-white/20 hover:scale-110
            transition-all duration-300"
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full
            bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center
            text-white/70 hover:text-white hover:bg-white/20 hover:scale-110
            transition-all duration-300"
        >
          <CaretRight size={16} weight="bold" />
        </button>

        <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-3 right-3 z-20 w-6 h-6 rounded-full
            bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center
            text-white/60 hover:text-white hover:bg-white/20
            transition-all duration-300 text-[8px] font-bold"
        >
          {isPlaying ? '⏸' : '▶'}
        </motion.button>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ 
              backgroundColor: slide.accent,
              width: isPlaying ? `${progress}%` : '0%'
            }}
            transition={{ duration: 0.03 }}
          />
        </div>
      </div>
    </section>
  );
}
