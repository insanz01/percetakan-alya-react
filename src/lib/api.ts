// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Token management
const getToken = (): string | null => {
    return localStorage.getItem('auth_token');
};

const setToken = (token: string): void => {
    localStorage.setItem('auth_token', token);
};

const removeToken = (): void => {
    localStorage.removeItem('auth_token');
};

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

// HTTP Client
class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const token = getToken();

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers,
        };

        if (token) {
            (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ApiError(data.message || 'An error occurred', response.status, data.errors);
        }

        return data;
    }

    async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
        let url = endpoint;
        if (params) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    searchParams.append(key, String(value));
                }
            });
            const queryString = searchParams.toString();
            if (queryString) {
                url += `?${queryString}`;
            }
        }
        return this.request<T>(url, { method: 'GET' });
    }

    async post<T>(endpoint: string, body?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async put<T>(endpoint: string, body?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

// Custom Error class
export class ApiError extends Error {
    status: number;
    errors?: Record<string, string[]>;

    constructor(message: string, status: number, errors?: Record<string, string[]>) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.errors = errors;
    }
}

// Create API client instance
const api = new ApiClient(API_BASE_URL);

// Export utilities
export { api, getToken, setToken, removeToken, API_BASE_URL };
