import { motion } from 'framer-motion';
import {
  Code,
  Palette,
  ArrowUpRight,
  Lightbulb,
  LineChart,
  Users,
  Server,
  Smartphone,
  ClipboardCheck,
  GitBranch,
  Cloud,
  Package,
  Repeat,
  AppWindow,
} from 'lucide-react';
import { AnimatedTitle } from '@/components/ui/animated-text';
import { fadeIn, staggerContainer } from '@/lib/animations';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta?: { label: string; link: string };
}

const services: Service[] = [
  {
    icon: <Code className="w-10 h-10" />,
    title: 'Freelance: Desenvolvimento & Design',
    description:
      'Ofereço serviços de desenvolvimento web, design de interfaces e consultoria personalizada para seu projeto.',
    cta: { label: 'Contrate', link: '/contato' },
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: 'Mentoria para Iniciantes',
    description:
      'Sessões de mentoria para quem está começando na área de tecnologia e deseja acelerar o aprendizado.',
    cta: { label: 'Agende Mentoria', link: '/contato' },
  },
  {
    icon: <Code className="w-10 h-10" />,
    title: 'Desenvolvimento Front-end',
    description:
      'Criação de aplicações web responsivas, performáticas e com foco na experiência do usuário.',
  },
  {
    icon: <Palette className="w-10 h-10" />,
    title: 'UI/UX Design',
    description:
      'Design de interfaces modernas e intuitivas, prototipagem e criação de sistemas de design.',
  },
  {
    icon: <Lightbulb className="w-10 h-10" />,
    title: 'Consultoria de Projetos',
    description:
      'Análise e otimização de projetos web com foco em usabilidade, performance e melhores práticas.',
  },
  {
    icon: <LineChart className="w-10 h-10" />,
    title: 'SEO e Analytics',
    description:
      'Otimização para mecanismos de busca e implementação de soluções de análise de dados.',
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: 'Mentoria',
    description:
      'Orientação para desenvolvedores em início de carreira com foco em desenvolvimento front-end.',
  },
  // Novos serviços de Front-end e Back-end
  {
    icon: <GitBranch className="w-10 h-10" />,
    title: 'Desenvolvimento de APIs',
    description:
      'Criação de APIs RESTful e GraphQL para integrar sistemas e garantir comunicação eficiente entre front-end e back-end.',
  },
  {
    icon: <Server className="w-10 h-10" />,
    title: 'Desenvolvimento Back-end',
    description:
      'Desenvolvimento de soluções escaláveis e seguras, utilizando tecnologias de servidor e banco de dados.',
  },
  {
    icon: <Cloud className="w-10 h-10" />,
    title: 'Integração de Sistemas',
    description:
      'Integração de diferentes plataformas e sistemas para automatizar processos e melhorar a eficiência organizacional.',
  },
  {
    icon: <Package className="w-10 h-10" />,
    title: 'Microserviços',
    description:
      'Arquitetura de microserviços para sistemas mais ágeis, escaláveis e de fácil manutenção.',
  },
  {
    icon: <AppWindow className="w-10 h-10" />,
    title: 'Desenvolvimento Full-Stack',
    description:
      'Desenvolvimento completo de aplicações, tanto front-end quanto back-end, utilizando tecnologias modernas e eficientes.',
  },
  {
    icon: <Repeat className="w-10 h-10" />,
    title: 'Automação de Processos',
    description:
      'Automação de tarefas repetitivas e otimização de fluxos de trabalho utilizando ferramentas e scripts especializados.',
  },
  {
    icon: <Smartphone className="w-10 h-10" />,
    title: 'Desenvolvimento Mobile',
    description:
      'Criação de aplicativos móveis nativos e híbridos, com foco na experiência do usuário e performance.',
  },
  {
    icon: <ClipboardCheck className="w-10 h-10" />,
    title: 'Gerenciamento de Projetos',
    description:
      'Planejamento, organização e execução de projetos, garantindo entregas dentro do prazo e com qualidade.',
  },
  {
    icon: <AppWindow className="w-10 h-10" />,
    title: 'Desenvolvimento de PWA',
    description:
      'Desenvolvimento de Progressive Web Apps (PWA) que oferecem experiência de aplicativo nativo diretamente no navegador.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-20 px-6 bg-modern-dark relative overflow-hidden"
    >
      {/* Background elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-modern-accent opacity-5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-80 h-80 bg-modern-accent2 opacity-5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className="container-section relative z-10 px-2 sm:px-4 md:px-8">
        <AnimatedTitle
          text="Serviços"
          className="section-title text-modern-white mb-8 sm:mb-12"
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', index * 0.1)}
              className="card-hover bg-modern-darker rounded-lg p-6 border border-modern-accent/10 group relative overflow-hidden"
            >
              {/* Card decorative elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 bg-modern-accent/5 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />

              <div className="flex justify-between items-start mb-4">
                <motion.div
                  className="bg-modern-accent/10 p-3 rounded-lg text-modern-accent group-hover:bg-modern-accent group-hover:text-modern-white transition-colors duration-300"
                  whileHover={{
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {service.icon}
                </motion.div>

                <motion.div
                  whileHover={{
                    scale: 1.2,
                    x: 3,
                    y: -3,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <ArrowUpRight className="text-modern-gray group-hover:text-modern-accent transition-all duration-300" />
                </motion.div>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold text-modern-white mb-2">{service.title}</h3>
                <p className="text-modern-gray mb-4">{service.description}</p>
                {service.cta && (
                  <a
                    href={service.cta.link}
                    className="inline-block px-4 py-2 bg-modern-accent text-white rounded hover:bg-modern-accent2 transition"
                  >
                    {service.cta.label}
                  </a>
                )}
              </div>

              {/* Card hover effect */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-modern-accent scale-x-0 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
