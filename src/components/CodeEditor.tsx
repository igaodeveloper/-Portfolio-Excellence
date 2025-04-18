import { useState, useEffect, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import { 
  Play, 
  RotateCcw, 
  Maximize, 
  Save,
  Terminal,
  Download,
  Upload,
  Copy,
  Trash2,
  Moon,
  Sun
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


// Código HTML, CSS e JS padrão com tema Dracula
const defaultHTMLCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Projeto</title>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <header>
      <h1>Editor de Código Dracula</h1>
      <p>Edite este código para começar seu projeto!</p>
    </header>
    
    <main>
      <section class="content">
        <h2>Recursos:</h2>
        <ul>
          <li>Editor com tema Dracula</li>
          <li>Visualização em tempo real</li>
          <li>Console integrado</li>
        </ul>
        <button id="demoBtn">Demo Button</button>
      </section>
    </main>

    <footer>
      <p>© ${new Date().getFullYear()} - Editor Avançado</p>
    </footer>
  </div>
</body>
</html>`;

const defaultCSSCode = `/* Tema Dracula - https://draculatheme.com/ */
:root {
  --bg: #282a36;
  --bg-alt: #343746;
  --fg: #f8f8f2;
  --fg-alt: #6272a4;
  --cyan: #8be9fd;
  --green: #50fa7b;
  --orange: #ffb86c;
  --pink: #ff79c6;
  --purple: #bd93f9;
  --red: #ff5555;
  --yellow: #f1fa8c;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Fira Code', monospace;
  line-height: 1.6;
  color: var(--fg);
  background-color: var(--bg);
  padding: 2rem;
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: var(--bg-alt);
  border-radius: 8px;
  border: 1px solid var(--fg-alt);
}

h1 {
  color: var(--purple);
  margin-bottom: 1rem;
}

h2 {
  color: var(--cyan);
  margin-bottom: 1rem;
}

.content {
  background: var(--bg-alt);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--fg-alt);
  margin-bottom: 2rem;
}

button {
  background-color: var(--purple);
  color: var(--bg);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1.5rem;
  font-family: 'Fira Code', monospace;
  font-weight: bold;
  transition: all 0.3s ease;
}

button:hover {
  background-color: var(--pink);
  transform: translateY(-2px);
}

footer {
  text-align: center;
  color: var(--fg-alt);
  padding: 1rem;
}`;

const defaultJSCode = `// Console integrado - os logs aparecerão abaixo
console.log('Aplicação inicializada com sucesso!');

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o botão e adiciona um evento de clique
  const demoBtn = document.getElementById('demoBtn');
  
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      // Exibe alerta
      alert('Funcionalidade JavaScript funcionando!');
      
      // Log para o console
      console.log('Botão clicado - estado atualizado');
      
      // Altera o estilo do botão
      demoBtn.style.backgroundColor = '#ff79c6';
      demoBtn.textContent = 'Clicado!';
      demoBtn.style.transform = 'scale(1.05)';
      
      // Adiciona elemento dinamicamente
      const newElement = document.createElement('p');
      newElement.textContent = 'Novo elemento adicionado via JavaScript!';
      newElement.style.color = '#50fa7b';
      newElement.style.marginTop = '1rem';
      demoBtn.after(newElement);
    });
  }
});`;

interface CodeEditorProps {
  className?: string;
}

const CodeEditor = ({ className }: CodeEditorProps) => {
  // Estados principais
  const [htmlCode, setHtmlCode] = useState(defaultHTMLCode);
  const [cssCode, setCssCode] = useState(defaultCSSCode);
  const [jsCode, setJsCode] = useState(defaultJSCode);
  const [preview, setPreview] = useState('');
  const [fileName, setFileName] = useState('dracula-editor');
  const [theme, setTheme] = useState<'dracula' | 'vs-dark' | 'vs-light'>('dracula');
  const [fontSize, setFontSize] = useState(14);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeTab, setActiveTab] = useState('html');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Configurar tema Dracula para o Monaco Editor
  useEffect(() => {
    const setupDraculaTheme = async () => {
      const monaco = await import('monaco-editor');
      monaco.editor.defineTheme('dracula', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '#6272a4', fontStyle: 'italic' },
          { token: 'keyword', foreground: '#ff79c6' },
          { token: 'number', foreground: '#bd93f9' },
          { token: 'string', foreground: '#f1fa8c' },
          { token: 'type', foreground: '#8be9fd' },
          { token: 'delimiter', foreground: '#f8f8f2' },
          { token: 'operator', foreground: '#ff79c6' },
        ],
        colors: {
          'editor.background': '#282a36',
          'editor.foreground': '#f8f8f2',
          'editor.lineHighlightBackground': '#343746',
          'editorLineNumber.foreground': '#6272a4',
          'editor.selectionBackground': '#44475a',
          'editor.inactiveSelectionBackground': '#44475a75',
          'editorCursor.foreground': '#f8f8f2',
        }
      });
    };
    
    setupDraculaTheme();
  }, []);
  
  // Função para atualizar a visualização
  const updatePreview = useCallback(() => {
    // Limpar console
    setConsoleOutput([]);
    
    // Console interceptor para capturar logs
    const consoleInterceptor = 
      `<script>
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
            }
          };
          
          // Capturar erros
          window.addEventListener('error', function(event) {
            window.parent.postMessage({
              type: 'error',
              data: event.message + ' (linha: ' + event.lineno + ')'
            }, '*');
          });
        })();
      </script>`;
    
    // Gerar o código combinado (HTML + CSS + JS)
    const combinedCode = 
      `<html>
        <head>
          <style>${cssCode}</style>
          ${consoleInterceptor}
        </head>
        <body>
          ${htmlCode.replace(/<html[^>]*>|<\/html>|<head>.*<\/head>|<body[^>]*>|<\/body>/gs, '')}
          <script>${jsCode}</script>
        </body>
      </html>`;
    
    setPreview(combinedCode);
  }, [htmlCode, cssCode, jsCode]);
  
  // Atualizar preview quando o código é alterado e autoRefresh está ativo
  useEffect(() => {
    if (autoRefresh) {
      updatePreview();
    }
  }, [htmlCode, cssCode, jsCode, autoRefresh, updatePreview]);
  
  // Ouvir mensagens do iframe (console logs)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type) {
        const { type, data } = event.data;
        
        switch (type) {
          case 'console.log':
          case 'console.info':
            setConsoleOutput(prev => [...prev, `log: ${data}`]);
            break;
          case 'console.warn':
            setConsoleOutput(prev => [...prev, `warn: ${data}`]);
            break;
          case 'console.error':
          case 'error':
            setConsoleOutput(prev => [...prev, `error: ${data}`]);
            break;
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  
  // Manipuladores de eventos
  
  // Resetar código para os valores padrão
  const handleReset = () => {
    if (window.confirm("Tem certeza que deseja restaurar o código padrão? Todas as alterações serão perdidas.")) {
      setHtmlCode(defaultHTMLCode);
      setCssCode(defaultCSSCode);
      setJsCode(defaultJSCode);
      setConsoleOutput([]);
    }
  };
  
  // Salvar projeto como arquivo JSON
  const handleSave = () => {
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
    
    setConsoleOutput(prev => [...prev, `log: Projeto "${fileName}" salvo!`]);
  };
  
  // Exportar como HTML
  const handleExportHTML = () => {
    const fullHTML = 
      `<!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${fileName}</title>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode.replace(/<html[^>]*>|<\/html>|<head>.*<\/head>|<body[^>]*>|<\/body>/gs, '')}
        <script>${jsCode}</script>
      </body>
      </html>`;
    
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    setConsoleOutput(prev => [...prev, `log: Exportado para ${fileName}.html`]);
  };
  
  // Importar projeto
  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Processar arquivo importado
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
          setConsoleOutput(prev => [...prev, `log: Projeto "${project.name}" importado!`]);
        } else {
          throw new Error('Formato de arquivo inválido');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        setConsoleOutput(prev => [...prev, `error: Erro ao importar: ${errorMessage}`]);
      }
    };
    reader.readAsText(file);
    
    // Limpar o input
    e.target.value = '';
  };
  
  // Copiar código para área de transferência
  const handleCopyCode = () => {
    const fullHTML = 
      `<!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${fileName}</title>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode.replace(/<html[^>]*>|<\/html>|<head>.*<\/head>|<body[^>]*>|<\/body>/gs, '')}
        <script>${jsCode}</script>
      </body>
      </html>`;
    
    navigator.clipboard.writeText(fullHTML)
      .then(() => setConsoleOutput(prev => [...prev, 'log: Código copiado!']))
      .catch(err => setConsoleOutput(prev => [...prev, `error: Erro ao copiar: ${err.message}`]));
  };
  
  // Limpar console
  const handleClearConsole = () => {
    setConsoleOutput([]);
  };
  
  // Alterna o tema
  const toggleTheme = () => {
    setTheme(theme === 'dracula' ? 'vs-light' : 'dracula');
  };

  return (
    <div className={`w-full h-[800px] bg-[#282a36] rounded-lg shadow-lg overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col"
      >
        {/* Barra superior */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#343746] border-b border-[#44475a]">
          <div className="flex items-center space-x-4">
            <input 
              type="text" 
              value={fileName} 
              onChange={(e) => setFileName(e.target.value)}
              className="bg-[#44475a] text-[#f8f8f2] px-3 py-1 rounded text-sm outline-none border border-[#44475a] focus:border-[#bd93f9]"
              placeholder="Nome do projeto"
            />
            
            {/* Menu de opções */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]">
                  Opções
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#343746] text-[#f8f8f2] border-[#44475a]">
                <DropdownMenuItem className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer" onClick={handleSave}>
                  <Save size={14} className="mr-2" /> Salvar Projeto
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer" onClick={handleExportHTML}>
                  <Download size={14} className="mr-2" /> Exportar HTML
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer" onClick={handleImport}>
                  <Upload size={14} className="mr-2" /> Importar Projeto
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer" onClick={handleCopyCode}>
                  <Copy size={14} className="mr-2" /> Copiar Código
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer" onClick={handleReset}>
                  <RotateCcw size={14} className="mr-2" /> Restaurar Padrão
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer" onClick={toggleTheme}>
                  {theme === 'dracula' ? <Sun size={14} className="mr-2" /> : <Moon size={14} className="mr-2" />}
                  {theme === 'dracula' ? 'Tema Claro' : 'Tema Dracula'}
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer" onClick={() => setFontSize(fontSize + 1)}>
                  Aumentar Fonte
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer" onClick={() => setFontSize(Math.max(10, fontSize - 1))}>
                  Diminuir Fonte
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer" onClick={() => setAutoRefresh(!autoRefresh)}>
                  {autoRefresh ? 'Desativar Auto Refresh' : 'Ativar Auto Refresh'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a] ${showConsole ? 'bg-[#44475a]' : ''}`}
                    onClick={() => setShowConsole(!showConsole)}
                  >
                    <Terminal size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-[#343746] text-[#f8f8f2] border-[#44475a]">Console</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {!autoRefresh && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                      onClick={updatePreview}
                    >
                      <Play size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-[#343746] text-[#f8f8f2] border-[#44475a]">Executar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        
        {/* Conteúdo principal */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {/* Painel de código */}
            <ResizablePanel defaultSize={50}>
              <Card className="h-full border-0 rounded-none bg-[#282a36]">
                <CardContent className="p-0 h-full">
                  <Tabs defaultValue="html" value={activeTab} onValueChange={setActiveTab} className="h-full">
                    <TabsList className="bg-[#343746] border-b border-[#44475a] h-9 rounded-none px-2 w-full justify-start">
                      <TabsTrigger value="html" className="data-[state=active]:bg-[#282a36] h-8 rounded-sm text-[#f8f8f2]">HTML</TabsTrigger>
                      <TabsTrigger value="css" className="data-[state=active]:bg-[#282a36] h-8 rounded-sm text-[#f8f8f2]">CSS</TabsTrigger>
                      <TabsTrigger value="js" className="data-[state=active]:bg-[#282a36] h-8 rounded-sm text-[#f8f8f2]">JS</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="html" className="flex-1 overflow-hidden mt-0 p-0 h-[calc(100%-36px)]">
                      <Editor
                        height="100%"
                        defaultLanguage="html"
                        theme={theme}
                        value={htmlCode}
                        onChange={(value) => setHtmlCode(value || '')}
                        options={{
                          fontSize,
                          minimap: { enabled: true },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                          automaticLayout: true,
                          fontFamily: 'Fira Code',
                          fontLigatures: true,
                        }}
                      />
                    </TabsContent>

                    <TabsContent value="css" className="flex-1 overflow-hidden mt-0 p-0 h-[calc(100%-36px)]">
                      <Editor
                        height="100%"
                        defaultLanguage="css"
                        theme={theme}
                        value={cssCode}
                        onChange={(value) => setCssCode(value || '')}
                        options={{
                          fontSize,
                          minimap: { enabled: true },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                          automaticLayout: true,
                          fontFamily: 'Fira Code',
                          fontLigatures: true,
                        }}
                      />
                    </TabsContent>

                    <TabsContent value="js" className="flex-1 overflow-hidden mt-0 p-0 h-[calc(100%-36px)]">
                      <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        theme={theme}
                        value={jsCode}
                        onChange={(value) => setJsCode(value || '')}
                        options={{
                          fontSize,
                          minimap: { enabled: true },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                          automaticLayout: true,
                          fontFamily: 'Fira Code',
                          fontLigatures: true,
                        }}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-[#343746] hover:bg-[#bd93f9]" />

            {/* Painel de visualização */}
            <ResizablePanel defaultSize={50}>
              <Card className="h-full border-0 rounded-none bg-[#282a36]">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="p-2 border-b border-[#343746] bg-[#343746] flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Play size={14} className="text-[#bd93f9]" />
                      <span className="text-[#f8f8f2] text-sm">Visualização</span>
                    </div>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
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
                        <TooltipContent side="bottom" className="bg-[#343746] text-[#f8f8f2] border-[#44475a]">Abrir em Nova Aba</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className={`flex flex-col ${showConsole ? 'h-[calc(100%-33px)]' : 'h-[calc(100%-33px)]'}`}>
                    <div className={`bg-[#282a36] ${showConsole ? 'h-[70%]' : 'h-full'}`}>
                      <iframe
                        title="Visualização do Projeto"
                        srcDoc={preview}
                        className="w-full h-full border-0"
                        sandbox="allow-scripts"
                      />
                    </div>
                    
                    {/* Console */}
                    {showConsole && (
                      <div className="h-[30%] bg-[#282a36] border-t border-[#343746] overflow-auto">
                        <div className="flex justify-between items-center p-2 bg-[#343746] text-[#f8f8f2] text-xs">
                          <span>Console</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={handleClearConsole}
                            className="h-6 text-xs text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
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
                              let textColor = 'text-[#f8f8f2]';
                              
                              if (isError) textColor = 'text-[#ff5555]';
                              else if (isWarn) textColor = 'text-[#ffb86c]';
                              
                              return (
                                <div key={index} className={`${textColor} py-1 border-b border-[#343746]`}>
                                  &gt; {output}
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-[#6272a4] py-1">Console vazio. Use console.log() para ver mensagens aqui.</div>
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
        
        {/* Input invisível para upload de arquivo */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          className="hidden"
        />
        
        {/* Barra de status */}
        <div className="flex items-center justify-between px-4 py-1 bg-[#bd93f9] text-[#282a36] text-xs">
          <span>{fileName}.html</span>
          <div className="flex items-center space-x-4">
            <span>{autoRefresh ? 'Atualização: Auto' : 'Atualização: Manual'}</span>
            <span>{activeTab.toUpperCase()}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeEditor;