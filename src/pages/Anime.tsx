
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileHeader from '@/components/ui/ProfileHeader';
import { FloatingSparkles } from '@/components/ui/FloatingElements';
import { Loader2 } from 'lucide-react';
import AnimeCard from '@/components/anime/AnimeCard';

interface AnimeCharacter {
  id: string;
  name: string;
  imageUrl: string;
  isFavorite: boolean;
}

export default function Anime() {
  const [characters, setCharacters] = useState<AnimeCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeCharacters = async () => {
      try {
        setLoading(true);
        // Using Jikan API (MyAnimeList) to fetch anime characters
        const response = await fetch('https://api.jikan.moe/v4/characters?limit=12');
        if (!response.ok) throw new Error('Failed to fetch anime characters');
        
        const data = await response.json();
        
        // Format the data
        const formattedCharacters: AnimeCharacter[] = data.data.map((character: any) => ({
          id: character.mal_id.toString(),
          name: character.name,
          imageUrl: character.images.jpg.image_url,
          isFavorite: false
        }));
        
        setCharacters(formattedCharacters);
        setError(null);
      } catch (err) {
        console.error('Error fetching anime characters:', err);
        setError('Failed to load anime characters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnimeCharacters();
  }, []);
  
  const toggleFavorite = (id: string) => {
    setCharacters(prev => 
      prev.map(character => 
        character.id === id ? { ...character, isFavorite: !character.isFavorite } : character
      )
    );
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <FloatingSparkles />
        
        <ProfileHeader 
          name="Kaito & Gaito Gallery" 
          tagline="Your favorite anime characters"
        />
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-emily-lavender animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading anime characters...</p>
          </div>
        ) : error ? (
          <div className="emily-card p-6 text-center">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 pb-6">
            {characters.map(character => (
              <AnimeCard
                key={character.id}
                character={character}
                onToggleFavorite={() => toggleFavorite(character.id)}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
