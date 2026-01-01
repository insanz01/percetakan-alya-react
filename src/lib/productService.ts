import { api, ApiResponse, PaginatedResponse } from './api';
import { transformProduct, transformProducts } from './utils';
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
        const response = await api.get<ApiResponse<any[]>>('/products', filters as Record<string, string | number | boolean>);
        return {
            ...response,
            data: transformProducts(response.data || []),
        };
    },

    /**
     * Get paginated products
     */
    async getProductsPaginated(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
        const response = await api.get<PaginatedResponse<any>>('/products', {
            ...filters,
            per_page: filters?.per_page || 15,
        } as Record<string, string | number | boolean>);
        return {
            ...response,
            data: transformProducts(response.data || []),
        };
    },

    /**
     * Get product by ID
     */
    async getProductById(id: string): Promise<ApiResponse<Product>> {
        const response = await api.get<ApiResponse<any>>(`/products/${id}`);
        return {
            ...response,
            data: transformProduct(response.data),
        };
    },

    /**
     * Get product by slug
     */
    async getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
        const response = await api.get<ApiResponse<any>>(`/products/slug/${slug}`);
        return {
            ...response,
            data: transformProduct(response.data),
        };
    },

    /**
     * Get products by category slug
     */
    async getProductsByCategory(categorySlug: string): Promise<ApiResponse<Product[]>> {
        const response = await api.get<ApiResponse<any[]>>(`/products/category/${categorySlug}`);
        return {
            ...response,
            data: transformProducts(response.data || []),
        };
    },

    /**
     * Search products
     */
    async searchProducts(query: string): Promise<ApiResponse<SearchResult>> {
        const response = await api.get<ApiResponse<any>>('/products/search', { q: query });
        return {
            ...response,
            data: {
                products: transformProducts(response.data?.products || []),
                total: response.data?.total || 0,
            },
        };
    },

    /**
     * Get best seller products
     */
    async getBestSellers(limit: number = 8): Promise<ApiResponse<Product[]>> {
        const response = await api.get<ApiResponse<any[]>>('/products', {
            best_seller: true,
            active: true,
            per_page: limit,
        });
        return {
            ...response,
            data: transformProducts(response.data || []),
        };
    },

    /**
     * Get promo products
     */
    async getPromoProducts(limit: number = 8): Promise<ApiResponse<Product[]>> {
        const response = await api.get<ApiResponse<any[]>>('/products', {
            promo: true,
            active: true,
            per_page: limit,
        });
        return {
            ...response,
            data: transformProducts(response.data || []),
        };
    },

    /**
     * Get new products
     */
    async getNewProducts(limit: number = 8): Promise<ApiResponse<Product[]>> {
        const response = await api.get<ApiResponse<any[]>>('/products', {
            active: true,
            sort_by: 'created_at',
            sort_dir: 'desc',
            per_page: limit,
        });
        return {
            ...response,
            data: transformProducts(response.data || []),
        };
    },

    // ==================== ADMIN ====================

    /**
     * Create product (Admin)
     */
    async createProduct(data: Omit<Product, 'id'>): Promise<ApiResponse<Product>> {
        const response = await api.post<ApiResponse<any>>('/admin/products', data);
        return {
            ...response,
            data: transformProduct(response.data),
        };
    },

    /**
     * Update product (Admin)
     */
    async updateProduct(id: string, data: Partial<Product>): Promise<ApiResponse<Product>> {
        const response = await api.put<ApiResponse<any>>(`/admin/products/${id}`, data);
        return {
            ...response,
            data: transformProduct(response.data),
        };
    },

    /**
     * Delete product (Admin)
     */
    async deleteProduct(id: string): Promise<ApiResponse<null>> {
        return api.delete<ApiResponse<null>>(`/admin/products/${id}`);
    },

    /**
     * Get popular products with sales statistics (Admin Dashboard)
     */
    async getPopularProducts(limit: number = 5): Promise<ApiResponse<PopularProduct[]>> {
        return api.get<ApiResponse<PopularProduct[]>>('/admin/dashboard/popular-products', { limit });
    },
};

// Popular product type for dashboard
export interface PopularProduct {
    id: string;
    name: string;
    slug: string;
    image: string | null;
    base_price: number;
    category: string | null;
    sales_count: number;
    total_sold: number;
}

export default productService;
