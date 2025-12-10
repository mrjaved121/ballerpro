# Community Screen Integration Guide

## Overview

The Community screen is a social feed feature that allows users to share workouts, view their weekly progress, and interact with other users. This document provides implementation details and integration guidelines.

---

## 📁 File Structure

```
frontend/
├── app/(tabs)/
│   └── community.tsx                      # Main community screen
├── src/
│   ├── components/ui/
│   │   ├── WeeklySummaryCard.tsx         # Weekly stats card
│   │   └── PostCard.tsx                  # Social post card
│   ├── types/
│   │   └── community.ts                  # Type definitions
│   ├── mocks/
│   │   └── communityData.ts              # Mock data for development
│   └── services/api/
│       └── communityService.ts           # API service layer
```

---

## 🎨 Design Features

### 1. **Weekly Summary Card**
- Displays user's weekly statistics
- Shows: Week number, workouts completed, average score, trend
- Trend indicator with color-coded arrows (green for positive, red for negative)
- Responsive grid layout (2x2)

### 2. **Post Card**
- User avatar and name
- Timestamp with relative time formatting ("2h ago", "1 day ago")
- Post content with emoji support
- Workout details badge (type, duration, calories, pace)
- Score badge (star icon + number)
- Optional image attachment
- Interaction buttons: Like (heart), Comment, Share
- Like animation and state management

### 3. **Navigation Tabs**
- Feed (Active with mock data)
- Challenges (Coming soon)
- Leaderboard (Coming soon)
- Events (Coming soon)
- Smooth tab switching with active state highlighting

### 4. **UI/UX Features**
- Pull-to-refresh on feed
- FlatList with optimized rendering
- Responsive design (tablet support)
- Empty states for each tab
- Dark theme matching app design
- Smooth animations and transitions

---

## 🔧 Implementation Details

### Type Definitions

```typescript
// src/types/community.ts

export interface WeeklySummary {
  weekNumber: number;
  workoutsCompleted: number;
  avgScore: number;
  trendPercentage: number;
}

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: string;
  content: string;
  workoutType?: string;
  workoutDetails?: {
    duration?: string;
    distance?: string;
    pace?: string;
    calories?: number;
  };
  score?: number;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}
```

### Components

#### WeeklySummaryCard

**Props:**
- `summary: WeeklySummary` - Weekly statistics data

**Features:**
- Responsive 2x2 grid layout
- Trend indicator with icon and percentage
- Color-coded trend (green/red)
- Matches app theme

#### PostCard

**Props:**
- `post: Post` - Post data
- `onLike?: () => void` - Like button handler
- `onComment?: () => void` - Comment button handler
- `onShare?: () => void` - Share button handler
- `onUserPress?: () => void` - User avatar/name press handler

**Features:**
- Dynamic time formatting
- Conditional rendering (workout details, image, score)
- Like state management with color change
- Avatar image loading
- Workout stats display
- Action buttons with counts

---

## 🔌 API Integration

### Backend Endpoints (Phase 4 - To Be Implemented)

According to `API_CONTRACT.md`, the following endpoints will be available:

| Endpoint | Method | Description | Priority |
|----------|--------|-------------|----------|
| `/api/community/posts` | GET | Get community feed | Medium |
| `/api/community/posts` | POST | Create post | Medium |
| `/api/community/posts/:id` | GET | Get post details | Medium |
| `/api/community/posts/:id/like` | POST | Like/unlike post | Low |
| `/api/community/posts/:id/comment` | POST | Add comment | Low |
| `/api/community/users/:id` | GET | Get public profile | Medium |
| `/api/community/follow/:userId` | POST | Follow user | Low |
| `/api/community/follow/:userId` | DELETE | Unfollow user | Low |

### Integration Steps

#### Step 1: Update communityService.ts

Once backend endpoints are ready, uncomment and update the API calls:

```typescript
// src/services/api/communityService.ts

export const getFeed = async (params?: GetFeedParams): Promise<Post[]> => {
  try {
    const response = await api.get('/api/community/posts', { params });
    return response.data.data.posts;
  } catch (error) {
    console.error('Error fetching community feed:', error);
    throw error;
  }
};
```

#### Step 2: Create API Hook

Create a custom hook for fetching feed data:

```typescript
// src/hooks/useCommunityFeed.ts

import { useState, useEffect } from 'react';
import { getFeed } from '@/services/api/communityService';
import { Post } from '@/types/community';

export const useCommunityFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      setPosts(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return { posts, loading, error, refetch: fetchFeed };
};
```

#### Step 3: Update Community Screen

Replace mock data with API hook:

```typescript
// app/(tabs)/community.tsx

import { useCommunityFeed } from '@/hooks/useCommunityFeed';

export default function CommunityScreen() {
  const { posts, loading, error, refetch } = useCommunityFeed();
  
  // ... rest of component
}
```

---

## 🧪 Testing

### Mock Data Available

Mock data is provided in `src/mocks/communityData.ts`:
- `MOCK_WEEKLY_SUMMARY` - Sample weekly stats
- `MOCK_POSTS` - Array of 5 sample posts with variety

### Test Scenarios

1. **Feed Display**
   - Posts render correctly
   - Images load properly
   - Time formatting works
   - Score badges display

2. **Interactions**
   - Like button toggles state
   - Like count updates
   - Color changes on like/unlike
   - User press triggers navigation

3. **Tab Navigation**
   - Tab switching works
   - Active tab highlights
   - Empty states display for non-feed tabs

4. **Weekly Summary**
   - Stats display correctly
   - Trend indicator shows correct direction
   - Colors match positive/negative trends

5. **Responsive Design**
   - Works on mobile devices
   - Tablet layout adjusts properly
   - Content width constrains on large screens

---

## 🎯 Future Enhancements

### Phase 1 (Current - Mock Data)
- ✅ Basic feed layout
- ✅ Post cards with interactions
- ✅ Weekly summary
- ✅ Tab navigation structure

### Phase 2 (API Integration)
- [ ] Connect to backend API
- [ ] Real-time data fetching
- [ ] Error handling and retry logic
- [ ] Loading states
- [ ] Pagination/infinite scroll

### Phase 3 (Advanced Features)
- [ ] Create post functionality
- [ ] Comment modal
- [ ] Share functionality
- [ ] User profile navigation
- [ ] Follow/unfollow users
- [ ] Image upload for posts
- [ ] Video support
- [ ] Rich text formatting

### Phase 4 (Social Features)
- [ ] Challenges tab implementation
- [ ] Leaderboard with rankings
- [ ] Events calendar
- [ ] Notifications for interactions
- [ ] Direct messaging
- [ ] Group workouts
- [ ] Achievement badges

---

## 🐛 Troubleshooting

### Images Not Loading
- Check internet connection
- Verify avatar URLs are valid
- Add fallback placeholder images

### Performance Issues
- Implement pagination for large feeds
- Use React.memo for PostCard
- Add image caching
- Optimize FlatList with `getItemLayout`

### API Integration Issues
- Verify backend server is running
- Check authentication tokens
- Validate request/response formats
- Add proper error handling

---

## 📝 API Request/Response Examples

### Get Feed

**Request:**
```http
GET /api/community/posts?page=1&limit=20&filter=recent
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post123",
        "author": {
          "id": "user123",
          "name": "John Doe",
          "avatar": "https://example.com/avatar.jpg"
        },
        "timestamp": "2025-12-09T10:30:00.000Z",
        "content": "Great workout today!",
        "workoutType": "HIIT",
        "workoutDetails": {
          "duration": "30 mins",
          "calories": 400
        },
        "score": 95,
        "likes": 50,
        "comments": 5,
        "shares": 2,
        "isLiked": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

### Like Post

**Request:**
```http
POST /api/community/posts/post123/like
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isLiked": true,
    "likesCount": 51
  }
}
```

---

## 🎨 Theme Customization

The community screen uses the global theme constants:

```typescript
// src/constants/theme.ts

COLORS.background    // Screen background
COLORS.surface       // Card background
COLORS.primary       // Accent color (red)
COLORS.white         // Primary text
COLORS.textSecondary // Secondary text
COLORS.success       // Positive trend (green)
COLORS.error         // Negative trend (red)
```

To customize, update `src/constants/theme.ts`.

---

## 📱 Screen Navigation

Current navigation structure:
```
(tabs)/
├── index.tsx       # Home
├── train.tsx       # Workouts
├── track.tsx       # Progress
├── community.tsx   # Community ← Current
└── shop.tsx        # Shop
```

---

## ✅ Checklist for Production

- [ ] Replace mock data with API calls
- [ ] Add error boundaries
- [ ] Implement loading states
- [ ] Add pull-to-refresh
- [ ] Implement pagination
- [ ] Add image optimization
- [ ] Test on various devices
- [ ] Add analytics tracking
- [ ] Implement caching strategy
- [ ] Add offline support
- [ ] Security review (sanitize user content)
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] User testing

---

## 📞 Support

For questions or issues with the Community screen:
- Check `API_CONTRACT.md` for backend details
- Review `MOBILE_APP_REQUIREMENTS.md` for feature specs
- Contact backend team for API status

---

## 📄 Related Documentation

- `API_CONTRACT.md` - Complete API documentation
- `MOBILE_APP_REQUIREMENTS.md` - App requirements
- `FRONTEND_API_INTEGRATION_PLAN.md` - Integration guide
- `src/constants/theme.ts` - Theme configuration

---

**Last Updated:** December 9, 2025  
**Status:** Mock implementation complete, ready for API integration  
**Version:** 1.0.0

