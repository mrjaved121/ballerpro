// Authentication Context Provider
// Manages global auth state and provides auth methods to the app

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials, OnboardingData } from '@/types/auth';
import { authService } from '@/services/auth/authService';
import { authServiceFirebase } from '@/services/auth/authServiceFirebase';
import { storage } from '@/services/auth/storage';
import { USE_FIREBASE_AUTH } from '@/config/featureFlags';

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
    isLoading: true,
  });

  // Initialize auth state on app launch
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const user = await authService.getCurrentUser();
      const onboardingData = await storage.getOnboardingData();

      if (user) {
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          onboardingData: onboardingData || undefined,
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('[AuthContext] Initialization error:', error);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const service = USE_FIREBASE_AUTH ? authServiceFirebase : authService;
      const user = await service.login(credentials);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('[AuthContext] Login error:', error);
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const service = USE_FIREBASE_AUTH ? authServiceFirebase : authService;
      const user = await service.register(credentials);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('[AuthContext] Register error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const service = USE_FIREBASE_AUTH ? authServiceFirebase : authService;
      await service.logout();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        onboardingData: undefined,
      });
    } catch (error) {
      console.error('[AuthContext] Logout error:', error);
      throw error;
    }
  };

  const updateOnboardingData = async (data: Partial<OnboardingData>) => {
    const currentData = state.onboardingData || {};
    const updatedData = { ...currentData, ...data };
    
    await storage.saveOnboardingData(updatedData);
    
    setState(prev => ({
      ...prev,
      onboardingData: updatedData,
    }));
    
  };

  const completeOnboarding = async () => {
    try {
      const service = USE_FIREBASE_AUTH ? authServiceFirebase : authService;
      // Update user state to mark onboarding as complete
      const updatedUser = await service.completeOnboarding();
      await storage.removeOnboardingData();
      
      setState(prev => ({
        ...prev,
        user: updatedUser,
        onboardingData: undefined,
      }));
      
    } catch (error) {
      console.error('[AuthContext] Complete onboarding error:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const service = USE_FIREBASE_AUTH ? authServiceFirebase : authService;
      const user = await service.getCurrentUser();
      if (user) {
        setState(prev => ({ ...prev, user }));
      }
    } catch (error) {
      console.error('[AuthContext] Refresh user error:', error);
    }
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

