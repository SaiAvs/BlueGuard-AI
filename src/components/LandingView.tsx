import React from 'react';
import { motion } from 'motion/react';
import { 
  Anchor, 
  Compass, 
  Fish, 
  ShieldAlert, 
  Leaf, 
  Bot, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe2,
  Sparkles
} from 'lucide-react';

interface LandingViewProps {
  setActiveTab: (tab: string) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 border border-cyan-500/20 px-6 sm:px-12 lg:px-16 text-center">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Next-Generation Ocean Intelligence & Fisherman Safety Network</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-tight">
            Navigating Waters with <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">AI Precision</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Empowering coastal communities with real-time meteorological telemetry, predictive fish density sonar scans, instant hazard alerts, and decentralized marine conservation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-cyan-950 transition-all flex items-center justify-center space-x-3 group"
            >
              <span>Launch Coastal Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab('fish')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center space-x-2 shadow-lg"
            >
              <Fish className="w-4 h-4 text-cyan-400" />
              <span>Explore Fish Density AI</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-slate-800/80 mt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">99.8%</div>
              <div className="text-xs text-slate-400 mt-1 font-mono uppercase">Telemetry Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-teal-400">12,450+</div>
              <div className="text-xs text-slate-400 mt-1 font-mono uppercase">Active Vessels</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">0 sec</div>
              <div className="text-xs text-slate-400 mt-1 font-mono uppercase">Storm Latency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-400">100%</div>
              <div className="text-xs text-slate-400 mt-1 font-mono uppercase">Decrypted Logs</div>
            </div>
          </div>
        </motion.div>

        {/* Ambient Ocean Waves Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden pointer-events-none opacity-40">
          <motion.div 
            animate={{ x: [0, -600, 0] }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="absolute bottom-0 w-[200%] flex"
          >
            <svg className="w-[1200px] h-20 text-cyan-500 fill-current opacity-30" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,50 L1200,120 L0,120 Z"></path>
            </svg>
            <svg className="w-[1200px] h-20 text-teal-400 fill-current opacity-20 -ml-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,20 C200,100 400,-10 600,60 C800,130 1000,0 1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Core Modules Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400">Modular Capabilities</h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">Designed for Simplicity & Zero Clutter</h3>
          <p className="text-sm text-slate-400">Access powerful maritime tools instantly without cognitive overload.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setActiveTab('dashboard')}
            className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 p-8 rounded-3xl shadow-xl cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">Smart Coastal Dashboard</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Type any coastal zone or region for real-time wave heights, wind speed telemetry, and circular progress meters.
              </p>
            </div>
            <div className="flex items-center text-xs font-mono text-cyan-400 mt-6 pt-4 border-t border-slate-800">
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setActiveTab('fish')}
            className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 p-8 rounded-3xl shadow-xl cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                <Fish className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 group-hover:text-teal-300 transition-colors">AI Fish Density Predictor</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Scan optimal fishing grounds using ocean chlorophyll, water temperature gradient, and estimated fuel yield calculations.
              </p>
            </div>
            <div className="flex items-center text-xs font-mono text-teal-400 mt-6 pt-4 border-t border-slate-800">
              <span>Launch Fish AI</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setActiveTab('disaster')}
            className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 p-8 rounded-3xl shadow-xl cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">Disaster Preparedness & SOS</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Instant storm surge warnings, tsunami watch advisories, offline emergency protocols, and 1-tap satellite distress signals.
              </p>
            </div>
            <div className="flex items-center text-xs font-mono text-amber-400 mt-6 pt-4 border-t border-slate-800">
              <span>View Safety Protocols</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setActiveTab('environment')}
            className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 p-8 rounded-3xl shadow-xl cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">Marine Health & Pollution</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Report plastic debris, oil spills, or ghost nets with AI image scanner and earn GuardTokens for ocean conservation.
              </p>
            </div>
            <div className="flex items-center text-xs font-mono text-emerald-400 mt-6 pt-4 border-t border-slate-800">
              <span>Report & Earn</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 5 */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setActiveTab('aqualis')}
            className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 p-8 rounded-3xl shadow-xl cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 group-hover:text-blue-300 transition-colors">Aqualis AI Assistant</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Ask questions about marine weather, fishing best practices, navigation laws, and emergency guidelines in natural language.
              </p>
            </div>
            <div className="flex items-center text-xs font-mono text-blue-400 mt-6 pt-4 border-t border-slate-800">
              <span>Chat with Aqualis</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 6 */}
          <motion.div 
            whileHover={{ y: -4 }}
            onClick={() => setActiveTab('blockchain')}
            className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 p-8 rounded-3xl shadow-xl cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 group-hover:text-purple-300 transition-colors">PoEI Blockchain Ledger</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Proof of Ecological Impact ledger verifying tamper-proof catch logs, pollution cleanup actions, and token rewards.
              </p>
            </div>
            <div className="flex items-center text-xs font-mono text-purple-400 mt-6 pt-4 border-t border-slate-800">
              <span>Inspect Ledger</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};
