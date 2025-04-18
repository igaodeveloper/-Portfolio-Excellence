import { motion } from 'framer-motion';
import { Building2, Calendar } from 'lucide-react';

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

const experiences: Experience[] = [
  {
    company: 'Santander',
    role: 'Senior Frontend Developer',
    period: '2023',
    description:
      'Desenvolvimento e otimização de aplicações bancárias com React e TypeScript. Implementação de soluções seguras e responsivas para internet banking, melhorando a experiência do usuário e reduzindo o tempo de carregamento em 40%.',
  },
  {
    company: 'GOV',
    role: 'Desenvolvedor Full Stack',
    period: '2021 - 2022',
    description:
      'Desenvolvimento de sistemas governamentais utilizando Node.js e React. Integração com APIs de serviços públicos e implementação de autenticação segura. Participação em projetos de modernização de plataformas digitais de atendimento ao cidadão.',
  },
  {
    company: 'Stefanini',
    role: 'Desenvolvedor Frontend',
    period: '2024 - 2025',
    description:
      'Atuação em projetos para grandes clientes do setor financeiro e de telecomunicações. Desenvolvimento de interfaces com Angular e integração com backends Java. Trabalho em equipes ágeis seguindo metodologia Scrum.',
  },
  {
    company: 'RHSYSTEM',
    role: 'Desenvolvedor front end plaeno',
    period: '2025 - presente',
    description:
      'Desenvolvimento e manutenção de sistemas de gestão de recursos humanos. Implementação de recursos para otimização de processos de recrutamento e seleção. Criação de relatórios dinâmicos e painéis administrativos.',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 bg-modern-dark">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="section-title text-modern-white">Experiências</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-hover bg-modern-darker rounded-lg p-6 border border-modern-accent/10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-modern-accent/10 p-2 rounded-lg">
                  <Building2 className="text-modern-accent w-6 h-6" />
                </div>
                <div className="flex items-center text-modern-gray text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {exp.period}
                </div>
              </div>
              <h3 className="text-xl font-bold text-modern-white mb-2">
                {exp.company}
              </h3>
              <h4 className="text-modern-accent2 font-medium mb-3">
                {exp.role}
              </h4>
              <p className="text-modern-gray">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
