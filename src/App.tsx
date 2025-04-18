import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import HiddenAdminButton from "./components/HiddenAdminButton";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";

// Lazy load admin components
const LoginForm = lazy(() =>
  import("./components/admin/Auth").then((module) => ({
    default: module.LoginForm,
  })),
);
const Dashboard = lazy(() =>
  import("./components/admin/Dashboard").then((module) => ({
    default: module.Dashboard,
  })),
);

// Lazy load the landing page builder
const LandingPageBuilder = lazy(() => import("./pages/LandingPageBuilder"));

// Lazy load blog pages
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

// Import our custom ProtectedRoute instead of the simplified version
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));

function AppRoutes() {
  const tempoRoutes = import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing-page-builder" element={<LandingPageBuilder />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/blog/categoria/:slug" element={<CategoryPage />} />
          <Route path="/blog/sobre" element={<AboutPage />} />
          <Route path="/blog/projetos" element={<ProjectsPage />} />
          <Route path="/blog/contato" element={<ContactPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
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
      </>
    </Suspense>
  );
}

function App() {
  return (
    <AccessibilityProvider>
      <SmoothScroll>
        <AppRoutes />
        <CustomCursor />
        <HiddenAdminButton />
      </SmoothScroll>
    </AccessibilityProvider>
  );
}

export default App;
