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
    id: number;
    username: string;
    email: string;
    role: string;
}

export type { LoginRequest, RegisterRequest, User };