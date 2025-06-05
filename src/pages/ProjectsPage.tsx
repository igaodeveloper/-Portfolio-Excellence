import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Code, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';

// Sample projects data
const projects = [
  {
    id: 1,
    title: 'E-commerce Dashboard',
    description:
      'Dashboard administrativo para gerenciamento de e-commerce com visualização de vendas, produtos e clientes.',
    image:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    category: 'web',
  },
  {
    id: 2,
    title: 'Blog NextJS',
    description:
      'Blog pessoal construído com Next.js, Tailwind CSS e MDX para criação de conteúdo técnico.',
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['Next.js', 'Tailwind CSS', 'MDX', 'Vercel'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    category: 'web',
  },
  {
    id: 3,
    title: 'Aplicativo de Gestão de Tarefas',
    description:
      'Aplicativo móvel para gerenciamento de tarefas diárias, com sincronização em nuvem e notificações.',
    image:
      'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['React Native', 'Firebase', 'Redux', 'Expo'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
    category: 'mobile',
  },
  {
    id: 4,
    title: 'Biblioteca de Componentes UI',
    description:
      'Biblioteca de componentes UI reutilizáveis com foco em acessibilidade e personalização.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Storybook', 'Jest', 'CSS-in-JS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
    category: 'library',
  },
  {
    id: 5,
    title: 'Portfólio de Fotografia',
    description:
      'Site para fotógrafo profissional com galeria de imagens, blog e formulário de contato.',
    image:
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['HTML', 'CSS', 'JavaScript', 'Lightbox'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
    category: 'web',
  },
  {
    id: 6,
    title: 'Extensão para VS Code',
    description:
      'Extensão para VS Code que automatiza tarefas comuns de desenvolvimento front-end.',
    image:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['TypeScript', 'VS Code API', 'Node.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
    category: 'tool',
  },
];

const ProjectsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects =
    activeTab === 'all'
      ? projects
      : projects.filter((project) => project.category === activeTab);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}
    >
      <Navbar />

      <header className="pt-32 pb-16 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-300 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Voltar para o blog</span>
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meus Projetos
            </h1>
            <p className="text-xl opacity-90 max-w-2xl">
              Uma seleção dos meus projetos mais recentes e relevantes no campo
              do desenvolvimento front-end.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 dark:text-white">
              Projetos em Destaque
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        width="1920"
                        height="1080"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-6 w-full">
                          <div className="flex justify-between items-center">
                            <Badge
                              variant="secondary"
                              className="bg-blue-600 text-white"
                            >
                              Destaque
                            </Badge>
                            <div className="flex space-x-2">
                              {project.githubUrl && (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  asChild
                                  className="bg-white/20 border-0 hover:bg-white/30"
                                >
                                  <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub repository"
                                  >
                                    <Github className="h-4 w-4 text-white" />
                                  </a>
                                </Button>
                              )}
                              {project.liveUrl && (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  asChild
                                  className="bg-white/20 border-0 hover:bg-white/30"
                                >
                                  <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Live demo"
                                  >
                                    <ExternalLink className="h-4 w-4 text-white" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-base dark:text-gray-400">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="dark:text-gray-300 dark:border-gray-700"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex space-x-2">
                        {project.githubUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-4 w-4 mr-2" />
                              Código
                            </a>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button size="sm" asChild>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Globe className="h-4 w-4 mr-2" />
                              Ver projeto
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* All Projects */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold dark:text-white">
              Todos os Projetos
            </h2>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="web">Web</TabsTrigger>
                <TabsTrigger value="mobile">Mobile</TabsTrigger>
                <TabsTrigger value="library">Bibliotecas</TabsTrigger>
                <TabsTrigger value="tool">Ferramentas</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 * (filteredProjects.indexOf(project) % 6),
                }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      width="1920"
                      height="1080"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 dark:text-gray-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex space-x-2">
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3"
                          asChild
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-3.5 w-3.5 mr-1" />
                            Código
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button size="sm" className="h-8 px-3" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-1" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Code className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                Nenhum projeto nesta categoria
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Não existem projetos na categoria selecionada.
              </p>
              <Button onClick={() => setActiveTab('all')}>
                Ver todos os projetos
              </Button>
            </div>
          )}
        </section>

        {/* Call to action */}
        <section className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Interessado em trabalhar juntos?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Estou sempre aberto a novas oportunidades e parcerias. Entre em
              contato para discutirmos seu projeto!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/blog/contato">Entre em contato</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/blog/sobre">Conheça mais sobre mim</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
