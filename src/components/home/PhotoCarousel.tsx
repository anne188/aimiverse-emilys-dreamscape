
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    caption: 'Just being adorable together'
  },
  {
    url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
    caption: 'Our special night under the stars'
  },
  {
    url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    caption: 'As beautiful as these flowers'
  },
];

export default function PhotoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % PHOTOS.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 emily-card">
      <div className="relative w-full h-64">
        {PHOTOS.map((photo, index) => (
          <div
            key={index}
            className={cn(
              "absolute top-0 left-0 w-full h-full transition-opacity duration-500",
              currentSlide === index ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={photo.url}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <p className="text-white font-medium text-sm">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm rounded-full p-1"
      >
        <ChevronLeft className="h-6 w-6 text-white drop-shadow-md" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm rounded-full p-1"
      >
        <ChevronRight className="h-6 w-6 text-white drop-shadow-md" />
      </button>
      
      <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-2">
        {PHOTOS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentSlide === index 
                ? "bg-white w-4" 
                : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
