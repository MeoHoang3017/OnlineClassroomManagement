import React from "react";
import { Divider } from "@mui/material";
// Modal Component
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    mode?: "dark" | "light";
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-lg w-full">
                <div className="flex justify-between items-center ">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500">&times;</button>
                </div>
                <Divider sx={{ marginBottom: 2, marginTop: 1 }} />
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
