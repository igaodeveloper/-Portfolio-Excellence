import { ReactNode, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade' | 'slide' | 'zoom' | 'flip' | 'rotate';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

const ScrollReveal = ({
  children,
  animation = 'fade',
  direction = 'up',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
  className = '',
}: ScrollRevealProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: threshold, once });
  const { reducedMotion } = useAccessibility?.() || { reducedMotion: false };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  // If reduced motion is preferred, render without animations
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Animation variants
  const getVariants = (): Variants => {
    const baseTransition = {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    };

    const getDirectionOffset = () => {
      switch (direction) {
        case 'up':
          return { y: 40 };
        case 'down':
          return { y: -40 };
        case 'left':
          return { x: 40 };
        case 'right':
          return { x: -40 };
        default:
          return { y: 40 };
      }
    };

    switch (animation) {
      case 'fade':
        return {
          hidden: { opacity: 0, ...getDirectionOffset() },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: baseTransition,
          },
        };
      case 'slide':
        return {
          hidden: { ...getDirectionOffset(), opacity: 0 },
          visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              ...baseTransition,
              type: 'spring',
              stiffness: 100,
              damping: 20,
            },
          },
        };
      case 'zoom':
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: baseTransition,
          },
        };
      case 'flip':
        return {
          hidden: {
            rotateX: direction === 'up' || direction === 'down' ? 90 : 0,
            rotateY: direction === 'left' || direction === 'right' ? 90 : 0,
            opacity: 0,
          },
          visible: {
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
            transition: {
              ...baseTransition,
              type: 'spring',
              stiffness: 100,
              damping: 20,
            },
          },
        };
      case 'rotate':
        return {
          hidden: {
            rotate: direction === 'left' ? 15 : -15,
            opacity: 0,
            scale: 0.9,
          },
          visible: {
            rotate: 0,
            opacity: 1,
            scale: 1,
            transition: baseTransition,
          },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition },
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      className={className}
      style={{
        willChange: 'transform, opacity',
        transformStyle: animation === 'flip' ? 'preserve-3d' : undefined,
        perspective: animation === 'flip' ? '1000px' : undefined,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
