import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const themes = [
  { name: 'Moderno', class: 'theme-modern', color: '#00d2df' },
  { name: 'Escuro', class: 'theme-dark', color: '#22223b' },
  { name: 'Claro', class: 'theme-light', color: '#f8f8f8' },
];

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'theme-modern',
  );

  useEffect(() => {
    document.body.classList.remove(...themes.map((t) => t.class));
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

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
