import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, Heart, MessageCircle, Share, PlusCircle } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(1);
    }, 800);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  const floatingIcons = [
    { Icon: Camera, delay: 0, x: -100, y: -50 },
    { Icon: Heart, delay: 0.2, x: 100, y: -80 },
    { Icon: MessageCircle, delay: 0.4, x: -80, y: 60 },
    { Icon: Share, delay: 0.6, x: 120, y: 40 },
    { Icon: PlusCircle, delay: 0.8, x: -120, y: -20 },
    { Icon: Sparkles, delay: 1, x: 90, y: -30 },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating Icons */}
      <AnimatePresence>
        {stage >= 1 && floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0.6],
              scale: [0, 1.2, 1],
              x: [0, x, x * 0.8],
              y: [0, y, y * 0.8],
            }}
            transition={{
              duration: 2,
              delay: delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute"
          >
            <Icon className="w-8 h-8 text-white/70" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Content */}
      <div className="text-center z-10">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1
          }}
          className="mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-white rounded-3xl shadow-2xl flex items-center justify-center">
              <Camera className="w-12 h-12 text-purple-600" />
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-24 h-24 mx-auto bg-white rounded-3xl"
            />
          </div>
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-2"
        >
          <h1 className="text-4xl font-bold text-white mb-2">BetterGram</h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg text-white/80"
          >
            Share Better Moments
          </motion.p>
        </motion.div>

        {/* Tagline with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-white/70">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Create • Connect • Inspire</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="w-64 mx-auto"
        >
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-white to-yellow-200 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <motion.p
            className="text-white/60 text-sm mt-3"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading your experience...
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};

export default SplashScreen;