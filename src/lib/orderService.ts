import { api, ApiResponse, PaginatedResponse } from './api';
import type { Order } from '../types';

// Order filters
export interface OrderFilters {
    status?: string;
    status_bayar?: string;
    pengguna_id?: string;
    search?: string;
    tanggal_mulai?: string;
    tanggal_berakhir?: string;
    sort_by?: string;
    sort_dir?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
}

// Order item input
export interface OrderItemInput {
    produk_id: string;
    ukuran_id?: string;
    nama_ukuran?: string;
    bahan_id?: string;
    nama_bahan?: string;
    sisi_cetak_id?: string;
    nama_sisi_cetak?: string;
    finishing_ids?: string[];
    nama_finishing?: string[];
    lebar_kustom?: number;
    tinggi_kustom?: number;
    jumlah: number;
    harga_satuan: number;
    harga_total: number;
    nama_file_diunggah?: string;
    url_file_diunggah?: string;
}

// Create order request
export interface CreateOrderRequest {
    pengguna_id: string;
    alamat_pengiriman_id: string;
    metode_pengiriman: string;
    kurir?: string;
    metode_pembayaran: string;
    tipe_pembayaran?: string;
    subtotal: number;
    biaya_kirim: number;
    diskon?: number;
    catatan?: string;
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
            nomor_resi: trackingNumber,
        });
    },

    /**
     * Update payment status (Admin)
     */
    async updatePaymentStatus(id: string, paymentStatus: string): Promise<ApiResponse<Order>> {
        return api.put<ApiResponse<Order>>(`/admin/orders/${id}/payment-status`, {
            status_bayar: paymentStatus,
        });
    },

    /**
     * Get order statistics (Admin)
     */
    async getStatistics(): Promise<ApiResponse<OrderStatistics>> {
        return api.get<ApiResponse<OrderStatistics>>('/admin/dashboard/stats');
    },

    /**
     * Get recent orders for dashboard (Admin)
     */
    async getRecentOrders(limit: number = 10): Promise<ApiResponse<RecentOrder[]>> {
        return api.get<ApiResponse<RecentOrder[]>>('/admin/dashboard/recent-orders', { limit });
    },
};

// Recent order type for dashboard
export interface RecentOrder {
    id: string;
    nomor_pesanan: string;
    customer: string;
    customer_email: string | null;
    product: string;
    items_count: number;
    jumlah: number;
    total: number;
    status: string;
    status_bayar: string;
    created_at: string;
}

export default orderService;
