import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBetterGram } from './BetterGramApp';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { 
  Send, 
  Smile, 
  Camera, 
  Mic, 
  Heart, 
  ArrowLeft, 
  Phone, 
  Video,
  MoreHorizontal,
  MessageCircle,
  Check,
  CheckCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'audio';
}

interface LiveChatScreenProps {
  conversationId: string;
  participant: {
    username: string;
    avatar: string;
    isOnline: boolean;
  };
  onBack: () => void;
}

const LiveChatScreen: React.FC<LiveChatScreenProps> = ({ 
  conversationId, 
  participant, 
  onBack 
}) => {
  const { currentUser } = useBetterGram();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: participant.username,
      content: 'Hey! How are you doing? 😊',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isRead: true,
      type: 'text'
    },
    {
      id: '2',
      senderId: currentUser.id,
      content: 'I\'m great! Just posted some new photos from my trip.',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      isRead: true,
      type: 'text'
    },
    {
      id: '3',
      senderId: participant.username,
      content: 'Amazing! I saw them, absolutely stunning! 📸✨',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: true,
      type: 'text'
    },
    {
      id: '4',
      senderId: currentUser.id,
      content: 'Thanks! Want to plan a photo walk together soon?',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      isRead: false,
      type: 'text'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    let typingTimer: NodeJS.Timeout;
    
    if (message.length > 0) {
      setIsTyping(true);
      typingTimer = setTimeout(() => setIsTyping(false), 1000);
    }
    
    return () => clearTimeout(typingTimer);
  }, [message]);

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          senderId: participant.username,
          content: ['That sounds awesome! 🎉', 'Count me in! 📷', 'When are you thinking?'][Math.floor(Math.random() * 3)],
          timestamp: new Date(),
          isRead: false,
          type: 'text'
        };
        setMessages(prev => [...prev, newMessage]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [participant.username]);

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      content: message.trim(),
      timestamp: new Date(),
      isRead: false,
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate message being read after a delay
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, isRead: true } : msg
      ));
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const reactions = ['❤️', '😂', '😮', '😢', '😡', '👍'];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-3 p-4 border-b bg-background/80 backdrop-blur-lg sticky top-0 z-10"
      >
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <Avatar className="w-10 h-10">
          <AvatarImage src={participant.avatar} />
          <AvatarFallback>{participant.username[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">{participant.username}</h2>
            {participant.isOnline && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {participant.isOnline ? 'Active now' : 'Last seen 2h ago'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => {
            const isOwnMessage = msg.senderId === currentUser.id;
            const showAvatar = !isOwnMessage && (
              index === 0 || 
              messages[index - 1].senderId !== msg.senderId ||
              new Date(msg.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 5 * 60 * 1000
            );

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`flex gap-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                {!isOwnMessage && (
                  <Avatar className={`w-8 h-8 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.username[0]}</AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-1' : 'order-2'}`}>
                  <motion.div
                    className={`p-3 rounded-2xl ${
                      isOwnMessage
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                    onLongPress={() => setShowReactions(msg.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="text-sm">{msg.content}</p>
                    
                    {/* Message Status */}
                    <div className={`flex items-center gap-1 mt-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                      <span className={`text-xs ${isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                      {isOwnMessage && (
                        <div className="text-primary-foreground/70">
                          {msg.isRead ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                  
                  {/* Reactions */}
                  <AnimatePresence>
                    {showReactions === msg.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        className={`flex gap-1 mt-2 p-2 bg-background rounded-full border shadow-lg ${
                          isOwnMessage ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {reactions.map((reaction) => (
                          <Button
                            key={reaction}
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 hover:scale-110 transition-transform"
                            onClick={() => {
                              console.log('React with:', reaction);
                              setShowReactions(null);
                            }}
                          >
                            {reaction}
                          </Button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-2"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={participant.avatar} />
                <AvatarFallback>{participant.username[0]}</AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl px-4 py-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-muted-foreground rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5] 
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-4 border-t bg-background/80 backdrop-blur-lg"
      >
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="sm" className="mb-2">
            <Camera className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message..."
              className="pr-12 rounded-full bg-muted border-0 focus-visible:ring-1"
              maxLength={500}
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="mb-2">
            <Mic className="w-5 h-5" />
          </Button>
          
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={sendMessage}
              disabled={message.trim() === ''}
              size="sm"
              className="rounded-full w-10 h-10 p-0 mb-2"
            >
              <Send className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveChatScreen;