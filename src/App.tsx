import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import CustomCursor from "./components/CustomCursor";

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

// Simplified protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Always allow access in this simplified version
  return <>{children}</>;
};

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
          <Route path="/admin" element={<LoginForm />} />
          <Route
            path="/admin/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

function App() {
  return (
    <>
      <AppRoutes />
      <CustomCursor />
    </>
  );
}

export default App;
