import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';

// This component creates a hidden admin button that only appears with a specific key combination
const HiddenAdminButton = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  // Detect secret key combination (Shift + Alt + A)
  useEffect(() => {
    const keys = {
      shift: false,
      alt: false,
      a: false,
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Update key states
      if (e.key === 'Shift') keys.shift = true;
      if (e.key === 'Alt') keys.alt = true;
      if (e.key.toLowerCase() === 'a') keys.a = true;

      // Check if all keys are pressed
      if (keys.shift && keys.alt && keys.a) {
        setShowButton(true);

        // Hide button after 3 seconds if not clicked
        setTimeout(() => {
          setShowButton(false);
        }, 3000);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Reset key states
      if (e.key === 'Shift') keys.shift = false;
      if (e.key === 'Alt') keys.alt = false;
      if (e.key.toLowerCase() === 'a') keys.a = false;
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  if (!showButton) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 bg-black/50 hover:bg-primary/80 p-2 rounded-full shadow-lg cursor-pointer transition-all duration-300"
      onClick={() => {
        navigate('/admin/login');
        setShowButton(false);
      }}
      title="Acesso Administrativo"
    >
      <KeyRound className="w-5 h-5 text-white" />
    </div>
  );
};

export default HiddenAdminButton;
