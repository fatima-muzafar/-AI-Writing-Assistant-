import { Loader2, SendHorizonal } from "lucide-react";

export default function InputBox({ input, setInput, handleGenerate, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !loading) handleGenerate();
    }
  };

  return (
    <div className="relative group max-w-3xl mx-auto w-full">
      {/* Background Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
      
      <div className="relative flex items-end bg-brand-input border border-brand-border rounded-2xl focus-within:border-violet-500/40 focus-within:ring-1 focus-within:ring-violet-500/20 transition-all p-2 pl-4 shadow-2xl">
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          rows={1}
          className="w-full min-h-[44px] max-h-60 resize-none bg-transparent py-3 text-[14px] text-brand-text placeholder-zinc-500 outline-none scrollbar-none pr-12"
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 240) + 'px';
          }}
        />

        <div className="absolute right-2.5 bottom-2.5">
           <button
            onClick={handleGenerate}
            disabled={!input.trim() || loading}
            className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center
              ${
                input.trim() && !loading
                  ? "bg-violet-600 text-white hover:bg-violet-700 scale-100 shadow-lg shadow-violet-600/20"
                  : "bg-brand-bg/50 text-brand-subtext cursor-not-allowed scale-95"
              }
            `}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <SendHorizonal size={16} />
            )}
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4 text-[10px] text-zinc-600 font-medium tracking-wide">
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5 text-[9px]">Enter</kbd>
          <span>to send</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5 text-[9px]">Shift + Enter</kbd>
          <span>for new line</span>
        </div>
      </div>
    </div>
  );
}
