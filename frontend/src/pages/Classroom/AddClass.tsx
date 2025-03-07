import { useState } from 'react';
import { Button } from '../../components/common/Button';
import Modal from '../../components/common/Modal';
// AddClassroomModal Component
const AddClassroomModal = ({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (name: string, description: string, code: string) => void }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Classroom">
            <input
                type="text"
                className="border p-2 w-full rounded-md mb-2"
                placeholder="Enter classroom code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
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
                    onClick={() => {
                        if (!name.trim() || !description.trim() || !code) return;
                        onAdd(name, description, code);
                        setName("");
                        setDescription("");
                        onClose();
                    }}
                >
                    Add
                </Button>
            </div>
        </Modal>
    );
};
export default AddClassroomModal;