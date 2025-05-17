// src/services/register.ts
import api from './api';

export interface RegisterPayload {
  studentId: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  faculty?: string;
  major?: string;
}

export const register = async (payload: RegisterPayload) => {
  const response = await api.post('/api/auth/register', payload);
  return response.data;
};