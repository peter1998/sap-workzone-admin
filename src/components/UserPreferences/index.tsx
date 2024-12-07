import React, { useState } from "react";
import {
  SUPPORTED_LANGUAGES,
  SUPPORTED_REGIONS,
} from "../../types/localization";
import "./UserPreferences.css";

interface UserPreferencesProps {
  onLanguageChange: (languageCode: string) => void;
  onRegionChange: (regionCode: string) => void;
  defaultLanguage?: string;
  defaultRegion?: string;
}

const UserPreferences = ({
  onLanguageChange,
  onRegionChange,
  defaultLanguage = "en",
  defaultRegion = "na",
}: UserPreferencesProps) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [region, setRegion] = useState(defaultRegion);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    onLanguageChange(newLanguage);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = e.target.value;
    setRegion(newRegion);
    onRegionChange(newRegion);
  };

  return (
    <div className="user-preferences">
      <div className="preference-group">
        <label htmlFor="language">Language</label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="preference-group">
        <label htmlFor="region">Region</label>
        <select id="region" value={region} onChange={handleRegionChange}>
          {SUPPORTED_REGIONS.map((reg) => (
            <option key={reg.code} value={reg.code}>
              {reg.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserPreferences;
