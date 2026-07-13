import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Radio, 
  PhoneCall, 
  LifeBuoy, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Send
} from 'lucide-react';

export const DisasterPreparedness: React.FC = () => {
  const [sosSent, setSosSent] = useState(false);
  const [emergencyNotes, setEmergencyNotes] = useState('');

  const handleSOS = (e: React.FormEvent) => {
    e.preventDefault();
    setSosSent(true);
    setTimeout(() => {
      // reset after 5s or keep state
    }, 5000);
  };

  const emergencyContacts = [
    { name: "Indian Coast Guard Emergency", number: "1554 / +91-11-24382650", region: "National / Coastal" },
    { name: "Maritime Rescue Coordination Centre (MRCC)", number: "+91-22-24316558", region: "West Coast & Arabian Sea" },
    { name: "State Disaster Management Authority (SDMA)", number: "1077", region: "Coastal State Helpline" },
    { name: "BlueGuard AI Emergency Dispatch", number: "1800-BLUE-GUARD", region: "24/7 Satellite Beacon Relay" },
  ];

  const safetyProtocols = [
    { title: "Tsunami Evacuation Protocol", desc: "Move immediately to high ground (minimum 30 meters elevation or inland 3 km) upon receiving official tsunami warning or feeling strong prolonged tremors." },
    { title: "Severe Storm & Squall Safety", desc: "Secure all loose equipment, batten down hatches, wear life jackets immediately, and head towards the nearest sheltered harbor or lee of the coast." },
    { title: "Engine Failure & Drift Rescue", desc: "Drop sea anchor to maintain bow into wind/waves, broadcast MAYDAY on VHF Channel 16, and activate BlueGuard Satellite SOS beacon." },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-amber-500/30 p-6 rounded-3xl shadow-xl backdrop-blur-xl">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono mb-1">
          <ShieldAlert className="w-4 h-4 animate-bounce" />
          <span>REAL-TIME DISASTER SURVIVAL & EVACUATION SYSTEM</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight font-sans">
          Disaster Preparedness & Emergency SOS
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Instant tsunami warnings, storm surge advisories, and direct satellite rescue beacon integration.
        </p>
      </div>

      {/* Main Grid: SOS Beacon & Active Advisories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: SOS Emergency Beacon Simulator */}
        <div className="bg-slate-900/90 border border-rose-500/40 p-6 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Radio className="w-5 h-5 text-rose-400 animate-ping" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-rose-300 font-mono">
                  Satellite SOS Beacon
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-500/40 font-bold">
                PRIORITY 1
              </span>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              Triggering SOS immediately transmits your GPS coordinates (13.08° N, 80.27° E), vessel ID, and current ocean conditions to the nearest Coast Guard rescue station.
            </p>

            {sosSent ? (
              <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-emerald-200">SOS Signal Broadcasted Successfully!</h4>
                <p className="text-xs text-emerald-300 font-mono">
                  MRCC & Coast Guard ACK received. Rescue vessel dispatched to your coordinates. ETA: 24 mins.
                </p>
                <button
                  onClick={() => setSosSent(false)}
                  className="mt-2 text-xs font-mono text-cyan-300 underline"
                >
                  Reset Beacon
                </button>
              </div>
            ) : (
              <form onSubmit={handleSOS} className="space-y-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 mb-1 block">EMERGENCY NATURE (OPTIONAL)</label>
                  <input
                    type="text"
                    value={emergencyNotes}
                    onChange={(e) => setEmergencyNotes(e.target.value)}
                    placeholder="e.g. Engine failure in heavy swell / Injury on board"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:border-rose-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-rose-950 transition-all flex items-center justify-center space-x-2 animate-pulse"
                >
                  <LifeBuoy className="w-5 h-5" />
                  <span>TRANSMIT EMERGENCY SOS BEACON</span>
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>GPS Fix: 3D Locked</span>
            <span className="text-emerald-400">● 12 Satellites in view</span>
          </div>
        </div>

        {/* Right 2 Cols: Active Warnings & Protocols */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Warnings Card */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-200 mb-4 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-amber-400" />
              Active Regional Warnings & Bulletins
            </h3>

            <div className="space-y-3">
              <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-2xl flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-amber-300">Bay of Bengal Low-Pressure Squall Watch</h4>
                    <span className="text-[10px] font-mono bg-amber-900/50 text-amber-200 px-2 py-0.5 rounded">Level 2 Alert</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Wind speeds expected to reach 35-45 knots off the Odisha-Andhra coast. All small fishing craft advised to return to harbor by 18:00 IST.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-slate-200">Arabian Sea Safe Harbor Corridors</h4>
                    <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">Normal Operations</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    All western ports operational. Wave heights normal (1.2m - 1.5m).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts & Protocols Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Contacts */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center">
                <PhoneCall className="w-4 h-4 mr-2 text-cyan-400" />
                Emergency Helplines
              </h3>
              <div className="space-y-3">
                {emergencyContacts.map((c, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-200">{c.name}</div>
                    <div className="text-sm font-mono font-bold text-cyan-400 mt-0.5">{c.number}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{c.region}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Protocols */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center">
                <ShieldAlert className="w-4 h-4 mr-2 text-teal-400" />
                Survival Protocols
              </h3>
              <div className="space-y-3">
                {safetyProtocols.map((p, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold text-teal-300">{p.title}</div>
                    <p className="text-xs text-slate-300 mt-1">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
