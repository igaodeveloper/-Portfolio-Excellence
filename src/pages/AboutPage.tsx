import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Globe,
  ArrowLeft,
  FileText,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';

const AboutPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

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

  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'CSS/Sass', level: 90 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'UX/UI Design', level: 80 },
    { name: 'JavaScript', level: 95 },
    { name: 'HTML', level: 98 },
    { name: 'Node.js', level: 75 },
    { name: 'Acessibilidade', level: 85 },
    { name: 'Performance Web', level: 90 },
    { name: 'Testes', level: 75 },
  ];

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
            className="flex flex-col md:flex-row md:items-center gap-8 max-w-5xl mx-auto"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/20 flex-shrink-0 mx-auto md:mx-0">
              <img
                src="https://avatars.githubusercontent.com/u/12345678?v=4"
                alt="Avatar do autor"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <Link
                to="/blog"
                className="inline-flex items-center text-blue-300 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Voltar para o blog</span>
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Sobre o Autor
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Desenvolvedor fullstack pleno com 5 anos de experiência,
                especializado em construir aplicações web modernas,
                performáticas e acessíveis de ponta a ponta — do front elegante
                ao back robusto.
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <section className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  Quem sou eu
                </h2>
                <div className="prose prose-lg dark:prose-invert">
                  <p>
                    Olá! Sou um desenvolvedor fullstack brasileiro com 5 anos de
                    experiência profissional, atuando tanto no front-end quanto
                    no back-end. Domino as tecnologias mais modernas do
                    ecossistema web para entregar soluções completas, escaláveis
                    e com alto padrão de qualidade.
                  </p>
                  <p>
                    Minha jornada no desenvolvimento web começou por acaso,
                    quando precisei criar um site para um projeto pessoal. Desde
                    então, me apaixonei pela combinação perfeita de lógica e
                    criatividade que o desenvolvimento oferece.
                  </p>
                  <p>
                    Sou obcecado por detalhes, performance e acessibilidade.
                    Acredito firmemente que a web deve ser para todos,
                    independentemente de suas limitações ou dispositivos.
                  </p>
                  <p>
                    Quando não estou codificando, gosto de compartilhar
                    conhecimento através deste blog, participar de comunidades
                    de desenvolvedores e colaborar em projetos open source.
                  </p>
                </div>
              </section>

              <section className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  Minha Stack
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium dark:text-white">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  Por que escrevo
                </h2>
                <div className="prose prose-lg dark:prose-invert">
                  <p>
                    Acredito que compartilhar conhecimento é uma das melhores
                    formas de aprender e evoluir. Este blog surgiu da minha
                    necessidade de documentar meu aprendizado e, ao mesmo tempo,
                    ajudar outros desenvolvedores que possam estar enfrentando
                    os mesmos desafios.
                  </p>
                  <p>
                    Meu objetivo é criar conteúdo que eu gostaria de ter
                    encontrado quando estava aprendendo - direto ao ponto, com
                    exemplos práticos e explicações claras.
                  </p>
                  <p>
                    Além disso, escrever me ajuda a consolidar conhecimentos e a
                    descobrir lacunas no meu entendimento sobre determinados
                    tópicos. Como diz o ditado: "Se você não consegue explicar
                    algo de forma simples, você não o entendeu bem o
                    suficiente."
                  </p>
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <aside className="sticky top-32 space-y-8">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-4 dark:text-white">
                    Entre em contato
                  </h3>

                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="mr-2 h-4 w-4" /> Twitter
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href="mailto:contato@example.com">
                        <Mail className="mr-2 h-4 w-4" /> contato@example.com
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a
                        href="https://example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="mr-2 h-4 w-4" /> example.com
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-4 dark:text-white">
                    Categorias
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      asChild
                    >
                      <Link to="/blog/categoria/css">CSS</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      asChild
                    >
                      <Link to="/blog/categoria/javascript">JavaScript</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      asChild
                    >
                      <Link to="/blog/categoria/react">React</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      asChild
                    >
                      <Link to="/blog/categoria/performance">Performance</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      asChild
                    >
                      <Link to="/blog/categoria/acessibilidade">
                        Acessibilidade
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-md p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Newsletter</h3>
                  <p className="mb-4 text-sm">
                    Receba as novidades sobre desenvolvimento web, dicas e tutoriais diretamente no seu email.
                  </p>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link to="/newsletter">
                      <Mail className="mr-2 h-4 w-4" /> Inscrever-se
                    </Link>
                  </Button>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-4 dark:text-white">
                    Download CV
                  </h3>
                  <Button className="w-full" asChild>
                    <a href="#" download>
                      <FileText className="mr-2 h-4 w-4" /> Baixar Currículo
                    </a>
                  </Button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
