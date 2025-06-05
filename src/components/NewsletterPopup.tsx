import { useEffect, useState } from 'react';
import { Mail, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToMailchimp } from '@/services/mailchimp';

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 6000); // Exibe após 6s
    return () => clearTimeout(timer);
  }, []);

  // Não mostrar novamente se já foi fechado nesta sessão
  useEffect(() => {
    if (open) {
      sessionStorage.setItem('newsletter_popup_shown', '1');
    }
  }, [open]);

  useEffect(() => {
    if (sessionStorage.getItem('newsletter_popup_shown')) {
      setOpen(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await subscribeToMailchimp(form.name, form.email);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setForm({ name: '', email: '' });
    } else {
      setError(result.message);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
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
              <Mail className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-lg text-blue-700 dark:text-white">Newsletter</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-white">Receba dicas exclusivas!</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">
              Inscreva-se e receba novidades, tutoriais e conteúdos exclusivos sobre desenvolvimento web diretamente no seu e-mail.
            </p>
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-6 text-center"
              >
                <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                <h4 className="text-lg font-bold text-blue-700 dark:text-white mb-1">Inscrição realizada!</h4>
                <p className="text-gray-700 dark:text-gray-300 max-w-xs">
                  Obrigado por se inscrever. Em breve você receberá novidades no seu e-mail!
                </p>
              </motion.div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="popup-name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Nome</label>
                  <Input
                    id="popup-name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="popup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">E-mail</label>
                  <Input
                    id="popup-email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Enviando...' : (
                    <span className="flex items-center justify-center gap-2">
                      <Mail className="w-5 h-5" /> Assinar
                    </span>
                  )}
                </Button>
                {error && (
                  <div className="text-red-600 text-sm text-center mb-2">{error}</div>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup; 