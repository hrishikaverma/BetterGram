import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { motion } from 'motion/react';
import { useBetterGram } from './BetterGramApp';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Post } from './BetterGramApp';

interface PostCardProps {
  post: Post;
}

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  return `${Math.floor(diffInSeconds / 604800)}w`;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { likePost, savePost, addComment } = useBetterGram();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const handleLike = () => {
    setIsLikeAnimating(true);
    likePost(post.id);
    setTimeout(() => setIsLikeAnimating(false), 600);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText('');
    }
  };

  const handleShare = () => {
    // Simulate share functionality
    if (navigator.share) {
      navigator.share({
        title: `${post.author.displayName} on BetterGram`,
        text: post.caption,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto mb-6 overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatar} alt={post.author.username} />
            <AvatarFallback>{post.author.displayName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-foreground">{post.author.username}</span>
              {post.author.isVerified && (
                <Badge variant="secondary" className="h-4 w-4 rounded-full p-0 bg-primary text-primary-foreground">
                  ✓
                </Badge>
              )}
            </div>
            {post.location && (
              <span className="text-xs text-muted-foreground">{post.location}</span>
            )}
          </div>
        </div>
        
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Post Images */}
      <div className="relative aspect-square">
        <ImageWithFallback
          src={post.images[0]}
          alt={post.caption}
          className="w-full h-full object-cover"
        />
        {post.images.length > 1 && (
          <Badge className="absolute top-2 right-2 bg-black/50 text-white">
            1/{post.images.length}
          </Badge>
        )}
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className="relative p-0 h-auto"
            >
              <motion.div
                animate={isLikeAnimating ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.6 }}
              >
                <Heart 
                  className={`h-6 w-6 ${post.isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'}`} 
                />
              </motion.div>
              {isLikeAnimating && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Heart className="h-6 w-6 fill-red-500 text-red-500" />
                </motion.div>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowComments(true)}
              className="p-0 h-auto"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleShare}
              className="p-0 h-auto"
            >
              <Share className="h-6 w-6" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => savePost(post.id)}
            className="p-0 h-auto"
          >
            <Bookmark className={`h-6 w-6 ${post.isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Likes Count */}
        <div className="mb-2">
          <span className="font-semibold text-sm text-foreground">
            {post.likes.toLocaleString()} likes
          </span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold text-sm mr-2 text-foreground">{post.author.username}</span>
          <span className="text-sm text-foreground">{post.caption}</span>
        </div>

        {/* Comments */}
        {post.comments > 0 && (
          <Button
            variant="ghost"
            className="p-0 h-auto text-muted-foreground text-sm mb-2"
            onClick={() => setShowComments(true)}
          >
            View all {post.comments} comments
          </Button>
        )}

        {/* Timestamp */}
        <span className="text-xs text-muted-foreground uppercase">
          {formatTimeAgo(post.timestamp)}
        </span>
      </div>

      {/* Comments Dialog */}
      <Dialog open={showComments} onOpenChange={setShowComments}>
        <DialogContent className="max-w-lg max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="flex-1 max-h-96">
            <div className="space-y-4 p-4">
              {/* Mock comments */}
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar} alt="commenter" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">user123</span>
                    <span className="text-xs text-muted-foreground">2h</span>
                  </div>
                  <p className="text-sm">Great shot! Love the composition 📸</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.avatar} alt="commenter" />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">jane_doe</span>
                    <span className="text-xs text-muted-foreground">1h</span>
                  </div>
                  <p className="text-sm">Amazing! Where was this taken?</p>
                </div>
              </div>
            </div>
          </ScrollArea>
          
          {/* Add Comment */}
          <div className="flex gap-2 pt-4 border-t">
            <Input
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
              className="flex-1"
            />
            <Button 
              onClick={handleComment}
              size="sm"
              disabled={!commentText.trim()}
            >
              Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PostCard;