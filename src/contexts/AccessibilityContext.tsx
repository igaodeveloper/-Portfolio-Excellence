import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  isHighContrastMode: boolean;
  toggleHighContrastMode: () => void;
  isVoiceEnabled: boolean;
  toggleVoiceCommands: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [isHighContrastMode, setIsHighContrastMode] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize speech recognition if browser supports it
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const newRecognition = new SpeechRecognition();
      
      newRecognition.continuous = true;
      newRecognition.interimResults = false;
      
      newRecognition.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        
        if (command.includes('mostrar projetos')) {
          // Dispatch a custom event that the WelcomeScreen will listen to
          window.dispatchEvent(new CustomEvent('showProjects'));
        }
      };
      
      setRecognition(newRecognition);
    }
  }, []);

  const toggleVoiceCommands = () => {
    if (recognition) {
      if (isVoiceEnabled) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsVoiceEnabled(!isVoiceEnabled);
    }
  };

  const toggleHighContrastMode = () => {
    setIsHighContrastMode(!isHighContrastMode);
    document.documentElement.classList.toggle('high-contrast');
  };

  return (
    <AccessibilityContext.Provider
      value={{
        isHighContrastMode,
        toggleHighContrastMode,
        isVoiceEnabled,
        toggleVoiceCommands,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
} 