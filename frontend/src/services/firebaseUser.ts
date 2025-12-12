import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { firebaseDb } from './firebase';

// Firestore user document shape, aligned to current onboarding needs.
export type FirestoreOnboarding = {
  step1?: { gender?: string };
  step2?: { goal?: string; trainingLevel?: string };
  step3?: { experienceLevel?: string };
  step4?: { injuries?: string[]; otherDetails?: string };
  step5?: { goal?: string };
  completed?: boolean;
  completedAt?: Date;
};

export type FirestoreUser = {
  email?: string;
  name?: string;
  avatar?: string | null;
  isEmailVerified?: boolean;
  onboarding?: FirestoreOnboarding;
  createdAt?: Date;
  updatedAt?: Date;
};

const userDocRef = (uid: string) => doc(firebaseDb, 'users', uid);

// Remove any undefined values so Firestore setDoc doesn't error
const removeUndefined = (value: any): any => {
  if (Array.isArray(value)) {
    return value.map(removeUndefined);
  }
  if (value && typeof value === 'object') {
    const cleaned: Record<string, any> = {};
    Object.entries(value).forEach(([k, v]) => {
      if (v !== undefined) {
        cleaned[k] = removeUndefined(v);
      }
    });
    return cleaned;
  }
  return value;
};

export const getUserDoc = async (uid: string) => {
  const snap = await getDoc(userDocRef(uid));
  return snap.exists() ? snap.data() : null;
};

export const setUserDoc = async (uid: string, data: Partial<FirestoreUser>) => {
  const cleaned = removeUndefined(data) as Partial<FirestoreUser>;
  await setDoc(
    userDocRef(uid),
    {
      ...cleaned,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(), // Firestore will keep original once set
    },
    { merge: true }
  );
};

