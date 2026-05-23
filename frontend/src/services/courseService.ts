import api from './api';

interface Course {
    id?: number;
    title: string;
    price: string;
    duration: string;
}

// Fetch all courses
export const getCourses = async (): Promise<Course[]> => {
    try {
        const response = await api.get('/courses');
        return response.data.data || response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

// Create a new course
export const createCourse = async (courseData: Course): Promise<Course> => {
    try {
        const response = await api.post('/courses', courseData);
        return response.data;
    } catch (error) {
        console.error("Error creating course:", error);
        throw error;
    }
};

// Add more functions here for Update and Delete later!
