import React from 'react';
import { motion } from 'framer-motion';
import { workItems } from './AboutSection';

export const PresentationTimeline = () => (
  <div className="w-full max-w-3xl py-12 mx-auto">
    <h2 className="mb-8 text-3xl font-bold text-center">Minha Trajetória</h2>
    <div className="relative pl-8 border-l-4 border-modern-accent">
      {workItems.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2, type: 'spring', stiffness: 100 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="text-lg font-semibold text-modern-accent">
            {item.title}
          </div>
          <div className="mb-1 text-gray-500">
            {item.organization} — {item.period}
          </div>
          <div className="text-gray-700 dark:text-gray-300">
            {item.description}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
