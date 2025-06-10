import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
    <motion.h1
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-7xl font-extrabold text-modern-accent mb-4"
    >
      404
    </motion.h1>
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-2xl mb-6 text-modern-white"
    >
      Página não encontrada!
    </motion.p>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-modern-accent text-white font-semibold shadow-lg hover:bg-modern-accent/90 transition-colors"
      >
        Voltar para Home
      </Link>
    </motion.div>
  </div>
);

export default NotFoundPage; 