import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SIZES } from '@/constants/theme';
import WeeklySummaryCard from '@/components/ui/WeeklySummaryCard';
import PostCard from '@/components/ui/PostCard';
import { Post, FeedFilter } from '@/types/community';
import { MOCK_WEEKLY_SUMMARY, MOCK_POSTS } from '@/mocks/communityData';

const TABS: { key: FeedFilter; label: string }[] = [
  { key: 'feed', label: 'Feed' },
  { key: 'challenges', label: 'Challenges' },
  { key: 'leaderboard', label: 'Leaderboard' },
  { key: 'events', label: 'Events' },
];

export default function CommunityScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const contentWidth = isTablet ? SIZES.containerMaxWidth : '100%';

  const [activeTab, setActiveTab] = useState<FeedFilter>('feed');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  
  // TODO: Fetch real data when API is ready
  // useEffect(() => {
  //   fetchCommunityData();
  // }, [activeTab]);

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId);
    // TODO: Implement comment modal
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
    // TODO: Implement share functionality
  };

  const handleUserPress = (userId: string) => {
    console.log('View user profile:', userId);
    // TODO: Navigate to user profile
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      {/* Header Title */}
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <MaterialIcons name="notifications-none" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.tabActive,
              ]}
              activeOpacity={0.7}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Weekly Summary - Only on Feed tab */}
      {activeTab === 'feed' && (
        <WeeklySummaryCard summary={MOCK_WEEKLY_SUMMARY} />
      )}
    </View>
  );

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      post={item}
      onLike={() => handleLike(item.id)}
      onComment={() => handleComment(item.id)}
      onShare={() => handleShare(item.id)}
      onUserPress={() => handleUserPress(item.author.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialIcons name="people-outline" size={64} color={COLORS.textSecondary} />
      <Text style={styles.emptyTitle}>
        {activeTab === 'feed' && 'No posts yet'}
        {activeTab === 'challenges' && 'No active challenges'}
        {activeTab === 'leaderboard' && 'Leaderboard coming soon'}
        {activeTab === 'events' && 'No upcoming events'}
      </Text>
      <Text style={styles.emptyDescription}>
        {activeTab === 'feed' && 'Start following people to see their posts'}
        {activeTab === 'challenges' && 'Check back later for new challenges'}
        {activeTab === 'leaderboard' && 'Track your ranking against others'}
        {activeTab === 'events' && 'Stay tuned for community events'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={[styles.container, { width: contentWidth, alignSelf: 'center' }]}>
        {activeTab === 'feed' ? (
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshing={false}
            onRefresh={() => {
              console.log('Refresh feed');
              // TODO: Implement refresh
            }}
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {renderHeader()}
            {renderEmptyState()}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingHorizontal: SPACING.m,
    paddingTop: SPACING.m,
    paddingBottom: SPACING.xl,
  },
  scrollContent: {
    paddingHorizontal: SPACING.m,
    paddingTop: SPACING.m,
    paddingBottom: SPACING.xl,
  },
  headerContent: {
    marginBottom: SPACING.l,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontFamily: FONTS.bold,
  },
  tabsContainer: {
    marginBottom: SPACING.l,
    marginHorizontal: -SPACING.m, // Extend to edges
  },
  tabsContent: {
    paddingHorizontal: SPACING.m,
    gap: SPACING.m,
  },
  tab: {
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radiusFull,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  tabTextActive: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginTop: SPACING.l,
    marginBottom: SPACING.s,
  },
  emptyDescription: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
  },
});
