# Visual Testing Guide

This guide explains how to test all screens in your BallerPro app visually without needing Android Studio.

---

## 🚀 Quick Start

### Option 1: Test on Your Phone (Recommended - No Android Studio!)

1. **Install Expo Go** on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Start the development server:**
   ```bash
   cd frontend
   npm start
   ```

3. **Scan the QR code** with:
   - iOS: Camera app
   - Android: Expo Go app

4. **Open the Debug tab** (first tab with bug icon 🐛)

5. **Tap any screen** to test it visually!

---

### Option 2: Test in Web Browser

1. **Start the development server:**
   ```bash
   cd frontend
   npm start
   ```

2. **Press `w`** in the terminal to open in web browser

3. **Navigate to Debug tab** (first tab)

4. **Click any screen** to test it

> **Note:** Some React Native features may not work perfectly in web (camera, native animations, etc.)

---

## 📱 Using the Debug Screen

### Screen Categories

The Debug screen organizes all 28 screens into logical categories:

1. **Main Tabs** (5 screens)
   - Home Dashboard, Train, Track, Community, More

2. **Tracking & Habits** (1 screen)
   - Habit Tracker

3. **Community Features** (1 screen)
   - Leaderboard

4. **Nutrition & Health** (3 screens)
   - Recipe Library, Macro Calculator, Rehab & Prevention

5. **Merch & Shop** (5 screens)
   - Merch Shop, Product Details, Cart, Checkout, Order History

6. **Account & Settings** (5 screens)
   - Settings, Notifications, Integrations, Premium, Referral Center

7. **Auth & Onboarding** (6 screens)
   - Login, Register, Onboarding Steps 1-4

### Screen Status Indicators

- 🟢 **Ready** - Screen is complete and ready for testing
- 🔵 **WIP** - Work in progress, may have missing features
- ⚪ **Pending** - Not yet implemented

### Testing a Screen

1. Tap/click any screen card
2. The screen will open in full view
3. Interact with all UI elements
4. Use device back button or swipe to return to Debug screen
5. Test next screen

---

## 🔍 What to Test

### Visual Testing Checklist

For each screen, verify:

- [ ] **Layout** - Does it match the design?
- [ ] **Colors** - Are theme colors consistent?
- [ ] **Typography** - Are fonts correct?
- [ ] **Spacing** - Is padding/margin consistent?
- [ ] **Icons** - Do all icons display?
- [ ] **Images** - Do images load?
- [ ] **Buttons** - Do buttons respond to taps?
- [ ] **Lists** - Do scrollable lists work?
- [ ] **Forms** - Do inputs accept text?
- [ ] **Navigation** - Do links work?
- [ ] **Modals** - Do modals open/close?
- [ ] **Animations** - Are transitions smooth?

### Testing on Different Devices

Test on multiple screen sizes:
- Small phone (iPhone SE, etc.)
- Medium phone (iPhone 12/13/14)
- Large phone (iPhone Pro Max, etc.)
- Tablet (iPad, etc.)

---

## 🐛 Common Issues & Solutions

### Screen Won't Open
**Problem:** Tapping a screen does nothing
**Solution:** 
- Check terminal for error messages
- Make sure the screen file exists in `app/(tabs)/`
- Verify all imports are correct

### White Screen / Blank Screen
**Problem:** Screen opens but shows nothing
**Solution:**
- Check for JavaScript errors in terminal
- Verify all required props are provided
- Check theme imports (COLORS, SPACING, etc.)

### Style Issues
**Problem:** Colors, spacing, or fonts look wrong
**Solution:**
- Verify `src/constants/theme.ts` has all required tokens
- Check component imports from `@/constants/theme`
- Ensure StyleSheet is used (not inline styles)

### Navigation Not Working
**Problem:** Can't navigate between screens
**Solution:**
- Use `router.push()` from `expo-router`
- Verify route paths match file structure
- Check that screens are registered in `_layout.tsx`

### Expo Go Connection Issues
**Problem:** Can't connect to dev server
**Solution:**
- Make sure phone and computer are on same WiFi
- Try `npm start --tunnel` for remote testing
- Restart Expo Go app and dev server

---

## 📊 Testing Progress Tracker

Use this checklist to track which screens you've tested:

### Main Tabs
- [ ] Home Dashboard
- [ ] Train
- [ ] Track  
- [ ] Community
- [ ] More

### Tracking & Habits
- [ ] Habit Tracker

### Community Features
- [ ] Leaderboard

### Nutrition & Health
- [ ] Recipe Library
- [ ] Macro Calculator
- [ ] Rehab & Prevention

### Merch & Shop
- [ ] Merch Shop
- [ ] Product Details
- [ ] Cart
- [ ] Checkout
- [ ] Order History

### Account & Settings
- [ ] Settings
- [ ] Notifications
- [ ] Integrations
- [ ] Premium
- [ ] Referral Center

### Auth & Onboarding
- [ ] Login
- [ ] Register
- [ ] Onboarding Step 1
- [ ] Onboarding Step 2
- [ ] Onboarding Step 3
- [ ] Onboarding Step 4

---

## 💡 Tips for Effective Testing

1. **Test One Category at a Time** - Don't rush through all screens
2. **Take Screenshots** - Document issues with screenshots
3. **Test User Flows** - Navigate through related screens (e.g., Shop → Product → Cart → Checkout)
4. **Test Edge Cases** - Empty states, long text, missing data
5. **Test Interactions** - Buttons, forms, toggles, sliders
6. **Check Animations** - Screen transitions, loading states
7. **Verify Data** - Make sure mock data displays correctly
8. **Test Dark/Light Themes** - If you have theme switching

---

## 🔧 Removing Debug Screen (Production)

When ready for production, remove the debug screen:

1. Delete `frontend/app/(tabs)/debug.tsx`
2. In `frontend/app/(tabs)/_layout.tsx`, remove:
   ```tsx
   <Tabs.Screen
     name="debug"
     options={{...}}
   />
   ```

Or just set `href: null` to hide it:
```tsx
<Tabs.Screen name="debug" options={{ href: null }} />
```

---

## 📝 Reporting Issues

When you find issues during testing:

1. **Note the screen name** - Use exact name from Debug screen
2. **Describe the issue** - What's wrong? What did you expect?
3. **Steps to reproduce** - How to trigger the issue
4. **Screenshot** - Visual proof is helpful
5. **Device info** - Phone model, OS version, Expo Go version

Example:
```
Screen: Product Details
Issue: "Add to Cart" button not responding
Steps: Open shop → tap product → tap "Add to Cart"
Expected: Item added to cart, show confirmation
Actual: Nothing happens
Device: iPhone 13, iOS 17.1, Expo Go 2.30.0
Screenshot: [attached]
```

---

## 🎯 Next Steps After Visual Testing

Once all screens pass visual testing:

1. **Integration Testing** - Test navigation flows between screens
2. **State Management** - Verify data updates across screens
3. **API Integration** - Replace mock data with real API calls
4. **Performance Testing** - Check for lag, memory issues
5. **User Testing** - Get feedback from real users
6. **Production Build** - Create release builds for App Store/Play Store

---

**Happy Testing! 🚀**

For questions or issues, refer to the CHANGELOG.md for recent updates and changes.

