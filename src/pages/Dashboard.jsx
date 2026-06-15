import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import Sidebar from "../components/layout/Sidebar";
import OutputBox from "../features/ai-writer/components/OutputBox";
import InputBox from "../features/ai-writer/components/InputBox";
import { generateContent } from "../features/ai-writer/services/aiService";
import { useLocation } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";

// Memoize components to prevent unnecessary re-renders
const MemoizedSidebar = memo(Sidebar);
const MemoizedOutputBox = memo(OutputBox);

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("history")) || [];
      return saved.map((item, index) => {
        if (item.messages) return item;
        return {
          id: item.id || Date.now() + index,
          title: item.title || item.prompt || "Chat",
          messages: item.messages || (
            item.prompt && item.response
              ? [
                  { role: "user", content: item.prompt },
                  { role: "assistant", content: item.response },
                ]
              : []
          ),
          timestamp: item.timestamp || item.id || Date.now(),
        };
      });
    } catch {
      return [];
    }
  });
  const { settings } = useSettings();
  const [activeChatId, setActiveChatId] = useState(null);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, loading]);

  // Handle navigation state for loading/starting chats
  useEffect(() => {
    if (location.state?.chat) {
      const thread = location.state.chat;
      const messages = thread.messages || (
        thread.prompt && thread.response
          ? [
              { role: "user", content: thread.prompt },
              { role: "assistant", content: thread.response },
            ]
          : []
      );
      setActiveChatId(thread.id || null);
      setMessages(messages);
    } else if (location.state?.newChatFrom) {
      const seed = location.state.newChatFrom;
      const seedPrompt = seed.messages?.[0]?.content || seed.prompt || "";
      setActiveChatId(null);
      setMessages(seedPrompt ? [{ role: "user", content: seedPrompt }] : []);
      setInput("");
    }
  }, [location.state]);

  // Save history automatically
  useEffect(() => {
    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );
  }, [history]);

  const handleHistoryClick = useCallback((chat) => {
    const messages = chat.messages || (
      chat.prompt && chat.response
        ? [
            { role: "user", content: chat.prompt },
            { role: "assistant", content: chat.response },
          ]
        : []
    );
    setActiveChatId(chat.id || null);
    setMessages(messages);
  }, []);

  const handleDeleteHistory = useCallback((id) => {
    setHistory((prev) =>
      prev.filter((chat) => chat.id !== id)
    );
  }, []);

  const handleNewChat = useCallback(() => {
    setInput("");
    setMessages([]);
    setActiveChatId(null);
  }, []);


  const handleGenerate = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userPrompt = input.trim();
    setInput("");

    const assistantPlaceholder = { role: "assistant", content: "", isTyping: true };
    const nextMessages = [
      ...messages,
      { role: "user", content: userPrompt },
      assistantPlaceholder,
    ];

    setMessages(nextMessages);

    const appendToken = (token) => {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (!last || last.role !== "assistant") return prev;
        updated[updated.length - 1] = {
          ...last,
          content: `${last.content || ""}${token}`,
          isTyping: true,
        };
        return updated;
      });
    };

    try {
      setLoading(true);

      const response = await generateContent(
        userPrompt,
        settings?.model || "deepseek/deepseek-chat",
        appendToken,
        settings?.streaming ?? true
      );

      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last.role === "assistant") {
          updated[updated.length - 1] = {
            ...last,
            content: response,
            isTyping: false,
          };
        }
        return updated;
      });

      const completedMessages = [...messages, { role: "user", content: userPrompt }, { role: "assistant", content: response }];
      const title = userPrompt.length > 40 ? `${userPrompt.slice(0, 40)}...` : userPrompt;
      const timestamp = Date.now();
      const chatId = activeChatId || timestamp;

      setActiveChatId(chatId);
      setHistory((prev) => {
        const updatedChat = {
          id: chatId,
          title,
          messages: completedMessages,
          timestamp,
        };

        if (activeChatId) {
          return prev.map((chat) => (chat.id === activeChatId ? updatedChat : chat));
        }

        return [updatedChat, ...prev];
      });

    } catch (error) {
      console.error("AI Error:", error);

      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last.role === "assistant") {
          updated[updated.length - 1] = {
            ...last,
            content: `❌ Error: ${error.message || "Failed to generate content. Please try again."}`,
            isTyping: false,
          };
        }
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }, [input, loading, settings, messages, activeChatId]);

  return (
    <section className="min-h-screen bg-black text-white flex overflow-hidden selection:bg-violet-500/30">
      
      {/* Sidebar */}
      <MemoizedSidebar
        history={history}
        onHistoryClick={handleHistoryClick}
        onDeleteHistory={handleDeleteHistory}
        onNewChat={handleNewChat}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-screen relative bg-[#09090b]">

        {/* Header */}
        <header className="border-b border-white/[0.05] bg-black/20 backdrop-blur-xl z-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 h-14 px-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">WriteAI Chat</p>
              <h1 className="text-xl font-semibold text-white truncate">
                {activeChatId ? history.find((chat) => chat.id === activeChatId)?.title || "Active chat" : "New chat"}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {activeChatId && (
                <span className="text-[11px] text-brand-subtext bg-brand-surface border border-brand-border rounded-full px-3 py-1">
                  {history.find((chat) => chat.id === activeChatId)?.messages?.length || 0} messages
                </span>
              )}
              <button
                onClick={handleNewChat}
                className="text-[11px] font-bold uppercase tracking-widest text-violet-400 border border-violet-500/20 px-3 py-1.5 rounded-xl hover:bg-violet-500/10 transition"
              >
                New Chat
              </button>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar pb-40">
          <div className="max-w-3xl mx-auto w-full flex flex-col min-h-full">
            <MemoizedOutputBox messages={messages} loading={loading} />
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </main>

        {/* Input Area */}
        <footer className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#09090b] via-[#09090b] to-transparent pt-12 pb-6 z-10">
          <div className="max-w-3xl mx-auto w-full px-6">
            <InputBox
              input={input}
              setInput={setInput}
              handleGenerate={handleGenerate}
              loading={loading}
            />
            <p className="text-[10px] text-zinc-600 text-center mt-3 tracking-wide">
              AI can make mistakes. Always check generated content.
            </p>
          </div>
        </footer>

      </div>
    </section>
  );
}
