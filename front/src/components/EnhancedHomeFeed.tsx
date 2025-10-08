import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBetterGram } from './BetterGramApp';
import { StoriesCarousel } from './Stories';
import PostCard from './PostCard';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  RefreshCw, 
  TrendingUp, 
  Zap, 
  Users, 
  MapPin, 
  Clock,
  Star,
  Flame,
  Calendar,
  Gift
} from 'lucide-react';

const EnhancedHomeFeed: React.FC = () => {
  const { posts } = useBetterGram();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showTrending, setShowTrending] = useState(true);
  const [streakCount, setStreakCount] = useState(7);
  const [todayMood, setTodayMood] = useState('Inspired');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  // Quick Stats Component
  const QuickStats = () => (
    <Card className="mx-4 mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Your Day
        </h3>
        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          Active
        </Badge>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{streakCount}</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-pink-600">12</div>
          <div className="text-xs text-muted-foreground">Interactions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">5</div>
          <div className="text-xs text-muted-foreground">New Followers</div>
        </div>
      </div>
    </Card>
  );

  // Trending Topics Component
  const TrendingTopics = () => (
    <AnimatePresence>
      {showTrending && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mx-4 mb-4"
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Trending Now
              </h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowTrending(false)}
              >
                ×
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {['#SunsetPhotography', '#FoodieLife', '#TravelVibes', '#NatureLovers'].map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Daily Challenge Component
  const DailyChallenge = () => (
    <Card className="mx-4 mb-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-0">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">Daily Challenge</h3>
          <p className="text-sm text-muted-foreground">Share a moment of gratitude</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>2.3k participating</span>
        </div>
        <Button size="sm" variant="outline">
          Join Challenge
        </Button>
      </div>
    </Card>
  );

  // Live Activity Feed
  const LiveActivity = () => {
    const [activities, setActivities] = useState([
      { id: 1, text: "Sarah liked your photo", time: "2m", type: "like" },
      { id: 2, text: "Alex started following you", time: "5m", type: "follow" },
      { id: 3, text: "New photo in your area", time: "8m", type: "location" },
    ]);

    useEffect(() => {
      const interval = setInterval(() => {
        const newActivity = {
          id: Date.now(),
          text: "Someone liked your post",
          time: "now",
          type: "like"
        };
        setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
      }, 10000);

      return () => clearInterval(interval);
    }, []);

    return (
      <Card className="mx-4 mb-4 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-semibold">Live Activity</h3>
        </div>
        <div className="space-y-2">
          {activities.slice(0, 3).map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between text-sm"
            >
              <span>{activity.text}</span>
              <span className="text-muted-foreground">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </Card>
    );
  };

  // Local Events Component
  const LocalEvents = () => (
    <Card className="mx-4 mb-4 p-4">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-red-500" />
        <h3 className="font-semibold">Nearby Events</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Photography Meetup</p>
            <p className="text-xs text-muted-foreground">Central Park • Today 6 PM</p>
          </div>
          <Button size="sm" variant="outline">Join</Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-lg mx-auto pb-20 md:pb-4 md:ml-64">
      {/* Enhanced Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b z-10 p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-xl font-bold">Good Morning! 👋</h1>
            <p className="text-sm text-muted-foreground">Feeling {todayMood} today</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Stories Section */}
      <StoriesCarousel />
      
      {/* Quick Stats */}
      <QuickStats />

      {/* Daily Challenge */}
      <DailyChallenge />

      {/* Trending Topics */}
      <TrendingTopics />

      {/* Live Activity */}
      <LiveActivity />

      {/* Local Events */}
      <LocalEvents />

      {/* Posts Feed */}
      <div className="space-y-0">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="p-6 text-center">
        <Button variant="outline" onClick={() => console.log('Load more posts')} className="gap-2">
          <Flame className="w-4 h-4" />
          Discover More
        </Button>
      </div>

      {/* Floating Action Hints */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-24 right-4 md:bottom-8"
      >
        <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
          <Gift className="w-5 h-5" />
        </div>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white">1</span>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedHomeFeed;