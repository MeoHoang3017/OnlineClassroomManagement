import React, { useState, useEffect } from "react";
import { CreateUser } from "../../types/UserTypes";

interface EditUserModalProps {
    isOpen: boolean;
    user: CreateUser;
    onClose: () => void;
    onSave: (updatedUser: CreateUser) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, user, onClose, onSave }) => {
    const [username, setUsername] = useState(user.username);
    const [fullname, setFullname] = useState(user.fullname);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [password, setPassword] = useState(user.password);
    const [role, setRole] = useState(user.role);

    const handleSubmit = () => {
        if (username && fullname && email && phone && password && role) {
            onSave({ username, fullname, email, phone, password, role });
        }
    };

    useEffect(() => {
        setUsername(user.username);
        setFullname(user.fullname);
        setEmail(user.email);
        setPhone(user.phone);
        setPassword(user.password);
        setRole(user.role);
    }, [user]);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full mb-2 border border-gray-300 rounded px-3 py-2"
                />
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="block w-full mb-2 border border-gray-300 rounded px-3 py-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full mb-2 border border-gray-300 rounded px-3 py-2"
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full mb-2 border border-gray-300 rounded px-3 py-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full mb-2 border border-gray-300 rounded px-3 py-2"
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full mb-4 border border-gray-300 rounded px-3 py-2"
                >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                </select>
                <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 rounded text-white bg-red-500" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 rounded text-white bg-blue-500" onClick={handleSubmit}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
