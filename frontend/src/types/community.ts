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
  timestamp: string; // ISO string
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

export interface CommunityTab {
  key: string;
  label: string;
}

export type FeedFilter = 'feed' | 'challenges' | 'leaderboard' | 'events';

