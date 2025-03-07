import React, { useState } from "react";
import { Classroom } from '../../types/ClassroomTypes';
import Modal from "../../components/common/Modal";

interface EditClassroomModalProps {
    isOpen: boolean;
    onClose: () => void;
    classroom: Classroom;
    onSave: (updatedClassroom: Classroom) => void;
}

const EditClassroomModal: React.FC<EditClassroomModalProps> = ({ isOpen, onClose, classroom, onSave }) => {
    const [name, setName] = useState(classroom.name);
    const [description, setDescription] = useState(classroom.description);

    const handleSave = () => {
        onSave({
            ...classroom,
            name,
            description,
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Classroom">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Classroom Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        rows={4}
                    ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EditClassroomModal;
