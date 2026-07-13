import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Upload, 
  Camera, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  Coins, 
  ShieldCheck, 
  FileText,
  MapPin,
  TrendingDown
} from 'lucide-react';
import { PollutionReport, MarineHealthIndicator } from '../types';

interface EnvironmentalMonitoringProps {
  onEarnTokens: (amount: number) => void;
}

export const EnvironmentalMonitoring: React.FC<EnvironmentalMonitoringProps> = ({ onEarnTokens }) => {
  const [reports, setReports] = useState<PollutionReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [pollutionType, setPollutionType] = useState<'Plastic Debris' | 'Oil Spill' | 'Chemical Discharge' | 'Algal Bloom' | 'Ghost Net' | 'Other'>('Plastic Debris');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'Critical'>('Medium');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [reporter, setReporter] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pollution-reports');
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location) {
      alert("Please fill in title and location");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title,
        location,
        latitude: 13.08 + (Math.random() - 0.5) * 0.5,
        longitude: 80.27 + (Math.random() - 0.5) * 0.5,
        pollutionType,
        severity,
        description,
        imageUrl: imagePreview || "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
        reporter: reporter || "Captain Ramesh Kumar"
      };

      const res = await fetch('/api/pollution-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const newReport = await res.json();

      setReports([newReport, ...reports]);
      onEarnTokens(newReport.rewardTokens);
      setSuccessMsg(`Report successfully logged! +${newReport.rewardTokens} GuardTokens awarded to your wallet & hashed on blockchain.`);

      // Reset form
      setTitle('');
      setLocation('');
      setDescription('');
      setImagePreview('');
      setReporter('');

      setTimeout(() => setSuccessMsg(''), 6000);
    } catch (err) {
      console.error("Failed to submit report:", err);
      alert("Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  const marineIndicators: MarineHealthIndicator[] = [
    { metric: "Ocean pH Balance", value: "8.02 pH", status: "Optimal", change: "-0.01 vs avg", description: "Stable alkaline balance across coastal shelf." },
    { metric: "Dissolved Oxygen", value: "6.4 mg/L", status: "Optimal", change: "+0.3 mg/L", description: "Healthy oxygenation supporting diverse fish shoals." },
    { metric: "Microplastic Density", value: "1.48 particles/m³", status: "Warning", change: "+12% YoY", description: "Elevated micro-debris near industrial river mouths." },
    { metric: "SST Anomaly", value: "+0.4°C", status: "Warning", change: "Mild warming", description: "Slight thermal elevation requiring reef monitoring." },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-teal-500/30 p-6 rounded-3xl shadow-xl backdrop-blur-xl">
        <div className="flex items-center space-x-2 text-teal-400 text-xs font-mono mb-1">
          <Leaf className="w-4 h-4" />
          <span>MARINE CONSERVATION & ECOSYSTEM MONITORING</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight font-sans">
          Environmental Monitoring & Pollution Reporting
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Upload photos of pollution or ghost nets. Our Gemini multimodal AI analyzes hazards and logs them to the immutable blockchain while rewarding you with GuardTokens.
        </p>
      </div>

      {/* Marine Health Indicators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {marineIndicators.map((ind, idx) => (
          <div key={idx} className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl shadow-lg relative overflow-hidden group hover:border-teal-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">{ind.metric}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                ind.status === 'Optimal' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-amber-950 text-amber-300 border border-amber-500/30'
              }`}>
                {ind.status}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold font-mono text-slate-100">{ind.value}</div>
              <p className="text-xs text-slate-400 mt-1">{ind.description}</p>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${
              ind.status === 'Optimal' ? 'bg-emerald-500' : 'bg-amber-500'
            }`} />
          </div>
        ))}
      </div>

      {/* Main Grid: Submit Report Form & Reports Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Submit Pollution Report Form */}
        <div className="bg-slate-900/90 border border-teal-500/30 p-6 rounded-3xl shadow-xl">
          <div className="flex items-center space-x-2 mb-4">
            <Camera className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
              Report Hazard / Pollution
            </h3>
          </div>

          {successMsg && (
            <div className="mb-4 bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-emerald-200 text-xs font-mono space-y-1">
              <div className="font-bold flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-400" /> Success!
              </div>
              <div>{successMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div>
              <label className="text-[11px] font-mono text-slate-400 mb-1 block">HAZARD TITLE *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Abandoned Ghost Net near reef"
                required
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:border-teal-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 mb-1 block">POLLUTION TYPE</label>
                <select
                  value={pollutionType}
                  onChange={(e) => setPollutionType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:border-teal-500 outline-none"
                >
                  <option value="Plastic Debris">Plastic Debris</option>
                  <option value="Ghost Net">Ghost Net</option>
                  <option value="Oil Spill">Oil Spill</option>
                  <option value="Chemical Discharge">Chemical Discharge</option>
                  <option value="Algal Bloom">Algal Bloom</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 mb-1 block">SEVERITY</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:border-teal-500 outline-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 mb-1 block">LOCATION / COORDINATES *</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Andaman Sea Sector 4 (11.7° N)"
                required
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:border-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 mb-1 block">IMAGE UPLOAD (AI MULTIMODAL SCAN)</label>
              <div className="flex items-center space-x-3">
                <label className="flex-1 cursor-pointer bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 hover:border-teal-500 rounded-xl p-4 text-center transition-all">
                  <Upload className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-300 font-mono">Click to browse or snap photo</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {imagePreview && (
                  <div className="w-16 h-16 rounded-xl border border-teal-500/50 overflow-hidden shrink-0">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 mb-1 block">DESCRIPTION</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe scope, potential impact on marine life..."
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:border-teal-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 mb-1 block">REPORTER NAME / VESSEL</label>
              <input
                type="text"
                value={reporter}
                onChange={(e) => setReporter(e.target.value)}
                placeholder="e.g. Captain Ramesh (Matsya-07)"
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:border-teal-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Coins className="w-4 h-4 text-amber-300" />}
              <span>Verify & Log to Blockchain (+Tokens)</span>
            </button>
          </form>
        </div>

        {/* Right 2 Cols: Verified Reports Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">
              Verified Marine Reports ({reports.length})
            </h3>
            <span className="text-xs font-mono text-cyan-400 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1" /> Immutable Ledger Records
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
            </div>
          ) : (
            reports.map((rep) => (
              <div key={rep.id} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-teal-950 text-teal-300 border border-teal-500/30">
                        {rep.id}
                      </span>
                      <h4 className="text-base font-bold text-slate-100">{rep.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        rep.severity === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-500/40' : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}>
                        {rep.severity} Severity
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-slate-400 font-mono">
                      <span className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-teal-400" /> {rep.location}
                      </span>
                      <span>By {rep.reporter}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-teal-300">+{rep.rewardTokens} GuardTokens</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  {rep.imageUrl && (
                    <div className="rounded-2xl overflow-hidden border border-slate-800 h-36">
                      <img src={rep.imageUrl} alt={rep.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="md:col-span-2 space-y-2">
                    <p className="text-xs text-slate-300">{rep.description}</p>
                    
                    {rep.aiAnalysis && (
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
                        <div className="text-[10px] font-mono text-cyan-400 font-bold">GEMINI AI MULTIMODAL ANALYSIS:</div>
                        <p className="text-xs text-slate-300">{rep.aiAnalysis.riskAssessment}</p>
                        <p className="text-xs text-teal-300 font-mono">Action: {rep.aiAnalysis.suggestedAction}</p>
                      </div>
                    )}

                    <div className="text-[10px] font-mono text-slate-500 truncate">
                      Blockchain Hash: <span className="text-cyan-400">{rep.blockchainHash}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
};
