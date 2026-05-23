import api from './api';

export interface LoginCredentials {
  email?: string;
  password?: string;
  [key: string]: unknown;
}

export interface RegisterUserData {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
  [key: string]: unknown;
}

export interface ProfileUpdateData {
  fullName?: string;
  email?: string;
  phone?: string;
}

export interface SettingsUpdateData {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  darkMode?: boolean;
}

export interface TicketCreateData {
  subject: string;
  description: string;
  priority?: 'low' | 'medium' | 'high';
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success && response.data.token) {
        localStorage.setItem('user_token', response.data.token);
        localStorage.setItem('user_info', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      throw err.response?.data || { error: 'Connection failed' };
    }
  },

  register: async (userData: RegisterUserData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success && response.data.token) {
        localStorage.setItem('user_token', response.data.token);
        localStorage.setItem('user_info', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      throw err.response?.data || { error: 'Registration failed' };
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      throw err.response?.data || { error: 'Failed to retrieve profile' };
    }
  },

  updateProfile: async (profileData: ProfileUpdateData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      if (response.data.success && response.data.user) {
        localStorage.setItem('user_info', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      throw err.response?.data || { error: 'Failed to update profile' };
    }
  },

  updateSettings: async (settingsData: SettingsUpdateData) => {
    try {
      const response = await api.put('/auth/settings', settingsData);
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      throw err.response?.data || { error: 'Failed to save settings' };
    }
  },

  getTickets: async () => {
    try {
      const response = await api.get('/tickets');
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      throw err.response?.data || { error: 'Failed to fetch tickets' };
    }
  },

  createTicket: async (ticketData: TicketCreateData) => {
    try {
      const response = await api.post('/tickets', ticketData);
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      throw err.response?.data || { error: 'Failed to submit ticket' };
    }
  },

  logout: () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_info');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('user_token');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user_info');
    return user ? JSON.parse(user) : null;
  }
};
