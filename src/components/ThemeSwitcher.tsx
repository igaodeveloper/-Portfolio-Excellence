import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeSwitcher = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="flex gap-2 items-center">
      {themes.map((t) => (
        <motion.button
          key={t.class}
          className={`w-8 h-8 rounded-full border-2 ${theme === t.class ? 'border-modern-accent' : 'border-gray-300'}`}
          style={{ background: t.color }}
          onClick={() => setTheme(t.class)}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: theme === t.class ? 1.2 : 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          aria-label={`Tema ${t.name}`}
        />
      ))}
    </div>
  );
};
