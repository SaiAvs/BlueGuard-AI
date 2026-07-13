import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Waves, 
  Wind, 
  Thermometer, 
  Compass, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  MapPin, 
  RefreshCw,
  ArrowUpRight,
  Droplets,
  Zap
} from 'lucide-react';
import { OceanData } from '../types';

interface SmartDashboardProps {
  setActiveTab: (tab: string) => void;
}

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 160;
  const height = 30;
  
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
      <span className="text-[10px] font-mono text-slate-500 uppercase">24h History</span>
      <svg className="w-36 h-7 overflow-visible">
        <motion.polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={color}
          points={points}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
};

const CircularProgressMeter = ({ 
  percentage, 
  colorClass, 
  label, 
  valueDisplay, 
  subLabel, 
  icon,
  trendData
}: { 
  percentage: number; 
  colorClass: string; 
  label: string; 
  valueDisplay: string; 
  subLabel: string;
  icon: React.ReactNode;
  trendData?: number[];
}) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-cyan-500/40 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">{label}</span>
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-cyan-400">
              {icon}
            </div>
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-slate-800"
                  fill="transparent"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="4"
                  className={colorClass}
                  fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-slate-200">
                {Math.round(clampedPercentage)}%
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="text-3xl font-bold font-mono text-slate-100">
            {valueDisplay}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {subLabel}
          </p>
        </div>
      </div>
      {trendData && <Sparkline data={trendData} color={colorClass} />}
    </motion.div>
  );
};

export const SmartDashboard: React.FC<SmartDashboardProps> = ({ setActiveTab }) => {
  const [customArea, setCustomArea] = useState('Bay of Bengal - Central Zone');
  const [inputArea, setInputArea] = useState('Bay of Bengal - Central Zone');
  const [currentRegion, setCurrentRegion] = useState<OceanData>({
    region: "Bay of Bengal - Central Zone",
    waterTemp: 30.2,
    waveHeight: 2.8,
    windSpeed: 24,
    currentSpeed: 3.1,
    dissolvedOxygen: 5.9,
    phLevel: 7.9,
    chlorophyll: 3.8,
    tideStatus: "High Tide",
    safetyStatus: "CAUTION",
    tsunamiRisk: false,
    stormWarning: true,
    timestamp: new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [safetyFirstActive, setSafetyFirstActive] = useState(false);

  const isEmergencyThreshold = currentRegion.windSpeed > 20 || currentRegion.waveHeight > 2.0 || currentRegion.stormWarning;
  const isSafetyMode = safetyFirstActive || isEmergencyThreshold;

  const fetchOceanData = async (areaToFetch: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/ocean-conditions?region=${encodeURIComponent(areaToFetch)}`);
      const data = await res.json();
      setCurrentRegion(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Failed to fetch ocean conditions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOceanData(customArea);
  }, [customArea]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputArea.trim()) {
      setCustomArea(inputArea.trim());
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Free-Text Area Input */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-8 rounded-3xl shadow-xl backdrop-blur-xl transition-all ${
          isSafetyMode 
            ? 'bg-rose-950/90 border-2 border-rose-500 shadow-rose-950/50' 
            : 'bg-slate-900/90 border border-cyan-500/30'
        }`}
      >
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-2">
            <Activity className="w-4 h-4 animate-spin" />
            <span>REAL-TIME OCEAN INTELLIGENCE GRID</span>
            {isSafetyMode && (
              <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-bold text-[10px] animate-pulse">
                SAFETY FIRST OVERRIDE ACTIVE
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-100 tracking-tight font-sans">
            Coastal Command & Smart Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Type any coastal zone, sea, or GPS area to view live meteorological telemetry and safety advisories.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Safety First Toggle Button */}
          <button
            onClick={() => setSafetyFirstActive(!safetyFirstActive)}
            className={`px-4.5 py-3.5 rounded-2xl text-xs font-bold font-mono tracking-wider transition-all flex items-center space-x-2 shadow-lg ${
              safetyFirstActive 
                ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-rose-900/60 ring-2 ring-rose-400' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>SAFETY FIRST: {safetyFirstActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Free text search form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
            <div className="relative w-64">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
              <input
                type="text"
                value={inputArea}
                onChange={(e) => setInputArea(e.target.value)}
                placeholder="Type area (e.g. Goa, Maldives)..."
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-2xl pl-10 pr-4 py-3.5 focus:border-cyan-500 focus:outline-none transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center space-x-2 shrink-0"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Scan</span>}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Safety Mode Urgent High-Contrast Override Banner */}
      {isSafetyMode && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-rose-950 via-red-950 to-slate-950 border-2 border-rose-500 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-pulse"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/30 border border-rose-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-rose-400 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500 text-white font-bold tracking-wider">
                  ⚠️ HIGH-CONTRAST EMERGENCY OVERRIDE
                </span>
                <span className="text-xs text-rose-200 font-mono">Threshold Exceeded</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">
                Severe Marine Hazard Threshold Triggered ({currentRegion.region})
              </h2>
              <p className="text-xs text-rose-200 mt-1">
                Wind speed ({currentRegion.windSpeed} knots) or Wave height ({currentRegion.waveHeight}m) exceeds safe limits. All maritime operations in this corridor must halt immediately.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('disaster')}
            className="px-6 py-3 bg-white hover:bg-slate-100 text-rose-950 font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shrink-0 flex items-center space-x-2"
          >
            <span>Emergency Protocols</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Main Grid: Telemetry Cards & Interactive Map Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Live Telemetry Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Water Temp */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-cyan-500/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">WATER TEMPERATURE</span>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Thermometer className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-5">
              <div className="text-3xl font-bold font-mono text-slate-100">
                {currentRegion.waterTemp}°C
              </div>
              <p className="text-xs text-emerald-400 mt-2">
                Optimal thermal layer for pelagic species
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-400 opacity-60" />
          </motion.div>

          {/* Wave Height with Circular Progress */}
          <CircularProgressMeter
            percentage={(currentRegion.waveHeight / 5) * 100}
            colorClass="text-blue-400"
            label="WAVE HEIGHT & SWELL"
            valueDisplay={`${currentRegion.waveHeight} m`}
            subLabel={`Tide Status: ${currentRegion.tideStatus}`}
            icon={<Waves className="w-5 h-5 text-blue-400" />}
            trendData={[
              Math.max(0.5, currentRegion.waveHeight - 0.7),
              Math.max(0.5, currentRegion.waveHeight - 0.4),
              Math.max(0.5, currentRegion.waveHeight - 0.5),
              Math.max(0.5, currentRegion.waveHeight - 0.3),
              Math.max(0.5, currentRegion.waveHeight - 0.2),
              Math.max(0.5, currentRegion.waveHeight),
              Math.max(0.5, currentRegion.waveHeight + 0.3),
              Math.max(0.5, currentRegion.waveHeight + 0.1),
              Math.max(0.5, currentRegion.waveHeight - 0.1),
              currentRegion.waveHeight
            ]}
          />

          {/* Wind Speed with Circular Progress */}
          <CircularProgressMeter
            percentage={(currentRegion.windSpeed / 50) * 100}
            colorClass="text-teal-400"
            label="WIND VELOCITY"
            valueDisplay={`${currentRegion.windSpeed} knots`}
            subLabel={currentRegion.windSpeed > 20 ? 'Moderate Gale Force' : 'Gentle Breeze'}
            icon={<Wind className="w-5 h-5 text-teal-400" />}
            trendData={[
              Math.max(5, currentRegion.windSpeed - 8),
              Math.max(5, currentRegion.windSpeed - 5),
              Math.max(5, currentRegion.windSpeed - 6),
              Math.max(5, currentRegion.windSpeed - 3),
              Math.max(5, currentRegion.windSpeed - 2),
              Math.max(5, currentRegion.windSpeed + 4),
              Math.max(5, currentRegion.windSpeed + 6),
              Math.max(5, currentRegion.windSpeed + 2),
              Math.max(5, currentRegion.windSpeed - 2),
              currentRegion.windSpeed
            ]}
          />

          {/* Current Speed */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-cyan-500/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">OCEAN CURRENT</span>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Compass className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-5">
              <div className="text-3xl font-bold font-mono text-slate-100">
                {currentRegion.currentSpeed} <span className="text-lg text-slate-400 font-sans">knots</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">North-East Drift Vector</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-400 opacity-60" />
          </motion.div>

          {/* Dissolved Oxygen */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-cyan-500/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">DISSOLVED OXYGEN</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Droplets className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-5">
              <div className="text-3xl font-bold font-mono text-slate-100">
                {currentRegion.dissolvedOxygen} <span className="text-lg text-slate-400 font-sans">mg/L</span>
              </div>
              <p className="text-xs text-emerald-400 mt-2">Healthy marine respiration</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-60" />
          </motion.div>

          {/* Safety Status Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-cyan-500/40 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">SAFETY STATUS</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                currentRegion.safetyStatus === 'SAFE' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
              }`}>
                {currentRegion.safetyStatus === 'SAFE' ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              </div>
            </div>
            <div className="mt-5">
              <div className={`text-2xl font-bold font-mono ${
                currentRegion.safetyStatus === 'SAFE' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {currentRegion.safetyStatus}
              </div>
              <p className="text-xs text-slate-400 mt-2">Verified via satellite telemetry</p>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${
              currentRegion.safetyStatus === 'SAFE' ? 'bg-emerald-500' : 'bg-amber-500'
            }`} />
          </motion.div>

        </div>

        {/* Right Col: Interactive Marine Map Simulation & Quick Action Hub */}
        <div className="space-y-6">
          
          {/* Marine Map Simulation Card */}
          <div className="bg-slate-900/90 border border-cyan-500/30 p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
                  Live Buoy Radar
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-500/30">
                {currentRegion.region}
              </span>
            </div>

            {/* Visual Map Simulation Container */}
            <div className="relative w-full h-64 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center group">
              {/* Radar Grid Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
              <div className="absolute w-44 h-44 rounded-full border border-cyan-500/25 animate-ping opacity-30" />
              <div className="absolute w-28 h-28 rounded-full border border-cyan-500/40" />
              <div className="absolute w-14 h-14 rounded-full border border-cyan-500/60" />

              {/* Buoy Markers */}
              <div className="absolute top-16 left-20 flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400" />
                <span className="text-[10px] font-mono text-cyan-300 mt-1 bg-slate-900/90 px-2 py-0.5 rounded">Buoy-01 (Safe)</span>
              </div>
              <div className="absolute bottom-20 right-24 flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400" />
                <span className="text-[10px] font-mono text-emerald-300 mt-1 bg-slate-900/90 px-2 py-0.5 rounded">Vessel Fleet</span>
              </div>
              <div className="absolute top-24 right-16 flex flex-col items-center">
                <span className={`w-3.5 h-3.5 rounded-full ${currentRegion.stormWarning ? 'bg-amber-400 animate-bounce' : 'bg-teal-400'}`} />
                <span className="text-[10px] font-mono text-slate-300 mt-1 bg-slate-900/90 px-2 py-0.5 rounded">Offshore Node</span>
              </div>

              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur border border-slate-800 px-3.5 py-2 rounded-xl text-[11px] font-mono text-slate-300 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>GPS Lat: 13.08° N, Long: 80.27° E</span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => setActiveTab('fish')}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Launch AI Fish Density Predictor</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Footer */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
              Ecosystem Connectivity
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Connected Fishermen</span>
                <span className="font-mono font-bold text-slate-200">14,890 Active</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Verified Pollution Reports</span>
                <span className="font-mono font-bold text-teal-400">1,240 Logs</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Blockchain Consensus</span>
                <span className="font-mono font-bold text-cyan-300">100% Immutable</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

