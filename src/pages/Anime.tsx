
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileHeader from '@/components/ui/ProfileHeader';

export default function Anime() {
  return (
    <MainLayout>
      <ProfileHeader 
        name="Kaito & Gaito Gallery" 
        tagline="Your favorite anime characters"
      />
      
      <div className="emily-card p-6 text-center">
        <p className="text-muted-foreground">
          The Kaito & Gaito anime gallery is coming soon! 🌸
        </p>
      </div>
    </MainLayout>
  );
}
