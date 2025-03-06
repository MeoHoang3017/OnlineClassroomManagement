import React from "react";

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
            <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-lg w-full border-black border">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500">&times;</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
