import React from 'react';
import { motion } from 'framer-motion';

const circleVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1.2,
      ease: 'linear',
    },
  },
};

const Loader = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[120px]">
    <motion.div
      className="w-16 h-16 border-4 border-modern-accent border-t-transparent rounded-full"
      variants={circleVariants}
      animate="animate"
    />
  </div>
);

export default Loader; 