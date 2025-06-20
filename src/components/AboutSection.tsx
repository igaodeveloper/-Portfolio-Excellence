import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ParallaxScrollShowcase from './ParallaxScrollShowcase';

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
    title: 'Desenvolvedor Fullstack Sênior',
    organization: 'Appezshop',
    period: '2021 - Presente',
    description:
      'Responsável por liderar squads multidisciplinares, arquitetar soluções escaláveis e implementar sistemas completos do front ao back-end. Atuação com React, Next.js, Node.js, PostgreSQL, MongoDB, integrações REST/GraphQL, automação de deploy (CI/CD) e cloud (Vercel, AWS). Mentoria de times, code review e definição de padrões de arquitetura.',
  },
  {
    id: 2,
    title: 'Desenvolvedor Fullstack Sênior',
    organization: 'LATAM',
    period: '2024 - 2025',
    description:
      'Desenvolvimento de aplicações web robustas, APIs escaláveis e microsserviços. Implementação de autenticação, autorização, testes automatizados, pipelines CI/CD e monitoramento. Liderança técnica em projetos críticos, integração de sistemas legados e cloud migration.',
  },
  {
    id: 3,
    title: 'Desenvolvedor Fullstack Sênior',
    organization: 'RH SYSTEM',
    period: '2024 - 2025',
    description:
      'Projetos de automação de processos de RH, criação de dashboards analíticos, integrações com ERPs e desenvolvimento de APIs RESTful. Atuação em arquitetura de software, performance e segurança.',
  },
  {
    id: 4,
    title: 'Desenvolvedor Fullstack Pleno',
    organization: 'TechSmart Solutions',
    period: '2020 - 2021',
    description:
      'Desenvolvimento de sistemas completos (React, Node, Express, MongoDB). Implementação de gateways de pagamento, autenticação JWT, relatórios dinâmicos e painéis administrativos. Participação em sprints ágeis e code reviews.',
  },
  {
    id: 5,
    title: 'Desenvolvedor Fullstack Júnior',
    organization: 'Projetos Independentes',
    period: '2019 - 2020',
    description:
      'Criação de MVPs, landing pages, APIs e integrações de sistemas para startups e clientes diversos. Stack: React, Node.js, PostgreSQL, WordPress, Vue.js.',
  },
  {
    id: 6,
    title: 'Co-fundador e CTO',
    organization: 'InovaStart',
    period: '2017 - 2018',
    description: 'Liderança técnica e desenvolvimento do MVP de uma plataforma SaaS para gestão de pequenas empresas. Responsável por montar o time de tecnologia, validar o produto com clientes reais e estruturar a arquitetura fullstack.'
  },
  {
    id: 7,
    title: 'Desenvolvedor Full Stack',
    organization: 'HealthTech Startup',
    period: '2018 - 2019',
    description: 'Desenvolvimento de soluções digitais para o setor de saúde, incluindo integrações com APIs de clínicas, sistemas de agendamento online, arquitetura de banco de dados e automação de processos.'
  },
];

const AboutSection = () => {
  return (
    <section className="relative min-h-screen py-16 px-4 md:px-8 flex flex-col items-center justify-center">
      {/* Parallax global de fundo */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
        <ParallaxScrollShowcase />
      </div>
      {/* Conteúdo principal acima do parallax */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-title text-modern-white">Quem Sou</h2>
          <div className="grid grid-cols-1 gap-12 mt-8 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-modern-gray">
                Sou <span className="text-modern-accent">Desenvolvedor Fullstack Sênior</span> com mais de <span className="text-modern-accent">6 anos de experiência</span> entregando soluções completas, escaláveis e de alto impacto para web e cloud.
              </p>
              <p className="text-lg leading-relaxed text-modern-gray">
                Atuo em todo o ciclo de desenvolvimento: arquitetura, UI/UX, APIs, bancos de dados, integrações, automação, testes, cloud e DevOps. Especialista em React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB, AWS, CI/CD e microsserviços. Lidero times, defino padrões e garanto entregas de alta qualidade.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-modern-gray">
                Experiência em projetos nacionais e internacionais, com foco em performance, segurança, escalabilidade e experiência do usuário. Mentor de desenvolvedores, apaixonado por tecnologia, inovação e resolução de problemas complexos.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {/* Fullstack */}
                <Badge className="badge-tech">React</Badge>
                <Badge className="badge-tech">Next.js</Badge>
                <Badge className="badge-tech">TypeScript</Badge>
                <Badge className="badge-tech">Node.js</Badge>
                <Badge className="badge-tech">Express</Badge>
                <Badge className="badge-tech">NestJS</Badge>
                <Badge className="badge-tech">PostgreSQL</Badge>
                <Badge className="badge-tech">MongoDB</Badge>
                <Badge className="badge-tech">GraphQL</Badge>
                <Badge className="badge-tech">REST</Badge>
                <Badge className="badge-tech">Prisma</Badge>
                <Badge className="badge-tech">Docker</Badge>
                <Badge className="badge-tech">AWS</Badge>
                <Badge className="badge-tech">Vercel</Badge>
                <Badge className="badge-tech">CI/CD</Badge>
                <Badge className="badge-tech">Jest</Badge>
                <Badge className="badge-tech">Cypress</Badge>
                <Badge className="badge-tech">Microservices</Badge>
                <Badge className="badge-tech">Mentoria</Badge>
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
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <h3 className="text-2xl font-bold text-modern-white">
              Experiência
            </h3>
          </div>

          <div className="relative pl-8 ml-4 space-y-12 border-l-2 border-modern-accent/30">
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
                <div className="flex flex-col gap-2 mb-2 md:flex-row md:items-center">
                  <h4 className="text-xl font-semibold text-modern-white">
                    {item.title}
                  </h4>
                  <div className="flex items-center text-sm md:ml-auto text-modern-gray">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.period}
                  </div>
                </div>
                <p className="mb-2 font-medium text-modern-accent2">
                  {item.organization}
                </p>
                <p className="text-modern-gray">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Seção de Idiomas */}
        <div className="mt-16">
          <h3 className="mb-4 text-2xl font-bold text-modern-white">Idiomas</h3>
          <div className="flex flex-wrap gap-4">
            <Badge className="badge-tech">Português (Nativo)</Badge>
            <Badge className="badge-tech">Inglês (Técnico Básico)</Badge>
            <Badge className="badge-tech">Espanhol (Fluente)</Badge>
          </div>
        </div>
        {/* Seção de Hobbies */}
        <div className="mt-12">
          <h3 className="mb-4 text-2xl font-bold text-modern-white">Hobbies</h3>
          <p className="text-lg leading-relaxed text-modern-gray">
            Sou gamer apaixonado, gosto de gravar lives, criar conteúdos para TikTok e Instagram, e também atuo como mentor ajudando novos desenvolvedores a ingressarem na área de tecnologia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
export { workItems };
