import React, { useEffect } from 'react';
import useApprove from '../hooks/useApprove';
import { Button } from '../components/common/Button';

interface ApprovementListProps {
    classId: string;
}

const ApprovementList: React.FC<ApprovementListProps> = ({ classId }) => {
    const {
        approvements,
        loading,
        error,
        fetchApprovementsByClassId,
        allowApprovement,
        rejectApprovement,
    } = useApprove();

    useEffect(() => {
        fetchApprovementsByClassId(classId);
    }, [classId]);

    const handleAllow = async (approvementId: string) => {
        await allowApprovement(approvementId);
    };

    const handleReject = async (approvementId: string) => {
        await rejectApprovement(approvementId);
    };

    if (loading) {
        return <p>Loading approvements...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (approvements.length === 0) {
        return <p>No approvements found for this class.</p>;
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Approvement List</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">User</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {approvements.map((approvement) => (
                        <tr key={approvement._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{approvement.userId}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {approvement.isAllowed
                                    ? 'Allowed'
                                    : approvement.isRead
                                        ? 'Rejected'
                                        : 'Pending'}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 space-x-2">
                                {!approvement.isRead && (
                                    <>
                                        <Button
                                            variant="success"
                                            onClick={() => handleAllow(approvement._id)}
                                        >
                                            Allow
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleReject(approvement._id)}
                                        >
                                            Reject
                                        </Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovementList;