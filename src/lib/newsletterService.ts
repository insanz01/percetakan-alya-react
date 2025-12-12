import { api, ApiResponse } from './api';

// Newsletter subscriber
export interface NewsletterSubscriber {
    id: string;
    email: string;
    is_active: boolean;
    subscribed_at: string;
    unsubscribed_at?: string;
    created_at: string;
}

// Newsletter statistics
export interface NewsletterStatistics {
    total: number;
    active: number;
    unsubscribed: number;
    today: number;
    this_month: number;
}

// Newsletter Service
export const newsletterService = {
    /**
     * Subscribe to newsletter (Public)
     */
    async subscribe(email: string): Promise<ApiResponse<null>> {
        return api.post<ApiResponse<null>>('/newsletter/subscribe', { email });
    },

    /**
     * Unsubscribe from newsletter (Public)
     */
    async unsubscribe(token: string): Promise<ApiResponse<null>> {
        return api.get<ApiResponse<null>>(`/newsletter/unsubscribe/${token}`);
    },

    // ==================== ADMIN ====================

    /**
     * Get all subscribers (Admin)
     */
    async getSubscribers(filters?: {
        active?: boolean;
        search?: string;
        page?: number;
        per_page?: number;
    }): Promise<ApiResponse<NewsletterSubscriber[]>> {
        return api.get<ApiResponse<NewsletterSubscriber[]>>('/admin/newsletter', filters as Record<string, string | number | boolean>);
    },

    /**
     * Delete subscriber (Admin)
     */
    async deleteSubscriber(id: string): Promise<ApiResponse<null>> {
        return api.delete<ApiResponse<null>>(`/admin/newsletter/${id}`);
    },

    /**
     * Get statistics (Admin)
     */
    async getStatistics(): Promise<ApiResponse<NewsletterStatistics>> {
        return api.get<ApiResponse<NewsletterStatistics>>('/admin/newsletter/stats');
    },

    /**
     * Export subscribers (Admin)
     */
    async exportSubscribers(): Promise<ApiResponse<{
        subscribers: { email: string; subscribed_at: string }[];
        count: number;
        exported_at: string;
    }>> {
        return api.get<ApiResponse<{
            subscribers: { email: string; subscribed_at: string }[];
            count: number;
            exported_at: string;
        }>>('/admin/newsletter/export');
    },
};

export default newsletterService;
