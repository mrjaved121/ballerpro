import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="about" />
      <Stack.Screen name="journey" />
      <Stack.Screen name="trainingExperience" />
      <Stack.Screen name="injuries" />
      <Stack.Screen name="mainGoal" />
    </Stack>
  );
}

