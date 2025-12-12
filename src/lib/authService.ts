import { api, ApiResponse, setToken, removeToken } from './api';
import type { User, ShippingAddress } from '../types';

// Auth Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface ProfileUpdateRequest {
    name?: string;
    phone?: string;
    avatar?: string;
}

export interface PasswordChangeRequest {
    current_password: string;
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
