import { useEffect, useState } from "react";
import { Button } from "../../components/common/Button";
import useUser from "../../hooks/useUser"; // Import the useUser hook
import { CreateUser } from "../../types/UserTypes"; // Import the CreateUser interface
import AddUserModal from "./AddUserModal"; // Component for adding a user
import EditUserModal from "./EditUserModal"; // Component for editing a user
import useNotification from "../../hooks/useNotification";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";

const UserManagement = () => {
    const { users, fetchUsers, createUser, updateUser, deleteUser } = useUser(); // Use full hook capabilities
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [showSuccessMessage, showErrorMessage] = useNotification();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<CreateUser | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers(); // Fetch users on component mount
    }, []);

    useEffect(() => {
        // Filter users based on search term
        if (searchTerm) {
            const filtered = users.filter(
                (user) =>
                    (user?.username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (user?.fullname || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (user?.email || "").toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [users, searchTerm]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleAddUser = async (newUser: CreateUser) => {
        try {
            await createUser(newUser); // Call createUser from useUser
            setIsAddModalOpen(false); // Close modal after adding
            showSuccessMessage('User added successfully!');
        } catch (error) {
            console.error("Failed to add user:", error);
            showErrorMessage('Failed to add user. Please try again.');
        }
    };

    const handleEditUser = async (id: string, updatedUser: CreateUser) => {
        try {
            await updateUser(id, updatedUser); // Call updateUser from useUser
            setIsEditModalOpen(false); // Close modal after editing
            showSuccessMessage('User updated successfully!');
        } catch (error) {
            console.error("Failed to update user:", error);
            showErrorMessage('Failed to update user. Please try again.');
        }
    };

    const handleDeleteUser = async (id: string) => {
        try {
            await deleteUser(id); // Call deleteUser from useUser
            showSuccessMessage('User deleted successfully!');
        } catch (error) {
            console.error(`Failed to delete user with ID: ${id}`);
            showErrorMessage('Failed to delete user. Please try again.');
        }
    };

    const openEditModal = (user: CreateUser) => {
        setEditUser(user);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (id: string) => {
        setUserToDelete(id);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>

            {/* Search Bar and Add Button */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
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
                                key={user._id}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100 transition duration-200`}
                            >
                                <td className="px-6 py-4 text-sm text-gray-800">{user.username}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.fullname}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.phone}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{user.createdAt}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <Button
                                        variant="success"
                                        onClick={() => openEditModal(user)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => openDeleteModal(user._id)}
                                    >
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

            {/* Add User Modal */}
            <AddUserModal
                isOpen={isAddModalOpen}
                onAdd={handleAddUser}
                onClose={() => setIsAddModalOpen(false)}
            />

            {/* Edit User Modal */}
            {editUser && (
                <EditUserModal
                    isOpen={isEditModalOpen}
                    onSave={(updatedUser) => handleEditUser(editUser._id!, updatedUser)}
                    onClose={() => setIsEditModalOpen(false)}
                    user={editUser}
                />
            )}

            {/* Confirm Delete Modal */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => handleDeleteUser(userToDelete!)}
                message="Are you sure you want to delete this user?"
            />
        </div>
    );
};

export default UserManagement;