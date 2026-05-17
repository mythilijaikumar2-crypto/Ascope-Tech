import axios from 'axios';

const API_URL = 'http://localhost:5003/api/auth';

export const authService = {
  login: async (credentials: any) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('user_token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Connection failed' };
    }
  },

  register: async (userData: any) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { error: 'Registration failed' };
    }
  },

  logout: () => {
    localStorage.removeItem('user_token');
  }
};
