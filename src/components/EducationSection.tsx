import { motion } from 'framer-motion';
import { Calendar, GraduationCap, Award } from 'lucide-react';

type EducationItem = {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'education' | 'award';
};

const educationItems: EducationItem[] = [
  {
    id: 1,
    title: 'Bacharelado em Engenharia de Software',
    organization: 'Universidade Anhembi Morumbi',
    period: '2023-2027',
    description:
      'Especializei-me em tecnologias web e design de interfaces de usuário. Me formei com honras.',
    type: 'education',
  },
  {
    id: 2,
    title: 'Prêmio de Excelência em Desenvolvimento Web',
    organization: 'Conferência Regional de Tecnologia',
    period: '2020',
    description:
      'Reconhecido por contribuições excepcionais para as práticas de desenvolvimento front-end e projetos de código aberto.',
    type: 'award',
  },
  {
    id: 3,
    title: 'Prêmio de Destaque em Front-End',
    organization: 'Conferência Nacional de Desenvolvimento Web',
    period: '2021',
    description:
      'Premiado pelo destaque em projetos front-end e pela implementação de boas práticas de design e performance.',
    type: 'award',
  },
  {
    id: 4,
    title: 'Curso de Especialização em React',
    organization: 'Digital Innovation One',
    period: '2022',
    description:
      'Desenvolvimento de aplicações modernas com React, Redux e TypeScript, com foco em performance e acessibilidade.',
    type: 'education',
  },
  {
    id: 5,
    title: 'Bootcamp Desenvolvimento Full Stack',
    organization: 'Rocketseat',
    period: '2021-2022',
    description:
      'Imersão intensiva em desenvolvimento web com Node.js, React e React Native, criando aplicações completas do backend ao frontend.',
    type: 'education',
  },
  {
    id: 6,
    title: 'Premiação de Melhor Aplicação Web Local',
    organization: 'Prêmio Web Developers Brasil',
    period: '2022',
    description:
      'Vencedor do prêmio de melhor aplicação web local, destacando-se pela integração de tecnologias modernas e excelente usabilidade.',
    type: 'award',
  },
  {
    id: 7,
    title: 'Certificação AWS Cloud Practitioner',
    organization: 'Amazon Web Services',
    period: '2023',
    description:
      'Fundamentos de computação em nuvem, incluindo arquitetura, segurança e modelos de preço da AWS.',
    type: 'education',
  },
  {
    id: 8,
    title: 'Prêmio de Melhoria de Performance Web',
    organization: 'Tech Conference Brasil',
    period: '2021',
    description:
      'Premiado pela otimização e melhoria significativa na performance de aplicações web, com foco em velocidade e responsividade.',
    type: 'award',
  },
  {
    id: 9,
    title: 'Curso de UX/UI Design',
    organization: 'Origamid',
    period: '2022',
    description:
      'Princípios de design de interface, experiência do usuário, prototipagem e design responsivo com foco em aplicações web.',
    type: 'education',
  },
  {
    id: 10,
    title: 'Formação em Inteligência Artificial',
    organization: 'Alura',
    period: '2023',
    description:
      'Estudo aprofundado sobre machine learning, processamento de linguagem natural e visão computacional com Python e TensorFlow.',
    type: 'education',
  },
  {
    id: 11,
    title: 'Prêmio Startup Revelação',
    organization: 'Startup Summit',
    period: '2018',
    description: 'Reconhecimento pelo desenvolvimento inovador de plataforma SaaS para pequenas empresas.',
    type: 'award',
  },
  {
    id: 12,
    title: 'Prêmio HealthTech Inovação',
    organization: 'HealthTech Awards',
    period: '2019',
    description: 'Premiação por soluções digitais inovadoras no setor de saúde.',
    type: 'award',
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-20 px-6 bg-modern-dark">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="section-title text-modern-white">Educação</h2>
        </motion.div>

        <div className="relative border-l-2 border-modern-accent/30 pl-8 space-y-12 ml-4">
          {educationItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-[42px] bg-modern-dark p-1 rounded-full border-2 border-modern-accent">
                {item.type === 'education' ? (
                  <GraduationCap className="w-5 h-5 text-modern-accent" />
                ) : (
                  <Award className="w-5 h-5 text-modern-accent" />
                )}
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
      </div>
    </section>
  );
}
