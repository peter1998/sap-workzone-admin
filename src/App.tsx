import React from "react";
import UserProfileForm from "./components/UserProfileForm";
import RoleManagement from "./components/RoleManagement";
import UserPreferences from "./components/UserPreferences";
import {
  LocalizationProvider,
  useLocalization,
} from "./contexts/LocalizationContext";
import { useTranslation } from "./hooks/useTranslation";
import "./styles/index.css";
import "./styles/App.css";

// We separate the main content into a new component so we can use hooks that depend on LocalizationContext
const AppContent = () => {
  // Using our custom hooks for localization
  const { language, region, setLanguage, setRegion } = useLocalization();
  const { t } = useTranslation();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem("preferredLanguage", newLanguage);
  };

  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion);
    localStorage.setItem("preferredRegion", newRegion);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          {/* Using our translation system for the title */}
          <h1>{t("common.title")}</h1>
          <UserPreferences
            onLanguageChange={handleLanguageChange}
            onRegionChange={handleRegionChange}
            defaultLanguage={language}
            defaultRegion={region}
          />
        </div>
      </header>

      <main className="app-main">
        <div className="content-container">
          <RoleManagement />
          <UserProfileForm />
        </div>
      </main>
    </div>
  );
};

// Main App component wraps everything with LocalizationProvider
function App() {
  return (
    <LocalizationProvider>
      <AppContent />
    </LocalizationProvider>
  );
}

export default App;
