/**
 * API Service for integrating with the backend
 */

// Base API URL - change as needed for production
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Storage keys
const TOKEN_KEY = 'portfolio_auth_token';

/**
 * Get stored authentication token
 */
const getToken = () => localStorage.getItem(TOKEN_KEY);

/**
 * Set authentication token
 */
const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * Check if user is authenticated
 */
const isAuthenticated = () => !!getToken();

/**
 * Generic request handler with authentication
 */
const request = async (endpoint, method = 'GET', data = null) => {
  const url = `${API_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || 'API request failed');
    }

    return result;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * Authentication API
 */
export const AuthAPI = {
  login: (credentials) => request('/auth/login', 'POST', credentials),
  getCurrentUser: () => request('/auth/me'),
  logout: () => {
    setToken(null);
    return Promise.resolve();
  },
};

/**
 * Projects API
 */
export const ProjectsAPI = {
  getAll: () => request('/projects'),
  getFeatured: () => request('/projects/featured'),
  getById: (id) => request(`/projects/${id}`),
  create: (project) => request('/projects', 'POST', project),
  update: (id, project) => request(`/projects/${id}`, 'PUT', project),
  delete: (id) => request(`/projects/${id}`, 'DELETE'),
};

/**
 * Profile API
 */
export const ProfileAPI = {
  get: () => request('/profile'),
  update: (profile) => request('/profile', 'PUT', profile),
};

/**
 * Skills API
 */
export const SkillsAPI = {
  getAll: () => request('/skills'),
  getById: (id) => request(`/skills/${id}`),
  create: (skill) => request('/skills', 'POST', skill),
  update: (id, skill) => request(`/skills/${id}`, 'PUT', skill),
  delete: (id) => request(`/skills/${id}`, 'DELETE'),
};

/**
 * Experience API
 */
export const ExperienceAPI = {
  getAll: () => request('/experience'),
  getById: (id) => request(`/experience/${id}`),
  create: (experience) => request('/experience', 'POST', experience),
  update: (id, experience) => request(`/experience/${id}`, 'PUT', experience),
  delete: (id) => request(`/experience/${id}`, 'DELETE'),
};

/**
 * Services API
 */
export const ServicesAPI = {
  getAll: () => request('/services'),
  getById: (id) => request(`/services/${id}`),
  create: (service) => request('/services', 'POST', service),
  update: (id, service) => request(`/services/${id}`, 'PUT', service),
  delete: (id) => request(`/services/${id}`, 'DELETE'),
};

/**
 * Analytics API
 */
export const AnalyticsAPI = {
  get: () => request('/analytics'),
  update: (data) => request('/analytics', 'PUT', data),
  recordPageView: () => request('/analytics/pageview', 'POST'),
  recordProjectView: (projectId) =>
    request(`/analytics/project/${projectId}`, 'POST'),
};

// Export authentication utilities
export { getToken, setToken, isAuthenticated };

// Default export
export default {
  AuthAPI,
  ProjectsAPI,
  ProfileAPI,
  SkillsAPI,
  ExperienceAPI,
  ServicesAPI,
  AnalyticsAPI,
  getToken,
  setToken,
  isAuthenticated,
};
