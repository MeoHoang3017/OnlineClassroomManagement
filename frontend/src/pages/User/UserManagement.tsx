// src/pages/User/UserManagement.tsx
import { useEffect, useState } from "react";
import { Button } from "../../components/common/Button";

const userTemplate = [
    { username: "user1", fullname: "John Doe", phone: "1234567890", email: "johndoe@example.com", createdAt: "2025-03-24" },
    { username: "user2", fullname: "Jane Smith", phone: "0987654321", email: "janesmith@example.com", createdAt: "2025-03-22" },
    // Add more users here...
];

const UserManagement = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [users, setUsers] = useState([...userTemplate]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        // API call to fetch users can be added here
    }, []);

    const handleEdit = (username: string) => {
        console.log(`Edit user: ${username}`);
    };

    const handleDelete = (username: string) => {
        console.log(`Delete user: ${username}`);
    };

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>

            {/* Search Bar and Add Button */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <Button variant="primary" onClick={() => console.log("Add User Clicked")}>
                    Add User
                </Button>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="table-auto w-full">
                    <thead className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium">Username</th>
                            <th className="px-6 py-4 text-left text-sm font-medium">Full Name</th>
                            <th className="px-6 py-4 text-left text-sm font-medium">Phone</th>
                            <th className="px-6 py-4 text-left text-sm font-medium">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-medium">Created At</th>
                            <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((user, index) => (
                            <tr
                                key={user.username}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100 transition duration-200`}
                            >
                                <td className="px-6 py-4 text-sm text-gray-800">{user.username}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.fullname}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.phone}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.createdAt}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <Button variant="success" onClick={() => handleEdit(user.username)}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(user.username)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <Button
                        key={page}
                        variant={page === currentPage ? "primary" : "secondary"}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default UserManagement;
