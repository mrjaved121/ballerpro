// Authentication and User Types

export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  isPremium: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface OnboardingData {
  gender?: 'male' | 'female' | 'other';
  trainingLevel?: 'beginner' | 'intermediate' | 'advanced';
  goals?: string[];
  injuries?: string[];
  customInjury?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboardingData?: OnboardingData;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

