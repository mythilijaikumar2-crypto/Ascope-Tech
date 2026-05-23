import api from './api';

export interface AdminAnalytics {
  totalUsers: number;
  totalEnrollments: number;
  totalCourses: number;
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  totalContacts: number;
}

export interface AdminUser {
  id: number;
  full_name: string;
  email: string;
  role: string;
  phone?: string;
  created_at: string;
}

export interface AdminEnrollment {
  id: number;
  course_id: number;
  course_title?: string;
  full_name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface AdminTicket {
  id: number;
  user_id: number;
  student_name?: string;
  student_email?: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'resolved';
  created_at: string;
}

// 1. Fetch live system aggregates
export const getAdminAnalytics = async (): Promise<AdminAnalytics> => {
  const response = await api.get('/admin/analytics');
  return response.data.data;
};

// 2. Fetch all registered users
export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const response = await api.get('/admin/users');
  return response.data.data;
};

// 3. Fetch all course enrollments
export const getAdminEnrollments = async (): Promise<AdminEnrollment[]> => {
  const response = await api.get('/admin/enrollments');
  return response.data.data;
};

// 4. Update student enrollment status
export const updateEnrollmentStatus = async (
  id: number,
  status: 'approved' | 'rejected'
): Promise<AdminEnrollment> => {
  const response = await api.put(`/admin/enrollments/${id}`, { status });
  return response.data.data;
};

// 5. Fetch all raised support tickets
export const getAdminTickets = async (): Promise<AdminTicket[]> => {
  const response = await api.get('/admin/tickets');
  return response.data.data;
};

// 6. Set ticket status (resolved / open)
export const updateTicketStatus = async (
  id: number,
  status: 'open' | 'resolved'
): Promise<AdminTicket> => {
  const response = await api.put(`/admin/tickets/${id}`, { status });
  return response.data.data;
};
