import axios from "axios";
import { User, Role, Application } from "../types";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const api = {
  // User endpoints
  getUsers: () => axios.get<User[]>(`${API_BASE_URL}/users`),

  // Role endpoints
  getRoles: () => axios.get<Role[]>(`${API_BASE_URL}/roles`),
  assignUserToRole: (userId: string, roleId: string) =>
    axios.post(`${API_BASE_URL}/users/${userId}/roles/${roleId}`),

  // Application endpoints
  getApplications: () =>
    axios.get<Application[]>(`${API_BASE_URL}/applications`),
  assignRoleToApplication: (roleId: string, applicationId: string) =>
    axios.post(`${API_BASE_URL}/roles/${roleId}/applications/${applicationId}`),
};
