import React from 'react';
import { 
  BookOpen, 
  Fish, 
  ShieldCheck, 
  TrendingUp, 
  Globe, 
  Coins, 
  Award,
  ArrowRight
} from 'lucide-react';

export const UseCasesView: React.FC = () => {
  const useCases = [
    {
      title: "Sustainable Fisheries Management",
      desc: "Empowering artisanal and commercial fishermen with AI-driven fish density heatmaps, reducing fuel wastage by 22% while preventing overfishing and protecting juvenile breeding stocks.",
      icon: Fish
    },
    {
      title: "Ocean Conservation Initiatives",
      desc: "Enabling NGOs and coastal communities to track marine pollution, ghost nets, and coral bleaching in real-time with blockchain-verified photographic evidence and decentralized reward tokenomics.",
      icon: ShieldCheck
    },
    {
      title: "Climate Research & Modeling",
      desc: "Providing universities and meteorological agencies with high-precision sea surface temperature, wave height, and dissolved oxygen datasets to model ocean acidification and climate impacts.",
      icon: Globe
    },
    {
      title: "Smart Coastal Management",
      desc: "Assisting port authorities and disaster management agencies with early tsunami warnings, storm surge forecasting, and emergency SOS tracking systems.",
      icon: TrendingUp
    }
  ];

  const revenueModels = [
    { title: "Real-Time Intelligence Subscriptions", desc: "Premium tier for commercial fishing fleets providing hyper-local sonar & current predictions." },
    { title: "Government & NGO Partnerships", desc: "Data-sharing licenses for maritime security, coastal zoning, and environmental compliance." },
    { title: "Data-as-a-Service (DaaS) APIs", desc: "Enterprise APIs for marine logistics, insurance underwriting, and oceanographic research." },
    { title: "Marine Business Integrations", desc: "In-app marketplaces for sustainable gear, cold-chain logistics, and fish auctions." }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header & Vision */}
      <div className="bg-slate-900/90 border border-cyan-500/30 p-8 rounded-3xl shadow-xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-2">
          <BookOpen className="w-4 h-4" />
          <span>BLUEGUARD AI PLATFORM ARCHITECTURE & VISION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight font-sans">
          Empowering Fishermen & Protecting Oceans
        </h1>
        <p className="text-base text-slate-300 mt-3 leading-relaxed max-w-4xl">
          BlueGuard AI connects fishermen, NGOs, environmental agencies, and ocean data systems into a single intelligent ecosystem. By combining Artificial Intelligence, real-time analytics, and blockchain technology, we improve livelihoods while safeguarding marine biodiversity.
        </p>

        <div className="mt-6 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 font-mono flex items-center space-x-3">
          <Award className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>Vision: Create a world where every fisherman has access to intelligent ocean insights and every piece of marine data contributes toward safer livelihoods and healthier oceans.</span>
        </div>
      </div>

      {/* Use Cases Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-200 font-mono uppercase tracking-wider">
          Core Use Cases & Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl flex items-start space-x-4 group hover:border-cyan-500/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">{uc.title}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Revenue Model */}
      <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-slate-200 font-mono uppercase tracking-wider flex items-center">
          <Coins className="w-5 h-5 mr-2 text-amber-400" />
          Sustainable Revenue Model
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {revenueModels.map((rev, idx) => (
            <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-teal-300">{rev.title}</h4>
                <p className="text-xs text-slate-400 mt-2">{rev.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-cyan-400 flex items-center">
                <span>Enterprise Tier</span> <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
