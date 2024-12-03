export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  preferredLanguage?: string;
  preferredRegion?: string;
  roles?: string[];
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  applications?: string[];
}

export interface Application {
  id: string;
  name: string;
  description?: string;
  roles?: string[];
}

export interface UserRole {
  userId: string;
  roleId: string;
}

export interface RoleApplication {
  roleId: string;
  applicationId: string;
}
