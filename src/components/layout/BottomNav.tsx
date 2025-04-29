
import { Heart, Calendar, BookOpen, Image, PenLine, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Heart, path: '/', label: 'Home' },
  { icon: Image, path: '/dresses', label: 'Dresses' },
  { icon: Sparkles, path: '/pokemon', label: 'Pokémon' },
  { icon: BookOpen, path: '/anime', label: 'Anime' },
  { icon: PenLine, path: '/journal', label: 'Journal' },
  { icon: Calendar, path: '/calendar', label: 'Calendar' },
];

export default function BottomNav() {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 border-t border-emily-pink bg-white/80 backdrop-blur-md">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              isActive ? "text-emily-pink" : "text-gray-400"
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5 mb-0.5",
                isActive && "animate-heart-beat"
              )}
            />
            <span className="text-xs font-medium">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
