import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { SIZES } from '@/constants/theme';
import { typography } from '../../theme/typography';
import { Ionicons } from '@expo/vector-icons';

interface SelectionCardProps {
  title: string;
  description: string;
  iconName: string;
  isSelected: boolean;
  onPress: () => void;
}

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  footprint: 'footsteps',
  fitness_center: 'barbell',
  weight: 'fitness',
};

export const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  description,
  iconName,
  isSelected,
  onPress,
}) => {
  const icon = iconMap[iconName] || 'fitness';

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
          <Ionicons
            name={icon}
            size={24}
            color={isSelected ? colors.accent : colors.textSecondary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, isSelected && styles.titleSelected]}>
            {title}
          </Text>
          <Text style={[styles.description, isSelected && styles.descriptionSelected]}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: spacing.lg,
    borderRadius: SIZES.radiusLg,
    backgroundColor: colors.inputBg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.inputBg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${colors.accent}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerSelected: {
    backgroundColor: `${colors.accent}33`,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  titleSelected: {
    color: colors.text,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  descriptionSelected: {
    color: colors.textSecondary,
  },
});
