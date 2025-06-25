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
    title: 'Front End Senior',
    organization: 'RHSYSTEMTI',
    period: '2024 - 2025',
    description:
      'Liderança técnica em projetos front-end, arquitetura moderna, design system, SSR com Next.js, otimização de performance e mentoria de equipe',
    badge: {
      label: 'Senior',
      color: 'bg-blue-600',
      icon: <Star className="w-4 h-4 text-yellow-300" />,
    },
  },
  {
    id: 2,
    type: 'job',
    title: 'Front End Pleno',
    organization: 'LATAM Airlines',
    period: '2023',
    description:
      'Desenvolvimento de aplicações web complexas, implementação de padrões de acessibilidade, integrações com APIs e otimização de performance',
    badge: {
      label: 'Pleno',
      color: 'bg-green-600',
      icon: <Award className="w-4 h-4 text-white" />,
    },
  },
  {
    id: 3,
    type: 'job',
    title: 'Front End Junior',
    organization: 'AppeZShop',
    period: '2021 - 2022',
    description:
      'Desenvolvimento de componentes React, implementação de layouts responsivos, integração com APIs e aprendizado de boas práticas de desenvolvimento',
    badge: {
      label: 'Junior',
      color: 'bg-purple-600',
      icon: <Trophy className="w-4 h-4 text-white" />,
    },
  },
  {
    id: 4,
    type: 'job',
    title: 'Front End Junior',
    organization: 'Stefanini',
    period: '2020 - 2021',
    description:
      'Aprendizado de desenvolvimento web, implementação de layouts básicos, integração com APIs e primeiros projetos em equipe',
    badge: {
      label: 'Início',
      color: 'bg-yellow-500',
      icon: <Award className="w-4 h-4 text-white" />,
    },
  },
  {
    id: 5,
    type: 'job',
    title: 'Estágio Front End',
    organization: 'Santander',
    period: '2019 - 2020',
    description:
      'Primeiros passos em desenvolvimento web, aprendizado de HTML, CSS e JavaScript, criação de layouts simples e integração com sistemas internos',
    badge: {
      label: 'Estágio',
      color: 'bg-gray-500',
      icon: <Award className="w-4 h-4 text-white" />,
    },
  },
  {
    id: 6,
    type: 'achievement',
    title: 'Design System Enterprise',
    organization: 'RHSYSTEMTI',
    period: '2024',
    description: 'Implementação e adoção do design system por 20+ squads',
    badge: {
      label: 'Design System',
      color: 'bg-purple-600',
      icon: <Award className="w-4 h-4 text-white" />,
    },
  },
  {
    id: 7,
    type: 'achievement',
    title: 'Otimização Front-end',
    organization: 'RHSYSTEMTI',
    period: '2024',
    description: 'Redução de 40% no tempo de build e 30% no bundle size',
    badge: {
      label: 'Performance',
      color: 'bg-green-700',
      icon: <Award className="w-4 h-4 text-white" />,
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