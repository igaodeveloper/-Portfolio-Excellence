import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/variables.css';
import './styles/globals.css';
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

// Elemento de fallback moderno durante o carregamento
const LoadingFallback = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background via-modern-dark to-modern-darker animate-fade-in z-50">
    <img
      src="/assets/Imagem do WhatsApp de 2025-05-27 à(s) 01.24.39_1530d1ec.png"
      alt="Logo"
      className="w-20 h-20 mb-6 rounded-full shadow-lg"
      style={{ filter: 'drop-shadow(0 0 16px #3498db)' }}
      loading="eager"
      width={80}
      height={80}
    />
    <span className="text-2xl font-extrabold text-primary drop-shadow-lg tracking-tight mb-2">
      Carregando portfólio...
    </span>
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
    <span className="text-xs text-muted-foreground opacity-80">by igaodevs_404</span>
  </div>
);

// Adiciona um recurso de pré-carregamento de recursos críticos
// O preload de fontes locais foi removido pois a fonte principal já é carregada via Google Fonts em index.html
const preloadAssets = () => {
  // Se quiser pré-carregar outras imagens críticas, adicione aqui
  // Exemplo:
  // const img = new window.Image();
  // img.src = '/assets/hero-bg.jpg';
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

// Script para corrigir 100vh em mobile
function setVhVar() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhVar();
window.addEventListener('resize', setVhVar);

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

if (import.meta.env.PROD) {
  import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
    getFCP(console.log);
    getTTFB(console.log);
  });
}

// INSTRUÇÃO: Para máxima performance, converta a imagem 'public/perfil.jpg' para os formatos WebP e AVIF.
// Salve como 'public/perfil.webp' e 'public/perfil.avif'.
// Você pode usar um conversor online ou o comando:
// cwebp perfil.jpg -o perfil.webp
// avifenc perfil.jpg perfil.avif
