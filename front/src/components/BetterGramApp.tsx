import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Home, Search, PlusSquare, Heart, User, Send, MessageCircle, Bookmark, Share, MoreHorizontal, Camera, Settings, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Types
interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified?: boolean;
  followers: number;
  following: number;
  posts: number;
  bio?: string;
}

interface Post {
  id: string;
  author: User;
  images: string[];
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  timestamp: Date;
  location?: string;
}

interface Story {
  id: string;
  author: User;
  image: string;
  isViewed: boolean;
}

interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
  isOnline: boolean;
}

// Context
interface BetterGramContextType {
  currentUser: User;
  posts: Post[];
  stories: Story[];
  conversations: Conversation[];
  notifications: any[];
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  likePost: (postId: string) => void;
  savePost: (postId: string) => void;
  addComment: (postId: string, comment: string) => void;
  sendMessage: (conversationId: string, content: string) => void;
  markAsRead: (conversationId: string) => void;
  followUser: (userId: string) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const BetterGramContext = createContext<BetterGramContextType | undefined>(undefined);

export const useBetterGram = () => {
  const context = useContext(BetterGramContext);
  if (!context) {
    throw new Error('useBetterGram must be used within BetterGramProvider');
  }
  return context;
};

// Mock Data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    displayName: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHByb2ZpbGUlMjBwaG90b3xlbnwxfHx8fDE3NTk4NjIwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isVerified: true,
    followers: 12500,
    following: 890,
    posts: 156,
    bio: 'Digital nomad 🌍 | Coffee enthusiast ☕ | Capturing moments 📸'
  },
  {
    id: '2',
    username: 'sarah_jones',
    displayName: 'Sarah Jones',
    avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHByb2ZpbGUlMjBwaG90b3xlbnwxfHx8fDE3NTk4NjIwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    followers: 8900,
    following: 1200,
    posts: 89,
    bio: 'Food blogger | Recipe creator | Healthy living advocate'
  },
  {
    id: '3',
    username: 'alex_photo',
    displayName: 'Alex Wilson',
    avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHByb2ZpbGUlMjBwaG90b3xlbnwxfHx8fDE3NTk4NjIwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    followers: 15600,
    following: 456,
    posts: 234,
    bio: 'Landscape photographer | Nature lover | Canon ambassador'
  }
];

const mockPosts: Post[] = [
  {
    id: '1',
    author: mockUsers[0],
    images: ['https://images.unsplash.com/photo-1759557357432-781fa1fefe8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwbGlmZXN0eWxlfGVufDF8fHx8MTc1OTg3MjQ5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    caption: 'Another beautiful sunset from my balcony. Never gets old! 🌅 #citylife #sunset #photography',
    likes: 1247,
    comments: 89,
    shares: 23,
    isLiked: false,
    isSaved: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    location: 'New York, NY'
  },
  {
    id: '2',
    author: mockUsers[1],
    images: ['https://images.unsplash.com/photo-1532980400857-e8d9d275d858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU5ODExNjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    caption: 'Made this delicious avocado toast for breakfast! Recipe in my bio 🥑✨ #healthyeating #breakfast #foodie',
    likes: 892,
    comments: 156,
    shares: 45,
    isLiked: true,
    isSaved: true,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    location: 'Los Angeles, CA'
  },
  {
    id: '3',
    author: mockUsers[2],
    images: ['https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU5ODI5NTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    caption: 'Early morning hike rewarded with this incredible view! Nature is the best therapy 🏔️ #landscape #hiking #naturephotography',
    likes: 2156,
    comments: 234,
    shares: 78,
    isLiked: false,
    isSaved: false,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    location: 'Yosemite National Park'
  }
];

const mockStories: Story[] = [
  {
    id: '1',
    author: mockUsers[0],
    image: 'https://images.unsplash.com/photo-1759557357432-781fa1fefe8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwbGlmZXN0eWxlfGVufDF8fHx8MTc1OTg3MjQ5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isViewed: false
  },
  {
    id: '2',
    author: mockUsers[1],
    image: 'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU5ODExNjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isViewed: true
  },
  {
    id: '3',
    author: mockUsers[2],
    image: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU5ODI5NTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isViewed: false
  }
];

// Components
export const BetterGramProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [posts, setPosts] = useState(mockPosts);
  const [stories, setStories] = useState(mockStories);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const currentUser = mockUsers[0];

  // Simulate real-time events
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random likes and comments
      if (Math.random() > 0.7) {
        const randomPostIndex = Math.floor(Math.random() * posts.length);
        setPosts(prev => prev.map((post, index) => 
          index === randomPostIndex 
            ? { ...post, likes: post.likes + Math.floor(Math.random() * 5) + 1 }
            : post
        ));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length]);

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const savePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const addComment = (postId: string, comment: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: post.comments + 1 }
        : post
    ));
  };

  const sendMessage = (conversationId: string, content: string) => {
    // Simulate sending message
    console.log('Sending message:', { conversationId, content });
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const followUser = (userId: string) => {
    console.log('Following user:', userId);
  };

  return (
    <BetterGramContext.Provider value={{
      currentUser,
      posts,
      stories,
      conversations,
      notifications,
      currentScreen,
      setCurrentScreen,
      likePost,
      savePost,
      addComment,
      sendMessage,
      markAsRead,
      followUser,
      theme,
      setTheme
    }}>
      <div className={theme}>
        {children}
      </div>
    </BetterGramContext.Provider>
  );
};

export default BetterGramProvider;