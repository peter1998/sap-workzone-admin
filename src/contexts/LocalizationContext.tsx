import React, { createContext, useContext, useState, useEffect } from "react";
import { SUPPORTED_LANGUAGES, SUPPORTED_REGIONS } from "../types/localization";

interface LocalizationContextType {
  language: string;
  region: string;
  setLanguage: (lang: string) => void;
  setRegion: (reg: string) => void;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined
);

// Get system language or use fallback
const getDefaultLanguage = () => {
  const savedLanguage = localStorage.getItem("preferredLanguage");
  if (
    savedLanguage &&
    SUPPORTED_LANGUAGES.some((lang) => lang.code === savedLanguage)
  ) {
    return savedLanguage;
  }

  const browserLang = navigator.language.split("-")[0];
  if (SUPPORTED_LANGUAGES.some((lang) => lang.code === browserLang)) {
    return browserLang;
  }

  return "en"; // Default fallback
};

// Get system region or use fallback
const getDefaultRegion = () => {
  const savedRegion = localStorage.getItem("preferredRegion");
  if (
    savedRegion &&
    SUPPORTED_REGIONS.some((reg) => reg.code === savedRegion)
  ) {
    return savedRegion;
  }

  const browserRegion = navigator.language.split("-")[1]?.toLowerCase();
  if (
    browserRegion &&
    SUPPORTED_REGIONS.some((reg) => reg.code === browserRegion)
  ) {
    return browserRegion;
  }

  return "na"; // Default fallback
};

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState(getDefaultLanguage());
  const [region, setRegion] = useState(getDefaultRegion());

  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("preferredRegion", region);
  }, [region]);

  return (
    <LocalizationContext.Provider
      value={{ language, region, setLanguage, setRegion }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }
  return context;
};
