import React from 'react';
import { motion } from 'framer-motion';
import { cn } from './GlassCard';

export const NeonButton = ({ children, className, variant = 'primary', onClick, type = "button", ...props }) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl overflow-hidden group";
  
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-500 text-white neon-glow-strong px-6 py-3",
    secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 px-6 py-3",
    ghost: "bg-transparent hover:bg-white/5 text-purple-300 hover:text-purple-200 px-4 py-2"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      )}
    </motion.button>
  );
};
