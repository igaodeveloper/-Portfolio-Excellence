import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  vs,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Github,
  Twitter,
  Linkedin,
  Facebook,
} from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { blogPosts } from '../data/blog-posts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TableOfContents from '../components/blog/TableOfContents';
import { Button } from '../components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import { useToast } from '../components/ui/use-toast';
import { Toaster } from '../components/ui/toaster';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState('');
  const [tableOfContents, setTableOfContents] = useState<
    Array<{ id: string; title: string; level: number }>
  >([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const { toast } = useToast();

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

  // Customizing marked renderer for code highlighting and headings with IDs
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      const foundPost = blogPosts.find((post) => post.slug === slug);

      if (foundPost) {
        setPost(foundPost);

        // Custom renderer for marked
        const renderer = new marked.Renderer();
        const headings: Array<{ id: string; title: string; level: number }> =
          [];

        // Override heading renderer to add IDs and collect TOC items
        renderer.heading = function (text: string, level: number) {
          const id = text.toLowerCase().replace(/[^\w]+/g, '-');

          headings.push({
            id,
            title: text,
            level,
          });

          return `<h${level} id="${id}" class="scroll-mt-24">${text}</h${level}>`;
        };

        // Override code renderer for syntax highlighting
        renderer.code = function (code: string, language?: string) {
          const validLang = !!(
            language && SyntaxHighlighter.supportedLanguages.includes(language)
          );
          const highlighted = validLang
            ? `<SyntaxHighlighter language="${language}" style="${isDarkMode ? 'vscDarkPlus' : 'vs'}">${code}</SyntaxHighlighter>`
            : `<code>${code}</code>`;

          return `<div class="my-6 rounded-lg overflow-hidden">${highlighted}</div>`;
        };

        marked.setOptions({
          renderer,
          gfm: true,
          breaks: true,
        });

        const html = await marked.parse(foundPost.content);
        // Replace SyntaxHighlighter placeholders with actual components
        const processedHtml = html.replace(
          /<SyntaxHighlighter language="(.+?)" style="(.+?)">(.+?)<\/SyntaxHighlighter>/gs,
          (_, language, style, code) => {
            const decodedCode = code
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&amp;/g, '&');
            return `<div class="syntax-highlighter" data-language="${language}" data-style="${style}">${decodedCode}</div>`;
          },
        );

        setHtmlContent(processedHtml);
        setTableOfContents(headings);
      } else {
        navigate('/blog', { replace: true });
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
        const style =
          block.getAttribute('data-style') === 'vscDarkPlus' ? vscDarkPlus : vs;
        const code = block.textContent || '';

        // Create React element in the DOM
        const pre = document.createElement('pre');
        pre.className = `language-${language}`;
        pre.style.margin = '0';
        pre.style.borderRadius = '0.5rem';
        pre.style.fontSize = '0.9rem';

        // Apply the style
        Object.entries(style['pre[class*="language-"]'] || {}).forEach(
          ([key, value]) => {
            // @ts-ignore
            pre.style[key] = value;
          },
        );

        const codeEl = document.createElement('code');
        codeEl.className = `language-${language}`;
        codeEl.textContent = code;

        // Apply the style to the code element
        Object.entries(style['code[class*="language-"]'] || {}).forEach(
          ([key, value]) => {
            // @ts-ignore
            codeEl.style[key] = value;
          },
        );

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
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
          '_blank',
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          '_blank',
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
          '_blank',
        );
        break;
      default:
        navigator.clipboard.writeText(url);
        toast({
          title: 'Link copiado!',
          description: 'O link do artigo foi copiado para a área de transferência.',
        });
    }
  };

  if (isLoading) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? 'dark bg-gray-950 text-white' : 'bg-gray-50'}`}
      >
        <Navbar />
        <div className="container flex items-center justify-center px-4 pt-40 pb-20 mx-auto">
          <div className="text-2xl animate-pulse">Carregando...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? 'dark bg-gray-950 text-white' : 'bg-gray-50'}`}
      >
        <Navbar />
        <div className="container px-4 pt-40 pb-20 mx-auto text-center">
          <h1 className="mb-4 text-3xl font-bold">Post não encontrado</h1>
          <p className="mb-8">
            O artigo que você está procurando não existe ou foi removido.
          </p>
          <Button asChild>
            <Link to="/blog">Voltar para o Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div
        className={`min-h-screen ${isDarkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}
      >
        <Navbar />

        <header
          className="px-4 pt-32 pb-20 text-white bg-gradient-to-r from-blue-600 to-indigo-700"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${post.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
                className="inline-flex items-center mb-6 text-blue-300 transition-colors hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Voltar para o blog</span>
              </Link>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category: string, index: number) => (
                  <Link
                    key={index}
                    to={`/blog/categoria/${category.toLowerCase()}`}
                    className="px-3 py-1 text-xs font-medium text-blue-100 transition-colors rounded-full bg-blue-500/20 hover:bg-blue-500/30"
                  >
                    {category}
                  </Link>
                ))}
              </div>

              <h1 className="mb-6 text-4xl font-bold md:text-5xl">
                {post.title}
              </h1>

              <div className="flex items-center mb-4 text-sm text-blue-100">
                <div className="flex items-center mr-6">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    {format(new Date(post.date), "dd 'de' MMMM 'de' yyyy", {
                      locale: pt,
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime} min de leitura</span>
                </div>
              </div>

              <p className="text-xl leading-relaxed opacity-90">{post.excerpt}</p>
            </motion.div>
          </div>
        </header>

        <main className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-12 max-w-7xl">
            {/* Table of Contents - Desktop */}
            <aside className="relative hidden lg:block lg:col-span-3">
              <div className="sticky top-32">
                <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
                  <h2 className="mb-4 text-lg font-bold dark:text-white">
                    Índice
                  </h2>
                  <TableOfContents toc={tableOfContents} />

                  <div className="pt-6 mt-8 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="mb-4 text-sm font-semibold dark:text-gray-300">
                      Compartilhar
                    </h3>
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
                              <Twitter className="w-4 h-4" />
                              <span className="sr-only">
                                Compartilhar no Twitter
                              </span>
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
                              <Facebook className="w-4 h-4" />
                              <span className="sr-only">
                                Compartilhar no Facebook
                              </span>
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
                              <Linkedin className="w-4 h-4" />
                              <span className="sr-only">
                                Compartilhar no LinkedIn
                              </span>
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
                              <Share2 className="w-4 h-4" />
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
                    className="justify-start w-full mt-6"
                  >
                    {isDarkMode
                      ? 'Mudar para modo claro'
                      : 'Mudar para modo escuro'}
                  </Button>
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <article className="lg:col-span-9">
              <div className="p-8 prose prose-lg bg-white rounded-lg shadow-md dark:prose-invert max-w-none dark:bg-gray-900">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </div>

              {/* Share buttons - Mobile */}
              <div className="p-6 mt-8 bg-white rounded-lg shadow-md dark:bg-gray-900 lg:hidden">
                <h3 className="mb-4 text-lg font-bold dark:text-white">
                  Compartilhar este artigo
                </h3>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sharePost('twitter')}
                    className="flex-1"
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sharePost('facebook')}
                    className="flex-1"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sharePost('linkedin')}
                    className="flex-1"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>

              {/* Author Card */}
              <div className="flex flex-col items-center gap-6 p-6 mt-8 bg-white rounded-lg shadow-md dark:bg-gray-900 md:flex-row">
                <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-full">
                  <img
                    src="https://avatars.githubusercontent.com/u/12345678?v=4"
                    alt="Avatar do autor"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold dark:text-white">
                    Sobre o Autor
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    Desenvolvedor Front-end apaixonado por UI/UX, performance e
                    acessibilidade. Especialista em React, TypeScript e
                    estratégias modernas de CSS.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold dark:text-white">
                  Artigos Relacionados
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {blogPosts
                    .filter(
                      (p) =>
                        p.id !== post.id &&
                        p.categories.some((c) => post.categories.includes(c)),
                    )
                    .slice(0, 2)
                    .map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <div className="overflow-hidden transition-transform rounded-lg shadow-md bg-dark dark:bg-gray-900 group-hover:shadow-lg">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={relatedPost.coverImage}
                              alt={relatedPost.title}
                              className="object-cover w-full h-full transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
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
    </>
  );
};

export default BlogPostPage;
