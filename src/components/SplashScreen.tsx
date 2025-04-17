import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(onComplete, 1000);
            }, 500);
            return 100;
          }
          return prev + 1;
        });
      }, 20);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121214]"
        >
          <div className="flex flex-col items-center max-w-4xl text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                delay: 0.2, 
                duration: 0.8 
              }}
              className="relative mb-8"
            >
              <motion.div 
                className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"
                animate={{
                  background: [
                    "linear-gradient(to right, #8B5CF6, #EC4899, #EF4444)",
                    "linear-gradient(to right, #3B82F6, #10B981, #F59E0B)",
                    "linear-gradient(to right, #8B5CF6, #EC4899, #EF4444)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                PORTFOLIO
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-2 text-xl md:text-2xl text-gray-400"
              >
                Bem-vindo ao meu universo criativo
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ duration: 0.5, delay: 1 }}
              className="w-4/5 max-w-md relative h-1 bg-gray-800 rounded-full overflow-hidden mb-4"
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"
                style={{ width: `${progress}%` }}
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-gray-400 text-sm"
            >
              {progress === 100 ? "Pronto!" : "Carregando..."}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: progress === 100 ? 1 : 0, 
                y: progress === 100 ? 0 : 50 
              }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onComplete, 500);
                }}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full font-medium text-white shadow-lg"
              >
                Explorar Agora
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: 0.1 + Math.random() * 0.3
                }}
                animate={{
                  y: [null, "-100vh"],
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
                style={{
                  width: 2 + Math.random() * 4,
                  height: 2 + Math.random() * 4,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 