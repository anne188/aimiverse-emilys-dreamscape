
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProfileHeader from '@/components/ui/ProfileHeader';
import PhotoCarousel from '@/components/home/PhotoCarousel';
import LoveNote from '@/components/home/LoveNote';
import QualitiesList from '@/components/home/QualitiesList';
import MascotMessage from '@/components/home/MascotMessage';
import { FloatingHearts, FloatingSparkles } from '@/components/ui/FloatingElements';

export default function Home() {
  return (
    <MainLayout>
      <div className="relative">
        <FloatingHearts />
        <FloatingSparkles />
        
        <ProfileHeader 
          name="Aimilianna's Dreamscape" 
          tagline="A universe created just for you" 
        />
        
        <PhotoCarousel />
        <LoveNote />
        <QualitiesList />
        <MascotMessage />
        
        <div className="h-6" />
      </div>
    </MainLayout>
  );
}
