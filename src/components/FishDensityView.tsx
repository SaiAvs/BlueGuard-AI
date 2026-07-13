import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Fish, 
  MapPin, 
  Compass, 
  Fuel, 
  Sparkles, 
  TrendingUp, 
  Thermometer, 
  Droplets, 
  Loader2,
  CheckCircle2
} from 'lucide-react';

import { FishPrediction } from '../types';

export const FishDensityView: React.FC = () => {
  const [region, setRegion] = useState('Bay of Bengal - Central Zone');
  const [targetSpecies, setTargetSpecies] = useState('All Pelagic Species');
  const [predictions, setPredictions] = useState<FishPrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedZone, setSelectedZone] = useState<FishPrediction | null>(null);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/predict-fish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ region, targetSpecies })
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setPredictions(data);
        setSelectedZone(data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch fish predictions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="bg-slate-900/90 border border-cyan-500/30 p-6 rounded-3xl shadow-xl backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI NEURAL FISH PREDICTION MODEL v4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight font-sans">
            High-Yield Fishing Zone Predictor
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Combining satellite chlorophyll levels, sea surface temperature gradients, and ocean current modeling.
          </p>
        </div>

        {/* Inputs */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col">
            <label className="text-[11px] font-mono text-slate-400 mb-1">TYPE ANY AREA / REGION</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. Goa Coast, Maldives, North Sea..."
                className="bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-2xl pl-9 pr-4 py-3 focus:border-cyan-500 focus:outline-none w-64 shadow-inner"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-mono text-slate-400 mb-1">TARGET SPECIES</label>
            <select
              value={targetSpecies}
              onChange={(e) => setTargetSpecies(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-2xl px-4 py-3 focus:border-cyan-500 outline-none"
            >
              <option value="All Pelagic Species">All Pelagic Species</option>
              <option value="Yellowfin Tuna">Yellowfin Tuna</option>
              <option value="Skipjack & Mackerel">Skipjack & Mackerel</option>
              <option value="Kingfish & Snapper">Kingfish & Snapper</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={fetchPredictions}
              disabled={loading}
              className="mt-5 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center space-x-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Generate AI Scan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Zone Prediction Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">
              Recommended Fishing Zones ({predictions.length})
            </h3>
            <span className="text-xs font-mono text-emerald-400 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Fuel Optimized Routes
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
              <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
              <p className="text-sm font-mono text-slate-300">Aqualis AI is analyzing satellite ocean telemetry...</p>
            </div>
          ) : (
            predictions.map((zone) => {
              const isSelected = selectedZone?.zoneId === zone.zoneId;
              return (
                <div
                  key={zone.zoneId}
                  onClick={() => setSelectedZone(zone)}
                  className={`bg-slate-900/80 border p-6 rounded-3xl shadow-xl cursor-pointer transition-all relative overflow-hidden group ${
                    isSelected ? 'border-cyan-500 bg-slate-900 shadow-cyan-950/50 ring-1 ring-cyan-500/50' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                          {zone.zoneId}
                        </span>
                        <h4 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                          {zone.zoneName}
                        </h4>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-slate-400 font-mono">
                        <span className="flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                          {zone.latitude.toFixed(2)}° N, {zone.longitude.toFixed(2)}° E
                        </span>
                        <span className="flex items-center">
                          <Compass className="w-3.5 h-3.5 mr-1 text-teal-400" />
                          {zone.distanceNm} Nautical Miles
                        </span>
                      </div>
                    </div>

                    {/* Density Score Badge */}
                    <div className="flex items-center space-x-3 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 shrink-0">
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 text-right">DENSITY SCORE</div>
                        <div className="text-xl font-mono font-bold text-emerald-400 text-right">
                          {zone.densityScore}%
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Species & Metrics */}
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
                    <div>
                      <div className="text-[10px] font-mono text-slate-500">ESTIMATED YIELD</div>
                      <div className="text-sm font-mono font-bold text-slate-200 mt-0.5">{zone.estimatedYieldKg} kg</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500">FUEL REQUIRED</div>
                      <div className="text-sm font-mono font-bold text-amber-300 mt-0.5 flex items-center">
                        <Fuel className="w-3.5 h-3.5 mr-1" /> {zone.fuelEstimateLiters} Liters
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500">WATER TEMP</div>
                      <div className="text-sm font-mono font-bold text-cyan-300 mt-0.5 flex items-center">
                        <Thermometer className="w-3.5 h-3.5 mr-1" /> {zone.waterTemp}°C
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500">AI CONFIDENCE</div>
                      <div className="text-sm font-mono font-bold text-teal-300 mt-0.5">{zone.confidence}%</div>
                    </div>
                  </div>

                  {/* Species Tags */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono text-slate-400 mr-2">Target Species:</span>
                    {zone.recommendedSpecies.map((sp, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-950 text-cyan-300 border border-cyan-500/20">
                        {sp}
                      </span>
                    ))}
                  </div>

                  {/* Reasoning */}
                  <div className="mt-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 text-xs text-slate-300 italic">
                    "{zone.reasoning}"
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Col: Route & Heatmap Analytics */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/30 p-6 rounded-3xl shadow-xl">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-200 mb-4 flex items-center">
              <Compass className="w-4 h-4 mr-2 text-cyan-400" />
              Optimal Route & Fuel Calculator
            </h3>

            {selectedZone ? (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Selected Zone</span>
                    <span className="font-mono font-bold text-cyan-300">{selectedZone.zoneName} ({selectedZone.zoneId})</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Distance from Port</span>
                    <span className="font-mono font-bold text-slate-200">{selectedZone.distanceNm} NM</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Estimated Fuel Burn</span>
                    <span className="font-mono font-bold text-amber-300">{selectedZone.fuelEstimateLiters} L Diesel</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Projected Market Catch Value</span>
                    <span className="font-mono font-bold text-emerald-400">₹{(selectedZone.estimatedYieldKg * 180).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center space-x-2 text-cyan-300 text-xs font-bold font-mono">
                    <Sparkles className="w-4 h-4" />
                    <span>Aqualis AI Navigation Tip</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Set heading to {selectedZone.latitude > 14 ? '195° South-Southwest' : '142° Southeast'} to bypass choppy boundary currents and save approximately 14% fuel consumption.
                  </p>
                </div>

                <button
                  onClick={() => alert(`Navigation waypoint ${selectedZone.zoneName} sent to vessel GPS receiver!`)}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Transmit Coordinates to Vessel GPS</span>
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-8">Select a zone from the left to view route analysis.</p>
            )}
          </div>

          {/* Historical Insights */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3">
              Historical Catch Accuracy
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Model Precision (Last 30 Days)</span>
                <span className="font-mono font-bold text-emerald-400">94.8%</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Average Fuel Saved per Voyage</span>
                <span className="font-mono font-bold text-cyan-300">18.5 Liters</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Sustainable Bycatch Ratio</span>
                <span className="font-mono font-bold text-teal-300">&lt; 1.2%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
