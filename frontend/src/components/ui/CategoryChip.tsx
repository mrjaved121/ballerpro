import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { SIZES } from '@/constants/theme';
import { typography } from '../../theme/typography';

interface CategoryChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: SIZES.radiusFull,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  labelSelected: {
    color: colors.text,
    fontWeight: typography.fontWeight.semibold,
  },
});
