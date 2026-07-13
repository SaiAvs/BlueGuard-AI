import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  Loader2, 
  Anchor, 
  Compass, 
  ShieldAlert,
  Trash2
} from 'lucide-react';
import { ChatMessage } from '../types';

export const AqualisAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'aqualis',
      text: 'Greetings Captain! I am Aqualis, your advanced AI marine intelligence assistant. Ask me anything about real-time weather risks, high-yield fish density zones, sustainable fishing practices, or marine safety protocols.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "What is today's storm risk in the Bay of Bengal?",
    "Where are the best yellowfin tuna zones right now?",
    "How do I earn GuardTokens by reporting pollution?",
    "What are the emergency tsunami evacuation steps?"
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'aqualis',
        text: data.reply || "I am analyzing telemetry data to assist you.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'aqualis',
        text: "I encountered a minor network latency connecting to the satellite relay. Please try asking again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-cyan-500/30 p-6 rounded-3xl shadow-xl backdrop-blur-xl flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI CONVERSATIONAL MARINE EXPERT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight font-sans">
            Aqualis AI Assistant
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Powered by Gemini 2.5 Flash for expert marine guidance, safety counseling, and fishing insights.
          </p>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-3 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-2xl border border-slate-800 transition-all flex items-center space-x-2 text-xs font-mono"
          title="Clear conversation"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Reset Chat</span>
        </button>
      </div>

      {/* Chat Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl flex flex-col h-[600px] overflow-hidden">
        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={msg.id} className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  isUser ? 'bg-cyan-600 text-white' : 'bg-gradient-to-tr from-cyan-600 to-teal-500 text-slate-950 shadow-lg shadow-cyan-950'
                }`}>
                  {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                <div className={`max-w-[80%] rounded-3xl p-5 ${
                  isUser 
                    ? 'bg-cyan-600 text-white rounded-tr-none' 
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-lg'
                }`}>
                  <div className="flex items-center justify-between mb-1 text-[10px] font-mono opacity-70">
                    <span>{isUser ? 'Captain' : 'Aqualis AI'}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 text-slate-950 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-3xl rounded-tl-none p-5 text-slate-400 text-sm flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Aqualis is formulating ocean insights...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompt Chips */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-mono text-slate-400 shrink-0">Suggested:</span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 whitespace-nowrap transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Aqualis about weather, fish density, or safety rules..."
            className="flex-1 bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-2xl px-5 py-3.5 focus:border-cyan-500 outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="p-3.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 disabled:opacity-50 text-white rounded-2xl shadow-lg transition-all flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
};
