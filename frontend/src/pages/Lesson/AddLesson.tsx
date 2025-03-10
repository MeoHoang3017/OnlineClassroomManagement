import { useState } from 'react';
import { Button } from "../../components/common/Button";
import Modal from "../../components/common/Modal";
interface AddLessonModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (name: string, description: string, videoUrl: string, thumbnailUrl: string) => void
}
const AddLessonModal = ({ isOpen, onClose, onAdd }: AddLessonModalProps) => {
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Lesson">
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
                <Button onClick={() => onAdd(name, description, thumbnailUrl, videoUrl)}>Add</Button>
            </div>
        </Modal>
    )
}

export default AddLessonModal;