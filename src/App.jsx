import React from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HistoryPage from "./pages/History";
import SettingsPage from "./pages/Settings";
import { Routes, Route } from "react-router-dom";
import { SettingsProvider } from "./contexts/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </SettingsProvider>
  );
}

export default App;
