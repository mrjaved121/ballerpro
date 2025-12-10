import { User } from '../models/User.js';

// Save Step 1 data
export const saveStep1 = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { gender } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Persist step 1 data and keep onboarding marked incomplete
    user.onboarding = user.onboarding || {};
    user.onboarding.step1 = { gender };

    // Only set completed flag if it is not already true (e.g., user reruns step 1)
    if (user.onboarding.completed !== true) {
      user.onboarding.completed = false;
      user.onboarding.completedAt = undefined;
    }

    await user.save();

    const { onboarding } = user.toObject();
    const responseOnboarding = {
      step1: onboarding?.step1,
      completed: Boolean(onboarding?.completed),
    };

    res.json({
      success: true,
      message: 'Step 1 saved successfully',
      data: {
        onboarding: responseOnboarding,
      },
    });
  } catch (error) {
    console.error('Save step 1 error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save step 1',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Save Step 2 data (Journey - Goal & Training Level)
export const saveStep2 = async (req, res) => {
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

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Persist step 2 data; keep other onboarding data untouched
    user.onboarding = user.onboarding || {};
    user.onboarding.step2 = { goal, trainingLevel };

    // If onboarding isn't finished yet, ensure completed flag remains false
    if (user.onboarding.completed !== true) {
      user.onboarding.completed = false;
      user.onboarding.completedAt = undefined;
    }

    await user.save();

    const { onboarding } = user.toObject();
    const responseOnboarding = {
      step1: onboarding?.step1,
      step2: onboarding?.step2,
      completed: Boolean(onboarding?.completed),
    };

    res.json({
      success: true,
      message: 'Step 2 saved successfully',
      data: {
        onboarding: responseOnboarding,
      },
    });
  } catch (error) {
    console.error('Save step 2 error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save step 2',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Save Step 3 data (Training Experience)
export const saveStep3 = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { experienceLevel } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Persist step 3 data; keep other onboarding data untouched
    user.onboarding = user.onboarding || {};
    user.onboarding.step3 = { experienceLevel };

    // If onboarding isn't finished yet, ensure completed flag remains false
    if (user.onboarding.completed !== true) {
      user.onboarding.completed = false;
      user.onboarding.completedAt = undefined;
    }

    await user.save();

    const { onboarding } = user.toObject();
    const responseOnboarding = {
      step1: onboarding?.step1,
      step2: onboarding?.step2,
      step3: onboarding?.step3,
      completed: Boolean(onboarding?.completed),
    };

    res.json({
      success: true,
      message: 'Step 3 saved successfully',
      data: {
        onboarding: responseOnboarding,
      },
    });
  } catch (error) {
    console.error('Save step 3 error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save step 3',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Save Step 4 data (Injuries)
export const saveStep4 = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const step4Data = {
      injuries: req.body?.injuries ?? [],
      otherDetails: req.body?.otherDetails ?? '',
    };

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Persist step 4 data; keep other onboarding data untouched
    user.onboarding = user.onboarding || {};
    user.onboarding.step4 = step4Data;

    // If onboarding isn't finished yet, ensure completed flag remains false
    if (user.onboarding.completed !== true) {
      user.onboarding.completed = false;
      user.onboarding.completedAt = undefined;
    }

    await user.save();

    const { onboarding } = user.toObject();
    const responseOnboarding = {
      step1: onboarding?.step1,
      step2: onboarding?.step2,
      step3: onboarding?.step3,
      step4: onboarding?.step4,
      completed: Boolean(onboarding?.completed),
    };

    res.json({
      success: true,
      message: 'Step 4 saved successfully',
      data: {
        onboarding: responseOnboarding,
      },
    });
  } catch (error) {
    console.error('Save step 4 error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save step 4',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Save Step 5 data (Main Goal) and mark onboarding as complete
export const saveStep5 = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { goal } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Persist step 5 data and mark onboarding complete
    user.onboarding = user.onboarding || {};
    user.onboarding.step5 = { goal };
    user.onboarding.completed = true;
    user.onboarding.completedAt = new Date();

    await user.save();

    const { onboarding } = user.toObject();
    const responseOnboarding = {
      step1: onboarding?.step1,
      step2: onboarding?.step2,
      step3: onboarding?.step3,
      step4: onboarding?.step4,
      step5: onboarding?.step5,
      completed: true,
      completedAt: onboarding?.completedAt,
    };

    res.json({
      success: true,
      message: 'Onboarding completed successfully',
      data: {
        onboarding: responseOnboarding,
      },
    });
  } catch (error) {
    console.error('Save step 5 error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save step 5',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Get onboarding status
export const getOnboardingStatus = async (req, res) => {
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
  } catch (error) {
    console.error('Get onboarding status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get onboarding status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

