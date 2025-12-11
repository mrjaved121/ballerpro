import { User as FirebaseUser } from 'firebase/auth';
import { signIn, signOutUser, signUp, observeAuth } from '@/services/firebaseAuth';
import { getUserDoc, setUserDoc } from '@/services/firebaseUser';
import { storage } from './storage';
import { User, LoginCredentials, RegisterCredentials } from '@/types/auth';

const mapUser = async (fbUser: FirebaseUser): Promise<User> => {
  const uid = fbUser.uid;
  const doc = await getUserDoc(uid);
  const onboardingCompleted = Boolean(doc?.onboarding?.completed);

  return {
    id: uid,
    email: fbUser.email || doc?.email || '',
    name: fbUser.displayName || doc?.name || fbUser.email || '',
    avatar: doc?.avatar ?? null,
    isEmailVerified: fbUser.emailVerified ?? false,
    isPremium: false,
    onboardingCompleted,
    createdAt: doc?.createdAt ?? undefined,
  };
};

export const authServiceFirebase = {
  async register(credentials: RegisterCredentials): Promise<User> {
    const fbUser = await signUp(credentials.email, credentials.password, credentials.name);
    // Create / merge Firestore user doc
    await setUserDoc(fbUser.uid, {
      email: credentials.email,
      name: credentials.name,
      isEmailVerified: fbUser.emailVerified,
      onboarding: { completed: false },
    });
    const user = await mapUser(fbUser);
    await storage.saveUser(user);
    // Tokens not required for Firebase; clear any old tokens
    await storage.saveToken('');
    await storage.saveRefreshToken('');
    return user;
  },

  async login(credentials: LoginCredentials): Promise<User> {
    const fbUser = await signIn(credentials.email, credentials.password);
    const user = await mapUser(fbUser);
    await storage.saveUser(user);
    await storage.saveToken('');
    await storage.saveRefreshToken('');
    return user;
  },

  async logout(): Promise<void> {
    await signOutUser();
    await storage.clearAll();
  },

  async getCurrentUser(): Promise<User | null> {
    const stored = await storage.getUser();
    if (stored) return stored;
    // Try Firebase current user if present
    const unsubscribe = observeAuth(async (fbUser) => {
      if (fbUser) {
        const user = await mapUser(fbUser);
        await storage.saveUser(user);
      }
    });
    unsubscribe(); // one-shot
    return await storage.getUser();
  },

  async getToken(): Promise<string | null> {
    // Not needed with Firebase; return empty string to satisfy callers
    return '';
  },

  async clearAuth(): Promise<void> {
    await storage.clearAll();
  },

  async updateUser(updates: Partial<User>): Promise<User> {
    const current = await storage.getUser();
    if (!current) throw new Error('No authenticated user');
    const merged: User = { ...current, ...updates };
    await storage.saveUser(merged);
    if (updates.name || updates.avatar) {
      await setUserDoc(current.id, {
        name: updates.name,
        avatar: updates.avatar,
      });
    }
    return merged;
  },

  async completeOnboarding(): Promise<User> {
    const current = await storage.getUser();
    if (!current) throw new Error('No authenticated user');
    await setUserDoc(current.id, {
      onboarding: { ...(current as any).onboarding, completed: true, completedAt: new Date() },
    });
    const updated = { ...current, onboardingCompleted: true };
    await storage.saveUser(updated);
    return updated;
  },
};

