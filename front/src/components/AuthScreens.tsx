import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface AuthScreensProps {
  onAuthComplete: () => void;
}

export const AuthScreens: React.FC<AuthScreensProps> = ({ onAuthComplete }) => {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'login' | 'signup' | 'otp'>('splash');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    fullName: '',
    otp: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    // Simulate login
    setCurrentScreen('otp');
  };

  const handleSignup = () => {
    // Simulate signup
    setCurrentScreen('otp');
  };

  const handleOTPVerification = () => {
    // Simulate OTP verification
    onAuthComplete();
  };

  if (currentScreen === 'splash') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-primary/10 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="space-y-6">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">BG</span>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                BetterGram
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Share moments, connect with friends
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => setCurrentScreen('login')}
            >
              Get Started
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Already have an account?</span>
              <Button 
                variant="link" 
                className="p-0 h-auto"
                onClick={() => setCurrentScreen('login')}
              >
                Sign in
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-primary/10 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-white">BG</span>
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email or username"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button className="w-full" onClick={handleLogin}>
              Sign In
            </Button>
            
            <div className="text-center">
              <Button variant="link" className="text-sm">
                Forgot password?
              </Button>
            </div>
            
            <Separator />
            
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Don't have an account?</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setCurrentScreen('signup')}
              >
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentScreen === 'signup') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-primary/10 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-0"
              onClick={() => setCurrentScreen('login')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-white">BG</span>
              </div>
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>Join BetterGram today</CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="signupEmail">Email</Label>
              <Input
                id="signupEmail"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="signupPassword">Password</Label>
              <div className="relative">
                <Input
                  id="signupPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              />
            </div>
            
            <Button className="w-full" onClick={handleSignup}>
              Create Account
            </Button>
            
            <div className="text-xs text-muted-foreground text-center">
              By creating an account, you agree to our{' '}
              <Button variant="link" className="p-0 h-auto text-xs">
                Terms of Service
              </Button>{' '}
              and{' '}
              <Button variant="link" className="p-0 h-auto text-xs">
                Privacy Policy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentScreen === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-primary/10 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Verify Your Email</CardTitle>
            <CardDescription>
              We've sent a verification code to {formData.email}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="text-center text-lg tracking-wider"
                value={formData.otp}
                onChange={(e) => handleInputChange('otp', e.target.value)}
              />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleOTPVerification}
              disabled={formData.otp.length < 6}
            >
              Verify Email
            </Button>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?
              </p>
              <Button variant="link" className="text-sm">
                Resend Code
              </Button>
            </div>
            
            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentScreen('login')}
                className="text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default AuthScreens;