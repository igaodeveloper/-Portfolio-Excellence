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
  Mail,
  Send,
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
import { Helmet } from 'react-helmet';
import { Parallax } from 'react-scroll-parallax';

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

        // Cria o pre e code normalmente
        const pre = document.createElement('pre');
        pre.className = `language-${language} group relative`;
        pre.style.margin = '0';
        pre.style.borderRadius = '0.5rem';
        pre.style.fontSize = '0.9rem';
        Object.entries(style['pre[class*="language-"]'] || {}).forEach(
          ([key, value]) => {
            // @ts-ignore
            pre.style[key] = value;
          },
        );
        const codeEl = document.createElement('code');
        codeEl.className = `language-${language}`;
        codeEl.textContent = code;
        Object.entries(style['code[class*="language-"]'] || {}).forEach(
          ([key, value]) => {
            // @ts-ignore
            codeEl.style[key] = value;
          },
        );
        pre.appendChild(codeEl);
        block.innerHTML = '';
        block.appendChild(pre);

        // Adiciona o botão de copiar
        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.ariaLabel = 'Copiar código';
        copyBtn.className = 'absolute z-10 px-2 py-1 text-xs font-semibold text-white transition-all bg-blue-500 rounded shadow-md top-2 right-2 opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-400';
        copyBtn.innerText = 'Copiar';
        copyBtn.tabIndex = 0;
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(code).then(() => {
            copyBtn.innerText = 'Copiado!';
            copyBtn.classList.add('bg-green-500');
            setTimeout(() => {
              copyBtn.innerText = 'Copiar';
              copyBtn.classList.remove('bg-green-500');
            }, 1200);
          });
        };
        pre.appendChild(copyBtn);
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
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`);
        break;
      default:
        navigator.clipboard.writeText(url);
        toast({
          title: 'Link copiado!',
          description:
            'O link do artigo foi copiado para a área de transferência.',
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
      <Helmet>
        <title>{post?.title ? `${post.title} | Blog Dev Frontend` : 'Blog Dev Frontend'}</title>
        <meta name="description" content={post?.excerpt || post?.description || ''} />
        <meta property="og:title" content={post?.title || ''} />
        <meta property="og:description" content={post?.excerpt || post?.description || ''} />
        <meta property="og:image" content={post?.coverImage || post?.image || ''} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.title || ''} />
        <meta name="twitter:description" content={post?.excerpt || post?.description || ''} />
        <meta name="twitter:image" content={post?.coverImage || post?.image || ''} />
        {/* JSON-LD Article Schema */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post?.title,
          description: post?.excerpt || post?.description,
          image: post?.coverImage || post?.image,
          author: {
            '@type': 'Person',
            name: post?.author?.name,
          },
          datePublished: post?.date,
          publisher: {
            '@type': 'Organization',
            name: 'Blog Dev Frontend',
            logo: {
              '@type': 'ImageObject',
              url: '/vite.svg',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': typeof window !== 'undefined' ? window.location.href : '',
          },
        })}</script>
      </Helmet>
      <Toaster />
      <div
        className={`min-h-screen ${isDarkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}
      >
        <Navbar />

        <header className="pt-32 pb-16 px-4 md:px-8 bg-gradient-to-r from-indigo-700 to-blue-900 text-white relative overflow-hidden">
          {/* Parallax visual para o post */}
          <Parallax speed={-18} className="absolute inset-0 z-0 pointer-events-none">
            <img src="/parallax-aurora.svg" alt="Aurora Parallax" className="w-full h-full object-cover opacity-60" />
          </Parallax>
          <Parallax speed={-10} className="absolute inset-0 z-0 pointer-events-none">
            <img src="/parallax-meteor.svg" alt="Meteoros Parallax" className="w-full h-full object-cover opacity-40" />
          </Parallax>
          <Parallax speed={5} className="absolute inset-0 z-0 pointer-events-none">
            <img src="/parallax-satellite.svg" alt="Satélite Parallax" className="w-full h-full object-cover opacity-30" />
          </Parallax>
          {/* Fim do parallax visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="container max-w-3xl mx-auto"
          >
            <Link
              to="/blog"
              className="inline-flex items-center mb-6 text-blue-300 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Voltar para o blog</span>
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category: string, index: number) => (
                <Link
                  key={index}
                  to={`/blog/categoria/${category.toLowerCase()}`}
                  className="px-3 py-1 text-xs font-medium text-blue-100 transition-colors rounded-full bg-blue-500/20 hover:bg-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {category}
                </Link>
              ))}
            </div>

            <h1 className="mb-6 text-4xl font-extrabold md:text-5xl drop-shadow-lg">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 mb-4 text-sm text-blue-100">
              <div className="flex items-center">
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

            <p className="text-xl leading-relaxed opacity-90">
              {post.excerpt}
            </p>
          </motion.div>
        </header>

        <main className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-12 max-w-7xl">
            {/* Table of Contents - Desktop */}
            <aside className="relative hidden lg:block lg:col-span-3">
              <div className="sticky top-32">
                <div className="p-6 border border-gray-200 shadow-lg bg-white/80 dark:bg-gray-900/80 rounded-xl backdrop-blur dark:border-gray-800">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-8 prose prose-lg border border-gray-200 shadow-lg bg-white/80 rounded-xl dark:prose-invert max-w-none dark:bg-gray-900/80 backdrop-blur dark:border-gray-800"
              >
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </motion.div>

              {/* Share buttons - Mobile */}
              <div className="p-6 mt-8 border border-gray-200 shadow-lg bg-white/80 rounded-xl dark:bg-gray-900/80 lg:hidden backdrop-blur dark:border-gray-800">
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
              <div className="flex flex-col items-center gap-6 p-6 mt-8 border border-gray-200 shadow-lg bg-white/80 rounded-xl dark:bg-gray-900/80 md:flex-row backdrop-blur dark:border-gray-800">
                <div className="flex-shrink-0 w-24 h-24 overflow-hidden border-4 border-blue-400 rounded-full shadow-md">
                  <img
                    src={post.author?.avatar || 'https://avatars.githubusercontent.com/u/12345678?v=4'}
                    alt={`Avatar de ${post.author?.name || 'Autor'}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold dark:text-white">
                    Sobre o Autor
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    {post.author?.bio || 'Desenvolvedor Front-end apaixonado por UI/UX, performance e acessibilidade. Especialista em React, TypeScript e estratégias modernas de CSS.'}
                  </p>
                  <div className="flex space-x-2">
                    {post.author?.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={post.author.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {post.author?.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={post.author.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="w-4 h-4 mr-2" />
                          Twitter
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold dark:text-white">
                  Artigos Relacionados
                </h2>
                <motion.div
                  className="grid grid-cols-1 gap-6 md:grid-cols-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.12,
                      },
                    },
                  }}
                >
                  {blogPosts
                    .filter(
                      (p) =>
                        p.id !== post.id &&
                        p.categories.some((c) => post.categories.includes(c)),
                    )
                    .slice(0, 2)
                    .map((relatedPost) => (
                      <motion.div
                        key={relatedPost.id}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <Link
                          to={`/blog/${relatedPost.slug}`}
                          className="block group focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                      </motion.div>
                    ))}
                </motion.div>
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
