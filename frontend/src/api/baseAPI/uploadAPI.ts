import axios from "axios";

// Create Axios instance
const apiClient = axios.create({
    baseURL: "http://localhost:3000/api", // Replace with your API's base URL
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Enables cookies in requests if needed
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadFileBase = async (endpoint: string, formData: FormData): Promise<any> => {
    try {
        // Post the FormData to the specified endpoint
        const response = await apiClient.post(endpoint, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Ensure file upload headers
            },
        });
        return response.data; // Return the response data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error uploading file:", error);
        throw error.response?.data || "Error occurred during file upload";
    }
};

export default uploadFileBase;
