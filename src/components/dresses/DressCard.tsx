
import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DressProps {
  id: string;
  imageUrl: string;
  style: string;
  isFavorite: boolean;
  isDream?: boolean;
  onFavoriteToggle: (id: string) => void;
  onDreamToggle?: (id: string) => void;
}

export default function DressCard({ 
  id, 
  imageUrl, 
  style, 
  isFavorite, 
  isDream = false, 
  onFavoriteToggle, 
  onDreamToggle 
}: DressProps) {
  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-lg emily-card">
        <img 
          src={imageUrl} 
          alt={`Wedding dress - ${style}`} 
          className="w-full aspect-[2/3] object-cover transition-transform group-hover:scale-105"
        />
      </div>
      
      <button 
        onClick={() => onFavoriteToggle(id)}
        className={cn(
          "absolute top-2 right-2 p-2 rounded-full bg-white/70",
          isFavorite ? "text-red-500" : "text-gray-400"
        )}
      >
        <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
      </button>
      
      {onDreamToggle && (
        <button
          onClick={() => onDreamToggle(id)}
          className={cn(
            "absolute top-2 left-2 py-1 px-2 rounded-full text-xs font-medium",
            isDream 
              ? "bg-emily-gold text-black" 
              : "bg-white/70 text-gray-500"
          )}
        >
          Dream Dress
        </button>
      )}
      
      <div className="mt-2 px-1">
        <p className="text-sm font-medium text-center">{style}</p>
      </div>
    </div>
  );
}
