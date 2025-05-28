import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'João Silva',
    text: 'Excelente profissional! Entregou o projeto antes do prazo e com qualidade impecável.',
    company: 'Tech Solutions',
  },
  {
    name: 'Maria Oliveira',
    text: 'Ótima comunicação e domínio técnico. Recomendo para projetos de alta complexidade.',
    company: 'InovaWeb',
  },
  {
    name: 'Carlos Souza',
    text: 'Trouxe ideias inovadoras e otimizou nosso sistema consideravelmente.',
    company: 'StartUpX',
  },
];

export const TestimonialsCarousel = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="w-full max-w-xl mx-auto py-12">
      <div className="flex justify-between mb-4">
        <button onClick={prev} className="text-modern-accent">Anterior</button>
        <button onClick={next} className="text-modern-accent">Próximo</button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center"
        >
          <div className="text-lg font-semibold mb-2">{testimonials[index].name}</div>
          <div className="text-gray-500 mb-2">{testimonials[index].company}</div>
          <div className="text-modern-accent text-xl">“{testimonials[index].text}”</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}; 