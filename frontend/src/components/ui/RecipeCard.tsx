import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING, SIZES, FONTS } from '@/constants/theme';
import { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  item: Recipe;
}

export default function RecipeCard({ item }: RecipeCardProps) {
  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.favoriteBadge}>
          <MaterialIcons 
            name="star" 
            size={20} 
            color={item.isFavorite ? COLORS.accent : COLORS.text} 
          />
        </View>
      </View>
      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.stats}>
          {item.calories} kcal · P:{item.protein} C:{item.carbs} F:{item.fat}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: SPACING.l,
    maxWidth: '48%', // Ensures 2 columns fit with gap
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 3 / 4,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.s,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.blackOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    gap: 4,
  },
  title: {
    color: COLORS.text,
    fontFamily: FONTS.bold,
    fontSize: 16,
    lineHeight: 20,
  },
  stats: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
});
