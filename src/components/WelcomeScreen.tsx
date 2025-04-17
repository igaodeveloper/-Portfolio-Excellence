import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useAmbientSound } from '../hooks/useAmbientSound';
import { FloatingIcon } from './ui/floating-icon';
import { VolumeIcon, VolumeXIcon, MicIcon, SunIcon } from 'lucide-react';
import '../styles/global.css';

const keywords = ["Design", "Performance", "UX", "Clean Code", "React", "Next.js"];

const WelcomeScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const { isHighContrastMode, toggleHighContrastMode, isVoiceEnabled, toggleVoiceCommands } = useAccessibility();
  const { isPlaying, toggleSound } = useAmbientSound();
  const fullText = "Olá, sou Igor — desenvolvedor front-end apaixonado por criar experiencias digitais impactantes"

  // Handle portfolio navigation
  const handlePortfolioClick = () => {
    onComplete(); // Keep the original onComplete callback
    // Smooth scroll to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Rotating keywords
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % keywords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Listen for voice commands
  useEffect(() => {
    const handleShowProjects = () => {
      onComplete();
    };
    window.addEventListener('showProjects', handleShowProjects);
    return () => window.removeEventListener('showProjects', handleShowProjects);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50 overflow-hidden ${
        isHighContrastMode ? 'high-contrast' : ''
      }`}
    >
      {/* Background particles */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, Math.random() * 20 - 10],
              y: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random(),
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Accessibility Controls */}
      <div className="fixed top-8 right-8 flex items-center space-x-4 z-50">
        <FloatingIcon
          icon={isVoiceEnabled ? <MicIcon className="text-blue-400" /> : <MicIcon className="text-gray-400" />}
          onClick={toggleVoiceCommands}
          className="p-2 bg-white/5 backdrop-blur-sm rounded-full hover:bg-white/10"
        />
        <FloatingIcon
          icon={isPlaying ? <VolumeIcon className="text-blue-400" /> : <VolumeXIcon className="text-gray-400" />}
          onClick={toggleSound}
          className="p-2 bg-white/5 backdrop-blur-sm rounded-full hover:bg-white/10"
        />
        <FloatingIcon
          icon={<SunIcon className={isHighContrastMode ? "text-blue-400" : "text-gray-400"} />}
          onClick={toggleHighContrastMode}
          className="p-2 bg-white/5 backdrop-blur-sm rounded-full hover:bg-white/10"
        />
      </div>

      <div className="h-full flex flex-col items-center justify-center px-6 md:px-12">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 mb-12 relative"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-1">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img 
                src="/public/avatar.png"
                alt="Igor - Frontend Developer" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          {/* Typed Introduction */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-400 font-light terminal-text"
          >
            {typedText}
            <span className="animate-blink">_</span>
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold"
          >
            <span className="bg-gradient-to-r from-white to-white/60 text-transparent bg-clip-text">
              construo experiências digitais
            </span>{" "}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">
              absurdamente boas
            </span>
          </motion.h1>

          {/* Rotating keywords */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="h-8 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentKeyword}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-xl text-gray-400"
              >
                Especialista em {keywords[currentKeyword]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-8"
          >
            <motion.button
              onClick={handlePortfolioClick}
              className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-500 rounded-full 
                       hover:from-blue-600 hover:to-teal-600 transform transition-all duration-300 
                       shadow-lg hover:shadow-xl shadow-blue-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explorar Portfólio
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400">Scroll</span>
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center pt-2"
            >
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .high-contrast {
          filter: contrast(150%) brightness(120%);
        }
        .terminal-text {
          font-family: 'Fira Code', monospace;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default WelcomeScreen; 