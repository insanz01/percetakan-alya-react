import { api, ApiResponse } from './api';

// Contact form data
export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

// Contact message (admin view)
export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    admin_notes?: string;
    replied_at?: string;
    created_at: string;
    updated_at: string;
}

// Contact statistics
export interface ContactStatistics {
    total: number;
    new: number;
    read: number;
    replied: number;
    archived: number;
    today: number;
    this_week: number;
}

// Contact Service
export const contactService = {
    /**
     * Submit contact form (Public)
     */
    async submit(data: ContactFormData): Promise<ApiResponse<{ id: string }>> {
        return api.post<ApiResponse<{ id: string }>>('/contact', data);
    },

    // ==================== ADMIN ====================

    /**
     * Get all messages (Admin)
     */
    async getMessages(filters?: {
        status?: string;
        search?: string;
        page?: number;
        per_page?: number;
    }): Promise<ApiResponse<ContactMessage[]>> {
        return api.get<ApiResponse<ContactMessage[]>>('/admin/contact-messages', filters as Record<string, string | number | boolean>);
    },

    /**
     * Get single message (Admin)
     */
    async getMessage(id: string): Promise<ApiResponse<ContactMessage>> {
        return api.get<ApiResponse<ContactMessage>>(`/admin/contact-messages/${id}`);
    },

    /**
     * Update message status (Admin)
     */
    async updateStatus(id: string, status: string, adminNotes?: string): Promise<ApiResponse<ContactMessage>> {
        return api.put<ApiResponse<ContactMessage>>(`/admin/contact-messages/${id}/status`, {
            status,
            admin_notes: adminNotes,
        });
    },

    /**
     * Delete message (Admin)
     */
    async deleteMessage(id: string): Promise<ApiResponse<null>> {
        return api.delete<ApiResponse<null>>(`/admin/contact-messages/${id}`);
    },

    /**
     * Get statistics (Admin)
     */
    async getStatistics(): Promise<ApiResponse<ContactStatistics>> {
        return api.get<ApiResponse<ContactStatistics>>('/admin/contact-messages/stats');
    },
};

export default contactService;
