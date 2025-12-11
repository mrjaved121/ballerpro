import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase client configuration (non-secret, safe to keep in client)
const firebaseConfig = {
  apiKey: 'AIzaSyAB7L5KOHj7hEfX_s75GIiCKCzYwfh-EfY',
  // Default hosted auth domain; ensure this matches Firebase Console settings
  authDomain: 'baller-pro.firebaseapp.com',
  projectId: 'baller-pro',
  storageBucket: 'baller-pro.firebasestorage.app',
  messagingSenderId: '1003402954080',
  appId: '1:1003402954080:android:b691af5908396e52838a05',
};

// Ensure we don’t re-initialize in fast-refresh / multi-import scenarios
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const firebaseAuth = getAuth(app);
export const firebaseDb = getFirestore(app);
export const firebaseStorage = getStorage(app);
export default app;

