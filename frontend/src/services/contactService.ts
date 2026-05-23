import api from './api';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

/**
 * Submit contact inquiry form to Express/PostgreSQL backend using Axios
 * Handles backward & forward compatibility with DB legacy schemas
 */
export const submitContact = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {
    const response = await api.post<ContactResponse>('/contact', {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      mobile_number: formData.phone,
      course_section: formData.course,
      message: formData.message
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error in submitContact service call:", error);
    throw error;
  }
};
