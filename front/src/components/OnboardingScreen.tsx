import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Camera, 
  Heart, 
  MessageCircle, 
  Share, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Check,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar
} from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    interests: [] as string[],
    location: ''
  });

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to BetterGram',
      subtitle: 'Where every moment becomes a masterpiece',
      component: WelcomeStep
    },
    {
      id: 'features',
      title: 'Discover Amazing Features',
      subtitle: 'Everything you need to share your story',
      component: FeaturesStep
    },
    {
      id: 'account',
      title: 'Create Your Account',
      subtitle: 'Join millions of creators worldwide',
      component: AccountStep
    },
    {
      id: 'interests',
      title: 'What Inspires You?',
      subtitle: 'Help us personalize your experience',
      component: InterestsStep
    },
    {
      id: 'ready',
      title: 'You\'re All Set!',
      subtitle: 'Let\'s start your creative journey',
      component: ReadyStep
    }
  ];

  const interests = [
    { id: 'photography', label: 'Photography', icon: '📸' },
    { id: 'food', label: 'Food & Cooking', icon: '🍳' },
    { id: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'nature', label: 'Nature', icon: '🌿' },
    { id: 'art', label: 'Art & Design', icon: '🎨' },
    { id: 'fitness', label: 'Fitness', icon: '💪' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'fashion', label: 'Fashion', icon: '👗' },
    { id: 'technology', label: 'Technology', icon: '💻' },
    { id: 'books', label: 'Books', icon: '📚' },
    { id: 'pets', label: 'Pets', icon: '🐕' },
    { id: 'lifestyle', label: 'Lifestyle', icon: '✨' }
  ];

  function WelcomeStep() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center"
        >
          <Camera className="w-16 h-16 text-white" />
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { icon: Heart, label: 'Connect' },
            { icon: Camera, label: 'Create' },
            { icon: Share, label: 'Share' },
            { icon: Sparkles, label: 'Inspire' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-4 bg-muted rounded-2xl"
            >
              <item.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground mb-8"
        >
          Join a community of creators, discover amazing content, and share your unique perspective with the world.
        </motion.p>
      </motion.div>
    );
  }

  function FeaturesStep() {
    const features = [
      {
        icon: Camera,
        title: 'Capture Moments',
        description: 'Professional camera tools and filters',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: Heart,
        title: 'Real-time Interactions',
        description: 'Live likes, comments, and reactions',
        color: 'from-pink-500 to-rose-500'
      },
      {
        icon: Users,
        title: 'Community Events',
        description: 'Join local meetups and challenges',
        color: 'from-purple-500 to-indigo-500'
      },
      {
        icon: Sparkles,
        title: 'AI-Powered Discovery',
        description: 'Personalized content recommendations',
        color: 'from-orange-500 to-yellow-500'
      }
    ];

    return (
      <div className="space-y-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-muted rounded-2xl"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
            <Check className="w-5 h-5 text-green-500" />
          </motion.div>
        ))}
      </div>
    );
  }

  function AccountStep() {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="fullName"
              placeholder="Enter your full name"
              className="pl-10"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">@</span>
            <Input
              id="username"
              placeholder="Choose a username"
              className="pl-8"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  function InterestsStep() {
    const toggleInterest = (interestId: string) => {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.includes(interestId)
          ? prev.interests.filter(id => id !== interestId)
          : [...prev.interests, interestId]
      }));
    };

    return (
      <div className="space-y-4">
        <p className="text-center text-muted-foreground mb-6">
          Select at least 3 interests to personalize your feed
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {interests.map((interest, index) => {
            const isSelected = formData.interests.includes(interest.id);
            return (
              <motion.button
                key={interest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleInterest(interest.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isSelected 
                    ? 'border-primary bg-primary/10 scale-95' 
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-2">{interest.icon}</div>
                <p className="text-sm font-medium">{interest.label}</p>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2"
                  >
                    <Check className="w-4 h-4 text-primary" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="text-center">
          <Badge variant="outline">
            {formData.interests.length} selected
          </Badge>
        </div>
      </div>
    );
  }

  function ReadyStep() {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
        >
          <Check className="w-12 h-12 text-white" />
        </motion.div>

        <h3 className="text-2xl font-bold mb-2">Welcome aboard, {formData.fullName}! 🎉</h3>
        <p className="text-muted-foreground mb-6">
          Your account has been created successfully. Get ready to explore, create, and connect!
        </p>

        <div className="bg-muted rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback>{formData.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-semibold">{formData.fullName}</p>
              <p className="text-sm text-muted-foreground">@{formData.username}</p>
              <p className="text-xs text-muted-foreground">{formData.interests.length} interests</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 2: // Account step
        return formData.fullName && formData.username && formData.email && formData.password;
      case 3: // Interests step
        return formData.interests.length >= 3;
      default:
        return true;
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950 dark:via-background dark:to-pink-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Header */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h1>
          <p className="text-muted-foreground">{steps[currentStep].subtitle}</p>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button variant="outline" onClick={prevStep} className="flex-1">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          <Button 
            onClick={nextStep} 
            disabled={!canProceed()}
            className="flex-1"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>

        {/* Skip Option */}
        {currentStep < steps.length - 1 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onComplete}
            className="w-full mt-4 text-muted-foreground"
          >
            Skip onboarding
          </Button>
        )}
      </Card>
    </div>
  );
};

export default OnboardingScreen;