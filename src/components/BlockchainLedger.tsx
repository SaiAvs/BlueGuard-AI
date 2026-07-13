import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  Coins, 
  CheckCircle2, 
  Loader2, 
  Lock, 
  Hash, 
  Activity,
  FileCheck
} from 'lucide-react';
import { BlockchainBlock } from '../types';

export const BlockchainLedger: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockchainBlock[]>([]);
  const [networkInfo, setNetworkInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchBlockchain = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blockchain');
      const data = await res.json();
      setBlocks(data.blocks);
      setNetworkInfo(data);
    } catch (err) {
      console.error("Failed to fetch blockchain:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockchain();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-purple-500/30 p-6 rounded-3xl shadow-xl backdrop-blur-xl">
        <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono mb-1">
          <Layers className="w-4 h-4" />
          <span>DECENTRALIZED TAMPER-PROOF MARINE LEDGER</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight font-sans">
          Blockchain Ledger & Verification Layer
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Securing pollution reports, environmental records, and token incentives through Proof-of-Environmental-Impact (PoEI) consensus.
        </p>
      </div>

      {/* Network Stats Cards */}
      {networkInfo && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl shadow-lg">
            <span className="text-xs font-mono text-slate-400">NETWORK STATUS</span>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-2 flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mr-2" />
              {networkInfo.networkStatus}
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl shadow-lg">
            <span className="text-xs font-mono text-slate-400">CONSENSUS PROTOCOL</span>
            <div className="text-lg font-bold font-mono text-cyan-300 mt-2 truncate">
              {networkInfo.consensusProtocol}
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl shadow-lg">
            <span className="text-xs font-mono text-slate-400">ACTIVE VALIDATOR NODES</span>
            <div className="text-2xl font-bold font-mono text-slate-100 mt-2">
              {networkInfo.activeValidators} Nodes
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl shadow-lg">
            <span className="text-xs font-mono text-slate-400">GUARDTOKENS ISSUED</span>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-2 flex items-center">
              <Coins className="w-5 h-5 mr-1.5" />
              {networkInfo.totalRewardsDistributed.toLocaleString()} GT
            </div>
          </div>
        </div>
      )}

      {/* Blocks Explorer */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-slate-100 font-mono">Immutable Block Explorer</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">{blocks.length} Verified Blocks</span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {blocks.map((block) => (
              <div key={block.blockNumber} className="bg-slate-950 border border-slate-800 p-6 rounded-3xl shadow-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-lg">
                      #{block.blockNumber}
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Validator: <span className="text-slate-200">{block.validator}</span></div>
                      <div className="text-xs font-mono text-slate-500 mt-0.5">{new Date(block.timestamp).toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-xl text-xs font-mono bg-purple-950 text-purple-300 border border-purple-500/30">
                      {block.transactionsCount} Transactions
                    </span>
                    <span className="px-3 py-1 rounded-xl text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
                    </span>
                  </div>
                </div>

                {/* Hashes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="truncate">
                    <span className="text-slate-500 block">BLOCK HASH:</span>
                    <span className="text-cyan-400">{block.hash}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-slate-500 block">PREVIOUS HASH:</span>
                    <span className="text-slate-400">{block.previousHash}</span>
                  </div>
                </div>

                {/* Transactions / Data */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Embedded Records:</div>
                  {block.data.map((tx, idx) => (
                    <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800/60 flex items-start space-x-3 text-xs">
                      <FileCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-teal-300 font-bold mr-2">[{tx.type}]</span>
                        <span className="text-slate-300">{tx.summary}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
