
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileHeader from '@/components/ui/ProfileHeader';

export default function Calendar() {
  return (
    <MainLayout>
      <ProfileHeader 
        name="Our Calendar" 
        tagline="Special dates & events"
      />
      
      <div className="emily-card p-6 text-center">
        <p className="text-muted-foreground">
          The couple's calendar feature is coming soon! 📆
        </p>
      </div>
    </MainLayout>
  );
}
