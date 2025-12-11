// Onboarding Service (Firebase-backed)

import { USE_FIREBASE_AUTH } from '@/config/featureFlags';
import { setUserDoc, getUserDoc } from '@/services/firebaseUser';
import { firebaseAuth } from '@/services/firebase';

export interface Step1Data {
  gender?: string;
  goal?: 'build-muscle' | 'lose-fat' | 'improve-endurance' | 'increase-strength';
  trainingLevel?: 'strength-athlete' | 'endurance-runner' | 'casual-gym-goer' | 'beginner';
}

export interface OnboardingData {
  step1?: Step1Data;
  step2?: Record<string, any>;
  step3?: Record<string, any>;
  step4?: Record<string, any>;
  step5?: Record<string, any>;
  completed?: boolean;
  completedAt?: string;
}

class OnboardingService {
  private async saveToFirestore(partial: Partial<OnboardingData>): Promise<OnboardingData> {
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');
    const uid = currentUser.uid;

    // Fetch existing onboarding to merge
    const existing = await getUserDoc(uid);
    const existingOnboarding = existing?.onboarding || {};

    const merged = {
      ...existingOnboarding,
      ...partial,
    };

    // If step5 goal is present, mark completed
    const completed = merged.completed === true || Boolean(merged.step5?.goal);

    await setUserDoc(uid, {
      onboarding: {
        ...merged,
        completed,
        completedAt: completed ? new Date() : merged.completedAt,
      },
    });

    return {
      ...merged,
      completed,
    };
  }

  // Save Step 1 (About - Gender)
  async saveStep1(data: Step1Data): Promise<OnboardingData> {
    return this.saveToFirestore({ step1: data, completed: false });
  }

  // Save Step 2 (Journey - Goals + Training Level)
  // API: POST /api/onboarding/step2
  // Payload: { goal: "muscle" | "fat_loss" | "endurance" | "strength", trainingLevel: "strength_athlete" | "endurance_runner" | "casual" | "beginner" }
  async saveStep2(data: { goal: string; trainingLevel: string }): Promise<OnboardingData> {
    return this.saveToFirestore({ step2: { goal: data.goal, trainingLevel: data.trainingLevel }, completed: false });
  }

  // Save Step 3 (Training Experience)
  // API: POST /api/onboarding/step3
  // Payload: { experienceLevel: "beginner" | "intermediate" | "advanced" }
  async saveStep3(data: { experienceLevel: 'beginner' | 'intermediate' | 'advanced' }): Promise<OnboardingData> {
    return this.saveToFirestore({ step3: { experienceLevel: data.experienceLevel }, completed: false });
  }

  // Save Step 4 (Injuries)
  // API: POST /api/onboarding/step4
  // Payload: { injuries: string[], otherDetails: string }
  async saveStep4(data: { injuries: string[]; otherDetails: string }): Promise<OnboardingData> {
    return this.saveToFirestore({
      step4: { injuries: data.injuries, otherDetails: data.otherDetails || '' },
      completed: false,
    });
  }

  // Save Step 5 (Main Goal) - Completes onboarding
  // API: POST /api/onboarding/step5
  // Payload: { goal: "muscle-gain" | "fat-loss" | "maintenance" }
  // This endpoint marks onboarding as complete on the backend
  async saveStep5(data: { goal: 'muscle-gain' | 'fat-loss' | 'maintenance' }): Promise<OnboardingData> {
    return this.saveToFirestore({
      step5: { goal: data.goal },
      completed: true,
      completedAt: new Date().toISOString(),
    });
  }

  async getStatus(): Promise<OnboardingData> {
    if (!USE_FIREBASE_AUTH) throw new Error('Firebase mode required');
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');
    const doc = await getUserDoc(currentUser.uid);
    return doc?.onboarding || {};
  }

  async reset(): Promise<void> {
    if (!USE_FIREBASE_AUTH) throw new Error('Firebase mode required');
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) throw new Error('Not authenticated');
    await setUserDoc(currentUser.uid, {
      onboarding: {
        completed: false,
        completedAt: null,
        step1: {},
        step2: {},
        step3: {},
        step4: {},
        step5: {},
      },
    });
  }
}

export const onboardingService = new OnboardingService();

