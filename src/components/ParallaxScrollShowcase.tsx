import { motion } from 'framer-motion';
import { useParallax } from '../hooks/useParallax';

const layers = [
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
    output: [0, -50],
    z: 30,
    alt: 'Céu',
  },
];

const ParallaxScrollShowcase = () => {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg border border-white/20 bg-black">
      {layers.map((layer, idx) => {
        const range: [number, number] = [layer.speed[0], layer.speed[1]];
        const outputRange: [number, number] = [layer.output[0], layer.output[1]];
        const { y } = useParallax({ range, outputRange, axis: 'y' });
        return (
          <motion.img
            key={layer.image}
            src={layer.image}
            alt={layer.alt}
            style={{
              y: (y as any),
              zIndex: layer.z,
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
              opacity: 0.9 - idx * 0.2,
              filter: idx === 2 ? 'brightness(0.8) blur(1px)' : undefined,
            }}
            initial={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 40, damping: 20 }}
          />
        );
      })}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
        <h4 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-2">Parallax Profissional</h4>
        <p className="text-white/80 text-lg md:text-xl drop-shadow">Role a página para ver o efeito de profundidade</p>
      </div>
    </div>
  );
};

export default ParallaxScrollShowcase; 