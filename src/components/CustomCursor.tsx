import { useEffect, useState, memo, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useAccessibility } from '../contexts/AccessibilityContext';

const CustomCursor = () => {
  const { reducedMotion } = useAccessibility?.() || { reducedMotion: false };

  // Não renderizar o cursor personalizado se o modo de movimento reduzido estiver ativado
  if (reducedMotion) {
    return null;
  }

  // Detecta se estamos em um dispositivo móvel
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return (
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      window.matchMedia('(max-width: 768px)').matches
    );
  }, []);

  // Não renderiza o cursor personalizado em dispositivos móveis
  if (isMobile) {
    return null;
  }

  return <CursorImpl />;
};

// Componente implementador separado para evitar re-renderizações
const CursorImpl = memo(() => {
  const [cursorVariant, setCursorVariant] = useState('default');
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Configurações de spring mais eficientes
  const springConfig = useMemo(
    () => ({
      damping: 25,
      stiffness: 300,
      mass: 0.5,
    }),
    [],
  );

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Variantes memorizadas para evitar recriação a cada renderização
  const variants = useMemo(
    () => ({
      default: {
        height: 32,
        width: 32,
        backgroundColor: 'rgba(0, 210, 223, 0.2)',
        border: '1px solid rgba(0, 210, 223, 0.4)',
        scale: 1,
      },
      hover: {
        height: 48,
        width: 48,
        backgroundColor: 'rgba(0, 210, 223, 0.3)',
        border: '2px solid rgba(0, 210, 223, 0.6)',
        scale: 1.2,
      },
      click: {
        height: 24,
        width: 24,
        backgroundColor: 'rgba(0, 210, 223, 0.5)',
        border: '2px solid rgba(0, 210, 223, 0.8)',
        scale: 0.8,
      },
    }),
    [],
  );

  useEffect(() => {
    let rafId: number;
    let lastX = -100;
    let lastY = -100;

    const moveCursor = (e: MouseEvent) => {
      // Cancelar o último frame de animação
      if (rafId) cancelAnimationFrame(rafId);

      // Usar requestAnimationFrame para limitar atualizações
      rafId = requestAnimationFrame(() => {
        // Apenas atualizar se o movimento for significativo (mais de 1px)
        if (
          Math.abs(e.clientX - lastX) > 1 ||
          Math.abs(e.clientY - lastY) > 1
        ) {
          cursorX.set(e.clientX);
          cursorY.set(e.clientY);
          lastX = e.clientX;
          lastY = e.clientY;
        }
      });
    };

    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');
    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => setCursorVariant('default');

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    // Usar seletores mais específicos para elementos interativos
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      el.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    });

    // Add custom-cursor class to body
    document.body.classList.add('custom-cursor');

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });

      // Remove custom-cursor class from body
      document.body.classList.remove('custom-cursor');
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="cursor-outer fixed pointer-events-none z-50"
        animate={cursorVariant}
        variants={variants}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          top: -16,
          left: -16,
          borderRadius: '50%',
          mixBlendMode: 'difference',
          willChange: 'transform',
          translateZ: 0,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
        }}
      />
      <motion.div
        className="cursor-inner fixed pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          backgroundColor: 'rgba(0, 210, 223, 1)',
          borderRadius: '50%',
          mixBlendMode: 'difference',
          willChange: 'transform',
          translateZ: 0,
        }}
      />
    </>
  );
});

CursorImpl.displayName = 'CursorImpl';

export default CustomCursor;
