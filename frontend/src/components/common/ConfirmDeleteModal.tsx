import React from "react";
import Modal from "./Modal";
import { Divider } from "@mui/material";
interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    message?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    isOpen,
    onClose,
    onDelete,
    message = "Are you sure you want to delete this item?",
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete">
            <div className="space-y-6">
                <p className="text-gray-600">{message}</p>
                <Divider />
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onDelete();
                            onClose();
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;
