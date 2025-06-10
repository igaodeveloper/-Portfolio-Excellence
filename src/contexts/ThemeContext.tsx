import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const themes = [
  { name: 'Moderno', class: 'theme-modern', color: '#00d2df' },
  { name: 'Escuro', class: 'theme-dark', color: '#22223b' },
  { name: 'Claro', class: 'theme-light', color: '#f8f8f8' },
];

type Theme = typeof themes[number]['class'];

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: typeof themes;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem('theme') as Theme) || 'theme-modern',
  );

  useEffect(() => {
    document.body.classList.remove(...themes.map((t) => t.class));
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
} 