import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export const AnimatedButton = ({
  children,
  ...props
}: HTMLMotionProps<'button'>) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 300 }}
    {...props}
  >
    {children}
  </motion.button>
);

export const SkeletonLoader = ({
  width = '100%',
  height = 24,
  className = '',
}) => (
  <motion.div
    className={`bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    style={{ width, height }}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.2, repeat: Infinity }}
  />
);
