import { api, ApiResponse, PaginatedResponse } from './api';

// Promo type
export interface Promo {
    id: string;
    code: string;
    description?: string;
    type: 'percentage' | 'fixed';
    discount: number;
    min_purchase: number;
    max_discount?: number;
    usage_limit?: number;
    usage_count: number;
    start_date?: string;
    end_date?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// Promo filters
export interface PromoFilters {
    active?: boolean;
    valid_only?: boolean;
    search?: string;
    sort_by?: string;
    sort_dir?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
}

// Promo validation result
export interface PromoValidationResult {
    promo: Promo;
    discount: number;
    final_amount: number;
}

// Create/Update promo
export interface PromoInput {
    code: string;
    description?: string;
    type: 'percentage' | 'fixed';
    discount: number;
    min_purchase?: number;
    max_discount?: number;
    usage_limit?: number;
    start_date?: string;
    end_date?: string;
    is_active?: boolean;
}

// Promo Service
export const promoService = {
    // ==================== PUBLIC ====================

    /**
     * Validate promo code
     */
    async validateCode(code: string, amount: number): Promise<ApiResponse<PromoValidationResult>> {
        return api.post<ApiResponse<PromoValidationResult>>('/promos/validate', {
            code,
            amount,
        });
    },

    // ==================== ADMIN ====================

    /**
     * Get all promos
     */
    async getPromos(filters?: PromoFilters): Promise<ApiResponse<Promo[]>> {
        return api.get<ApiResponse<Promo[]>>('/admin/promos', filters as Record<string, string | number | boolean>);
    },

    /**
     * Get paginated promos
     */
    async getPromosPaginated(filters?: PromoFilters): Promise<PaginatedResponse<Promo>> {
        return api.get<PaginatedResponse<Promo>>('/admin/promos', {
            ...filters,
            per_page: filters?.per_page || 15,
        } as Record<string, string | number | boolean>);
    },

    /**
     * Get promo by ID
     */
    async getPromoById(id: string): Promise<ApiResponse<Promo>> {
        return api.get<ApiResponse<Promo>>(`/admin/promos/${id}`);
    },

    /**
     * Create promo
     */
    async createPromo(data: PromoInput): Promise<ApiResponse<Promo>> {
        return api.post<ApiResponse<Promo>>('/admin/promos', data);
    },

    /**
     * Update promo
     */
    async updatePromo(id: string, data: Partial<PromoInput>): Promise<ApiResponse<Promo>> {
        return api.put<ApiResponse<Promo>>(`/admin/promos/${id}`, data);
    },

    /**
     * Delete promo
     */
    async deletePromo(id: string): Promise<ApiResponse<null>> {
        return api.delete<ApiResponse<null>>(`/admin/promos/${id}`);
    },

    /**
     * Increment promo usage
     */
    async incrementUsage(id: string): Promise<ApiResponse<Promo>> {
        return api.post<ApiResponse<Promo>>(`/admin/promos/${id}/increment-usage`);
    },
};

export default promoService;
