import React, { useEffect, useState, useCallback } from 'react';
import { getCourses, createCourse } from '../services/courseService';

// 0. Define the Course Interface (Professional way to avoid "any")
interface Course {
    id?: number;
    title: string;
    price: string;
    duration: string;
}

const CourseAdmin: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [newCourse, setNewCourse] = useState<Course>({ title: '', price: '', duration: '' });
    const [loading, setLoading] = useState(true);

    // 1. Fetch courses function
    const fetchData = useCallback(async () => {
        try {
            const data = await getCourses();
            setCourses(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching courses:", error);
            alert("Failed to fetch courses. Is your backend running?");
            setLoading(false);
        }
    }, []);

    // 2. Fetch courses when the page loads
    useEffect(() => {
        Promise.resolve().then(fetchData);
    }, [fetchData]);

    // 2. Handle Form Submission (Create)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createCourse(newCourse);
            alert("Course added successfully!");
            setNewCourse({ title: '', price: '', duration: '' }); // Reset form
            fetchData(); // Refresh the list
        } catch (error) {
            console.error("Error creating course:", error);
            alert("Failed to add course.");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading courses...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-indigo-700">Course Management Dashboard</h1>

            {/* --- ADD COURSE FORM --- */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-10 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Course Title"
                        className="border p-2 rounded"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Price (e.g. ₹25,000)"
                        className="border p-2 rounded"
                        value={newCourse.price}
                        onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Duration (e.g. 6 Months)"
                        className="border p-2 rounded"
                        value={newCourse.duration}
                        onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    />
                    <button type="submit" className="md:col-span-3 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">
                        Add Course
                    </button>
                </form>
            </div>

            {/* --- COURSE LIST --- */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 border-b">ID</th>
                            <th className="p-4 border-b">Title</th>
                            <th className="p-4 border-b">Price</th>
                            <th className="p-4 border-b">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id} className="hover:bg-gray-50">
                                <td className="p-4 border-b">{course.id}</td>
                                <td className="p-4 border-b font-medium">{course.title}</td>
                                <td className="p-4 border-b text-gray-600">{course.price}</td>
                                <td className="p-4 border-b text-gray-600">{course.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseAdmin;
