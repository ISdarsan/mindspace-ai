import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Wind, Split, BookOpen } from 'lucide-react';
import { PageTransition } from '../components/Layout/PageTransition';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';

export const Dashboard = () => {
  const [thought, setThought] = useState('');
  const [mood, setMood] = useState(50);
  const navigate = useNavigate();

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!thought.trim()) return;
    navigate('/result', { state: { thought, mood } });
  };

  return (
    <PageTransition className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex justify-center items-center mb-4"
        >
          <div className="relative">
            <Brain className="w-16 h-16 text-purple-400" />
            <Sparkles className="w-6 h-6 text-indigo-300 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </motion.div>
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          MindSpace AI
        </motion.h1>
        <motion.p 
          className="text-lg text-indigo-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          What's on your mind right now? Let's unpack it together.
        </motion.p>
      </div>

      <GlassCard className="mb-8">
        <form onSubmit={handleAnalyze} className="space-y-6">
          <div>
            <textarea
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="I'm feeling overwhelmed about..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none h-32 backdrop-blur-sm transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-indigo-200">
              <span>Stressed</span>
              <span>Balanced</span>
              <span>Calm</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={mood}
              onChange={(e) => setMood(parseInt(e.target.value))}
              className="w-full accent-purple-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex justify-end">
            <NeonButton type="submit" disabled={!thought.trim()}>
              <Sparkles className="w-5 h-5" />
              Analyze Thought
            </NeonButton>
          </div>
        </form>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard containerProps={{
          whileHover: { y: -5, scale: 1.02 },
          whileTap: { scale: 0.98 },
          onClick: () => navigate('/calm'),
          className: "cursor-pointer group flex flex-col items-center justify-center text-center p-6"
        }}>
          <div className="p-3 bg-blue-500/20 rounded-full mb-3 group-hover:bg-blue-500/30 transition-colors">
            <Wind className="w-6 h-6 text-blue-300" />
          </div>
          <h3 className="font-semibold text-white">I feel stressed</h3>
          <p className="text-sm text-white/50 mt-1">Quick breathing exercise</p>
        </GlassCard>

        <GlassCard containerProps={{
          whileHover: { y: -5, scale: 1.02 },
          whileTap: { scale: 0.98 },
          onClick: () => navigate('/decision'),
          className: "cursor-pointer group flex flex-col items-center justify-center text-center p-6"
        }}>
          <div className="p-3 bg-purple-500/20 rounded-full mb-3 group-hover:bg-purple-500/30 transition-colors">
            <Split className="w-6 h-6 text-purple-300" />
          </div>
          <h3 className="font-semibold text-white">Help me decide</h3>
          <p className="text-sm text-white/50 mt-1">Compare choices</p>
        </GlassCard>

        <GlassCard containerProps={{
          whileHover: { y: -5, scale: 1.02 },
          whileTap: { scale: 0.98 },
          onClick: () => navigate('/reflection'),
          className: "cursor-pointer group flex flex-col items-center justify-center text-center p-6"
        }}>
          <div className="p-3 bg-emerald-500/20 rounded-full mb-3 group-hover:bg-emerald-500/30 transition-colors">
            <BookOpen className="w-6 h-6 text-emerald-300" />
          </div>
          <h3 className="font-semibold text-white">Daily reflection</h3>
          <p className="text-sm text-white/50 mt-1">Log your day</p>
        </GlassCard>
      </div>
    </PageTransition>
  );
};
