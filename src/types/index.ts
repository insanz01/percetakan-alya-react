export interface ProductCategory {
    id: string;
    nama: string;
    slug: string;
    ikon?: string;
    deskripsi?: string;
    gambar?: string;
    jumlah_produk?: number;
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
    kategori_id: string;
    deskripsi: string;
    deskripsi_singkat: string;
    gambar: string[];
    harga_dasar: number;

    ukuran: ProductSize[];
    bahan: ProductMaterial[];
    sisi_cetak: PrintSide[];
    finishing: Finishing[];
    tier_jumlah: QuantityTier[];

    terlaris: boolean;
    promo: boolean;
    persen_promo?: number;
    min_pesan: number;
    estimasi_hari: number;
    berat_per_pcs: number;

    produk_retail?: boolean;
    butuh_file_desain?: boolean;

    tipe_file_diperbolehkan: string[];
    ukuran_file_maks: number;
}

export interface CartItemConfig {
    ukuran_id: string;
    bahan_id: string;
    sisi_cetak_id: string;
    finishingIds: string[];
    jumlah: number;
    lebar_kustom?: number;
    tinggi_kustom?: number;
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
    nama_asli: string;
    ukuran: number;
    tipe: string;
    url: string;
    status: 'uploading' | 'success' | 'error';
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

export interface OrderItem extends CartItem {
    status: OrderStatus;
    catatan?: string;
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

export interface ShippingMethod {
    id: string;
    nama: string;
    kurir: string;
    estimasi_hari: string;
    price: number;
}

export interface PaymentMethod {
    id: string;
    nama: string;
    tipe: 'bank_transfer' | 'virtual_account' | 'ewallet' | 'qris';
    ikon: string;
    instructions?: string;
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
    alamat_pengiriman: ShippingAddress;
    metode_pengiriman: ShippingMethod;
    metode_pembayaran: PaymentMethod | string;
    catatan?: string;
    subtotal: number;
    biaya_kirim: number;
    diskon: number;
    total: number;
    status: OrderStatus;
    status_bayar: 'pending' | 'paid' | 'expired' | 'refunded';
    batas_bayar?: Date;
    created_at: Date;
    updated_at: Date;
}

export interface User {
    id: string;
    email: string;
    nama: string;
    telepon?: string;
    avatar?: string;
    addresses: ShippingAddress[];
    orders?: Order[];
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
