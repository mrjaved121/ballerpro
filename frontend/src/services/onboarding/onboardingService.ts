// Onboarding Service (API-backed)
// Step-by-step: step1 & step2 call real API. Remaining steps can be wired similarly.

import apiClient from '../api/api';
import { ApiResponse } from '@/types/auth';

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
  // Save Step 1 (About - Gender)
  async saveStep1(data: Step1Data): Promise<OnboardingData> {
    console.log('[OnboardingService] Saving Step 1 (About) via API:', data);

    try {
      const response = await apiClient.post<ApiResponse<OnboardingData>>(
        '/onboarding/step1',
        data
      );

      if (!response.data?.success || !response.data?.data) {
        throw new Error(response.data?.message || 'Failed to save onboarding step 1');
      }

      const serverData = response.data.data;
      console.log('[OnboardingService] ✅ Step 1 saved (API)');
      return serverData;
    } catch (error: any) {
      console.error('[OnboardingService] ❌ Step 1 save failed:', error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to save onboarding step 1';
      throw new Error(message);
    }
  }

  // Save Step 2 (Journey - Goals + Training Level)
  // API: POST /api/onboarding/step2
  // Payload: { goal: "muscle" | "fat_loss" | "endurance" | "strength", trainingLevel: "strength_athlete" | "endurance_runner" | "casual" | "beginner" }
  async saveStep2(data: { goal: string; trainingLevel: string }): Promise<OnboardingData> {
    console.log('[OnboardingService] Saving Step 2 (Journey) via API:', data);

    try {
      // Call backend endpoint: POST /api/onboarding/step2
      const response = await apiClient.post<ApiResponse<OnboardingData>>(
        '/onboarding/step2',
        {
          goal: data.goal,
          trainingLevel: data.trainingLevel,
        }
      );

      if (!response.data?.success || !response.data?.data) {
        throw new Error(response.data?.message || 'Failed to save onboarding step 2');
      }

      const serverData = response.data.data;
      console.log('[OnboardingService] ✅ Step 2 saved (API)');
      return serverData;
    } catch (error: any) {
      console.error('[OnboardingService] ❌ Step 2 save failed:', error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to save onboarding step 2';
      throw new Error(message);
    }
  }

  // Save Step 3 (Training Experience)
  // API: POST /api/onboarding/step3
  // Payload: { experienceLevel: "beginner" | "intermediate" | "advanced" }
  async saveStep3(data: { experienceLevel: 'beginner' | 'intermediate' | 'advanced' }): Promise<OnboardingData> {
    console.log('[OnboardingService] Saving Step 3 (Training Experience) via API:', data);

    try {
      // Call backend endpoint: POST /api/onboarding/step3
      const response = await apiClient.post<ApiResponse<OnboardingData>>(
        '/onboarding/step3',
        {
          experienceLevel: data.experienceLevel,
        }
      );

      if (!response.data?.success || !response.data?.data) {
        throw new Error(response.data?.message || 'Failed to save onboarding step 3');
      }

      const serverData = response.data.data;
      console.log('[OnboardingService] ✅ Step 3 saved (API)');
      return serverData;
    } catch (error: any) {
      console.error('[OnboardingService] ❌ Step 3 save failed:', error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to save onboarding step 3';
      throw new Error(message);
    }
  }

  // Save Step 4 (Injuries)
  // API: POST /api/onboarding/step4
  // Payload: { injuries: string[], otherDetails: string }
  async saveStep4(data: { injuries: string[]; otherDetails: string }): Promise<OnboardingData> {
    console.log('[OnboardingService] Saving Step 4 (Injuries) via API:', data);

    try {
      // Call backend endpoint: POST /api/onboarding/step4
      const response = await apiClient.post<ApiResponse<OnboardingData>>(
        '/onboarding/step4',
        {
          injuries: data.injuries,
          otherDetails: data.otherDetails || '',
        }
      );

      if (!response.data?.success || !response.data?.data) {
        throw new Error(response.data?.message || 'Failed to save onboarding step 4');
      }

      const serverData = response.data.data;
      console.log('[OnboardingService] ✅ Step 4 saved (API)');
      return serverData;
    } catch (error: any) {
      console.error('[OnboardingService] ❌ Step 4 save failed:', error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to save onboarding step 4';
      throw new Error(message);
    }
  }

  // Save Step 5 (Main Goal) - Completes onboarding
  // API: POST /api/onboarding/step5
  // Payload: { goal: "muscle-gain" | "fat-loss" | "maintenance" }
  // This endpoint marks onboarding as complete on the backend
  async saveStep5(data: { goal: 'muscle-gain' | 'fat-loss' | 'maintenance' }): Promise<OnboardingData> {
    console.log('[OnboardingService] Saving Step 5 (Main Goal) via API - Completing onboarding:', data);

    try {
      // Call backend endpoint: POST /api/onboarding/step5
      const response = await apiClient.post<ApiResponse<OnboardingData>>(
        '/onboarding/step5',
        {
          goal: data.goal,
        }
      );

      if (!response.data?.success || !response.data?.data) {
        throw new Error(response.data?.message || 'Failed to complete onboarding');
      }

      const serverData = response.data.data;
      console.log('[OnboardingService] ✅ Step 5 saved (API) - Onboarding Complete! 🎉');
      return {
        ...serverData,
        completed: true,
        completedAt: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error('[OnboardingService] ❌ Step 5 save failed:', error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to complete onboarding';
      throw new Error(message);
    }
  }

  async getStatus(): Promise<OnboardingData> {
    // Placeholder: when GET endpoint is available, call it here
    throw new Error('getStatus not implemented yet - wire to backend endpoint.');
  }

  async reset(): Promise<void> {
    throw new Error('reset not implemented in API-backed service.');
  }
}

export const onboardingService = new OnboardingService();

