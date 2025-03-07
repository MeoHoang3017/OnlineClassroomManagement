import { useEffect, useState } from 'react';
import AddClassroomModal from './AddClass';
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal';
import { Button } from '../../components/common/Button';
import useClassroom from '../../hooks/useClassroom';

const ClassroomManagement = () => {
    const { classes, getAllClasses, createClass, deleteClass } = useClassroom();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [classToDelete, setClassToDelete] = useState<string | null>(null);

    useEffect(() => {
        getAllClasses();
    }, []);

    const addClassroom = (name: string, description: string, code: string) => {
        createClass({ name, description, classCode: code });
        setIsModalOpen(false);
    };

    const handleDeleteClass = () => {
        if (classToDelete) {
            deleteClass(classToDelete);
            setClassToDelete(null);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Classroom Management</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors mb-6"
                onClick={() => setIsModalOpen(true)}
            >
                Add Classroom
            </button>
            <AddClassroomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={addClassroom}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classes.map((classroom) => (
                    <div
                        key={classroom.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                    >
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {classroom.name}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                {classroom.description}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Students: {classroom.students.length}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Created By: {classroom.createdBy
                                    ? classroom.createdBy.username
                                    : "Unknown"}
                            </p>
                        </div>
                        <div className="p-2 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
                            <Button
                                variant="danger"
                                onClick={() => {
                                    setDeleteModalOpen(true);
                                    setClassToDelete(classroom._id);
                                }}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => alert("Edit Classroom")}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => alert("View Classroom")}
                            >
                                View
                            </Button>
                            <Button
                                variant="success"
                                onClick={() => alert("Manage Students")}
                            >
                                Join
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Confirm Delete Modal */}
            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={handleDeleteClass}
                message="Are you sure you want to delete this classroom? This action cannot be undone."
            />
        </div>
    );
};

export default ClassroomManagement;
