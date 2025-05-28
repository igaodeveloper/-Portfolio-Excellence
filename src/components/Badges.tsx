import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaTrophy } from 'react-icons/fa';

const badges = [
  { icon: <FaGithub />, label: 'Top 5% GitHub', color: 'bg-gray-800' },
  { icon: <FaStar />, label: '100+ Commits', color: 'bg-yellow-500' },
  { icon: <FaTrophy />, label: 'Projetos Destaque', color: 'bg-modern-accent' },
];

export const Badges = () => (
  <div className="flex gap-4 flex-wrap py-4">
    {badges.map((b, i) => (
      <motion.div
        key={b.label}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold shadow ${b.color}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
      >
        {b.icon}
        {b.label}
      </motion.div>
    ))}
  </div>
); 