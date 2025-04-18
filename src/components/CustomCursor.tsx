import { useEffect, useState, memo, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useAccessibility } from '../contexts/AccessibilityContext';

const CustomCursor = () => {
  const { reducedMotion } = useAccessibility?.() || { reducedMotion: false };

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return (
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      window.matchMedia('(max-width: 768px)').matches
    );
  }, []);

  if (reducedMotion || isMobile) return null;
  return <CursorImpl />;
};

const CursorImpl = memo(() => {
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'click'>('default');
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = useMemo(() => ({ damping: 24, stiffness: 320, mass: 0.4 }), []);
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const variants = useMemo(() => ({
    default: {
      height: 36,
      width: 36,
      backgroundColor: 'rgba(0, 210, 223, 0.15)',
      border: '1.5px solid rgba(0, 210, 223, 0.5)',
      scale: 1,
    },
    hover: {
      height: 52,
      width: 52,
      backgroundColor: 'rgba(0, 210, 223, 0.25)',
      border: '2px solid rgba(0, 210, 223, 0.7)',
      scale: 1.2,
    },
    click: {
      height: 20,
      width: 20,
      backgroundColor: 'rgba(0, 210, 223, 0.6)',
      border: '2.5px solid rgba(0, 210, 223, 0.9)',
      scale: 0.8,
    },
  }), []);

  useEffect(() => {
    let rafId: number;
    let lastX = -100;
    let lastY = -100;

    const moveCursor = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (Math.abs(e.clientX - lastX) > 1 || Math.abs(e.clientY - lastY) > 1) {
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

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      el.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    });

    document.body.classList.add('custom-cursor');

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.body.classList.remove('custom-cursor');
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="cursor-outer fixed pointer-events-none z-[9999]"
        animate={cursorVariant}
        variants={variants}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          top: '-50%',
          left: '-50%',
          borderRadius: '9999px',
          mixBlendMode: 'difference',
          willChange: 'transform',
          translateZ: 0,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 320 }}
      />

      <motion.div
        className="cursor-inner fixed pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          backgroundColor: '#00D2DF',
          borderRadius: '9999px',
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
