// src/services/authService.ts
import api from './api';

export interface LoginPayload {
  studentId: string;
  password: string;
}

export const loginApi = async ({ studentId, password }: LoginPayload) => {
  const response = await api.post('/login', { studentId, password });
  return response.data;
};