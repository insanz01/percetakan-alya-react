import { api, ApiResponse, PaginatedResponse } from './api';
import type { User } from '../types';

// Customer filters
export interface CustomerFilters {
    role?: string;
    active?: boolean;
    search?: string;
    sort_by?: string;
    sort_dir?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
}

// Customer statistics
export interface CustomerStatistics {
    total_customers: number;
    active_customers: number;
    new_customers_this_month: number;
}

// Customer Service (Admin)
export const customerService = {
    /**
     * Get all customers
     */
    async getCustomers(filters?: CustomerFilters): Promise<PaginatedResponse<User>> {
        return api.get<PaginatedResponse<User>>('/admin/customers', {
            ...filters,
            per_page: filters?.per_page || 15,
        } as Record<string, string | number | boolean>);
    },

    /**
     * Get customer by ID
     */
    async getCustomerById(id: string): Promise<ApiResponse<User>> {
        return api.get<ApiResponse<User>>(`/admin/customers/${id}`);
    },

    /**
     * Update customer
     */
    async updateCustomer(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
        return api.put<ApiResponse<User>>(`/admin/customers/${id}`, data);
    },

    /**
     * Delete customer
     */
    async deleteCustomer(id: string): Promise<ApiResponse<null>> {
        return api.delete<ApiResponse<null>>(`/admin/customers/${id}`);
    },

    /**
     * Get customer statistics
     */
    async getStatistics(): Promise<ApiResponse<CustomerStatistics>> {
        return api.get<ApiResponse<CustomerStatistics>>('/admin/dashboard/customers');
    },
};

export default customerService;
