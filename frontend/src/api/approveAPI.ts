import authorApi from './baseAPI/authorAPI';
import { CreateApprovementData } from '../types/Approvement';
const approvementAPI = {
    // Fetch approvements by class ID
    getApprovementsByClassId: async (classId: string) => {
        const response = await authorApi.get(`/approvements/class/${classId}`);
        return response.data;
    },

    // Create a new approvement
    createApprovement: async (approvementData: CreateApprovementData) => {
        const response = await authorApi.post('/approvements', approvementData);
        return response.data;
    },

    // Allow an approvement
    allowApprovement: async (approvementId: string) => {
        const response = await authorApi.put(`/approvements/allow/${approvementId}`);
        return response.data;
    },

    // Reject an approvement
    rejectApprovement: async (approvementId: string) => {
        const response = await authorApi.put(`/approvements/reject/${approvementId}`);
        return response.data;
    },
};

export default approvementAPI;