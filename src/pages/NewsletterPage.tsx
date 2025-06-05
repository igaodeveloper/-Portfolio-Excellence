import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatedTitle } from '@/components/ui/animated-text';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { subscribeToMailchimp } from '@/services/mailchimp';

const NewsletterPage = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-gray-900">
      <Navbar />
      <main className="flex items-center justify-center flex-1 px-4 py-16">
        <div className="w-full max-w-md p-8 mx-auto shadow-lg bg-white/90 dark:bg-gray-900/90 rounded-xl">
          <AnimatedTitle text="Assine a Newsletter" className="mb-4 text-3xl font-bold text-center text-blue-700 dark:text-white" />
          <p className="mb-8 text-center text-gray-700 dark:text-gray-300">
            Receba novidades, dicas e conteúdos exclusivos sobre desenvolvimento web diretamente no seu e-mail.
          </p>
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <CheckCircle className="mb-4 text-green-500 w-14 h-14" />
              <h3 className="mb-2 text-xl font-bold text-blue-700 dark:text-white">Inscrição realizada!</h3>
              <p className="max-w-xs text-gray-700 dark:text-gray-300">
                Obrigado por se inscrever. Em breve você receberá novidades no seu e-mail!
              </p>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Nome</label>
                <Input
                  id="name"
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
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">E-mail</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              {error && (
                <div className="mb-4 text-sm text-center text-red-600">{error}</div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Enviando...' : (
                  <span className="flex items-center justify-center gap-2">
                    <Mail className="w-5 h-5" /> Assinar
                  </span>
                )}
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsletterPage; 