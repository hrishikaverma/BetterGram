import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBetterGram } from './BetterGramApp';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface Reel {
  id: string;
  author: {
    username: string;
    avatar: string;
    isVerified?: boolean;
  };
  videoUrl: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  music: {
    title: string;
    artist: string;
  };
  duration: number;
}

const ReelsScreen: React.FC = () => {
  const { likePost, savePost } = useBetterGram();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const mockReels: Reel[] = [
    {
      id: '1',
      author: {
        username: 'nature_explorer',
        avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?w=50',
        isVerified: true
      },
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?w=400',
      caption: '🌲 Morning hike through the misty forest. Nature always finds a way to amaze me! #NatureLovers #Hiking #MorningVibes',
      likes: 12500,
      comments: 423,
      shares: 89,
      isLiked: false,
      isSaved: false,
      music: {
        title: 'Peaceful Nature Sounds',
        artist: 'Original Audio'
      },
      duration: 15
    },
    {
      id: '2',
      author: {
        username: 'foodie_adventures',
        avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?w=60',
        isVerified: false
      },
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?w=400',
      caption: '🍳 Perfect breakfast setup! Who else is obsessed with avocado toast? Recipe in my bio ✨ #BreakfastGoals #HealthyEating',
      likes: 8900,
      comments: 234,
      shares: 67,
      isLiked: true,
      isSaved: false,
      music: {
        title: 'Morning Cafe Vibes',
        artist: 'Chill Beats'
      },
      duration: 12
    },
    {
      id: '3',
      author: {
        username: 'urban_photographer',
        avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?w=70',
        isVerified: true
      },
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1759557357432-781fa1fefe8b?w=400',
      caption: '🌆 Golden hour magic in the city! The light was absolutely perfect tonight #GoldenHour #CityLife #Photography',
      likes: 15600,
      comments: 567,
      shares: 123,
      isLiked: false,
      isSaved: true,
      music: {
        title: 'City Nights',
        artist: 'Urban Sounds'
      },
      duration: 18
    }
  ];

  const currentReel = mockReels[currentReelIndex];

  const handleVideoClick = () => {
    const video = videoRefs.current[currentReelIndex];
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    likePost(currentReel.id);
    // Animate heart
    const heart = document.getElementById(`heart-${currentReel.id}`);
    if (heart) {
      heart.classList.add('animate-bounce');
      setTimeout(() => {
        heart.classList.remove('animate-bounce');
      }, 600);
    }
  };

  const handleSave = () => {
    savePost(currentReel.id);
  };

  const navigateReels = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentReelIndex > 0) {
      setCurrentReelIndex(prev => prev - 1);
    } else if (direction === 'down' && currentReelIndex < mockReels.length - 1) {
      setCurrentReelIndex(prev => prev + 1);
    }
    setProgress(0);
  };

  // Handle video progress
  useEffect(() => {
    const video = videoRefs.current[currentReelIndex];
    if (video) {
      const updateProgress = () => {
        const progress = (video.currentTime / video.duration) * 100;
        setProgress(progress);
      };

      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('ended', () => {
        // Auto-advance to next reel
        if (currentReelIndex < mockReels.length - 1) {
          setCurrentReelIndex(prev => prev + 1);
          setProgress(0);
        }
      });

      return () => {
        video.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [currentReelIndex]);

  // Auto-play when reel changes
  useEffect(() => {
    const video = videoRefs.current[currentReelIndex];
    if (video && isPlaying) {
      video.play();
    }
  }, [currentReelIndex]);

  return (
    <div className="fixed inset-0 bg-black md:ml-64 flex items-center justify-center">
      <div className="relative w-full max-w-sm h-full bg-black overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentReelIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            {/* Video */}
            <div 
              className="relative w-full h-full cursor-pointer"
              onClick={handleVideoClick}
            >
              <img
                src={currentReel.thumbnail}
                alt="Reel thumbnail"
                className="w-full h-full object-cover"
              />
              
              {/* Play/Pause Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-black/50 rounded-full p-4">
                      <Play className="w-12 h-12 text-white ml-1" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateReels('up')}
                disabled={currentReelIndex === 0}
                className="bg-black/20 text-white hover:bg-black/40 disabled:opacity-30"
              >
                <ChevronUp className="w-6 h-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateReels('down')}
                disabled={currentReelIndex === mockReels.length - 1}
                className="bg-black/20 text-white hover:bg-black/40 disabled:opacity-30"
              >
                <ChevronDown className="w-6 h-6" />
              </Button>
            </div>

            {/* User Info and Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="flex items-end justify-between">
                {/* Left side - User info and caption */}
                <div className="flex-1 mr-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-10 h-10 border-2 border-white">
                      <AvatarImage src={currentReel.author.avatar} />
                      <AvatarFallback>{currentReel.author.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">@{currentReel.author.username}</span>
                      {currentReel.author.isVerified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="text-white border-white">
                      Follow
                    </Button>
                  </div>
                  
                  <p className="text-white text-sm mb-3 line-clamp-3">
                    {currentReel.caption}
                  </p>
                  
                  {/* Music Info */}
                  <div className="flex items-center gap-2 text-white/80">
                    <Music className="w-4 h-4" />
                    <span className="text-sm">
                      {currentReel.music.title} • {currentReel.music.artist}
                    </span>
                  </div>
                </div>

                {/* Right side - Action buttons */}
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleLike}
                      className="bg-transparent hover:bg-white/20"
                    >
                      <Heart 
                        id={`heart-${currentReel.id}`}
                        className={`w-7 h-7 ${currentReel.isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`}
                      />
                    </Button>
                    <span className="text-white text-xs mt-1">
                      {currentReel.likes > 1000 ? `${(currentReel.likes / 1000).toFixed(1)}K` : currentReel.likes}
                    </span>
                  </motion.div>

                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-transparent hover:bg-white/20"
                    >
                      <MessageCircle className="w-7 h-7 text-white" />
                    </Button>
                    <span className="text-white text-xs mt-1">{currentReel.comments}</span>
                  </motion.div>

                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-transparent hover:bg-white/20"
                    >
                      <Share className="w-7 h-7 text-white" />
                    </Button>
                    <span className="text-white text-xs mt-1">{currentReel.shares}</span>
                  </motion.div>

                  <motion.div
                    whileTap={{ scale: 0.8 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSave}
                      className="bg-transparent hover:bg-white/20"
                    >
                      <Bookmark className={`w-7 h-7 ${currentReel.isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-white'}`} />
                    </Button>
                  </motion.div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-transparent hover:bg-white/20"
                  >
                    <MoreHorizontal className="w-7 h-7 text-white" />
                  </Button>

                  {/* Volume Control */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-black/40 hover:bg-black/60 mt-4"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hidden video elements for preloading */}
        {mockReels.map((reel, index) => (
          <video
            key={reel.id}
            ref={(el) => (videoRefs.current[index] = el)}
            src={reel.videoUrl}
            loop
            muted={isMuted}
            className="hidden"
            preload="metadata"
          />
        ))}
      </div>
    </div>
  );
};

export default ReelsScreen;