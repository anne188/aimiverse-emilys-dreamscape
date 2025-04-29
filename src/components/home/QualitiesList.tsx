
import React from 'react';
import { Sparkles } from 'lucide-react';

const qualities = [
  "Radiantly beautiful inside & out",
  "Amazingly creative and thoughtful",
  "Hilariously funny at just the right moments",
  "Incredibly caring toward everyone you meet",
  "Wonderfully passionate about your interests",
  "Stunningly intelligent and insightful"
];

export default function QualitiesList() {
  return (
    <div className="emily-card p-6 mb-8">
      <div className="flex items-center justify-center mb-4">
        <Sparkles className="h-5 w-5 text-emily-gold mr-2" />
        <h2 className="font-handwritten text-2xl font-bold bg-gradient-to-r from-emily-pink to-emily-gold bg-clip-text text-transparent">
          You are amazing because...
        </h2>
        <Sparkles className="h-5 w-5 text-emily-gold ml-2" />
      </div>
      
      <ul className="space-y-3">
        {qualities.map((quality, index) => (
          <li 
            key={index}
            className="flex items-center py-2 px-3 rounded-lg bg-gradient-to-r from-white/50 to-emily-lavender/30"
          >
            <span className="mr-2">✨</span>
            <span className="text-sm">{quality}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
