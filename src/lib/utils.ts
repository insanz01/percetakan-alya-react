// Utility functions

/**
 * Format price to Indonesian Rupiah
 */
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

/**
 * Format datetime to Indonesian locale
 */
export function formatDateTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Format weight
 */
export function formatWeight(grams: number): string {
    if (grams >= 1000) {
        return `${(grams / 1000).toFixed(1)} kg`;
    }
    return `${grams} gr`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
}

/**
 * Generate slug from text
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
}

/**
 * Convert snake_case to camelCase
 */
export function snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Transform object keys from snake_case to camelCase (shallow)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformKeys(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const key in obj) {
        const camelKey = snakeToCamel(key);
        result[camelKey] = obj[key];
    }
    return result;
}

/**
 * Transform API product response to frontend Product type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformProduct(apiProduct: any): any {
    return {
        id: apiProduct.id,
        name: apiProduct.name,
        slug: apiProduct.slug,
        categoryId: apiProduct.category_id,
        description: apiProduct.description,
        shortDescription: apiProduct.short_description,
        images: apiProduct.images || [],
        basePrice: parseFloat(apiProduct.base_price) || 0,

        // Arrays - keep as is since they have their own structure
        sizes: apiProduct.sizes || [],
        materials: apiProduct.materials || [],
        printSides: apiProduct.print_sides || [],
        finishings: apiProduct.finishings || [],
        quantityTiers: apiProduct.quantity_tiers || [],

        // Meta
        isBestSeller: apiProduct.is_best_seller || false,
        isPromo: apiProduct.is_promo || false,
        promoPercentage: apiProduct.promo_percentage || 0,
        minOrderQty: apiProduct.min_order_qty || 1,
        estimatedDays: apiProduct.estimated_days || 3,
        weightPerPiece: apiProduct.weight_per_piece || 0,

        // Product type
        isRetailProduct: apiProduct.is_retail_product || false,
        requiresDesignFile: apiProduct.requires_design_file !== false,

        // File requirements
        allowedFileTypes: apiProduct.allowed_file_types || [],
        maxFileSize: apiProduct.max_file_size || 50,

        // Category relation
        category: apiProduct.category,
    };
}

/**
 * Transform array of API products to frontend Product types
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformProducts(apiProducts: any[]): any[] {
    return apiProducts.map(transformProduct);
}

/**
 * Transform API category response to frontend Category type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformCategory(apiCategory: any): any {
    return {
        id: apiCategory.id,
        name: apiCategory.name,
        slug: apiCategory.slug,
        icon: apiCategory.icon,
        description: apiCategory.description,
        image: apiCategory.image,
        isActive: apiCategory.is_active ?? true,
        sortOrder: apiCategory.sort_order ?? 0,
        productCount: apiCategory.product_count ?? 0,
    };
}

/**
 * Transform array of API categories to frontend Category types
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformCategories(apiCategories: any[]): any[] {
    return apiCategories.map(transformCategory);
}

