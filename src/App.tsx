import { Suspense, lazy, useEffect, useState } from 'react';
import { useRoutes, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home';
import routes from 'tempo-routes';
import CustomCursor from './components/CustomCursor';
import AnimatedLayout from './components/AnimatedLayout';
import HiddenAdminButton from './components/HiddenAdminButton';
import AnimationDemoButton from './components/AnimationDemoButton';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import SmoothScroll from './components/SmoothScroll';
import NewsletterPopup from './components/NewsletterPopup';
import PixDonationPopup from './components/PixDonationPopup';
import WhatsAppButton from './components/WhatsAppButton';
import MusicPlayer from './components/MusicPlayer';
import { ThemeProvider } from './contexts/ThemeContext';
import AppToaster from './components/ui/toaster';

// Transition variants
type TransitionVariant =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'flip'
  | 'reveal'
  | 'morph'
  | 'stagger'
  | 'wave'
  | 'portal'
  | 'glitch';

// Lazy load admin components
const LoginForm = lazy(() =>
  import('./components/admin/Auth').then((module) => ({
    default: module.LoginForm,
  })),
);
const Dashboard = lazy(() =>
  import('./components/admin/Dashboard').then((module) => ({
    default: module.Dashboard,
  })),
);

// Lazy load the landing page builder
const LandingPageBuilder = lazy(() => import('./pages/LandingPageBuilder'));

// Lazy load blog pages
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AnimationDemo = lazy(() => import('./pages/AnimationDemo'));
const VideoPage = lazy(() => import('./pages/VideoPage'));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage'));
const MiniGame = lazy(() => import('./pages/MiniGame'));
const SuperMinigame = lazy(() => import('./pages/SuperMinigame'));

// Import our custom ProtectedRoute instead of the simplified version
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'));

function AppRoutes() {
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === 'true' ? useRoutes(routes) : null;

  // Get the user's preferred transition
  const [transitionType, setTransitionType] = useState<'simple' | 'advanced'>(
    'advanced',
  );
  const [transitionVariant, setTransitionVariant] =
    useState<TransitionVariant>('morph');

  useEffect(() => {
    // Load the user's preferred transition from localStorage
    const storedType = localStorage.getItem('preferredTransitionType') as
      | 'simple'
      | 'advanced'
      | null;
    const storedVariant = localStorage.getItem('preferredTransitionVariant');

    // Valid transition variants
    const validVariants: TransitionVariant[] = [
      'fade',
      'slide',
      'scale',
      'flip',
      'reveal',
      'morph',
      'stagger',
      'wave',
      'portal',
      'glitch',
    ];

    if (storedType) {
      setTransitionType(storedType);
    }

    if (
      storedVariant &&
      validVariants.includes(storedVariant as TransitionVariant)
    ) {
      setTransitionVariant(storedVariant as TransitionVariant);
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <AnimatedLayout
        pageTransitionType={transitionType}
        transitionVariant={transitionVariant}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/landing-page-builder"
            element={<LandingPageBuilder />}
          />
          {/* Animation Demo Page */}
          <Route path="/animation-demo" element={<AnimationDemo />} />

          {/* Mini Game Page */}
          <Route path="/minigame" element={<MiniGame />} />

          {/* Video Player Page */}
          <Route path="/video-player" element={<VideoPage />} />

          {/* Blog Routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/blog/categoria/:slug" element={<CategoryPage />} />
          <Route path="/blog/sobre" element={<AboutPage />} />
          <Route path="/blog/projetos" element={<ProjectsPage />} />
          <Route path="/blog/contato" element={<ContactPage />} />

          {/* Newsletter Page */}
          <Route path="/newsletter" element={<NewsletterPage />} />

          {/* Super Minigame Page */}
          <Route path="/super-minigame" element={<SuperMinigame />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/login" replace />}
          />
          <Route path="/admin/login" element={<LoginForm />} />
          <Route
            path="/admin/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {tempoRoutes}
      </AnimatedLayout>
      <NewsletterPopup />
      <PixDonationPopup />
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    function setVh() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }
    window.addEventListener('resize', setVh);
    setVh();
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <SmoothScroll>
          <AppRoutes />
          <CustomCursor />
          <HiddenAdminButton />
          <WhatsAppButton />
          <MusicPlayer />
          <AppToaster />
        </SmoothScroll>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}

export default App;
