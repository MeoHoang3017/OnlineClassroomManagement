import React from "react";
import { Classroom } from '../../types/ClassroomTypes';

interface ClassDetailProps {
    classroom: Classroom;
    onClose: () => void;
}

const ClassDetail: React.FC<ClassDetailProps> = ({ classroom, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">{classroom.name}</h2>
                <p className="text-gray-600 mb-2">Description: {classroom.description}</p>
                <p className="text-gray-600 mb-2">Students: {classroom.students}</p>
                <p className="text-gray-600 mb-2">Created By: {classroom.createdBy}</p>
                <div className="mt-6 flex justify-end">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassDetail;
