import React from 'react';
import { motion } from 'motion/react';
import { Home, Search, PlusSquare, Heart, User, MessageCircle, Settings, Menu, TrendingUp, Video, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useBetterGram } from './BetterGramApp';

// Enhanced Top Navigation Bar
export const EnhancedTopNavBar: React.FC = () => {
  const { setCurrentScreen, notifications, conversations, theme, setTheme } = useBetterGram();
  
  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadMessages = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  return (
    <nav className="flex items-center justify-between p-4 bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <motion.h1 
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BetterGram
        </motion.h1>
      </div>
      
      <div className="hidden md:flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('home')}
          className="relative hover:bg-primary/10"
        >
          <Home className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('discover')}
          className="hover:bg-primary/10"
        >
          <TrendingUp className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('reels')}
          className="hover:bg-primary/10"
        >
          <Video className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('create')}
          className="hover:bg-primary/10"
        >
          <PlusSquare className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('notifications')}
          className="relative hover:bg-primary/10"
        >
          <Heart className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadNotifications > 9 ? '9+' : unreadNotifications}
            </Badge>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('messages')}
          className="relative hover:bg-primary/10"
        >
          <MessageCircle className="h-5 w-5" />
          {unreadMessages > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadMessages > 9 ? '9+' : unreadMessages}
            </Badge>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('profile')}
          className="hover:bg-primary/10"
        >
          <User className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="hover:bg-primary/10"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => setCurrentScreen('home')}
              >
                <Home className="h-5 w-5 mr-3" />
                Home
              </Button>
              
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => setCurrentScreen('discover')}
              >
                <TrendingUp className="h-5 w-5 mr-3" />
                Discover
              </Button>
              
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => setCurrentScreen('reels')}
              >
                <Video className="h-5 w-5 mr-3" />
                Reels
              </Button>
              
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => setCurrentScreen('create')}
              >
                <PlusSquare className="h-5 w-5 mr-3" />
                Create
              </Button>
              
              <Button 
                variant="ghost" 
                className="justify-start relative"
                onClick={() => setCurrentScreen('notifications')}
              >
                <Heart className="h-5 w-5 mr-3" />
                Notifications
                {unreadNotifications > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                className="justify-start relative"
                onClick={() => setCurrentScreen('messages')}
              >
                <MessageCircle className="h-5 w-5 mr-3" />
                Messages
                {unreadMessages > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {unreadMessages}
                  </Badge>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => setCurrentScreen('profile')}
              >
                <User className="h-5 w-5 mr-3" />
                Profile
              </Button>
              
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => setCurrentScreen('settings')}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Button>

              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? <Moon className="h-5 w-5 mr-3" /> : <Sun className="h-5 w-5 mr-3" />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

// Enhanced Bottom Tab Bar (Mobile)
export const EnhancedBottomTabBar: React.FC = () => {
  const { currentScreen, setCurrentScreen, notifications, conversations } = useBetterGram();
  
  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadMessages = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: TrendingUp, label: 'Discover' },
    { id: 'create', icon: PlusSquare, label: 'Create', special: true },
    { id: 'reels', icon: Video, label: 'Reels' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map(({ id, icon: Icon, label, special }) => (
          <motion.div
            key={id}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 p-2 relative ${
                currentScreen === id ? 'text-primary' : 'text-muted-foreground'
              } ${special ? 'bg-primary text-primary-foreground rounded-full' : ''}`}
              onClick={() => setCurrentScreen(id)}
            >
              <Icon className={`h-5 w-5 ${special ? 'text-white' : ''}`} />
              <span className={`text-xs ${special ? 'text-white' : ''}`}>{label}</span>
              {id === 'notifications' && unreadNotifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </Badge>
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Desktop Navigation Sidebar
export const DesktopNavigation: React.FC = () => {
  const { currentScreen, setCurrentScreen, notifications, conversations, currentUser } = useBetterGram();
  
  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadMessages = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: TrendingUp, label: 'Discover' },
    { id: 'reels', icon: Video, label: 'Reels' },
    { id: 'create', icon: PlusSquare, label: 'Create' },
    { id: 'notifications', icon: Heart, label: 'Notifications', badge: unreadNotifications },
    { id: 'messages', icon: MessageCircle, label: 'Messages', badge: unreadMessages },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-background border-r border-border flex-col z-40">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          BetterGram
        </h1>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {navItems.map(({ id, icon: Icon, label, badge }) => (
            <motion.div
              key={id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={currentScreen === id ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 p-3 h-auto relative"
                onClick={() => setCurrentScreen(id)}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
                {badge && badge > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {badge > 9 ? '9+' : badge}
                  </Badge>
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{currentUser.displayName}</p>
            <p className="text-sm text-muted-foreground truncate">@{currentUser.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};