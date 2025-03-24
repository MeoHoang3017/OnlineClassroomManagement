import { useState, useEffect } from 'react';
import { Button } from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { Lesson } from "../../types/LessonTypes";

interface EditLessonModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (id: string, name: string, description: string, videoUrl: string, thumbnailUrl: string) => void
    lesson: Lesson | null
}

const EditLessonModal = ({ isOpen, onClose, onSave, lesson }: EditLessonModalProps) => {
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    useEffect(() => {
        if (lesson) {
            setName(lesson.name);
            setDescription(lesson.description);
            setThumbnailUrl(lesson.thumbnailUrl);
            setVideoUrl(lesson.videoUrl);
        }
    }, [lesson]);

    const handleSave = () => {
        if (lesson) {
            onSave(lesson._id, name, description, videoUrl, thumbnailUrl);
            onClose();
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Lesson">
            <input
                type="text"
                className="border p-2 w-full rounded-md mb-2"
                placeholder="Enter lesson name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                className="border p-2 w-full rounded-md mb-2"
                placeholder="Enter lesson description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                className="border p-2 w-full rounded-md mb-2"
                placeholder="Enter thumbnail URL"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
            />
            <input
                type="text"
                className="border p-2 w-full rounded-md mb-2"
                placeholder="Enter video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
            />
            <div className="flex justify-end gap-2">
                <Button onClick={onClose} variant="danger">
                    Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
            </div>
        </Modal>
    )
}

export default EditLessonModal;
