import { Request, Response } from 'express';
import { User } from '../models/User';

// Save Step 1 data
export const saveStep1 = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { goal, trainingLevel } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          'onboarding.step1': { goal, trainingLevel },
        },
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Step 1 saved successfully',
      data: {
        onboarding: user.onboarding,
      },
    });
  } catch (error: any) {
    console.error('Save step 1 error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save step 1',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Save Step 2 data
export const saveStep2 = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const step2Data = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          'onboarding.step2': step2Data,
        },
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Step 2 saved successfully',
      data: {
        onboarding: user.onboarding,
      },
    });
  } catch (error: any) {
    console.error('Save step 2 error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save step 2',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Save Step 3 data
export const saveStep3 = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const step3Data = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          'onboarding.step3': step3Data,
        },
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Step 3 saved successfully',
      data: {
        onboarding: user.onboarding,
      },
    });
  } catch (error: any) {
    console.error('Save step 3 error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save step 3',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Save Step 4 data and mark onboarding as complete
export const saveStep4 = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const step4Data = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          'onboarding.step4': step4Data,
          'onboarding.completed': true,
          'onboarding.completedAt': new Date(),
        },
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Onboarding completed successfully',
      data: {
        onboarding: user.onboarding,
      },
    });
  } catch (error: any) {
    console.error('Save step 4 error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save step 4',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Get onboarding status
export const getOnboardingStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const user = await User.findById(userId).select('onboarding');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      data: {
        onboarding: user.onboarding,
      },
    });
  } catch (error: any) {
    console.error('Get onboarding status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get onboarding status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

