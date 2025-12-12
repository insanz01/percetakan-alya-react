import { api, ApiResponse } from './api';

// Uploaded file
export interface UploadedFile {
    id: string;
    name: string;
    size: number;
    human_size: string;
    mime_type: string;
    type: string;
    url: string;
    created_at: string;
}

// Upload response
export interface UploadResponse {
    id: string;
    name: string;
    size: number;
    human_size: string;
    mime_type: string;
    url: string;
}

// File Upload Service
export const fileService = {
    /**
     * Upload file
     */
    async upload(
        file: File,
        type: 'design' | 'payment_proof',
        relatedId?: string,
        relatedType?: string
    ): Promise<ApiResponse<UploadResponse>> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        if (relatedId) formData.append('related_id', relatedId);
        if (relatedType) formData.append('related_type', relatedType);

        const token = localStorage.getItem('auth_token');
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

        const response = await fetch(`${baseUrl}/files/upload`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Upload failed');
        }

        return data;
    },

    /**
     * Get file info
     */
    async getFile(id: string): Promise<ApiResponse<UploadedFile>> {
        return api.get<ApiResponse<UploadedFile>>(`/files/${id}`);
    },

    /**
     * Get download URL
     */
    getDownloadUrl(id: string): string {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
        return `${baseUrl}/files/${id}/download`;
    },

    /**
     * Delete file
     */
    async deleteFile(id: string): Promise<ApiResponse<null>> {
        return api.delete<ApiResponse<null>>(`/files/${id}`);
    },

    /**
     * Get files for related entity (Admin)
     */
    async getFilesForRelated(
        relatedType: string,
        relatedId: string
    ): Promise<ApiResponse<UploadedFile[]>> {
        return api.get<ApiResponse<UploadedFile[]>>('/admin/files', {
            related_type: relatedType,
            related_id: relatedId,
        });
    },
};

export default fileService;
