import axios from 'axios';

// Create an instance of Axios with a base configuration
const api = axios.create({
    baseURL: 'http://localhost:5004/api', // Updated to 5004 to bypass 5003 zombie port issues
    timeout: 5000, // If the server takes more than 5 seconds, give up
    headers: {
        'Content-Type': 'application/json',
    }
});

// Professional Tip: You can add interceptors here later for authentication!

export default api;
