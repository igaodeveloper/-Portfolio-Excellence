import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Mock user for development
const MOCK_USER: User = {
  uid: 'admin-user-id',
  email: 'admin@example.com',
  displayName: 'Admin User'
};

// Create auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('portfolio_auth_user');
    const sessionExpiry = localStorage.getItem('portfolio_session_expiry');
    
    if (storedUser && sessionExpiry) {
      // Check if session is still valid
      if (Number(sessionExpiry) > Date.now()) {
        setUser(JSON.parse(storedUser));
      } else {
        // Session expired, clear storage
        localStorage.removeItem('portfolio_auth_user');
        localStorage.removeItem('portfolio_session_expiry');
      }
    }
    
    setLoading(false);
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Check for lockout
      if (lockoutUntil && Date.now() < lockoutUntil) {
        const minutesLeft = Math.ceil((lockoutUntil - Date.now()) / 60000);
        throw new Error(`Too many login attempts. Please try again in ${minutesLeft} minutes.`);
      }
      
      // Check for stored lockout in localStorage (persists across page refreshes)
      const storedLockout = localStorage.getItem('portfolio_lockout_until');
      if (storedLockout && Date.now() < Number(storedLockout)) {
        const minutesLeft = Math.ceil((Number(storedLockout) - Date.now()) / 60000);
        throw new Error(`Too many login attempts. Please try again in ${minutesLeft} minutes.`);
      }
      
      // In a real app, this would be a Firebase or other auth provider call
      // For now, we'll use a mock authentication
      if (email === 'admin@example.com' && password === 'password123') {
        // Reset login attempts on successful login
        setLoginAttempts(0);
        setLockoutUntil(null);
        
        // Set user and session expiry (15 minutes for better security)
        const sessionExpiry = Date.now() + 15 * 60 * 1000;
        localStorage.setItem('portfolio_auth_user', JSON.stringify(MOCK_USER));
        localStorage.setItem('portfolio_session_expiry', sessionExpiry.toString());
        
        setUser(MOCK_USER);
      } else {
        // Increment login attempts
        const attempts = loginAttempts + 1;
        setLoginAttempts(attempts);
        
        // Implement lockout after 3 failed attempts (15 minutes) - stricter security
        if (attempts >= 3) {
          const lockout = Date.now() + 15 * 60 * 1000;
          setLockoutUntil(lockout);
          localStorage.setItem('portfolio_lockout_until', lockout.toString());
          throw new Error('Too many failed login attempts. Account locked for 15 minutes.');
        }
        
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    setLoading(true);
    
    try {
      // Clear local storage
      localStorage.removeItem('portfolio_auth_user');
      localStorage.removeItem('portfolio_session_expiry');
      
      // Clear user state
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Check if user is authenticated
  const isAuthenticated = !!user;
  
  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
