import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Filter, Search, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { blogPosts } from '../data/blog-posts';
import { categories } from '../data/blog-categories';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { BlogCard } from '../components/blog/BlogCard';
import { Skeleton } from '../components/ui/skeleton';
import CategoryFilter from '../components/blog/CategoryFilter';
import { Parallax } from 'react-scroll-parallax';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  // Simular carregamento para exibir skeletons
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // 800ms de loading fake
    return () => clearTimeout(timer);
  }, []);

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

  const featuredPosts = blogPosts.slice(0, 3);
  const regularPosts = blogPosts.slice(3);

  const filteredPosts = regularPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? post.categories.includes(selectedCategory)
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}
    >
      <Navbar />

      <header className="relative px-4 pt-32 pb-20 overflow-hidden text-white shadow-md md:px-8 bg-gradient-to-r from-teal-500 to-blue-600">
        {/* Parallax visual para o blog */}
        <Parallax speed={-20} className="absolute inset-0 z-0 pointer-events-none">
          <img loading="lazy" width="1920" height="1080" src="/parallax-gradient.svg" alt="Gradiente Parallax" className="object-cover w-full h-full opacity-60" />
        </Parallax>
        <Parallax speed={-10} className="absolute inset-0 z-0 pointer-events-none">
          <img loading="lazy" width="1920" height="1080" src="/parallax-shapes.svg" alt="Shapes Parallax" className="object-cover w-full h-full opacity-40" />
        </Parallax>
        <Parallax speed={8} className="absolute inset-0 z-0 pointer-events-none">
          <img loading="lazy" width="1920" height="1080" src="/parallax-particles.svg" alt="Partículas Parallax" className="object-cover w-full h-full opacity-30" />
        </Parallax>
        {/* Fim do parallax visual */}
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-tight">
              Blog Dev Frontend
            </h1>
            <p className="max-w-2xl mx-auto text-xl opacity-90">
              Aprofunde-se em tópicos de frontend, performance, acessibilidade e
              design de interfaces.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Banner Newsletter */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 px-4 text-center shadow-md">
        <span className="font-semibold text-lg mr-2">Receba dicas exclusivas no seu e-mail!</span>
        <Link
          to="/newsletter"
          className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg shadow hover:bg-gray-100 transition-colors font-semibold"
        >
          <Mail className="mr-2 h-5 w-5" /> Assinar Newsletter
        </Link>
      </div>

      {/* AdSense Placeholder */}
      <div className="flex justify-center my-6">
        <div className="w-full max-w-2xl h-28 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-lg rounded-lg">
          Espaço para anúncio AdSense
        </div>
      </div>

      <main className="container px-4 py-12 mx-auto">
        {/* Search and filter */}
        <div className="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row">
          <div className="relative w-full md:w-96">
            <Search className="absolute text-gray-500 transform -translate-y-1/2 left-4 top-1/2" />
            <Input
              type="text"
              placeholder="Pesquise artigos..."
              className="w-full pl-10 text-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={setSelectedCategory}
              variant="pills"
              showCounts
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              <i
                className={`text-2xl ${
                  isDarkMode ? 'ri-sun-line' : 'ri-moon-line'
                }`}
              ></i>
            </Button>
          </div>
        </div>

        {/* Featured posts */}
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-semibold text-gray-800 dark:text-white">
            Posts em Destaque
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="w-full h-80" />
                ))
              : featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} featured />
                ))}
          </div>
        </section>

        {/* Regular posts */}
        <section>
          <h2 className="mb-8 text-3xl font-semibold text-gray-800 dark:text-white">
            Todos os Artigos
          </h2>
          {filteredPosts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-64" />
                  ))
                : filteredPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
            </motion.div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Nenhum artigo encontrado com os filtros atuais.
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
