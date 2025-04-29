import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileHeader from '@/components/ui/ProfileHeader';
import DressCard from '@/components/dresses/DressCard';
import DressFilter from '@/components/dresses/DressFilter';
import { FloatingSparkles } from '@/components/ui/FloatingElements';
import { toast } from '@/components/ui/sonner';
import { Loader2 } from 'lucide-react';

// Dress styles
const dressStyles = [
  "All",
  "Mermaid",
  "Ball Gown",
  "A-Line",
  "Sheath",
  "Princess",
  "Empire"
];

// Interface for dress data
interface Dress {
  id: string;
  imageUrl: string;
  style: string;
  isFavorite: boolean;
  isDream: boolean;
}

export default function Dresses() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchDresses = async () => {
      setLoading(true);
      try {
        // Using Unsplash API to get wedding dress images
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=wedding+dress&per_page=20&client_id=pODq_oHOvc_x-GDo2_1tXCf8_0m4N6jML-hbH8N12fI`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch wedding dresses');
        }
        
        const data = await response.json();
        
        // Map the API response to our dress data format
        const fetchedDresses: Dress[] = data.results.map((item: any, index: number) => {
          // Assign a random style for demonstration
          const randomStyle = dressStyles[Math.floor(Math.random() * (dressStyles.length - 1)) + 1];
          
          return {
            id: item.id || `dress${index}`,
            imageUrl: item.urls.regular,
            style: randomStyle,
            isFavorite: false,
            isDream: false
          };
        });
        
        setDresses(fetchedDresses);
        setError(null);
      } catch (err) {
        console.error('Error fetching dresses:', err);
        setError('Failed to load wedding dresses. Please try again later.');
        // Fall back to local data if API fails
        setDresses([
          {
            id: "dress1",
            imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
            style: "Ball Gown",
            isFavorite: false,
            isDream: false
          },
          {
            id: "dress2",
            imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
            style: "Mermaid",
            isFavorite: false,
            isDream: false
          },
          {
            id: "dress3",
            imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
            style: "A-Line",
            isFavorite: false,
            isDream: false
          },
          {
            id: "dress4",
            imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
            style: "Princess",
            isFavorite: false,
            isDream: false
          },
          {
            id: "dress5",
            imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
            style: "Empire",
            isFavorite: false,
            isDream: false
          },
          {
            id: "dress6",
            imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
            style: "Sheath",
            isFavorite: false,
            isDream: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDresses();
  }, []);
  
  const handleFavoriteToggle = (id: string) => {
    setDresses(prevDresses => 
      prevDresses.map(dress => 
        dress.id === id 
          ? { ...dress, isFavorite: !dress.isFavorite } 
          : dress
      )
    );
    
    const dress = dresses.find(d => d.id === id);
    if (dress) {
      toast(dress.isFavorite ? "Removed from favorites" : "Added to favorites", {
        description: `${dress.style} style dress`,
      });
    }
  };
  
  const handleDreamToggle = (id: string) => {
    setDresses(prevDresses => {
      // First, remove dream status from all dresses
      const updatedDresses = prevDresses.map(dress => ({
        ...dress,
        isDream: false
      }));
      
      // Then set the selected dress as dream dress
      return updatedDresses.map(dress => 
        dress.id === id ? { ...dress, isDream: true } : dress
      );
    });
    
    const dress = dresses.find(d => d.id === id);
    if (dress) {
      toast("Dream dress selected! 💖", {
        description: `${dress.style} style is now your dream dress!`,
      });
    }
  };
  
  const filteredDresses = activeFilter === "All" 
    ? dresses 
    : dresses.filter(dress => dress.style === activeFilter);
  
  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <FloatingSparkles />
        
        <ProfileHeader 
          name="Wedding Dress Explorer" 
          tagline="Find your perfect dress"
        />
        
        <DressFilter 
          filters={dressStyles} 
          activeFilter={activeFilter} 
          onChange={setActiveFilter} 
        />
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-emily-pink animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading beautiful wedding dresses...</p>
          </div>
        ) : error ? (
          <div className="emily-card p-6 text-center">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 pb-6">
            {filteredDresses.map((dress) => (
              <DressCard 
                key={dress.id}
                id={dress.id}
                imageUrl={dress.imageUrl}
                style={dress.style}
                isFavorite={dress.isFavorite}
                isDream={dress.isDream}
                onFavoriteToggle={handleFavoriteToggle}
                onDreamToggle={handleDreamToggle}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
