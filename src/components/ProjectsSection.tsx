import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedTitle } from "@/components/ui/animated-text";
import { TiltCard } from "@/components/ui/tilt-card";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { AnimatedItem } from "./AnimatedSection";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Dashboard de E-Commerce",
    description:
      "Um painel completo para negócios de e-commerce com análises em tempo real, gestão de estoque e insights de clientes.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    liveUrl: "https://example.com/ecommerce-dashboard",
    githubUrl: "https://github.com/username/ecommerce-dashboard",
    featured: true,
  },
  {
    id: 2,
    title: "App de Rede Social",
    description:
      "Um aplicativo moderno de rede social com mensagens em tempo real, compartilhamento de posts e autenticação de usuários.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    tags: ["React", "Firebase", "Tailwind CSS", "Redux"],
    liveUrl: "https://example.com/social-media-app",
    githubUrl: "https://github.com/username/social-media-app",
    featured: true,
  },
  {
    id: 3,
    title: "App de Previsão do Tempo",
    description:
      "Um aplicativo de clima que fornece previsões precisas, mapas interativos e alertas com base na localização.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
    tags: ["JavaScript", "Integração de API", "CSS3", "HTML5"],
    liveUrl: "https://example.com/weather-app",
    githubUrl: "https://github.com/username/weather-app",
    featured: false,
  },
  {
    id: 4,
    title: "Sistema de Gestão de Tarefas",
    description:
      "Uma ferramenta de produtividade para gerenciar tarefas, projetos e colaboração em equipe com funcionalidade de arrastar e soltar.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://example.com/task-management",
    githubUrl: "https://github.com/username/task-management",
    featured: false,
  },
  {
    id: 5,
    title: "Site de Portfólio",
    description:
      "Um site de portfólio responsivo exibindo projetos, habilidades e experiência profissional com um design moderno.",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80",
    tags: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    liveUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/username/portfolio",
    featured: true,
  },
  {
    id: 6,
    title: "App de Busca de Receitas",
    description:
      "Um app culinário que ajuda usuários a descobrir receitas com base em ingredientes disponíveis, restrições alimentares e preferências.",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
    tags: ["JavaScript", "Integração de API", "CSS3", "HTML5"],
    liveUrl: "https://example.com/recipe-finder",
    githubUrl: "https://github.com/username/recipe-finder",
    featured: false,
  },
];

const categories = [
  "Todos",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Integração de API",
  "Tailwind CSS",
];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((project) => project.tags.includes(activeCategory));

  return (
    <section id="projects" className="py-20 px-6 bg-modern-darker">
      <div className="container-section">
        <AnimatedTitle 
          text="Projetos" 
          className="section-title text-modern-white mb-12"
        />

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <AnimatedItem
              key={category}
              direction="up"
              delay={index * 0.05}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border border-modern-accent/20 hover:bg-modern-accent/10 hover:text-modern-accent ${
                  activeCategory === category 
                    ? "bg-modern-accent/10 text-modern-accent" 
                    : "text-modern-gray"
                }`}
              >
                {category}
              </Button>
            </AnimatedItem>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <AnimatedItem
              key={project.id}
              direction="up"
              delay={index * 0.05}
            >
              <TiltCard
                className="h-full card-hover bg-modern-dark rounded-lg overflow-hidden border border-modern-accent/10"
                glareEnabled={true}
                glareMaxOpacity={0.1}
                scale={1.02}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
              >
                <div 
                  className="relative overflow-hidden aspect-video"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: hoveredProject === project.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge
                        className="bg-modern-accent2 hover:bg-modern-accent2/90 border-none text-modern-white"
                      >
                        Destaque
                      </Badge>
                    </div>
                  )}
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-modern-dark to-transparent opacity-0"
                    animate={{
                      opacity: hoveredProject === project.id ? 0.6 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-modern-white mb-2">{project.title}</h3>
                  <p className="text-modern-gray mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-modern-accent/20 hover:bg-modern-accent/30 text-modern-accent border-none"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-modern-gray hover:text-modern-accent transition-colors"
                          aria-label={`Repositório GitHub de ${project.title}`}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={20} />
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-modern-gray hover:text-modern-accent transition-colors"
                          aria-label={`Demo online de ${project.title}`}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="group text-modern-gray hover:text-modern-accent hover:bg-transparent"
                    >
                      Ver Detalhes
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <ArrowRight size={16} className="ml-2" />
                      </motion.div>
                    </Button>
                  </div>
                </div>
              </TiltCard>
            </AnimatedItem>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-modern-gray">
              Nenhum projeto encontrado nesta categoria.
            </p>
          </div>
        )}

        <motion.div 
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            size="lg" 
            className="rounded bg-modern-dark hover:bg-modern-dark/80 text-modern-white border border-modern-accent/20 group"
          >
            Ver mais projetos
            <motion.div
              initial={{ x: 0, opacity: 0.5 }}
              animate={{ x: [0, 5, 0], opacity: 1 }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "loop", 
                duration: 2,
                ease: "easeInOut" 
              }}
            >
              <ArrowRight size={16} className="ml-2" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
