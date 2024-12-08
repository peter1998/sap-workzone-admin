export interface TranslationSchema {
  common: {
    title: string;
    loading: string;
    save: string;
    cancel: string;
  };
  userPreferences: {
    language: string;
    region: string;
    settings: string;
  };
  roleManagement: {
    assignUserRole: string;
    assignRoleApp: string;
    selectUser: string;
    selectRole: string;
    selectApp: string;
  };
}
