import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: "#FF3B30",        // Red (Active Switch/Apple Health)
  background: "#121212",     // Dark Background
  surface: "rgba(255, 255, 255, 0.05)", // Glassy for settings list
  surfaceHighlight: "rgba(255, 255, 255, 0.1)",
  text: "#EAEAEA",   // Primary Text (light grey/white)
  textSecondary: "rgba(245,245,245,0.5)", // For settings dim text
  error: "#FF453A",          // Error Red
  accent: "#FFD700", // Gold for order numbers
  success: "#22C55E", // Delivered
  info: "#3B82F6", // Shipped
  processing: "#EF4343", // Processing red
  border: "rgba(255,255,255,0.1)",
  shadowRed: "rgba(255, 59, 48, 0.3)",
  // Brand Colors
  appleHealth: "#FF3B30",
  garmin: "#0EA5E9", // Sky Blue
  googleFit: "#3B82F6", // Blue
  whoop: "#EAB308", // Yellow
  strava: "#EA580C", // Orange
  gold: "#FFD700", // Gold accent for mood chips or rewards
  white: "#FFFFFF",        // Added for Merch Shop badges and highlights
  blue: "#3B82F6",
  black: "#000000",
  danger: "#EF4444", // Red for delete actions
  disabled: "rgba(255, 255, 255, 0.2)",
  accentGold: "#FFD700", // Gold for notification icons
  primaryTint: "rgba(239, 67, 67, 0.1)", // bg-primary/10
  primaryTintStrong: "rgba(239, 67, 67, 0.2)", // Icon bg
  whiteTint: "rgba(255, 255, 255, 0.1)",
  goldTint: "rgba(255, 215, 0, 0.2)",
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16, // Keeping 16 for codebase consistency (was 12 in shop)
  l: 24,
  xl: 32,
  xxl: 40, // Added xxl as in shop (optional)
};

export const FONTS = {
  regular: "Lexend-Regular",
  medium: "Lexend-Medium",
  bold: "Lexend-Bold",
};

export const SIZES = {
  radius: 12, // settings
  radiusLg: 12,
  radiusSm: 8,
  radiusFull: 9999,
  iconSize: 24,
};

export const LAYOUT = {
  window: { width, height },
  radius: {
    s: 8,
    m: 16,
    l: 24,
    full: 9999,
  },
};
