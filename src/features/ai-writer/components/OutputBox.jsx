import React from 'react';
import { Sparkles, User } from 'lucide-react';

const OutputBox = ({ messages, loading }) => {
  if (!messages || (messages.length === 0 && !loading)) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(124,58,237,0.3)] mb-8">
          <Sparkles size={28} />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2 tracking-tight">
          How can I help you write today?
        </h2>
        <p className="text-zinc-500 text-sm max-w-[280px] leading-relaxed">
          Ask me to draft content, fix grammar, or write professional emails.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-12 w-full max-w-lg">
          {[
            { label: 'Content Writing', desc: 'Write a blog outline about AI' },
            { label: 'Business Email', desc: 'Draft a pitch for a new project' },
            { label: 'Social Media', desc: 'Create catchy Instagram hooks' },
            { label: 'Brainstorming', desc: 'Give me 5 ideas for a startup' }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-brand-card border border-brand-border text-left hover:border-violet-500/20 hover:bg-brand-bg transition-all cursor-default group shadow-xs">
              <p className="text-[10px] font-bold text-violet-500 uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-xs text-brand-subtext group-hover:text-brand-text transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-10 py-10 px-4 md:px-0">
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`flex gap-4 md:gap-6 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {/* Avatar */}
          <div className={`w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm
            ${message.role === 'assistant' 
              ? 'bg-violet-600 text-white' 
              : 'bg-zinc-800 border border-white/10 text-zinc-400'}
          `}>
            {message.role === 'assistant' ? <Sparkles size={16} /> : <User size={16} />}
          </div>

          {/* Content */}
          <div className={`flex flex-col gap-1.5 max-w-[85%] md:max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] font-bold text-brand-subtext uppercase tracking-widest px-1">
              {message.role === 'assistant' ? 'WriteAI' : 'You'}
            </span>
            <div className={`px-5 py-3.5 rounded-2xl text-[14px] leading-7 tracking-wide relative shadow-sm border
              ${message.role === 'user' 
                ? 'bg-brand-bubble-user text-white border-violet-500/10 rounded-tr-none' 
                : 'bg-brand-bubble-ai text-brand-text border-brand-border rounded-tl-none'}
            `}>
              <div className="whitespace-pre-wrap selection:bg-violet-500/30">
                {message.content}
                {message.isTyping && (
                  <span className="inline-block w-1.5 h-4 ml-1 bg-violet-500 animate-pulse align-middle" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Loading Skeleton */}
      {loading && (
        <div className="flex gap-4 md:gap-6">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-violet-600/20 flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
            <Sparkles size={16} className="text-violet-400/50" />
          </div>
          <div className="flex flex-col gap-2 w-full max-w-[80%]">
            <span className="text-[10px] font-bold text-brand-subtext uppercase tracking-widest px-1">
              Generating...
            </span>
            <div className="space-y-3 bg-brand-bubble-ai border border-brand-border p-5 rounded-2xl rounded-tl-none shadow-xs">
              <div className="h-2 w-full bg-brand-subtext/20 rounded-full animate-pulse shadow-sm" />
              <div className="h-2 w-[90%] bg-brand-subtext/20 rounded-full animate-pulse delay-75 shadow-sm" />
              <div className="h-2 w-[60%] bg-brand-subtext/20 rounded-full animate-pulse delay-150 shadow-sm" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputBox;
