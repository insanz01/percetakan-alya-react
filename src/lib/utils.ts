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
        nama: apiProduct.nama,
        slug: apiProduct.slug,
        kategoriId: apiProduct.kategori_id,
        deskripsi: apiProduct.deskripsi,
        deskripsiSingkat: apiProduct.deskripsi_singkat,
        gambar: apiProduct.gambar || [],

        hargaDasar: parseFloat(apiProduct.harga_dasar) || 0,

        ukuran: apiProduct.ukuran || [],
        bahan: apiProduct.bahan || [],
        sisiCetak: apiProduct.sisi_cetak || [],
        finishing: apiProduct.finishing || [],
        tierJumlah: apiProduct.tier_jumlah || [],

        terlaris: apiProduct.terlaris || false,
        promo: apiProduct.promo || false,
        persenPromo: apiProduct.persen_promo || 0,
        minPesan: apiProduct.min_pesan || 1,
        estimasiHari: apiProduct.estimasi_hari || 3,
        beratPerPcs: apiProduct.berat_per_pcs || 0,

        produkRetail: apiProduct.produk_retail || false,
        butuhFileDesain: apiProduct.butuh_file_desain !== false,

        tipeFileDiperbolehkan: apiProduct.tipe_file_diperbolehkan || [],
        ukuranFileMaks: apiProduct.ukuran_file_maks || 50,

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
        nama: apiCategory.nama,
        slug: apiCategory.slug,
        ikon: apiCategory.ikon,
        deskripsi: apiCategory.deskripsi,
        gambar: apiCategory.gambar,
        aktif: apiCategory.aktif ?? true,
        urutan: apiCategory.urutan ?? 0,
        productCount: apiCategory.jumlah_produk ?? 0,
    };
}

/**
 * Transform array of API categories to frontend Category types
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformCategories(apiCategories: any[]): any[] {
    return apiCategories.map(transformCategory);
}

