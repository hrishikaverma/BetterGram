import React, { useState } from 'react';
import { Settings, Grid, BookOpen, UserPlus, MoreHorizontal, Camera, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useBetterGram } from './BetterGramApp';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileScreenProps {
  userId?: string; // If provided, shows another user's profile
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ userId }) => {
  const { currentUser, posts } = useBetterGram();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [followersDialogOpen, setFollowersDialogOpen] = useState(false);
  const [followingDialogOpen, setFollowingDialogOpen] = useState(false);
  
  // In a real app, this would fetch user data based on userId
  const profileUser = userId ? currentUser : currentUser;
  const isOwnProfile = !userId || userId === currentUser.id;

  // Filter posts by user (in real app, this would be an API call)
  const userPosts = posts.filter(post => post.author.id === profileUser.id);

  const [editedProfile, setEditedProfile] = useState({
    displayName: profileUser.displayName,
    bio: profileUser.bio || '',
    username: profileUser.username
  });

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    console.log('Saving profile:', editedProfile);
    setIsEditingProfile(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20 md:pb-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            <Avatar className="h-32 w-32 md:h-40 md:w-40">
              <AvatarImage src={profileUser.avatar} alt={profileUser.username} />
              <AvatarFallback className="text-2xl">{profileUser.displayName[0]}</AvatarFallback>
            </Avatar>
            {isOwnProfile && (
              <Button
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-normal">{profileUser.username}</h1>
              {profileUser.isVerified && (
                <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 bg-primary text-primary-foreground">
                  ✓
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              {isOwnProfile ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditingProfile(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                  <Button variant="outline" size="sm">
                    Message
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 text-center md:text-left">
            <div className="cursor-pointer">
              <span className="font-semibold block">{profileUser.posts.toLocaleString()}</span>
              <span className="text-muted-foreground text-sm">posts</span>
            </div>
            <div 
              className="cursor-pointer"
              onClick={() => setFollowersDialogOpen(true)}
            >
              <span className="font-semibold block">{profileUser.followers.toLocaleString()}</span>
              <span className="text-muted-foreground text-sm">followers</span>
            </div>
            <div 
              className="cursor-pointer"
              onClick={() => setFollowingDialogOpen(true)}
            >
              <span className="font-semibold block">{profileUser.following.toLocaleString()}</span>
              <span className="text-muted-foreground text-sm">following</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="font-semibold">{profileUser.displayName}</h2>
            {profileUser.bio && (
              <p className="text-sm mt-1 whitespace-pre-line">{profileUser.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <Grid className="h-4 w-4" />
            <span className="hidden sm:inline">Posts</span>
          </TabsTrigger>
          <TabsTrigger value="reels" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Reels</span>
          </TabsTrigger>
          <TabsTrigger value="tagged" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Tagged</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-4">
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 md:gap-4">
              {userPosts.map((post) => (
                <div key={post.id} className="aspect-square cursor-pointer group relative">
                  <ImageWithFallback
                    src={post.images[0]}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center gap-4 text-white">
                      <span className="flex items-center gap-1">
                        <Grid className="h-4 w-4" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Grid className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground">Share your first photo or video</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reels" className="mt-4">
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No reels yet</h3>
            <p className="text-muted-foreground">Create your first reel</p>
          </div>
        </TabsContent>

        <TabsContent value="tagged" className="mt-4">
          <div className="text-center py-12">
            <UserPlus className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No tagged posts</h3>
            <p className="text-muted-foreground">Posts you're tagged in will appear here</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="displayName">Name</Label>
              <Input
                id="displayName"
                value={editedProfile.displayName}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, displayName: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={editedProfile.username}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell people about yourself..."
                className="min-h-20"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Followers Dialog */}
      <Dialog open={followersDialogOpen} onOpenChange={setFollowersDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Followers</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {/* Mock followers list */}
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://images.unsplash.com/photo-1621523379646-ec4d96325720?w=${40 + index}`} />
                    <AvatarFallback>U{index}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">user{index + 1}</p>
                    <p className="text-sm text-muted-foreground">User Name {index + 1}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Following</Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Following Dialog */}
      <Dialog open={followingDialogOpen} onOpenChange={setFollowingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Following</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {/* Mock following list */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://images.unsplash.com/photo-1621523379646-ec4d96325720?w=${50 + index}`} />
                    <AvatarFallback>F{index}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">following{index + 1}</p>
                    <p className="text-sm text-muted-foreground">Following Name {index + 1}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Following</Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileScreen;