import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const themes = [
  { name: 'Moderno', class: '', color: '#00d2df' }, // Removed theme-modern class
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
    (localStorage.getItem('theme') as Theme) || '', // Removed theme-modern default theme
  );

  useEffect(() => {
    // Remove all existing theme classes
    themes.forEach(themeObj => {
      if (themeObj.class) {
        document.body.classList.remove(themeObj.class);
      }
    });
    
    // Add the new theme class if it exists
    if (theme) {
      document.body.classList.add(theme);
    }
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