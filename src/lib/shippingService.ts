import { api, ApiResponse } from './api';

// Shipping method
export interface ShippingMethod {
    id: string;
    provider: string;
    provider_code: string;
    service: string;
    service_code: string;
    estimated_days: string;
}

// Shipping option with cost
export interface ShippingOption extends ShippingMethod {
    cost: number;
    weight_kg: number;
    zone: string;
}

// Calculate response
export interface ShippingCalculateResponse {
    shipping_options: ShippingOption[];
    weight_grams: number;
    weight_kg: number;
    destination: {
        city: string;
        province: string;
        zone: string;
    };
}

// Calculate request
export interface ShippingCalculateRequest {
    origin_city?: string;
    destination_city: string;
    destination_province: string;
    weight: number; // in grams
    provider?: string;
}

// Shipping Service
export const shippingService = {
    /**
     * Get available shipping methods
     */
    async getMethods(): Promise<ApiResponse<ShippingMethod[]>> {
        return api.get<ApiResponse<ShippingMethod[]>>('/shipping/methods');
    },

    /**
     * Calculate shipping cost
     */
    async calculate(data: ShippingCalculateRequest): Promise<ApiResponse<ShippingCalculateResponse>> {
        return api.post<ApiResponse<ShippingCalculateResponse>>('/shipping/calculate', data);
    },

    /**
     * Get provinces list
     */
    async getProvinces(): Promise<ApiResponse<string[]>> {
        return api.get<ApiResponse<string[]>>('/shipping/provinces');
    },
};

export default shippingService;
