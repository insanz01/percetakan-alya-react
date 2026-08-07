import { api, ApiResponse, setToken, removeToken } from './api';
import type { User, ShippingAddress } from '../types';

// Auth Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    nama: string;
    email: string;
    password: string;
    password_confirmation: string;
    telepon?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface ProfileUpdateRequest {
    nama?: string;
    telepon?: string;
    foto_profil?: string;
}

export interface PasswordChangeRequest {
    current_password: string;
    password: string;
    password_confirmation: string;
}

export interface ResetPasswordRequest {
    email: string;
    password: string;
    password_confirmation: string;
}

// Auth Service
export const authService = {
    /**
     * Register new user
     */
    async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
        const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
        if (response.success && response.data.token) {
            setToken(response.data.token);
        }
        return response;
    },

    /**
     * Login user
     */
    async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
        if (response.success && response.data.token) {
            setToken(response.data.token);
        }
        return response;
    },

    /**
     * Admin login
     */
    async adminLogin(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        const response = await api.post<ApiResponse<AuthResponse>>('/auth/admin/login', data);
        if (response.success && response.data.token) {
            setToken(response.data.token);
        }
        return response;
    },

    /**
     * Get current user profile
     */
    async getProfile(): Promise<ApiResponse<User>> {
        return api.get<ApiResponse<User>>('/auth/me');
    },

    /**
     * Update profile
     */
    async updateProfile(data: ProfileUpdateRequest): Promise<ApiResponse<User>> {
        return api.put<ApiResponse<User>>('/auth/profile', data);
    },

    /**
     * Change password
     */
    async changePassword(data: PasswordChangeRequest): Promise<ApiResponse<null>> {
        return api.put<ApiResponse<null>>('/auth/password', data);
    },

    /**
     * Reset password (email + new password, no email verification)
     */
    async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<null>> {
        return api.post<ApiResponse<null>>('/auth/reset-password', data);
    },

    /**
     * Logout
     */
    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } finally {
            removeToken();
        }
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem('auth_token');
    },

    /**
     * Check if the logged-in admin is a Super Admin.
     * Reads the `adminUser` set at admin login. Accepts either the API role
     * (`peran: 'super_admin'`) or the display role string ('Super Admin').
     */
    isSuperAdmin(): boolean {
        try {
            const u = JSON.parse(localStorage.getItem('adminUser') || '{}');
            return u.peran === 'super_admin' || u.role === 'Super Admin';
        } catch {
            return false;
        }
    },

    /**
     * Whether an admin session is active (set by /admin/login or by an
     * admin logging in through the normal login form).
     */
    isAdminLoggedIn(): boolean {
        return localStorage.getItem('adminLoggedIn') === 'true';
    },

    /**
     * Clear the admin session (used on admin logout).
     */
    adminLogout(): void {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUser');
        removeToken();
    },
};

// Shipping Address Service
export const addressService = {
    /**
     * Get user's addresses
     */
    async getAddresses(): Promise<ApiResponse<ShippingAddress[]>> {
        return api.get<ApiResponse<ShippingAddress[]>>('/addresses');
    },

    /**
     * Create new address
     */
    async createAddress(data: Omit<ShippingAddress, 'id'>): Promise<ApiResponse<ShippingAddress>> {
        return api.post<ApiResponse<ShippingAddress>>('/addresses', data);
    },

    /**
     * Update address
     */
    async updateAddress(id: string, data: Partial<ShippingAddress>): Promise<ApiResponse<ShippingAddress>> {
        return api.put<ApiResponse<ShippingAddress>>(`/addresses/${id}`, data);
    },

    /**
     * Delete address
     */
    async deleteAddress(id: string): Promise<ApiResponse<null>> {
        return api.delete<ApiResponse<null>>(`/addresses/${id}`);
    },
};

export default authService;
