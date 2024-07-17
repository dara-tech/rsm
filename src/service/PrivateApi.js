import axios from 'axios';


const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

if (!API_KEY) {
    console.error('API_KEY is not defined. Please check your .env file.');
} else {
    console.log(`API_KEY: ${API_KEY}`); // Log to check if the API key is loaded correctly
}

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const CreateNewResume = async (data) => {
    try {
        const response = await axiosClient.post('/user-resumes', data);
        // toast.success('Resume created successfully');
        return response.data;
    } catch (error) {
        console.error("Error creating new resume:", error.response ? error.response.data : error.message);
        // toast.error('Failed to create resume');
        throw error; // Re-throw the error so it can be handled further up the call stack if needed
    }
};
const GetUserResumes = async (userEmail) => {
    try {
        const response = await axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching resumes:", error.response ? error.response.data : error.message);
        throw error; // Re-throw the error so it can be handled further up the call stack if needed
    }
};

// Function to update user resume details
const UpdateResumeDetail = async (id, data) => {
    try {
        console.log("Updating resume with ID:", id);
        console.log("Data being sent:", data);
        
        const response = await axiosClient.put(`/user-resumes/${id}`, data);
        // toast.success('Resume updated successfully');
        return response.data;
    } catch (error) {
        console.error("Error updating resume:", error);
        console.error("Error response data:", error.response ? error.response.data : "No response");
        // toast.error('Failed to update resume');
        throw error;
    }
};




// Function to get resume by ID
const GetResumeById = async (id) => {
    try {
        const response = await axiosClient.get(`/user-resumes/${id}?populate=*`);
        return response.data;
    } catch (error) {
        console.error("Error fetching resume by ID:", error.response ? error.response.data : error.message);
        throw error; // Re-throw the error so it can be handled further up the call stack if needed
    }
};

// Function to delete resume by ID
const DeleteResumeById = async (id) => {
    try {
        const response = await axiosClient.delete(`/user-resumes/${id}`);
        // toast.success('Resume deleted successfully');
        return response.data;
    } catch (error) {
        console.error("Error deleting resume:", error.response ? error.response.data : error.message);
        // toast.error('Failed to delete resume');
        throw error; // Re-throw the error so it can be handled further up the call stack if needed
    }
};

export {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
};

