import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileHeader from '@/components/ui/ProfileHeader';
import { FloatingSparkles } from '@/components/ui/FloatingElements';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, BookOpen, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

// Mock journal entries
const initialEntries = [
  {
    id: '1',
    date: new Date(2023, 3, 15),
    title: 'Our First Date',
    content: 'Today was amazing! We went to that cute café and talked for hours.',
    mood: 'happy'
  },
  {
    id: '2',
    date: new Date(2023, 3, 18),
    title: 'Movie Night',
    content: 'Watched that romantic comedy you love. The popcorn was perfect!',
    mood: 'relaxed'
  }
];

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: string;
}

export default function Journal() {
  const [date, setDate] = useState<Date>(new Date());
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'happy'
  });
  const [isCreating, setIsCreating] = useState(false);
  
  const entriesForSelectedDate = entries.filter(
    entry => format(entry.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );
  
  const handleCreateEntry = () => {
    const entry = {
      id: Date.now().toString(),
      date: date,
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood
    };
    
    setEntries([...entries, entry]);
    setNewEntry({
      title: '',
      content: '',
      mood: 'happy'
    });
    setIsCreating(false);
  };
  
  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'relaxed': return '😌';
      case 'excited': return '🥳';
      case 'loved': return '❤️';
      case 'sad': return '😢';
      default: return '😊';
    }
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <FloatingSparkles />
        
        <ProfileHeader 
          name="Our Journal" 
          tagline="Capturing our special moments"
        />
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="emily-card p-4">
            <div className="flex items-center mb-4">
              <CalendarIcon className="mr-2 h-5 w-5 text-emily-pink" />
              <h2 className="text-lg font-medium">Select Date</h2>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </div>
          
          <div className="emily-card p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-emily-pink" />
                <h2 className="text-lg font-medium">Journal Entries</h2>
              </div>
              
              <Dialog open={isCreating} onOpenChange={setIsCreating}>
                <DialogTrigger asChild>
                  <button className="bg-emily-pink text-white px-3 py-1 rounded-full text-sm">
                    New Entry
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Journal Entry</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={newEntry.title}
                        onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Content</label>
                      <textarea
                        value={newEntry.content}
                        onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                        className="w-full p-2 border rounded-md h-32"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Mood</label>
                      <select
                        value={newEntry.mood}
                        onChange={(e) => setNewEntry({...newEntry, mood: e.target.value})}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="happy">Happy 😊</option>
                        <option value="relaxed">Relaxed 😌</option>
                        <option value="excited">Excited 🥳</option>
                        <option value="loved">Loved ❤️</option>
                        <option value="sad">Sad 😢</option>
                      </select>
                    </div>
                    <button
                      onClick={handleCreateEntry}
                      className="w-full bg-emily-pink text-white py-2 rounded-md hover:bg-opacity-90"
                    >
                      Save Entry
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="space-y-4">
              {entriesForSelectedDate.length > 0 ? (
                entriesForSelectedDate.map(entry => (
                  <div key={entry.id} className="border rounded-lg p-3 bg-white">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{entry.title}</h3>
                      <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{entry.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No entries for {format(date, 'MMMM d, yyyy')}</p>
                  <p className="text-sm mt-1">Create a new entry to capture this day!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
