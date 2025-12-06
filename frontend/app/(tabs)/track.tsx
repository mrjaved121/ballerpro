import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ProgressRing } from '../../src/components/ui/ProgressRing';
import { MacroCard } from '../../src/components/ui/MacroCard';
import { MealItem } from '../../src/components/ui/MealItem';
import { Meal, DailyTarget } from '../../src/types/nutrition';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';
import { Ionicons } from '@expo/vector-icons';

const INITIAL_TARGETS: DailyTarget = {
  calories: 2000,
  macros: {
    protein: 150,
    carbs: 250,
    fats: 70,
  },
};

const INITIAL_MEALS: Meal[] = [
  {
    id: '1',
    name: 'Breakfast',
    description: 'Scrambled Eggs, Toast',
    calories: 520,
    macros: { protein: 30, carbs: 40, fats: 25 },
    icon: 'wb_sunny',
    timestamp: Date.now() - 100000,
  },
  {
    id: '2',
    name: 'Lunch',
    description: 'Chicken Salad',
    calories: 480,
    macros: { protein: 45, carbs: 15, fats: 20 },
    icon: 'lunch_dining',
    timestamp: Date.now() - 50000,
  },
  {
    id: '3',
    name: 'Dinner',
    description: 'Salmon and Veggies',
    calories: 300,
    macros: { protein: 25, carbs: 20, fats: 15 },
    icon: 'dinner_dining',
    timestamp: Date.now(),
  },
];

export default function TrackScreen() {
  const [meals, setMeals] = useState<Meal[]>(INITIAL_MEALS);

  // Computed totals
  const totals = useMemo(() => {
    return meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.macros.protein,
        carbs: acc.carbs + meal.macros.carbs,
        fats: acc.fats + meal.macros.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [meals]);

  const caloriesProgress = Math.min(
    100,
    (totals.calories / INITIAL_TARGETS.calories) * 100
  );

  const handleAddMeal = () => {
    // TODO: Open add meal modal
    console.log('Add meal pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nutrition</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Progress Ring */}
        <ProgressRing
          radius={140}
          stroke={16}
          progress={caloriesProgress}
          target={INITIAL_TARGETS.calories}
          consumed={totals.calories}
        />

        {/* Macro Cards Grid */}
        <View style={styles.macrosContainer}>
          <MacroCard
            label="Protein"
            current={totals.protein}
            total={INITIAL_TARGETS.macros.protein}
          />
          <MacroCard
            label="Carbs"
            current={totals.carbs}
            total={INITIAL_TARGETS.macros.carbs}
          />
          <MacroCard
            label="Fats"
            current={totals.fats}
            total={INITIAL_TARGETS.macros.fats}
          />
        </View>

        {/* Meals List Section */}
        <View style={styles.mealsSection}>
          <View style={styles.mealsHeader}>
            <Text style={styles.mealsTitle}>Today's Meals</Text>
            <TouchableOpacity
              style={styles.addMealButton}
              onPress={handleAddMeal}
              activeOpacity={0.7}
            >
              <Text style={styles.addMealText}>Add Meal</Text>
              <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.mealsList}>
            {meals.length > 0 ? (
              meals.map((meal) => <MealItem key={meal.id} meal={meal} />)
            ) : (
              <View style={styles.emptyState}>
                <Ionicons
                  name="restaurant-outline"
                  size={48}
                  color={colors.textSecondary}
                />
                <Text style={styles.emptyText}>No meals tracked today</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={handleAddMeal}
          activeOpacity={0.8}
        >
          <Ionicons name="barcode-outline" size={24} color={colors.accent} />
          <Text style={styles.scanButtonText}>Scan Barcode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddMeal}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={32} color={colors.text} />
        </TouchableOpacity>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl * 2,
  },
  macrosContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  mealsSection: {
    marginTop: spacing.md,
  },
  mealsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  mealsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    letterSpacing: -0.5,
  },
  addMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  addMealText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
  },
  mealsList: {
    gap: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    backgroundColor: colors.inputBg,
    borderRadius: spacing.lg,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  scanButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.inputBg,
    borderRadius: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  scanButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

