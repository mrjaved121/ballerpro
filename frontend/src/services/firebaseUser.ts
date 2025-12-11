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

export const getUserDoc = async (uid: string) => {
  const snap = await getDoc(userDocRef(uid));
  return snap.exists() ? snap.data() : null;
};

export const setUserDoc = async (uid: string, data: Partial<FirestoreUser>) => {
  await setDoc(
    userDocRef(uid),
    {
      ...data,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(), // Firestore will keep original once set
    },
    { merge: true }
  );
};

