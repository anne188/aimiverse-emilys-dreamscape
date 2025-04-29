
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileHeader from '@/components/ui/ProfileHeader';
import DressCard from '@/components/dresses/DressCard';
import DressFilter from '@/components/dresses/DressFilter';
import { FloatingSparkles } from '@/components/ui/FloatingElements';
import { toast } from '@/components/ui/sonner';

// Dummy data
const dressStyles = [
  "All",
  "Mermaid",
  "Ball Gown",
  "A-Line",
  "Sheath",
  "Princess",
  "Empire"
];

const dressData = [
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
];

export default function Dresses() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [dresses, setDresses] = useState(dressData);
  
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
      </div>
    </MainLayout>
  );
}
