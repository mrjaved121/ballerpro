# CHANGELOG

All major changes, code additions, and organizational work will be tracked here in simple language.

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
