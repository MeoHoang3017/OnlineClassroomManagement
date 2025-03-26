import authorApi from "./baseAPI/authorAPI";
import { CreateUser } from "../types/UserTypes";

const userAPI = {
    fetchUsers: () => authorApi.get('/users/all').then(response => response.data),
    fetchUserById: (id: string) => authorApi.get(`/users/by/${id}`).then(response => response.data),
    updateUser: (id: string, user: CreateUser) => authorApi.put(`/users/update/${id}`, user).then(response => response.data),
    deleteUser: (id: string) => authorApi.delete(`/users/delete/${id}`).then(response => response.data),
    createUser: (user: CreateUser) => authorApi.post('/users/create', user).then(response => response.data),
    getCurrentUser: () => authorApi.get('/users/info').then(response => response.data),
};

export default userAPI;