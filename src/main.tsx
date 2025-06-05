import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Lazy load App para melhorar o carregamento inicial
const App = lazy(() => import('./App.tsx'));

// Lazy load das ferramentas de desenvolvimento apenas em ambiente de desenvolvimento
const loadDevTools = async () => {
  if (import.meta.env.DEV) {
    const { TempoDevtools } = await import('tempo-devtools');
    TempoDevtools.init();
  }
};

// Carrega as ferramentas de desenvolvimento sem bloquear a renderização
loadDevTools();

const basename = import.meta.env.BASE_URL;

// Elemento de fallback simples durante o carregamento
const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background">
    <div className="w-16 h-16 border-t-4 border-modern-accent rounded-full animate-spin"></div>
  </div>
);

// Adiciona um recurso de pré-carregamento de recursos críticos
// Pode ser expandido com mais recursos críticos conforme necessário
const preloadAssets = () => {
  // Pré-carregar fontes críticas
  if ('requestIdleCallback' in window) {
    // Usar requestIdleCallback se disponível para não bloquear a renderização
    window.requestIdleCallback(() => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'font';
      preloadLink.href = '/fonts/main-font.woff2'; // Substitua pelo caminho real da sua fonte
      preloadLink.type = 'font/woff2';
      preloadLink.crossOrigin = 'anonymous';
      document.head.appendChild(preloadLink);
    });
  } else {
    // Fallback para setTimeout se requestIdleCallback não estiver disponível
    setTimeout(() => {
      // Mesmo código de pré-carregamento
    }, 100);
  }
};

// Inicia pré-carregamento de recursos
preloadAssets();

// ErrorBoundary global
class GlobalErrorBoundary extends React.Component<React.PropsWithChildren<{}>, { hasError: boolean; error?: Error }> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: any) {
    // Aqui você pode logar o erro em um serviço externo
    // Exemplo: Sentry, LogRocket, etc.
    // console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background text-center p-8">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Ocorreu um erro inesperado</h1>
          <p className="mb-2 text-gray-500">Tente recarregar a página ou entre em contato com o suporte.</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => window.location.reload()}>Recarregar</button>
          <details className="mt-4 text-left max-w-xl mx-auto text-xs text-gray-400 whitespace-pre-wrap">
            {this.state.error?.toString()}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

// Função para renderização com atraso de hidratação
const hydrateWithDelay = () => {
  const root = ReactDOM.createRoot(document.getElementById('root')!);

  // Registrar métricas de performance
  if ('performance' in window && 'mark' in performance) {
    performance.mark('react-hydration-start');
  }

  root.render(
    <React.StrictMode>
      <GlobalErrorBoundary>
        <BrowserRouter basename={basename}>
          <Suspense fallback={<LoadingFallback />}>
            <App />
          </Suspense>
        </BrowserRouter>
      </GlobalErrorBoundary>
    </React.StrictMode>,
  );

  // Registrar métricas de performance após renderização
  if ('performance' in window && 'mark' in performance) {
    requestAnimationFrame(() => {
      performance.mark('react-hydration-end');
      performance.measure(
        'react-hydration',
        'react-hydration-start',
        'react-hydration-end',
      );
    });
  }
};

// Usar isomorphic-fetch para polyfill fetch em navegadores mais antigos
if (!('fetch' in window)) {
  // Carregar polyfill via CDN
  const script = document.createElement('script');
  script.src =
    'https://cdn.jsdelivr.net/npm/isomorphic-fetch@3.0.0/fetch-npm-browserify.js';
  script.async = true;
  document.head.appendChild(script);
  script.onload = hydrateWithDelay;
} else {
  // Se fetch já estiver disponível, renderizar normalmente
  hydrateWithDelay();
}
