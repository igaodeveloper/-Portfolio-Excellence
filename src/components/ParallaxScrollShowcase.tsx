import { motion, useViewportScroll, useTransform } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';

// Ícones SVG para o tema desenvolvedor
const CodeIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <rect x="8" y="14" width="40" height="28" rx="6" fill="#23272e" />
    <rect x="13" y="19" width="30" height="18" rx="3" fill="#181c22" />
    {/* Removido texto */}
  </svg>
);

const TerminalIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="10" width="36" height="28" rx="5" fill="#181c22" />
    <rect x="11" y="15" width="26" height="18" rx="3" fill="#23272e" />
    {/* Removido texto */}
  </svg>
);

const GearIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="20" fill="#23272e" />
    <circle cx="22" cy="22" r="10" fill="#00d2df" opacity="0.18" />
    <circle cx="22" cy="22" r="4" fill="#00d2df" />
  </svg>
);

// Partículas digitais com física simples
const DigitalParticles: React.FC = () => {
  const [particles] = useState(() =>
    Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 7 + 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      opacity: 0.18 + Math.random() * 0.5,
      delay: Math.random() * 2,
    }))
  );
  // Simula movimento suave
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 40);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-cyan-400/70 rounded shadow-lg"
          style={{
            width: p.size,
            height: p.size,
            left: `calc(${p.x + Math.sin((tick / 20 + i) * p.dx) * 10}% )`,
            top: `calc(${p.y + Math.cos((tick / 20 + i) * p.dy) * 10}% )`,
            opacity: p.opacity,
            zIndex: 1,
            mixBlendMode: 'lighten',
          }}
          animate={{
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 7 + Math.random() * 5,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: p.delay,
          }}
        />
      ))}
    </>
  );
};

// Planetas orbitando (SVGs com animação)
const OrbitingPlanets: React.FC = () => {
  return (
    <>
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 180,
          height: 180,
          marginLeft: -90,
          marginTop: -90,
          zIndex: 2,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="180" height="180" style={{ position: 'absolute', left: 0, top: 0 }}>
          <circle cx="90" cy="90" r="80" fill="none" stroke="#00d2df22" strokeWidth="2" />
        </svg>
        <motion.div
          style={{ position: 'absolute', left: 0, top: 80 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
        >
          <CodeIcon />
        </motion.div>
        <motion.div
          style={{ position: 'absolute', left: 160, top: 80 }}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse' }}
        >
          <TerminalIcon />
        </motion.div>
        <motion.div
          style={{ position: 'absolute', left: 80, top: 0 }}
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        >
          <GearIcon />
        </motion.div>
      </motion.div>
    </>
  );
};

const ParallaxScrollShowcase: React.FC = () => {
  const { scrollYProgress } = useViewportScroll();
  const codeY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const terminalY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const gearY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const planetY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const shineY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-xl shadow-2xl border border-cyan-400/20 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
      {/* Brilho de fundo dinâmico */}
      <motion.div
        style={{
          position: 'absolute',
          left: '30%',
          top: '20%',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 60% 40%, #00d2df88 0%, #23272e00 100%)',
          filter: 'blur(40px)',
          zIndex: 0,
          y: shineY,
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Partículas digitais com física */}
      <DigitalParticles />

      {/* Planeta digital central com parallax */}
      <motion.div
        style={{
          position: 'absolute',
          left: '60%',
          top: '60%',
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 60% 40%, #00d2df 0%, #23272e 80%, #181c22 100%)',
          filter: 'blur(2px)',
          zIndex: 2,
          y: planetY,
          opacity: 0.7,
          boxShadow: '0 0 60px 10px #00d2df44',
        }}
        initial={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />

      {/* Planetas orbitando com blend e SVG */}
      <OrbitingPlanets />

      {/* Ícones de dev em camadas parallax (profundidade extra) */}
      <motion.div style={{ position: 'absolute', left: '12%', top: '32%', y: codeY, zIndex: 3, mixBlendMode: 'lighten' }}>
        <CodeIcon />
      </motion.div>
      <motion.div style={{ position: 'absolute', left: '72%', top: '18%', y: terminalY, zIndex: 3, mixBlendMode: 'lighten' }}>
        <TerminalIcon />
      </motion.div>
      <motion.div style={{ position: 'absolute', left: '38%', top: '74%', y: gearY, zIndex: 3, mixBlendMode: 'lighten' }}>
        <GearIcon />
      </motion.div>
      {/* Removido título central, parágrafo e linhas de código animadas */}
    </div>
  );
};

export default ParallaxScrollShowcase;