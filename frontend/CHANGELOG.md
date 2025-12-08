# CHANGELOG

All major changes, code additions, and organizational work will be tracked here in simple language.

---

## [ONBOARDING FLOW - COMPLETE FIX] (2025-12-08)
- **Problem:** All onboarding screens showing "Network error, please check your internet connection"
- **Root Cause:** `onboardingService` was making real API calls to non-existent backend
- **Complete Solution Applied:**

### **1. Onboarding Service Rewrite** ✅
  - Completely rewrote `src/services/onboarding/onboardingService.ts`
  - Removed ALL `api.post()` calls (no more network requests)
  - Uses in-memory storage (same pattern as auth service)
  - Added mock delays (200ms) for realistic UX
  - Added comprehensive console logs for debugging
  - Added `saveStep5()` for 5-step flow
  - Added `reset()` method for testing

### **2. Fixed Step Numbering** ✅
  - **Journey** (`journey.tsx`): Now uses `saveStep2()` consistently
  - **Training** (`trainingExperience.tsx`): Changed from `saveStep2` to `saveStep3`
  - **Injuries** (`injuries.tsx`): Changed from `saveStep3` to `saveStep4`
  - **Main Goal** (`mainGoal.tsx`): Already using `saveStep5` correctly

### **3. Added Console Logging** ✅
  - All screens now log save/navigation events
  - Easy to track flow: `[About] → [Journey] → [Training] → [Injuries] → [Main Goal]`
  - Final data logged at completion

### **Complete Flow (5 Steps):**
  ```
  Step 1: About (Gender) → saveStep1
  Step 2: Journey (Goals + Experience) → saveStep2
  Step 3: Training Experience → saveStep3
  Step 4: Injuries → saveStep4
  Step 5: Main Goal → saveStep5 → completeOnboarding()
  ```

- **How it works now:**
  ```typescript
  // OLD (caused network errors):
  await api.post('/onboarding/step1', data);
  
  // NEW (works offline):
  mockOnboardingData = { ...mockOnboardingData, step1: data };
  ```

- **Files Changed:**
  - `src/services/onboarding/onboardingService.ts` - Complete rewrite (no API calls)
  - `app/onboarding/journey.tsx` - Import service, use saveStep2
  - `app/onboarding/trainingExperience.tsx` - Use saveStep3, add logs
  - `app/onboarding/injuries.tsx` - Use saveStep4, add logs
  - `app/onboarding/mainGoal.tsx` - Use saveStep5, add logs

- **Why this matters:** 
  - Onboarding flow now works 100% offline
  - No backend required for frontend testing
  - Easy to swap for real API later
  - Consistent with auth service pattern

- **Status:** ✅ Fixed - Complete 5-step onboarding flow working without network errors

---

## [JOURNEY SCREEN MULTIPLE SUBMIT FIX] (2025-12-08)
- **Problem:** Journey screen Continue button triggered multiple times, causing duplicate saves
- **Root Cause:** No debouncing or loading state to prevent multiple clicks
- **Fixed:**
  - Added `isNavigating` state to track navigation in progress
  - Added early return if already navigating
  - Disabled button while navigating
  - Changed button text to "Loading..." during navigation
  - Added disabled button styling (grey, reduced opacity)
- **Why this matters:** Prevents duplicate data saves and navigation issues
- **Status:** ✅ Fixed - Continue button now only fires once

---

## [ONBOARDING ERROR POPUP SPACING FIXED] (2025-12-08)
- **Problem:** Error messages in onboarding screens had NO space from top, appearing too close to content
- **Root Cause:** errorContainer styles were missing `marginTop` property
- **Fixed:**
  - Added `marginTop: spacing.xl` (32px) to all onboarding error containers
  - Increased padding from `spacing.sm` (8px) to `spacing.md` (16px)
- **Files Changed:**
  - `app/onboarding/about.tsx` - Step 1/5
  - `app/onboarding/trainingExperience.tsx` - Step 3/5
  - `app/onboarding/injuries.tsx` - Step 4/5
  - `app/onboarding/mainGoal.tsx` - Step 5/5
- **Why this matters:** Error messages now have breathing room and are easier to read
- **Status:** ✅ Fixed - All onboarding error popups have 32px space from top

---

## [ERROR POPUP SPACING FIXED - UPDATED] (2025-12-08)
- **Problem:** Error messages in login/register screens too close to input fields
- **Fixed:**
  - `login.tsx`: Added `marginTop: spacing.xl` (32px) to errorContainer
  - `register.tsx`: Added `marginTop: spacing.xl` (32px) to errorContainer
  - Increased padding from `spacing.sm` to `spacing.md` for better visibility
- **Update:** Increased from `spacing.md` (16px) to `spacing.xl` (32px) for more breathing room
- **Why this matters:** Error messages now have proper breathing room and are easier to read
- **Status:** ✅ Fixed - Error messages have proper spacing (32px from top)

---

## [ONBOARDING SCREENS RENAMED & JOURNEY ADDED] (2025-12-08)
- **Feature:** Renamed onboarding steps and added new "Journey" screen
- **Renamed Files:**
  - `step1.tsx` → `about.tsx` (Step 1 of 5)
  - NEW: `journey.tsx` (Step 2 of 5) - Define Your Journey
  - `step2.tsx` → `trainingExperience.tsx` (Step 3 of 5)
  - `step3.tsx` → `injuries.tsx` (Step 4 of 5)
  - `step4.tsx` → `mainGoal.tsx` (Step 5 of 5)
- **New Components Created:**
  - `JourneyGoalCard.tsx` - Responsive grid card for goals (2x2 layout)
  - `SelectionButton.tsx` - Full-width selection button for experience levels
- **New Types:**
  - `src/types/onboarding.ts` - GoalOption, ExperienceLevel interfaces
- **Journey Screen Features:**
  - 2x2 grid of goal cards (Build Muscle, Lose Fat, Improve Endurance, Increase Strength)
  - 4 experience level buttons (Strength Athlete, Endurance Runner, Casual Gym-goer, Beginner)
  - Fully responsive with tablet support (max-width: 600px)
  - useWindowDimensions for responsive layout
  - Saves data to AuthContext
- **Navigation Flow Updated:**
  - About → Journey → Training Experience → Injuries → Main Goal
  - All router.push() calls updated to new file names
  - Progress bars show 1-5 of 5
- **Why this matters:** Better onboarding flow with clearer naming and new journey definition step
- **Status:** ✅ Complete - 5-step onboarding flow ready

---

## [ONBOARDING NAVIGATION IMPROVED] (2025-12-08)
- **Feature:** Enhanced navigation logging for onboarding redirect after signup
- **Updated:**
  - `app/index.tsx`: Added detailed navigation logs with emojis for easier debugging
  - `AuthContext.tsx`: Added log after successful registration showing onboarding status
- **Logging added:**
  - 🔍 Navigation checks with full state info
  - 🚀 Login redirects
  - 🎓 Onboarding redirects (for new users)
  - 🏠 Main app redirects (for completed onboarding)
- **Why this matters:** Makes it easier to debug navigation issues and see exactly when redirects happen
- **Status:** ✅ Enhanced - Should redirect to onboarding after signup with clear console logs

---

## [COMPLETE INPUT COMPONENT REWRITE] (2025-12-08)
- **Problem:** Focus jumping between TextInput fields in Login & Register screens
- **Root Causes:** 
  1. Re-renders from AuthContext `isLoading` causing Input components to remount
  2. Missing React.memo optimization
  3. Shadow effects causing performance issues on focus
- **Complete Rewrite:**
  - `Input.tsx`: Full rewrite with React.memo and custom comparison function
  - Added `useCallback` for all event handlers (prevents recreation on every render)
  - Simplified secureTextEntry logic
  - Removed shadow effects from focused state (performance)
  - Added `underlineColorAndroid="transparent"` and `autoCorrect={false}`
  - Custom memo comparison: only re-render if value, error, or label changes
- **Loading State Fix:**
  - `login.tsx`: Use local `isLoading` state instead of AuthContext
  - `register.tsx`: Use local `isLoading` state instead of AuthContext
- **New Feature:**
  - `debug_tester.tsx`: Manual navigation screen to test any screen directly
  - Added "Tester" tab to bottom navigation
- **Why this matters:** Prevents unnecessary re-renders that cause focus jumping
- **Status:** ✅ Fixed - Inputs should maintain focus now

---

## [INPUT FOCUS LOOP FIX] (2025-12-08)
- **Problem:** Stuck in focus loop between input fields on login/register screens
- **Root Cause:** `selectTextOnFocus={true}` was causing inputs to continuously refocus
- **Fixed:**
  - `Input.tsx`: Removed `selectTextOnFocus` and `editable` props (using defaults)
  - `login.tsx`: Added `returnKeyType` ("next" for email, "done" for password)
  - `register.tsx`: Added `returnKeyType` ("next" for email/password, "done" for confirm)
- **Why this matters:** Users can now type normally and navigate between fields using keyboard
- **Status:** ✅ Fixed - Focus should stay on tapped field

---

## [INPUT FIELDS FIX - LOGIN & REGISTER] (2025-12-08)
- **Problem:** Unable to type in login and register screens
- **Root Cause:** KeyboardAvoidingView behavior blocking input on Android
- **Fixed:**
  - `login.tsx`: Changed KeyboardAvoidingView behavior from 'height' to `undefined` on Android
  - `register.tsx`: Changed KeyboardAvoidingView behavior from 'height' to `undefined` on Android
  - Updated `keyboardShouldPersistTaps` from 'handled' to 'always'
- **Why this matters:** Users can now tap and type in input fields
- **Status:** ✅ Fixed

---

## [AUTH & ONBOARDING FLOW SETUP] (2025-12-08)
- **Feature:** Complete authentication and onboarding system
- **Screen Renames:**
  - `integrations.tsx` → `wearables.tsx` (Wearables & Integrations)
  - `premium.tsx` → `subscription.tsx` (Subscription)
- **New Files Created:**
  - `src/types/auth.ts` - User, auth state, and onboarding types
  - `src/services/auth/storage.ts` - Mock storage service (in-memory)
  - `src/services/auth/authService.ts` - Mock API for login/register/logout
  - `src/contexts/AuthContext.tsx` - Global auth state management
  - `TESTING_GUIDE_AUTH_FLOW.md` - Complete testing guide
- **Updated Files:**
  - `app/index.tsx` - Smart routing based on auth state
  - `app/_layout.tsx` - Fixed AuthContext import path
  - `app/auth/login.tsx` - Integrated with AuthContext
  - `app/auth/register.tsx` - Integrated with AuthContext
  - `app/onboarding/step4.tsx` - Completes onboarding via AuthContext
  - `app/(tabs)/_layout.tsx` - Updated screen names
- **Navigation Flow:**
  - Not authenticated → Login screen
  - Authenticated but no onboarding → Onboarding flow (4 steps)
  - Authenticated + onboarding complete → Main app
- **Demo Account:**
  - Email: `demo@ballerpro.com`
  - Password: `demo123`
  - Status: Onboarding already completed
- **Why this matters:** Full authentication flow ready for testing. Users can register, complete onboarding, login, and logout with proper state management and automatic navigation.
- **Status:** ✅ Ready for testing

---

## [TRAIN SCREEN & SEARCHBAR FIXED] (2025-12-08)
- **Problem:** Train screen crashing with "Element type is invalid: got undefined" error
- **Root Cause #1:** `train.tsx` was using `router.push()` without importing `useRouter` hook
- **Root Cause #2:** `SearchBar.tsx` component didn't accept props, but train.tsx was passing props to it
- **Fixed:** 
  - `train.tsx`: Added `import { useRouter } from 'expo-router'` and hook initialization
  - `SearchBar.tsx`: Made component reusable by adding props interface:
    - `value?: string` - for controlled input
    - `onChangeText?: (text: string) => void` - for text changes
    - `placeholder?: string` - custom placeholder text (defaults to "Search...")
    - `onFilterPress?: () => void` - optional filter button handler
  - Added filter button icon that appears only when `onFilterPress` is provided
- **Why this matters:** SearchBar is now a reusable component across the app (Recipe Library, Train screen, etc.)
- **Status:** ✅ Fixed - Train screen should now work properly

---

## [BORDER RADIUS ERRORS FIXED - ALL FILES] (2025-12-08)
- **Problem:** App was crashing with "Property 'borderRadius' doesn't exist" error across multiple files
- **Root Cause:** Old code was importing `borderRadius` from `../../theme/spacing` which doesn't exist in current theme structure
- **Fixed 18 Files Total:**
  - **Main Screens (2):** `workouts/[id].tsx`, `onboarding/step1.tsx`, `onboarding/step3.tsx`
  - **UI Components (14):** `WorkoutCard`, `VideoPlayer`, `TimerControl`, `TrainingLevelButton`, `TabSwitcher`, `StatCard`, `SelectionCard`, `SocialButton`, `ProgressBar`, `MacroCard`, `MealItem`, `Input`, `InjuryChip`, `GoalCard`, `CategoryChip`, `RecipeCard`
  - **Config (1):** `babel.config.js` - Removed deprecated `expo-router/babel` plugin
- **Solution Applied:**
  - Removed old `import { borderRadius } from '../../theme/spacing'`
  - Added `import { SIZES } from '@/constants/theme'`
  - Replaced all instances:
    - `borderRadius.lg` → `SIZES.radiusLg`
    - `borderRadius.md` → `SIZES.radius`
    - `borderRadius.sm` → `SIZES.radiusSm`
    - `borderRadius.full` → `SIZES.radiusFull`
- **Why this matters:** All border radius values now come from the centralized theme file (`src/constants/theme.ts`), ensuring consistency across the entire app
- **Status:** ✅ Fixed - App should now start without errors

---

## [EXPO SDK 54 DEPENDENCY CONFLICT FIX] (2025-12-08)
- **Issue:** `npx expo install --fix` failed with ERESOLVE dependency conflict
- **Root Cause:** npm couldn't resolve circular dependencies between React 19, React Native 0.81, and expo-router v6
- **Status:** package.json partially updated (main deps ✅, devDeps fixed ✅)
- **Solution:** Use `npm install --legacy-peer-deps` flag to complete installation
- **Fixed DevDependencies:**
  - `@types/react@~18.2.45` → `@types/react@~19.1.10`
  - `typescript@~5.3.3` → `typescript@~5.9.2`
- **Documentation Created:**
  - `FIX_DEPENDENCY_CONFLICT.md` - Detailed explanation and 3 fix options
  - `QUICK_FIX_NOW.md` - Copy-paste commands to fix immediately
  - `EXPO_54_UPGRADE_GUIDE.md` - Complete SDK 54 upgrade guide
  - `UPGRADE_TROUBLESHOOTING.md` - Common issues and solutions
- **Next Step:** Run `npm install --legacy-peer-deps` to complete upgrade

---

## [EXPO DOCTOR FIXES] (2025-12-08)
- **Fixed 4 Critical Issues** identified by `npx expo-doctor`
- **Issue 1 - Missing Images:** Removed references to non-existent icon/splash assets from `app.json`
- **Issue 2 - Missing Dependencies:** Added 4 critical peer dependencies:
  - `expo-constants@~16.0.0` (required by expo-router)
  - `expo-linking@~6.3.0` (required by expo-router)
  - `react-native-screens@~3.31.0` (required by expo-router)
  - `expo-font@~12.0.0` (required by @expo/vector-icons)
- **Issue 3 - Version Conflicts:** Package.json updated to resolve @expo/config-plugins version mismatch
- **Issue 4 - Outdated Packages:** Updated to Expo SDK 51 compatible versions:
  - `react-native@0.74.5` (was 0.74.0)
  - `react-native-safe-area-context@4.10.5` (was 4.10.0)
  - `typescript@~5.3.3` (was ^5.1.3)
- **Added Script:** `npm run doctor` for quick health checks
- **Documentation:** Created `FIXES_APPLIED.md` with detailed explanation and install steps
- **Next Step:** Run `npm install` to apply all fixes

---

## [DEBUG/TESTING HUB] (2025-12-08)
- **Visual Testing Screen Created:** New `app/(tabs)/debug.tsx` with organized list of ALL screens
- **Categories:** Main Tabs, Tracking & Habits, Community, Nutrition, Merch & Shop, Account, Auth & Onboarding
- **Features:**
  - One-tap navigation to any screen for visual testing
  - Screen status indicators (Ready/WIP/Pending)
  - Screen descriptions and route paths
  - 28 screens organized for easy testing
- **Tab Navigation Updated:** Added Debug tab (first position) with bug icon
- **Hidden Screens:** All non-main-tab screens hidden from bottom nav (accessible via debug or programmatic navigation)
- **Purpose:** Manual visual testing without Android Studio—works with Expo Go, web preview, or iOS
- **No linter errors**

---

## [INTEGRATIONS SCREEN] (2025-12-06)
- **Theme extended:** Added all brand, error, and highlight tokens for integrations settings in `constants/theme.ts`.
- **Integration types added:** Created TypeScript type for all attributes in `types/integration.ts`.
- **IntegrationRow component:** Built reusable IntegrationRow for connection toggles, icons, and error states.
- **Screen added:** `/app/(tabs)/integrations.tsx` built for all integrations, handling connected/available sections and toggle actions.
- **Linter check:** All files checked—no errors found.

---

## [REFERRAL CENTER SCREEN] (2025-12-06)
- **Theme updated:** Added glassy surface, highlight, green success, gold, and mono font for codes in `constants/theme.ts`.
- **Referral types added:** New status/type for referral tracking in `types/referral.ts`.
- **Components created:**
  - `ReferralCodeCard.tsx`: Invite code with copy.
  - `ReferralTabs.tsx`: Tab bar for Pending/Confirmed/Rewarded.
  - `ReferralListItem.tsx`: For each referral (shows status, badge).
- **Screen:** Added `app/(tabs)/referral.tsx` with full code for tab filtering, invite, share, promo, and list.
- **Linter check:** All files linted, no errors found.

---

## [GO PREMIUM SCREEN] (2025-12-06)
- **Theme extended**: Added new tokens in `src/constants/theme.ts` for premium design: accent gold, surfaceHighlight, status red, and advanced spacing/radius/fonts.
- **Added StatusBanner**: Reusable notification for trial status.
- **Added PlanCard**: Subscription option card with “best value”, price, and feature list.
- **Screen integration**: Main `app/(tabs)/premium.tsx` manages status banner, cards, selection logic, and fixed upgrade/restore footer.
- **Linter check**: All files linted, no errors found.

---

## [INIT] Project Structure & Workflow (2025-12-06)
- Analyzed project organization and codebase layout.
- Established source code folders for: `components`, `features`, `theme`, `constants`, `services`, `mocks`, and others.
- Confirmed use of Expo, Expo Router, custom theme system, and TypeScript.
- Decided to use best theme practices for UI with custom `/src/theme`.
- Set up workflow: user builds components with Gemini Pro, sends the code with the intended screen/role, and I guide placement, organization, and documentation.
- Will use mock data for all frontend development until backend is ready.
- Added this changelog to track every update with clear, easy comments for you!

## [MACRO CALCULATOR SCREEN] (2025-12-06)
- Added the Macro Calculator screen at `app/(tabs)/calculator.tsx`.
- Updated `src/constants/theme.ts` for new red, surface, accent, blue colors, and sharp radii for inputs/buttons per design.
- Added reusable UI components:
  - `SegmentedControl.tsx` for toggles
  - `InputWithUnit.tsx` for labeled numeric entry
  - `MacroResultCard.tsx` for showing donut chart & macro breakdown.
- All styling and structure uses only React Native primitives and `StyleSheet`, with correct theme imports.
- Checked everything for linter errors—none were found after this update.

## [HABIT TRACKER] Added new Habit Tracker screen and supporting components (2025-12-06)
- Added a new Habit Tracker screen as a mobile tab (`/app/(tabs)/habit.tsx`).
- Converted all supporting habit components (Header, StreakCard, HabitList, HabitItem, FAB, AddHabitModal) to React Native and placed them in `/src/components/ui/`.
- Created supporting files for habit types and mock data: `/src/types/habit.ts` and `/src/constants/habits.ts`.
- Used only React Native primitives, theme colors, and Expo vector icons—no web code!

## [TRACK TAB] Added Track (Journal) tab and all required supporting files (2025-12-06)
- Integrated new journal screen as `track.tsx` in `/app/(tabs)`, fully functional.
- Added supporting component `MoodChip` (`/src/components/ui/MoodChip.tsx`), theme system (`/src/constants/theme.ts`).
- Ensured all code is using React Native primitives, imported fonts, and Expo/vector icons.
- Ran code linting: No linter errors found in the new tab, component, or theme files.

## [BUGFIX] Fixed HabitTracker icon names in mock data (2025-12-06)
- Changed all icons in `INITIAL_HABITS` (`src/constants/habits.ts`) to kebab-case (e.g. `water-drop`, `menu-book`, `directions-run`, `self-improvement`) for compatibility with MaterialIcons from `@expo/vector-icons`. All icons now render correctly.

## [LEADERBOARD SCREEN] Integrated new Leaderboard screen and supporting components (2025-12-06)
- Added leaderboard screen as `/app/(tabs)/leaderboard.tsx`, including LeaderboardTabs, LeaderboardRow, and CurrentUserCard components in `/src/components/ui/`.
- Refactored theme to match new design tokens and layout/spacing conventions in `/src/constants/theme.ts`.
- Added leaderboard-related types to `/src/types/leaderboard.ts`.
- Everything was linted—no linter errors found after integration.

---

## [MERCH SHOP SCREEN] (2025-12-07)
- **Theme updated:** Added and adjusted tokens for Merch Shop (white, accent gold, new highlight, radiusFull, spacing updates, and more) in `src/constants/theme.ts`. This update keeps all existing tokens used by previous screens intact.
- **Type definitions:** Added `Product` and `Category` types for merch in `src/types/merch.ts` for consistent type safety.
- **Reusable components:**
  - `CategoryFilter.tsx`: Tab/category selector UI for filtering products.
  - `ProductCard.tsx`: Card for rendering product image, title, and price (with gold accent for featured items).
- **Screen:** Added `app/(tabs)/shop.tsx` for Merch Shop, including mock data, FlatList grid, and a badge for cart quantity. All styles follow your project theme system and avoid web code.
- **Linter check:** All new files clean—no linter errors found.

---

## [PRODUCT DETAILS SCREEN] (2025-12-07)
- **Integrated new product details set:** Added `product_detail.tsx` (Performance Tech Tee details) as a tab, with all UI and logic running on mock data.
- **Reusable components for this flow:**
  - `ProductCarousel.tsx`: Horizontal carousel for product images.
  - `OptionSelector.tsx`: Used for color swatches and size pickers with disabled and strikethrough logic.
  - `QuantityCounter.tsx`: Simple plus/minus with quantity display and label.
- **Theme updated:** Added missing tokens (black, blue, disabled) and adapted `radiusLg` as needed for these screens.
- **No API, no navigation hooks yet:** All actions are local mock logic; not wired to a backend or navigation stack.
- **Lint check:** All new files are clean, no errors.
- **Linked workflow:** This detail set is associated with the Merch Shop feature for clear project structure.

---

## [MY CART SCREEN] (2025-12-07)
- **Integrated as a set:** Added all files for My Cart grouped together—just like Shop & Product Details before.
- **Theme:** Updated COLORS in `constants/theme.ts` to add 'danger' for delete actions. No existing tokens were removed/renamed, so all features remain compatible.
- **Type definitions:** Added `CartItem` to `types/cart.ts` for type-safe cart state.
- **Reusable components (for cart):**
  - `CartItemRow.tsx`: Cart row with image, details, quantity controls, and delete button.
  - `CartSummary.tsx`: Footer for subtotal and checkout logic.
- **Screen:** Added `app/(tabs)/cart.tsx` for the full cart experience. All actions are purely local mock logic for frontend/testing use.
- **Lint check:** All files clean, zero linter errors post-integration.

---

## [PAYMENT SUMMARY SCREEN] (2025-12-07)
- **Added as a group for checkout:** Integrated the entire Payment Summary (bottom sheet/modal) as a set: `checkout.tsx` in tabs, plus supporting components.
- **Theme tokens:** Added/ensured: `surfaceHighlight`, `border`, `gold`, and `radiusXl` to `constants/theme.ts` for proper visual fidelity to the design. No tokens removed or renamed, ensuring robust design system support.
- **Supporting UI:**
  - `PaymentInfoRow.tsx`: Used for shipping/payment method rows, supports both icons and images.
  - `PriceBreakdownRow.tsx`: Used for line items and total, with gold accent for total value.
  - `PayButton.tsx`: Apple Pay-style button, full width, with SVG icon.
- **Screen:** `app/(tabs)/checkout.tsx` (styled as a modal/bottom sheet, using only mock/local data).
- **Lint check:** All new files are clean, no errors after integration.

---

## [ORDER HISTORY SCREEN] (2025-12-07)
- **Integrated as a grouped feature:** Added Order History main screen (`order_history.tsx` tab) and OrderCard component as a single set, cleanly isolated.
- **Theme tokens:** Added all relevant palette tokens for order status display (`accent`, `success`, `info`, `processing`), card backgrounds, and secondary text—*never removed or renamed old tokens*.
- **Order logic/types:** Added `types/order.ts` for safe status, price, and order shape.
- **Component:** `OrderCard.tsx` handles dot/status color, gold order #, and right chevron.
- **Screen:** All is mock data, no API or navigation logic.
- **Linter:** No errors after all new files added.

---

## [NOTIFICATIONS INBOX] (2025-12-07)
- **Grouped as a complete feature:** Added Notifications main tab (`notifications.tsx`), supporting NotificationRow component, and notification model/type for full local and mock logic.
- **Theme:** Added notification-specific color tokens (`primaryTint`, `primaryTintStrong`, `whiteTint`, `goldTint`, `accentGold`) without breaking any other screen's palette.
- **Types:** Added NotificationType and NotificationItem to `types/notification.ts`.
- **UI component:** NotificationRow for correct color, avatar, dot logic, and icon rendering.
- **Screen:** Tab is fully front-end mock logic (no API, no unrelated file changes).
- **Linter:** All files clean—zero linter errors found after adding.

---

## [SETTINGS SCREEN] (2025-12-07)
- **All grouped for clarity:** Integrated main Settings tab (`settings.tsx`), SettingsRow and SettingsSection supporting components, all as one feature group.
- **Theme:** Added/ensured new tokens for glassy backgrounds, gold, border, RGBA textSecondary, shadow red, and core radii for smooth UI. Did not break or remove any existing tokens.
- **All logic is local (no nav, no API hooks).**
- **Linter:** All files checked and error-free after integration.
