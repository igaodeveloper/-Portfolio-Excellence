import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedTitle } from "@/components/ui/animated-text";
import { TiltCard } from "@/components/ui/tilt-card";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { AnimatedItem } from "./AnimatedSection";
import { Input } from "@/components/ui/input";

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

// Extrair todas as tags únicas dos projetos
const extractTags = (): string[] => {
  const allTags = projects.flatMap(project => project.tags);
  const uniqueTags = Array.from(new Set(allTags));
  return ["Todos", ...uniqueTags];
};

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>(projects);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  // Categorias extraídas dinamicamente dos projetos
  const categories = extractTags();

  // Filtrar projetos com base na categoria e pesquisa
  useEffect(() => {
    let filtered = projects;
    
    // Filtrar por categoria
    if (activeCategory !== "Todos") {
      filtered = filtered.filter(project => project.tags.includes(activeCategory));
    }
    
    // Filtrar por termo de busca
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term) ||
        project.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setDisplayedProjects(filtered);
  }, [activeCategory, searchTerm]);

  // Navegar para os detalhes do projeto
  const handleViewDetails = (id: number) => {
    console.log(`Navegando para detalhes do projeto ${id}`);
    // Implementar navegação para página de detalhes do projeto
  };

  return (
    <section 
      id="projects" 
      className="relative py-24 px-6 bg-modern-darker overflow-hidden"
      ref={containerRef}
    >
      {/* Background decoration elements */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-modern-accent/5 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-modern-accent2/5 rounded-full blur-3xl opacity-30" />
      
      <div className="container-section relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedTitle 
            text="Projetos" 
            className="section-title text-modern-white mb-4"
          />
          
          <motion.p 
            className="text-modern-gray text-center max-w-xl mx-auto mb-12"
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            Explore meus principais projetos que demonstram minhas habilidades e experiência em desenvolvimento web e tecnologias modernas.
          </motion.p>
        </motion.div>

        {/* Filtros e Busca */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4"
        >
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-modern-gray/60 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-modern-dark/80 border-modern-accent/20 text-modern-gray focus:border-modern-accent focus:ring-1 focus:ring-modern-accent/20 rounded-lg"
            />
          </div>
          
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 md:hidden text-modern-gray hover:text-modern-accent"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} />
              Filtros
            </Button>
            
            <motion.div
              variants={staggerContainer(0.02)}
              initial="hidden"
              animate="show"
              className={`gap-2 flex-wrap md:flex ${isFilterOpen ? 'flex' : 'hidden'} md:flex-row justify-end`}
            >
              {categories.map((category, index) => (
                <AnimatedItem
                  key={category}
                  direction="up"
                  delay={index * 0.02}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-4 py-1 border-modern-accent/20 transition-all duration-300 ${
                      activeCategory === category 
                        ? "bg-modern-accent/10 text-modern-accent border-modern-accent/40" 
                        : "text-modern-gray hover:bg-modern-accent/5 hover:text-modern-accent"
                    }`}
                  >
                    {category}
                  </Button>
                </AnimatedItem>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Projetos grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchTerm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeIn("up", 0.05 * index)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="h-full"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <TiltCard
                  className="h-full card-hover bg-modern-dark/90 rounded-xl overflow-hidden border border-modern-accent/10 shadow-lg shadow-modern-darker/50"
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
                      className="w-full h-full object-cover transition-transform"
                      initial={{ scale: 1 }}
                      animate={{
                        scale: hoveredProject === project.id ? 1.05 : 1
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    
                    {project.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge
                          className="bg-modern-accent2 hover:bg-modern-accent2/90 border-none text-modern-white font-medium px-3 py-1"
                        >
                          Destaque
                        </Badge>
                      </div>
                    )}
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-modern-dark via-modern-dark/60 to-transparent"
                      initial={{ opacity: 0.3 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 0.7 : 0.3
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Links visíveis no hover da imagem */}
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center gap-4 opacity-0"
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-modern-dark/80 p-3 rounded-full text-modern-white hover:text-modern-accent hover:bg-modern-dark/90 transition-all"
                          aria-label={`Repositório GitHub de ${project.title}`}
                          whileHover={{ y: -3, scale: 1.1 }}
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
                          className="bg-modern-dark/80 p-3 rounded-full text-modern-white hover:text-modern-accent hover:bg-modern-dark/90 transition-all"
                          aria-label={`Demo online de ${project.title}`}
                          whileHover={{ y: -3, scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-modern-white mb-2 group-hover:text-modern-accent transition-colors">{project.title}</h3>
                    <p className="text-modern-gray mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-modern-accent/10 hover:bg-modern-accent/20 text-modern-accent border-none transition-colors px-2.5 py-0.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-end items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewDetails(project.id)}
                        className="group text-modern-gray hover:text-modern-accent hover:bg-modern-accent/5 transition-all duration-300"
                      >
                        Ver Detalhes
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="inline-block ml-2"
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </Button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {displayedProjects.length === 0 && (
          <motion.div 
            className="text-center py-16 bg-modern-dark/20 rounded-xl border border-modern-accent/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-modern-gray text-lg">
              Nenhum projeto encontrado com os filtros atuais.
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {setActiveCategory("Todos"); setSearchTerm("");}}
              className="mt-4 text-modern-accent hover:bg-modern-accent/10"
            >
              Limpar filtros
            </Button>
          </motion.div>
        )}

        {displayedProjects.length > 0 && (
          <motion.div 
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button 
              size="lg" 
              className="rounded-lg bg-modern-dark hover:bg-modern-accent/10 text-modern-white hover:text-modern-accent border border-modern-accent/20 group transition-all duration-300 px-6 py-2.5"
            >
              Ver mais projetos
              <motion.span
                initial={{ x: 0, opacity: 0.5 }}
                animate={{ x: [0, 5, 0], opacity: 1 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 2,
                  ease: "easeInOut" 
                }}
                className="inline-block ml-2"
              >
                <ArrowRight size={16} />
              </motion.span>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
