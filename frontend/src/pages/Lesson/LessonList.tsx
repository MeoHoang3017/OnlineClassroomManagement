import React, { useContext, useEffect, useState } from "react";
import useLesson from "../../hooks/useLesson";
import useFile from "../../hooks/useFile";
import AddLessonModal from "./AddLesson";
import EditLessonModal from "./EditLessonModal";
import { Button } from "../../components/common/Button";
import Pagination from "@mui/material/Pagination"; // Import MUI Pagination
import { Lesson } from "../../types/LessonTypes";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";
import { AuthContext } from "../../contexts/AuthContext";

type LessonListProps = {
    classId: string;
};

const LessonList: React.FC<LessonListProps> = ({ classId }) => {
    const { lessons, getLessonsByClass, createLesson, updateLesson, deleteLesson } = useLesson();
    const { downloadFiles, uploadFiles } = useFile();

    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1); // Current page
    const rowsPerPage = 5; // Items per page
    const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editLesson, setEditLesson] = useState<Lesson>({} as Lesson);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [lessonToDelete, setLessonToDelete] = useState<string | null>(null);
    const [editLessonOpen, setEditLessonOpen] = useState(false);
    const [downloadingLessonId, setDownloadingLessonId] = useState<string | null>(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        getLessonsByClass(classId);
    }, [classId]);

    useEffect(() => {
        const filtered = lessons.filter((lesson) =>
            lesson.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLessons(filtered);
    }, [lessons, searchTerm]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleDownloadFiles = async (lessonId: string) => {
        try {
            setDownloadingLessonId(lessonId);
            const response = await downloadFiles(lessonId);
            const url = window.URL.createObjectURL(response);
            const link = document.createElement("a");
            link.href = url;
            link.download = `lesson-${lessonId}-documents.zip`;
            link.click();
        } catch (error) {
            console.error("Error downloading files:", error);
        } finally {
            setDownloadingLessonId(null);
        }
    };

    const handleAddLesson = async (name: string, description: string, thumbnailUrl: string, videoUrl: string, files: File[]) => {
        const lesson = await createLesson({
            name,
            description,
            videoUrl,
            classId,
            thumbnailUrl,
            documents: [],
        });
        if (lesson) {
            await uploadFiles(lesson._id, files);
        }
        setIsModalOpen(false);
        setEditLesson({} as Lesson);
    };

    const handleOpenEditModal = (lesson: Lesson) => {
        setEditLesson(lesson);
        setEditLessonOpen(true);
    };

    const handleEditLesson = async (id: string, name: string, description: string, videoUrl: string, thumbnailUrl: string, documents: string[]) => {
        await updateLesson(id, {
            name,
            description,
            videoUrl,
            thumbnailUrl,
            classId,
            documents,
        });
        setEditLesson({} as Lesson);
        setEditLessonOpen(false);
    };

    const handleOpenDeleteModal = (id: string) => {
        setDeleteModalOpen(true);
        setLessonToDelete(id);
    };

    const handleDeleteLesson = async (id: string) => {
        await deleteLesson(id);
        setDeleteModalOpen(false);
    };


    return (
        <div className="p-6 mx-auto">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search lessons..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-2/3 focus:outline-none focus:ring focus:ring-blue-300"
                />
                {user?.role === "Teacher" && (
                    <Button onClick={() => setIsModalOpen(true)} variant="primary">
                        Add Lesson
                    </Button>
                )}
            </div>

            <div className="space-y-6">
                {filteredLessons.map((lesson) => (
                    <div
                        key={lesson._id}
                        className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden flex h-50"
                    >
                        <img
                            src={lesson.thumbnailUrl}
                            alt={lesson.name}
                            className="w-1/3 h-auto object-cover"
                        />
                        <div className="p-4 w-2/3">
                            <h3 className="text-lg font-bold">{lesson.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>

                            <a
                                onClick={() => handleDownloadFiles(lesson._id)}
                                className={`text-blue-500 hover:underline cursor-pointer ${downloadingLessonId === lesson._id
                                    ? "pointer-events-none text-gray-400"
                                    : ""
                                    }`}
                            >
                                {downloadingLessonId === lesson._id
                                    ? "Downloading..."
                                    : "Download Documents"}
                            </a>

                            <p className="text-xs text-gray-400 mt-2">
                                Created by {lesson.createdBy?.username || "Unknown User"} on{" "}
                                {new Date(lesson.createdAt).toLocaleDateString()}
                            </p>
                            {user?.role === "Teacher" && (
                                <div className="flex justify-between mt-4">
                                    <Button
                                        onClick={() => handleOpenEditModal(lesson)}
                                        variant="secondary"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleOpenDeleteModal(lesson._id)}
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* MUI Pagination */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Pagination
                    count={Math.ceil(filteredLessons.length / rowsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                    className="pagination-zindex"
                />
            </div>

            <AddLessonModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditLesson({} as Lesson);
                }}
                onAdd={handleAddLesson}
            />

            <EditLessonModal
                isOpen={editLessonOpen}
                onClose={() => {
                    setEditLessonOpen(false);
                    setEditLesson({} as Lesson);
                }}
                onSave={handleEditLesson}
                lesson={editLesson}
            />

            <ConfirmDeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={() => handleDeleteLesson(lessonToDelete!)}
            />
        </div>
    );
};

export default LessonList;
