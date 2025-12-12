import { api, ApiResponse, PaginatedResponse } from './api';
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
        return api.get<ApiResponse<ProductCategory[]>>('/categories', filters as Record<string, string | number | boolean>);
    },

    /**
     * Get paginated categories
     */
    async getCategoriesPaginated(filters?: CategoryFilters): Promise<PaginatedResponse<ProductCategory>> {
        return api.get<PaginatedResponse<ProductCategory>>('/categories', {
            ...filters,
            per_page: filters?.per_page || 15,
        } as Record<string, string | number | boolean>);
    },

    /**
     * Get category by ID
     */
    async getCategoryById(id: string): Promise<ApiResponse<ProductCategory>> {
        return api.get<ApiResponse<ProductCategory>>(`/categories/${id}`);
    },

    /**
     * Get category by slug
     */
    async getCategoryBySlug(slug: string): Promise<ApiResponse<ProductCategory>> {
        return api.get<ApiResponse<ProductCategory>>(`/categories/slug/${slug}`);
    },

    // ==================== ADMIN ====================

    /**
     * Create category (Admin)
     */
    async createCategory(data: Omit<ProductCategory, 'id' | 'productCount'>): Promise<ApiResponse<ProductCategory>> {
        return api.post<ApiResponse<ProductCategory>>('/admin/categories', data);
    },

    /**
     * Update category (Admin)
     */
    async updateCategory(id: string, data: Partial<ProductCategory>): Promise<ApiResponse<ProductCategory>> {
        return api.put<ApiResponse<ProductCategory>>(`/admin/categories/${id}`, data);
    },

    /**
     * Delete category (Admin)
     */
    async deleteCategory(id: string): Promise<ApiResponse<null>> {
        return api.delete<ApiResponse<null>>(`/admin/categories/${id}`);
    },
};

export default categoryService;
