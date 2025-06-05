import { motion } from 'framer-motion';

const particles = Array.from({ length: 18 });

export default function AnimatedParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/70 shadow-lg"
          style={{
            width: 8 + Math.random() * 16,
            height: 8 + Math.random() * 16,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.5 + Math.random() * 0.5,
          }}
          animate={{
            y: [0, Math.random() * 80 - 40, 0],
            x: [0, Math.random() * 80 - 40, 0],
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
} 