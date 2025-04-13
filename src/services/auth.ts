// /app-annotated/src/services/auth.jsx
// import { createContext, useContext, useState, useEffect } from 'react';

// // Mock user for development
// const MOCK_USER = {
//   uid: 'admin-user-id',
//   email: 'admin@example.com',
//   displayName: 'Admin User'
// };

// // Create auth context
// const AuthContext = createContext(null);

// // Auth provider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [loginAttempts, setLoginAttempts] = useState(0);
//   const [lockoutUntil, setLockoutUntil] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('portfolio_auth_user');
//     const sessionExpiry = localStorage.getItem('portfolio_session_expiry');

//     if (storedUser && sessionExpiry) {
//       if (Number(sessionExpiry) > Date.now()) {
//         setUser(JSON.parse(storedUser));
//       } else {
//         localStorage.removeItem('portfolio_auth_user');
//         localStorage.removeItem('portfolio_session_expiry');
//       }
//     }

//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     setLoading(true);
//     setError(null);

//     try {
//       if (lockoutUntil && Date.now() < lockoutUntil) {
//         const minutesLeft = Math.ceil((lockoutUntil - Date.now()) / 60000);
//         throw new Error(`Too many login attempts. Please try again in ${minutesLeft} minutes.`);
//       }

//       const storedLockout = localStorage.getItem('portfolio_lockout_until');
//       if (storedLockout && Date.now() < Number(storedLockout)) {
//         const minutesLeft = Math.ceil((Number(storedLockout) - Date.now()) / 60000);
//         throw new Error(`Too many login attempts. Please try again in ${minutesLeft} minutes.`);
//       }

//       if (email === 'admin@example.com' && password === 'password123') {
//         setLoginAttempts(0);
//         setLockoutUntil(null);

//         const sessionExpiry = Date.now() + 15 * 60 * 1000;
//         localStorage.setItem('portfolio_auth_user', JSON.stringify(MOCK_USER));
//         localStorage.setItem('portfolio_session_expiry', sessionExpiry.toString());

//         setUser(MOCK_USER);
//       } else {
//         const attempts = loginAttempts + 1;
//         setLoginAttempts(attempts);

//         if (attempts >= 3) {
//           const lockout = Date.now() + 15 * 60 * 1000;
//           setLockoutUntil(lockout);
//           localStorage.setItem('portfolio_lockout_until', lockout.toString());
//           throw new Error('Too many failed login attempts. Account locked for 15 minutes.');
//         }

//         throw new Error('Invalid email or password');
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An unknown error occurred');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     setLoading(true);

//     try {
//       localStorage.removeItem('portfolio_auth_user');
//       localStorage.removeItem('portfolio_session_expiry');
//       setUser(null);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An unknown error occurred');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isAuthenticated = !!user;

//   const value = {
//     user,
//     loading,
//     error,
//     login,
//     logout,
//     isAuthenticated
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }

//   return context;
// };
