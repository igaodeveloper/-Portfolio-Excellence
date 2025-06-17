import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const initialState = {
  badContrast: true,
  badA11y: true,
  uselessLoader: true,
  message: '',
};

const BadUXSimulator: React.FC = () => {
  const [state, setState] = useState(initialState);

  // Correções
  const fixContrast = () => setState(s => ({ ...s, badContrast: false, message: 'Contraste melhorado! 🎨' }));
  const fixA11y = () => setState(s => ({ ...s, badA11y: false, message: 'Acessibilidade corrigida! ♿' }));
  const removeLoader = () => setState(s => ({ ...s, uselessLoader: false, message: 'Loading removido! ⚡' }));

  // Resetar
  const reset = () => setState(initialState);

  return (
    <section className="w-full max-w-xl mx-auto my-16 p-8 bg-modern-dark/60 rounded-2xl border border-modern-accent/20 shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-modern-accent">Simulador de UI/UX Ruim</h2>
      <p className="mb-6 text-modern-gray">Veja más práticas de UI/UX e corrija clicando nos botões!</p>
      <div className="relative mb-8">
        {/* Loader inútil */}
        <AnimatePresence>
          {state.uselessLoader && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-10 bg-black/60"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
              <span className="ml-4 text-lg text-red-200">Carregando... (desnecessário)</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className={`p-8 rounded-xl border-2 ${state.badContrast ? 'bg-[#222] border-[#2d2d2d] text-gray-500' : 'bg-white border-modern-accent/40 text-modern-dark'} ${state.badA11y ? 'text-[13px] font-light' : 'text-base font-medium'} transition-all duration-500`}
          tabIndex={state.badA11y ? -1 : 0}
          aria-label={state.badA11y ? undefined : 'Exemplo de conteúdo acessível'}
        >
          <h3 className={`mb-2 ${state.badContrast ? 'text-gray-500' : 'text-modern-accent'}`}>Exemplo de Seção</h3>
          <p>
            {state.badA11y
              ? 'Texto pequeno, pouco contraste, sem foco acessível. Lorem ipsum dolor sit amet.'
              : 'Texto com contraste e acessibilidade melhorados!'}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <Button onClick={fixContrast} disabled={!state.badContrast} className="bg-modern-accent/80 text-modern-dark disabled:opacity-40">Corrigir contraste</Button>
        <Button onClick={fixA11y} disabled={!state.badA11y} className="bg-modern-accent/80 text-modern-dark disabled:opacity-40">Corrigir acessibilidade</Button>
        <Button onClick={removeLoader} disabled={!state.uselessLoader} className="bg-modern-accent/80 text-modern-dark disabled:opacity-40">Remover loading inútil</Button>
        <Button onClick={reset} variant="outline" className="ml-auto">Resetar</Button>
      </div>
      <AnimatePresence>
        {state.message && (
          <motion.div
            key="msg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-green-400 font-semibold text-lg mt-2"
          >
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BadUXSimulator;
