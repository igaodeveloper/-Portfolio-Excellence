import React from 'react';
import { useEffect, ReactNode, memo, createContext, useContext } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { useAccessibility } from '../contexts/AccessibilityContext';

// Contexto global do scroll
interface ScrollContextValue {
  scrollY: number;
  scrollYProgress: number;
}
const ScrollContext = createContext<ScrollContextValue>({ scrollY: 0, scrollYProgress: 0 });
export const useScrollContext = () => useContext(ScrollContext);

interface SmoothScrollProps {
  children: ReactNode;
}

const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const { reducedMotion } = useAccessibility?.() || { reducedMotion: false };

  // Se o usuário preferir movimento reduzido ou for mobile, apenas renderizamos as crianças sem efeitos
  if (reducedMotion || isMobile) {
    return <>{children}</>;
  }

  return <SmoothScrollImpl>{children}</SmoothScrollImpl>;
};

// Componente de implementação separado para evitar re-renderizações desnecessárias
const SmoothScrollImpl = memo(({ children }: SmoothScrollProps) => {
  // Usamos o hook useScroll para obter o progresso do scroll com opções otimizadas
  const { scrollY, scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  });

  // Adicionamos um spring para suavizar o movimento com configurações otimizadas
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    mass: 0.5,
  });

  // Estado local para scrollY numérico
  const [scrollValue, setScrollValue] = React.useState(0);
  const [progressValue, setProgressValue] = React.useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => setScrollValue(latest));
  useMotionValueEvent(scrollYProgress, 'change', (latest) => setProgressValue(latest));

  // Adicionamos smooth scroll nativo com CSS uma só vez na montagem do componente
  useEffect(() => {
    if ('scrollBehavior' in document.documentElement.style) {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (!prefersReducedMotion) {
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.classList.add('smooth-scroll-enabled');
      }
    }
    return () => {
      if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = '';
        document.body.classList.remove('smooth-scroll-enabled');
      }
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollY: scrollValue, scrollYProgress: progressValue }}>
      {/* Indicador de progresso de rolagem otimizado */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-modern-accent z-50 origin-left"
        style={{
          scaleX: scaleY,
          willChange: 'transform',
          translateZ: 0,
        }}
      />
      {children}
    </ScrollContext.Provider>
  );
});

SmoothScrollImpl.displayName = 'SmoothScrollImpl';

export default SmoothScroll;
