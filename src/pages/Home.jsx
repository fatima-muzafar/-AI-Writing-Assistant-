import Hero from "../features/ai-writer/components/Hero";
import { Zap, Shield, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-black text-white overflow-x-hidden selection:bg-violet-500/30">
      
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. CORE CAPABILITIES */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-8 md:px-16 py-24 lg:py-32 border-t border-white/5"
      >
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 block mb-2">Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            AI-Powered Writing Assistant
          </h2>
          <p className="text-neutral-500 text-base leading-relaxed">
            Generate professional content instantly using state-of-the-art AI models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-neutral-950/40 border border-white/5 rounded-2xl hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-violet-400 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors">
              <Sparkles size={18} />
            </div>
            <h3 className="text-lg font-semibold mb-3">Blog Drafting</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Generate structured outlines and full drafts for your next blog post or article.
            </p>
          </div>

          <div className="p-8 bg-neutral-950/40 border border-white/5 rounded-2xl hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-violet-400 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors">
              <Zap size={18} />
            </div>
            <h3 className="text-lg font-semibold mb-3">Email Writing</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Craft professional emails and responses tailored to your specific audience.
            </p>
          </div>

          <div className="p-8 bg-neutral-900/40 border border-white/5 rounded-2xl hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-violet-400 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors">
              <Shield size={18} />
            </div>
            <h3 className="text-lg font-semibold mb-3">Social Captions</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Create catchy hooks and engaging captions for LinkedIn, X, and Instagram.
            </p>
          </div>
        </div>
      </section>


      {/* 3. PRODUCT TOUR */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-24 lg:py-32 space-y-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-medium">
              <Sparkles size={12} /> AI Workspace
            </div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
              A minimal interface designed for focus.
            </h3>
            <p className="text-neutral-400 text-base leading-relaxed">
              WriteAI delivers a refined sandbox environment optimized for generating high-quality results with a single click.
            </p>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-violet-400" /> Local chat history management with full conversation threads</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-violet-400" /> Clean, modern dark aesthetic for distraction-free writing</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-violet-400" /> Powerful DeepSeek,GPT,Claude AI writing assistance</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-violet-400" /> Real-time AI response streaming for faster feedback</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-violet-400" /> Configurable prompt, model, and workspace preferences</li>
            </ul>
          </div>
          {/* Visual Showcase Block */}
          <div className="flex-1 w-full aspect-video bg-neutral-900/50 border border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <div className="text-[11px] text-zinc-600 font-mono select-none">writeai_workspace.env</div>
            </div>
            <div className="flex-1 flex flex-col justify-center py-6 space-y-2">
              <div className="h-2 w-3/4 bg-zinc-800 rounded animate-pulse" />
              <div className="h-2 w-1/2 bg-zinc-800 rounded animate-pulse" />
              <div className="h-2 w-5/6 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>


      {/* 4. PRICING PREVIEW CARD */}
      <section className="max-w-4xl mx-auto px-8 py-16 mb-16">
        <div className="bg-gradient-to-b from-neutral-900/80 to-neutral-950 border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-600/10 blur-3xl rounded-full" />
          <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-zinc-400 font-medium border border-white/5">Open Beta</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 tracking-tight">Start creating content for free</h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto mt-2">Get access to state-of-the-art models during our public beta.</p>
          <div className="my-8">
            <span className="text-5xl md:text-6xl font-extrabold text-white">$0</span>
            <span className="text-zinc-500 text-sm ml-2">/ free forever</span>
          </div>
          <button 
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 bg-violet-600 text-white rounded-xl font-medium cursor-pointer hover:bg-violet-700 transition flex items-center gap-2 mx-auto shadow-xl shadow-violet-600/10 hover:scale-105 duration-200"
          >
            Launch Workspace <ArrowRight size={16} />
          </button>
        </div>
      </section>

    </div>
  );
}
