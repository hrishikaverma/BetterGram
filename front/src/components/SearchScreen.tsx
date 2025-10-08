import React, { useState, useEffect } from 'react';
import { Search, X, Hash, MapPin, User } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { useBetterGram } from './BetterGramApp';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SearchResult {
  id: string;
  type: 'user' | 'hashtag' | 'location' | 'post';
  title: string;
  subtitle?: string;
  image?: string;
  avatar?: string;
  isVerified?: boolean;
  postCount?: number;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    type: 'user',
    title: 'johndoe',
    subtitle: 'John Doe • Following',
    avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHByb2ZpbGUlMjBwaG90b3xlbnwxfHx8fDE3NTk4NjIwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isVerified: true
  },
  {
    id: '2',
    type: 'hashtag',
    title: '#photography',
    subtitle: '2.1M posts',
    postCount: 2100000
  },
  {
    id: '3',
    type: 'location',
    title: 'New York, NY',
    subtitle: '1.5M posts',
    postCount: 1500000
  },
  {
    id: '4',
    type: 'user',
    title: 'sarah_jones',
    subtitle: 'Sarah Jones',
    avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHByb2ZpbGUlMjBwaG90b3xlbnwxfHx8fDE3NTk4NjIwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

const exploreImages = [
  'https://images.unsplash.com/photo-1759557357432-781fa1fefe8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwbGlmZXN0eWxlfGVufDF8fHx8MTc1OTg3MjQ5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU5ODExNjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU5ODI5NTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
];

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Simulate search
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = mockSearchResults.filter(result =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const addToRecentSearches = (result: SearchResult) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.id !== result.id);
      return [result, ...filtered].slice(0, 10);
    });
  };

  const removeFromRecentSearches = (id: string) => {
    setRecentSearches(prev => prev.filter(item => item.id !== id));
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const renderSearchResult = (result: SearchResult, isRecent = false) => (
    <div key={result.id} className="flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer">
      <div className="flex items-center gap-3" onClick={() => addToRecentSearches(result)}>
        {result.type === 'user' && (
          <Avatar className="h-10 w-10">
            <AvatarImage src={result.avatar} alt={result.title} />
            <AvatarFallback>{result.title[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        )}
        {result.type === 'hashtag' && (
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <Hash className="h-5 w-5" />
          </div>
        )}
        {result.type === 'location' && (
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <MapPin className="h-5 w-5" />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{result.title}</span>
            {result.isVerified && (
              <Badge variant="secondary" className="h-4 w-4 rounded-full p-0 bg-primary text-primary-foreground">
                ✓
              </Badge>
            )}
          </div>
          {result.subtitle && (
            <p className="text-sm text-muted-foreground">{result.subtitle}</p>
          )}
        </div>
      </div>
      
      {isRecent && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromRecentSearches(result.id)}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

  return (
    <div className="w-full pb-20 md:pb-8 md:ml-64">
      <div className="max-w-2xl mx-auto pt-20 md:pt-4">
        {/* Search Bar */}
        <div className="sticky top-0 bg-background z-10 p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search users, hashtags, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search Results or Recent Searches */}
        {searchQuery ? (
          <div className="p-4">
            {isSearching ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-2">Searching...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div>
                <h3 className="font-semibold mb-2">Results</h3>
                <div className="space-y-1">
                  {searchResults.map(result => renderSearchResult(result))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Recent</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRecentSearches([])}
                    className="text-primary"
                  >
                    Clear all
                  </Button>
                </div>
                <div className="space-y-1">
                  {recentSearches.map(result => renderSearchResult(result, true))}
                </div>
              </div>
            )}

            {/* Explore Content */}
            <div className="p-4">
              <Tabs defaultValue="explore" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="explore">Explore</TabsTrigger>
                  <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
                  <TabsTrigger value="places">Places</TabsTrigger>
                </TabsList>

                <TabsContent value="explore" className="mt-4">
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <div key={index} className="aspect-square cursor-pointer group relative">
                        <ImageWithFallback
                          src={exploreImages[index % exploreImages.length]}
                          alt={`Explore ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="hashtags" className="mt-4">
                  <div className="space-y-3">
                    {[
                      { tag: '#photography', posts: '2.1M' },
                      { tag: '#travel', posts: '1.8M' },
                      { tag: '#food', posts: '1.2M' },
                      { tag: '#fashion', posts: '900K' },
                      { tag: '#art', posts: '750K' },
                      { tag: '#nature', posts: '650K' }
                    ].map((hashtag, index) => (
                      <Card key={index} className="p-3 cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                            <Hash className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold">{hashtag.tag}</p>
                            <p className="text-sm text-muted-foreground">{hashtag.posts} posts</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="places" className="mt-4">
                  <div className="space-y-3">
                    {[
                      { place: 'New York, NY', posts: '1.5M' },
                      { place: 'Los Angeles, CA', posts: '1.2M' },
                      { place: 'London, UK', posts: '800K' },
                      { place: 'Paris, France', posts: '750K' },
                      { place: 'Tokyo, Japan', posts: '600K' },
                      { place: 'Sydney, Australia', posts: '450K' }
                    ].map((location, index) => (
                      <Card key={index} className="p-3 cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold">{location.place}</p>
                            <p className="text-sm text-muted-foreground">{location.posts} posts</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
