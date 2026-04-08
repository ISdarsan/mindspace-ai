import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, ArrowLeft, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/Layout/PageTransition';

export const CalmMode = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('breathe in'); // breathe in, hold, breathe out
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    let timeout;
    if (phase === 'breathe in') {
      timeout = setTimeout(() => setPhase('hold'), 4000);
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('breathe out'), 4000);
    } else if (phase === 'breathe out') {
      timeout = setTimeout(() => setPhase('breathe in'), 4000);
    }

    return () => clearTimeout(timeout);
  }, [phase, isActive]);

  return (
    <PageTransition className="fixed inset-0 z-50 bg-gradient-to-br from-[#0f172a] via-black to-[#000000] text-slate-100 flex flex-col items-center justify-center overflow-hidden">
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 flex items-center text-white/50 hover:text-white transition-colors group z-50 text-xl font-light"
      >
        <ArrowLeft className="w-6 h-6 mr-3 group-hover:-translate-x-2 transition-transform" />
        Exit Calm Mode
      </button>

      {!isActive ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <Wind className="w-24 h-24 text-blue-400 mx-auto mb-8 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-4">Find your center</h1>
          <p className="text-xl text-blue-200/50 mb-12 max-w-md mx-auto font-light">
            Follow the circle. Breathe in deeply, hold, and release.
          </p>
          <button 
            onClick={() => { setIsActive(true); setPhase('breathe in'); }}
            className="px-12 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xl tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
          >
            Begin
          </button>
        </motion.div>
      ) : (
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className="absolute top-1/4 text-4xl font-light tracking-[0.2em] text-blue-200 uppercase"
            >
              {phase}
            </motion.h2>
          </AnimatePresence>

          {/* Breathing Circle */}
          <motion.div
            animate={{
              scale: phase === 'breathe in' ? 2.5 : phase === 'breathe out' ? 1 : phase === 'hold' ? 2.5 : 1,
              opacity: phase === 'hold' ? 0.8 : 0.5
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-xl absolute"
          />
          <motion.div
            animate={{
              scale: phase === 'breathe in' ? 2 : phase === 'breathe out' ? 0.8 : phase === 'hold' ? 2 : 0.8,
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="w-32 h-32 rounded-full border-2 border-blue-400/30 shadow-[0_0_50px_rgba(59,130,246,0.3)] absolute"
          />
          
          <div className="absolute bottom-12 flex items-center text-white/30 text-sm font-light tracking-wider">
            <Headphones className="w-4 h-4 mr-2" />
            Best experienced with headphones
          </div>
        </div>
      )}
    </PageTransition>
  );
};
