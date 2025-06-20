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
    title: 'Desenvolvedor Fullstack Sênior',
    organization: 'Appezshop',
    period: '2021 - Presente',
    description:
      'Liderança de squads, arquitetura de sistemas escaláveis, implementação de soluções fullstack (React, Next.js, Node.js, PostgreSQL, MongoDB, AWS). Mentoria, code review, automação de deploy e integração de sistemas.',
    badge: {
      label: 'Líder Técnico',
      color: 'bg-blue-600',
      icon: <Star className="w-4 h-4 text-yellow-300" />,
    },
  },
  {
    id: 2,
    type: 'job',
    title: 'Desenvolvedor Fullstack Sênior',
    organization: 'LATAM',
    period: '2024 - 2025',
    description:
      'Desenvolvimento de aplicações web e APIs, arquitetura de microsserviços, integração de sistemas legados, automação CI/CD, liderança técnica e cloud migration.',
    badge: {
      label: 'Fullstack',
      color: 'bg-green-600',
      icon: <Award className="w-4 h-4 text-white" />,
    },
  },
  {
    id: 3,
    type: 'job',
    title: 'Desenvolvedor Fullstack Sênior',
    organization: 'RH SYSTEM',
    period: '2024 - 2025',
    description:
      'Projetos de automação de RH, criação de dashboards, integrações com ERPs, APIs RESTful, arquitetura de software e segurança.',
    badge: {
      label: 'Backoffice',
      color: 'bg-purple-600',
      icon: <Trophy className="w-4 h-4 text-white" />,
    },
  },
  {
    id: 4,
    type: 'job',
    title: 'Desenvolvedor Fullstack Pleno',
    organization: 'TechSmart Solutions',
    period: '2020 - 2021',
    description:
      'Desenvolvimento de sistemas completos, gateways de pagamento, autenticação JWT, relatórios dinâmicos e painéis administrativos. Stack: React, Node, Express, MongoDB.',
    badge: {
      label: 'Pleno',
      color: 'bg-yellow-500',
      icon: <Award className="w-4 h-4 text-white" />,
    },
  },
  {
    id: 5,
    type: 'job',
    title: 'Desenvolvedor Fullstack Júnior',
    organization: 'Projetos Independentes',
    period: '2019 - 2020',
    description:
      'Criação de MVPs, landing pages, APIs e integrações de sistemas para startups e clientes diversos. Stack: React, Node.js, PostgreSQL, WordPress, Vue.js.',
    badge: {
      label: 'Júnior',
      color: 'bg-gray-500',
      icon: <Award className="w-4 h-4 text-white" />,
    },
  },
  {
    id: 6,
    type: 'job',
    title: 'Co-fundador e CTO',
    organization: 'InovaStart',
    period: '2017 - 2018',
    description: 'Liderança técnica e desenvolvimento do MVP de uma plataforma SaaS para gestão de pequenas empresas. Time, arquitetura e validação do produto.'
  },
  {
    id: 7,
    type: 'job',
    title: 'Desenvolvedor Full Stack',
    organization: 'HealthTech Startup',
    period: '2018 - 2019',
    description: 'Desenvolvimento de soluções digitais para o setor de saúde, integrações com APIs, sistemas de agendamento online, arquitetura de banco de dados e automação de processos.'
  },
  {
    id: 8,
    type: 'achievement',
    title: 'Prêmio Startup Revelação',
    organization: 'Startup Summit',
    period: '2018',
    description: 'Reconhecimento pelo desenvolvimento inovador de plataforma SaaS para pequenas empresas.',
    badge: {
      label: 'Startup Revelação',
      color: 'bg-purple-600',
      icon: <Award className="w-4 h-4 text-white" />,
    },
  },
  {
    id: 9,
    type: 'achievement',
    title: 'Prêmio HealthTech Inovação',
    organization: 'HealthTech Awards',
    period: '2019',
    description: 'Premiação por soluções digitais inovadoras no setor de saúde.',
    badge: {
      label: 'HealthTech Inovação',
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