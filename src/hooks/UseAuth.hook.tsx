import { useContext } from "react";
import { AuthStore, UserRole } from "../stores/auth.store";
import { loginApi, LoginPayload, LoginResponse } from "../services/authService";

export interface UserData {
  id: string;
  studentId: string;
  role: UserRole;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export const useAuth = () => {
  const context = useContext(AuthStore);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Add a wrapper function for login that handles the API call
  const handleLogin = async (credentials: LoginPayload): Promise<LoginResponse> => {
    try {
      const result = await loginApi(credentials);
      
      if (!result.error && result.user && result.tokens.accessToken) {
        // Login was successful
        const userData: UserData = {
          id: result.user.id,
          studentId: result.user.studentId,
          role: result.user.role,
          email: result.user.email,
          firstName: result.user.firstName,
          lastName: result.user.lastName
        };
        
        // Update auth context with user info
        context.login(userData, result.tokens.accessToken);
      }
      
      return result;
    } catch (error) {
      console.error("Login error:", error);
      return {
        user: {
          id: '',
          studentId: '',
          role: 'student'
        },
        tokens: {
          accessToken: ''
        },
        error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
      };
    }
  };
  
  return {
    ...context,
    handleLogin
  };
};

export { loginApi };
export type { LoginPayload };