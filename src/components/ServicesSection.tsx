import { motion } from 'framer-motion';
import {
  Code,
  Palette,
  ArrowUpRight,
  Lightbulb,
  LineChart,
  Users,
} from 'lucide-react';
import { AnimatedTitle } from '@/components/ui/animated-text';
import { fadeIn, staggerContainer } from '@/lib/animations';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
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

      <div className="container-section relative z-10">
        <AnimatedTitle
          text="Serviços"
          className="section-title text-modern-white mb-12"
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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

              <motion.h3
                className="text-xl font-bold text-modern-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.2 }}
                viewport={{ once: true }}
              >
                {service.title}
              </motion.h3>

              <motion.p
                className="text-modern-gray relative z-10"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                viewport={{ once: true }}
              >
                {service.description}
              </motion.p>

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
