import axios from 'axios';

// Set the base URL for your API
const baseUrl = "http://quizzie-thunder-apis.onrender.com/api"; // https://localhost:4444/api
axios.defaults.baseURL = baseUrl;

// Create an Axios instance with the base URL
const axiosClient = axios.create();

// Add an interceptor to automatically include the authorization header
axiosClient.interceptors.request.use(
    (config) => {
        const storedLoginResult = JSON.parse(localStorage.getItem('login_result'));
        const token = storedLoginResult ? storedLoginResult.token : null;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to handle API responses globally
const handleApiResponse = (response) => {
    if (response.status === 200 && response.data && response.data.code === 200) {
        return response.data;
    } else {
        throw new Error(response.data ? response.data.message : "Error occurred");
    }
};

const handleApiError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage = error.response.data.message || "Error occurred";
        throw new Error(errorMessage);
    } else if (error.request) {
        // The request was made but no response was received
        throw new Error("No response received for the request");
    } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error("Error setting up the request: " + error.message);
    }
};

// Add an interceptor to handle API responses globally
axiosClient.interceptors.response.use(
    (response) => handleApiResponse(response),
    (error) => {
        console.error("Network Error:", error);
        return Promise.reject(handleApiError(error));
    }
);

export default axiosClient;
