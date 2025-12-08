# 🔧 Expo SDK 54 Upgrade Troubleshooting

Quick reference for common issues during/after SDK 54 upgrade.

---

## 🚨 **During Upgrade (Steps 1-3)**

### ❌ "Cannot find module 'expo'"

**When it happens:** After Step 1 (npm install expo@^54.0.0)

**Why:** Node.js module cache is stale

**Fix:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

### ❌ "Peer dependency warnings"

**When it happens:** After Step 2 (npx expo install --fix)

**Why:** Some packages have unmet peer dependencies

**Fix:**
```bash
# Run fix again
npx expo install --fix

# If still fails, force install
npm install --legacy-peer-deps
```

---

### ❌ "expo-doctor shows errors"

**When it happens:** Step 3 (npx expo-doctor)

**Why:** Package versions still incompatible

**Fix:**
```bash
# Try auto-fix again
npx expo install --fix

# Run doctor with verbose output
npx expo-doctor --verbose

# Install specific missing packages
npx expo install [package-name]
```

---

## 🐛 **After Upgrade (App Runtime)**

### ❌ "Metro bundler won't start"

**Symptoms:**
```
Error: Unable to resolve module...
Metro bundler has encountered an error...
```

**Fix:**
```bash
# Clear all caches
npx expo start --clear

# If still fails, nuclear option
rm -rf node_modules .expo
npm install
npx expo start --clear
```

---

### ❌ "App crashes on startup"

**Symptoms:**
- White screen
- Immediate crash
- "Unable to boot device" error

**Fix:**
```bash
# 1. Clear Expo Go cache (on phone)
# - Open Expo Go → Settings → Clear cache

# 2. Restart dev server with clear
npx expo start --clear

# 3. Try tunnel mode
npx expo start --tunnel

# 4. Check terminal for specific error
# Read the red error message carefully
```

---

### ❌ "Navigation not working"

**Symptoms:**
- Tapping screens does nothing
- "Cannot push route" error
- Navigation crashes app

**Possible causes:**
1. expo-router v4 breaking changes
2. Route file structure changed
3. Missing navigation dependencies

**Fix:**
```bash
# 1. Check expo-router version
npm list expo-router

# 2. Reinstall navigation packages
npx expo install expo-router react-native-screens react-native-safe-area-context

# 3. Check for migration guide
# Visit: https://docs.expo.dev/router/migrate/v4/

# 4. Verify file structure is correct
# All screens should be in app/(tabs)/
```

---

### ❌ "Icons not displaying"

**Symptoms:**
- Question marks instead of icons
- Empty boxes where icons should be
- MaterialIcons not loading

**Fix:**
```bash
# Reinstall icon dependencies
npx expo install expo-font @expo/vector-icons

# Clear cache and restart
npx expo start --clear
```

---

### ❌ "TypeScript errors everywhere"

**Symptoms:**
- Red squiggly lines
- "Type X is not assignable to type Y"
- Build fails with TS errors

**Fix:**
```typescript
// 1. Restart TypeScript server in VS Code
// Ctrl+Shift+P → "TypeScript: Restart TS Server"

// 2. Update TypeScript
npm install -D typescript@~5.3.3

// 3. Check tsconfig.json is correct
// Should have:
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}

// 4. Regenerate types
npx expo customize tsconfig.json
```

---

### ❌ "Styles look broken"

**Symptoms:**
- Layout is messed up
- Colors changed
- Spacing is wrong

**Possible causes:**
- React Native 0.76 style changes
- Theme tokens not working
- SafeAreaView behavior changed

**Fix:**
```bash
# 1. Check your theme file
# Read: frontend/src/constants/theme.ts
# Verify all COLORS, SPACING, FONTS are still defined

# 2. Test in Debug tab
# Open app → Debug tab → Test each screen

# 3. Check for deprecation warnings
# Look in terminal for warnings about deprecated styles

# 4. Update SafeAreaView imports if needed
# Old: import { SafeAreaView } from 'react-native'
# New: import { SafeAreaView } from 'react-native-safe-area-context'
```

---

### ❌ "Cannot connect to dev server"

**Symptoms:**
- QR code scans but nothing happens
- "Could not connect to development server"
- Expo Go shows connection error

**Fix:**
```bash
# 1. Check same WiFi network
# Phone and computer MUST be on same network

# 2. Try tunnel mode
npx expo start --tunnel

# 3. Check firewall
# Disable firewall temporarily to test

# 4. Use LAN IP manually
npx expo start --lan

# 5. Restart router and devices
# Sometimes network just needs refresh
```

---

## 💣 **Nuclear Options (Last Resort)**

### Option 1: Complete Clean Reinstall

```bash
# Delete everything
rm -rf node_modules
rm -rf .expo
rm package-lock.json

# Fresh install
npm install

# Clear cache and start
npx expo start --clear
```

---

### Option 2: Roll Back to SDK 51

```bash
# Restore old package.json
git checkout package.json package-lock.json

# Clean install
rm -rf node_modules
npm install

# Start
npm start
```

---

### Option 3: Gradual Upgrade Path

Instead of 51 → 54 directly:

```bash
# Upgrade to SDK 52 first
npm install expo@^52.0.0
npx expo install --fix
npx expo-doctor
npm start
# TEST EVERYTHING

# Then upgrade to SDK 53
npm install expo@^53.0.0
npx expo install --fix
npx expo-doctor
npm start
# TEST EVERYTHING

# Finally upgrade to SDK 54
npm install expo@^54.0.0
npx expo install --fix
npx expo-doctor
npm start
# TEST EVERYTHING
```

---

## 📞 **Get Help**

If you're still stuck:

1. **Read error message carefully** - It usually tells you what's wrong
2. **Check Expo Forums:** https://forums.expo.dev
3. **Expo Discord:** https://chat.expo.dev
4. **GitHub Issues:** https://github.com/expo/expo/issues
5. **Stack Overflow:** Tag with `expo`, `expo-router`, `react-native`

---

## 📝 **Error Message Decoder**

### "Cannot resolve module"
→ Missing package or wrong import path
→ Fix: Check import path, install missing package

### "Unable to boot device"
→ Simulator/emulator issue
→ Fix: Use Expo Go on real device instead

### "Metro bundler error"
→ Cache issue or syntax error
→ Fix: Clear cache with `--clear` flag

### "Peer dependency warning"
→ Package version mismatch
→ Fix: Run `npx expo install --fix` again

### "Unable to find expo in this project"
→ expo package not installed
→ Fix: Run `npm install expo@^54.0.0`

### "Android/iOS build failed"
→ You don't have android/ios folders, this shouldn't happen
→ Fix: Ignore it, you're using Expo Go

---

## ✅ **Verification Checklist**

After fixing any issue, verify:

- [ ] `npx expo-doctor` shows all checks pass
- [ ] `npm start` runs without errors
- [ ] App opens in Expo Go
- [ ] Can navigate to Debug tab
- [ ] At least 3-5 screens work
- [ ] No console errors
- [ ] Icons display
- [ ] Images load
- [ ] Navigation works

---

**Remember:** Most issues are solved by:
1. Clearing cache: `npx expo start --clear`
2. Reinstalling: `rm -rf node_modules && npm install`
3. Reading error messages carefully

**Good luck! 🚀**

