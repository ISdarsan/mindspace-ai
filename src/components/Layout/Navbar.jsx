import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Activity, BarChart2, BookOpen, Wind } from 'lucide-react';
import { cn } from '../ui/GlassCard';

export const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: Activity },
    { name: 'Insights', path: '/insights', icon: BarChart2 },
    { name: 'Calm Mode', path: '/calm', icon: Wind },
    { name: 'Reflection', path: '/reflection', icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass rounded-none border-b border-white/10 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold text-gradient">MindSpace AI</span>
          </Link>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors duration-200",
                      isActive 
                        ? "text-purple-300 bg-white/10" 
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
