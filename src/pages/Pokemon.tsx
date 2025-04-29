
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileHeader from '@/components/ui/ProfileHeader';
import { FloatingSparkles } from '@/components/ui/FloatingElements';
import { Loader2 } from 'lucide-react';
import PokemonCard from '@/components/pokemon/PokemonCard';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  isCollected: boolean;
  isFavorite: boolean;
}

export default function Pokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        // Fetch a list of pokemon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        if (!response.ok) throw new Error('Failed to fetch Pokemon');
        
        const data = await response.json();
        
        // Get details for each pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (p: { name: string, url: string }) => {
            const detailRes = await fetch(p.url);
            if (!detailRes.ok) throw new Error(`Failed to fetch details for ${p.name}`);
            return await detailRes.json();
          })
        );
        
        // Format the data
        const formattedPokemon: Pokemon[] = pokemonDetails.map(p => ({
          id: p.id,
          name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
          imageUrl: p.sprites.other['official-artwork'].front_default,
          isCollected: Math.random() > 0.5, // Random for demo
          isFavorite: false
        }));
        
        setPokemon(formattedPokemon);
        setError(null);
      } catch (err) {
        console.error('Error fetching Pokemon:', err);
        setError('Failed to load Pokémon. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPokemon();
  }, []);
  
  const toggleCollected = (id: number) => {
    setPokemon(prev => 
      prev.map(p => 
        p.id === id ? { ...p, isCollected: !p.isCollected } : p
      )
    );
  };
  
  const toggleFavorite = (id: number) => {
    setPokemon(prev => 
      prev.map(p => 
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <FloatingSparkles />
        
        <ProfileHeader 
          name="Pokémon Collection" 
          tagline="Track your favorite Pokémon cards"
        />
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-emily-pink animate-spin" />
            <p className="mt-4 text-muted-foreground">Catching Pokémon...</p>
          </div>
        ) : error ? (
          <div className="emily-card p-6 text-center">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 pb-6">
            {pokemon.map(p => (
              <PokemonCard
                key={p.id}
                pokemon={p}
                onToggleCollected={() => toggleCollected(p.id)}
                onToggleFavorite={() => toggleFavorite(p.id)}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
