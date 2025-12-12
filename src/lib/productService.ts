import { api, ApiResponse, PaginatedResponse } from './api';
import type { Product } from '../types';

// Product filters
export interface ProductFilters {
    category_id?: string;
    active?: boolean;
    best_seller?: boolean;
    promo?: boolean;
    retail?: boolean;
    search?: string;
    sort_by?: string;
    sort_dir?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
}

// Search result
export interface SearchResult {
    products: Product[];
    total: number;
}

// Product Service
export const productService = {
    /**
     * Get all products
     */
    async getProducts(filters?: ProductFilters): Promise<ApiResponse<Product[]>> {
        return api.get<ApiResponse<Product[]>>('/products', filters as Record<string, string | number | boolean>);
    },

    /**
     * Get paginated products
     */
    async getProductsPaginated(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
        return api.get<PaginatedResponse<Product>>('/products', {
            ...filters,
            per_page: filters?.per_page || 15,
        } as Record<string, string | number | boolean>);
    },

    /**
     * Get product by ID
     */
    async getProductById(id: string): Promise<ApiResponse<Product>> {
        return api.get<ApiResponse<Product>>(`/products/${id}`);
    },

    /**
     * Get product by slug
     */
    async getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
        return api.get<ApiResponse<Product>>(`/products/slug/${slug}`);
    },

    /**
     * Get products by category slug
     */
    async getProductsByCategory(categorySlug: string): Promise<ApiResponse<Product[]>> {
        return api.get<ApiResponse<Product[]>>(`/products/category/${categorySlug}`);
    },

    /**
     * Search products
     */
    async searchProducts(query: string): Promise<ApiResponse<SearchResult>> {
        return api.get<ApiResponse<SearchResult>>('/products/search', { q: query });
    },

    /**
     * Get best seller products
     */
    async getBestSellers(limit: number = 8): Promise<ApiResponse<Product[]>> {
        return api.get<ApiResponse<Product[]>>('/products', {
            best_seller: true,
            active: true,
            per_page: limit,
        });
    },

    /**
     * Get promo products
     */
    async getPromoProducts(limit: number = 8): Promise<ApiResponse<Product[]>> {
        return api.get<ApiResponse<Product[]>>('/products', {
            promo: true,
            active: true,
            per_page: limit,
        });
    },

    /**
     * Get new products
     */
    async getNewProducts(limit: number = 8): Promise<ApiResponse<Product[]>> {
        return api.get<ApiResponse<Product[]>>('/products', {
            active: true,
            sort_by: 'created_at',
            sort_dir: 'desc',
            per_page: limit,
        });
    },

    // ==================== ADMIN ====================

    /**
     * Create product (Admin)
     */
    async createProduct(data: Omit<Product, 'id'>): Promise<ApiResponse<Product>> {
        return api.post<ApiResponse<Product>>('/admin/products', data);
    },

    /**
     * Update product (Admin)
     */
    async updateProduct(id: string, data: Partial<Product>): Promise<ApiResponse<Product>> {
        return api.put<ApiResponse<Product>>(`/admin/products/${id}`, data);
    },

    /**
     * Delete product (Admin)
     */
    async deleteProduct(id: string): Promise<ApiResponse<null>> {
        return api.delete<ApiResponse<null>>(`/admin/products/${id}`);
    },
};

export default productService;
