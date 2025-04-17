import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import { 
  ChevronDown, 
  LayoutPanelLeft, 
  Code2, 
  FileCode, 
  FileType, 
  FileCog, 
  Play, 
  RotateCcw, 
  Maximize, 
  Save,
  Settings,
  Search,
  MoreHorizontal,
  Terminal,
  Download,
  Upload,
  Copy,
  Share2,
  AlertTriangle,
  Trash2
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const defaultHTMLCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Página Moderna</title>
</head>
<body>
  <header class="hero">
    <nav class="navbar">
      <div class="logo">Marca</div>
      <ul class="nav-links">
        <li><a href="#recursos">Recursos</a></li>
        <li><a href="#precos">Preços</a></li>
        <li><a href="#depoimentos">Depoimentos</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
      <button class="cta-button">Começar</button>
    </nav>
    <div class="hero-content">
      <h1>Construa Sites Incríveis</h1>
      <p>Crie landing pages impressionantes com nosso editor intuitivo</p>
      <button class="primary-button">Experimente Agora</button>
    </div>
  </header>

  <main>
    <!-- Adicione suas seções de conteúdo aqui -->
  </main>

  <footer>
    <p>&copy; 2023 Sua Empresa. Todos os direitos reservados.</p>
  </footer>
</body>
</html>`;

const defaultCSSCode = `/* Estilos Globais */
:root {
  --primary-color: #3490dc;
  --secondary-color: #38b2ac;
  --accent-color: #7e3af2;
  --background-color: #ffffff;
  --text-color: #2d3748;
  --heading-font: 'Poppins', sans-serif;
  --body-font: 'Inter', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--body-font);
  color: var(--text-color);
  line-height: 1.6;
}

/* Navegação */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--primary-color);
}

/* Seção Hero */
.hero {
  background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-family: var(--heading-font);
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #4a5568;
}

/* Botões */
.primary-button, .cta-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-button {
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: white;
  font-size: 1rem;
}

.cta-button {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  background-color: var(--primary-color);
  color: white;
}

/* Design Responsivo */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
}`;

const defaultJSCode = `// Aguardar carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  // Rolagem suave para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Adicionar animações de rolagem
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  // Observar todas as seções
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Exemplo de carregamento de conteúdo dinâmico
  const carregarMaisConteudo = () => {
    // Normalmente buscaria de uma API
    console.log('Carregando mais conteúdo...');
  };

  // Exemplo de manipulador de envio de formulário
  const formularioContato = document.querySelector('#contact-form');
  if (formularioContato) {
    formularioContato.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Formulário enviado!');
      // Aqui normalmente enviaria os dados do formulário para um servidor
      formularioContato.reset();
      alert('Obrigado pela sua mensagem!');
    });
  }
});`;

interface CodeEditorProps {
  className?: string;
}

const CodeEditor = ({ className }: CodeEditorProps) => {
  const [htmlCode, setHtmlCode] = useState(defaultHTMLCode);
  const [cssCode, setCssCode] = useState(defaultCSSCode);
  const [jsCode, setJsCode] = useState(defaultJSCode);
  const [preview, setPreview] = useState('');
  const [fileName, setFileName] = useState('projeto-sem-titulo');
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('modern');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Atualizar preview quando o código mudar
  useEffect(() => {
    if (autoRefresh) {
      updatePreview();
    }
  }, [htmlCode, cssCode, jsCode, autoRefresh]);
  
  const updatePreview = () => {
    // Limpar console e erros anteriores
    setConsoleOutput([]);
    setErrors([]);
    
    try {
      // Interceptar console.log no iframe
      const consoleInterceptor = `
        <script>
          (function(){
            const originalConsole = window.console;
            window.console = {
              log: function() {
                window.parent.postMessage({
                  type: 'console.log',
                  data: Array.from(arguments).map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                  ).join(' ')
                }, '*');
                originalConsole.log.apply(originalConsole, arguments);
              },
              error: function() {
                window.parent.postMessage({
                  type: 'console.error',
                  data: Array.from(arguments).map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                  ).join(' ')
                }, '*');
                originalConsole.error.apply(originalConsole, arguments);
              },
              warn: function() {
                window.parent.postMessage({
                  type: 'console.warn',
                  data: Array.from(arguments).map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                  ).join(' ')
                }, '*');
                originalConsole.warn.apply(originalConsole, arguments);
              },
              info: function() {
                window.parent.postMessage({
                  type: 'console.info',
                  data: Array.from(arguments).map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                  ).join(' ')
                }, '*');
                originalConsole.info.apply(originalConsole, arguments);
              }
            };
            
            // Capturar erros de JavaScript
            window.addEventListener('error', function(event) {
              window.parent.postMessage({
                type: 'error',
                data: event.message + ' (' + event.filename + ':' + event.lineno + ')'
              }, '*');
            });
          })();
        </script>
      `;
      
      const combinedCode = `
        <html>
          <head>
            <style>${cssCode}</style>
            ${consoleInterceptor}
          </head>
          <body>
            ${htmlCode.replace(/<html[^>]*>|<\/html>|<head>.*<\/head>|<body[^>]*>|<\/body>/gs, '')}
            <script>${jsCode}</script>
          </body>
        </html>
      `;
      setPreview(combinedCode);
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => [...prev, error.message]);
      }
    }
  };
  
  // Listener para mensagens do iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type) {
        switch (event.data.type) {
          case 'console.log':
          case 'console.info':
            setConsoleOutput(prev => [...prev, `log: ${event.data.data}`]);
            break;
          case 'console.warn':
            setConsoleOutput(prev => [...prev, `warn: ${event.data.data}`]);
            break;
          case 'console.error':
          case 'error':
            setConsoleOutput(prev => [...prev, `error: ${event.data.data}`]);
            setErrors(prev => [...prev, event.data.data]);
            break;
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Resetar para o código padrão
  const handleReset = () => {
    if (confirm("Tem certeza que deseja restaurar o código padrão? Todas as alterações serão perdidas.")) {
      setHtmlCode(defaultHTMLCode);
      setCssCode(defaultCSSCode);
      setJsCode(defaultJSCode);
      setConsoleOutput([]);
      setErrors([]);
    }
  };

  // Simular salvar o projeto
  const handleSave = () => {
    try {
      const project = {
        name: fileName,
        html: htmlCode,
        css: cssCode,
        js: jsCode
      };
      
      const blob = new Blob([JSON.stringify(project)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      // Feedback ao usuário
      setConsoleOutput(prev => [...prev, `log: Projeto "${fileName}" salvo com sucesso!`]);
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => [...prev, `Erro ao salvar: ${error.message}`]);
      }
    }
  };

  // Exportar código para download
  const handleExportHTML = () => {
    try {
      const fullHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName}</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode.replace(/<html[^>]*>|<\/html>|<head>.*<\/head>|<body[^>]*>|<\/body>/gs, '')}
  <script>
${jsCode}
  </script>
</body>
</html>`;
      
      const blob = new Blob([fullHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.html`;
      a.click();
      URL.revokeObjectURL(url);
      
      // Feedback ao usuário
      setConsoleOutput(prev => [...prev, `log: Site exportado com sucesso para ${fileName}.html`]);
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => [...prev, `Erro ao exportar: ${error.message}`]);
      }
    }
  };
  
  // Importar projeto
  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const project = JSON.parse(content);
        
        if (project.html && project.css && project.js) {
          setFileName(project.name || 'projeto-importado');
          setHtmlCode(project.html);
          setCssCode(project.css);
          setJsCode(project.js);
          setConsoleOutput(prev => [...prev, `log: Projeto "${project.name}" importado com sucesso!`]);
        } else {
          throw new Error('Formato de arquivo inválido');
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrors(prev => [...prev, `Erro ao importar: ${error.message}`]);
        }
      }
    };
    reader.readAsText(file);
    
    // Limpar o input para permitir selecionar o mesmo arquivo novamente
    e.target.value = '';
  };
  
  // Copiar código completo para a área de transferência
  const handleCopyCode = () => {
    const fullHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName}</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode.replace(/<html[^>]*>|<\/html>|<head>.*<\/head>|<body[^>]*>|<\/body>/gs, '')}
  <script>
${jsCode}
  </script>
</body>
</html>`;
    
    navigator.clipboard.writeText(fullHTML)
      .then(() => {
        setConsoleOutput(prev => [...prev, 'log: Código copiado para a área de transferência!']);
      })
      .catch(err => {
        setErrors(prev => [...prev, `Erro ao copiar: ${err.message}`]);
      });
  };
  
  // Limpar console
  const handleClearConsole = () => {
    setConsoleOutput([]);
    setErrors([]);
  };

  return (
    <div className={`w-full h-[800px] bg-[#1E1E1E] rounded-lg shadow-lg overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col"
      >
        {/* Barra superior */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#1E1E1E]">
          <div className="flex items-center space-x-4">
            <input 
              type="text" 
              value={fileName} 
              onChange={(e) => setFileName(e.target.value)}
              className="bg-[#3C3C3C] text-white px-3 py-1 rounded text-sm outline-none border border-[#3C3C3C] focus:border-[#007ACC]"
            />
            
            {/* Menu Arquivo */}
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]">
                        Arquivo
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Menu Arquivo</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent className="bg-[#252526] text-gray-300 border-[#3C3C3C]">
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={handleSave}>
                  Salvar Projeto
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={handleExportHTML}>
                  Exportar HTML
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={handleImport}>
                  Importar Projeto
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={handleCopyCode}>
                  Copiar Código
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={handleReset}>
                  Restaurar Padrão
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Menu Editar */}
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]">
                        Editar
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Menu Editar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent className="bg-[#252526] text-gray-300 border-[#3C3C3C]">
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Desfazer
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Refazer
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Localizar
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Substituir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Menu Exibir */}
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]">
                        Exibir
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Menu Exibir</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent className="bg-[#252526] text-gray-300 border-[#3C3C3C]">
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={() => setTheme(theme === 'vs-dark' ? 'vs-light' : 'vs-dark')}>
                  Alternar Tema
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={() => setFontSize(fontSize + 1)}>
                  Aumentar Tamanho da Fonte
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={() => setFontSize(Math.max(10, fontSize - 1))}>
                  Diminuir Tamanho da Fonte
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={() => setShowConsole(!showConsole)}>
                  {showConsole ? 'Ocultar Console' : 'Mostrar Console'}
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer" onClick={() => setAutoRefresh(!autoRefresh)}>
                  {autoRefresh ? 'Desativar Atualização Automática' : 'Ativar Atualização Automática'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Menu Temas */}
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]">
                        Temas
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Temas Pré-configurados</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent className="bg-[#252526] text-gray-300 border-[#3C3C3C]">
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Moderno (Padrão)
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Minimalista
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  E-commerce
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Blog
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#3C3C3C] focus:bg-[#3C3C3C] cursor-pointer">
                  Portfolio
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={handleFileChange} 
            />
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                    onClick={handleSave}
                  >
                    <Save size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Salvar Projeto</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                    onClick={handleImport}
                  >
                    <Upload size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Importar Projeto</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                    onClick={handleExportHTML}
                  >
                    <Download size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Exportar HTML</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                    onClick={() => updatePreview()}
                  >
                    <Play size={16} className="text-[#4CAF50]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Executar</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                  >
                    <Settings size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Configurações</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Área principal do editor */}
        <div className="flex-1 flex flex-col">
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            {/* Painel à esquerda com abas de arquivo */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card className="h-full border-0 rounded-none bg-[#1E1E1E] text-white">
                <CardContent className="p-0 h-full">
                  <Tabs defaultValue="html" className="h-full flex flex-col">
                    <div className="border-b border-[#252526] px-2 bg-[#252526]">
                      <TabsList className="h-10 bg-[#252526]">
                        <TabsTrigger value="html" className="data-[state=active]:bg-[#1E1E1E] data-[state=active]:text-[#007ACC] flex items-center space-x-2">
                          <FileCode size={14} />
                          <span>index.html</span>
                        </TabsTrigger>
                        <TabsTrigger value="css" className="data-[state=active]:bg-[#1E1E1E] data-[state=active]:text-[#007ACC] flex items-center space-x-2">
                          <FileType size={14} />
                          <span>estilos.css</span>
                        </TabsTrigger>
                        <TabsTrigger value="js" className="data-[state=active]:bg-[#1E1E1E] data-[state=active]:text-[#007ACC] flex items-center space-x-2">
                          <FileCog size={14} />
                          <span>script.js</span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <div className="flex items-center space-x-2 py-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={handleReset}
                                className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C] flex items-center space-x-1"
                              >
                                <RotateCcw size={14} />
                                <span>Restaurar</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Restaurar Código Padrão</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={handleCopyCode}
                                className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C] flex items-center space-x-1"
                              >
                                <Copy size={14} />
                                <span>Copiar</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Copiar Código Completo</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setShowConsole(!showConsole)}
                                className="h-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C] flex items-center space-x-1"
                              >
                                <Terminal size={14} />
                                <span>Console</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">Mostrar/Ocultar Console</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    {/* Editor de código com linha de numeração e estilo VSCode */}
                    <TabsContent value="html" className="flex-1 overflow-hidden mt-0 p-0">
                      <div className="flex items-center px-4 py-1 bg-[#252526] text-xs text-gray-400 border-b border-[#1E1E1E]">
                        <span>HTML</span>
                        <span className="mx-2">•</span>
                        <span>UTF-8</span>
                      </div>
                      <Editor
                        height="100%"
                        defaultLanguage="html"
                        theme={theme}
                        value={htmlCode}
                        onChange={(value) => setHtmlCode(value || '')}
                        options={{
                          fontSize: fontSize,
                          fontFamily: "'Fira Code', monospace",
                          fontLigatures: true,
                          minimap: { enabled: true },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                          lineNumbers: 'on',
                          renderLineHighlight: 'all',
                          cursorBlinking: 'smooth',
                          automaticLayout: true,
                          padding: { top: 10 },
                          suggest: {
                            showMethods: true,
                            showFunctions: true,
                            showConstructors: true,
                            showFields: true,
                            showVariables: true,
                            showClasses: true,
                            showStructs: true,
                            showInterfaces: true,
                            showModules: true,
                            showProperties: true,
                            showEvents: true,
                            showOperators: true,
                            showUnits: true,
                            showValues: true,
                            showConstants: true,
                            showEnums: true,
                            showEnumMembers: true,
                            showKeywords: true,
                            showWords: true,
                            showColors: true,
                            showFiles: true,
                            showReferences: true,
                            showFolders: true,
                            showTypeParameters: true,
                            showSnippets: true,
                            showUsers: true,
                            showIssues: true
                          }
                        }}
                      />
                    </TabsContent>

                    <TabsContent value="css" className="flex-1 overflow-hidden mt-0 p-0">
                      <div className="flex items-center px-4 py-1 bg-[#252526] text-xs text-gray-400 border-b border-[#1E1E1E]">
                        <span>CSS</span>
                        <span className="mx-2">•</span>
                        <span>UTF-8</span>
                      </div>
                      <Editor
                        height="100%"
                        defaultLanguage="css"
                        theme={theme}
                        value={cssCode}
                        onChange={(value) => setCssCode(value || '')}
                        options={{
                          fontSize: fontSize,
                          fontFamily: "'Fira Code', monospace",
                          fontLigatures: true,
                          minimap: { enabled: true },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                          lineNumbers: 'on',
                          renderLineHighlight: 'all',
                          cursorBlinking: 'smooth',
                          automaticLayout: true,
                          padding: { top: 10 }
                        }}
                      />
                    </TabsContent>

                    <TabsContent value="js" className="flex-1 overflow-hidden mt-0 p-0">
                      <div className="flex items-center px-4 py-1 bg-[#252526] text-xs text-gray-400 border-b border-[#1E1E1E]">
                        <span>JavaScript</span>
                        <span className="mx-2">•</span>
                        <span>UTF-8</span>
                      </div>
                      <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        theme={theme}
                        value={jsCode}
                        onChange={(value) => setJsCode(value || '')}
                        options={{
                          fontSize: fontSize,
                          fontFamily: "'Fira Code', monospace",
                          fontLigatures: true,
                          minimap: { enabled: true },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                          lineNumbers: 'on',
                          renderLineHighlight: 'all',
                          cursorBlinking: 'smooth',
                          automaticLayout: true,
                          padding: { top: 10 }
                        }}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-[#252526] hover:bg-[#007ACC]" />

            {/* Painel de visualização */}
            <ResizablePanel defaultSize={50}>
              <Card className="h-full border-0 rounded-none bg-[#1E1E1E]">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="p-2 border-b border-[#252526] bg-[#252526] flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Play size={14} className="text-[#007ACC]" />
                      <h3 className="font-medium text-gray-300 text-sm">Visualização</h3>
                      {!autoRefresh && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={updatePreview}
                          className="h-6 ml-2 text-xs text-white bg-[#007ACC] hover:bg-[#005999] border-[#007ACC]"
                        >
                          Atualizar
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-7 w-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                              onClick={() => {
                                const newWindow = window.open('', '_blank');
                                if (newWindow) {
                                  newWindow.document.write(preview);
                                  newWindow.document.close();
                                }
                              }}
                            >
                              <Maximize size={14} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">Abrir em Nova Aba</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-7 w-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                            >
                              <LayoutPanelLeft size={14} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">Mudar Layout</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-7 w-7 text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                              onClick={() => setShowConsole(!showConsole)}
                            >
                              <Terminal size={14} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">Mostrar/Ocultar Console</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  <div className={`flex flex-col ${showConsole ? 'h-[calc(100%-33px)]' : 'h-[calc(100%-33px)]'}`}>
                    <div className={`bg-white ${showConsole ? 'h-[70%]' : 'h-full'}`}>
                      <iframe
                        title="Visualização do Projeto"
                        srcDoc={preview}
                        className="w-full h-full border-0"
                        sandbox="allow-scripts"
                      />
                    </div>
                    
                    {/* Console de desenvolvedor */}
                    {showConsole && (
                      <div className="h-[30%] bg-[#1E1E1E] border-t border-[#252526] overflow-auto">
                        <div className="flex justify-between items-center p-2 bg-[#252526] text-gray-300 text-xs">
                          <div className="flex items-center space-x-2">
                            <Terminal size={14} />
                            <span>Console</span>
                            {errors.length > 0 && (
                              <div className="flex items-center text-red-500">
                                <AlertTriangle size={14} className="mr-1" />
                                <span>{errors.length} erro(s)</span>
                              </div>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={handleClearConsole}
                            className="h-6 text-xs text-gray-300 hover:text-white hover:bg-[#3C3C3C]"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Limpar
                          </Button>
                        </div>
                        
                        <div className="p-2 font-mono text-xs overflow-auto max-h-[calc(100%-28px)]">
                          {consoleOutput.length > 0 ? (
                            consoleOutput.map((output, index) => {
                              const isError = output.startsWith('error:');
                              const isWarn = output.startsWith('warn:');
                              let textColor = 'text-gray-300';
                              
                              if (isError) textColor = 'text-red-400';
                              else if (isWarn) textColor = 'text-yellow-400';
                              
                              return (
                                <div key={index} className={`${textColor} py-1 border-b border-[#333333]`}>
                                  &gt; {output}
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-gray-500 py-1">Console está vazio. Tente usar console.log() no seu JavaScript.</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        
        {/* Barra de status */}
        <div className="flex items-center justify-between px-4 py-1 bg-[#007ACC] text-white text-xs">
          <div className="flex items-center space-x-4">
            <span>Ln 1, Col 1</span>
            <span>UTF-8</span>
            <span>CRLF</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{autoRefresh ? 'Auto' : 'Manual'}</span>
            <span>100%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeEditor; 