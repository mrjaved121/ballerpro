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
    // Don't navigate until loading is complete and router is ready
    if (isLoading) {
      return;
    }

    // Navigate immediately - no delay needed
    const firstSegment = segments[0];
    const segmentsArray = segments as string[];
    const secondSegment = segmentsArray.length > 1 ? segmentsArray[1] : undefined;
    
    const inAuthGroup = firstSegment === 'auth';
    const inOnboardingGroup = firstSegment === 'onboarding';
    const inTabsGroup = firstSegment === '(tabs)';
    const inTabsIndex = firstSegment === '(tabs)' && secondSegment === 'index';

    // Only redirect if we're on the root index page itself
    const segmentsLength = segmentsArray.length;
    const onRootIndex = segmentsLength === 0 || firstSegment === 'index';

    if (!isAuthenticated) {
      if (!inAuthGroup && onRootIndex) {
        router.replace('/auth/login');
      }
    } else if (user) {
      if (user.onboardingCompleted === true) {
        router.replace('/(tabs)/index');
        // User completed onboarding - stay at root '/'
      } else {
        // User hasn't completed onboarding - navigate to onboarding
        // Only redirect from root index, not from auth or other screens
        if (!inOnboardingGroup && onRootIndex) {
          router.replace('/onboarding/about');
        }
      }
    } else {
      if (onRootIndex) {
        router.replace('/auth/login');
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
