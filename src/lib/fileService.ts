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

// Image upload response
export interface ImageUploadResponse {
    url: string;
    images?: string[];
    index?: number;
    path?: string;
    size?: number;
    mime_type?: string;
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

    // ==================== IMAGE UPLOAD ====================

    /**
     * Upload product image
     */
    async uploadProductImage(
        productId: string,
        file: File,
        replaceIndex?: number
    ): Promise<ApiResponse<ImageUploadResponse>> {
        const formData = new FormData();
        formData.append('image', file);
        if (replaceIndex !== undefined) {
            formData.append('replace_index', replaceIndex.toString());
        }

        const token = localStorage.getItem('auth_token');
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

        const response = await fetch(`${baseUrl}/admin/products/${productId}/images`, {
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
     * Delete product image
     */
    async deleteProductImage(
        productId: string,
        index: number
    ): Promise<ApiResponse<{ images: string[] }>> {
        return api.delete<ApiResponse<{ images: string[] }>>(`/admin/products/${productId}/images?index=${index}`);
    },

    /**
     * Upload category image
     */
    async uploadCategoryImage(
        categoryId: string,
        file: File
    ): Promise<ApiResponse<ImageUploadResponse>> {
        const formData = new FormData();
        formData.append('image', file);

        const token = localStorage.getItem('auth_token');
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

        const response = await fetch(`${baseUrl}/admin/categories/${categoryId}/image`, {
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
     * Delete category image
     */
    async deleteCategoryImage(categoryId: string): Promise<ApiResponse<null>> {
        return api.delete<ApiResponse<null>>(`/admin/categories/${categoryId}/image`);
    },

    /**
     * Upload generic image
     */
    async uploadImage(
        file: File,
        folder?: string
    ): Promise<ApiResponse<ImageUploadResponse>> {
        const formData = new FormData();
        formData.append('image', file);
        if (folder) formData.append('folder', folder);

        const token = localStorage.getItem('auth_token');
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

        const response = await fetch(`${baseUrl}/admin/images/upload`, {
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
};

export default fileService;

