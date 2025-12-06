import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../../constants/theme';

export type MoodType = 'Great' | 'Good' | 'Meh' | 'Tired' | 'Stressed';

interface MoodChipProps {
  mood: MoodType;
  icon: keyof typeof MaterialIcons.glyphMap;
  isSelected: boolean;
  onSelect: (mood: MoodType) => void;
}

export const MoodChip: React.FC<MoodChipProps> = ({ mood, icon, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(mood)}
      style={[
        styles.container,
        isSelected ? styles.selectedContainer : styles.unselectedContainer,
      ]}
      activeOpacity={0.7}
    >
      <MaterialIcons
        name={icon}
        size={20}
        color={isSelected ? COLORS.gold : 'rgba(255, 255, 255, 0.7)'}
      />
      <Text
        style={[
          styles.text,
          { color: isSelected ? COLORS.gold : 'rgba(255, 255, 255, 0.7)' },
        ]}
      >
        {mood}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    paddingRight: 16,
    borderRadius: 999,
    marginRight: SPACING.sm,
    height: 36,
    justifyContent: 'center',
  },
  selectedContainer: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.gold,
    paddingLeft: 10,
  },
  unselectedContainer: {
    backgroundColor: COLORS.surface,
    borderWidth: 0,
    paddingLeft: 12,
  },
  text: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    marginLeft: SPACING.sm,
    lineHeight: 20,
  },
});
