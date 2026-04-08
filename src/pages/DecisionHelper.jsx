import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Split, Sparkles, Scale, ArrowRight, BrainCircuit } from 'lucide-react';
import { analyzeThought } from '../lib/gemini';
import { PageTransition } from '../components/Layout/PageTransition';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';

export const DecisionHelper = () => {
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleDecide = async (e) => {
    e.preventDefault();
    if (!optionA || !optionB) return;
    setLoading(true);
    
    // Using a special prompt context for the same JSON schema but tailored to decision making.
    const thoughtContext = `I need to decide between Option A: "${optionA}" and Option B: "${optionB}". Context: ${context}. Help me break this down.`;
    
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
    <PageTransition className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <Split className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Decision Helper</h1>
        <p className="text-indigo-200">Stuck between two choices? Let's weigh them objectively.</p>
      </div>

      {!result && !loading ? (
        <GlassCard className="max-w-3xl mx-auto">
          <form onSubmit={handleDecide} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full flex items-center justify-center border border-white/10 z-10 font-bold text-slate-400 hidden md:flex">
                VS
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-purple-300 uppercase tracking-wider">Option A</label>
                <textarea
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  placeholder="e.g. Taking the new job offer"
                  className="w-full bg-white/5 border border-purple-500/20 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none h-32"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-blue-300 uppercase tracking-wider">Option B</label>
                <textarea
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  placeholder="e.g. Staying at my current company"
                  className="w-full bg-white/5 border border-blue-500/20 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none h-32"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Any additional context? (Optional)</label>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="What feels most important right now?"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div className="flex justify-center">
              <NeonButton type="submit" disabled={!optionA || !optionB} className="w-full md:w-auto px-12">
                <Scale className="w-5 h-5 mr-2" /> Compare Options
              </NeonButton>
            </div>
          </form>
        </GlassCard>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
            <BrainCircuit className="w-16 h-16 text-purple-500" />
          </motion.div>
          <p className="mt-6 text-xl text-indigo-200 animate-pulse">Weighing the outcomes...</p>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Decision Analysis</h2>
              <button 
                onClick={() => setResult(null)} 
                className="text-indigo-300 hover:text-white transition-colors text-sm font-medium"
              >
                Start Over
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard className="border-t-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-300 mb-2">Option A</h3>
                <p className="text-slate-300 italic mb-4">"{optionA}"</p>
              </GlassCard>
              
              <GlassCard className="border-t-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-300 mb-2">Option B</h3>
                <p className="text-slate-300 italic mb-4">"{optionB}"</p>
              </GlassCard>
            </div>
            
            <GlassCard className="bg-gradient-to-r from-white/5 to-purple-500/10">
              <h3 className="font-semibold text-purple-300 mb-3 flex items-center">
                <Scale className="w-5 h-5 mr-2" /> Objective Breakdown
              </h3>
              <p className="text-lg text-slate-200 leading-relaxed">{result.analysis}</p>
            </GlassCard>

            <GlassCard className="neon-glow">
              <h3 className="font-bold text-xl text-white mb-4 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-yellow-400" /> Recommendation
              </h3>
              <p className="text-lg text-purple-200 mb-6">{result.reframe}</p>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" /> Next Steps
                </h4>
                <ul className="space-y-2 text-slate-300">
                  {Array.isArray(result?.actions) ? result.actions.map((act, i) => (
                    <li key={i}>• {act}</li>
                  )) : (
                    <li>• Trust your gut instinct.</li>
                  )}
                </ul>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      )}
    </PageTransition>
  );
};
