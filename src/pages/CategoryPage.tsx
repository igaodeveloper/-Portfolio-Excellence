import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { blogPosts } from '../data/blog-posts';
import { categories } from '../data/blog-categories';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import LazyImage from '../components/LazyImage';
import { Parallax } from 'react-scroll-parallax';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
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

  useEffect(() => {
    if (!slug) return;

    // Find category by slug
    const category = categories.find(
      (cat) =>
        cat.slug === slug || cat.name.toLowerCase() === slug.toLowerCase(),
    );

    if (category) {
      setCategoryName(category.name);
      setCategoryDescription(category.description);

      // Filter posts by category
      const posts = blogPosts.filter((post) =>
        post.categories.some(
          (cat) =>
            cat.toLowerCase() === category.name.toLowerCase() ||
            cat.toLowerCase() === slug.toLowerCase(),
        ),
      );

      setFilteredPosts(posts);
    } else {
      setCategoryName('Categoria não encontrada');
      setFilteredPosts([]);
    }
  }, [slug]);

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}
    >
      <Navbar />

      <header className="pt-32 pb-16 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Parallax visual para a categoria */}
        <Parallax speed={-15} className="absolute inset-0 z-0 pointer-events-none">
          <LazyImage width={1920} height={1080} src="/parallax-fog.svg" alt="Fog Parallax" className="w-full h-full object-cover opacity-50" />
        </Parallax>
        <Parallax speed={-8} className="absolute inset-0 z-0 pointer-events-none">
          <img loading="lazy" width="1920" height="1080" src="/parallax-shapes.svg" alt="Shapes Parallax" className="w-full h-full object-cover opacity-30" />
        </Parallax>
        <Parallax speed={5} className="absolute inset-0 z-0 pointer-events-none">
          <img loading="lazy" width="1920" height="1080" src="/parallax-gradient.svg" alt="Gradiente Parallax" className="w-full h-full object-cover opacity-20" />
        </Parallax>
        {/* Fim do parallax visual */}
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
              {categoryName}
            </h1>

            {categoryDescription && (
              <p className="text-xl opacity-90 max-w-2xl">
                {categoryDescription}
              </p>
            )}
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 * (filteredPosts.indexOf(post) % 5),
                }}
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <LazyImage
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map(
                        (category: string, index: number) => (
                          <span
                            key={index}
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              category.toLowerCase() === slug?.toLowerCase()
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
                            }`}
                          >
                            {category}
                          </span>
                        ),
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center mr-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {format(new Date(post.date), 'dd MMM, yyyy', {
                            locale: pt,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readTime} min de leitura</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Nenhum artigo encontrado
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Não encontramos nenhum artigo na categoria "{categoryName}".
              Confira outras categorias ou retorne ao blog.
            </p>
            <Button asChild>
              <Link to="/blog">Voltar para o Blog</Link>
            </Button>
          </div>
        )}

        {/* Browse other categories */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Explorar outras categorias
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((cat) => cat.slug !== slug)
              .map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="rounded-full"
                  asChild
                >
                  <Link to={`/blog/categoria/${category.slug}`}>
                    {category.name}
                  </Link>
                </Button>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
