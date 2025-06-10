import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../lib/useScrollAnimation';
import { useMemo } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const AnimatedSection = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.5,
  staggerChildren = false,
  staggerDelay = 0.1,
}: AnimatedSectionProps) => {
  const { ref, controls, variants } = useScrollAnimation({
    direction,
    delay,
    duration,
    triggerOnce: true,
    threshold: 0.1,
  });

  const isMobile = useMemo(() => typeof window !== 'undefined' && (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768), []);
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  if (staggerChildren) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;

// Componente para elementos filhos em animações escalonadas
export const AnimatedItem = ({
  children,
  direction = 'up',
  className = '',
  delay = 0,
  duration = 0.5,
}: Omit<AnimatedSectionProps, 'staggerChildren' | 'staggerDelay'>) => {
  const distance = 50;

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x:
        direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};
