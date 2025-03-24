import { useState, useEffect } from 'react';
import { Button } from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { Classroom } from '../../types/ClassroomTypes';

interface EditClassroomModalProps {
    isOpen: boolean;
    onClose: () => void;
    classroom: Classroom;
    onSave: (updatedClassroom: Classroom) => void;
}

const EditClassroomModal: React.FC<EditClassroomModalProps> = ({ isOpen, onClose, classroom, onSave }) => {
    const [name, setName] = useState<string>(classroom.name);
    const [description, setDescription] = useState(classroom.description);
    const [code, setCode] = useState(classroom.classCode);

    useEffect(() => {
        setName(classroom.name);
        setDescription(classroom.description);
        setCode(classroom.classCode);
    }, [classroom]);

    const handleSave = () => {
        onSave({ ...classroom, name, description });
        onClose();
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Classroom">
            <input
                type="text"
                className="border p-2 w-full rounded-md mb-2"
                placeholder="Enter classroom code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled
            />
            <input
                type="text"
                className="border p-2 w-full rounded-md mb-2"
                placeholder="Enter classroom name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                className="border p-2 w-full rounded-md mb-2"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end gap-2">
                <Button onClick={onClose} variant="danger">Cancel</Button>
                <Button
                    variant="primary"
                    onClick={() => handleSave()}
                >
                    Save
                </Button>
            </div>
        </Modal>
    );
};

export default EditClassroomModal;