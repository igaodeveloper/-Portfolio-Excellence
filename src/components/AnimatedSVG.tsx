import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedSVG = () => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial="hidden"
    animate="visible"
  >
    <motion.circle
      cx="24"
      cy="24"
      r="20"
      stroke="#00d2df"
      strokeWidth="4"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 1.2, ease: 'easeInOut' },
        },
      }}
    />
    <motion.path
      d="M16 24l6 6 10-10"
      stroke="#00d2df"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 1, delay: 0.7, ease: 'easeInOut' },
        },
      }}
    />
  </motion.svg>
);
