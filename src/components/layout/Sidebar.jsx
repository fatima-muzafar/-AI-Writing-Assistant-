import React, { useState, useEffect } from "react";
import {
  DiamondPlus,
  History,
  Settings,
  Pencil,
  Trash2
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({
  history = [],
  onHistoryClick,
  onDeleteHistory,
  onNewChat,
  onNewChatFromHistory,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("Fatima");

  useEffect(() => {
    const updateName = () => {
      try {
        const settings = JSON.parse(localStorage.getItem("app_settings"));
        if (settings?.name) setUserName(settings.name);
      } catch (e) {
        // ignore
      }
    };

    updateName();

    // Listen for changes to localStorage (even in the same tab)
    window.addEventListener("storage", updateName);
    
    // Custom trigger for same-tab updates
    const interval = setInterval(updateName, 1000);

    return () => {
      window.removeEventListener("storage", updateName);
      clearInterval(interval);
    };
  }, [location.pathname]);

  const navItems = [
    {
      id: "new",
      icon: <DiamondPlus size={18} />,
      label: "New Chat",
      path: "/dashboard",
      action: onNewChat
    },
    {
      id: "history",
      icon: <History size={18} />,
      label: "History",
      path: "/history"
    },
    {
      id: "settings",
      icon: <Settings size={18} />,
      label: "Settings",
      path: "/settings"
    },
  ];

  return (
    <aside className="w-[260px] h-screen bg-brand-bg border-r border-brand-border flex flex-col justify-between select-none z-30 transition-colors duration-300">

      {/* Top Section */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 px-6 py-6 hover:opacity-80 transition-opacity"
        >
          <span className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/20">
            <Pencil size={16} color="#f4f0f0" />
          </span>

          <h1 className="text-lg font-bold text-brand-text tracking-tight">
            WriteAI
          </h1>
        </Link>

        {/* Navigation */}
        <div className="px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.action) item.action();
                navigate(item.path);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "text-brand-text bg-violet-500/10 border border-violet-500/20 shadow-xs"
                    : "text-brand-subtext hover:bg-brand-bg hover:text-brand-text border border-transparent"
                }
              `}
            >
              <span className={location.pathname === item.path ? "text-violet-400" : ""}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 mx-4 border-t border-brand-border" />

        {/* Recent Header */}
        <p className="text-[10px] font-bold text-brand-subtext uppercase tracking-widest px-6 mb-3">
          Recent History
        </p>

        {/* History List */}
        <div className="flex flex-col flex-1 overflow-y-auto gap-0.5 px-3 custom-scrollbar">

          {history.length === 0 ? (
            <div className="px-3 py-10 text-center">
              <p className="text-[11px] text-brand-subtext">
                No recent chats
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="group flex items-center gap-1"
              >
                <button
                  onClick={() => {
                    onHistoryClick(item);
                    if (location.pathname !== "/dashboard") navigate("/dashboard");
                  }}
                  className="flex-1 text-left text-[12px] text-brand-subtext px-3 py-2 rounded-lg hover:bg-brand-bg hover:text-brand-text transition-colors truncate"
                >
                  {item.title || item.prompt || item.messages?.[0]?.content || "Chat"}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onNewChatFromHistory) {
                        onNewChatFromHistory(item);
                      } else {
                        // fallback to continuing the chat if no handler provided
                        onHistoryClick(item);
                        if (location.pathname !== "/dashboard") navigate("/dashboard");
                      }
                    }}
                    title="Solve in new chat"
                    className="opacity-0 group-hover:opacity-100 transition p-2 text-zinc-600 hover:text-violet-400"
                  >
                    <DiamondPlus size={13} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteHistory(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition p-2 text-zinc-600 hover:text-red-400"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-brand-border bg-brand-surface/50">
        <button className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-brand-bg transition-all text-left group border border-transparent hover:border-brand-border">

          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-bold text-[11px] flex items-center justify-center shadow-lg shadow-violet-600/10">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-semibold text-brand-text truncate">
              {userName}
            </span>

            <span className="text-[10px] text-brand-subtext truncate uppercase tracking-tighter font-bold">
              Beta Access
            </span>
          </div>

        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
