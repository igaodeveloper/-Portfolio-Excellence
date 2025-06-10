import { useEffect, ReactNode, memo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useAccessibility } from '../contexts/AccessibilityContext';

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
  const { scrollYProgress } = useScroll({
    // Usar valores mais eficientes
    offset: ['start start', 'end end'],
  });

  // Adicionamos um spring para suavizar o movimento com configurações otimizadas
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    // Adicionar massa para um comportamento mais natural
    mass: 0.5,
  });

  // Adicionamos smooth scroll nativo com CSS uma só vez na montagem do componente
  useEffect(() => {
    // Verificar se o navegador suporta scroll behavior
    if ('scrollBehavior' in document.documentElement.style) {
      // Verificar preferências do sistema para movimento reduzido
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      // Apenas aplicar scroll suave se o usuário não preferir movimento reduzido
      if (!prefersReducedMotion) {
        document.documentElement.style.scrollBehavior = 'smooth';

        // Adicionar uma classe para otimizações CSS
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
    <>
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
    </>
  );
});

SmoothScrollImpl.displayName = 'SmoothScrollImpl';

export default SmoothScroll;
