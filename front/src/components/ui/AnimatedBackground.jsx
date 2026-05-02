export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Fond de base sombre */}
      <div className="absolute inset-0" style={{ background: '#07100d' }} />
      
      {/* Grain SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <filter id="aurora-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#aurora-grain)" />
      </svg>
      
      {/* SVG Aurora waves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        <defs>
          <radialGradient id="g1" cx="30%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#008753" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#008753" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="g2" cx="70%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#FCD116" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FCD116" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="g3" cx="55%" cy="20%" r="50%">
            <stop offset="0%" stopColor="#E8112D" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#E8112D" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="g4" cx="15%" cy="85%" r="45%">
            <stop offset="0%" stopColor="#00bf6f" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00bf6f" stopOpacity="0" />
          </radialGradient>
          <filter id="blur-heavy"><feGaussianBlur stdDeviation="55" /></filter>
        </defs>
        <ellipse cx="420" cy="360" rx="520" ry="340" fill="url(#g1)" filter="url(#blur-heavy)">
          <animateTransform attributeName="transform" type="translate" values="0,0; 60,-40; -30,70; 80,20; 0,0" dur="22s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="1050" cy="520" rx="480" ry="300" fill="url(#g2)" filter="url(#blur-heavy)">
          <animateTransform attributeName="transform" type="translate" values="0,0; -80,50; 40,-60; -50,30; 0,0" dur="28s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="800" cy="180" rx="420" ry="260" fill="url(#g3)" filter="url(#blur-heavy)">
          <animateTransform attributeName="transform" type="translate" values="0,0; 50,60; -70,20; 30,-40; 0,0" dur="34s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="200" cy="760" rx="380" ry="240" fill="url(#g4)" filter="url(#blur-heavy)">
          <animateTransform attributeName="transform" type="translate" values="0,0; 70,-30; -20,50; 40,-20; 0,0" dur="18s" repeatCount="indefinite" />
        </ellipse>
        <rect width="100%" height="100%" fill="rgba(7,16,13,0.08)" />
      </svg>
    </div>
  )
}
