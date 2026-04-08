import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Target, BrainCircuit, Heart, Zap, ShieldAlert, CheckCircle2, Sparkles } from 'lucide-react';
import { analyzeThought } from '../lib/gemini';
import { PageTransition } from '../components/Layout/PageTransition';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';

export const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const thought = location.state?.thought;

  useEffect(() => {
    if (!thought) return;
    
    const fetchAnalysis = async () => {
      try {
        const data = await analyzeThought(thought);
        setResult(data);
      } catch (err) {
        setError('Failed to analyze thought. Please make sure the Gemini API key is valid.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalysis();
  }, [thought]);

  if (!thought) {
    return <Navigate to="/" />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <PageTransition className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center text-indigo-300 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <BrainCircuit className="w-16 h-16 text-purple-500" />
          </motion.div>
          <p className="mt-6 text-xl text-indigo-200 animate-pulse">MindSpace AI is analyzing your thoughts...</p>
        </div>
      )}

      {error && (
        <GlassCard className="border-red-500/50 bg-red-500/10 text-center">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-200 mb-2">Analysis Failed</h2>
          <p className="text-red-300/80 mb-6">{error}</p>
          <NeonButton variant="ghost" onClick={() => navigate('/')}>Try Again</NeonButton>
        </GlassCard>
      )}

      {result && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Main Thought Review */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <GlassCard className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
              <h2 className="text-sm uppercase tracking-wider text-purple-300 font-semibold mb-2 flex items-center">
                <BrainCircuit className="w-4 h-4 mr-2" />
                Original Thought
              </h2>
              <p className="text-lg italic text-slate-300 border-l-4 border-purple-500/30 pl-4 py-2">"{thought}"</p>
            </GlassCard>
          </motion.div>

          {/* Emotion Card */}
          <motion.div variants={itemVariants}>
            <GlassCard className="h-full bg-gradient-to-br from-white/5 to-indigo-500/5 hover:border-indigo-500/30 transition-colors">
              <h3 className="font-semibold text-indigo-300 flex items-center mb-3">
                <Heart className="w-5 h-5 mr-2" /> Emotion Detected
              </h3>
              <p className="text-3xl font-bold text-white mb-2">{result.emotion}</p>
              <p className="text-sm text-indigo-200/80">Acknowledging how you feel is the first step.</p>
            </GlassCard>
          </motion.div>

          {/* Analysis Card */}
          <motion.div variants={itemVariants}>
            <GlassCard className="h-full">
              <h3 className="font-semibold text-purple-300 flex items-center mb-3">
                <Target className="w-5 h-5 mr-2" /> AI Analysis
              </h3>
              <p className="text-slate-300 leading-relaxed">{result.analysis}</p>
            </GlassCard>
          </motion.div>

          {/* Overthinking & Reframe */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <GlassCard className="bg-gradient-to-r from-red-500/5 via-transparent to-emerald-500/5 border-white/5">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-red-300 flex items-center mb-3">
                    <ShieldAlert className="w-5 h-5 mr-2" /> Overthinking Pattern
                  </h3>
                  <p className="text-slate-300">{result.overthinking}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-300 flex items-center mb-3">
                    <Zap className="w-5 h-5 mr-2 text-yellow-400" /> New Perspective
                  </h3>
                  <p className="text-slate-200 font-medium">{result.reframe}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Micro Step */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <GlassCard className="border-purple-500/30 neon-glow">
              <h3 className="font-bold text-xl text-white flex items-center mb-4">
                <Sparkles className="w-6 h-6 mr-2 text-purple-400" /> Next Micro-Step
              </h3>
              <p className="text-lg text-purple-200 mb-6">{result.micro_step}</p>
              
              <div className="border-t border-white/10 pt-4 mt-4">
                <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Other Actions</h4>
                <ul className="space-y-3">
                  {Array.isArray(result?.actions) ? result.actions.map((action, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{action}</span>
                    </li>
                  )) : (
                    <li className="text-slate-300 italic">Take a deep breath and give yourself some grace today.</li>
                  )}
                </ul>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </PageTransition>
  );
};
