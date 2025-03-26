export interface User {
    _id: string;
    username: string;
    fullname: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUser {
    username: string;
    fullname: string;
    email: string;
    phone: string;
    password: string;
    role: string;
}