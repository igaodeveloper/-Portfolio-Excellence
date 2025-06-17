import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TECH_OPTIONS = [
  'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'SolidJS', 'Preact', 'Ember', 'Qwik',
  'Node.js', 'Deno', 'Express', 'NestJS', 'Fastify', 'Spring Boot', 'Django', 'Flask', 'Laravel', 'Ruby on Rails',
  'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Supabase', 'Firebase', 'Prisma', 'TypeORM',
  'Tailwind CSS', 'Bootstrap', 'Chakra UI', 'Material UI', 'Ant Design', 'Styled Components',
  'Jest', 'Vitest', 'Cypress', 'Playwright', 'Mocha', 'Jasmine', 'Testing Library'
];

const initialState = {
  techA: '',
  techB: '',
  loading: false,
  result: null as null | {
    prosA: string[],
    consA: string[],
    prosB: string[],
    consB: string[],
    codeA: string,
    codeB: string,
    opinion: string
  },
  error: null as null | string
};

const TechComparator: React.FC = () => {
  const [state, setState] = useState(initialState);

  const handleCompare = async () => {
    setState(s => ({ ...s, loading: true, result: null, error: null }));
    try {
      const response = await fetch(
        window.location.hostname === 'localhost'
          ? 'http://localhost:3001/api/compare-techs'
          : '/api/compare-techs',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ techA: state.techA, techB: state.techB })
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro desconhecido');
      }
      const data = await response.json();
      setState(s => ({ ...s, loading: false, result: data, error: null }));
    } catch (e: any) {
      setState(s => ({ ...s, loading: false, error: e.message || 'Erro ao comparar.' }));
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto my-16 p-8 bg-modern-dark/60 rounded-2xl border border-modern-accent/20 shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-modern-accent">Comparador de Tecnologias</h2>
      <p className="mb-6 text-modern-gray">Compare duas tecnologias e veja prós, contras, código e minha opinião!</p>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          className="flex-1 p-2 rounded bg-modern-dark border border-modern-accent/20 text-modern-white"
          value={state.techA}
          onChange={e => setState(s => ({ ...s, techA: e.target.value }))}
          disabled={state.loading}
        >
          <option value="">Selecione a 1ª tecnologia</option>
          {TECH_OPTIONS.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          className="flex-1 p-2 rounded bg-modern-dark border border-modern-accent/20 text-modern-white"
          value={state.techB}
          onChange={e => setState(s => ({ ...s, techB: e.target.value }))}
          disabled={state.loading}
        >
          <option value="">Selecione a 2ª tecnologia</option>
          {TECH_OPTIONS.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <Button
          onClick={handleCompare}
          disabled={state.loading || !state.techA || !state.techB || state.techA === state.techB}
          className="bg-modern-accent text-modern-dark hover:bg-modern-accent/90 transition-all"
        >
          {state.loading ? 'Comparando...' : 'Comparar'}
        </Button>
      </div>
      <AnimatePresence>
        {state.result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="bg-modern-accent/10 border border-modern-accent/20 rounded-xl p-6 mt-4 shadow-md"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-modern-accent mb-2">{state.techA}</h3>
                <div className="mb-2">
                  <span className="font-semibold text-green-400">Prós:</span>
                  <ul className="list-disc ml-5 text-modern-white">
                    {state.result.prosA.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-red-400">Contras:</span>
                  <ul className="list-disc ml-5 text-modern-white">
                    {state.result.consA.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
                <pre className="bg-modern-dark/80 rounded p-2 text-sm text-modern-white overflow-auto mt-2">
                  {state.result.codeA}
                </pre>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-modern-accent mb-2">{state.techB}</h3>
                <div className="mb-2">
                  <span className="font-semibold text-green-400">Prós:</span>
                  <ul className="list-disc ml-5 text-modern-white">
                    {state.result.prosB.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-red-400">Contras:</span>
                  <ul className="list-disc ml-5 text-modern-white">
                    {state.result.consB.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
                <pre className="bg-modern-dark/80 rounded p-2 text-sm text-modern-white overflow-auto mt-2">
                  {state.result.codeB}
                </pre>
              </div>
            </div>
            <div className="mt-6">
              <span className="font-semibold text-modern-accent">Minha opinião:</span>
              <p className="text-modern-white mt-2 whitespace-pre-line">{state.result.opinion}</p>
            </div>
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

export default TechComparator;
