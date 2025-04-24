import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface AdvancedPageTransitionProps {
  children: ReactNode;
  transitionType?: 'morph' | 'stagger' | 'wave' | 'portal' | 'glitch';
}

const AdvancedPageTransition = ({
  children,
  transitionType = 'morph',
}: AdvancedPageTransitionProps) => {
  const location = useLocation();
  const { reducedMotion } = useAccessibility?.() || { reducedMotion: false };
  const [exitComplete, setExitComplete] = useState(true);

  // If reduced motion is preferred, render without animations
  if (reducedMotion) {
    return <>{children}</>;
  }

  // Morph transition with blob effect
  const morphVariants = {
    initial: {
      borderRadius: '100% 0% 100% 0% / 0% 100% 0% 100%',
      scale: 0,
      opacity: 0,
    },
    animate: {
      borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%',
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
    exit: {
      borderRadius: '0% 100% 0% 100% / 100% 0% 100% 0%',
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
  };

  // Staggered animation for content blocks
  const staggerContainer = {
    initial: { opacity: 1 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const staggerItem = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  // Wave transition
  const waveVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Portal transition
  const portalVariants = {
    initial: {
      scale: 0,
      rotate: -20,
      opacity: 0,
      filter: 'blur(10px)',
    },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
    exit: {
      scale: 1.1,
      rotate: 10,
      opacity: 0,
      filter: 'blur(10px)',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  // Glitch transition
  const glitchVariants = {
    initial: { opacity: 0, filter: 'brightness(2) contrast(2)' },
    animate: {
      opacity: 1,
      filter: 'brightness(1) contrast(1)',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      filter: 'brightness(2) contrast(2)',
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  // Wave effect overlay
  const WaveOverlay = () => {
    return (
      <motion.div
        className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-modern-accent"
            style={{
              scaleY: 0.2,
              originY: i % 2 === 0 ? 0 : 1,
            }}
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: 0,
              transition: {
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.6, 0.01, 0.05, 0.95],
              },
            }}
            exit={{
              scaleY: 1,
              transition: {
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.6, 0.01, 0.05, 0.95],
              },
            }}
          />
        ))}
      </motion.div>
    );
  };

  // Glitch effect overlay
  const GlitchOverlay = () => {
    return (
      <motion.div
        className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden bg-black mix-blend-difference"
        style={{ mixBlendMode: 'difference' }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.1, 0.2, 0],
          x: [0, -5, 5, 0],
          transition: {
            duration: 0.3,
            repeat: 2,
            repeatType: 'mirror',
          },
        }}
        exit={{
          opacity: [0, 0.1, 0.2, 0],
          x: [0, 5, -5, 0],
          transition: {
            duration: 0.3,
            repeat: 2,
            repeatType: 'mirror',
          },
        }}
      />
    );
  };

  const renderChildrenWithVariants = () => {
    switch (transitionType) {
      case 'morph':
        return (
          <motion.div
            key={location.pathname}
            variants={morphVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full min-h-screen"
            style={{ willChange: 'transform, opacity, border-radius' }}
          >
            {children}
          </motion.div>
        );
      case 'stagger':
        return (
          <motion.div
            key={location.pathname}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full min-h-screen"
          >
            <motion.div variants={staggerItem} className="stagger-content">
              {children}
            </motion.div>
          </motion.div>
        );
      case 'wave':
        return (
          <>
            <motion.div
              key={location.pathname}
              variants={waveVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full min-h-screen"
            >
              {children}
            </motion.div>
            {!exitComplete && <WaveOverlay />}
          </>
        );
      case 'portal':
        return (
          <motion.div
            key={location.pathname}
            variants={portalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full min-h-screen origin-center"
            style={{
              willChange: 'transform, opacity, filter',
              transformStyle: 'preserve-3d',
              perspective: '1500px',
            }}
          >
            {children}
          </motion.div>
        );
      case 'glitch':
        return (
          <>
            <motion.div
              key={location.pathname}
              variants={glitchVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full min-h-screen"
              style={{ willChange: 'opacity, filter' }}
            >
              {children}
            </motion.div>
            {!exitComplete && <GlitchOverlay />}
          </>
        );
      default:
        return children;
    }
  };

  // Using useEffect to update exitComplete when location changes
  useEffect(() => {
    setExitComplete(false);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setExitComplete(true)}>
      {renderChildrenWithVariants()}
    </AnimatePresence>
  );
};

export default AdvancedPageTransition;
