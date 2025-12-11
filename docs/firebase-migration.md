# Firebase Migration Plan (Step 1: Auth & Onboarding – Frontend First)

Goal: introduce Firebase Auth alongside existing Node/Mongo API without breaking current flows. We add Firebase behind a feature flag and keep current API calls until validation is done. No backend changes in this step.

## Scope of Step 1
- Add Firebase to the React Native app (Auth + Firestore client).
- Keep existing API calls for auth/onboarding; wire Firebase in parallel via feature flag.
- Do not change backend yet; no schema or API removals.
- Added in code: `USE_FIREBASE_AUTH` flag, Firebase init/auth/firestore helpers, and flag-aware wiring in `AuthContext` and `onboardingService`.

## Feature Flag
- Add a boolean flag (e.g., `USE_FIREBASE_AUTH`) from app config/env.
- When false (default): existing API calls remain.
- When true: use Firebase Auth for sign-in/up/state and Firestore for user profile/onboarding.

## App Changes (non-breaking)
1) Install Firebase packages (expo-managed example):
   - `yarn add firebase`
2) Initialize Firebase in a client module (e.g., `frontend/src/services/firebase.ts`):
   - Import `initializeApp`, `getAuth`, `getFirestore`, `getStorage` (storage used later).
   - Export initialized instances.
3) Auth integration (flagged):
   - Create an auth service wrapper (e.g., `frontend/src/services/firebaseAuth.ts`) that exposes:
     - `signIn(email, password)`
     - `signUp(email, password, displayName?)`
     - `signOutUser()`
     - `onAuthStateChanged` subscription
   - When `USE_FIREBASE_AUTH` is true, UI uses these; otherwise use existing REST calls.
4) User profile/onboarding mirroring (flagged, read/write):
   - Add Firestore helpers (e.g., `frontend/src/services/firebaseUser.ts`):
     - `getUserDoc(uid)` / `setUserDoc(uid, data, merge=true)`
   - Data shape to mirror current Mongo onboarding:
     ```json
     users/{uid} {
       email, name, avatar, isEmailVerified,
       onboarding: {
         step1: { gender },
         step2: { goal, trainingLevel },
         step3: { experienceLevel },
         step4: { injuries: [], otherDetails },
         step5: { goal },
         completed: bool,
         completedAt: timestamp
       },
       createdAt, updatedAt (Firestore timestamps)
     }
     ```
   - Reads: when flag on, read from Firestore; otherwise use current API.
   - Writes: when flag on, write to Firestore; otherwise call existing API.
   - No dual-write yet; API remains source of truth until the flag flips in production.

5) UI wiring (flag-aware):
   - Auth screens (`frontend/app/auth/login.tsx`, `frontend/app/auth/register.tsx`): branch submit handlers based on flag (Firebase vs API).
   - Onboarding screens (`frontend/app/onboarding/*`): branch load/save to Firestore vs API based on flag.
   - Keep Redux/Context shape the same; adapt data mapping so consumers are unchanged.

## Testing Plan (Step 1)
- Local/dev only, with flag enabled:
  - Register/Login via Firebase paths; ensure auth state persists.
  - Onboarding steps write/read to Firestore docs.
  - Verify legacy API still works when flag is off.
- No backend downtime risk; revert by turning flag off.

## Out of Scope (later steps)
- Removing Node/Mongo auth routes/controllers.
- Moving notifications/storage to Firebase.
- Deleting Mongo schemas or Express server.

## Acceptance Criteria for Step 1
- App can switch between legacy API and Firebase via a flag without code edits.
- Firebase Auth sign-in/up works; user doc created/updated in Firestore when flag on.
- Onboarding data reads/writes succeed in Firestore when flag on.
- Legacy paths untouched when flag off.

