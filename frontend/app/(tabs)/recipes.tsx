import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from '@/constants/theme';
import { MOCK_RECIPES } from '@/constants/recipes';
import SearchBar from '@/components/ui/SearchBar';
import FilterList from '@/components/ui/FilterList';
import RecipeCard from '@/components/ui/RecipeCard';

export default function RecipesScreen() {
  const renderHeader = () => (
    <View>
      <SearchBar />
      <FilterList />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recipe Library</Text>
        <View style={styles.iconButton} /> {/* Spacer */}
      </View>
      {/* Main Content Grid */}
      <FlatList
        data={MOCK_RECIPES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <MaterialIcons name="add" size={32} color={COLORS.background} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.s,
    marginBottom: SPACING.s,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    flex: 1,
  },
  iconButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  listContent: {
    paddingBottom: 100, // Space for FAB
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
    gap: SPACING.l, // Horizontal gap
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});
