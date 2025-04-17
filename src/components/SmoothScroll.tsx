import { useEffect, ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  // Usamos o hook useScroll para obter o progresso do scroll
  const { scrollYProgress } = useScroll();
  
  // Adicionamos um spring para suavizar o movimento
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Adicionamos smooth scroll nativo com CSS
  useEffect(() => {
    // Verifica se o navegador suporta scroll behavior
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    return () => {
      if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = '';
      }
    };
  }, []);

  return (
    <>
      {/* Indicador de progresso de rolagem */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-modern-accent z-50 origin-left"
        style={{ scaleX: scaleY }}
      />
      {children}
    </>
  );
};

export default SmoothScroll; 