import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { GoalCard } from '../../src/components/ui/GoalCard';
import { Button } from '../../src/components/Button';
import { onboardingService } from '../../src/services/onboarding/onboardingService';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

type GoalType = 'muscle-gain' | 'fat-loss' | 'maintenance';

const GOAL_OPTIONS = [
  {
    id: 'muscle-gain' as GoalType,
    title: 'Muscle Gain',
    description: 'Build lean mass and increase strength.',
    icon: 'fitness_center',
  },
  {
    id: 'fat-loss' as GoalType,
    title: 'Fat Loss',
    description: 'Reduce body fat while preserving muscle.',
    icon: 'local_fire_department',
  },
  {
    id: 'maintenance' as GoalType,
    title: 'Maintenance',
    description: 'Maintain your current physique and fitness level.',
    icon: 'balance',
  },
];

export default function OnboardingStep4() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<GoalType | null>('fat-loss');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    if (!selectedGoal) {
      setError('Please select a goal');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Save step 4 and complete onboarding
      await onboardingService.saveStep4({
        goal: selectedGoal,
      });
      
      // Navigate to main app
      router.replace('/(tabs)');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to complete. Please try again.';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.stepText}>Step 4 of 5</Text>
      </View>

      <View style={styles.progressContainer}>
        <ProgressBar currentStep={4} totalSteps={5} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>What's Your Main{'\n'}Goal?</Text>

          <View style={styles.goalsContainer}>
            {GOAL_OPTIONS.map((option) => (
              <GoalCard
                key={option.id}
                id={option.id}
                title={option.title}
                description={option.description}
                icon={option.icon}
                isSelected={selectedGoal === option.id}
                onSelect={(id) => setSelectedGoal(id as GoalType)}
              />
            ))}
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={isLoading ? 'Completing...' : 'Continue'}
          onPress={handleContinue}
          variant="primary"
          style={styles.continueButton}
          disabled={!selectedGoal || isLoading}
          loading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
    gap: spacing.lg,
  },
  backButton: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  stepText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  progressContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
    letterSpacing: -0.5,
    marginBottom: spacing.xl,
  },
  goalsContainer: {
    gap: spacing.md,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background,
  },
  continueButton: {
    width: '100%',
    borderRadius: 9999,
    height: 56,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  errorContainer: {
    marginBottom: spacing.md,
    padding: spacing.sm,
    backgroundColor: `${colors.error}20`,
    borderRadius: spacing.sm,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
  },
});

