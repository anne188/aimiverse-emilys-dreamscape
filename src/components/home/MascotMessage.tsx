
import React, { useState, useEffect } from 'react';

const mascotMessages = [
  "Emily! You look absolutely radiant today! ✨",
  "Your smile brightens everyone's day, just like Pikachu's thunder! ⚡️",
  "Remember that you're stronger than you think - just like your favorite Pokémon! 💪",
  "Your creativity and imagination are truly magical! 🌈",
  "You deserve all the happiness in the world, Emily! 💖"
];

export default function MascotMessage() {
  const [message, setMessage] = useState(mascotMessages[0]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mascotMessages.length);
      setMessage(mascotMessages[randomIndex]);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-start gap-4 emily-card p-4">
      <div className="flex-shrink-0 w-16 h-16 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
          alt="Cute mascot"
          className="w-full h-full object-cover rounded-full border-2 border-emily-pink"
        />
      </div>
      
      <div className="flex-1 rounded-2xl p-3 bg-white relative">
        <div className="absolute -left-2 top-4 w-4 h-4 bg-white transform rotate-45" />
        <p className="text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}
