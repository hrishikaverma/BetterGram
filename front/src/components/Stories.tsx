import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent } from './ui/dialog';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { motion, AnimatePresence } from 'motion/react';
import { useBetterGram } from './BetterGramApp';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StoryViewerProps {
  isOpen: boolean;
  onClose: () => void;
  initialStoryIndex: number;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ isOpen, onClose, initialStoryIndex }) => {
  const { stories } = useBetterGram();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            return 0;
          } else {
            onClose();
            return 0;
          }
        }
        return prev + 2; // 5 second duration (100/20 = 5)
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isOpen, currentStoryIndex, stories.length, onClose]);

  React.useEffect(() => {
    if (isOpen) {
      setProgress(0);
    }
  }, [currentStoryIndex, isOpen]);

  const currentStory = stories[currentStoryIndex];

  const goToNext = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const goToPrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  if (!currentStory) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto p-0 bg-black border-none">
        <div className="relative h-[80vh] bg-black">
          {/* Progress bars */}
          <div className="absolute top-2 left-2 right-2 z-10 flex gap-1">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-100"
                  style={{ 
                    width: index < currentStoryIndex ? '100%' : 
                           index === currentStoryIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Story header */}
          <div className="absolute top-8 left-4 right-4 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 ring-2 ring-white">
                <AvatarImage src={currentStory.author.avatar} alt={currentStory.author.username} />
                <AvatarFallback>{currentStory.author.displayName[0]}</AvatarFallback>
              </Avatar>
              <span className="text-white font-semibold text-sm">
                {currentStory.author.username}
              </span>
              <span className="text-white/80 text-xs">2h</span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Story image */}
          <ImageWithFallback
            src={currentStory.image}
            alt={`${currentStory.author.username}'s story`}
            className="w-full h-full object-cover"
          />

          {/* Navigation areas */}
          <button
            className="absolute left-0 top-0 w-1/3 h-full z-10"
            onClick={goToPrevious}
          />
          <button
            className="absolute right-0 top-0 w-1/3 h-full z-10"
            onClick={goToNext}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const StoriesCarousel: React.FC = () => {
  const { stories, currentUser } = useBetterGram();
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  const openStoryViewer = (index: number) => {
    setSelectedStoryIndex(index);
    setViewerOpen(true);
  };

  return (
    <>
      <div className="bg-background border-b border-border">
        <ScrollArea className="w-full">
          <div className="flex gap-4 p-4 pb-6">
            {/* Add Story */}
            <div className="flex flex-col items-center gap-2 min-w-0">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                  <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-xs text-center font-medium">Your Story</span>
            </div>

            {/* Stories */}
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                className="flex flex-col items-center gap-2 min-w-0 cursor-pointer"
                whileTap={{ scale: 0.95 }}
                onClick={() => openStoryViewer(index)}
              >
                <div className={`p-0.5 rounded-full bg-gradient-to-tr from-primary to-primary-600 ${story.isViewed ? 'opacity-50' : ''}`}>
                  <div className="p-0.5 bg-background rounded-full">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={story.author.avatar} alt={story.author.username} />
                      <AvatarFallback>{story.author.displayName[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <span className="text-xs text-center font-medium max-w-16 truncate">
                  {story.author.username}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <StoryViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        initialStoryIndex={selectedStoryIndex}
      />
    </>
  );
};

export default StoriesCarousel;