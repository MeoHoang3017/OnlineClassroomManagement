import { useEffect, useState } from 'react';
import AddClassroomModal from './AddClass';
import EditClassModal from './EditClass';
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal';
import { Button } from '../../components/common/Button';
import { Pagination } from '@mui/material'; // Import MUI Pagination
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

    const [filter, setFilter] = useState(''); // For search by name
    const [sortBy, setSortBy] = useState(''); // For sorting
    const [page, setPage] = useState(1); // Current page
    const rowsPerPage = 5; // Items per page
    const [filteredClasses, setFilteredClasses] = useState(classes); // Filtered and sorted classes

    const navigate = useNavigate();

    useEffect(() => {
        getClassesByTeacherId();
    }, []);

    useEffect(() => {
        // Apply filtering and sorting when classes or filters change
        let updatedClasses = classes;

        // Filter by name
        if (filter) {
            updatedClasses = updatedClasses.filter((classroom) =>
                classroom.name.toLowerCase().includes(filter.toLowerCase())
            );
        }

        // Sort by different criteria
        if (sortBy === 'date') {
            updatedClasses = [...updatedClasses].sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        } else if (sortBy === 'name') {
            updatedClasses = [...updatedClasses].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'students') {
            updatedClasses = [...updatedClasses].sort((a, b) => b.students.length - a.students.length);
        }

        setFilteredClasses(updatedClasses);
    }, [filter, sortBy, classes]);

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

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value); // Update the current page
    };

    return (
        <div className="p-6 mx-auto">
            <h1 className="text-3xl font-bold mb-6">Classroom Management</h1>

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

            {/* Filters and Sort Options */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    placeholder="Search by classroom name"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <select
                    className="border border-gray-300 rounded-md px-4 py-2"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="date">Date Created</option>
                    <option value="name">Classroom Name</option>
                    <option value="students">Number of Students</option>
                </select>
                <Button onClick={() => setIsModalOpen(true)} variant="primary" style={{ width: '200px' }}>
                    Add Classroom
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredClasses
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage) // Paginate classes
                    .map((classroom) => (
                        <div
                            key={classroom.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                        >
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {classroom.name}
                                </h2>
                                <p className="text-gray-600 mt-2">{classroom.description}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Students: {classroom.students.length}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Created By: {classroom.createdBy
                                        ? classroom.createdBy.username
                                        : 'Unknown'}
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
                            </div>
                        </div>
                    ))}
            </div>

            {/* Pagination */}
            { }
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                    count={Math.ceil(filteredClasses.length / rowsPerPage)} // Calculate total pages
                    page={page}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                    className="pagination-zindex"
                />
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
