import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, GraduationCap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TimelineItem = {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: "work" | "education" | "award";
};

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    title: "Desenvolvedor Front-End Pleno",
    organization: "Appezshop",
    period: "2021 - Presente",
    description:
      "Lidero o desenvolvimento front-end de aplicativos empresariais, mentorei desenvolvedores juniores e implementei padrões modernos de arquitetura React.",
    type: "work",
  },
  {
    id: 2,
    title: "Desenvolvedor Front-End",
    organization: "LATAM",
    period: "2024 - 2025",
    description:
      "Desenvolvi aplicações web responsivas usando React, TypeScript e frameworks modernos de CSS. Colaborei com designers de UX para implementar interfaces com perfeição pixel a pixel.",
    type: "work",
  },
  {
    id: 3,
    title: "Bacharelado em Ciência da Computação",
    organization: "Universidade Anhembi Morumbi",
    period: "2023-2027",
    description:
      "Especializei-me em tecnologias web e design de interfaces de usuário. Me formei com honras.",
    type: "education",
  },
  {
    id: 4,
    title: "Prêmio de Excelência em Desenvolvimento Web",
    organization: "Conferência Regional de Tecnologia",
    period: "2020",
    description:
      "Reconhecido por contribuições excepcionais para as práticas de desenvolvimento front-end e projetos de código aberto.",
    type: "award",
  },
];

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<"all" | "work" | "education" | "award">("all");

  const filteredItems =
    activeTab === "all"
      ? timelineItems
      : timelineItems.filter((item) => item.type === activeTab);

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
            <h3 className="text-2xl font-bold text-modern-white">Experiência & Educação</h3>
            <div className="flex flex-wrap gap-2">
              <Badge
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 cursor-pointer text-modern-white ${
                  activeTab === "all" 
                    ? "bg-modern-accent hover:bg-modern-accent/90" 
                    : "bg-modern-dark hover:bg-modern-dark/70"
                }`}
              >
                Todos
              </Badge>
              <Badge
                onClick={() => setActiveTab("work")}
                className={`px-3 py-1 cursor-pointer text-modern-white ${
                  activeTab === "work" 
                    ? "bg-modern-accent hover:bg-modern-accent/90" 
                    : "bg-modern-dark hover:bg-modern-dark/70"
                }`}
              >
                Trabalho
              </Badge>
              <Badge
                onClick={() => setActiveTab("education")}
                className={`px-3 py-1 cursor-pointer text-modern-white ${
                  activeTab === "education" 
                    ? "bg-modern-accent hover:bg-modern-accent/90" 
                    : "bg-modern-dark hover:bg-modern-dark/70"
                }`}
              >
                Educação
              </Badge>
              <Badge
                onClick={() => setActiveTab("award")}
                className={`px-3 py-1 cursor-pointer text-modern-white ${
                  activeTab === "award" 
                    ? "bg-modern-accent hover:bg-modern-accent/90" 
                    : "bg-modern-dark hover:bg-modern-dark/70"
                }`}
              >
                Prêmios
              </Badge>
            </div>
          </div>

          <div className="relative border-l-2 border-modern-accent/30 pl-8 space-y-12 ml-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[42px] bg-modern-darker p-1 rounded-full border-2 border-modern-accent">
                  {item.type === "work" ? (
                    <Briefcase className="w-5 h-5 text-modern-accent" />
                  ) : item.type === "education" ? (
                    <GraduationCap className="w-5 h-5 text-modern-accent" />
                  ) : (
                    <Award className="w-5 h-5 text-modern-accent" />
                  )}
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
