import axios from 'axios';

const API_URL = 'http://localhost:5004/api/auth';

export interface LoginCredentials {
  email?: string;
  password?: string;
  [key: string]: unknown;
}

export interface RegisterUserData {
  fullName?: string;
  email?: string;
  password?: string;
  [key: string]: unknown;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('user_token', response.data.token as string);
      }
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: unknown } };
      throw err.response?.data || { error: 'Connection failed' };
    }
  },

  register: async (userData: RegisterUserData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: unknown } };
      throw err.response?.data || { error: 'Registration failed' };
    }
  },

  logout: () => {
    localStorage.removeItem('user_token');
  }
};
