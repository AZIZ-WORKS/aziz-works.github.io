import axios from 'axios';

// Create an instance of Axios with default settings

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials if required by CORS policy
});

export const submitRegistration = async (formData) => {
  try {
    const response = await api.post('/api/registrations', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting registration:', error);
    throw error;
  }
};

// Export the Axios instance for other potential uses
export default api;
