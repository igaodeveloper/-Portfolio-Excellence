import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';

// UI para gerar ideias de projetos fictícios com IA
const ProjectAIWizard: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

    // Função que faz chamada real à API do GPT-4 via rota local
  const generateIdea = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:3001/api/openai'
        : '/api/openai';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro desconhecido');
      }
      const data = await response.json();
      setResult(data.idea);
    } catch (e: any) {
      setError(e.message || 'Erro ao gerar a ideia. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto my-16 p-8 bg-modern-dark/60 rounded-2xl border border-modern-accent/20 shadow-lg">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-modern-accent">
        <Sparkles size={28} /> Gerador de Projetos Interativos (IA)
      </h2>
      <p className="mb-6 text-modern-gray">
        Gere uma ideia de projeto fictícia e veja como eu a desenvolveria! Experimente temas diferentes ou deixe a IA surpreender você.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Tema ou área de interesse (opcional)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1"
          disabled={loading}
        />
        <Button
          onClick={generateIdea}
          disabled={loading}
          className="bg-modern-accent text-modern-dark hover:bg-modern-accent/90 transition-all"
        >
          {loading ? 'Gerando...' : 'Gerar Ideia'}
        </Button>
      </div>
      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="bg-modern-accent/10 border border-modern-accent/20 rounded-xl p-6 mt-4 shadow-md"
          >
            <pre className="whitespace-pre-wrap text-modern-white text-lg font-mono">
              {result}
            </pre>
          </motion.div>
        )}
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="bg-red-800/40 border border-red-400/20 rounded-xl p-4 mt-4"
          >
            <span className="text-red-300">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectAIWizard;
