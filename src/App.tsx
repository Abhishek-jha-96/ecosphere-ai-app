import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User,  } from 'firebase/auth';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import NotFound from './pages/NotFound';
import { auth } from './lib/firebase';

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    // The auth state change will be handled by onAuthStateChanged
  };

  const handleLogout = () => {
    // The auth state change will be handled by onAuthStateChanged
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-sky flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading Climate Study...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                user ? (
                  <HomeScreen onLogout={handleLogout} />
                ) : (
                  <LoginScreen onLogin={handleLogin} />
                )
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;