import { useState } from 'react';
import { Button } from "../../components/common/Button";
import Modal from "../../components/common/Modal";

interface AddLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (
        name: string,
        description: string,
        videoUrl: string,
        thumbnailUrl: string,
        documents: File[]
    ) => Promise<void>; // Updated to handle async operation
}

const AddLessonModal = ({ isOpen, onClose, onAdd }: AddLessonModalProps) => {
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles([...files, ...Array.from(event.target.files)]);
        }
    };

    const removeFile = (index: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const handleAdd = async () => {
        setIsLoading(true); // Start loading
        try {
            await onAdd(name, description, thumbnailUrl, videoUrl, files); // Wait for save process
            setIsLoading(false); // End loading
        } catch (error) {
            console.error("Error adding lesson:", error);
            setIsLoading(false); // End loading on error
        }
    };

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
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Files
                </label>
                <div className="flex flex-wrap gap-2">
                    {files.map((file, index) => (
                        <span
                            key={index}
                            className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm cursor-pointer"
                            onClick={() => removeFile(index)}
                        >
                            {file.name}
                            <span className="ml-2 text-red-500 font-bold cursor-pointer">&times;</span>
                        </span>
                    ))}
                    <label
                        htmlFor="file-upload"
                        className="flex items-center bg-blue-500 text-white rounded-full px-4 py-2 text-sm cursor-pointer hover:bg-blue-600"
                    >
                        + Add File
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    You can upload multiple files. Click on a pill to remove a file.
                </p>
            </div>
            <div className="flex justify-end gap-2">
                <Button onClick={onClose} variant="danger" disabled={isLoading}>
                    Cancel
                </Button>
                <Button onClick={handleAdd} variant="primary" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Add"} {/* Show loading text */}
                </Button>
            </div>
        </Modal>
    );
};

export default AddLessonModal;
