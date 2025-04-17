import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import HiddenAdminButton from "./components/HiddenAdminButton";

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

// Import our custom ProtectedRoute instead of the simplified version
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));

function AppRoutes() {
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
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

function App() {
  return (
    <SmoothScroll>
      <AppRoutes />
      <CustomCursor />
      <HiddenAdminButton />
    </SmoothScroll>
  );
}

export default App;
