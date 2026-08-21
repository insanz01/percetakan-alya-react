import { api, ApiResponse, getToken, notifyUnauthorized } from './api';

// Shared by every multipart upload below (fetch, not the JSON api client,
// since these send FormData). Centralizes the 401 -> "session expired" hook.
async function uploadMultipart<T>(url: string, formData: FormData): Promise<T> {
    const token = getToken();

    const response = await fetch(url, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 401 && token) {
            notifyUnauthorized();
        }
        throw new Error(data.message || 'Upload failed');
    }

    return data;
}

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
        formData.append('tipe', type);
        if (relatedId) formData.append('terkait_id', relatedId);
        if (relatedType) formData.append('terkait_tipe', relatedType);

        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
        return uploadMultipart(`${baseUrl}/files/upload`, formData);
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

        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
        return uploadMultipart(`${baseUrl}/admin/products/${productId}/images`, formData);
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

        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
        return uploadMultipart(`${baseUrl}/admin/categories/${categoryId}/image`, formData);
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

        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
        return uploadMultipart(`${baseUrl}/admin/images/upload`, formData);
    },
};

export default fileService;

