import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { BookOpen, TrendingUp, Calendar, X } from 'lucide-react';

interface Topic {
  title: string;
  description: string;
  date: string;
  content: string;
  impact: string;
}

interface TopicModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topic: Topic;
}

const TopicModal = ({ open, onOpenChange, topic }: TopicModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-lg gradient-earth">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              {topic.title}
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
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {topic.date}
          </div>
          
          <DialogDescription className="text-base">
            {topic.description}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Content */}
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-foreground leading-relaxed">
                {topic.content}
              </div>
            </div>

            {/* Impact Highlight */}
            <div className="p-4 rounded-lg gradient-forest">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-success-foreground/20">
                  <TrendingUp className="h-4 w-4 text-success-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-success-foreground mb-2">Climate Impact</h4>
                  <p className="text-success-foreground/90 text-sm">
                    {topic.impact}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">#RenewableEnergy</Badge>
              <Badge variant="secondary">#ClimateAction</Badge>
              <Badge variant="secondary">#Sustainability</Badge>
              <Badge variant="secondary">#GreenFuture</Badge>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="earth">
            Share Knowledge
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicModal;