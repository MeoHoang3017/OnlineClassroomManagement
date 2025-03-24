import React, { useState } from "react";
import { Button } from "../../components/common/Button";
import EditLessonModal from "./EditLessonModal";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";
import { Lesson } from "../../types/LessonTypes";

type LessonDetailProps = {
    lesson: Lesson;
    onUpdateLesson: (id: string, name: string, description: string, videoUrl: string, thumbnailUrl: string) => void;
    onDeleteLesson: (id: string) => void;
};

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onUpdateLesson, onDeleteLesson }) => {
    const [editLessonOpen, setEditLessonOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleEditLesson = (id: string, name: string, description: string, videoUrl: string, thumbnailUrl: string) => {
        onUpdateLesson(id, name, description, videoUrl, thumbnailUrl);
        setEditLessonOpen(false);
    };

    const handleDeleteLesson = (id: string) => {
        onDeleteLesson(id);
        setDeleteModalOpen(false);
    };

    return (
        <div className="p-6 mx-auto max-w-4xl">
            {/* Lesson Info */}
            <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row">
                <img
                    src={lesson.thumbnailUrl}
                    alt={lesson.name}
                    className="w-full md:w-1/3 h-auto object-cover"
                />
                <div className="p-6 w-full md:w-2/3">
                    <h2 className="text-2xl font-bold text-gray-800">{lesson.name}</h2>
                    <p className="text-sm text-gray-600 mt-2">{lesson.description}</p>
                    <a
                        href={lesson.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mt-4 block"
                    >
                        Watch Video
                    </a>
                    <p className="text-xs text-gray-400 mt-4">
                        Created by {lesson.createdBy?.username || "Unknown User"} on{" "}
                        {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                    {/* Action Buttons */}
                    <div className="flex space-x-4 mt-6">
                        <Button
                            onClick={() => setEditLessonOpen(true)}
                            variant="secondary"
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => setDeleteModalOpen(true)}
                            variant="danger"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <EditLessonModal
                isOpen={editLessonOpen}
                onClose={() => setEditLessonOpen(false)}
                onSave={handleEditLesson}
                lesson={lesson}
            />

            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={() => handleDeleteLesson(lesson._id)}
            />
        </div>
    );
};

export default LessonDetail;
