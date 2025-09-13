import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, CheckSquare, LogOut, Leaf, Sun, Wind } from 'lucide-react';
import climateIcons from '@/assets/climate-icons.png';
import TopicModal from './TopicModal';
import TasksModal from './TaskModal';
import { auth } from '@/lib/firebase';

interface HomeScreenProps {
  onLogout: () => void;
}

const HomeScreen = ({ onLogout }: HomeScreenProps) => {
  const [topicModalOpen, setTopicModalOpen] = useState(false);
  const [tasksModalOpen, setTasksModalOpen] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Goodbye!",
        description: "Thanks for studying climate change with us today",
      });
      onLogout();
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "Failed to sign out. Please try again.",
      });
      console.error('Logout error:', error);
    }
  };

  const todaysTopic = {
    title: "Renewable Energy Sources",
    description: "Understanding how wind, solar, and hydroelectric power can help reduce carbon emissions",
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    content: `Renewable energy sources are crucial in our fight against climate change. Today we explore:

🌞 Solar Power: Harnesses sunlight through photovoltaic cells and solar thermal systems
🌪️ Wind Energy: Uses wind turbines to generate clean electricity
💧 Hydroelectric: Converts flowing water into sustainable power
🌱 Biomass: Organic materials that can be converted into energy

Benefits:
• Zero greenhouse gas emissions during operation
• Infinite supply unlike fossil fuels
• Lower long-term costs
• Job creation in green industries
• Energy independence for nations

The transition to renewable energy is accelerating globally, with costs dropping dramatically over the past decade. Countries like Denmark generate over 50% of their electricity from wind power, proving that a sustainable future is achievable.`,
    impact: "Switching to renewables can reduce global CO2 emissions by 70% by 2050"
  };

  return (
    <div className="min-h-screen gradient-sky">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/20 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Climate Study</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-48 h-32 rounded-lg overflow-hidden shadow-soft">
            <img 
              src={climateIcons} 
              alt="Climate change awareness with renewable energy symbols" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Welcome Back, Climate Hero!</h2>
            <p className="text-muted-foreground">Ready to learn and take action for our planet today?</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Today's Topic Card */}
          <Card 
            className="cursor-pointer transition-smooth hover:shadow-earth hover:-translate-y-1"
            onClick={() => setTopicModalOpen(true)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg gradient-earth">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                Today's Topic
              </CardTitle>
              <CardDescription>
                {todaysTopic.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Sun className="h-5 w-5 text-secondary" />
                  {todaysTopic.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {todaysTopic.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-primary">
                  <Wind className="h-4 w-4" />
                  Tap to learn more about renewable energy
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Card */}
          <Card 
            className="cursor-pointer transition-smooth hover:shadow-ocean hover:-translate-y-1"
            onClick={() => setTasksModalOpen(true)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg gradient-ocean">
                  <CheckSquare className="h-5 w-5 text-secondary-foreground" />
                </div>
                Daily Tasks
              </CardTitle>
              <CardDescription>
                Take action for the planet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    Reduce energy consumption
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    Choose sustainable transport
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    Practice mindful consumption
                  </div>
                </div>
                <div className="text-xs text-secondary">
                  Complete tasks to track your climate impact
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Stats */}
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-success">Your Climate Impact</h3>
              <p className="text-sm text-muted-foreground">
                Every action counts in our fight against climate change
              </p>
              <div className="flex justify-center items-center gap-2 text-2xl font-bold text-success">
                <Leaf className="h-6 w-6" />
                Making a Difference
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Modals */}
      <TopicModal 
        open={topicModalOpen}
        onOpenChange={setTopicModalOpen}
        topic={todaysTopic}
      />
      <TasksModal 
        open={tasksModalOpen}
        onOpenChange={setTasksModalOpen}
      />
    </div>
  );
};

export default HomeScreen;