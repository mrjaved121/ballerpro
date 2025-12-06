import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../../src/constants/theme';
import { MoodChip, MoodType } from '../../src/components/ui/MoodChip';
import { StatusBar } from 'expo-status-bar';

const MOODS: { type: MoodType; icon: keyof typeof MaterialIcons.glyphMap }[] = [
  { type: 'Great', icon: 'sentiment-very-satisfied' },
  { type: 'Good', icon: 'sentiment-satisfied' },
  { type: 'Meh', icon: 'sentiment-neutral' },
  { type: 'Tired', icon: 'battery-alert' },
  { type: 'Stressed', icon: 'mood-bad' }
];

export default function TrackScreen() {
  const [selectedMood, setSelectedMood] = useState<MoodType>('Great');
  const [entryText, setEntryText] = useState('');
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Journal</Text>
          <TouchableOpacity style={styles.calendarButton}>
            <MaterialIcons name="calendar-today" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.dateNav}>
          <TouchableOpacity style={styles.navButton}>
            <MaterialIcons name="chevron-left" size={28} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
          <Text style={styles.dateText}>Today, Oct 26</Text>
          <TouchableOpacity style={styles.navButton}>
            <MaterialIcons name="chevron-right" size={28} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>How are you feeling today?</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.moodScroll}
            >
              {MOODS.map((mood) => (
                <MoodChip
                  key={mood.type}
                  mood={mood.type}
                  icon={mood.icon}
                  isSelected={selectedMood === mood.type}
                  onSelect={setSelectedMood}
                />
              ))}
            </ScrollView>
            <View style={styles.composerContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="What's on your mind? How was your workout?"
                  placeholderTextColor={COLORS.textTertiary}
                  multiline
                  textAlignVertical="top"
                  value={entryText}
                  onChangeText={setEntryText}
                  maxLength={1000}
                />
                <View style={styles.toolbar}>
                  <View style={styles.toolbarActions}>
                    <TouchableOpacity style={styles.toolButton}>
                      <MaterialIcons name="image" size={22} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolButton}>
                      <MaterialIcons name="bar-chart" size={22} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolButton}>
                      <MaterialIcons name="location-on" size={22} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.charCount}>{entryText.length}/1000</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
              <Text style={styles.saveButtonText}>Save Journal Entry</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.backgroundDark,
  },
  iconButton: {
    width: 48,
    height: 48,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  calendarButton: {
    width: 48,
    height: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
  dateNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  navButton: {
    padding: SPACING.xs,
    borderRadius: 20,
  },
  dateText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.xs,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 18,
    fontFamily: FONTS.bold,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  moodScroll: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  composerContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    minHeight: 300,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  textInput: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: FONTS.regular,
    fontSize: 16,
    padding: SPACING.md,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  toolbarActions: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  toolButton: {
    padding: SPACING.sm,
  },
  charCount: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontFamily: FONTS.regular,
    marginRight: SPACING.sm,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.backgroundDark,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.bold,
    letterSpacing: 0.5,
  },
});

// This screen is now ready for journal/track tab usage.

