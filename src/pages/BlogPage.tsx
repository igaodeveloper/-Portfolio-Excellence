import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Filter, Search } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { blogPosts } from "../data/blog-posts";
import { categories } from "../data/blog-categories";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const featuredPosts = blogPosts.slice(0, 3);
  const regularPosts = blogPosts.slice(3);

  const filteredPosts = regularPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? post.categories.includes(selectedCategory) : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-950" : "bg-gray-50"}`}>
      <Navbar />
      
      <header className="pt-32 pb-16 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Dev Frontend</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Artigos sobre desenvolvimento frontend, performance, acessibilidade e experiência do usuário.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Pesquisar artigos..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {selectedCategory ? selectedCategory : "Categorias"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                  Todas as categorias
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDarkMode ? (
                <span className="sr-only">Light mode</span>
              ) : (
                <span className="sr-only">Dark mode</span>
              )}
              <i className={`text-xl ${isDarkMode ? "ri-sun-line" : "ri-moon-line"}`}></i>
            </Button>
          </div>
        </div>

        {/* Featured posts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">Posts em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <motion.article
                key={post.id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md transition-transform relative"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category, index) => (
                        <span
                          key={index}
                          className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center mr-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {format(new Date(post.date), "dd MMM, yyyy", { locale: pt })}
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
        </section>

        {/* Regular posts */}
        <section>
          <h2 className="text-2xl font-bold mb-8 dark:text-white">Todos os Artigos</h2>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg relative"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((category, index) => (
                          <span
                            key={index}
                            className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                          >
                            {category}
                          </span>
                        ))}
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
                            {format(new Date(post.date), "dd MMM, yyyy", { locale: pt })}
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
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Nenhum artigo encontrado com os filtros atuais.
              </p>
              <Button 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
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