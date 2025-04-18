import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface AccessibilityContextType {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  largerText: boolean;
  toggleLargerText: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(
  null,
);

export const useAccessibility = () => useContext(AccessibilityContext);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider = ({
  children,
}: AccessibilityProviderProps) => {
  // Verificar preferências do sistema e valores salvos no armazenamento local
  const getInitialReducedMotion = () => {
    // Verificar se há uma preferência salva
    const savedPreference = localStorage.getItem('reducedMotion');
    if (savedPreference !== null) {
      return savedPreference === 'true';
    }
    // Caso contrário, usar preferência de mídia do sistema
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const getInitialHighContrast = () => {
    // Verificar se há uma preferência salva
    const savedPreference = localStorage.getItem('highContrast');
    if (savedPreference !== null) {
      return savedPreference === 'true';
    }
    // Caso contrário, usar preferência de mídia do sistema
    return window.matchMedia('(prefers-contrast: more)').matches;
  };

  const getInitialLargerText = () => {
    // Verificar se há uma preferência salva
    const savedPreference = localStorage.getItem('largerText');
    if (savedPreference !== null) {
      return savedPreference === 'true';
    }
    return false;
  };

  // Estados para preferências de acessibilidade
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [largerText, setLargerText] = useState<boolean>(false);

  // Inicializar os estados depois da montagem do componente para evitar erros de SSR
  useEffect(() => {
    setReducedMotion(getInitialReducedMotion());
    setHighContrast(getInitialHighContrast());
    setLargerText(getInitialLargerText());
  }, []);

  // Funções para alternar as preferências
  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    localStorage.setItem('reducedMotion', String(newValue));

    // Aplicar classe ao corpo do documento
    if (newValue) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('highContrast', String(newValue));

    // Aplicar classe ao corpo do documento
    if (newValue) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  const toggleLargerText = () => {
    const newValue = !largerText;
    setLargerText(newValue);
    localStorage.setItem('largerText', String(newValue));

    // Aplicar classe ao corpo do documento
    if (newValue) {
      document.body.classList.add('larger-text');
    } else {
      document.body.classList.remove('larger-text');
    }
  };

  // Aplicar classes iniciais baseadas nas preferências (após a montagem do componente)
  useEffect(() => {
    if (reducedMotion) document.body.classList.add('reduced-motion');
    if (highContrast) document.body.classList.add('high-contrast');
    if (largerText) document.body.classList.add('larger-text');

    // Limpeza quando o componente é desmontado
    return () => {
      document.body.classList.remove('reduced-motion');
      document.body.classList.remove('high-contrast');
      document.body.classList.remove('larger-text');
    };
  }, [reducedMotion, highContrast, largerText]);

  // Observar mudanças nas preferências do sistema
  useEffect(() => {
    const reducedMotionMediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    const highContrastMediaQuery = window.matchMedia(
      '(prefers-contrast: more)',
    );

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      // Apenas atualizar se não houver uma preferência explícita salva
      if (localStorage.getItem('reducedMotion') === null) {
        setReducedMotion(e.matches);
      }
    };

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      // Apenas atualizar se não houver uma preferência explícita salva
      if (localStorage.getItem('highContrast') === null) {
        setHighContrast(e.matches);
      }
    };

    // Adicionar event listeners para mudanças nas preferências do sistema
    reducedMotionMediaQuery.addEventListener(
      'change',
      handleReducedMotionChange,
    );
    highContrastMediaQuery.addEventListener('change', handleHighContrastChange);

    // Limpeza
    return () => {
      reducedMotionMediaQuery.removeEventListener(
        'change',
        handleReducedMotionChange,
      );
      highContrastMediaQuery.removeEventListener(
        'change',
        handleHighContrastChange,
      );
    };
  }, []);

  const value = {
    reducedMotion,
    toggleReducedMotion,
    highContrast,
    toggleHighContrast,
    largerText,
    toggleLargerText,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
