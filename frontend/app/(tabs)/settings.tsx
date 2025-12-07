import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SIZES } from '@/constants/theme';
import SettingsSection from '@/components/ui/SettingsSection';
import SettingsRow from '@/components/ui/SettingsRow';

export default function SettingsScreen() {
  const handlePress = (item: string) => {
    console.log(`Pressed: ${item}`);
  };
  const handleLogout = () => {
    console.log('Logging out...');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsRow 
            icon="person"
            label="Profile"
            onPress={() => handlePress('Profile')}
          />
          <SettingsRow
            icon="workspace-premium"
            label="Manage Plan"
            iconColor={COLORS.gold}
            isLast
            onPress={() => handlePress('Manage Plan')}
          />
        </SettingsSection>
        {/* Connectivity & Support Section */}
        <SettingsSection title="Connectivity & Support">
          <SettingsRow
            icon="watch"
            label="Device Connections"
            onPress={() => handlePress('Device Connections')}
          />
          <SettingsRow
            icon="help-outline"
            label="Help & Support"
            isLast
            onPress={() => handlePress('Help & Support')}
          />
        </SettingsSection>
        {/* Information Section */}
        <SettingsSection title="Information">
          <SettingsRow
            icon="shield"
            label="Legal"
            isLast
            onPress={() => handlePress('Legal')}
          />
        </SettingsSection>
        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={24} color={COLORS.text} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.l,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 32,
    fontFamily: FONTS.bold,
  },
  scrollContent: {
    paddingHorizontal: SPACING.m,
    paddingBottom: SPACING.xxl,
  },
  logoutContainer: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.xs,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: SIZES.radius,
    gap: SPACING.s,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  logoutText: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});
