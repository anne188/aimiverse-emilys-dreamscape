
import React from 'react';
import { Heart, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  isCollected: boolean;
  isFavorite: boolean;
}

interface PokemonCardProps {
  pokemon: Pokemon;
  onToggleCollected: () => void;
  onToggleFavorite: () => void;
}

export default function PokemonCard({ pokemon, onToggleCollected, onToggleFavorite }: PokemonCardProps) {
  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-lg emily-card">
        <img 
          src={pokemon.imageUrl} 
          alt={`Pokémon - ${pokemon.name}`} 
          className="w-full aspect-square object-contain p-3 transition-transform group-hover:scale-105"
        />
      </div>
      
      <button 
        onClick={onToggleFavorite}
        className={cn(
          "absolute top-2 right-2 p-2 rounded-full bg-white/70",
          pokemon.isFavorite ? "text-red-500" : "text-gray-400"
        )}
      >
        <Heart className={cn("h-5 w-5", pokemon.isFavorite && "fill-current")} />
      </button>
      
      <button
        onClick={onToggleCollected}
        className={cn(
          "absolute top-2 left-2 p-2 rounded-full",
          pokemon.isCollected 
            ? "bg-emily-gold text-black" 
            : "bg-white/70 text-gray-500"
        )}
      >
        <CheckCircle className={cn("h-5 w-5", pokemon.isCollected && "fill-current")} />
      </button>
      
      <div className="mt-2 px-1">
        <p className="text-sm font-medium text-center">{pokemon.name}</p>
      </div>
    </div>
  );
}
