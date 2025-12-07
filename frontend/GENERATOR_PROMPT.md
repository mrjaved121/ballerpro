# React Native Component/Screen Generation Prompt

---

**PROMPT:**

I am building a mobile app in React Native using Expo and the file structure below. 

- Strictly output ONLY React Native `.tsx` and relevant `.ts` files for use in this codebase—no HTML, no `index.html`, no `index.tsx`, and no metadata.json.
- All styles must use React Native's `StyleSheet` (no web/Tailwind/classNames). Use only valid React Native primitives (`View`, `Text`, `TouchableOpacity`, etc.).
- Do not output any web or Next.js/Remix files. Omit any JSON config, .html, assets, or service worker files.
- Any mock data, types, or theme constants should respect my project's structure (see below).
- All imports of components, theme, or types must work with these folders:

**Project Structure:**

```
frontend/
  src/
    constants/
      theme.ts
      habits.ts
    types/
      habit.ts
    components/
      ui/
        (your generated components go here)
  app/
    (tabs)/
      (one file per screen: habit.tsx, track.tsx, community.tsx, etc.)
    _layout.tsx
```

When generating a new screen:
- The main screen should be placed as `app/(tabs)/SCREEN_NAME.tsx`.
- All supporting UI components to be written as `.tsx` and placed in `src/components/ui/COMPONENT_NAME.tsx`.
- Any associated types should extend `src/types/` files if needed.
- If images/assets are required, assume they go in `src/assets` (but only output the component code, no asset files).

**DO NOT output or reference:**
- index.html
- index.tsx
- metadata.json
- Web/CSS code or className attributes
- Asset files themselves (just reference/assume them)

If the UI uses a theme, import tokens from `src/constants/theme.ts` as `import { COLORS, SPACING, FONTS } from '@/constants/theme'`.
If you generate mock data or types, put them in `src/constants/` or `src/types/` and keep them TypeScript style.

**Summary:**
- Only output .tsx/.ts files (no web files at all!)
- Use React Native primitives plus project theme
- Place each file in the correct folder above
- No boilerplate, index.html, index.tsx, config/metadata JSON

---

If you do not follow these rules, your code will NOT work in my project. Thank you!
