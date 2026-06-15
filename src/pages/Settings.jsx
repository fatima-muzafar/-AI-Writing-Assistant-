import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { User, Cpu, Sparkles, Trash2, ShieldCheck, Globe, Zap, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { settings, updateSetting } = useSettings();
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to permanently delete all chat history?")) {
      localStorage.removeItem("history");
      localStorage.removeItem("current_messages");
      localStorage.removeItem("active_chat_id");
      setHistory([]);
      alert("Workspace reset successfully.");
    }
  };

  const handleSettingChange = (key, value) => {
    updateSetting(key, value);
  };

  return (
    <section className="min-h-screen bg-brand-bg text-brand-text flex overflow-hidden">
      <Sidebar 
        history={history} 
        onHistoryClick={(item) => navigate("/dashboard", { state: { chat: item } })}
        onDeleteHistory={(id) => {
           const updated = history.filter(h => h.id !== id);
           setHistory(updated);
           localStorage.setItem("history", JSON.stringify(updated));
        }}
        onNewChat={() => navigate("/dashboard")}
      />

      <div className="flex-1 h-screen overflow-y-auto bg-brand-surface p-8 md:p-12 custom-scrollbar selection:bg-violet-500/30 transition-colors duration-300">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
            <p className="text-brand-subtext text-sm">Configure your workspace preferences and AI model behavior.</p>
          </div>

          <div className="space-y-10 pb-20">
            
            {/* Profile Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center text-brand-subtext">
                  <User size={16} />
                </div>
                <h2 className="text-sm font-bold text-brand-text uppercase tracking-widest">Profile</h2>
              </div>
              
              <div className="grid gap-4 p-6 rounded-2xl bg-white/[0.02] border border-brand-border">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-brand-text">Display Name</p>
                    <p className="text-xs text-brand-subtext">How you appear in the workspace.</p>
                  </div>
                  <input 
                    type="text" 
                    value={settings.name}
                    onChange={(e) => handleSettingChange("name", e.target.value)}
                    className="bg-brand-bg border border-brand-border rounded-xl px-4 py-2 text-sm text-brand-text outline-hidden focus:border-violet-500/50 transition-colors w-full md:w-64"
                  />
                </div>
                
                <div className="h-px bg-brand-border my-2" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand-text">Account Status</p>
                    <p className="text-xs text-brand-subtext">Your current subscription tier.</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
                    <ShieldCheck size={12} className="text-violet-400" />
                    <span className="text-[10px] font-bold text-violet-400 uppercase tracking-tighter">Beta Access</span>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Configuration */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center text-brand-subtext">
                  <Cpu size={16} />
                </div>
                <h2 className="text-sm font-bold text-brand-text uppercase tracking-widest">AI & Models</h2>
              </div>

              <div className="grid gap-4 p-6 rounded-2xl bg-white/[0.02] border border-brand-border">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Globe size={16} className="text-brand-subtext mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-brand-text">API Provider</p>
                      <p className="text-xs text-brand-subtext">Service used for completions.</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-brand-subtext bg-brand-bg px-3 py-1.5 rounded-lg border border-brand-border">OpenRouter</span>
                </div>

                <div className="h-px bg-brand-border my-2" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Sparkles size={16} className="text-brand-subtext mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-brand-text">Preferred Model</p>
                      <p className="text-xs text-brand-subtext">Choose your default intelligence agent.</p>
                    </div>
                  </div>
                  <select 
                    value={settings.model}
                    onChange={(e) => handleSettingChange("model", e.target.value)}
                    className="bg-brand-bg border border-brand-border rounded-xl px-4 py-2 text-sm text-brand-text outline-hidden focus:border-violet-500/50 transition-colors w-full md:w-64 appearance-none cursor-pointer"
                  >
                    <option value="deepseek/deepseek-chat">DeepSeek Chat (V3)</option>
                    <option value="openai/gpt-4o-mini">GPT-4o Mini</option>
                    <option value="anthropic/claude-3-haiku">Claude 3.5 Haiku</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center text-brand-subtext">
                  <Zap size={16} />
                </div>
                <h2 className="text-sm font-bold text-brand-text uppercase tracking-widest">Interface</h2>
              </div>

              <div className="grid gap-4 p-6 rounded-2xl bg-white/[0.02] border border-brand-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand-text">Response Streaming</p>
                    <p className="text-xs text-brand-subtext">Show AI output word-by-word.</p>
                  </div>
                  <button 
                    onClick={() => handleSettingChange("streaming", !settings.streaming)}
                    className={`w-10 h-6 rounded-full transition-colors relative flex items-center px-1
                      ${settings.streaming ? "bg-violet-600" : "bg-brand-subtext/20"}
                    `}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.streaming ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="h-px bg-brand-border my-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    {settings.theme === 'dark' ? <Moon size={16} className="text-brand-subtext mt-0.5" /> : <Sun size={16} className="text-brand-subtext mt-0.5" />}
                    <div>
                      <p className="text-sm font-semibold text-brand-text">Appearance</p>
                      <p className="text-xs text-brand-subtext">Switch between light and dark themes.</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-brand-bg rounded-lg p-1 border border-brand-border">
                    <button 
                      onClick={() => handleSettingChange("theme", "light")}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${settings.theme === 'light' ? 'bg-white text-black shadow-sm' : 'text-brand-subtext hover:text-brand-text'}`}
                    >
                      Light
                    </button>
                    <button 
                      onClick={() => handleSettingChange("theme", "dark")}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${settings.theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'text-brand-subtext hover:text-brand-text'}`}
                    >
                      Dark
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="pt-6">
              <div className="grid gap-4 p-6 rounded-2xl bg-red-500/[0.02] border border-red-500/10 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-semibold text-red-400">Clear All Data</p>
                    <p className="text-xs text-brand-subtext max-w-sm">This will permanently delete all chat history and reset your local workspace.</p>
                  </div>
                  <button 
                    onClick={handleClearHistory}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-500 text-[11px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <Trash2 size={14} /> Reset Workspace
                  </button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </section>
  );
}
