# Store

Global state management using Zustand, Redux, or Context API.

## Structure

Create store files for different domains:
- `authStore.ts` - Authentication state
- `userStore.ts` - User data state
- `settingsStore.ts` - App settings state

## Usage

```tsx
import { useAuthStore } from '@/store/authStore';

const { user, login, logout } = useAuthStore();
```

