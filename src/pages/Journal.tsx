
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileHeader from '@/components/ui/ProfileHeader';

export default function Journal() {
  return (
    <MainLayout>
      <ProfileHeader 
        name="Our Journal" 
        tagline="Capturing our special moments"
      />
      
      <div className="emily-card p-6 text-center">
        <p className="text-muted-foreground">
          The shared journal feature is coming soon! 📝
        </p>
      </div>
    </MainLayout>
  );
}
