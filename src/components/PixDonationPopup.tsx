import { useEffect, useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const PIX_KEY = '11982928508';

const PixDonationPopup = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 12000); // Exibe após 12s
    return () => clearTimeout(timer);
  }, []);

  // Não mostrar novamente se já foi fechado nesta sessão
  useEffect(() => {
    if (open) {
      sessionStorage.setItem('pix_popup_shown', '1');
    }
  }, [open]);

  useEffect(() => {
    if (sessionStorage.getItem('pix_popup_shown')) {
      setOpen(false);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[101] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 mx-4"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="font-bold text-lg text-green-700 dark:text-white">Apoie este projeto!</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-700 dark:text-white">Faça uma doação via Pix</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">
              Se este conteúdo te ajudou, considere apoiar com qualquer valor via Pix. Sua contribuição faz a diferença!
            </p>
            <div className="flex flex-col items-center mb-4">
              <span className="font-mono text-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg select-all mb-2">{PIX_KEY}</span>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                onClick={handleCopy}
              >
                {copied ? (
                  <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Copiado!</span>
                ) : (
                  'Copiar chave Pix'
                )}
              </Button>
            </div>
            <span className="block text-xs text-gray-400 mt-1 text-center">Muito obrigado pelo seu apoio! 🙏</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PixDonationPopup; 