
import React from 'react';

export function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <div 
          key={i} 
          className="absolute text-emily-pink opacity-20 animate-float"
          style={{
            fontSize: `${Math.random() * 1.2 + 0.5}rem`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 7 + 3}s`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}

export function FloatingSparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="absolute text-emily-gold opacity-30 animate-sparkle" 
          style={{
            fontSize: `${Math.random() * 0.8 + 0.3}rem`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}
