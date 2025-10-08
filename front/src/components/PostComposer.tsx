import React, { useState } from 'react';
import { Camera, Image, MapPin, Users, Calendar, X, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { useBetterGram } from './BetterGramApp';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PostComposerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostComposer: React.FC<PostComposerProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useBetterGram();
  const [step, setStep] = useState<'upload' | 'edit' | 'share'>('upload');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [taggedUsers, setTaggedUsers] = useState<string[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');

  // Mock image upload simulation
  const mockImages = [
    'https://images.unsplash.com/photo-1759557357432-781fa1fefe8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwbGlmZXN0eWxlfGVufDF8fHx8MTc1OTg3MjQ5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzU5ODExNjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU5ODI5NTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  ];

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImages([imageUrl]);
    setStep('edit');
  };

  const handleShare = () => {
    // Simulate sharing post
    console.log('Sharing post:', {
      images: selectedImages,
      caption,
      location,
      taggedUsers,
      isScheduled,
      scheduledDate
    });
    
    // Reset form and close
    setSelectedImages([]);
    setCaption('');
    setLocation('');
    setTaggedUsers([]);
    setIsScheduled(false);
    setScheduledDate('');
    setStep('upload');
    onClose();
  };

  const goBack = () => {
    if (step === 'edit') {
      setStep('upload');
    } else if (step === 'share') {
      setStep('edit');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            {step !== 'upload' && (
              <Button variant="ghost" size="icon" onClick={goBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <DialogTitle>
              {step === 'upload' && 'Create new post'}
              {step === 'edit' && 'Edit'}
              {step === 'share' && 'Share'}
            </DialogTitle>
            {step === 'edit' && (
              <Button 
                variant="ghost" 
                onClick={() => setStep('share')}
                className="text-primary font-semibold"
              >
                Next
              </Button>
            )}
            {step === 'share' && (
              <Button 
                onClick={handleShare}
                className="font-semibold"
              >
                Share
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {/* Upload Step */}
          {step === 'upload' && (
            <div className="p-8 text-center">
              <div className="mb-8">
                <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Share photos and videos</h3>
                <p className="text-muted-foreground">Select from your gallery or take a new photo</p>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full" size="lg">
                  <Camera className="h-5 w-5 mr-2" />
                  Take Photo
                </Button>
                
                <Button variant="outline" className="w-full" size="lg">
                  <Image className="h-5 w-5 mr-2" />
                  Choose from Gallery
                </Button>
              </div>

              {/* Mock Gallery Preview */}
              <div className="mt-8">
                <h4 className="font-semibold mb-4 text-left">Recent</h4>
                <div className="grid grid-cols-3 gap-2">
                  {mockImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleImageSelect(image)}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Edit Step */}
          {step === 'edit' && selectedImages.length > 0 && (
            <div className="flex h-96">
              <div className="flex-1">
                <ImageWithFallback
                  src={selectedImages[0]}
                  alt="Selected image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-80 p-4 border-l overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                      <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{currentUser.username}</span>
                  </div>
                  
                  <Textarea
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="min-h-24 resize-none"
                  />
                  
                  <div className="space-y-3">
                    <Button variant="ghost" className="justify-start p-0 h-auto">
                      <MapPin className="h-4 w-4 mr-2" />
                      Add location
                    </Button>
                    
                    <Button variant="ghost" className="justify-start p-0 h-auto">
                      <Users className="h-4 w-4 mr-2" />
                      Tag people
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Share Step */}
          {step === 'share' && (
            <div className="p-6 space-y-6">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={selectedImages[0]}
                    alt="Post preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                      <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm">{currentUser.username}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {caption || 'No caption'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Add location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="schedule">Schedule post</Label>
                  <Switch
                    id="schedule"
                    checked={isScheduled}
                    onCheckedChange={setIsScheduled}
                  />
                </div>

                {isScheduled && (
                  <div>
                    <Label htmlFor="date">Scheduled date</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostComposer;