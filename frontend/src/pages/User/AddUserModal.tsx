import React, { useState } from "react";

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (newUser: { username: string; fullname: string; email: string; phone: string; password: string; role: string }) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = () => {
        if (username && fullname && email && phone && password && role) {
            onAdd({ username, fullname, email, phone, password, role });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Add User</h2>
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
                        Add User
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
