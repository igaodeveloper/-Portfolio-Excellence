import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface PageTransitionProps {
  children: ReactNode;
  type?: keyof typeof variants;
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  },
  morph: {
    initial: { borderRadius: '50%', scale: 0.8, opacity: 0 },
    animate: { borderRadius: '0%', scale: 1, opacity: 1 },
    exit: { borderRadius: '50%', scale: 0.8, opacity: 0 },
  },
  portal: {
    initial: { scale: 0.7, rotate: 20, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 0.7, rotate: -20, opacity: 0 },
  },
  glitch: {
    initial: { x: 0, opacity: 0 },
    animate: { x: [0, -10, 10, -10, 10, 0], opacity: 1 },
    exit: { x: 0, opacity: 0 },
    transition: { duration: 0.7, times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
  },
};

const PageTransition = ({ children, type = 'fade' }: PageTransitionProps) => {
  const location = useLocation();
  const { reducedMotion } = useAccessibility?.() || { reducedMotion: false };

  // If reduced motion is preferred, render without animations
  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={type}
        initial={variants[type].initial}
        animate={variants[type].animate}
        exit={variants[type].exit}
        transition={
          type === 'glitch'
            ? variants.glitch.transition
            : { duration: 0.6, ease: 'easeInOut' }
        }
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
