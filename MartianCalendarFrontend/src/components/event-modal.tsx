import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: { title: string; description: string; start: string; end: string }) => void;
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

export function EventModal({ isOpen, onClose, onSave, theme }: EventModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState<string | null>(null); // Dodanie stanu dla błędów

  const handleSave = async () => {
    setError(null); // Resetowanie ewentualnego poprzedniego błędu
    
    // Konwersja start i end na obiekty Date i następnie do formatu ISO 8601 z oznaczeniem strefy czasu
    const startDate = new Date(start);
    const endDate = new Date(end);
  
    const eventData = { 
      title, 
      description, 
      start: startDate.toISOString(), 
      end: endDate.toISOString() 
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
  
      if (response.ok) {
        console.log('Event saved successfully');
        onSave(eventData);
        setTitle('');
        setDescription('');
        setStart('');
        setEnd('');
        onClose();
      } else {
        const errorText = await response.text();
        setError(`Failed to save event: ${errorText}`);
      }
    } catch (error: any) {
      setError(`An error occurred: ${error.message}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={{ backgroundColor: theme.background, color: theme.text }}>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>Add a new event to your calendar</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              style={{ borderColor: theme.secondary, color: theme.text, backgroundColor: theme.background }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              style={{ borderColor: theme.secondary, color: theme.text, backgroundColor: theme.background }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start" className="text-right">
              Start Time
            </Label>
            <Input
              id="start"
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="col-span-3"
              style={{ borderColor: theme.secondary, color: theme.text, backgroundColor: theme.background }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end" className="text-right">
              End Time
            </Label>
            <Input
              id="end"
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="col-span-3"
              style={{ borderColor: theme.secondary, color: theme.text, backgroundColor: theme.background }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} style={{ backgroundColor: theme.primary, color: theme.background }}>
            Save Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

