// src/services/authService.ts
import api from './api';

export interface LoginPayload {
  studentId: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    studentId: string;
    role: 'student' | 'staff' | 'admin';
    email?: string;
    firstName?: string;
    lastName?: string;
  };
  tokens: {
    accessToken: string;
    refreshToken?: string;
  };
  error?: string;
}

// In a real application, this would call an actual API endpoint
export const loginApi = async ({ studentId, password }: LoginPayload): Promise<LoginResponse> => {
  try {
    // For development/demonstration purposes
    // This simulates checking a local storage database of registered users
    const storedUsers = localStorage.getItem('registeredUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Find the user with matching credentials
    const user = users.find((u: any) => 
      u.studentId === studentId && u.password === password
    );
    
    if (user) {
      // Determine role based on student ID prefix or stored role
      let role = user.role || 'student';
      
      // If no role was stored during registration, determine by ID prefix
      if (!user.role) {
        if (studentId.startsWith('1')) {
          role = 'admin';
        } else if (studentId.startsWith('2')) {
          role = 'staff';
        } else {
          role = 'student';
        }
      }
      
      // Generate a simple token
      const accessToken = btoa(`${studentId}:${role}:${Date.now()}`);
      
      return {
        user: {
          id: user.id || studentId,
          studentId: studentId,
          role: role,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        },
        tokens: {
          accessToken
        }
      };
    } else {
      // For demo purposes: if no registered user is found but the studentId starts with 1 or 2,
      // still allow login with appropriate role
      if (studentId.startsWith('1') || studentId.startsWith('2')) {
        const role = studentId.startsWith('1') ? 'admin' : 'staff';
        const accessToken = btoa(`${studentId}:${role}:${Date.now()}`);
        
        return {
          user: {
            id: studentId,
            studentId: studentId,
            role: role
          },
          tokens: {
            accessToken
          }
        };
      }
      
      return {
        user: {
          id: '',
          studentId: '',
          role: 'student'
        },
        tokens: {
          accessToken: ''
        },
        error: 'รหัสนิสิตหรือรหัสผ่านไม่ถูกต้อง'
      };
    }
  } catch (error) {
    console.error('Login error:', error);
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