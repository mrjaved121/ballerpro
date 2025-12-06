import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Ionicons } from '@expo/vector-icons';

interface MealItemProps {
  meal: {
    id: string;
    name: string;
    description: string;
    calories: number;
    icon?: string;
  };
}

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  wb_sunny: 'sunny',
  lunch_dining: 'restaurant',
  dinner_dining: 'restaurant',
  default: 'restaurant',
};

export const MealItem: React.FC<MealItemProps> = ({ meal }) => {
  const iconName = meal.icon
    ? iconMap[meal.icon] || 'restaurant'
    : 'restaurant';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={24} color={colors.accent} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{meal.name}</Text>
        <Text style={styles.description}>{meal.description}</Text>
      </View>
      <Text style={styles.calories}>{meal.calories} kcal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  calories: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
});
