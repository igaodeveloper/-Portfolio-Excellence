import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, GraduationCap, Star, Code, Trophy } from 'lucide-react';

// Tipos de evento
const EVENT_ICONS = {
  job: <Briefcase className="w-5 h-5 text-modern-accent" />,
  course: <GraduationCap className="w-5 h-5 text-modern-accent" />,
  achievement: <Trophy className="w-5 h-5 text-yellow-400" />,
  project: <Code className="w-5 h-5 text-modern-accent2" />,
  badge: <Award className="w-5 h-5 text-modern-accent" />,
  star: <Star className="w-5 h-5 text-yellow-400" />,
};

export type CareerEvent = {
  id: number;
  type: 'job' | 'course' | 'achievement' | 'project' | 'badge' | 'star';
  title: string;
  organization?: string;
  period: string;
  description: string;
  badge?: {
    label: string;
    color: string;
    icon?: React.ReactNode;
  };
};

// Mock de eventos de carreira
const careerEvents: CareerEvent[] = [
  {
    id: 1,
    type: 'job',
    title: 'Desenvolvedor Front End Sênior',
    organization: 'Appezshop',
    period: '2021 - Presente',
    description:
      'Atuo com arquitetura de sistemas, integração de APIs, desenvolvimento de funcionalidades completas usando React, Next.js, Tailwind, Node.js, Supabase e PostgreSQL. Lidero decisões técnicas e otimizações de performance.',
    badge: {
      label: 'Líder Técnico',
      color: 'bg-blue-600',
      icon: <Star className="w-4 h-4 text-yellow-300" />,
    },
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Certificação React Avançado',
    organization: 'Rocketseat',
    period: '2023',
    description: 'Conquista de certificação em React avançado, com foco em hooks, performance e arquitetura.',
    badge: {
      label: 'Certificado',
      color: 'bg-green-600',
      icon: <Award className="w-4 h-4 text-white" />,
    },
  },
  {
    id: 3,
    type: 'project',
    title: 'Dashboard Analítico',
    organization: 'LATAM',
    period: '2024',
    description: 'Desenvolvimento de dashboard interativo para visualização de dados em tempo real.',
  },
  {
    id: 4,
    type: 'course',
    title: 'Especialização em UX/UI',
    organization: 'Alura',
    period: '2022',
    description: 'Curso de especialização em design de experiência do usuário e interfaces modernas.',
    badge: {
      label: 'UX/UI',
      color: 'bg-pink-500',
    },
  },
  {
    id: 5,
    type: 'badge',
    title: '100+ Projetos Entregues',
    period: '2023',
    description: 'Reconhecimento por entregar mais de 100 projetos de alta qualidade.',
    badge: {
      label: '100+ Projetos',
      color: 'bg-yellow-500',
      icon: <Trophy className="w-4 h-4 text-white" />,
    },
  },
];

export const CareerTimeline: React.FC = () => (
  <section className="w-full max-w-3xl py-12 mx-auto">
    <h2 className="mb-8 text-3xl font-bold text-center text-modern-accent">Minha Trajetória Profissional</h2>
    <div className="relative pl-8 border-l-4 border-modern-accent">
      {careerEvents.map((event, i) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.18, type: 'spring', stiffness: 100 }}
          viewport={{ once: true }}
          className="relative mb-10"
        >
          <div className="absolute flex items-center justify-center p-2 border-2 rounded-full -left-10 top-1 bg-modern-darker border-modern-accent">
            {EVENT_ICONS[event.type]}
          </div>
          <div className="flex flex-col gap-2 mb-1 md:flex-row md:items-center">
            <span className="text-lg font-semibold text-modern-accent2">{event.title}</span>
            <span className="text-sm md:ml-4 text-modern-gray">{event.organization}</span>
            <span className="flex items-center text-xs md:ml-auto text-modern-gray">{event.period}</span>
            {event.badge && (
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold text-white ${event.badge.color} flex items-center gap-1`}>
                {event.badge.icon} {event.badge.label}
              </span>
            )}
          </div>
          <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">{event.description}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CareerTimeline; 