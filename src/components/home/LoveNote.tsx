
import React from 'react';
import { Heart } from 'lucide-react';

export default function LoveNote() {
  return (
    <div className="emily-card p-6 mb-8">
      <div className="flex items-center justify-center mb-4">
        <Heart className="h-5 w-5 text-emily-pink mr-2 animate-heart-beat" />
        <h2 className="font-handwritten text-2xl font-bold text-emily-pink">My Love Letter</h2>
        <Heart className="h-5 w-5 text-emily-pink ml-2 animate-heart-beat" />
      </div>
      
      <div className="prose prose-sm max-w-none">
        <p className="text-center italic mb-4">
          "To my dearest Aimilianna,"
        </p>
        
        <p className="mb-3">
          Every day with you feels like a dream come true. Your smile lights up my world in ways I never thought possible. Thank you for being my best friend, my confidant, and the love of my life.
        </p>
        
        <p className="mb-3">
          This little digital universe is just for you - filled with all the things that make you smile. I wanted to create something as unique and special as you are to me.
        </p>
        
        <p className="text-right font-handwritten text-lg mt-4">
          Forever yours,
        </p>
        <p className="text-right font-bold">
          Your Love ❤️
        </p>
      </div>
    </div>
  );
}
