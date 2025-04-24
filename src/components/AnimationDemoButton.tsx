import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnimationDemoButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the button after a delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/animation-demo"
            className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <span className="animate-ping absolute h-3 w-3 rounded-full bg-pink-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-400"></span>
            <span className="font-medium">Explorar Animações</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimationDemoButton;
