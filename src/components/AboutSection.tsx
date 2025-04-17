import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    title: "Desenvolvedor Front-End Pleno",
    organization: "Appezshop",
    period: "2021 - Presente",
    description:
      "Lidero o desenvolvimento front-end de aplicativos empresariais, mentorei desenvolvedores juniores e implementei padrões modernos de arquitetura React.",
  },
  {
    id: 2,
    title: "Desenvolvedor Front-End",
    organization: "LATAM",
    period: "2024 - 2025",
    description:
      "Desenvolvi aplicações web responsivas usando React, TypeScript e frameworks modernos de CSS. Colaborei com designers de UX para implementar interfaces com perfeição pixel a pixel.",
  },
  {
    id: 3,
    title: "Desenvolvedor Front-End Júnior",
    organization: "TechSmart Solutions",
    period: "2020 - 2021",
    description:
      "Atuei no desenvolvimento de interfaces interativas para sistemas de gestão empresarial, utilizando React, Redux e Material UI. Participei de sprints ágeis e implementei melhorias de usabilidade.",
  },
  {
    id: 4,
    title: "Freelancer Front-End",
    organization: "Projetos Independentes",
    period: "2019 - 2020",
    description:
      "Desenvolvi websites responsivos para pequenas empresas e startups utilizando HTML5, CSS3 e JavaScript. Implementei layouts modernos com foco em performance e experiência do usuário.",
  },
  {
    id: 5,
    title: "Estagiário de Desenvolvimento Web",
    organization: "Digital Innovation Agency",
    period: "2019 - 2019",
    description:
      "Auxiliei na implementação de landing pages e sistemas de e-commerce usando WordPress e JavaScript. Participei de reuniões de planejamento e aprendi sobre fluxos de trabalho profissionais.",
  },
  {
    id: 6,
    title: "Desenvolvedor Front-End Voluntário",
    organization: "ONG Educação Para Todos",
    period: "2018 - 2019",
    description:
      "Colaborei no desenvolvimento de uma plataforma educacional acessível para comunidades carentes, utilizando Vue.js e Bootstrap. Implementei recursos de acessibilidade e otimizei a experiência mobile.",
  },
  {
    id: 7,
    title: "Auxiliar de Desenvolvimento Web",
    organization: "Agência CreativeDev",
    period: "2018 - 2018",
    description:
      "Participei da manutenção de sites corporativos e da implementação de novas funcionalidades utilizando jQuery e SASS. Realizei tarefas de otimização de código e integração com APIs de terceiros.",
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
                Com mais de <span className="text-modern-accent">4 anos de experiência</span> em desenvolvimento front-end, dediquei minha carreira a criar experiências web bonitas, funcionais e acessíveis. Minha abordagem combina conhecimento técnico com uma profunda compreensão das necessidades do usuário e dos princípios de design.
              </p>
              <p className="text-modern-gray text-lg leading-relaxed">
                Sou especializado na criação de aplicações responsivas e performáticas usando frameworks modernos de JavaScript, com foco especial em <span className="text-modern-accent2">React</span> e seu ecossistema. Sou apaixonado por código limpo, arquitetura baseada em componentes e por estar na vanguarda das tecnologias web.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-modern-gray text-lg leading-relaxed">
                Quando não estou programando, você pode me encontrar explorando novas tendências de design, contribuindo para projetos de código aberto ou compartilhando conhecimento através de escrita técnica e mentoria.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Badge className="bg-modern-accent/20 hover:bg-modern-accent/30 text-modern-accent border-none px-4 py-2 text-sm">React</Badge>
                <Badge className="bg-modern-accent/20 hover:bg-modern-accent/30 text-modern-accent border-none px-4 py-2 text-sm">TypeScript</Badge>
                <Badge className="bg-modern-accent/20 hover:bg-modern-accent/30 text-modern-accent border-none px-4 py-2 text-sm">Next.js</Badge>
                <Badge className="bg-modern-accent/20 hover:bg-modern-accent/30 text-modern-accent border-none px-4 py-2 text-sm">Tailwind CSS</Badge>
                <Badge className="bg-modern-accent/20 hover:bg-modern-accent/30 text-modern-accent border-none px-4 py-2 text-sm">UI/UX Design</Badge>
                <Badge className="bg-modern-accent/20 hover:bg-modern-accent/30 text-modern-accent border-none px-4 py-2 text-sm">Figma</Badge>
                <Badge className="bg-modern-accent/20 hover:bg-modern-accent/30 text-modern-accent border-none px-4 py-2 text-sm">Node.js</Badge>
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
            <h3 className="text-2xl font-bold text-modern-white">Experiência</h3>
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
                  <h4 className="text-xl font-semibold text-modern-white">{item.title}</h4>
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
