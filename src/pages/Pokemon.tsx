
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileHeader from '@/components/ui/ProfileHeader';

export default function Pokemon() {
  return (
    <MainLayout>
      <ProfileHeader 
        name="Pokémon Collection" 
        tagline="Track your favorite Pokémon cards"
      />
      
      <div className="emily-card p-6 text-center">
        <p className="text-muted-foreground">
          The Pokémon collection feature is coming soon! 🎮
        </p>
      </div>
    </MainLayout>
  );
}
