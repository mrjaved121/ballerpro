// ⚠️ MOCK SERVICE - NO BACKEND REQUIRED
// This service works OFFLINE using in-memory storage
// Perfect for frontend testing before backend is ready

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
  completed: boolean;
  completedAt?: string;
}

// In-memory storage (no API calls)
let mockOnboardingData: OnboardingData = {
  completed: false,
};

class OnboardingService {
  // Mock delay to simulate network (optional, for realistic UX)
  private async mockDelay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Save Step 1 (About - Gender)
  async saveStep1(data: Step1Data): Promise<OnboardingData> {
    console.log('[OnboardingService] Saving Step 1 (About):', data);
    await this.mockDelay(200);
    
    mockOnboardingData = {
      ...mockOnboardingData,
      step1: { ...mockOnboardingData.step1, ...data },
    };
    
    console.log('[OnboardingService] ✅ Step 1 saved');
    return { ...mockOnboardingData };
  }

  // Save Step 2 (Journey - Goals + Experience Level)
  async saveStep2(data: Record<string, any>): Promise<OnboardingData> {
    console.log('[OnboardingService] Saving Step 2 (Journey):', data);
    await this.mockDelay(200);
    
    // Merge with step1 data since this is part of initial profile
    mockOnboardingData = {
      ...mockOnboardingData,
      step1: { 
        ...mockOnboardingData.step1, 
        goal: data.goal,
        trainingLevel: data.trainingLevel 
      },
      step2: data,
    };
    
    console.log('[OnboardingService] ✅ Step 2 (Journey) saved');
    return { ...mockOnboardingData };
  }

  // Save Step 3 (Training Experience)
  async saveStep3(data: Record<string, any>): Promise<OnboardingData> {
    console.log('[OnboardingService] Saving Step 3 (Training Experience):', data);
    await this.mockDelay(200);
    
    mockOnboardingData = {
      ...mockOnboardingData,
      step3: data,
    };
    
    console.log('[OnboardingService] ✅ Step 3 (Training Experience) saved');
    return { ...mockOnboardingData };
  }

  // Save Step 4 (Injuries)
  async saveStep4(data: Record<string, any>): Promise<OnboardingData> {
    console.log('[OnboardingService] Saving Step 4 (Injuries):', data);
    await this.mockDelay(200);
    
    mockOnboardingData = {
      ...mockOnboardingData,
      step4: data,
    };
    
    console.log('[OnboardingService] ✅ Step 4 (Injuries) saved');
    return { ...mockOnboardingData };
  }

  // Save Step 5 (Main Goal) and complete onboarding
  async saveStep5(data: Record<string, any>): Promise<OnboardingData> {
    console.log('[OnboardingService] Saving Step 5 (Main Goal):', data);
    await this.mockDelay(200);
    
    mockOnboardingData = {
      ...mockOnboardingData,
      step5: data,
      completed: true,
      completedAt: new Date().toISOString(),
    };
    
    console.log('[OnboardingService] ✅ Step 5 (Main Goal) saved - Onboarding Complete! 🎉');
    console.log('[OnboardingService] Final data:', JSON.stringify(mockOnboardingData, null, 2));
    return { ...mockOnboardingData };
  }

  // Get onboarding status
  async getStatus(): Promise<OnboardingData> {
    console.log('[OnboardingService] Getting status...');
    await this.mockDelay(100);
    return { ...mockOnboardingData };
  }

  // Reset onboarding (for testing)
  async reset(): Promise<void> {
    console.log('[OnboardingService] Resetting onboarding data');
    mockOnboardingData = {
      completed: false,
    };
  }
}

export const onboardingService = new OnboardingService();

