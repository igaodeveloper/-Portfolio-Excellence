import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface PageTransitionProps {
  children: ReactNode;
  transitionType?: 'fade' | 'slide' | 'scale' | 'flip' | 'reveal';
}

const PageTransition = ({
  children,
  transitionType = 'fade',
}: PageTransitionProps) => {
  const location = useLocation();
  const { reducedMotion } = useAccessibility?.() || { reducedMotion: false };

  // If reduced motion is preferred, render without animations
  if (reducedMotion) {
    return <>{children}</>;
  }

  // Different animation variants
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
      exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    },
    slide: {
      initial: { x: '100%', opacity: 0 },
      animate: {
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          type: 'spring',
          stiffness: 100,
          damping: 20,
        },
      },
      exit: {
        x: '-100%',
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: 'easeInOut',
        },
      },
    },
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.5,
          type: 'spring',
          stiffness: 100,
          damping: 20,
        },
      },
      exit: {
        scale: 0.8,
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: 'easeInOut',
        },
      },
    },
    flip: {
      initial: { rotateY: 90, opacity: 0 },
      animate: {
        rotateY: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
        },
      },
      exit: {
        rotateY: -90,
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: 'easeIn',
        },
      },
    },
    reveal: {
      initial: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
      animate: {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
      exit: {
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        transition: {
          duration: 0.3,
          ease: 'easeInOut',
        },
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={variants[transitionType].initial}
        animate={variants[transitionType].animate}
        exit={variants[transitionType].exit}
        className="w-full min-h-screen"
        style={{
          willChange: 'transform, opacity',
          transformStyle: 'preserve-3d',
          perspective: '1200px',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
