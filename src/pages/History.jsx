import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { Trash2, MessageSquare, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  // Sync localStorage when history changes here
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const handleDelete = (id) => {
    setHistory((prev) => prev.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      setHistory([]);
      localStorage.removeItem("history");
    }
  };

  const handleChatClick = (item) => {
    navigate("/dashboard", { state: { chat: item } });
  };

  return (
    <section className="min-h-screen bg-brand-bg text-brand-text flex overflow-hidden">
      <Sidebar 
        history={history} 
        onHistoryClick={handleChatClick}
        onDeleteHistory={handleDelete}
        onNewChat={() => navigate("/dashboard")}
        onNewChatFromHistory={(item) => navigate("/dashboard", { state: { newChatFrom: item } })}
      />

      <div className="flex-1 h-screen overflow-y-auto bg-brand-surface p-8 md:p-12 selection:bg-violet-500/30 custom-scrollbar transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">History</h1>
              <p className="text-brand-subtext text-sm">Review and manage your past AI generations.</p>
            </div>
            
            {history.length > 0 && (
              <button 
                onClick={handleClearAll}
                className="px-4 py-2 rounded-xl border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-all flex items-center gap-2 w-fit"
              >
                <Trash2 size={14} /> Clear All
              </button>
            )}
          </div>

          {/* History Grid */}
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 border border-brand-border border-dashed rounded-3xl bg-white/[0.01]">
              <div className="w-16 h-16 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-subtext mb-6">
                <MessageSquare size={32} />
              </div>
              <p className="text-brand-subtext font-medium">No history found</p>
              <button 
                onClick={() => navigate("/dashboard")}
                className="mt-4 text-violet-400 text-sm font-semibold hover:underline"
              >
                Start a new chat
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {history.map((item) => (
                <div 
                  key={item.id}
                  className="group relative p-6 rounded-2xl bg-brand-card border border-brand-border hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-brand-subtext font-bold">
                        {item.title || item.messages?.[0]?.content || "Untitled chat"}
                      </p>
                      <p className="text-[10px] text-brand-subtext mt-1">
                        {item.messages?.length || 1} messages • {new Date(item.timestamp || item.id).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="p-2 rounded-lg text-brand-subtext hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <p className="text-sm text-brand-subtext line-clamp-2 mb-6 leading-relaxed">
                    {item.messages ? item.messages[item.messages.length - 1].content : item.response}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => navigate("/dashboard", { state: { chat: item } })}
                        className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-[11px] font-semibold text-violet-300 hover:bg-violet-500/20 transition"
                      >
                        Continue Chat
                        <ArrowRight size={14} />
                      </button>
                      <button 
                        onClick={() => navigate("/dashboard", { state: { newChatFrom: item } })}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold text-white hover:bg-white/10 transition"
                      >
                        New Chat from Thread
                      </button>
                    </div>
                    {item.messages && (
                      <span className="text-[10px] font-medium text-brand-subtext/70 uppercase tracking-wide">
                        {item.messages.length} messages
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
