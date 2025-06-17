import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const EXAMPLES = [
  'Como começo com React?',
  'Como faço deploy de um site?',
  'Qual a diferença entre let, var e const?',
  'Como estudar para ser dev front-end?',
  'Como montar um portfólio?',
  'Como aprender lógica de programação?'
];

const initialState = {
  question: '',
  answer: '',
  loading: false,
  error: '',
};

const MentoriaSimulada: React.FC = () => {
  const [state, setState] = useState(initialState);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const askMentor = async () => {
    setState(s => ({ ...s, loading: true, answer: '', error: '' }));
    try {
      const response = await fetch(
        window.location.hostname === 'localhost'
          ? 'http://localhost:3001/api/mentoria'
          : '/api/mentoria',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: state.question })
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro desconhecido');
      }
      const data = await response.json();
      setState(s => ({ ...s, loading: false, answer: data.answer, error: '' }));
      speakAnswer(data.answer);
    } catch (e: any) {
      setState(s => ({ ...s, loading: false, error: e.message || 'Erro ao responder.' }));
    }
  };

  const speakAnswer = (text: string) => {
    if ('speechSynthesis' in window) {
      if (synthRef.current) {
        window.speechSynthesis.cancel();
      }
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.lang = 'pt-BR';
      utter.rate = 1.04;
      window.speechSynthesis.speak(utter);
      synthRef.current = utter;
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto my-16 p-8 bg-modern-dark/60 rounded-2xl border border-modern-accent/20 shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-modern-accent">Mentoria Simulada (IA)</h2>
      <p className="mb-6 text-modern-gray">Faça perguntas típicas de júnior e receba respostas com base na minha experiência!</p>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          className="flex-1 p-2 rounded bg-modern-dark border border-modern-accent/20 text-modern-white"
          placeholder="Digite sua dúvida ou escolha um exemplo..."
          value={state.question}
          onChange={e => setState(s => ({ ...s, question: e.target.value }))}
          disabled={state.loading}
          onKeyDown={e => { if (e.key === 'Enter' && state.question) askMentor(); }}
        />
        <Button
          onClick={askMentor}
          disabled={state.loading || !state.question}
          className="bg-modern-accent text-modern-dark hover:bg-modern-accent/90 transition-all"
        >
          {state.loading ? 'Respondendo...' : 'Perguntar'}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {EXAMPLES.map(q => (
          <Button
            key={q}
            size="sm"
            variant="outline"
            className="text-modern-accent border-modern-accent/30"
            onClick={() => setState(s => ({ ...s, question: q }))}
            disabled={state.loading}
          >
            {q}
          </Button>
        ))}
      </div>
      <AnimatePresence>
        {state.answer && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="bg-modern-accent/10 border border-modern-accent/20 rounded-xl p-6 mt-4 shadow-md"
          >
            <span className="text-modern-white text-lg whitespace-pre-line">{state.answer}</span>
          </motion.div>
        )}
        {state.error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="bg-red-800/40 border border-red-400/20 rounded-xl p-4 mt-4"
          >
            <span className="text-red-300">{state.error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MentoriaSimulada;
