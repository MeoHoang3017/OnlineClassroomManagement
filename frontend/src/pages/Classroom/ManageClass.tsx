import { useEffect, useState } from 'react';
import AddClassroomModal from './AddClass';
import EditClassModal from './EditClass';
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal';
import { Button } from '../../components/common/Button';
import useClassroom from '../../hooks/useClassroom';
import { useNavigate } from 'react-router-dom';
import { Classroom } from '../../types/ClassroomTypes';
import useNotification from '../../hooks/useNotification';
const ClassroomManagement = () => {
    const { classes, createClass, deleteClass, getClassesByTeacherId, updateClass } = useClassroom();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editClass, setEditClass] = useState({} as Classroom);
    const [classToDelete, setClassToDelete] = useState<string | null>(null);
    const [showSuccessMessage, showErrorMessage] = useNotification();

    const navigate = useNavigate();
    // const { user } = useContext(AuthContext);
    useEffect(() => {
        getClassesByTeacherId();
    }, []);

    const addClassroom = (name: string, description: string, code: string) => {
        try {
            createClass({ name, description, classCode: code });
            setIsModalOpen(false);
            showSuccessMessage('Classroom created successfully!');
        } catch (e) {
            console.log(e);
            showErrorMessage('Failed to create classroom. Please try again.');
        }
    };

    const handleDeleteClass = () => {
        try {
            if (classToDelete) {
                deleteClass(classToDelete);
                setClassToDelete(null);
                setDeleteModalOpen(false);
                showSuccessMessage('Classroom deleted successfully!');
            }
        } catch (e) {
            console.log(e);
            showErrorMessage('Failed to delete classroom. Please try again.');
        }
    };

    const handleOpenEditModal = (classroom: Classroom) => {
        setEditClass(classroom);
        setEditModalOpen(true);
    };

    const handleEditClass = async (updatedClassroom: Classroom) => {
        try {
            await updateClass(updatedClassroom._id, updatedClassroom);
            setEditModalOpen(false);
            showSuccessMessage('Classroom updated successfully!');
        } catch (e) {
            console.log(e);
            showErrorMessage('Failed to update classroom. Please try again.');
        }
    };

    return (
        <div className="p-6 mx-auto">
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

            <EditClassModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                classroom={editClass}
                onSave={handleEditClass}
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
                                onClick={() => handleOpenEditModal(classroom)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => navigate(`/classroom/${classroom._id}`)}
                            >
                                View
                            </Button>
                            <Button
                                variant="success"
                                onClick={() => navigate}
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
