import React, { useState, useEffect } from 'react';
import { BetterGramProvider, useBetterGram } from './components/BetterGramApp';
import { EnhancedTopNavBar, EnhancedBottomTabBar, DesktopNavigation } from './components/EnhancedNavigation';
import EnhancedHomeFeed from './components/EnhancedHomeFeed';
import ReelsScreen from './components/ReelsScreen';
import DiscoverScreen from './components/DiscoverScreen';
import PostComposer from './components/PostComposer';
import ProfileScreen from './components/ProfileScreen';
import SearchScreen from './components/SearchScreen';
import MessagesScreen from './components/MessagesScreen';
import AuthScreens from './components/AuthScreens';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import { motion, AnimatePresence } from 'motion/react';

// Enhanced Notifications Component
const EnhancedNotificationsScreen: React.FC = () => {
  const mockNotifications = [
    {
      id: '1',
      type: 'like',
      user: { username: 'sarah_jones', avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?w=40' },
      content: 'liked your photo',
      timestamp: '2h',
      isRead: false
    },
    {
      id: '2',
      type: 'follow',
      user: { username: 'alex_photo', avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?w=50' },
      content: 'started following you',
      timestamp: '4h',
      isRead: false
    },
    {
      id: '3',
      type: 'comment',
      user: { username: 'john_doe', avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?w=60' },
      content: 'commented on your photo: "Amazing shot! 📸"',
      timestamp: '1d',
      isRead: true
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto pb-20 md:pb-4 md:ml-64"
    >
      <div className="p-4 border-b bg-background/80 backdrop-blur-lg sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Activity</h1>
        <p className="text-sm text-muted-foreground">See what's happening with your posts</p>
      </div>
      
      <div className="divide-y">
        {mockNotifications.map((notification, index) => (
          <motion.div 
            key={notification.id} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors ${!notification.isRead ? 'bg-primary/5' : ''}`}
          >
            <img
              src={notification.user.avatar}
              alt={notification.user.username}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{notification.user.username}</span>{' '}
                {notification.content}
              </p>
              <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
            </div>
            {!notification.isRead && (
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Enhanced Settings Component
const EnhancedSettingsScreen: React.FC = () => {
  const { theme, setTheme } = useBetterGram();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto pb-20 md:pb-4 md:ml-64"
    >
      <div className="p-4 border-b bg-background/80 backdrop-blur-lg sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Settings & Privacy</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>
      
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Appearance</h3>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border-2 transition-colors ${
                theme === 'light' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-muted-foreground/50'
              }`}
            >
              <div className="w-full h-20 bg-white rounded-lg border mb-3"></div>
              <span className="font-medium">Light</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border-2 transition-colors ${
                theme === 'dark' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-muted-foreground/50'
              }`}
            >
              <div className="w-full h-20 bg-gray-900 rounded-lg border mb-3"></div>
              <span className="font-medium">Dark</span>
            </motion.button>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium text-lg">Account</h3>
          <div className="space-y-1">
            {['Privacy Settings', 'Security', 'Notifications', 'Data & Storage'].map((item) => (
              <motion.button 
                key={item}
                whileHover={{ x: 4 }}
                className="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium text-lg">Support & About</h3>
          <div className="space-y-1">
            {['Help Center', 'Report a Problem', 'About', 'Terms of Service'].map((item) => (
              <motion.button 
                key={item}
                whileHover={{ x: 4 }}
                className="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Saved Posts Component
const SavedPostsScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto pb-20 md:pb-4 md:ml-64"
    >
      <div className="p-4 border-b bg-background/80 backdrop-blur-lg sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Saved Posts</h1>
        <p className="text-sm text-muted-foreground">Posts you've saved for later</p>
      </div>
      
      <div className="p-4 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❤️
            </motion.div>
          </div>
          <h3 className="font-semibold mb-2">Save posts for later</h3>
          <p className="text-sm text-muted-foreground">
            Bookmark posts to easily find them again. Only you can see what you've saved.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Main App Component
const AppContent: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useBetterGram();
  const [showPostComposer, setShowPostComposer] = useState(false);

  // Handle create post
  React.useEffect(() => {
    if (currentScreen === 'create') {
      setShowPostComposer(true);
      setCurrentScreen('home'); // Return to home after opening composer
    }
  }, [currentScreen, setCurrentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <EnhancedHomeFeed />;
      case 'discover':
        return <DiscoverScreen />;
      case 'search':
        return <SearchScreen />;
      case 'reels':
        return <ReelsScreen />;
      case 'notifications':
        return <EnhancedNotificationsScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'saved':
        return <SavedPostsScreen />;
      case 'settings':
        return <EnhancedSettingsScreen />;
      default:
        return <EnhancedHomeFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DesktopNavigation />
      <EnhancedTopNavBar />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <EnhancedBottomTabBar />
      
      <PostComposer
        isOpen={showPostComposer}
        onClose={() => setShowPostComposer(false)}
      />
    </div>
  );
};

// Root App Component
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!isAuthenticated) {
    return <AuthScreens onAuthComplete={() => {
      setIsAuthenticated(true);
      setShowOnboarding(true);
    }} />;
  }

  if (showOnboarding) {
    return <OnboardingScreen onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <BetterGramProvider>
      <AppContent />
    </BetterGramProvider>
  );
};

export default App;