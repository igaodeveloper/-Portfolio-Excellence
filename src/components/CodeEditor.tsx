import { useState, useEffect, useRef, useCallback } from 'react';
import Editor, { Monaco, BeforeMount } from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
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
  Sun,
  Code2,
  Settings,
  Search,
  RefreshCw,
  Undo,
  Redo,
  Layers,
  FileText,
  PanelLeft,
  PanelRight,
  Check,
  History,
  AlignCenter,
  ZoomIn,
  ZoomOut,
  Book,
  X,
  Eye,
  EyeOff,
  Clock,
  HelpCircle,
  Share2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

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

// Estrutura para salvar o histórico de alterações
interface CodeVersion {
  id: string;
  timestamp: number;
  html: string;
  css: string;
  js: string;
  description: string;
}

// Estrutura para snippets personalizados
interface CodeSnippet {
  id: string;
  name: string;
  language: string;
  code: string;
}

// Tipos de linguagens suportadas
type Language =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'json'
  | 'markdown'
  | 'sql'
  | 'xml';
type EditorTheme =
  | 'dracula'
  | 'vs-dark'
  | 'vs-light'
  | 'github'
  | 'monokai'
  | 'nord'
  | 'solarized-dark'
  | 'solarized-light';

const CodeEditor = ({ className }: CodeEditorProps) => {
  // Estados principais
  const [htmlCode, setHtmlCode] = useState(defaultHTMLCode);
  const [cssCode, setCssCode] = useState(defaultCSSCode);
  const [jsCode, setJsCode] = useState(defaultJSCode);
  const [preview, setPreview] = useState('');
  const [fileName, setFileName] = useState('dracula-editor');
  const [theme, setTheme] = useState<EditorTheme>('dracula');
  const [fontSize, setFontSize] = useState(14);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeTab, setActiveTab] = useState<Language>('html');

  // Novos estados para recursos avançados
  const [codeHistory, setCodeHistory] = useState<CodeVersion[]>([]);
  const [customSnippets, setCustomSnippets] = useState<CodeSnippet[]>([]);
  const [editorSettings, setEditorSettings] = useState({
    wordWrap: true,
    minimap: true,
    lineNumbers: true,
    bracketPairs: true,
    formatOnPaste: true,
    formatOnType: false,
    tabSize: 2,
    autoIndent: true,
    highlightActiveLine: true,
    highlightMatches: true,
    folding: true,
    autoClosingBrackets: true,
    autoClosingQuotes: true,
    autoSurround: true,
    snippetSuggestions: true,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: true,
    quickSuggestions: true,
    lintingEnabled: true,
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [replaceQuery, setReplaceQuery] = useState('');
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>(
    'split',
  );
  const [activeLanguage, setActiveLanguage] = useState<Language>('html');
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(false);
  const [isSplitView, setIsSplitView] = useState(true);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [currentVersion, setCurrentVersion] = useState(0);
  const [lintErrors, setLintErrors] = useState<{
    html: any[];
    css: any[];
    javascript: any[];
  }>({
    html: [],
    css: [],
    javascript: [],
  });
  const [isSnippetsDialogOpen, setIsSnippetsDialogOpen] = useState(false);

  // Referências
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  // Função para configurar os temas do Monaco Editor
  useEffect(() => {
    const setupEditorThemes = async () => {
      const monaco = await import('monaco-editor');
      monacoRef.current = monaco;

      // Tema Dracula
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
          { token: 'tag', foreground: '#ff79c6' },
          { token: 'attribute.name', foreground: '#50fa7b' },
          { token: 'attribute.value', foreground: '#f1fa8c' },
        ],
        colors: {
          'editor.background': '#282a36',
          'editor.foreground': '#f8f8f2',
          'editor.lineHighlightBackground': '#343746',
          'editorLineNumber.foreground': '#6272a4',
          'editor.selectionBackground': '#44475a',
          'editor.inactiveSelectionBackground': '#44475a75',
          'editorCursor.foreground': '#f8f8f2',
          'editorWhitespace.foreground': '#3B3A32',
          'editorIndentGuide.background': '#3B3A32',
          'editor.selectionHighlightBorder': '#215283',
        },
      });

      // Tema Monokai
      monaco.editor.defineTheme('monokai', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '#75715E', fontStyle: 'italic' },
          { token: 'keyword', foreground: '#F92672' },
          { token: 'number', foreground: '#AE81FF' },
          { token: 'string', foreground: '#E6DB74' },
          { token: 'type', foreground: '#66D9EF', fontStyle: 'italic' },
          { token: 'delimiter', foreground: '#F8F8F2' },
          { token: 'operator', foreground: '#F92672' },
          { token: 'tag', foreground: '#F92672' },
          { token: 'attribute.name', foreground: '#A6E22E' },
          { token: 'attribute.value', foreground: '#E6DB74' },
        ],
        colors: {
          'editor.background': '#272822',
          'editor.foreground': '#F8F8F2',
          'editor.lineHighlightBackground': '#3E3D32',
          'editorLineNumber.foreground': '#75715E',
          'editor.selectionBackground': '#49483E',
          'editor.inactiveSelectionBackground': '#49483E75',
          'editorCursor.foreground': '#F8F8F2',
          'editorWhitespace.foreground': '#3B3A32',
          'editorIndentGuide.background': '#3B3A32',
          'editor.selectionHighlightBorder': '#222218',
        },
      });

      // Tema Nord
      monaco.editor.defineTheme('nord', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '#616E88', fontStyle: 'italic' },
          { token: 'keyword', foreground: '#81A1C1' },
          { token: 'number', foreground: '#B48EAD' },
          { token: 'string', foreground: '#A3BE8C' },
          { token: 'type', foreground: '#8FBCBB' },
          { token: 'delimiter', foreground: '#ECEFF4' },
          { token: 'operator', foreground: '#81A1C1' },
          { token: 'tag', foreground: '#81A1C1' },
          { token: 'attribute.name', foreground: '#8FBCBB' },
          { token: 'attribute.value', foreground: '#A3BE8C' },
        ],
        colors: {
          'editor.background': '#2E3440',
          'editor.foreground': '#D8DEE9',
          'editor.lineHighlightBackground': '#3B4252',
          'editorLineNumber.foreground': '#4C566A',
          'editor.selectionBackground': '#434C5E',
          'editor.inactiveSelectionBackground': '#434C5E75',
          'editorCursor.foreground': '#D8DEE9',
          'editorWhitespace.foreground': '#434C5E',
          'editorIndentGuide.background': '#434C5E',
          'editor.selectionHighlightBorder': '#4C566A',
        },
      });

      // Tema GitHub
      monaco.editor.defineTheme('github', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '#6A737D', fontStyle: 'italic' },
          { token: 'keyword', foreground: '#D73A49' },
          { token: 'number', foreground: '#005CC5' },
          { token: 'string', foreground: '#032F62' },
          { token: 'type', foreground: '#D73A49' },
          { token: 'delimiter', foreground: '#24292E' },
          { token: 'operator', foreground: '#D73A49' },
          { token: 'tag', foreground: '#22863A' },
          { token: 'attribute.name', foreground: '#6F42C1' },
          { token: 'attribute.value', foreground: '#032F62' },
        ],
        colors: {
          'editor.background': '#F6F8FA',
          'editor.foreground': '#24292E',
          'editor.lineHighlightBackground': '#EBEDEF',
          'editorLineNumber.foreground': '#1B1F234D',
          'editor.selectionBackground': '#0366D625',
          'editor.inactiveSelectionBackground': '#0366D610',
          'editorCursor.foreground': '#24292E',
          'editorWhitespace.foreground': '#E1E4E8',
          'editorIndentGuide.background': '#E1E4E8',
          'editor.selectionHighlightBorder': '#34D05800',
        },
      });

      // Tema Solarized Dark
      monaco.editor.defineTheme('solarized-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '#657B83', fontStyle: 'italic' },
          { token: 'keyword', foreground: '#859900' },
          { token: 'number', foreground: '#D33682' },
          { token: 'string', foreground: '#2AA198' },
          { token: 'type', foreground: '#268BD2' },
          { token: 'delimiter', foreground: '#839496' },
          { token: 'operator', foreground: '#859900' },
          { token: 'tag', foreground: '#268BD2' },
          { token: 'attribute.name', foreground: '#B58900' },
          { token: 'attribute.value', foreground: '#2AA198' },
        ],
        colors: {
          'editor.background': '#002B36',
          'editor.foreground': '#839496',
          'editor.lineHighlightBackground': '#073642',
          'editorLineNumber.foreground': '#586E75',
          'editor.selectionBackground': '#073642',
          'editor.inactiveSelectionBackground': '#07364275',
          'editorCursor.foreground': '#839496',
          'editorWhitespace.foreground': '#073642',
          'editorIndentGuide.background': '#073642',
          'editor.selectionHighlightBorder': '#073642',
        },
      });

      // Tema Solarized Light
      monaco.editor.defineTheme('solarized-light', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '#93A1A1', fontStyle: 'italic' },
          { token: 'keyword', foreground: '#859900' },
          { token: 'number', foreground: '#D33682' },
          { token: 'string', foreground: '#2AA198' },
          { token: 'type', foreground: '#268BD2' },
          { token: 'delimiter', foreground: '#657B83' },
          { token: 'operator', foreground: '#859900' },
          { token: 'tag', foreground: '#268BD2' },
          { token: 'attribute.name', foreground: '#B58900' },
          { token: 'attribute.value', foreground: '#2AA198' },
        ],
        colors: {
          'editor.background': '#FDF6E3',
          'editor.foreground': '#657B83',
          'editor.lineHighlightBackground': '#EEE8D5',
          'editorLineNumber.foreground': '#93A1A1',
          'editor.selectionBackground': '#EEE8D5',
          'editor.inactiveSelectionBackground': '#EEE8D575',
          'editorCursor.foreground': '#657B83',
          'editorWhitespace.foreground': '#EEE8D5',
          'editorIndentGuide.background': '#EEE8D5',
          'editor.selectionHighlightBorder': '#EEE8D5',
        },
      });
    };

    setupEditorThemes();
  }, []);

  // Função para configurar o editor Monaco quando ele for montado
  const handleEditorBeforeMount: BeforeMount = (monaco) => {
    // Adicionar suporte para mais linguagens
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types'],
    });

    // Adicionar definições TypeScript para HTML e CSS
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      `
      interface Document {
        getElementById(id: string): HTMLElement | null;
        querySelector(selectors: string): HTMLElement | null;
        querySelectorAll(selectors: string): NodeListOf<HTMLElement>;
        createElement(tagName: string): HTMLElement;
      }
      
      interface HTMLElement {
        style: CSSStyleDeclaration;
        classList: DOMTokenList;
        innerHTML: string;
        innerText: string;
        textContent: string;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
        appendChild(node: Node): Node;
        after(...nodes: (Node | string)[]): void;
      }
      
      interface CSSStyleDeclaration {
        backgroundColor: string;
        color: string;
        [key: string]: string;
      }
      
      interface Window {
        document: Document;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
      }
      
      declare var document: Document;
      declare var window: Window;
    `,
      'typescript:dom.d.ts',
    );

    // Configurar linting para JavaScript
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        // Gerar snippets com base no contexto
        const snippets = [
          {
            label: 'doc-ready',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Executar código quando o DOM estiver pronto',
            insertText: [
              'document.addEventListener("DOMContentLoaded", () => {',
              '\t$0',
              '});',
            ].join('\n'),
            range: range,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'for-loop',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Loop for padrão',
            insertText: [
              'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {',
              '\t$0',
              '}',
            ].join('\n'),
            range: range,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'arrow',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Arrow function',
            insertText: 'const ${1:functionName} = (${2:params}) => {\n\t$0\n}',
            range: range,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'fetch-get',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Requisição Fetch GET',
            insertText: [
              'fetch("${1:url}")',
              '\t.then(response => response.json())',
              '\t.then(data => {',
              '\t\t$0',
              '\t})',
              '\t.catch(error => console.error("Erro:", error));',
            ].join('\n'),
            range: range,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
        ];

        // Adicionar snippets personalizados
        customSnippets
          .filter((snippet) => snippet.language === 'javascript')
          .forEach((snippet) => {
            snippets.push({
              label: snippet.name,
              kind: monaco.languages.CompletionItemKind.Snippet,
              documentation: `Snippet personalizado: ${snippet.name}`,
              insertText: snippet.code,
              range: range,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            });
          });

        return { suggestions: snippets };
      },
    });

    // Configurar snippets para HTML
    monaco.languages.registerCompletionItemProvider('html', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const snippets = [
          {
            label: 'html5',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Estrutura HTML5 básica',
            insertText: [
              '<!DOCTYPE html>',
              '<html lang="${1:pt-BR}">',
              '<head>',
              '\t<meta charset="UTF-8">',
              '\t<meta name="viewport" content="width=device-width, initial-scale=1.0">',
              '\t<title>${2:Título da Página}</title>',
              '</head>',
              '<body>',
              '\t$0',
              '</body>',
              '</html>',
            ].join('\n'),
            range: range,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'flexbox',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Container Flexbox',
            insertText: [
              '<div class="flex-container">',
              '\t<div class="flex-item">$1</div>',
              '\t<div class="flex-item">$2</div>',
              '\t<div class="flex-item">$3</div>',
              '</div>',
            ].join('\n'),
            range: range,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
        ];

        // Adicionar snippets personalizados para HTML
        customSnippets
          .filter((snippet) => snippet.language === 'html')
          .forEach((snippet) => {
            snippets.push({
              label: snippet.name,
              kind: monaco.languages.CompletionItemKind.Snippet,
              documentation: `Snippet personalizado: ${snippet.name}`,
              insertText: snippet.code,
              range: range,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            });
          });

        return { suggestions: snippets };
      },
    });

    // Configurar snippets para CSS
    monaco.languages.registerCompletionItemProvider('css', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const snippets = [
          {
            label: 'flex-container',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Estilos para container Flexbox',
            insertText: [
              '.flex-container {',
              '\tdisplay: flex;',
              '\tflex-wrap: wrap;',
              '\tjustify-content: ${1:space-between};',
              '\talign-items: ${2:center};',
              '\tgap: ${3:10px};',
              '\t$0',
              '}',
              '',
              '.flex-item {',
              '\tflex: 1;',
              '\tpadding: 1rem;',
              '}',
            ].join('\n'),
            range: range,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'grid',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Grid Layout',
            insertText: [
              '.grid-container {',
              '\tdisplay: grid;',
              '\tgrid-template-columns: repeat(${1:3}, 1fr);',
              '\tgrid-gap: ${2:20px};',
              '\t$0',
              '}',
            ].join('\n'),
            range: range,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'media-query',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: 'Media Query para responsividade',
            insertText: ['@media (max-width: ${1:768px}) {', '\t$0', '}'].join(
              '\n',
            ),
            range: range,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
        ];

        // Adicionar snippets personalizados para CSS
        customSnippets
          .filter((snippet) => snippet.language === 'css')
          .forEach((snippet) => {
            snippets.push({
              label: snippet.name,
              kind: monaco.languages.CompletionItemKind.Snippet,
              documentation: `Snippet personalizado: ${snippet.name}`,
              insertText: snippet.code,
              range: range,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            });
          });

        return { suggestions: snippets };
      },
    });
  };

  // Função para manipular a montagem do editor
  const handleEditorMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Adicionar os atalhos de teclado
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSave();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
      setIsSearchOpen(true);
    });

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF,
      () => {
        formatCode();
      },
    );

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP, () => {
      updatePreview();
    });

    // Adicionar mais atalhos avançados
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyR, () => {
      handleReset();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Digit1, () => {
      setActiveTab('html');
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Digit2, () => {
      setActiveTab('css');
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Digit3, () => {
      setActiveTab('js' as Language);
    });

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyB,
      () => {
        setShowConsole(!showConsole);
      },
    );

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyC,
      () => {
        handleClearConsole();
      },
    );

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
      () => {
        editor.getAction('editor.action.formatDocument')?.run();
      },
    );

    // Salvar histórico inicial
    saveToHistory('Estado inicial');
  };

  // Função para atualizar a visualização
  const updatePreview = useCallback(() => {
    // Limpar console se necessário
    if (consoleOutput.length > 100) {
      setConsoleOutput((prev) => prev.slice(-50));
    }

    // Console interceptor para capturar logs
    const consoleInterceptor = `<script>
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
            },
            clear: function() {
              window.parent.postMessage({
                type: 'console.clear'
              }, '*');
              originalConsole.clear.apply(originalConsole);
            }
          };
          
          // Capturar erros
          window.addEventListener('error', function(event) {
            window.parent.postMessage({
              type: 'error',
              data: event.message + ' (linha: ' + event.lineno + ', coluna: ' + event.colno + ')'
            }, '*');
            event.preventDefault();
          });
          
          // Capturar rejeições de promessas
          window.addEventListener('unhandledrejection', function(event) {
            window.parent.postMessage({
              type: 'error',
              data: 'Promessa rejeitada: ' + (typeof event.reason === 'object' ? JSON.stringify(event.reason) : event.reason)
            }, '*');
          });
        })();
      </script>`;

    // Gerar o código combinado (HTML + CSS + JS)
    const combinedCode = `<!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${fileName}</title>
          <style>${cssCode}</style>
          ${consoleInterceptor}
        </head>
        <body>
          ${htmlCode.replace(/<html[^>]*>|<\/html>|<head>.*<\/head>|<body[^>]*>|<\/body>/gs, '')}
          <script>${jsCode}</script>
        </body>
      </html>`;

    setPreview(combinedCode);
  }, [htmlCode, cssCode, jsCode, fileName, consoleOutput.length]);

  // Atualizar preview quando o código é alterado e autoRefresh está ativo
  useEffect(() => {
    if (autoRefresh) {
      const timer = setTimeout(() => {
        updatePreview();
      }, 500); // Pequeno delay para evitar atualizações frequentes demais

      return () => clearTimeout(timer);
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
            setConsoleOutput((prev) => [...prev, `log: ${data}`]);
            break;
          case 'console.warn':
            setConsoleOutput((prev) => [...prev, `warn: ${data}`]);
            break;
          case 'console.error':
          case 'error':
            setConsoleOutput((prev) => [...prev, `error: ${data}`]);
            break;
          case 'console.clear':
            setConsoleOutput([]);
            break;
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-save para histórico
  useEffect(() => {
    if (isAutoSaveEnabled) {
      const autoSaveTimer = setTimeout(() => {
        saveToHistory('Auto-save');
      }, 30000); // Auto-save a cada 30 segundos

      return () => clearTimeout(autoSaveTimer);
    }
  }, [htmlCode, cssCode, jsCode, isAutoSaveEnabled]);

  // Salvar estado no histórico
  const saveToHistory = (description: string) => {
    if (
      codeHistory.length === 0 ||
      htmlCode !== codeHistory[codeHistory.length - 1].html ||
      cssCode !== codeHistory[codeHistory.length - 1].css ||
      jsCode !== codeHistory[codeHistory.length - 1].js
    ) {
      const newVersion: CodeVersion = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        html: htmlCode,
        css: cssCode,
        js: jsCode,
        description: description,
      };

      setCodeHistory((prev) => [
        ...prev.slice(0, currentVersion + 1),
        newVersion,
      ]);
      setCurrentVersion((prev) => prev + 1);
    }
  };

  // Restaurar uma versão do histórico
  const restoreVersion = (index: number) => {
    if (index >= 0 && index < codeHistory.length) {
      const version = codeHistory[index];
      setHtmlCode(version.html);
      setCssCode(version.css);
      setJsCode(version.js);
      setCurrentVersion(index);

      toast.success(`Restaurado: ${version.description}`);
    }
  };

  // Formatar código usando o Monaco
  const formatCode = () => {
    if (!editorRef.current || !monacoRef.current) return;

    const editor = editorRef.current;
    const monaco = monacoRef.current;

    editor.getAction('editor.action.formatDocument')?.run();
    toast.success('Código formatado');

    // Salvar ao histórico
    saveToHistory('Formatação de código');
  };

  // Validar o código HTML
  const validateHTML = () => {
    // Implementação simplificada de validação HTML
    const errors = [];

    const openTags: string[] = [];
    const tagRegex = /<\/?([a-z0-9\-]+)[^>]*>/gi;
    const voidElements = [
      'area',
      'base',
      'br',
      'col',
      'embed',
      'hr',
      'img',
      'input',
      'link',
      'meta',
      'param',
      'source',
      'track',
      'wbr',
    ];

    let match;
    let lineNumber = 1;
    let htmlLines = htmlCode.split('\n');

    for (let i = 0; i < htmlLines.length; i++) {
      const line = htmlLines[i];
      const lineTagRegex = /<\/?([a-z0-9\-]+)[^>]*>/gi;

      while ((match = lineTagRegex.exec(line)) !== null) {
        const [fullTag, tagName] = match;

        if (fullTag.match(/^<[^/]/)) {
          // Tag de abertura
          if (!voidElements.includes(tagName.toLowerCase())) {
            openTags.push(tagName.toLowerCase());
          }
        } else if (fullTag.match(/^<\//)) {
          // Tag de fechamento
          const expectedTag = openTags.pop();

          if (expectedTag !== tagName.toLowerCase()) {
            errors.push({
              line: i + 1,
              message: `Tag de fechamento inesperada: ${tagName}. Esperada: ${expectedTag}`,
            });
          }
        }
      }
    }

    // Verificar tags que não foram fechadas
    if (openTags.length > 0) {
      errors.push({
        line: htmlLines.length,
        message: `Tags não fechadas: ${openTags.join(', ')}`,
      });
    }

    return errors;
  };

  // Validar CSS
  const validateCSS = () => {
    const errors = [];
    const cssLines = cssCode.split('\n');

    // Verificação simples de chaves
    let openBraces = 0;
    let openBracesLines: number[] = [];

    for (let i = 0; i < cssLines.length; i++) {
      const line = cssLines[i];

      // Contar chaves de abertura
      for (let j = 0; j < line.length; j++) {
        if (line[j] === '{') {
          openBraces++;
          openBracesLines.push(i + 1);
        } else if (line[j] === '}') {
          if (openBraces === 0) {
            errors.push({
              line: i + 1,
              message: 'Chave de fechamento sem abertura correspondente',
            });
          } else {
            openBraces--;
            openBracesLines.pop();
          }
        }
      }

      // Verificar propriedades sem ponto e vírgula
      if (line.trim().match(/^[a-zA-Z\-]+\s*:.+[^;{]$/)) {
        errors.push({
          line: i + 1,
          message: 'Propriedade sem ponto e vírgula no final',
        });
      }
    }

    // Verificar chaves não fechadas
    if (openBraces > 0) {
      errors.push({
        line: openBracesLines[0],
        message: `${openBraces} chaves não foram fechadas`,
      });
    }

    return errors;
  };

  // Validar JavaScript
  const validateJS = () => {
    const errors = [];
    const jsLines = jsCode.split('\n');

    // Verificação simples de erros comuns
    for (let i = 0; i < jsLines.length; i++) {
      const line = jsLines[i].trim();

      // Verificar console.log esquecidos
      if (
        editorSettings.lintingEnabled &&
        line.includes('console.log(') &&
        !line.includes('//')
      ) {
        errors.push({
          line: i + 1,
          message: 'Console.log encontrado no código',
        });
      }

      // Verificar if sem chaves
      if (line.match(/^if\s*\(.+\).+[^{]$/)) {
        errors.push({
          line: i + 1,
          message: 'Recomendado usar chaves com declarações if',
        });
      }

      // Verificar variáveis não utilizadas seria melhor com um analisador real
    }

    return errors;
  };

  // Executar linting em todos os arquivos
  const runLinting = useCallback(() => {
    if (!editorSettings.lintingEnabled) {
      setLintErrors({ html: [], css: [], javascript: [] });
      return;
    }

    const htmlErrors = validateHTML();
    const cssErrors = validateCSS();
    const jsErrors = validateJS();

    setLintErrors({
      html: htmlErrors,
      css: cssErrors,
      javascript: jsErrors,
    });

    // Exibir erros no console se houver
    const activeErrors =
      activeTab === 'html'
        ? htmlErrors
        : activeTab === 'css'
          ? cssErrors
          : jsErrors;

    if (activeErrors.length > 0 && showConsole) {
      setConsoleOutput((prev) => [
        ...prev,
        `error: ${activeErrors.length} erros encontrados no arquivo ${activeTab}`,
      ]);

      activeErrors.forEach((error) => {
        setConsoleOutput((prev) => [
          ...prev,
          `error: Linha ${error.line}: ${error.message}`,
        ]);
      });
    }
  }, [
    htmlCode,
    cssCode,
    jsCode,
    activeTab,
    editorSettings.lintingEnabled,
    showConsole,
  ]);

  // Executar linting quando o código for alterado
  useEffect(() => {
    const timer = setTimeout(() => {
      runLinting();
    }, 1000); // Delay para não rodar a cada tecla

    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode, editorSettings.lintingEnabled, runLinting]);

  // Pesquisar no código atual
  const searchInActiveEditor = (query: string, editor: any, monaco: Monaco) => {
    if (!query || !editor || !monaco) return;

    // Limpar decorações anteriores
    const oldDecorations = editor
      .getModel()
      .getAllDecorations()
      .filter((d: any) => d.options.className === 'search-highlight')
      .map((d: any) => d.id);

    editor.deltaDecorations(oldDecorations, []);

    if (query.length < 2) return; // Ignorar buscas muito curtas

    const model = editor.getModel();
    const text = model.getValue();
    const matches = [];
    const regex = new RegExp(
      query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
      'gi',
    );

    let match;
    while ((match = regex.exec(text)) !== null) {
      const startPosition = model.getPositionAt(match.index);
      const endPosition = model.getPositionAt(match.index + match[0].length);

      matches.push({
        range: new monaco.Range(
          startPosition.lineNumber,
          startPosition.column,
          endPosition.lineNumber,
          endPosition.column,
        ),
        options: {
          className: 'search-highlight',
          inlineClassName: 'search-highlight-inline',
          stickiness:
            monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
        },
      });
    }

    // Aplicar decorações para destacar todas as ocorrências
    editor.deltaDecorations([], matches);

    // Navegar para a primeira ocorrência
    if (matches.length > 0) {
      editor.revealRangeInCenter(matches[0].range);
      editor.setSelection(matches[0].range);
    }

    return matches.length;
  };

  // Substituir no código atual
  const replaceInActiveEditor = (searchQuery: string, replaceQuery: string) => {
    if (!editorRef.current || !monacoRef.current || !searchQuery) return;

    const editor = editorRef.current;
    const model = editor.getModel();
    const text = model.getValue();

    // Escape regex characters in search query
    const safeSearchQuery = searchQuery.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      '\\$&',
    );
    const regex = new RegExp(safeSearchQuery, 'g');
    const newText = text.replace(regex, replaceQuery);

    // Aplicar alterações
    model.pushEditOperations(
      [],
      [
        {
          range: model.getFullModelRange(),
          text: newText,
        },
      ],
      () => null,
    );

    // Salvar ao histórico
    saveToHistory('Substituição de texto');

    return text !== newText;
  };

  // Salvar projeto como arquivo JSON
  const handleSave = () => {
    const project = {
      name: fileName,
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      updatedAt: new Date().toISOString(),
      settings: editorSettings,
      history: codeHistory.slice(-5), // Guardar apenas as últimas 5 versões
    };

    const blob = new Blob([JSON.stringify(project, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setConsoleOutput((prev) => [...prev, `log: Projeto "${fileName}" salvo!`]);
    toast.success(`Projeto "${fileName}" salvo!`);

    // Salvar ao histórico
    saveToHistory('Projeto salvo');
  };

  // Manipuladores de eventos

  // Resetar código para os valores padrão
  const handleReset = () => {
    if (
      window.confirm(
        'Tem certeza que deseja restaurar o código padrão? Todas as alterações serão perdidas.',
      )
    ) {
      setHtmlCode(defaultHTMLCode);
      setCssCode(defaultCSSCode);
      setJsCode(defaultJSCode);
      setConsoleOutput([]);
    }
  };

  // Exportar como HTML
  const handleExportHTML = () => {
    const fullHTML = `<!DOCTYPE html>
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

    setConsoleOutput((prev) => [
      ...prev,
      `log: Exportado para ${fileName}.html`,
    ]);
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
          setConsoleOutput((prev) => [
            ...prev,
            `log: Projeto "${project.name}" importado!`,
          ]);
        } else {
          throw new Error('Formato de arquivo inválido');
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Erro desconhecido';
        setConsoleOutput((prev) => [
          ...prev,
          `error: Erro ao importar: ${errorMessage}`,
        ]);
      }
    };
    reader.readAsText(file);

    // Limpar o input
    e.target.value = '';
  };

  // Copiar código para área de transferência
  const handleCopyCode = () => {
    const fullHTML = `<!DOCTYPE html>
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

    navigator.clipboard
      .writeText(fullHTML)
      .then(() => setConsoleOutput((prev) => [...prev, 'log: Código copiado!']))
      .catch((err) =>
        setConsoleOutput((prev) => [
          ...prev,
          `error: Erro ao copiar: ${err.message}`,
        ]),
      );
  };

  // Limpar console
  const handleClearConsole = () => {
    setConsoleOutput([]);
  };

  // Alterna o tema
  const toggleTheme = () => {
    setTheme(theme === 'dracula' ? 'vs-light' : 'dracula');
  };

  // Carregar código compartilhado da URL
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const sharedDataParam = urlParams.get('share');

      if (sharedDataParam) {
        const params = new URLSearchParams(sharedDataParam);

        const htmlParam = params.get('h');
        const cssParam = params.get('c');
        const jsParam = params.get('j');
        const titleParam = params.get('t');

        if (htmlParam && cssParam && jsParam) {
          try {
            const decodedHtml = decodeURIComponent(atob(htmlParam));
            const decodedCss = decodeURIComponent(atob(cssParam));
            const decodedJs = decodeURIComponent(atob(jsParam));

            setHtmlCode(decodedHtml);
            setCssCode(decodedCss);
            setJsCode(decodedJs);

            if (titleParam) {
              setFileName(titleParam);
            }

            toast.success('Código compartilhado carregado com sucesso!');
            setConsoleOutput((prev) => [
              ...prev,
              'log: Código compartilhado carregado.',
            ]);

            // Limpar a URL para evitar recarregamento acidental
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname,
            );
          } catch (e) {
            console.error('Erro ao decodificar dados compartilhados:', e);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao processar parâmetros de URL:', error);
    }
  }, []);

  return (
    <div
      className={`w-full h-[800px] bg-[#282a36] rounded-lg shadow-lg overflow-hidden ${className}`}
    >
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                >
                  Opções
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#343746] text-[#f8f8f2] border-[#44475a]">
                <DropdownMenuItem
                  className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                  onClick={handleSave}
                >
                  <Save size={14} className="mr-2" /> Salvar Projeto
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                  onClick={handleExportHTML}
                >
                  <Download size={14} className="mr-2" /> Exportar HTML
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                  onClick={handleImport}
                >
                  <Upload size={14} className="mr-2" /> Importar Projeto
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                  onClick={handleCopyCode}
                >
                  <Copy size={14} className="mr-2" /> Copiar Código
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                  onClick={handleReset}
                >
                  <RotateCcw size={14} className="mr-2" /> Restaurar Padrão
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#44475a]" />
                <DropdownMenuItem
                  className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings size={14} className="mr-2" /> Configurações
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search size={14} className="mr-2" /> Buscar e Substituir
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer">
                    <Code2 size={14} className="mr-2" /> Tema do Editor
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="bg-[#343746] text-[#f8f8f2] border-[#44475a]">
                      <DropdownMenuRadioGroup
                        value={theme}
                        onValueChange={(value) =>
                          setTheme(value as EditorTheme)
                        }
                      >
                        <DropdownMenuRadioItem
                          value="dracula"
                          className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                        >
                          Dracula
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="vs-dark"
                          className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                        >
                          Visual Studio Dark
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="vs-light"
                          className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                        >
                          Visual Studio Light
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="github"
                          className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                        >
                          GitHub
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="monokai"
                          className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                        >
                          Monokai
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="nord"
                          className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                        >
                          Nord
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="solarized-dark"
                          className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                        >
                          Solarized Dark
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="solarized-light"
                          className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                        >
                          Solarized Light
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
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
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  Console
                </TooltipContent>
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
                  <TooltipContent
                    side="bottom"
                    className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                  >
                    Executar
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        {/* Diálogo de Busca e Substituição */}
        {isSearchOpen && (
          <div className="absolute top-14 right-4 w-80 bg-[#343746] shadow-lg rounded border border-[#44475a] z-50">
            <div className="flex justify-between items-center p-2 border-b border-[#44475a]">
              <span className="text-[#f8f8f2] text-sm">
                Buscar e Substituir
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={14} className="text-[#f8f8f2]" />
              </Button>
            </div>
            <div className="p-3 space-y-3">
              <div className="space-y-2">
                <Label
                  htmlFor="search-query"
                  className="text-[#f8f8f2] text-xs"
                >
                  Buscar
                </Label>
                <Input
                  id="search-query"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Texto a buscar"
                  className="h-8 bg-[#282a36] text-[#f8f8f2] border-[#44475a] focus:border-[#bd93f9] focus:ring-[#bd93f9]"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="replace-query"
                  className="text-[#f8f8f2] text-xs"
                >
                  Substituir
                </Label>
                <Input
                  id="replace-query"
                  value={replaceQuery}
                  onChange={(e) => setReplaceQuery(e.target.value)}
                  placeholder="Texto para substituição"
                  className="h-8 bg-[#282a36] text-[#f8f8f2] border-[#44475a] focus:border-[#bd93f9] focus:ring-[#bd93f9]"
                />
              </div>
              <div className="flex space-x-2 pt-1">
                <Button
                  size="sm"
                  className="bg-[#bd93f9] hover:bg-[#8be9fd] text-[#282a36] h-7"
                  onClick={() =>
                    searchInActiveEditor(
                      searchQuery,
                      editorRef.current,
                      monacoRef.current,
                    )
                  }
                >
                  Buscar
                </Button>
                <Button
                  size="sm"
                  className="bg-[#ff79c6] hover:bg-[#ff5555] text-[#282a36] h-7"
                  onClick={() =>
                    replaceInActiveEditor(searchQuery, replaceQuery)
                  }
                >
                  Substituir
                </Button>
                <Button
                  size="sm"
                  className="bg-[#50fa7b] hover:bg-[#50fa7b]/80 text-[#282a36] h-7"
                  onClick={() => {
                    const editor = editorRef.current;
                    const monaco = monacoRef.current;
                    if (!editor || !monaco || !searchQuery) return;

                    const model = editor.getModel();
                    const text = model.getValue();
                    const regex = new RegExp(
                      searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
                      'g',
                    );
                    const newText = text.replace(regex, replaceQuery);

                    model.setValue(newText);

                    toast.success(`Todas as ocorrências substituídas`);
                  }}
                >
                  Subst. Tudo
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Diálogo de Configurações */}
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="bg-[#343746] text-[#f8f8f2] border-[#44475a] max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-[#bd93f9]">
                Configurações do Editor
              </DialogTitle>
              <DialogDescription className="text-[#f8f8f2] opacity-70">
                Personalize seu ambiente de desenvolvimento
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4 px-1 py-2">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-[#8be9fd]">
                    Aparência
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="fontSize" className="text-sm">
                        Tamanho da Fonte
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-[#f8f8f2]"
                          onClick={() =>
                            setFontSize(Math.max(10, fontSize - 1))
                          }
                        >
                          <ZoomOut size={14} />
                        </Button>
                        <span className="w-8 text-center">{fontSize}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-[#f8f8f2]"
                          onClick={() => setFontSize(fontSize + 1)}
                        >
                          <ZoomIn size={14} />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wordWrap"
                        checked={editorSettings.wordWrap}
                        onCheckedChange={(checked) =>
                          setEditorSettings({
                            ...editorSettings,
                            wordWrap: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="wordWrap" className="text-sm">
                        Quebra de Linha
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="minimap"
                        checked={editorSettings.minimap}
                        onCheckedChange={(checked) =>
                          setEditorSettings({
                            ...editorSettings,
                            minimap: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="minimap" className="text-sm">
                        Minimap
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="lineNumbers"
                        checked={editorSettings.lineNumbers}
                        onCheckedChange={(checked) =>
                          setEditorSettings({
                            ...editorSettings,
                            lineNumbers: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="lineNumbers" className="text-sm">
                        Números de Linha
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-[#8be9fd]">Editor</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoClosingBrackets"
                        checked={editorSettings.autoClosingBrackets}
                        onCheckedChange={(checked) =>
                          setEditorSettings({
                            ...editorSettings,
                            autoClosingBrackets: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="autoClosingBrackets" className="text-sm">
                        Fechamento Automático de Chaves
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoClosingQuotes"
                        checked={editorSettings.autoClosingQuotes}
                        onCheckedChange={(checked) =>
                          setEditorSettings({
                            ...editorSettings,
                            autoClosingQuotes: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="autoClosingQuotes" className="text-sm">
                        Fechamento Automático de Aspas
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="formatOnPaste"
                        checked={editorSettings.formatOnPaste}
                        onCheckedChange={(checked) =>
                          setEditorSettings({
                            ...editorSettings,
                            formatOnPaste: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="formatOnPaste" className="text-sm">
                        Formatar ao Colar
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="formatOnType"
                        checked={editorSettings.formatOnType}
                        onCheckedChange={(checked) =>
                          setEditorSettings({
                            ...editorSettings,
                            formatOnType: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="formatOnType" className="text-sm">
                        Formatar ao Digitar
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="lintingEnabled"
                        checked={editorSettings.lintingEnabled}
                        onCheckedChange={(checked) =>
                          setEditorSettings({
                            ...editorSettings,
                            lintingEnabled: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="lintingEnabled" className="text-sm">
                        Habilitar Linting
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-[#8be9fd]">
                    Comportamento
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoRefresh"
                        checked={autoRefresh}
                        onCheckedChange={(checked) => setAutoRefresh(!!checked)}
                      />
                      <Label htmlFor="autoRefresh" className="text-sm">
                        Atualização Automática da Visualização
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isAutoSaveEnabled"
                        checked={isAutoSaveEnabled}
                        onCheckedChange={(checked) =>
                          setIsAutoSaveEnabled(!!checked)
                        }
                      />
                      <Label htmlFor="isAutoSaveEnabled" className="text-sm">
                        Salvar Histórico Automaticamente
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor="tabSize" className="text-sm mr-2">
                        Tamanho da Tabulação:
                      </Label>
                      <Select
                        value={editorSettings.tabSize.toString()}
                        onValueChange={(value) =>
                          setEditorSettings({
                            ...editorSettings,
                            tabSize: parseInt(value),
                          })
                        }
                      >
                        <SelectTrigger className="w-20 h-8 bg-[#282a36] border-[#44475a]">
                          <SelectValue placeholder="2" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#343746] text-[#f8f8f2] border-[#44475a]">
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="border-t border-[#44475a] pt-4">
              <Button
                className="bg-[#ff5555] hover:bg-[#ff5555]/80 text-white"
                onClick={() => setIsSettingsOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                className="bg-[#bd93f9] hover:bg-[#bd93f9]/80 text-[#282a36]"
                onClick={() => {
                  // Aplicar configurações ao editor
                  if (editorRef.current) {
                    const editor = editorRef.current;
                    editor.updateOptions({
                      wordWrap: editorSettings.wordWrap ? 'on' : 'off',
                      minimap: { enabled: editorSettings.minimap },
                      lineNumbers: editorSettings.lineNumbers ? 'on' : 'off',
                      tabSize: editorSettings.tabSize,
                      autoClosingBrackets: editorSettings.autoClosingBrackets
                        ? 'always'
                        : 'never',
                      autoClosingQuotes: editorSettings.autoClosingQuotes
                        ? 'always'
                        : 'never',
                      formatOnPaste: editorSettings.formatOnPaste,
                      formatOnType: editorSettings.formatOnType,
                    });

                    toast.success('Configurações aplicadas com sucesso!');
                  }
                  setIsSettingsOpen(false);
                }}
              >
                Aplicar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Conteúdo principal */}
        <div className="flex-1 overflow-hidden">
          {/* Barra de ferramentas */}
          <div className="flex items-center space-x-1 px-2 py-1 bg-[#282a36] border-b border-[#44475a]">
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
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  Executar (Ctrl+P)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                    onClick={formatCode}
                  >
                    <AlignCenter size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  Formatar Código (Ctrl+Shift+F)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  Buscar (Ctrl+F)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                    onClick={handleSave}
                  >
                    <Save size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  Salvar (Ctrl+S)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator
              orientation="vertical"
              className="h-5 bg-[#44475a] mx-1"
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                    onClick={() => {
                      if (currentVersion > 0) {
                        restoreVersion(currentVersion - 1);
                      }
                    }}
                    disabled={currentVersion <= 0}
                  >
                    <Undo size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  Desfazer Versão
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                    onClick={() => {
                      if (currentVersion < codeHistory.length - 1) {
                        restoreVersion(currentVersion + 1);
                      }
                    }}
                    disabled={currentVersion >= codeHistory.length - 1}
                  >
                    <Redo size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  Refazer Versão
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Dialog>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                      >
                        <History size={14} />
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                  >
                    Histórico de Alterações
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DialogContent className="bg-[#343746] text-[#f8f8f2] border-[#44475a]">
                <DialogHeader>
                  <DialogTitle className="text-[#bd93f9]">
                    Histórico de Alterações
                  </DialogTitle>
                  <DialogDescription className="text-[#f8f8f2] opacity-70">
                    Restaure versões anteriores do seu código
                  </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[400px] w-full pr-3">
                  <div className="space-y-2">
                    {codeHistory.map((version, index) => (
                      <div
                        key={version.id}
                        className={`p-3 rounded border ${
                          index === currentVersion
                            ? 'border-[#bd93f9] bg-[#44475a]'
                            : 'border-[#44475a] hover:bg-[#282a36]'
                        } cursor-pointer transition-colors`}
                        onClick={() => restoreVersion(index)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {version.description}
                            {index === currentVersion && (
                              <span className="ml-2 text-xs bg-[#bd93f9] text-[#282a36] px-2 py-0.5 rounded-full">
                                Atual
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-[#6272a4]">
                            {new Date(version.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}

                    {codeHistory.length === 0 && (
                      <div className="text-center py-6 text-[#6272a4]">
                        Nenhum histórico disponível
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <DialogFooter className="border-t border-[#44475a] pt-4">
                  <Button
                    className="bg-[#bd93f9] hover:bg-[#bd93f9]/80 text-[#282a36]"
                    onClick={() => {
                      const description = prompt('Descreva esta versão:');
                      if (description) {
                        saveToHistory(description);
                        toast.success('Versão salva no histórico!');
                      }
                    }}
                  >
                    Salvar Versão Atual
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Separator
              orientation="vertical"
              className="h-5 bg-[#44475a] mx-1"
            />

            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                      >
                        <Settings size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                  >
                    Configurações
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenuContent className="bg-[#343746] text-[#f8f8f2] border-[#44475a]">
                <DropdownMenuItem
                  className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  <Settings size={14} className="mr-2" /> Configurações
                  Completas
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#44475a]" />
                <DropdownMenuCheckboxItem
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                  className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                >
                  Atualização Automática
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={editorSettings.minimap}
                  onCheckedChange={(checked) =>
                    setEditorSettings({ ...editorSettings, minimap: !!checked })
                  }
                  className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                >
                  Mostrar Minimap
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showConsole}
                  onCheckedChange={setShowConsole}
                  className="hover:bg-[#44475a] focus:bg-[#44475a] cursor-pointer"
                >
                  Mostrar Console
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                    onClick={() => {
                      if (viewMode === 'split') {
                        setViewMode('editor');
                      } else if (viewMode === 'editor') {
                        setViewMode('preview');
                      } else {
                        setViewMode('split');
                      }
                    }}
                  >
                    {viewMode === 'split' ? (
                      <Layers size={14} />
                    ) : viewMode === 'editor' ? (
                      <PanelLeft size={14} />
                    ) : (
                      <PanelRight size={14} />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  Alternar Visualização
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                    onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                  >
                    {isPreviewVisible ? (
                      <Eye size={14} />
                    ) : (
                      <EyeOff size={14} />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  {isPreviewVisible
                    ? 'Ocultar Visualização'
                    : 'Mostrar Visualização'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                    onClick={() => {
                      saveToHistory('Snapshot Manual');
                      toast.success('Versão salva no histórico!');
                    }}
                  >
                    <Clock size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  Salvar Snapshot
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

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
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  {showConsole ? 'Ocultar Console' : 'Mostrar Console'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                    onClick={() => {
                      const snippetName = prompt('Nome do snippet:');
                      if (!snippetName) return;

                      let code = '';
                      if (activeTab === 'html') code = htmlCode;
                      else if (activeTab === 'css') code = cssCode;
                      else if (activeTab === 'javascript') code = jsCode;

                      const newSnippet: CodeSnippet = {
                        id: Date.now().toString(),
                        name: snippetName,
                        language: activeTab,
                        code: code,
                      };

                      setCustomSnippets((prev) => [...prev, newSnippet]);
                      toast.success(`Snippet "${snippetName}" salvo!`);
                    }}
                  >
                    <FileText size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  Salvar Snippet
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator
              orientation="vertical"
              className="h-5 bg-[#44475a] mx-1"
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                    onClick={() => setIsSnippetsDialogOpen(true)}
                  >
                    <Book size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  Gerenciar Snippets
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                    onClick={() => {
                      // Compartilhar código via URL
                      try {
                        const projectData = {
                          h: btoa(encodeURIComponent(htmlCode)),
                          c: btoa(encodeURIComponent(cssCode)),
                          j: btoa(encodeURIComponent(jsCode)),
                          t: fileName,
                        };

                        const queryString = new URLSearchParams(
                          projectData,
                        ).toString();
                        const shareUrl = `${window.location.origin}${window.location.pathname}?share=${queryString}`;

                        navigator.clipboard.writeText(shareUrl);
                        toast.success(
                          'Link de compartilhamento copiado para a área de transferência!',
                        );
                      } catch (error) {
                        toast.error('Erro ao gerar link de compartilhamento');
                        console.error(error);
                      }
                    }}
                  >
                    <Share2 size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                >
                  Compartilhar Código
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <ResizablePanelGroup direction="horizontal">
            {/* Painel de código */}
            <ResizablePanel
              defaultSize={50}
              minSize={viewMode === 'preview' ? 0 : 20}
              maxSize={viewMode === 'preview' ? 0 : 100}
              className={viewMode === 'preview' ? 'hidden' : ''}
            >
              <Card className="h-full border-0 rounded-none bg-[#282a36]">
                <CardContent className="p-0 h-full">
                  <Tabs
                    defaultValue="html"
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value as Language)}
                    className="h-full"
                  >
                    <TabsList className="bg-[#343746] border-b border-[#44475a] h-9 rounded-none px-2 w-full justify-start">
                      <TabsTrigger
                        value="html"
                        className="data-[state=active]:bg-[#282a36] h-8 rounded-sm text-[#f8f8f2]"
                      >
                        HTML
                      </TabsTrigger>
                      <TabsTrigger
                        value="css"
                        className="data-[state=active]:bg-[#282a36] h-8 rounded-sm text-[#f8f8f2]"
                      >
                        CSS
                      </TabsTrigger>
                      <TabsTrigger
                        value="js"
                        className="data-[state=active]:bg-[#282a36] h-8 rounded-sm text-[#f8f8f2]"
                      >
                        JS
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent
                      value="html"
                      className="flex-1 overflow-hidden mt-0 p-0 h-[calc(100%-36px)]"
                    >
                      <Editor
                        height="100%"
                        defaultLanguage="html"
                        theme={theme}
                        value={htmlCode}
                        onChange={(value) => setHtmlCode(value || '')}
                        options={{
                          fontSize,
                          minimap: { enabled: editorSettings.minimap },
                          scrollBeyondLastLine: false,
                          wordWrap: editorSettings.wordWrap ? 'on' : 'off',
                          automaticLayout: true,
                          fontFamily: 'Fira Code',
                          fontLigatures: true,
                          lineNumbers: editorSettings.lineNumbers
                            ? 'on'
                            : 'off',
                          tabSize: editorSettings.tabSize,
                          formatOnPaste: editorSettings.formatOnPaste,
                          formatOnType: editorSettings.formatOnType,
                          autoClosingBrackets:
                            editorSettings.autoClosingBrackets
                              ? 'always'
                              : 'never',
                          autoClosingQuotes: editorSettings.autoClosingQuotes
                            ? 'always'
                            : 'never',
                          folding: editorSettings.folding,
                          bracketPairColorization: { enabled: true },
                          guides: { bracketPairs: editorSettings.bracketPairs },
                          renderWhitespace: 'none',
                          quickSuggestions: editorSettings.quickSuggestions,
                          suggestOnTriggerCharacters:
                            editorSettings.suggestOnTriggerCharacters,
                        }}
                        beforeMount={handleEditorBeforeMount}
                        onMount={handleEditorMount}
                      />
                    </TabsContent>

                    <TabsContent
                      value="css"
                      className="flex-1 overflow-hidden mt-0 p-0 h-[calc(100%-36px)]"
                    >
                      <Editor
                        height="100%"
                        defaultLanguage="css"
                        theme={theme}
                        value={cssCode}
                        onChange={(value) => setCssCode(value || '')}
                        options={{
                          fontSize,
                          minimap: { enabled: editorSettings.minimap },
                          scrollBeyondLastLine: false,
                          wordWrap: editorSettings.wordWrap ? 'on' : 'off',
                          automaticLayout: true,
                          fontFamily: 'Fira Code',
                          fontLigatures: true,
                          lineNumbers: editorSettings.lineNumbers
                            ? 'on'
                            : 'off',
                          tabSize: editorSettings.tabSize,
                          formatOnPaste: editorSettings.formatOnPaste,
                          formatOnType: editorSettings.formatOnType,
                          autoClosingBrackets:
                            editorSettings.autoClosingBrackets
                              ? 'always'
                              : 'never',
                          autoClosingQuotes: editorSettings.autoClosingQuotes
                            ? 'always'
                            : 'never',
                          folding: editorSettings.folding,
                          bracketPairColorization: { enabled: true },
                          guides: { bracketPairs: editorSettings.bracketPairs },
                          renderWhitespace: 'none',
                          quickSuggestions: editorSettings.quickSuggestions,
                          suggestOnTriggerCharacters:
                            editorSettings.suggestOnTriggerCharacters,
                        }}
                      />
                    </TabsContent>

                    <TabsContent
                      value="js"
                      className="flex-1 overflow-hidden mt-0 p-0 h-[calc(100%-36px)]"
                    >
                      <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        theme={theme}
                        value={jsCode}
                        onChange={(value) => setJsCode(value || '')}
                        options={{
                          fontSize,
                          minimap: { enabled: editorSettings.minimap },
                          scrollBeyondLastLine: false,
                          wordWrap: editorSettings.wordWrap ? 'on' : 'off',
                          automaticLayout: true,
                          fontFamily: 'Fira Code',
                          fontLigatures: true,
                          lineNumbers: editorSettings.lineNumbers
                            ? 'on'
                            : 'off',
                          tabSize: editorSettings.tabSize,
                          formatOnPaste: editorSettings.formatOnPaste,
                          formatOnType: editorSettings.formatOnType,
                          autoClosingBrackets:
                            editorSettings.autoClosingBrackets
                              ? 'always'
                              : 'never',
                          autoClosingQuotes: editorSettings.autoClosingQuotes
                            ? 'always'
                            : 'never',
                          folding: editorSettings.folding,
                          bracketPairColorization: { enabled: true },
                          guides: { bracketPairs: editorSettings.bracketPairs },
                          renderWhitespace: 'none',
                          quickSuggestions: editorSettings.quickSuggestions,
                          suggestOnTriggerCharacters:
                            editorSettings.suggestOnTriggerCharacters,
                        }}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </ResizablePanel>

            {viewMode !== 'editor' && viewMode !== 'preview' && (
              <ResizableHandle
                withHandle
                className="bg-[#343746] hover:bg-[#bd93f9]"
              />
            )}

            {/* Painel de visualização */}
            <ResizablePanel
              defaultSize={50}
              minSize={viewMode === 'editor' ? 0 : 20}
              maxSize={viewMode === 'editor' ? 0 : 100}
              className={viewMode === 'editor' ? 'hidden' : ''}
            >
              <Card className="h-full border-0 rounded-none bg-[#282a36]">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="p-2 border-b border-[#343746] bg-[#343746] flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Play size={14} className="text-[#bd93f9]" />
                      <span className="text-[#f8f8f2] text-sm">
                        Visualização
                      </span>
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
                        <TooltipContent
                          side="bottom"
                          className="bg-[#343746] text-[#f8f8f2] border-[#44475a]"
                        >
                          Abrir em Nova Aba
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div
                    className={`flex flex-col ${showConsole ? 'h-[calc(100%-33px)]' : 'h-[calc(100%-33px)]'}`}
                  >
                    <div
                      className={`bg-[#282a36] ${showConsole ? 'h-[70%]' : 'h-full'}`}
                    >
                      {isPreviewVisible && (
                        <iframe
                          title="Visualização do Projeto"
                          srcDoc={preview}
                          className="w-full h-full border-0"
                          sandbox="allow-scripts"
                        />
                      )}
                      {!isPreviewVisible && (
                        <div className="w-full h-full flex items-center justify-center text-[#6272a4]">
                          <div className="text-center">
                            <EyeOff size={48} className="mx-auto mb-3" />
                            <p>Visualização oculta</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 text-[#bd93f9] hover:text-[#ff79c6]"
                              onClick={() => setIsPreviewVisible(true)}
                            >
                              Mostrar
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Console */}
                    {showConsole && (
                      <div className="h-[30%] bg-[#282a36] border-t border-[#343746] overflow-auto">
                        <div className="flex justify-between items-center p-2 bg-[#343746] text-[#f8f8f2] text-xs">
                          <span>Console</span>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleClearConsole}
                              className="h-6 text-xs text-[#f8f8f2] hover:text-white hover:bg-[#44475a] px-2"
                            >
                              <Trash2 size={12} className="mr-1" />
                              Limpar
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                              onClick={() => setShowConsole(false)}
                            >
                              <X size={12} />
                            </Button>
                          </div>
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
                                <div
                                  key={index}
                                  className={`${textColor} py-1 border-b border-[#343746]`}
                                >
                                  &gt; {output}
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-[#6272a4] py-1">
                              Console vazio. Use console.log() para ver
                              mensagens aqui.
                            </div>
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
            <span>
              {autoRefresh ? 'Atualização: Auto' : 'Atualização: Manual'}
            </span>
            <span>{activeTab.toUpperCase()}</span>
          </div>
        </div>
      </motion.div>

      {/* Pop-up de ajuda */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-10 right-4 h-10 w-10 rounded-full bg-[#bd93f9] text-[#282a36] hover:bg-[#8be9fd] shadow-lg"
          >
            <HelpCircle size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#343746] text-[#f8f8f2] border-[#44475a]">
          <DialogHeader>
            <DialogTitle className="text-[#bd93f9]">
              Ajuda do Editor
            </DialogTitle>
            <DialogDescription className="text-[#f8f8f2] opacity-70">
              Dicas e atalhos para usar o editor
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[400px] pr-3">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-[#8be9fd] mb-2">
                  Atalhos de Teclado
                </h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span>Salvar Projeto</span>
                    <span className="text-[#6272a4]">Ctrl+S</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Buscar no Código</span>
                    <span className="text-[#6272a4]">Ctrl+F</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Formatar Código</span>
                    <span className="text-[#6272a4]">Ctrl+Shift+F</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Executar/Atualizar</span>
                    <span className="text-[#6272a4]">Ctrl+P</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Resetar Código</span>
                    <span className="text-[#6272a4]">Ctrl+R</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Alternar para HTML</span>
                    <span className="text-[#6272a4]">Ctrl+1</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Alternar para CSS</span>
                    <span className="text-[#6272a4]">Ctrl+2</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Alternar para JS</span>
                    <span className="text-[#6272a4]">Ctrl+3</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Alternar Console</span>
                    <span className="text-[#6272a4]">Ctrl+Shift+B</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Limpar Console</span>
                    <span className="text-[#6272a4]">Ctrl+Shift+C</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#8be9fd] mb-2">
                  Recursos Disponíveis
                </h3>
                <ul className="space-y-1 text-sm list-disc pl-5">
                  <li>Edição em tempo real de HTML, CSS e JavaScript</li>
                  <li>Console integrado para depuração</li>
                  <li>Formatação automática de código</li>
                  <li>Autocompletamento inteligente</li>
                  <li>Vários temas de editor</li>
                  <li>Histórico de alterações</li>
                  <li>Validação e linting de código</li>
                  <li>Salvar e carregar projetos</li>
                  <li>Exportar como HTML</li>
                  <li>Customização completa da interface</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#8be9fd] mb-2">
                  Dicas
                </h3>
                <ul className="space-y-1 text-sm list-disc pl-5">
                  <li>Experimente diferentes temas no menu Opções</li>
                  <li>
                    Use a Formatação de Código para melhorar a legibilidade
                  </li>
                  <li>Salve versões importantes no Histórico</li>
                  <li>Ajuste o tamanho da fonte nas Configurações</li>
                  <li>Crie snippets para código que você usa frequentemente</li>
                  <li>Use o console para depurar sua aplicação</li>
                </ul>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Snippets */}
      <Dialog
        open={isSnippetsDialogOpen}
        onOpenChange={setIsSnippetsDialogOpen}
      >
        <DialogContent className="bg-[#343746] text-[#f8f8f2] border-[#44475a] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#bd93f9]">
              Gerenciador de Snippets
            </DialogTitle>
            <DialogDescription className="text-[#f8f8f2] opacity-70">
              Crie, visualize e gerencie seus snippets de código
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="my-snippets" className="mt-2">
            <TabsList className="bg-[#282a36] w-full">
              <TabsTrigger
                value="my-snippets"
                className="data-[state=active]:bg-[#44475a]"
              >
                Meus Snippets
              </TabsTrigger>
              <TabsTrigger
                value="create-snippet"
                className="data-[state=active]:bg-[#44475a]"
              >
                Criar Novo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-snippets" className="mt-2">
              <ScrollArea className="h-[300px] pr-3">
                {customSnippets.length > 0 ? (
                  <div className="space-y-3">
                    {customSnippets.map((snippet) => (
                      <div
                        key={snippet.id}
                        className="p-3 rounded border border-[#44475a] bg-[#282a36]"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h4 className="font-medium text-[#8be9fd]">
                              {snippet.name}
                            </h4>
                            <span className="text-xs text-[#6272a4]">
                              {snippet.language === 'js'
                                ? 'JavaScript'
                                : snippet.language === 'css'
                                  ? 'CSS'
                                  : 'HTML'}
                            </span>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                              onClick={() => {
                                // Inserir snippet no editor atual
                                if (editorRef.current && monacoRef.current) {
                                  const editor = editorRef.current;
                                  const position = editor.getPosition();

                                  if (snippet.language === activeTab) {
                                    editor.executeEdits('insert-snippet', [
                                      {
                                        range: new monacoRef.current.Range(
                                          position.lineNumber,
                                          position.column,
                                          position.lineNumber,
                                          position.column,
                                        ),
                                        text: snippet.code,
                                      },
                                    ]);
                                    setIsSnippetsDialogOpen(false);
                                    toast.success(
                                      `Snippet "${snippet.name}" inserido`,
                                    );
                                  } else {
                                    toast.error(
                                      `Snippet é para ${snippet.language}, você está em ${activeTab}`,
                                    );
                                  }
                                }
                              }}
                            >
                              <FileText size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-[#f8f8f2] hover:text-white hover:bg-[#44475a]"
                              onClick={() => {
                                navigator.clipboard.writeText(snippet.code);
                                toast.success(
                                  `Snippet "${snippet.name}" copiado`,
                                );
                              }}
                            >
                              <Copy size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-[#ff5555] hover:text-white hover:bg-[#44475a]"
                              onClick={() => {
                                if (
                                  confirm(
                                    `Excluir o snippet "${snippet.name}"?`,
                                  )
                                ) {
                                  setCustomSnippets(
                                    customSnippets.filter(
                                      (s) => s.id !== snippet.id,
                                    ),
                                  );
                                  toast.success(
                                    `Snippet "${snippet.name}" excluído`,
                                  );
                                }
                              }}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 relative">
                          <pre className="p-2 text-xs bg-[#21222c] rounded overflow-x-auto whitespace-pre-wrap break-all">
                            {snippet.code.length > 100
                              ? snippet.code.substring(0, 100) + '...'
                              : snippet.code}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#6272a4]">
                    <FileText size={32} className="mx-auto mb-2" />
                    <p>Você ainda não tem snippets salvos</p>
                    <p className="text-sm mt-1">
                      Crie seu primeiro snippet na aba "Criar Novo"
                    </p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="create-snippet" className="mt-2 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="snippet-name" className="text-sm">
                  Nome do Snippet
                </Label>
                <Input
                  id="snippet-name"
                  placeholder="Digite um nome descritivo"
                  className="h-9 bg-[#282a36] text-[#f8f8f2] border-[#44475a] focus:border-[#bd93f9] focus:ring-[#bd93f9]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="snippet-language" className="text-sm">
                  Linguagem
                </Label>
                <Select defaultValue={activeTab}>
                  <SelectTrigger className="bg-[#282a36] border-[#44475a] focus:border-[#bd93f9] focus:ring-[#bd93f9]">
                    <SelectValue placeholder="Selecione uma linguagem" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#343746] text-[#f8f8f2] border-[#44475a]">
                    <SelectItem
                      value="html"
                      className="hover:bg-[#44475a] cursor-pointer"
                    >
                      HTML
                    </SelectItem>
                    <SelectItem
                      value="css"
                      className="hover:bg-[#44475a] cursor-pointer"
                    >
                      CSS
                    </SelectItem>
                    <SelectItem
                      value="js"
                      className="hover:bg-[#44475a] cursor-pointer"
                    >
                      JavaScript
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="snippet-code" className="text-sm">
                  Código
                </Label>
                <div className="border border-[#44475a] rounded overflow-hidden">
                  <Editor
                    height="200px"
                    defaultLanguage={activeTab}
                    theme={theme}
                    defaultValue=""
                    options={{
                      fontSize,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                      lineNumbers: 'on',
                      folding: true,
                    }}
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsSnippetsDialogOpen(false)}
                  className="border-[#44475a] text-[#f8f8f2] hover:bg-[#44475a]"
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-[#bd93f9] hover:bg-[#bd93f9]/80 text-[#282a36]"
                  onClick={() => {
                    const nameInput = document.getElementById(
                      'snippet-name',
                    ) as HTMLInputElement;
                    const languageSelect = document.querySelector(
                      '[data-value]',
                    ) as HTMLElement;
                    const snippetEditor = (
                      document.querySelectorAll('.monaco-editor')[3] as any
                    ).__editors[0];

                    if (!nameInput.value) {
                      toast.error('Digite um nome para o snippet');
                      return;
                    }

                    const newSnippet: CodeSnippet = {
                      id: Date.now().toString(),
                      name: nameInput.value,
                      language: (languageSelect?.dataset.value ||
                        activeTab) as string,
                      code: snippetEditor.getValue() || '',
                    };

                    setCustomSnippets((prev) => [...prev, newSnippet]);
                    toast.success(`Snippet "${newSnippet.name}" criado!`);
                    setIsSnippetsDialogOpen(false);
                  }}
                >
                  Salvar Snippet
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CodeEditor;
