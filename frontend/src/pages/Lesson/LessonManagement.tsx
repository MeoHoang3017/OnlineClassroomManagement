import { useEffect, useState } from 'react';
import AddLessonModal from './AddLesson';
import EditLessonModal from './EditLessonModal';
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal';
import { Button } from '../../components/common/Button';
import useLesson from '../../hooks/useLesson';
import { useNavigate } from 'react-router-dom';
import { Lesson } from '../../types/LessonTypes';

const LessonManagement = () => {
    const { lessons, getAllLessons, createLesson, deleteLesson, updateLesson } = useLesson();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editLesson, setEditLesson] = useState<Lesson>({} as Lesson);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [lessonToDelete, setLessonToDelete] = useState<string | null>(null);
    const navigate = useNavigate();
    const classId = new URLSearchParams(window.location.search).get('classId') || '';

    useEffect(() => {
        getAllLessons();
    }, []);

    const addLesson = (name: string, description: string, videoUrl: string, thumbnailUrl: string) => {
        createLesson({ name, description, videoUrl, classId, thumbnailUrl });
        setIsModalOpen(false);
    };

    const handleDeleteLesson = () => {
        if (lessonToDelete) {
            deleteLesson(lessonToDelete);
            setLessonToDelete(null);
        }
    };

    const handleOpenEditModal = (lesson: Lesson) => {
        setEditLesson(lesson);
        setEditModalOpen(true);
    };

    const handleEditLesson = (id: string, name: string, description: string, videoUrl: string, thumbnailUrl: string) => {
        updateLesson(id, {
            name, description, videoUrl, thumbnailUrl, classId
        });
        setEditLesson({} as Lesson);
        setEditModalOpen(false);
    };

    return (
        <div className="p-6 mx-auto">
            <h1 className="text-3xl font-bold mb-6">Lesson Management</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors mb-6"
                onClick={() => setIsModalOpen(true)}
            >
                Add Lesson
            </button>
            <AddLessonModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={addLesson}
            />
            <EditLessonModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={handleEditLesson}
                lesson={editLesson}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lessons.map((lesson: Lesson) => (
                    <div
                        key={lesson._id}
                        className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                    >
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {lesson.name}
                            </h2>
                            <p className="text-gray-600 mt-2">{lesson.description}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Class Code: {lesson.class?.classCode || 'Unknown'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Created By: {lesson.createdBy?.username || 'Unknown'}
                            </p>
                        </div>
                        <div className="p-2 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
                            <Button
                                variant="danger"
                                onClick={() => {
                                    setDeleteModalOpen(true);
                                    setLessonToDelete(lesson._id);
                                }}
                            >
                                Delete
                            </Button>
                            <Button variant="primary" onClick={() => handleOpenEditModal(lesson)}>
                                Edit
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => navigate(`/lesson/${lesson._id}`)}
                            >
                                View
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={handleDeleteLesson}
                message="Are you sure you want to delete this lesson? This action cannot be undone."
            />
        </div>
    );
};

export default LessonManagement;
