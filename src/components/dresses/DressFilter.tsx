
import React from 'react';
import { cn } from '@/lib/utils';

interface DressFilterProps {
  filters: string[];
  activeFilter: string;
  onChange: (filter: string) => void;
}

export default function DressFilter({ 
  filters, 
  activeFilter, 
  onChange 
}: DressFilterProps) {
  return (
    <div className="overflow-x-auto flex gap-2 pb-2 mb-4 scrollbar-none">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={cn(
            "whitespace-nowrap py-1.5 px-3 rounded-full text-sm font-medium transition-colors",
            activeFilter === filter
              ? "bg-emily-pink text-white shadow-sm"
              : "bg-white/70 text-gray-500 hover:bg-white"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
