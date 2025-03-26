import { useState } from "react";
import userAPI from "../api/userAPI";
import { User, CreateUser } from "../types/UserTypes";

const useUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userAPI.fetchUsers();
            setUsers(data);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchUserById = async (id: string) => {
        try {
            return await userAPI.fetchUserById(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const createUser = async (user: CreateUser) => {
        try {
            const data = await userAPI.createUser(user);
            setUsers([...users, data]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const updateUser = async (id: string, user: CreateUser) => {
        try {
            const data = await userAPI.updateUser(id, user);
            setUsers(users.map((u) => (u._id === id ? data : u)));
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const deleteUser = async (id: string) => {
        try {
            await userAPI.deleteUser(id);
            setUsers(users.filter((u) => u._id !== id));
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const getCurrentUser = async () => {
        try {
            return await userAPI.getCurrentUser();
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return { users, loading, fetchUsers, fetchUserById, createUser, updateUser, deleteUser, getCurrentUser };
};

export default useUser;