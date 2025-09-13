import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Target, Leaf, X, Zap, Car, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TasksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TasksModal = ({ open, onOpenChange }: TasksModalProps) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Switch to LED Light Bulbs",
      description: "Replace at least one traditional bulb with an energy-efficient LED",
      category: "Energy",
      icon: Zap,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      completed: false,
      impact: "Save 75% energy, reduce 80kg CO2/year"
    },
    {
      id: 2,
      title: "Use Public Transport or Walk",
      description: "Choose sustainable transportation for at least one trip today",
      category: "Transport",
      icon: Car,
      color: "text-success",
      bgColor: "bg-success/10",
      completed: false,
      impact: "Reduce 2.6kg CO2 per 10km trip"
    },
    {
      id: 3,
      title: "Buy Local or Organic Products",
      description: "Choose at least one local or organic item for your next purchase",
      category: "Consumption",
      icon: ShoppingCart,
      color: "text-accent",
      bgColor: "bg-accent/10",
      completed: false,
      impact: "Support local economy, reduce transport emissions"
    }
  ]);

  const { toast } = useToast();

  const toggleTask = (taskId: number) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          if (newCompleted) {
            toast({
              title: "Great job! 🌱",
              description: `You completed: ${task.title}`,
            });
          }
          return { ...task, completed: newCompleted };
        }
        return task;
      })
    );
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-lg gradient-ocean">
                <CheckSquare className="h-5 w-5 text-secondary-foreground" />
              </div>
              Daily Climate Tasks
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <DialogDescription>
            Complete these eco-friendly tasks to make a positive impact on our planet today
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="font-medium">Today's Progress</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {completedTasks}/{tasks.length} completed
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            {progress === 100 && (
              <div className="text-center p-3 rounded-lg gradient-forest">
                <div className="flex items-center justify-center gap-2 text-success-foreground">
                  <Leaf className="h-5 w-5" />
                  <span className="font-semibold">Amazing! You're a climate hero today! 🌍</span>
                </div>
              </div>
            )}
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {tasks.map((task) => {
              const IconComponent = task.icon;
              return (
                <div 
                  key={task.id}
                  className={`p-4 rounded-lg border transition-smooth hover:shadow-soft ${task.bgColor} ${
                    task.completed ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-background/50`}>
                          <IconComponent className={`h-4 w-4 ${task.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                      </div>
                      
                      <div className="ml-11 pl-3 border-l-2 border-border/30">
                        <p className="text-xs text-muted-foreground">
                          <strong>Impact:</strong> {task.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Every action counts for our planet
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button variant="success" disabled={progress !== 100}>
              Share Progress
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TasksModal;