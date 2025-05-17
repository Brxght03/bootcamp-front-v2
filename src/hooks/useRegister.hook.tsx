// src/hooks/useRegister.hook.tsx
import { useState } from "react";
import { register, RegisterPayload } from "../services/register";

export interface RegisterResult {
  message: string;
  user: {
    id: string;
    studentId: string;
  };
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (userData: RegisterPayload): Promise<RegisterResult | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await register(userData);
      return result;
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'เกิดข้อผิดพลาดในการลงทะเบียน โปรดลองอีกครั้ง'
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading,
    error
  };
};
