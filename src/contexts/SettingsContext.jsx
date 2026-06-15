import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const defaultSettings = {
  name: "Fatima",
  model: "deepseek/deepseek-chat",
  streaming: true,
  theme: "dark",
};

const SettingsContext = createContext({
  settings: defaultSettings,
  updateSetting: () => {},
  setSettings: () => {},
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("app_settings");
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem("app_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const theme = settings.theme || "dark";
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.theme]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === "app_settings") {
        try {
          setSettings(event.newValue ? JSON.parse(event.newValue) : defaultSettings);
        } catch {
          setSettings(defaultSettings);
        }
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({
      settings,
      updateSetting: (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
      },
      setSettings,
    }),
    [settings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
