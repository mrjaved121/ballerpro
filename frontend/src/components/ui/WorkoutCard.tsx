import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { SIZES } from '@/constants/theme';
import { Button } from '../Button';
import { Workout } from '../../constants/workouts';

interface WorkoutCardProps {
  workout: Workout;
  onStart?: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onStart }) => {
  return (
    <View style={styles.card}>
      {/* Image Placeholder */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>Workout</Text>
        </View>
        {workout.tags && workout.tags.length > 0 && (
          <View style={styles.tagContainer}>
            {workout.tags.map((tag, index) => (
              <View
                key={index}
                style={[
                  styles.tag,
                  tag === 'NEW' && styles.tagNew,
                  tag === 'POPULAR' && styles.tagPopular,
                ]}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.trainLabel}>Train</Text>
            <Text style={styles.title}>{workout.title}</Text>
          </View>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>👤</Text>
          </View>
        </View>

        <Text style={styles.details}>
          {workout.duration} min • {workout.difficulty} • {workout.location}
        </Text>

        <Button
          title="Start Workout"
          onPress={onStart || (() => console.log('Start workout:', workout.id))}
          variant="primary"
          style={styles.startButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.inputBg,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.lg,
  },
  tagContainer: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    gap: spacing.xs,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: SIZES.radiusSm,
  },
  tagNew: {
    backgroundColor: colors.accent,
  },
  tagPopular: {
    backgroundColor: colors.accent,
  },
  tagText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: '#000000',
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  trainLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIconText: {
    fontSize: 16,
  },
  details: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  startButton: {
    width: '100%',
    borderRadius: SIZES.radius,
    height: 48,
  },
});
