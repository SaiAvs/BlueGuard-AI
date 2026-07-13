import React from 'react';
import { 
  Anchor, 
  Home,
  Compass, 
  Fish, 
  ShieldAlert, 
  Leaf, 
  Bot, 
  Layers, 
  BookOpen, 
  Coins, 
  Radio,
  Wifi
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  earnedTokens: number;
  unreadAlertsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  earnedTokens, 
  unreadAlertsCount 
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Smart Dashboard', icon: Compass },
    { id: 'fish', label: 'AI Fish Density', icon: Fish },
    { id: 'disaster', label: 'Disaster Prep', icon: ShieldAlert, badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined },
    { id: 'environment', label: 'Marine Health & Pollution', icon: Leaf },
    { id: 'aqualis', label: 'Aqualis AI', icon: Bot },
    { id: 'blockchain', label: 'Blockchain Ledger', icon: Layers },
    { id: 'usecases', label: 'Vision & Use Cases', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Anchor className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent font-sans">
                  BlueGuard AI
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  <Wifi className="w-3 h-3 mr-1 text-emerald-400 animate-pulse" /> LIVE STREAM
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans tracking-wide">
                Empowering Fishermen Through Smart Technology
              </p>
            </div>
          </div>

          {/* Wallet / Tokens Badge */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-900/90 border border-teal-500/30 px-3.5 py-1.5 rounded-full shadow-inner">
              <Coins className="w-4 h-4 text-amber-400 animate-bounce" />
              <span className="text-xs font-mono font-medium text-slate-300">GuardTokens:</span>
              <span className="text-sm font-mono font-bold text-teal-300">{earnedTokens} GT</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-ping" />
              <span>Sat-Link: Active</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600/30 to-teal-600/30 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500 text-white font-bold animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
