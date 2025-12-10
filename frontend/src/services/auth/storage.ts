// Storage Service for Authentication
// Uses SecureStore for sensitive data like tokens and AsyncStorage for user data

import * as SecureStore from 'expo-secure-store';
import { User, OnboardingData } from '@/types/auth';

// SecureStore key rules: alphanumeric, ".", "-", "_"
// Removed "@" prefix to avoid "Invalid key" errors on device
const STORAGE_KEYS = {
  USER: 'ballerpro_user',
  TOKEN: 'ballerpro_token',
  REFRESH_TOKEN: 'ballerpro_refresh_token',
  ONBOARDING: 'ballerpro_onboarding',
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
  try {
    if (await isSecureStoreAvailable()) {
      await SecureStore.setItemAsync(key, value);
    } else {
      memoryStorage[key] = value;
    }
  } catch (error) {
    console.warn('[Storage] Failed to save key:', key, error);
  }
};

const secureGet = async (key: string): Promise<string | null> => {
  try {
    if (await isSecureStoreAvailable()) {
      return await SecureStore.getItemAsync(key);
    } else {
      return memoryStorage[key] || null;
    }
  } catch (error) {
    console.warn('[Storage] Failed to get key:', key, error);
    return null;
  }
};

const secureDelete = async (key: string): Promise<void> => {
  try {
    if (await isSecureStoreAvailable()) {
      await SecureStore.deleteItemAsync(key);
    } else {
      delete memoryStorage[key];
    }
  } catch (error) {
    console.warn('[Storage] Failed to delete key:', key, error);
  }
};

// Clean up any old invalid keys (with "@") to avoid runtime errors
const cleanupLegacyKeys = async () => {
  const legacyKeys = [
    '@ballerpro_user',
    '@ballerpro_token',
    '@ballerpro_refresh_token',
    '@ballerpro_onboarding',
  ];

  try {
    if (await isSecureStoreAvailable()) {
      await Promise.all(
        legacyKeys.map(async (legacyKey) => {
          try {
            await SecureStore.deleteItemAsync(legacyKey);
          } catch (error) {
            console.warn('[Storage] Failed to remove legacy key:', legacyKey, error);
          }
        })
      );
    } else {
      legacyKeys.forEach((key) => delete memoryStorage[key]);
    }
  } catch (error) {
    console.warn('[Storage] Legacy cleanup error:', error);
  }
};

export const storage = {
  // User Management
  async saveUser(user: User): Promise<void> {
    await cleanupLegacyKeys();
    await secureSet(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  async getUser(): Promise<User | null> {
    await cleanupLegacyKeys();
    const userData = await secureGet(STORAGE_KEYS.USER);
    if (!userData) return null;
    return JSON.parse(userData);
  },

  async removeUser(): Promise<void> {
    await cleanupLegacyKeys();
    await secureDelete(STORAGE_KEYS.USER);
  },

  // Access Token Management
  async saveToken(token: string): Promise<void> {
    await cleanupLegacyKeys();
    await secureSet(STORAGE_KEYS.TOKEN, token);
  },

  async getToken(): Promise<string | null> {
    await cleanupLegacyKeys();
    return await secureGet(STORAGE_KEYS.TOKEN);
  },

  async removeToken(): Promise<void> {
    await cleanupLegacyKeys();
    await secureDelete(STORAGE_KEYS.TOKEN);
  },

  // Refresh Token Management
  async saveRefreshToken(refreshToken: string): Promise<void> {
    await cleanupLegacyKeys();
    await secureSet(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  },

  async getRefreshToken(): Promise<string | null> {
    await cleanupLegacyKeys();
    return await secureGet(STORAGE_KEYS.REFRESH_TOKEN);
  },

  async removeRefreshToken(): Promise<void> {
    await cleanupLegacyKeys();
    await secureDelete(STORAGE_KEYS.REFRESH_TOKEN);
  },

  // Onboarding Data
  async saveOnboardingData(data: OnboardingData): Promise<void> {
    await cleanupLegacyKeys();
    await secureSet(STORAGE_KEYS.ONBOARDING, JSON.stringify(data));
  },

  async getOnboardingData(): Promise<OnboardingData | null> {
    await cleanupLegacyKeys();
    const data = await secureGet(STORAGE_KEYS.ONBOARDING);
    if (!data) return null;
    return JSON.parse(data);
  },

  async removeOnboardingData(): Promise<void> {
    await cleanupLegacyKeys();
    await secureDelete(STORAGE_KEYS.ONBOARDING);
  },

  // Clear all data
  async clearAll(): Promise<void> {
    await cleanupLegacyKeys();
    await Promise.all([
      secureDelete(STORAGE_KEYS.USER),
      secureDelete(STORAGE_KEYS.TOKEN),
      secureDelete(STORAGE_KEYS.REFRESH_TOKEN),
      secureDelete(STORAGE_KEYS.ONBOARDING),
    ]);
  },
};

