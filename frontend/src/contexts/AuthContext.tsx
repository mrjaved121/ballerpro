// Authentication Context Provider
// Manages global auth state and provides auth methods to the app

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials, OnboardingData } from '@/types/auth';
import { authService } from '@/services/auth/authService';
import { storage } from '@/services/auth/storage';

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
      console.log('[AuthContext] Initializing authentication...');
      const user = await authService.getCurrentUser();
      const onboardingData = await storage.getOnboardingData();

      if (user) {
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          onboardingData: onboardingData || undefined,
        });
        console.log('[AuthContext] User authenticated:', user.email);
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        console.log('[AuthContext] No authenticated user');
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
      console.log('[AuthContext] Login...');
      const user = await authService.login(credentials);
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
      console.log('[AuthContext] Register...');
      const user = await authService.register(credentials);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      console.log('[AuthContext] ✅ User registered:', {
        email: user.email,
        onboardingCompleted: user.onboardingCompleted,
      });
    } catch (error) {
      console.error('[AuthContext] Register error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('[AuthContext] Logout...');
      await authService.logout();
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
    
    console.log('[AuthContext] Onboarding data updated');
  };

  const completeOnboarding = async () => {
    try {
      console.log('[AuthContext] Completing onboarding...');
      const updatedUser = await authService.completeOnboarding();
      await storage.removeOnboardingData();
      
      setState(prev => ({
        ...prev,
        user: updatedUser,
        onboardingData: undefined,
      }));
      
      console.log('[AuthContext] Onboarding completed');
    } catch (error) {
      console.error('[AuthContext] Complete onboarding error:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const user = await authService.getCurrentUser();
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

