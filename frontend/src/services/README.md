# Services

Services for external API calls, integrations, and data management.

## Structure

- `api/` - API service configuration and axios instance
- `integrations/` - Third-party integrations (analytics, push notifications, etc.)

## Usage

```tsx
import api from '@/services/api/api';

// Make API calls
const response = await api.get('/endpoint');
```

