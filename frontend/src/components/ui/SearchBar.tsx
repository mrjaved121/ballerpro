import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING, SIZES, FONTS } from '@/constants/theme';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="search" size={24} color={COLORS.textSecondary} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search recipes..."
        placeholderTextColor={COLORS.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    marginHorizontal: SPACING.l,
    marginBottom: SPACING.m,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontFamily: FONTS.regular,
    fontSize: 16,
    paddingRight: SPACING.m,
  },
});
