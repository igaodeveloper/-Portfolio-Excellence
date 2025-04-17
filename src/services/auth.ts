import { createContext, useContext, useState, useEffect } from "react";
import React from "react";

// Mock user for development
const MOCK_USER = {
  uid: "admin-user-id",
  email: "admin@example.com",
  displayName: "Admin User",
};

// Create auth context
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  // Simplified version to avoid errors
  return React.createElement(React.Fragment, null, children);
};

export const useAuth = () => {
  // Return dummy values to prevent errors
  return {
    user: null,
    loading: false,
    error: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false,
  };
};
