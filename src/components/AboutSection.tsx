import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type TimelineItem = {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
};

const workItems: TimelineItem[] = [
  {
    id: 1,
    title: 'Desenvolvedor Front End Sênior',
    organization: 'Appezshop',
    period: '2021 - Presente',
    description:
      'Atuo com arquitetura de sistemas, integração de APIs, desenvolvimento de funcionalidades completas usando React, Next.js, Tailwind, Node.js, Supabase e PostgreSQL. Lidero decisões técnicas e otimizações de performance.',
  },
  {
    id: 2,
    title: 'Desenvolvedor Front End Sênior',
    organization: 'LATAM',
    period: '2024 - 2025',
    description:
      'Implementei aplicações web interativas com React e TypeScript, aplicando conceitos avançados de design system, acessibilidade, performance e integração com back-end via REST e GraphQL.',
  },
  {
    id: 3,
    title: 'Desenvolvedor Front End Sênior',
    organization: 'RH SYSTEM',
    period: '2024 - 2025',
    description:
      'Desenvolvimento e manutenção de sistemas de gestão de recursos humanos. Implementação de recursos para otimização de processos de recrutamento e seleção. Criação de relatórios dinâmicos e painéis administrativos.',
  },
  {
    id: 4,
    title: 'Estagiário de Front End',
    organization: 'Santander',
    period: '2020',
    description:
      'Atuação em projetos de internet banking, auxiliando no desenvolvimento de interfaces com React e TypeScript. Suporte à equipe de front end em demandas de acessibilidade e performance.',
  },
  {
    id: 5,
    title: 'Desenvolvedor Front End Júnior',
    organization: 'TechSmart Solutions',
    period: '2020 - 2021',
    description:
      'Entreguei interfaces modernas com React, Redux, Material UI e consumo de APIs REST. Participei de code reviews, sprints SCRUM e implementações com foco em usabilidade.',
  },
  {
    id: 6,
    title: 'Desenvolvedor Front End Júnior',
    organization: 'Projetos Independentes',
    period: '2019 - 2020',
    description:
      'Criei sistemas completos desde a interface até o back-end com Express, MongoDB e React. Integrei gateways de pagamento, sistemas de autenticação JWT e dashboards administrativos.',
  },
  {
    id: 7,
    title: 'Desenvolvedor Front End Júnior',
    organization: 'Digital Innovation Agency',
    period: '2019 - 2019',
    description:
      'Colaborei na criação de landing pages e lojas virtuais. Trabalhei com HTML, CSS, JavaScript e WordPress, otimizando SEO e garantindo responsividade cross-browser.',
  },
  {
    id: 8,
    title: 'Desenvolvedor Front End Júnior',
    organization: 'ONG Educação Para Todos',
    period: '2018 - 2019',
    description:
      'Desenvolvi interfaces acessíveis com Vue.js, Bootstrap e foco em inclusão digital. Implementei recursos adaptativos para dispositivos de baixo desempenho.',
  },
  {
    id: 9,
    title: 'Desenvolvedor Front End Júnior',
    organization: 'Agência CreativeDev',
    period: '2018 - 2018',
    description:
      'Mantive sites institucionais e implementei novos componentes com jQuery, PHP e MySQL. Aprimorei fluxos de navegação e fiz integrações básicas com APIs.',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6 bg-modern-darker">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-title text-modern-white">Quem Sou</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            <div className="space-y-6">
              <p className="text-modern-gray text-lg leading-relaxed">
                Sou{' '}
                <span className="text-modern-accent">
                  Desenvolvedor Front End Sênior
                </span>{' '}
                com mais de{' '}
                <span className="text-modern-accent">
                  5 anos de experiência
                </span>{' '}
                criando interfaces modernas, acessíveis e performáticas para web.
              </p>
              <p className="text-modern-gray text-lg leading-relaxed">
                Especialista em <strong>front-end</strong>, crio experiências digitais com React, Next.js, TypeScript e Tailwind. Foco em acessibilidade, performance, animações e arquitetura de componentes avançada.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-modern-gray text-lg leading-relaxed">
                Domínio total de ciclo completo de desenvolvimento: análise de
                requisitos, UI/UX, integração de sistemas, CI/CD, testes
                automatizados, deploy em cloud e monitoramento. Coloco soluções
                em produção com qualidade e velocidade. E ainda mentorando quem
                vem atrás.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {/* Front-end */}
                <Badge className="badge-tech">React</Badge>
                <Badge className="badge-tech">Next.js</Badge>
                <Badge className="badge-tech">TypeScript</Badge>
                <Badge className="badge-tech">Tailwind CSS</Badge>
                <Badge className="badge-tech">Framer Motion</Badge>
                <Badge className="badge-tech">Zustand</Badge>
                <Badge className="badge-tech">React Query</Badge>
                {/* Back-end */}
                <Badge className="badge-tech">Node.js</Badge>
                <Badge className="badge-tech">Express</Badge>
                <Badge className="badge-tech">Supabase</Badge>
                <Badge className="badge-tech">PostgreSQL</Badge>
                <Badge className="badge-tech">MongoDB</Badge>
                <Badge className="badge-tech">JWT</Badge>
                <Badge className="badge-tech">REST & GraphQL</Badge>
                <Badge className="badge-tech">Prisma</Badge>
                <Badge className="badge-tech">CI/CD</Badge>
                <Badge className="badge-tech">Vercel</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h3 className="text-2xl font-bold text-modern-white">
              Experiência
            </h3>
          </div>

          <div className="relative border-l-2 border-modern-accent/30 pl-8 space-y-12 ml-4">
            {workItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[42px] bg-modern-darker p-1 rounded-full border-2 border-modern-accent">
                  <Briefcase className="w-5 h-5 text-modern-accent" />
                </div>
                <div className="flex flex-col md:flex-row md:items-center mb-2 gap-2">
                  <h4 className="text-xl font-semibold text-modern-white">
                    {item.title}
                  </h4>
                  <div className="md:ml-auto flex items-center text-sm text-modern-gray">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.period}
                  </div>
                </div>
                <p className="text-modern-accent2 font-medium mb-2">
                  {item.organization}
                </p>
                <p className="text-modern-gray">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
