import { motion } from 'framer-motion';
import { useParallax, useMouseParallax } from '../hooks/useParallax';
import React, { useRef, useEffect } from 'react';

// Tipagem explícita para planetas

type Planet = {
  x: string;
  y: string;
  size: number;
  color: string;
  blur: number;
  shadow: string;
  parallax: {
    range: [number, number];
    outputRange: [number, number];
  };
};

// Array de planetas com propriedades visuais e parallax
const PLANETS: Planet[] = [
  {
    x: '12%',
    y: '60%',
    size: 64,
    color: 'radial-gradient(circle at 60% 40%, #6dd5ed 0%, #2193b0 80%, #090a1a 100%)',
    blur: 2,
    shadow: '0 0 32px 12px #6dd5ed55',
    parallax: { range: [0, 1], outputRange: [0, -110] },
  },
  {
    x: '75%',
    y: '20%',
    size: 38,
    color: 'radial-gradient(circle at 30% 70%, #f7971e 0%, #ffd200 80%, #090a1a 100%)',
    blur: 1,
    shadow: '0 0 24px 8px #ffd20055',
    parallax: { range: [0, 1], outputRange: [0, -60] },
  },
  {
    x: '55%',
    y: '70%',
    size: 48,
    color: 'radial-gradient(circle at 60% 40%, #c33764 0%, #1d2671 80%, #090a1a 100%)',
    blur: 3,
    shadow: '0 0 40px 14px #c3376455',
    parallax: { range: [0, 1], outputRange: [0, -80] },
  },
  {
    x: '20%',
    y: '25%',
    size: 28,
    color: 'radial-gradient(circle at 40% 60%, #43cea2 0%, #185a9d 80%, #090a1a 100%)',
    blur: 1,
    shadow: '0 0 16px 6px #43cea255',
    parallax: { range: [0, 1], outputRange: [0, -40] },
  },
];

// Canvas de estrelas animadas
const StarCanvas: React.FC<{ count?: number }> = ({ count = 120 }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth * dpr;
    const height = canvas.offsetHeight * dpr;
    canvas.width = width;
    canvas.height = height;
    ctx.scale(dpr, dpr);
    // Gerar estrelas
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 1.1 + 0.2,
      speed: Math.random() * 0.15 + 0.03,
      alpha: Math.random() * 0.7 + 0.3,
    }));
    let frame: number;
    function animate() {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const star of stars) {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
        // Movimento sutil para parallax
        star.y += star.speed;
        if (star.y > canvas.offsetHeight) {
          star.y = 0;
          star.x = Math.random() * canvas.offsetWidth;
        }
      }
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [count]);
  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}
    />
  );
};

type Layer = {
  image: string;
  speed: [number, number];
  output?: [number, number];
  z?: number;
  alt?: string;
};

const layers: Layer[] = [
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    speed: [0, 1],
    output: [0, -200],
    z: 10,
    alt: 'Montanhas',
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    speed: [0, 1],
    output: [0, -100],
    z: 20,
    alt: 'Floresta',
  },
  {
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
    speed: [0, 1],
  },
];

const ParallaxScrollShowcase = () => {
  // Parallax do fundo (nebulosa)
  const { y: bgY } = useParallax({ range: [0, 1], outputRange: [0, -30], axis: 'y' });
  // Parallax do brilho
  const { y: glowY } = useParallax({ range: [0, 1], outputRange: [0, -80], axis: 'y' });
  // Parallax dos planetas
  const planetYs = PLANETS.map(p => useParallax({ range: p.parallax.range, outputRange: p.parallax.outputRange, axis: 'y' }).y);
  // Parallax mouse para o título
  const mouse = useMouseParallax(0.04, false);

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg border border-white/20 bg-black">
      {/* Fundo com gradiente espacial */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at 60% 40%, #22244b 0%, #090a1a 100%)',
          zIndex: 1,
          y: bgY as any,
        }}
        initial={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />
      {/* Estrelas animadas em canvas */}
      <StarCanvas count={180} />
      {/* Nebulosa (SVG) */}
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 400"
        style={{ position: 'absolute', left: 0, top: 0, zIndex: 15, pointerEvents: 'none', opacity: 0.4 }}
        initial={{ y: 0 }}
        animate={{ y: glowY as any }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      >
        <defs>
          <radialGradient id="nebula" cx="60%" cy="40%" r="80%">
            <stop offset="0%" stopColor="#a18cd1" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#fbc2eb" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#090a1a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="700" cy="200" rx="350" ry="120" fill="url(#nebula)" />
      </motion.svg>
      {/* Planetas (camadas de parallax) */}
      {PLANETS.map((planet, idx) => (
        <motion.div
          key={idx}
          style={{
            position: 'absolute',
            left: planet.x,
            top: planet.y,
            width: planet.size,
            height: planet.size,
            borderRadius: '50%',
            background: planet.color,
            filter: `blur(${planet.blur}px)`,
            boxShadow: planet.shadow,
            zIndex: 20 + idx,
            y: planetYs[idx] as any,
            opacity: 0.95 - idx * 0.18,
          }}
          initial={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 40, damping: 20 }}
        />
      ))}
      {/* Brilho central */}
      <motion.div
        style={{
          position: 'absolute',
          left: '40%',
          top: '35%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 60% 40%, #fffbe6 0%, #fbc2eb44 80%, #fff0 100%)',
          filter: 'blur(40px)',
          zIndex: 25,
          y: glowY as any,
          opacity: 0.25,
        }}
        initial={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />
      {/* Título e descrição com parallax do mouse */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-50"
        style={{ x: mouse.x, y: mouse.y }}
        transition={{ type: 'spring', stiffness: 75, damping: 30 }}
      >
        <h4 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-2">Parallax Universo</h4>
        <p className="text-white/80 text-lg md:text-xl drop-shadow">Role a página e mova o mouse para explorar um universo animado</p>
      </motion.div>
    </div>
  );
};

export default ParallaxScrollShowcase;