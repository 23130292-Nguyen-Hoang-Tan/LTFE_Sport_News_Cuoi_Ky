import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginCredentials, RegisterCredentials, UpdateProfileData } from '../types/auth';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
    register: (credentials: RegisterCredentials) => Promise<{ success: boolean; message?: string }>;
    updateProfile: (data: UpdateProfileData) => { success: boolean; message?: string };
    changePassword: (oldPass: string, newPass: string) => { success: boolean; message?: string };
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'thethao247_registered_users';
const CURRENT_USER_KEY = 'thethao247_currentUser';

// Danh sách tài khoản mặc định để kiểm thử nhanh
const DEFAULT_USERS: Array<User & { password: string }> = [
    {
        id: 'user-001',
        name: 'Đặng Thanh Tân',
        email: 'admin@thethao247.vn',
        password: '123456',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        phone: '0901234567',
        createdAt: '2026-01-01'
    },
    {
        id: 'user-002',
        name: 'Anh7CR7',
        email: 'cr7@thethao247.vn',
        password: '123456',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        phone: '0912345678',
        createdAt: '2026-02-15'
    },
    {
        id: 'user-003',
        name: 'Người Dùng Thể Thao',
        email: 'user@thethao247.vn',
        password: '123456',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        phone: '0987654321',
        createdAt: '2026-03-10'
    }
];

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const savedUser = localStorage.getItem(CURRENT_USER_KEY) || sessionStorage.getItem(CURRENT_USER_KEY);
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    // Khởi tạo danh sách user mẫu vào localStorage nếu chưa có
    useEffect(() => {
        try {
            const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
            if (!existingUsers) {
                localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
            }
        } catch (e) {
            console.error('Không thể truy cập localStorage', e);
        }
    }, []);

    const login = async ({ email, password, remember = true }: LoginCredentials): Promise<{ success: boolean; message?: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 300));

        try {
            const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
            const registeredUsers: Array<User & { password: string }> = rawUsers ? JSON.parse(rawUsers) : DEFAULT_USERS;

            const allUsers = [...DEFAULT_USERS, ...registeredUsers.filter(u => !DEFAULT_USERS.some(d => d.email === u.email))];

            const foundUser = allUsers.find(
                (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
            );

            if (!foundUser) {
                return {
                    success: false,
                    message: 'Email hoặc mật khẩu không chính xác. Vui lòng thử lại!'
                };
            }

            const safeUser: User = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
                avatar: foundUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
                phone: foundUser.phone,
                createdAt: foundUser.createdAt
            };

            setUser(safeUser);

            if (remember) {
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
                sessionStorage.removeItem(CURRENT_USER_KEY);
            } else {
                sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
                localStorage.removeItem(CURRENT_USER_KEY);
            }

            return { success: true };
        } catch {
            return {
                success: false,
                message: 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại!'
            };
        }
    };

    const register = async ({ name, email, password }: RegisterCredentials): Promise<{ success: boolean; message?: string }> => {
        await new Promise((resolve) => setTimeout(resolve, 300));

        try {
            const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
            const registeredUsers: Array<User & { password: string }> = rawUsers ? JSON.parse(rawUsers) : [...DEFAULT_USERS];

            const exists = registeredUsers.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
            if (exists) {
                return {
                    success: false,
                    message: 'Email này đã được sử dụng. Vui lòng chọn email khác!'
                };
            }

            const newUser: User & { password: string } = {
                id: 'user-' + Date.now(),
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password,
                role: 'user',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
                createdAt: new Date().toISOString().split('T')[0]
            };

            registeredUsers.push(newUser);
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(registeredUsers));

            // Tự động đăng nhập sau khi đăng ký thành công
            const safeUser: User = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                avatar: newUser.avatar,
                createdAt: newUser.createdAt
            };

            setUser(safeUser);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

            return { success: true };
        } catch {
            return {
                success: false,
                message: 'Không thể tạo tài khoản. Vui lòng thử lại sau!'
            };
        }
    };

    // Cập nhật thông tin hồ sơ người dùng
    const updateProfile = (data: UpdateProfileData): { success: boolean; message?: string } => {
        if (!user) {
            return { success: false, message: 'Bạn chưa đăng nhập.' };
        }

        try {
            const updatedUser: User = {
                ...user,
                name: data.name?.trim() || user.name,
                phone: data.phone?.trim() ?? user.phone,
                avatar: data.avatar?.trim() || user.avatar
            };

            setUser(updatedUser);

            // Cập nhật vào session/local storage
            if (localStorage.getItem(CURRENT_USER_KEY)) {
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
            }
            if (sessionStorage.getItem(CURRENT_USER_KEY)) {
                sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
            }

            // Đồng bộ vào mảng registered users
            const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
            if (rawUsers) {
                const list: Array<User & { password: string }> = JSON.parse(rawUsers);
                const index = list.findIndex(u => u.id === user.id || u.email === user.email);
                if (index !== -1) {
                    list[index] = { ...list[index], ...updatedUser };
                    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(list));
                }
            }

            return { success: true, message: 'Cập nhật thông tin thành công!' };
        } catch {
            return { success: false, message: 'Không thể cập nhật thông tin.' };
        }
    };

    // Đổi mật khẩu tài khoản
    const changePassword = (oldPass: string, newPass: string): { success: boolean; message?: string } => {
        if (!user) {
            return { success: false, message: 'Bạn chưa đăng nhập.' };
        }

        try {
            const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
            const list: Array<User & { password: string }> = rawUsers ? JSON.parse(rawUsers) : DEFAULT_USERS;

            const targetUser = list.find(u => u.email.toLowerCase() === user.email.toLowerCase());
            if (!targetUser || targetUser.password !== oldPass) {
                return { success: false, message: 'Mật khẩu hiện tại không đúng.' };
            }

            targetUser.password = newPass;
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(list));

            return { success: true, message: 'Đổi mật khẩu thành công!' };
        } catch {
            return { success: false, message: 'Lỗi khi đổi mật khẩu.' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(CURRENT_USER_KEY);
        sessionStorage.removeItem(CURRENT_USER_KEY);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                register,
                updateProfile,
                changePassword,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
