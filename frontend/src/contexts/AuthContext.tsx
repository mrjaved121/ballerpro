// Authentication Context Provider
// Simplified - only manages state, no backend calls
// Firebase logic will be added step by step

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials, OnboardingData } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateOnboardingData: (data: Partial<OnboardingData>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start as true to prevent premature navigation
  });

  // Initialize - just mark as loaded (no backend calls)
  useEffect(() => {
    // Small delay to ensure router is mounted
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, isLoading: false }));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // TODO: Add Firebase login logic here
    console.log('[AuthContext] Login called with:', credentials);
    throw new Error('Login not implemented yet - add Firebase logic');
  };

  const register = async (credentials: RegisterCredentials) => {
    // TODO: Add Firebase register logic here
    console.log('[AuthContext] Register called with:', credentials);
    throw new Error('Register not implemented yet - add Firebase logic');
  };

  const logout = async () => {
    // TODO: Add Firebase logout logic here
    console.log('[AuthContext] Logout called');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      onboardingData: undefined,
    });
  };

  const updateOnboardingData = async (data: Partial<OnboardingData>) => {
    // TODO: Add Firebase onboarding data save logic here
    console.log('[AuthContext] Update onboarding data:', data);
    const currentData = state.onboardingData || {};
    const updatedData = { ...currentData, ...data };
    setState(prev => ({
      ...prev,
      onboardingData: updatedData,
    }));
  };

  const completeOnboarding = async () => {
    // TODO: Add Firebase complete onboarding logic here
    console.log('[AuthContext] Complete onboarding called');
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, onboardingCompleted: true } : null,
      onboardingData: undefined,
    }));
  };

  const refreshUser = async () => {
    // TODO: Add Firebase refresh user logic here
    console.log('[AuthContext] Refresh user called');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateOnboardingData,
        completeOnboarding,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

