// Main entry point - handles navigation based on auth state
import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';
import { COLORS } from '@/constants/theme';

export default function Index() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) {
      console.log('[Index] ⏳ Still loading auth state...');
      return;
    }

    const inAuthGroup = segments[0] === 'auth';
    const inOnboardingGroup = segments[0] === 'onboarding';
    const inTabsGroup = segments[0] === '(tabs)';

    console.log('[Index] 🔍 Navigation check:', {
      isAuthenticated,
      hasUser: !!user,
      userEmail: user?.email,
      onboardingCompleted: user?.onboardingCompleted,
      onboardingType: typeof user?.onboardingCompleted,
      onboardingIsTrue: user?.onboardingCompleted === true,
      onboardingIsTruthy: !!user?.onboardingCompleted,
      currentSegment: segments[0],
      allSegments: segments,
      inAuthGroup,
      inOnboardingGroup,
      inTabsGroup,
    });

    if (!isAuthenticated) {
      console.log('[Index] ❌ Not authenticated - redirecting to login');
      if (!inAuthGroup) {
        router.replace('/auth/login');
      }
    } else if (user) {
      // User is authenticated - check onboarding status
      console.log('[Index] ✅ User authenticated - Checking onboarding:', {
        onboardingCompleted: user.onboardingCompleted,
        strictCheck: user.onboardingCompleted === true,
      });
      
      if (user.onboardingCompleted === true) {
        // User has completed onboarding - go to main app
        console.log('[Index] 🏠 User completed onboarding - redirecting to home');
        if (inAuthGroup || inOnboardingGroup || !inTabsGroup) {
          router.replace('/(tabs)');
        }
      } else {
        // User hasn't completed onboarding - go to onboarding
        console.log('[Index] 🎓 User needs onboarding - redirecting to onboarding');
        if (!inOnboardingGroup) {
          router.replace('/onboarding/about');
        }
      }
    } else {
      console.log('[Index] ⚠️ Authenticated but no user object - redirecting to login');
      router.replace('/auth/login');
    }
  }, [isAuthenticated, user, isLoading, segments, router]);

  // Show loading spinner while checking auth state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Return empty view while navigation is happening
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
