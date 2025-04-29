
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileHeader from '@/components/ui/ProfileHeader';
import { FloatingSparkles } from '@/components/ui/FloatingElements';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';

// Mock events
const initialEvents = [
  {
    id: '1',
    title: 'Movie Date',
    date: new Date(2023, 3, 20),
    category: 'date'
  },
  {
    id: '2',
    title: 'Anniversary',
    date: new Date(2023, 4, 15),
    category: 'anniversary'
  }
];

interface Event {
  id: string;
  title: string;
  date: Date;
  category: string;
}

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'date'
  });
  const [isCreating, setIsCreating] = useState(false);
  
  const eventsForSelectedDate = events.filter(
    event => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );
  
  const handleCreateEvent = () => {
    const event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: date,
      category: newEvent.category
    };
    
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      category: 'date'
    });
    setIsCreating(false);
  };
  
  // Function to highlight dates with events
  const getDayClassNames = (day: Date) => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    const hasEvent = events.some(event => format(event.date, 'yyyy-MM-dd') === formattedDay);
    
    return hasEvent ? 'bg-emily-pink text-white hover:bg-emily-pink hover:text-white' : undefined;
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'date': return '💕';
      case 'anniversary': return '🎂';
      case 'gift': return '🎁';
      case 'travel': return '✈️';
      default: return '📅';
    }
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <FloatingSparkles />
        
        <ProfileHeader 
          name="Our Calendar" 
          tagline="Special dates & events"
        />
        
        <div className="emily-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Events</h2>
            
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <button className="bg-emily-pink text-white px-3 py-1 rounded-full text-sm">
                  Add Event
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Event Title</label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={newEvent.category}
                      onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="date">Date 💕</option>
                      <option value="anniversary">Anniversary 🎂</option>
                      <option value="gift">Gift 🎁</option>
                      <option value="travel">Travel ✈️</option>
                    </select>
                  </div>
                  <button
                    onClick={handleCreateEvent}
                    className="w-full bg-emily-pink text-white py-2 rounded-md hover:bg-opacity-90"
                  >
                    Save Event
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
              modifiersClassNames={{
                selected: 'bg-emily-lavender text-black',
              }}
              styles={{
                day: {
                  highlighted: { fontWeight: 'bold' }
                }
              }}
              modifiers={{
                highlighted: (date) => {
                  const formattedDate = format(date, 'yyyy-MM-dd');
                  return events.some(event => format(event.date, 'yyyy-MM-dd') === formattedDate);
                }
              }}
            />
            
            <div className="space-y-4">
              <h3 className="font-medium">
                Events for {format(date, 'MMMM d, yyyy')}
              </h3>
              
              {eventsForSelectedDate.length > 0 ? (
                eventsForSelectedDate.map(event => (
                  <div key={event.id} className="border rounded-lg p-3 bg-white">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{getCategoryIcon(event.category)}</span>
                      <h4 className="font-medium">{event.title}</h4>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No events on this day</p>
                  <p className="text-sm mt-1">Add an event to remember something special!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
