import { api, ApiResponse, PaginatedResponse } from './api';
import { transformCategory, transformCategories } from './utils';
import type { ProductCategory } from '../types';

// Category filters
export interface CategoryFilters {
    active?: boolean;
    search?: string;
    sort_by?: string;
    sort_dir?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
}

// Category Service
export const categoryService = {
    /**
     * Get all categories
     */
    async getCategories(filters?: CategoryFilters): Promise<ApiResponse<ProductCategory[]>> {
        const response = await api.get<ApiResponse<any[]>>('/categories', filters as Record<string, string | number | boolean>);
        return {
            ...response,
            data: transformCategories(response.data || []),
        };
    },

    /**
     * Get paginated categories
     */
    async getCategoriesPaginated(filters?: CategoryFilters): Promise<PaginatedResponse<ProductCategory>> {
        const response = await api.get<PaginatedResponse<any>>('/categories', {
            ...filters,
            per_page: filters?.per_page || 15,
        } as Record<string, string | number | boolean>);
        return {
            ...response,
            data: transformCategories(response.data || []),
        };
    },

    /**
     * Get category by ID
     */
    async getCategoryById(id: string): Promise<ApiResponse<ProductCategory>> {
        const response = await api.get<ApiResponse<any>>(`/categories/${id}`);
        return {
            ...response,
            data: transformCategory(response.data),
        };
    },

    /**
     * Get category by slug
     */
    async getCategoryBySlug(slug: string): Promise<ApiResponse<ProductCategory>> {
        const response = await api.get<ApiResponse<any>>(`/categories/slug/${slug}`);
        return {
            ...response,
            data: transformCategory(response.data),
        };
    },

    // ==================== ADMIN ====================

    /**
     * Create category (Admin)
     */
    async createCategory(data: Omit<ProductCategory, 'id' | 'productCount'>): Promise<ApiResponse<ProductCategory>> {
        const response = await api.post<ApiResponse<any>>('/admin/categories', data);
        return {
            ...response,
            data: transformCategory(response.data),
        };
    },

    /**
     * Update category (Admin)
     */
    async updateCategory(id: string, data: Partial<ProductCategory>): Promise<ApiResponse<ProductCategory>> {
        const response = await api.put<ApiResponse<any>>(`/admin/categories/${id}`, data);
        return {
            ...response,
            data: transformCategory(response.data),
        };
    },

    /**
     * Delete category (Admin)
     */
    async deleteCategory(id: string): Promise<ApiResponse<null>> {
        return api.delete<ApiResponse<null>>(`/admin/categories/${id}`);
    },
};

export default categoryService;
