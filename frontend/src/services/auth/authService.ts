// Mock Authentication Service
// Simulates API calls for login, register, logout

import { User, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { storage } from './storage';

// Mock user database (in production, this would be a backend API)
const mockUsers: { [email: string]: { password: string; user: User } } = {
  'demo@ballerpro.com': {
    password: 'demo123',
    user: {
      id: '1',
      email: 'demo@ballerpro.com',
      name: 'Demo User',
      isPremium: false,
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
    },
  },
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<User> {
    console.log('[Auth] Login attempt:', credentials.email);
    await delay(1000); // Simulate network delay

    const userRecord = mockUsers[credentials.email.toLowerCase()];
    
    if (!userRecord) {
      throw new Error('User not found');
    }

    if (userRecord.password !== credentials.password) {
      throw new Error('Invalid password');
    }

    // Save to storage
    await storage.saveToken('mock_token_' + Date.now());
    await storage.saveUser(userRecord.user);

    console.log('[Auth] Login successful:', userRecord.user.email);
    return userRecord.user;
  },

  /**
   * Register new user
   */
  async register(credentials: RegisterCredentials): Promise<User> {
    console.log('[Auth] Register attempt:', credentials.email);
    await delay(1000);

    const emailLower = credentials.email.toLowerCase();

    if (mockUsers[emailLower]) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: emailLower,
      name: credentials.name,
      isPremium: false,
      onboardingCompleted: false, // New users need onboarding
      createdAt: new Date().toISOString(),
    };

    // Add to mock database
    mockUsers[emailLower] = {
      password: credentials.password,
      user: newUser,
    };

    // Save to storage
    await storage.saveToken('mock_token_' + Date.now());
    await storage.saveUser(newUser);

    console.log('[Auth] Registration successful:', newUser.email);
    return newUser;
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    console.log('[Auth] Logout initiated');
    await delay(300);
    
    await storage.clearAll();
    
    console.log('[Auth] Logout successful');
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    const user = await storage.getUser();
    const token = await storage.getToken();

    if (!user || !token) {
      return null;
    }

    console.log('[Auth] Current user:', user.email);
    return user;
  },

  /**
   * Update user data (e.g., after onboarding)
   */
  async updateUser(updates: Partial<User>): Promise<User> {
    const currentUser = await storage.getUser();
    
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    const updatedUser: User = {
      ...currentUser,
      ...updates,
    };

    // Update in mock database
    if (mockUsers[currentUser.email]) {
      mockUsers[currentUser.email].user = updatedUser;
    }

    // Update storage
    await storage.saveUser(updatedUser);

    console.log('[Auth] User updated:', updatedUser.email);
    return updatedUser;
  },

  /**
   * Complete onboarding
   */
  async completeOnboarding(): Promise<User> {
    return this.updateUser({ onboardingCompleted: true });
  },
};
