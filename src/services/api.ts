import axios from "axios";
import { User, Role, Application } from "../types";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export const api = {
  // User endpoints
  users: {
    list: async (page = 1, limit = 10) =>
      axios.get(`${BASE_URL}/users?page=${page}&limit=${limit}`),
    create: async (userData: Partial<User>) =>
      axios.post(`${BASE_URL}/users`, userData),
    update: async (id: string, userData: Partial<User>) =>
      axios.put(`${BASE_URL}/users/${id}`, userData),
    delete: async (id: string) => axios.delete(`${BASE_URL}/users/${id}`),
  },

  // Role endpoints
  roles: {
    list: async (page = 1, limit = 10) =>
      axios.get(`${BASE_URL}/roles?page=${page}&limit=${limit}`),
    assign: async (userId: string, roleId: string) =>
      axios.post(`${BASE_URL}/users/${userId}/roles/${roleId}`),
    unassign: async (userId: string, roleId: string) =>
      axios.delete(`${BASE_URL}/users/${userId}/roles/${roleId}`),
  },

  // Application endpoints
  applications: {
    list: async (page = 1, limit = 10) =>
      axios.get(`${BASE_URL}/applications?page=${page}&limit=${limit}`),
    assignRole: async (appId: string, roleId: string) =>
      axios.post(`${BASE_URL}/applications/${appId}/roles/${roleId}`),
  },
};
