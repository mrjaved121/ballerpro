// Storage Service for Authentication
// Uses SecureStore for sensitive data like tokens and AsyncStorage for user data

import * as SecureStore from 'expo-secure-store';
import { User, OnboardingData } from '@/types/auth';

const STORAGE_KEYS = {
  USER: '@ballerpro_user',
  TOKEN: '@ballerpro_token',
  REFRESH_TOKEN: '@ballerpro_refresh_token',
  ONBOARDING: '@ballerpro_onboarding',
};

// In-memory storage fallback for web platform
const memoryStorage: { [key: string]: string } = {};

// Helper to check if SecureStore is available
const isSecureStoreAvailable = async (): Promise<boolean> => {
  try {
    await SecureStore.isAvailableAsync();
    return true;
  } catch {
    return false;
  }
};

// Generic secure storage methods
const secureSet = async (key: string, value: string): Promise<void> => {
  if (await isSecureStoreAvailable()) {
    await SecureStore.setItemAsync(key, value);
  } else {
    memoryStorage[key] = value;
  }
};

const secureGet = async (key: string): Promise<string | null> => {
  if (await isSecureStoreAvailable()) {
    return await SecureStore.getItemAsync(key);
  } else {
    return memoryStorage[key] || null;
  }
};

const secureDelete = async (key: string): Promise<void> => {
  if (await isSecureStoreAvailable()) {
    await SecureStore.deleteItemAsync(key);
  } else {
    delete memoryStorage[key];
  }
};

export const storage = {
  // User Management
  async saveUser(user: User): Promise<void> {
    await secureSet(STORAGE_KEYS.USER, JSON.stringify(user));
    console.log('[Storage] User saved:', user.email);
  },

  async getUser(): Promise<User | null> {
    const userData = await secureGet(STORAGE_KEYS.USER);
    if (!userData) return null;
    return JSON.parse(userData);
  },

  async removeUser(): Promise<void> {
    await secureDelete(STORAGE_KEYS.USER);
    console.log('[Storage] User removed');
  },

  // Access Token Management
  async saveToken(token: string): Promise<void> {
    await secureSet(STORAGE_KEYS.TOKEN, token);
    console.log('[Storage] Access token saved');
  },

  async getToken(): Promise<string | null> {
    return await secureGet(STORAGE_KEYS.TOKEN);
  },

  async removeToken(): Promise<void> {
    await secureDelete(STORAGE_KEYS.TOKEN);
    console.log('[Storage] Access token removed');
  },

  // Refresh Token Management
  async saveRefreshToken(refreshToken: string): Promise<void> {
    await secureSet(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    console.log('[Storage] Refresh token saved');
  },

  async getRefreshToken(): Promise<string | null> {
    return await secureGet(STORAGE_KEYS.REFRESH_TOKEN);
  },

  async removeRefreshToken(): Promise<void> {
    await secureDelete(STORAGE_KEYS.REFRESH_TOKEN);
    console.log('[Storage] Refresh token removed');
  },

  // Onboarding Data
  async saveOnboardingData(data: OnboardingData): Promise<void> {
    await secureSet(STORAGE_KEYS.ONBOARDING, JSON.stringify(data));
    console.log('[Storage] Onboarding data saved');
  },

  async getOnboardingData(): Promise<OnboardingData | null> {
    const data = await secureGet(STORAGE_KEYS.ONBOARDING);
    if (!data) return null;
    return JSON.parse(data);
  },

  async removeOnboardingData(): Promise<void> {
    await secureDelete(STORAGE_KEYS.ONBOARDING);
    console.log('[Storage] Onboarding data removed');
  },

  // Clear all data
  async clearAll(): Promise<void> {
    await Promise.all([
      secureDelete(STORAGE_KEYS.USER),
      secureDelete(STORAGE_KEYS.TOKEN),
      secureDelete(STORAGE_KEYS.REFRESH_TOKEN),
      secureDelete(STORAGE_KEYS.ONBOARDING),
    ]);
    console.log('[Storage] All data cleared');
  },
};

