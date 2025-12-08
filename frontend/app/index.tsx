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
      console.log('[Index] Still loading, waiting...');
      return;
    }

    const inAuthGroup = segments[0] === 'auth';
    const inOnboardingGroup = segments[0] === 'onboarding';

    console.log('[Index] 🔍 Navigation check:', {
      isAuthenticated,
      hasUser: !!user,
      userEmail: user?.email,
      onboardingCompleted: user?.onboardingCompleted,
      currentSegment: segments[0],
      inAuthGroup,
      inOnboardingGroup,
    });

    if (!isAuthenticated) {
      // Not logged in → redirect to login
      if (!inAuthGroup) {
        console.log('[Index] 🚀 Redirecting to login');
        router.replace('/auth/login');
      }
    } else if (user && !user.onboardingCompleted) {
      // Logged in but onboarding not complete → redirect to onboarding
      if (!inOnboardingGroup) {
        console.log('[Index] 🎓 Redirecting to onboarding (user needs onboarding)');
        router.replace('/onboarding/about');
      }
    } else if (user && user.onboardingCompleted) {
      // Logged in and onboarding complete → redirect to main app (home dashboard)
      if (inAuthGroup || inOnboardingGroup) {
        console.log('[Index] 🏠 Redirecting to home dashboard');
        router.replace('/(tabs)/index');
      }
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
