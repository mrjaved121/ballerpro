import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface MacroCardProps {
  label: string;
  current: number;
  total: number;
}

export const MacroCard: React.FC<MacroCardProps> = ({
  label,
  current,
  total,
}) => {
  const progress = Math.min(100, (current / total) * 100);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valuesContainer}>
        <Text style={styles.currentValue}>{current}g</Text>
        <Text style={styles.totalValue}> / {total}g</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.inputBg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
  },
  valuesContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  totalValue: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: colors.inputBg,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});
