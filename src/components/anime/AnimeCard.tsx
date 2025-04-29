
import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimeCharacter {
  id: string;
  name: string;
  imageUrl: string;
  isFavorite: boolean;
}

interface AnimeCardProps {
  character: AnimeCharacter;
  onToggleFavorite: () => void;
}

export default function AnimeCard({ character, onToggleFavorite }: AnimeCardProps) {
  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-lg emily-card">
        <img 
          src={character.imageUrl} 
          alt={`Anime character - ${character.name}`} 
          className="w-full aspect-[3/4] object-cover transition-transform group-hover:scale-105"
        />
      </div>
      
      <button 
        onClick={onToggleFavorite}
        className={cn(
          "absolute top-2 right-2 p-2 rounded-full bg-white/70",
          character.isFavorite ? "text-red-500" : "text-gray-400"
        )}
      >
        <Heart className={cn("h-5 w-5", character.isFavorite && "fill-current")} />
      </button>
      
      <div className="mt-2 px-1">
        <p className="text-sm font-medium text-center">{character.name}</p>
      </div>
    </div>
  );
}
