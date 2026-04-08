import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BarChart2, TrendingUp, Calendar, Brain } from 'lucide-react';
import { PageTransition } from '../components/Layout/PageTransition';
import { GlassCard } from '../components/ui/GlassCard';

const mockData = [
  { name: 'Mon', mood: 40, clarity: 30 },
  { name: 'Tue', mood: 60, clarity: 50 },
  { name: 'Wed', mood: 45, clarity: 40 },
  { name: 'Thu', mood: 70, clarity: 65 },
  { name: 'Fri', mood: 80, clarity: 75 },
  { name: 'Sat', mood: 85, clarity: 80 },
  { name: 'Sun', mood: 75, clarity: 70 },
];

const mockHistory = [
  { id: 1, date: 'Today, 10:30 AM', thought: 'Worried about the presentation tomorrow...', emotion: 'Anxious', reframe: 'Preparation reduces uncertainty. You are ready.' },
  { id: 2, date: 'Yesterday, 8:00 PM', thought: 'Feeling like I didn\'t accomplish enough today.', emotion: 'Guilty', reframe: 'Rest is productive. Not every day needs to be a hustle.' },
  { id: 3, date: 'Mon, 9:15 AM', thought: 'Excited but nervous about the new project.', emotion: 'Hopeful', reframe: 'Nervous energy is just excitement in disguise. Channel it.' },
];

export const Insights = () => {
  return (
    <PageTransition className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gradient flex items-center">
            <BarChart2 className="w-10 h-10 mr-3 text-purple-400" />
            Your MindSpace
          </h1>
          <p className="text-indigo-200 mt-2">Track your mental patterns over time.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <GlassCard className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-indigo-400" />
            Weekly Mood & Clarity
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
                <XAxis dataKey="name" stroke="#a5b4fc" tick={{fill: '#a5b4fc'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#a5b4fc" tick={{fill: '#a5b4fc'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#3b82f633', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="mood" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />
                <Area type="monotone" dataKey="clarity" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorClarity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Stats Summary */}
        <div className="space-y-6">
          <GlassCard className="h-full flex flex-col justify-center border-t-4 border-emerald-400">
            <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Most Frequent Emotion</h4>
            <div className="text-4xl font-bold text-white mb-2 flex items-center">
              Anxious <span className="text-sm text-emerald-400 ml-3 flex items-center"><TrendingUp className="w-4 h-4 mr-1 rotate-180" /> -12%</span>
            </div>
            <p className="text-indigo-200 text-sm">You've been managing anxiety better this week.</p>
          </GlassCard>

          <GlassCard className="h-full flex flex-col justify-center border-t-4 border-purple-400">
            <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Thoughts Reframed</h4>
            <div className="text-4xl font-bold text-white mb-2">
              24 <span className="text-sm text-purple-400 ml-3 flex items-center"><Brain className="w-4 h-4 mr-1" /> Total</span>
            </div>
            <p className="text-indigo-200 text-sm">Consistent perspective shifts!</p>
          </GlassCard>
        </div>
      </div>

      {/* Timeline */}
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center px-2">
        <Calendar className="w-5 h-5 mr-2 text-indigo-400" />
        Thought History
      </h3>
      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {mockHistory.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 group-[.is-active]:bg-purple-900 text-purple-400 group-[.is-active]:text-purple-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
              <Brain className="w-4 h-4" />
            </div>
            <GlassCard className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 hover:border-purple-500/30 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">{item.date}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-purple-300">{item.emotion}</span>
              </div>
              <p className="text-slate-300 italic text-sm mb-3">"{item.thought}"</p>
              <div className="text-sm text-indigo-200 border-l-2 border-purple-500/50 pl-3 py-1">
                {item.reframe}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
};
