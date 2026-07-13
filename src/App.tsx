import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { LandingView } from './components/LandingView';
import { SmartDashboard } from './components/SmartDashboard';
import { FishDensityView } from './components/FishDensityView';
import { DisasterPreparedness } from './components/DisasterPreparedness';
import { EnvironmentalMonitoring } from './components/EnvironmentalMonitoring';
import { AqualisAssistant } from './components/AqualisAssistant';
import { BlockchainLedger } from './components/BlockchainLedger';
import { UseCasesView } from './components/UseCasesView';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [earnedTokens, setEarnedTokens] = useState(250); // initial GuardTokens
  const [unreadAlertsCount] = useState(1);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEarnTokens = (amount: number) => {
    setEarnedTokens((prev) => prev + amount);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Interactive Cursor Spotlight Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.07), transparent 70%)`
        }}
      />

      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        earnedTokens={earnedTokens}
        unreadAlertsCount={unreadAlertsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {activeTab === 'home' && <LandingView setActiveTab={setActiveTab} />}
            {activeTab === 'dashboard' && <SmartDashboard setActiveTab={setActiveTab} />}
            {activeTab === 'fish' && <FishDensityView />}
            {activeTab === 'disaster' && <DisasterPreparedness />}
            {activeTab === 'environment' && <EnvironmentalMonitoring onEarnTokens={handleEarnTokens} />}
            {activeTab === 'aqualis' && <AqualisAssistant />}
            {activeTab === 'blockchain' && <BlockchainLedger />}
            {activeTab === 'usecases' && <UseCasesView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 mt-16 text-center text-xs text-slate-500 font-mono relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 BlueGuard AI • Empowering Fishermen Through Smart Technology</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1.5" />
              Node Mesh Online
            </span>
            <span>Secured by PoEI Blockchain</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

