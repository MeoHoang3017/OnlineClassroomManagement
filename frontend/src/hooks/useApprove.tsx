import { useState } from 'react';
import approvementAPI from '../api/approveAPI';
import { Approvement, CreateApprovementData } from '../types/Approvement';

const useApprove = () => {
    const [approvements, setApprovements] = useState<Approvement[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch approvements by class ID
    const fetchApprovementsByClassId = async (classId: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await approvementAPI.getApprovementsByClassId(classId);
            setApprovements(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Failed to fetch approvements');
        } finally {
            setLoading(false);
        }
    };

    // Create a new approvement
    const createApprovement = async (approvementData: CreateApprovementData) => {
        setLoading(true);
        setError(null);
        try {
            const newApprovement = await approvementAPI.createApprovement(approvementData);
            setApprovements((prev) => [...prev, newApprovement]);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Failed to create approvement');
        } finally {
            setLoading(false);
        }
    };

    // Allow an approvement
    const allowApprovement = async (approvementId: string) => {
        setLoading(true);
        setError(null);
        try {
            const updatedApprovement = await approvementAPI.allowApprovement(approvementId);
            setApprovements((prev) =>
                prev.map((approvement) =>
                    approvement._id === approvementId ? updatedApprovement : approvement
                )
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Failed to allow approvement');
        } finally {
            setLoading(false);
        }
    };

    // Reject an approvement
    const rejectApprovement = async (approvementId: string) => {
        setLoading(true);
        setError(null);
        try {
            const updatedApprovement = await approvementAPI.rejectApprovement(approvementId);
            setApprovements((prev) =>
                prev.map((approvement) =>
                    approvement._id === approvementId ? updatedApprovement : approvement
                )
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Failed to reject approvement');
        } finally {
            setLoading(false);
        }
    };

    return {
        approvements,
        loading,
        error,
        fetchApprovementsByClassId,
        createApprovement,
        allowApprovement,
        rejectApprovement,
    };
};

export default useApprove;