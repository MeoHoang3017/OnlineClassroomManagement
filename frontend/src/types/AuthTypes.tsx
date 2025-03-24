interface LoginRequest {
    username: string;
    password: string;
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

interface User {
    _id: string;
    id: string;
    username: string;
    email: string;
    role: string;
}

export type { LoginRequest, RegisterRequest, User };