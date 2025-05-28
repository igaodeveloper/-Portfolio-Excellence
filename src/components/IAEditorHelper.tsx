import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

export const IAEditorHelper = ({ code }: { code: string }) => {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAskIA = () => {
    setLoading(true);
    setTimeout(() => {
      setSuggestion('Sugestão IA: Considere adicionar comentários explicativos e otimizar loops para melhor performance.');
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="my-4">
      <motion.button
        onClick={handleAskIA}
        className="flex items-center gap-2 px-4 py-2 bg-modern-accent text-white rounded shadow hover:scale-105 transition"
        whileTap={{ scale: 0.95 }}
        disabled={loading}
      >
        <FaRobot /> {loading ? 'Analisando...' : 'Pedir sugestão IA'}
      </motion.button>
      {suggestion && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded"
        >
          {suggestion}
        </motion.div>
      )}
    </div>
  );
}; 