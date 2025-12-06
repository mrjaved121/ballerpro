# Hooks

Reusable React hooks for common functionality.

## Examples

- `useAuth.ts` - Authentication hook
- `useDebounce.ts` - Debounce hook
- `useTheme.ts` - Theme hook
- `useApi.ts` - API call hook

## Usage

```tsx
import { useAuth } from '@/hooks/useAuth';

const { user, login, logout } = useAuth();
```

