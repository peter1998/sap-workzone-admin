import React, { useState } from "react";
import UserProfileForm from "./components/UserProfileForm";
import RoleManagement from "./components/RoleManagement";
import UserPreferences from "./components/UserPreferences";
import "./styles/index.css";
import "./styles/App.css"; // We'll create this

function App() {
  const [language, setLanguage] = useState("en");
  const [region, setRegion] = useState("na");

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // You could also save this to localStorage
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
          <h1>SAP Work Zone Admin</h1>
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
}

export default App;
