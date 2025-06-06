import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaTrophy, FaLock } from 'react-icons/fa';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const badges = [
  { icon: <FaGithub />, label: 'Top 5% GitHub', color: 'bg-gray-800', unlocked: true, description: 'Conquiste ao atingir o top 5% de contribuidores no GitHub.' },
  { icon: <FaStar />, label: '100+ Commits', color: 'bg-yellow-500', unlocked: true, description: 'Faça mais de 100 commits em projetos.' },
  { icon: <FaTrophy />, label: 'Projetos Destaque', color: 'bg-modern-accent', unlocked: true, description: 'Tenha projetos destacados no portfólio.' },
  { icon: <FaTrophy />, label: 'Primeira Compra', color: 'bg-green-600', unlocked: false, description: 'Realize sua primeira compra de produto digital.' },
  { icon: <FaStar />, label: 'Participou de Mentoria', color: 'bg-blue-600', unlocked: false, description: 'Participe de uma sessão de mentoria.' },
  { icon: <FaTrophy />, label: 'Cliente Premium', color: 'bg-purple-700', unlocked: false, description: 'Seja um cliente premium do portfólio.' },
  { icon: <FaStar />, label: 'Usuário Ativo', color: 'bg-pink-500', unlocked: true, description: 'Acesse o portfólio regularmente.' },
];

export const Badges = () => (
  <div className="flex flex-wrap gap-4 py-4">
    {badges.map((b, i) => (
      <Tooltip key={b.label}>
        <TooltipTrigger asChild>
          <motion.div
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow transition-all duration-300 ${b.unlocked ? b.color + ' text-white scale-110 ring-2 ring-modern-accent' : 'bg-gray-700 text-gray-400 opacity-60'}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.15 }}
          >
            {b.unlocked ? b.icon : <FaLock />}
            {b.label}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top">{b.description}</TooltipContent>
      </Tooltip>
    ))}
  </div>
);
