import React from 'react';
import { Home, Search, PlusSquare, Heart, User, MessageCircle, Settings, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useBetterGram } from './BetterGramApp';

// Top Navigation Bar
export const TopNavBar: React.FC = () => {
  const { setCurrentScreen, notifications, conversations } = useBetterGram();
  
  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadMessages = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b border-border sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
          BetterGram
        </h1>
      </div>
      
      <div className="hidden md:flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('home')}
          className="relative"
        >
          <Home className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('search')}
        >
          <Search className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('create')}
        >
          <PlusSquare className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('notifications')}
          className="relative"
        >
          <Heart className="h-6 w-6" />
          {unreadNotifications > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadNotifications > 9 ? '9+' : unreadNotifications}
            </Badge>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('messages')}
          className="relative"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadMessages > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadMessages > 9 ? '9+' : unreadMessages}
            </Badge>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCurrentScreen('profile')}
        >
          <User className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
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
                onClick={() => setCurrentScreen('search')}
              >
                <Search className="h-5 w-5 mr-3" />
                Search
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

// Bottom Tab Bar (Mobile)
export const BottomTabBar: React.FC = () => {
  const { currentScreen, setCurrentScreen, currentUser, notifications, conversations } = useBetterGram();
  
  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadMessages = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'create', icon: PlusSquare, label: 'Create' },
    { id: 'notifications', icon: Heart, label: 'Activity', badge: unreadNotifications },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map(({ id, icon: Icon, label, badge }) => (
          <Button
            key={id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 relative ${
              currentScreen === id ? 'text-primary' : 'text-muted-foreground'
            }`}
            onClick={() => setCurrentScreen(id)}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs">{label}</span>
            {badge && badge > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {badge > 9 ? '9+' : badge}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default { TopNavBar, BottomTabBar };