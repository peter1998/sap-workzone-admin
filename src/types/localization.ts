export interface Language {
  code: string;
  name: string;
}

export interface Region {
  code: string;
  name: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "de", name: "German" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
];

export const SUPPORTED_REGIONS: Region[] = [
  { code: "na", name: "North America" },
  { code: "eu", name: "Europe" },
  { code: "asia", name: "Asia" },
  { code: "sa", name: "South America" },
];
