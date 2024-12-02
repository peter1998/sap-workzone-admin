// src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
}

export interface Application {
  id: string;
  name: string;
  description?: string;
}

export interface UserRole {
  userId: string;
  roleId: string;
}

export interface RoleApplication {
  roleId: string;
  applicationId: string;
}
