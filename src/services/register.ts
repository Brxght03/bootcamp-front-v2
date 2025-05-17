// src/services/register.ts
import api from './api';
import { v4 as uuidv4 } from 'uuid'; 

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

export interface RegisterResult {
  message: string;
  user: {
    id: string;
    studentId: string;
    role: 'student' | 'staff' | 'admin';
  };
  error?: string;
}

export const register = async (payload: RegisterPayload): Promise<RegisterResult> => {
  try {
    // In a real application, this would call an actual API endpoint
    // For demonstration, we'll save the user to localStorage
    
    // Check if studentId already exists
    const storedUsers = localStorage.getItem('registeredUsers');
    let users = storedUsers ? JSON.parse(storedUsers) : [];
    
    if (users.some((user: any) => user.studentId === payload.studentId)) {
      return {
        message: 'รหัสนิสิตนี้ถูกลงทะเบียนแล้ว',
        user: { id: '', studentId: '', role: 'student' },
        error: 'รหัสนิสิตนี้ถูกลงทะเบียนแล้ว'
      };
    }
    
    // Determine role based on student ID prefix (just for demo)
    let role: 'student' | 'staff' | 'admin' = 'student';
    if (payload.studentId.startsWith('1')) {
      role = 'admin';
    } else if (payload.studentId.startsWith('2')) {
      role = 'staff';
    }
    
    // Create new user
    const newUser = {
      id: uuidv4(), // Generate a unique ID
      ...payload,
      role
    };
    
    // Save to "database" (localStorage)
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    // Return success
    return {
      message: 'ลงทะเบียนสำเร็จ',
      user: {
        id: newUser.id,
        studentId: newUser.studentId,
        role: newUser.role
      }
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      message: 'เกิดข้อผิดพลาดในการลงทะเบียน',
      user: { id: '', studentId: '', role: 'student' },
      error: 'เกิดข้อผิดพลาดในการลงทะเบียน'
    };
  }
};