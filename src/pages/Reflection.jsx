import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Moon, Sun, CloudRain, Zap } from 'lucide-react';
import { analyzeThought } from '../lib/gemini';
import { PageTransition } from '../components/Layout/PageTransition';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';

export const Reflection = () => {
  const [reflectionText, setReflectionText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleReflect = async (e) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    setLoading(true);
    
    const thoughtContext = `This is my daily reflection: "${reflectionText}". Extract the core emotion, summarize my day empathetically, point out if I'm being too hard on myself (overthinking), reframe the day positively, and give me a micro-step for a good night's sleep.`;
    
    try {
      const data = await analyzeThought(thoughtContext);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <BookOpen className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Daily Reflection</h1>
        <p className="text-indigo-200">Close out your day by letting your thoughts out. We'll find the silver linings.</p>
      </div>

      {!result && !loading ? (
        <GlassCard className="mb-8">
          <form onSubmit={handleReflect} className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-2">How was your day?</h3>
            <p className="text-sm text-slate-400 mb-4">Write freely about your highs, lows, or lingering thoughts.</p>
            <textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Today was..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none h-48 backdrop-blur-[2px]"
              required
            />
            
            <div className="flex justify-end">
              <NeonButton type="submit" disabled={!reflectionText.trim()} className="bg-emerald-600 hover:bg-emerald-500 neon-glow">
                <Moon className="w-5 h-5 mr-2" /> Reflect & Unwind
              </NeonButton>
            </div>
          </form>
        </GlassCard>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
            <Sun className="w-16 h-16 text-emerald-500" />
          </motion.div>
          <p className="mt-6 text-xl text-emerald-200 animate-pulse">Distilling your day into insights...</p>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => {setResult(null); setReflectionText('');}} 
                className="text-emerald-300 hover:text-white transition-colors text-sm font-medium"
              >
                New Entry
              </button>
            </div>

            <GlassCard className="border-t-4 border-emerald-500 text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-xl font-semibold text-emerald-300 mb-4">Day's Summary</h2>
              <p className="text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">{result.analysis}</p>
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard>
                 <h3 className="font-semibold text-red-300 flex items-center mb-3">
                  <CloudRain className="w-5 h-5 mr-2" /> Friction Points
                </h3>
                <p className="text-slate-300">{result.overthinking}</p>
              </GlassCard>
              
              <GlassCard>
                 <h3 className="font-semibold text-yellow-300 flex items-center mb-3">
                  <Sparkles className="w-5 h-5 mr-2" /> Silver Lining
                </h3>
                <p className="text-slate-300">{result.reframe}</p>
              </GlassCard>
            </div>

            <GlassCard className="neon-glow bg-gradient-to-r from-emerald-900/40 to-transparent border-emerald-500/30">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 bg-emerald-500/20 rounded-full shrink-0">
                  <Moon className="w-8 h-8 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-2">Goodnight Action</h3>
                  <p className="text-lg text-emerald-200">{result.micro_step}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      )}
    </PageTransition>
  );
};
