import api from '../api/api';

export interface Step1Data {
  goal: 'build-muscle' | 'lose-fat' | 'improve-endurance' | 'increase-strength';
  trainingLevel: 'strength-athlete' | 'endurance-runner' | 'casual-gym-goer' | 'beginner';
}

export interface OnboardingData {
  step1?: Step1Data;
  step2?: Record<string, any>;
  step3?: Record<string, any>;
  step4?: Record<string, any>;
  completed: boolean;
  completedAt?: string;
}

class OnboardingService {
  // Save Step 1
  async saveStep1(data: Step1Data): Promise<OnboardingData> {
    try {
      const response = await api.post('/onboarding/step1', data);
      return response.data.data.onboarding;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Save Step 2
  async saveStep2(data: Record<string, any>): Promise<OnboardingData> {
    try {
      const response = await api.post('/onboarding/step2', data);
      return response.data.data.onboarding;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Save Step 3
  async saveStep3(data: Record<string, any>): Promise<OnboardingData> {
    try {
      const response = await api.post('/onboarding/step3', data);
      return response.data.data.onboarding;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Save Step 4 and complete onboarding
  async saveStep4(data: Record<string, any>): Promise<OnboardingData> {
    try {
      const response = await api.post('/onboarding/step4', data);
      return response.data.data.onboarding;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Get onboarding status
  async getStatus(): Promise<OnboardingData> {
    try {
      const response = await api.get('/onboarding/status');
      return response.data.data.onboarding;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Error handler
  private handleError(error: any): Error {
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred';
      const errors = error.response.data?.errors;
      const errorObj: any = new Error(message);
      errorObj.errors = errors;
      errorObj.status = error.response.status;
      return errorObj;
    } else if (error.request) {
      return new Error('Network error. Please check your connection.');
    } else {
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export const onboardingService = new OnboardingService();

