import { api, ApiResponse, PaginatedResponse } from './api';
import type { Order } from '../types';

// Order filters
export interface OrderFilters {
    status?: string;
    payment_status?: string;
    user_id?: string;
    search?: string;
    start_date?: string;
    end_date?: string;
    sort_by?: string;
    sort_dir?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
}

// Order item input
export interface OrderItemInput {
    product_id: string;
    size_id?: string;
    size_name?: string;
    material_id?: string;
    material_name?: string;
    print_side_id?: string;
    print_side_name?: string;
    finishing_ids?: string[];
    finishing_names?: string[];
    custom_width?: number;
    custom_height?: number;
    quantity: number;
    unit_price: number;
    total_price: number;
    uploaded_file_name?: string;
    uploaded_file_url?: string;
}

// Create order request
export interface CreateOrderRequest {
    user_id: string;
    shipping_address_id: string;
    shipping_method: string;
    shipping_provider?: string;
    payment_method: string;
    payment_type?: string;
    subtotal: number;
    shipping_cost: number;
    discount?: number;
    notes?: string;
    items: OrderItemInput[];
}

// Order statistics
export interface OrderStatistics {
    total_orders: number;
    orders_today: number;
    orders_this_month: number;
    pending_orders: number;
    processing_orders: number;
    completed_orders: number;
    total_revenue: number;
    revenue_today: number;
    revenue_this_month: number;
}

// Order Service
export const orderService = {
    // ==================== CUSTOMER ====================

    /**
     * Get user's orders
     */
    async getMyOrders(): Promise<ApiResponse<Order[]>> {
        return api.get<ApiResponse<Order[]>>('/my-orders');
    },

    /**
     * Create new order
     */
    async createOrder(data: CreateOrderRequest): Promise<ApiResponse<Order>> {
        return api.post<ApiResponse<Order>>('/orders', data);
    },

    /**
     * Get order by ID
     */
    async getOrderById(id: string): Promise<ApiResponse<Order>> {
        return api.get<ApiResponse<Order>>(`/orders/${id}`);
    },

    /**
     * Get order by order number
     */
    async getOrderByNumber(orderNumber: string): Promise<ApiResponse<Order>> {
        return api.get<ApiResponse<Order>>(`/orders/number/${orderNumber}`);
    },

    // ==================== ADMIN ====================

    /**
     * Get all orders (Admin)
     */
    async getOrders(filters?: OrderFilters): Promise<PaginatedResponse<Order>> {
        return api.get<PaginatedResponse<Order>>('/admin/orders', {
            ...filters,
            per_page: filters?.per_page || 15,
        } as Record<string, string | number | boolean>);
    },

    /**
     * Update order status (Admin)
     */
    async updateOrderStatus(id: string, status: string, trackingNumber?: string): Promise<ApiResponse<Order>> {
        return api.put<ApiResponse<Order>>(`/admin/orders/${id}/status`, {
            status,
            tracking_number: trackingNumber,
        });
    },

    /**
     * Update payment status (Admin)
     */
    async updatePaymentStatus(id: string, paymentStatus: string): Promise<ApiResponse<Order>> {
        return api.put<ApiResponse<Order>>(`/admin/orders/${id}/payment-status`, {
            payment_status: paymentStatus,
        });
    },

    /**
     * Get order statistics (Admin)
     */
    async getStatistics(): Promise<ApiResponse<OrderStatistics>> {
        return api.get<ApiResponse<OrderStatistics>>('/admin/dashboard/stats');
    },
};

export default orderService;
