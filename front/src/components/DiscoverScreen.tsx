import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBetterGram } from './BetterGramApp';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Search, 
  TrendingUp, 
  MapPin, 
  Music, 
  Hash, 
  Users, 
  Calendar,
  Filter,
  Heart,
  MessageCircle,
  Share,
  Play,
  Volume2,
  Clock,
  Star,
  Sparkles
} from 'lucide-react';

const DiscoverScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const trendingHashtags = [
    { tag: '#SunsetPhotography', posts: '125.2K', growth: '+12%' },
    { tag: '#FoodieLife', posts: '89.7K', growth: '+8%' },
    { tag: '#TravelVibes', posts: '156.3K', growth: '+15%' },
    { tag: '#NatureLovers', posts: '203.1K', growth: '+22%' },
    { tag: '#StreetArt', posts: '67.4K', growth: '+5%' },
    { tag: '#Minimalism', posts: '94.8K', growth: '+18%' },
  ];

  const suggestedUsers = [
    {
      username: 'alex_captures',
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?w=100',
      followers: '125K',
      isVerified: true,
      category: 'Photography'
    },
    {
      username: 'sarah_eats',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?w=110',
      followers: '89K',
      isVerified: false,
      category: 'Food'
    },
    {
      username: 'travel_tom',
      name: 'Tom Wilson',
      avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?w=120',
      followers: '267K',
      isVerified: true,
      category: 'Travel'
    },
  ];

  const trendingPosts = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?w=300',
      likes: 12500,
      author: 'nature_walker',
      isVideo: false
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?w=300',
      likes: 8900,
      author: 'food_artist',
      isVideo: false
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1759557357432-781fa1fefe8b?w=300',
      likes: 15600,
      author: 'city_lights',
      isVideo: true
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?w=300',
      likes: 22300,
      author: 'portrait_pro',
      isVideo: false
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?w=350',
      likes: 18700,
      author: 'adventure_seeker',
      isVideo: true
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?w=350',
      likes: 11200,
      author: 'cafe_culture',
      isVideo: false
    },
  ];

  const nearbyEvents = [
    {
      id: '1',
      title: 'Photography Walk',
      location: 'Central Park',
      time: 'Today 6:00 PM',
      attendees: 23,
      image: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?w=200'
    },
    {
      id: '2',
      title: 'Food Festival',
      location: 'Downtown Square',
      time: 'Tomorrow 12:00 PM',
      attendees: 156,
      image: 'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?w=200'
    },
    {
      id: '3',
      title: 'Art Exhibition',
      location: 'Modern Gallery',
      time: 'This Weekend',
      attendees: 89,
      image: 'https://images.unsplash.com/photo-1759557357432-781fa1fefe8b?w=200'
    },
  ];

  const filters = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'photos', label: 'Photos', icon: Star },
    { id: 'videos', label: 'Videos', icon: Play },
    { id: 'people', label: 'People', icon: Users },
    { id: 'places', label: 'Places', icon: MapPin },
  ];

  return (
    <div className="w-full pb-20 md:pb-8 md:ml-64">
      <div className="max-w-4xl mx-auto pt-20 md:pt-4">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-16 md:top-0 bg-background/80 backdrop-blur-lg border-b z-10 p-4"
        >
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users, hashtags, or places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full bg-muted border-0"
            />
          </div>
          <Button variant="outline" size="sm" className="rounded-full">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className="flex items-center gap-2 rounded-full whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                {filter.label}
              </Button>
            );
          })}
        </div>
      </motion.div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* Trending Content */}
          <TabsContent value="trending" className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <h2 className="text-foreground">Trending Posts</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {trendingPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative aspect-square group cursor-pointer overflow-hidden rounded-xl"
                  >
                    <img
                      src={post.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Video Indicator */}
                    {post.isVideo && (
                      <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                        <Play className="w-3 h-3 text-white" />
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center justify-between text-white text-xs">
                          <span>@{post.author}</span>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{(post.likes / 1000).toFixed(1)}K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* People */}
          <TabsContent value="people" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-500" />
              <h2 className="text-foreground">Suggested for You</h2>
            </div>
            
            {suggestedUsers.map((user, index) => (
              <motion.div
                key={user.username}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{user.name}</h3>
                        {user.isVerified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm font-medium text-foreground">{user.followers} followers</span>
                        <Badge variant="outline" className="text-xs">
                          {user.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button size="sm">Follow</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Hashtags */}
          <TabsContent value="hashtags" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Hash className="w-5 h-5 text-green-500" />
              <h2 className="text-foreground">Trending Hashtags</h2>
            </div>
            
            <div className="grid gap-3">
              {trendingHashtags.map((hashtag, index) => (
                <motion.div
                  key={hashtag.tag}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-primary">{hashtag.tag}</h3>
                        <p className="text-sm text-muted-foreground">{hashtag.posts} posts</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {hashtag.growth}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">trending</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-purple-500" />
              <h2 className="text-foreground">Nearby Events</h2>
            </div>
            
            {nearbyEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 text-foreground">{event.title}</h3>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} going</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Interested
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </div>
  );
};

export default DiscoverScreen;