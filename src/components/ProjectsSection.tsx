import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedTitle } from '@/components/ui/animated-text';
import { TiltCard } from '@/components/ui/tilt-card';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { AnimatedItem } from './AnimatedSection';
import { Input } from '@/components/ui/input';

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
    title: 'Portfolio 3D Interativo',
    description:
      'Um portfólio imersivo com modelos 3D e animações interativas criado com Three.js e React. Inclui uma ilha 3D animada na página inicial e um modelo 3D de raposa na seção de contato.',
    image:
      'https://images.unsplash.com/photo-1618346136472-090de27fe8b4?w=800&q=80',
    tags: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    liveUrl: 'https://3d-portfolio-neon-eta.vercel.app/',
    githubUrl: 'https://github.com/YTyndyk/3D-Portfolio',
    featured: true,
  },
  {
    id: 2,
    title: 'Sistema de Gestão de Tarefas',
    description:
      'Aplicação full-stack para gerenciamento de projetos e tarefas com funcionalidades avançadas como arrastar e soltar, filtros de tarefas, notificações e relatórios em tempo real.',
    image:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    liveUrl: 'https://task-master-pro.vercel.app/',
    githubUrl: 'https://github.com/CodeWithSadee/taskmate',
    featured: true,
  },
  {
    id: 3,
    title: 'Dashboard Analítico',
    description:
      'Dashboard interativo e responsivo para visualização de dados com gráficos personalizáveis, temas escuro/claro, e painel de administração para gerenciamento de usuários.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['React', 'TypeScript', 'Chart.js', 'Material UI', 'Firebase'],
    liveUrl: 'https://react-admin-dashboard-sigma.vercel.app/',
    githubUrl: 'https://github.com/adrianhajdin/project_syncfusion_dashboard',
    featured: true,
  },
  {
    id: 4,
    title: 'App de Previsão do Tempo',
    description:
      'Aplicativo de clima que utiliza geolocalização e a API OpenWeatherMap para fornecer previsões precisas, com recursos visuais distintos para diferentes condições climáticas.',
    image:
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80',
    tags: ['JavaScript', 'OpenWeatherAPI', 'CSS3', 'HTML5', 'LocalStorage'],
    liveUrl: 'https://weather-app-javascript-nine.vercel.app/',
    githubUrl: 'https://github.com/said7388/Weather-app-javascript',
    featured: false,
  },
  {
    id: 5,
    title: 'Site de Portfólio HTML/CSS',
    description:
      'Um portfólio profissional elegante desenvolvido apenas com HTML e CSS, completamente responsivo para todos os dispositivos, com design moderno e seções bem organizadas.',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
    tags: ['HTML', 'CSS', 'Responsivo', 'Animações CSS'],
    liveUrl: 'https://smoljames-portfolio.netlify.app/',
    githubUrl: 'https://github.com/jamezmca/ultimate-web-portfolio',
    featured: false,
  },
  {
    id: 6,
    title: 'Aplicativo de Rede Social',
    description:
      'Rede social completa com autenticação de usuários, postagens em tempo real, comentários, curtidas, e mensagens diretas. Inclui notificações push e feed personalizado.',
    image:
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    tags: ['React', 'Firebase', 'Tailwind CSS', 'Redux', 'Real-time'],
    liveUrl: 'https://socialgram-app.vercel.app/',
    githubUrl: 'https://github.com/adrianhajdin/social_media_app',
    featured: true,
  },
  {
    id: 7,
    title: 'Loja Virtual E-commerce',
    description:
      'Plataforma completa de e-commerce com catálogo de produtos, carrinho de compras, checkout, pagamentos, e painel administrativo para gerenciamento de produtos e pedidos.',
    image:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
    tags: ['Next.js', 'Stripe', 'Sanity.io', 'React', 'Tailwind CSS'],
    liveUrl: 'https://ecommerce-sanity-stripe-six.vercel.app/',
    githubUrl: 'https://github.com/adrianhajdin/ecommerce_sanity_stripe',
    featured: true,
  },
  {
    id: 8,
    title: 'Aplicativo de Chatbot com IA',
    description:
      'Aplicativo de chat alimentado por inteligência artificial que permite conversas com um assistente virtual inteligente, histórico de conversas e exportação de diálogos.',
    image:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    tags: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'TypeScript', 'Auth.js'],
    liveUrl: 'https://ai-chatbot-client.vercel.app/',
    githubUrl: 'https://github.com/vercel/ai-chatbot',
    featured: false,
  },
  {
    id: 9,
    title: 'Plataforma de Trading e Finanças',
    description:
      'Plataforma de trading com integração de chatbot de IA para melhorar a experiência de negociação em um ambiente simulado. Inclui análise de ações, portfólio em tempo real e histórico de transações.',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'ChatGPT API', 'Prisma'],
    liveUrl: 'https://dynamitetrade.vercel.app/',
    githubUrl: 'https://github.com/longleDevops/Financial-App',
    featured: true,
  },
  {
    id: 10,
    title: 'Fundo de Hedge com IA',
    description:
      'Um sistema de hedge fund com IA que simula uma equipe de investidores virtuais baseada em especialistas famosos como Warren Buffett e Charlie Munger para gerar decisões de investimento.',
    image:
      'https://images.unsplash.com/photo-1534951009808-766178b47a4f?w=800&q=80',
    tags: ['Python', 'OpenAI API', 'Análise Financeira', 'Machine Learning'],
    liveUrl: '',
    githubUrl: 'https://github.com/virattt/ai-hedge-fund',
    featured: true,
  },
  {
    id: 11,
    title: 'Portfólio Desenvolvedor Deno',
    description:
      'Template de portfólio minimalista e responsivo para desenvolvedores, criado com Deno Fresh e ThreeJS. Licença MIT que permite uso, modificação e distribuição gratuita para todos.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    tags: ['TypeScript', 'Deno', 'ThreeJS', 'Tailwind CSS', 'Fresh'],
    liveUrl: 'https://opensource-portfolio.deno.dev/',
    githubUrl: 'https://github.com/michael-pfister/deno-portfolio',
    featured: false,
  },
  {
    id: 12,
    title: 'Sistema de Autenticação Completo',
    description:
      'Sistema completo de autenticação com login, cadastro, recuperação de senha, verificação em duas etapas e gerenciamento de perfil usando tecnologias modernas de segurança.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    tags: ['Next.js', 'Prisma', 'NextAuth', 'TypeScript', 'OAuth'],
    liveUrl: 'https://next-auth-v5-phi.vercel.app/',
    githubUrl: 'https://github.com/AntonioErdeljac/next-auth-v5',
    featured: false,
  },
];

// Extrair todas as tags únicas dos projetos
const extractTags = (): string[] => {
  const allTags = projects.flatMap((project) => project.tags);
  const uniqueTags = Array.from(new Set(allTags));
  return ['Todos', ...uniqueTags];
};

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedProjects, setDisplayedProjects] =
    useState<Project[]>(projects);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  // Categorias extraídas dinamicamente dos projetos
  const categories = extractTags();

  // Filtrar projetos com base na categoria e pesquisa
  useEffect(() => {
    let filtered = projects;

    // Filtrar por categoria
    if (activeCategory !== 'Todos') {
      filtered = filtered.filter((project) =>
        project.tags.includes(activeCategory),
      );
    }

    // Filtrar por termo de busca
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.tags.some((tag) => tag.toLowerCase().includes(term)),
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
            text="Projetos reais"
            className="section-title text-modern-white mb-4"
          />

          <motion.p
            className="text-modern-gray text-center max-w-xl mx-auto mb-12"
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
          >
            Explore meus principais projetos que demonstram minhas habilidades e
            experiência em desenvolvimento web e tecnologias modernas.
          </motion.p>
        </motion.div>

        {/* Filtros e Busca */}
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
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
                        ? 'bg-modern-accent/10 text-modern-accent border-modern-accent/40'
                        : 'text-modern-gray hover:bg-modern-accent/5 hover:text-modern-accent'
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
                variants={fadeIn('up', 0.05 * index)}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
                className="h-full"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
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
                        scale: hoveredProject === project.id ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />

                    {project.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-modern-accent2 hover:bg-modern-accent2/90 border-none text-modern-white font-medium px-3 py-1">
                          Destaque
                        </Badge>
                      </div>
                    )}

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-modern-dark via-modern-dark/60 to-transparent"
                      initial={{ opacity: 0.3 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 0.7 : 0.3,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Links visíveis no hover da imagem */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center gap-4 opacity-0"
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
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
                    <h3 className="text-xl font-bold text-modern-white mb-2 group-hover:text-modern-accent transition-colors">
                      {project.title}
                    </h3>
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
                          transition={{ type: 'spring', stiffness: 400 }}
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
              onClick={() => {
                setActiveCategory('Todos');
                setSearchTerm('');
              }}
              className="mt-4 text-modern-accent hover:bg-modern-accent/10"
            >
              Limpar filtros
            </Button>
          </motion.div>
        )}

        {displayedProjects.length > 0 && (
          <motion.div
            variants={fadeIn('up', 0.3)}
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
                  repeatType: 'loop',
                  duration: 2,
                  ease: 'easeInOut',
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
