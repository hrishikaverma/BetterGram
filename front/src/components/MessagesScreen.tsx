import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, Info, Search, ArrowLeft, Camera, Mic, Smile } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { useBetterGram } from './BetterGramApp';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'voice';
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: Message;
  unreadCount: number;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    participant: {
      id: '2',
      username: 'sarah_jones',
      displayName: 'Sarah Jones',
      avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHByb2ZpbGUlMjBwaG90b3xlbnwxfHx8fDE3NTk4NjIwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isOnline: true
    },
    lastMessage: {
      id: 'm1',
      senderId: '2',
      content: 'Hey! Love your latest post 📸',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isRead: false,
      type: 'text'
    },
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        senderId: '2',
        content: 'Hey! Love your latest post 📸',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        isRead: false,
        type: 'text'
      },
      {
        id: 'm2',
        senderId: '1',
        content: 'Thank you so much! 😊',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        isRead: true,
        type: 'text'
      }
    ]
  },
  {
    id: '2',
    participant: {
      id: '3',
      username: 'alex_photo',
      displayName: 'Alex Wilson',
      avatar: 'https://images.unsplash.com/photo-1621523379646-ec4d96325720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHByb2ZpbGUlMjBwaG90b3xlbnwxfHx8fDE3NTk4NjIwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isOnline: false
    },
    lastMessage: {
      id: 'm3',
      senderId: '1',
      content: 'Looking forward to the photo session!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      type: 'text'
    },
    unreadCount: 0,
    messages: [
      {
        id: 'm3',
        senderId: '1',
        content: 'Looking forward to the photo session!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
        type: 'text'
      }
    ]
  }
];

const formatTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  return date.toLocaleDateString();
};

interface ChatScreenProps {
  conversation: Conversation;
  onBack: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ conversation, onBack }) => {
  const { currentUser } = useBetterGram();
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(conversation.messages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (Math.random() > 0.8) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      content: messageText,
      timestamp: new Date(),
      isRead: false,
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');

    // Simulate read receipt after 2 seconds
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, isRead: true } : msg
      ));
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.username} />
              <AvatarFallback>{conversation.participant.displayName[0]}</AvatarFallback>
            </Avatar>
            {conversation.participant.isOnline && (
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
          
          <div>
            <p className="font-semibold">{conversation.participant.displayName}</p>
            <p className="text-sm text-muted-foreground">
              {conversation.participant.isOnline ? 'Active now' : 'Active 2h ago'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isOwn = message.senderId === currentUser.id;
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      isOwn
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm break-words">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-2">
                    {formatTime(message.timestamp)}
                    {isOwn && message.isRead && ' · Read'}
                  </p>
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Camera className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1"
          />
          {messageText.trim() ? (
            <Button onClick={sendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const MessagesScreen: React.FC = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.participant.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedConversation) {
    return (
      <ChatScreen
        conversation={selectedConversation}
        onBack={() => setSelectedConversation(null)}
      />
    );
  }

  return (
    <div className="w-full pb-20 md:pb-8 md:ml-64">
      <div className="max-w-2xl mx-auto pt-20 md:pt-4">
        {/* Header */}
        <div className="sticky top-16 md:top-0 bg-background z-10 p-4 border-b">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="divide-y">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <Card
                key={conversation.id}
                className="p-4 cursor-pointer hover:bg-muted/50 border-0 border-b rounded-none"
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.username} />
                      <AvatarFallback>{conversation.participant.displayName[0]}</AvatarFallback>
                    </Avatar>
                    {conversation.participant.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">{conversation.participant.displayName}</p>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className={`text-sm ${conversation.unreadCount > 0 ? 'font-semibold' : 'text-muted-foreground'}`}>
                        {conversation.lastMessage.content}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Send className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              {searchQuery ? (
                <>
                  <h3 className="text-lg font-semibold mb-2">No conversations found</h3>
                  <p className="text-muted-foreground">Try searching with a different term</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                  <p className="text-muted-foreground">Start a conversation with someone</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesScreen;
