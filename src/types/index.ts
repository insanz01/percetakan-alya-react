export interface ProductCategory {
    id: string;
    nama: string;
    slug: string;
    ikon?: string;
    deskripsi?: string;
    gambar?: string;
    aktif?: boolean;
    urutan?: number;
    productCount?: number;
}

export interface ProductSize {
    id: string;
    name: string;
    width?: number;
    height?: number;
    dimensions?: string;
    priceMultiplier: number;
}

export interface ProductMaterial {
    id: string;
    name: string;
    weight?: string;
    pricePerUnit: number;
    description?: string;
}

export interface PrintSide {
    id: string;
    name: string;
    code?: string;
    priceMultiplier: number;
}

export interface Finishing {
    id: string;
    name: string;
    type?: 'laminating' | 'cutting' | 'folding' | 'binding' | 'other';
    price: number;
    description?: string;
}

export interface QuantityTier {
    minQty: number;
    maxQty: number;
    pricePerUnit: number;
}

export interface Product {
    id: string;
    nama: string;
    slug: string;
    kategoriId: string;
    deskripsi: string;
    deskripsiSingkat: string;
    gambar: string[];
    hargaDasar: number;

    ukuran: ProductSize[];
    bahan: ProductMaterial[];
    sisiCetak: PrintSide[];
    finishing: Finishing[];
    tierJumlah: QuantityTier[];

    terlaris: boolean;
    promo: boolean;
    persenPromo?: number;
    minPesan: number;
    estimasiHari: number;
    beratPerPcs: number;

    produkRetail?: boolean;
    butuhFileDesain?: boolean;

    tipeFileDiperbolehkan: string[];
    ukuranFileMaks: number;

    aktif?: boolean;
    category?: ProductCategory;
    templateDesain?: ProductDesignTemplate[];
}

export interface ProductDesignTemplate {
    id: string;
    nama: string;
    gambar: string;
}

export interface CartItemConfig {
    ukuran_id: string;
    bahan_id: string;
    sisi_cetak_id: string;
    finishingIds: string[];
    jumlah: number;
    customWidth?: number;
    customHeight?: number;
    nama_ukuran?: string;
    nama_bahan?: string;
    nama_sisi_cetak?: string;
    nama_finishing?: string[];
}

export interface CartItem {
    id: string;
    produk_id: string;
    product: Product;
    config: CartItemConfig;
    uploadedFile?: UploadedFile;
    designFile?: UploadedFile;
    harga_satuan: number;
    harga_total: number;
    created_at: Date;
}

export interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
    status: 'uploading' | 'success' | 'error';
    previewUrl?: string;
    source?: 'upload' | 'template';
}

export type OrderStatus =
    | 'pending_payment'
    | 'payment_verified'
    | 'file_verification'
    | 'file_rejected'
    | 'in_production'
    | 'finishing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

export interface OrderItem {
    id: string;
    pesanan_id: string;
    produk_id: string;
    product?: Product;
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
    tautan_file_diunggah?: string;
    status_file_diunggah?: string;
    status: OrderStatus;
    catatan?: string;
    created_at: Date;
    updated_at: Date;
}

export interface ShippingAddress {
    id: string;
    nama_penerima: string;
    telepon: string;
    alamat: string;
    kota: string;
    provinsi: string;
    kode_pos: string;
    utama: boolean;
}

export interface Order {
    id: string;
    nomor_pesanan: string;
    pengguna_id?: string;
    user?: {
        id: string;
        nama: string;
        email: string;
        telepon?: string;
    };
    items: OrderItem[];
    alamat_pengiriman_id?: string;
    shipping_address?: ShippingAddress;
    metode_pengiriman: string;
    kurir?: string;
    nomor_resi?: string;
    metode_pembayaran: string;
    tipe_pembayaran?: string;
    catatan?: string;
    subtotal: number;
    biaya_kirim: number;
    diskon: number;
    total: number;
    status: OrderStatus;
    status_bayar: 'pending' | 'paid' | 'expired' | 'refunded';
    batas_bayar?: Date;
    dibayar_pada?: Date;
    created_at: Date;
    updated_at: Date;
}

export interface User {
    id: string;
    email: string;
    nama: string;
    telepon?: string;
    foto_profil?: string;
    addresses: ShippingAddress[];
    orders?: Order[];
    orders_count?: number;
    peran?: 'customer' | 'admin' | 'super_admin';
    aktif?: boolean;
    email_diverifikasi_pada?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Toast {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
}

export interface ModalState {
    isOpen: boolean;
    type: 'login' | 'register' | 'cart' | 'search' | null;
}

export interface SearchResult {
    products: Product[];
    categories: ProductCategory[];
    total: number;
}
