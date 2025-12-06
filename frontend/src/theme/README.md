# Theme

Design tokens and theme configuration.

## Files

- `colors.ts` - Color palette
- `spacing.ts` - Spacing and border radius values
- `typography.ts` - Font sizes, weights, and line heights
- `index.ts` - Exports all theme values

## Usage

```tsx
import { colors, spacing, typography } from '@/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  text: {
    fontSize: typography.fontSize.lg,
    color: colors.text,
  },
});
```

