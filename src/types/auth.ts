export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    avatar?: string;
    phone?: string;
    createdAt?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface UpdateProfileData {
    name?: string;
    phone?: string;
    avatar?: string;
}
