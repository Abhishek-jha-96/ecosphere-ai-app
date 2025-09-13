import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Globe } from 'lucide-react';
import climateIcons from '@/assets/climate-icons.png';
import { auth, facebookProvider, googleProvider } from '@/lib/firebase';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast({
        title: "Welcome to Climate Study!",
        description: "Successfully signed in with Google",
      });
      onLogin();
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Failed to sign in with Google. Please try again.",
      });
      console.error('Google sign-in error:', error);
    }
    setLoading(false);
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, facebookProvider);
      toast({
        title: "Welcome to Climate Study!",
        description: "Successfully signed in with Facebook",
      });
      onLogin();
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Failed to sign in with Facebook. Please try again.",
      });
      console.error('Facebook sign-in error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen gradient-sky flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden shadow-earth">
            <img 
              src={climateIcons} 
              alt="Earth from space showing environmental beauty" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              Climate Study
            </h1>
            <p className="text-muted-foreground">Learn, Act, Protect Our Planet</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-ocean">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Globe className="h-5 w-5 text-secondary" />
              Join Our Mission
            </CardTitle>
            <CardDescription>
              Sign in to access daily climate topics and sustainability tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {/* Add Google icon */}
              Continue with Google
            </Button>
            
            <Button
              variant="ocean"
              size="lg"
              className="w-full"
              onClick={handleFacebookLogin}
              disabled={loading}
            >
              {/* Add Facebook icon */}
              Continue with Facebook
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              By signing in, you agree to help protect our planet
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          Together, we can make a difference for climate change
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;