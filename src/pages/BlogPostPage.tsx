import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { marked } from "marked";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Calendar, Clock, ArrowLeft, Share2, Github, Twitter, Linkedin, Facebook } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { blogPosts } from "../data/blog-posts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TableOfContents from "../components/blog/TableOfContents";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState("");
  const [tableOfContents, setTableOfContents] = useState<Array<{ id: string; title: string; level: number }>>([]);
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

  // Customizing marked renderer for code highlighting and headings with IDs
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      const foundPost = blogPosts.find(post => post.slug === slug);
      
      if (foundPost) {
        setPost(foundPost);
        
        // Custom renderer for marked
        const renderer = new marked.Renderer();
        const headings: Array<{ id: string; title: string; level: number }> = [];
        
        // Override heading renderer to add IDs and collect TOC items
        renderer.heading = function(text: string, level: number) {
          const id = text.toLowerCase().replace(/[^\w]+/g, '-');
          
          headings.push({
            id,
            title: text,
            level
          });
          
          return `<h${level} id="${id}" class="scroll-mt-24">${text}</h${level}>`;
        };
        
        // Override code renderer for syntax highlighting
        renderer.code = function(code: string, language?: string) {
          const validLang = !!(language && SyntaxHighlighter.supportedLanguages.includes(language));
          const highlighted = validLang
            ? `<SyntaxHighlighter language="${language}" style="${isDarkMode ? 'vscDarkPlus' : 'vs'}">${code}</SyntaxHighlighter>`
            : `<code>${code}</code>`;
            
          return `<div class="my-6 rounded-lg overflow-hidden">${highlighted}</div>`;
        };
        
        marked.setOptions({
          renderer,
          gfm: true,
          breaks: true
        });
        
        const html = await marked.parse(foundPost.content);
        // Replace SyntaxHighlighter placeholders with actual components
        const processedHtml = html.replace(
          /<SyntaxHighlighter language="(.+?)" style="(.+?)">(.+?)<\/SyntaxHighlighter>/gs,
          (_, language, style, code) => {
            const decodedCode = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
            return `<div class="syntax-highlighter" data-language="${language}" data-style="${style}">${decodedCode}</div>`;
          }
        );
        
        setHtmlContent(processedHtml);
        setTableOfContents(headings);
      } else {
        navigate("/blog", { replace: true });
      }
      
      setIsLoading(false);
    };
    
    fetchPost();
  }, [slug, isDarkMode, navigate]);

  // Apply syntax highlighting to code blocks
  useEffect(() => {
    if (!isLoading && htmlContent) {
      document.querySelectorAll('.syntax-highlighter').forEach((block) => {
        const language = block.getAttribute('data-language') || 'javascript';
        const style = block.getAttribute('data-style') === 'vscDarkPlus' ? vscDarkPlus : vs;
        const code = block.textContent || '';
        
        // Create React element in the DOM
        const pre = document.createElement('pre');
        pre.className = `language-${language}`;
        pre.style.margin = '0';
        pre.style.borderRadius = '0.5rem';
        pre.style.fontSize = '0.9rem';
        
        // Apply the style
        Object.entries(style['pre[class*="language-"]'] || {}).forEach(([key, value]) => {
          // @ts-ignore
          pre.style[key] = value;
        });
        
        const codeEl = document.createElement('code');
        codeEl.className = `language-${language}`;
        codeEl.textContent = code;
        
        // Apply the style to the code element
        Object.entries(style['code[class*="language-"]'] || {}).forEach(([key, value]) => {
          // @ts-ignore
          codeEl.style[key] = value;
        });
        
        pre.appendChild(codeEl);
        block.innerHTML = '';
        block.appendChild(pre);
      });
    }
  }, [htmlContent, isLoading]);

  // Share functionality
  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post?.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
        alert("Link copiado para a área de transferência!");
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-950 text-white" : "bg-gray-50"}`}>
        <Navbar />
        <div className="container mx-auto pt-40 pb-20 px-4 flex items-center justify-center">
          <div className="animate-pulse text-2xl">Carregando...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-950 text-white" : "bg-gray-50"}`}>
        <Navbar />
        <div className="container mx-auto pt-40 pb-20 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Post não encontrado</h1>
          <p className="mb-8">O artigo que você está procurando não existe ou foi removido.</p>
          <Button asChild>
            <Link to="/blog">Voltar para o Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-950" : "bg-gray-50"}`}>
      <Navbar />
      
      <header 
        className="pt-32 pb-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${post.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-300 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Voltar para o blog</span>
            </Link>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category: string, index: number) => (
                <Link
                  key={index}
                  to={`/blog/categoria/${category.toLowerCase()}`}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/20 text-blue-100 hover:bg-blue-500/30 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex items-center text-sm text-blue-100 mb-4">
              <div className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-1" />
                <span>
                  {format(new Date(post.date), "dd 'de' MMMM 'de' yyyy", { locale: pt })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime} min de leitura</span>
              </div>
            </div>
            
            <p className="text-xl opacity-90 leading-relaxed">{post.excerpt}</p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-32">
              <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4 dark:text-white">Índice</h2>
                <TableOfContents toc={tableOfContents} />
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="text-sm font-semibold mb-4 dark:text-gray-300">Compartilhar</h3>
                  <div className="flex space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => sharePost('twitter')}
                            className="rounded-full"
                          >
                            <Twitter className="h-4 w-4" />
                            <span className="sr-only">Compartilhar no Twitter</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Compartilhar no Twitter</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => sharePost('facebook')}
                            className="rounded-full"
                          >
                            <Facebook className="h-4 w-4" />
                            <span className="sr-only">Compartilhar no Facebook</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Compartilhar no Facebook</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => sharePost('linkedin')}
                            className="rounded-full"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span className="sr-only">Compartilhar no LinkedIn</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Compartilhar no LinkedIn</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => sharePost('copy')}
                            className="rounded-full"
                          >
                            <Share2 className="h-4 w-4" />
                            <span className="sr-only">Copiar link</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copiar link</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="mt-6 w-full justify-start"
                >
                  {isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
                </Button>
              </div>
            </div>
          </aside>
          
          {/* Article Content */}
          <article className="lg:col-span-9">
            <div className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
            
            {/* Share buttons - Mobile */}
            <div className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md lg:hidden">
              <h3 className="text-lg font-bold mb-4 dark:text-white">Compartilhar este artigo</h3>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sharePost('twitter')}
                  className="flex-1"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sharePost('facebook')}
                  className="flex-1"
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sharePost('linkedin')}
                  className="flex-1"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
            
            {/* Author Card */}
            <div className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md flex flex-col md:flex-row gap-6 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://avatars.githubusercontent.com/u/12345678?v=4"
                  alt="Avatar do autor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Sobre o Autor</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Desenvolvedor Front-end apaixonado por UI/UX, performance e acessibilidade.
                  Especialista em React, TypeScript e estratégias modernas de CSS.
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Related Posts */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Artigos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts
                  .filter(p => p.id !== post.id && p.categories.some(c => post.categories.includes(c)))
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="block group"
                    >
                      <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md transition-transform group-hover:shadow-lg">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={relatedPost.coverImage}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;