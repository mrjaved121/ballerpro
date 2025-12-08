// Mock Storage Service for Authentication
// In production, this would use SecureStore or AsyncStorage

import { User, OnboardingData } from '@/types/auth';

const STORAGE_KEYS = {
  USER: '@ballerpro_user',
  TOKEN: '@ballerpro_token',
  ONBOARDING: '@ballerpro_onboarding',
};

// In-memory storage for development (simulates persistent storage)
const memoryStorage: { [key: string]: string } = {};

export const storage = {
  // User Management
  async saveUser(user: User): Promise<void> {
    memoryStorage[STORAGE_KEYS.USER] = JSON.stringify(user);
    console.log('[Storage] User saved:', user.email);
  },

  async getUser(): Promise<User | null> {
    const userData = memoryStorage[STORAGE_KEYS.USER];
    if (!userData) return null;
    return JSON.parse(userData);
  },

  async removeUser(): Promise<void> {
    delete memoryStorage[STORAGE_KEYS.USER];
    console.log('[Storage] User removed');
  },

  // Token Management
  async saveToken(token: string): Promise<void> {
    memoryStorage[STORAGE_KEYS.TOKEN] = token;
    console.log('[Storage] Token saved');
  },

  async getToken(): Promise<string | null> {
    return memoryStorage[STORAGE_KEYS.TOKEN] || null;
  },

  async removeToken(): Promise<void> {
    delete memoryStorage[STORAGE_KEYS.TOKEN];
    console.log('[Storage] Token removed');
  },

  // Onboarding Data
  async saveOnboardingData(data: OnboardingData): Promise<void> {
    memoryStorage[STORAGE_KEYS.ONBOARDING] = JSON.stringify(data);
    console.log('[Storage] Onboarding data saved');
  },

  async getOnboardingData(): Promise<OnboardingData | null> {
    const data = memoryStorage[STORAGE_KEYS.ONBOARDING];
    if (!data) return null;
    return JSON.parse(data);
  },

  async removeOnboardingData(): Promise<void> {
    delete memoryStorage[STORAGE_KEYS.ONBOARDING];
    console.log('[Storage] Onboarding data removed');
  },

  // Clear all data
  async clearAll(): Promise<void> {
    Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
    console.log('[Storage] All data cleared');
  },
};

