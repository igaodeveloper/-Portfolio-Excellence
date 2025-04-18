import { Variants } from 'framer-motion';

// Variantes para entradas suaves
export const fadeIn = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  delay: number = 0,
): Variants => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 80,
        delay,
        duration: 0.5,
      },
    },
  };
};

// Variantes para efeito de destaque
export const highlightVariants: Variants = {
  initial: { backgroundColor: 'rgba(0, 210, 223, 0)' },
  hover: {
    backgroundColor: 'rgba(0, 210, 223, 0.1)',
    transition: { duration: 0.3 },
  },
};

// Variantes para efeito de escala
export const scaleVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

// Variantes para cards
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 10,
    },
  },
  hover: {
    y: -10,
    boxShadow: '0 10px 20px rgba(0, 210, 223, 0.1)',
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
};

// Efeito stagger para itens em lista
export const staggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0,
): Variants => {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

// Variantes para texto (letra por letra)
export const textVariant = (delay: number = 0): Variants => {
  return {
    hidden: {
      y: 20,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
        delay,
      },
    },
  };
};

// Variantes para texto de typing
export const textContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const textCharacter: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 10,
    },
  },
};

// Variantes para efeito de rolagem
export const scrollVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

// Variantes para efeito de borda
export const borderVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Efeito de ondulação
export const pulseVariants: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

// Efeito de brilho
export const glowVariants: Variants = {
  initial: { boxShadow: '0 0 0 rgba(0, 210, 223, 0)' },
  animate: {
    boxShadow: [
      '0 0 0 rgba(0, 210, 223, 0)',
      '0 0 20px rgba(0, 210, 223, 0.5)',
      '0 0 0 rgba(0, 210, 223, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};
