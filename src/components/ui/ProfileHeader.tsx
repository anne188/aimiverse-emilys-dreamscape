
import React from 'react';

interface ProfileHeaderProps {
  name: string;
  tagline?: string;
}

export default function ProfileHeader({ name, tagline }: ProfileHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="font-handwritten text-4xl md:text-5xl font-bold bg-gradient-to-r from-emily-pink via-emily-lavender to-emily-pink bg-clip-text text-transparent animate-pulse">
        {name}
      </h1>
      {tagline && (
        <p className="mt-2 text-muted-foreground italic">
          {tagline}
        </p>
      )}
    </div>
  );
}
