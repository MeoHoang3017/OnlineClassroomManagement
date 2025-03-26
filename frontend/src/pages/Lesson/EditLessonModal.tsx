import { useState, useEffect } from "react";
import { Button } from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { Lesson } from "../../types/LessonTypes";
import useFile from "../../hooks/useFile";
import { Documents } from "../../types/FileTypes";
interface EditLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (
        id: string,
        name: string,
        description: string,
        videoUrl: string,
        thumbnailUrl: string,
        documents: string[]
    ) => void;
    lesson: Lesson | null;
}

const EditLessonModal = ({ isOpen, onClose, onSave, lesson }: EditLessonModalProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [existingDocuments, setExistingDocuments] = useState<Documents[]>(lesson?.documents || []);
    const { uploadFiles } = useFile();

    // Populate state with lesson data when modal opens
    useEffect(() => {
        if (lesson) {
            setName(lesson.name);
            setDescription(lesson.description);
            setThumbnailUrl(lesson.thumbnailUrl);
            setVideoUrl(lesson.videoUrl);
            setExistingDocuments(lesson.documents || []);
        }
    }, [lesson]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Uploading files...");
        if (event.target.files) {
            const uploadedFiles = Array.from(event.target.files);
            setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]); // Use functional state update
        }
    };

    const removeFile = (index: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const removeExistingDocument = (index: number) => {
        const updatedDocuments = [...existingDocuments];
        updatedDocuments.splice(index, 1);
        setExistingDocuments(updatedDocuments);
    };

    const handleSave = async () => {
        if (lesson) {
            const existingDocumentIds = existingDocuments.map((doc) => doc._id);
            console.log(existingDocumentIds);
            if (files.length === 0) {
                onSave(lesson._id, name, description, videoUrl, thumbnailUrl, existingDocumentIds);
                onClose();
                return;
            }
            const uploadedFilesResponse = await uploadFiles(lesson._id, files);
            const uploadedFileIds = uploadedFilesResponse.files.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (file: any) => file._id // Assuming uploadFiles returns file objects with `_id`
            );

            const updatedDocuments = [...existingDocumentIds, ...uploadedFileIds];
            onSave(lesson._id, name, description, videoUrl, thumbnailUrl, updatedDocuments);
            onClose();
        }
    };

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

            {/* Existing documents */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Existing Documents</label>
                <div className="flex flex-wrap gap-2">
                    {existingDocuments.map((doc, index) => (
                        <span
                            key={index}
                            className="flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm cursor-pointer"
                            onClick={() => removeExistingDocument(index)}
                        >
                            {doc.filename}
                            <span className="ml-2 text-red-500 font-bold cursor-pointer">&times;</span>
                        </span>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Files</label>
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
                        htmlFor="file-upload-edit"
                        className="flex items-center bg-blue-500 text-white rounded-full px-4 py-2 text-sm cursor-pointer hover:bg-blue-600"
                    >
                        + Add File
                        <input
                            id="file-upload-edit"
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
                <Button onClick={onClose} variant="danger">
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="primary">
                    Save
                </Button>
            </div>
        </Modal>
    );
};

export default EditLessonModal;
