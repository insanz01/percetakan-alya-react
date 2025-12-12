// Product Types
export interface ProductCategory {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    description?: string;
    image?: string;
    productCount?: number;
}

export interface ProductSize {
    id: string;
    name: string;
    width?: number;  // in mm
    height?: number; // in mm
    dimensions?: string; // formatted string e.g., "148 x 210 mm"
    priceMultiplier: number;
}

export interface ProductMaterial {
    id: string;
    name: string;
    weight?: string; // e.g., "190gr", "210gr"
    pricePerUnit: number;
    description?: string;
}

export interface PrintSide {
    id: string;
    name: string;
    code?: string; // e.g., "4/0" for 1 side, "4/4" for 2 sides
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
    name: string;
    slug: string;
    categoryId: string;
    description: string;
    shortDescription: string;
    images: string[];
    basePrice: number;

    // Available options
    sizes: ProductSize[];
    materials: ProductMaterial[];
    printSides: PrintSide[];
    finishings: Finishing[];
    quantityTiers: QuantityTier[];

    // Meta
    isBestSeller: boolean;
    isPromo: boolean;
    promoPercentage?: number;
    minOrderQty: number;
    estimatedDays: number;
    weightPerPiece: number; // in grams

    // Product type
    isRetailProduct?: boolean; // true = retail/ATK product, false/undefined = print service
    requiresDesignFile?: boolean; // true = requires file upload (default true for print services)

    // File requirements (only for print services)
    allowedFileTypes: string[];
    maxFileSize: number; // in MB
}

// Cart Types
export interface CartItemConfig {
    sizeId: string;
    materialId: string;
    printSideId: string;
    finishingIds: string[];
    quantity: number;
    customWidth?: number;
    customHeight?: number;
    // Display names for order history
    sizeName?: string;
    materialName?: string;
    printSideName?: string;
    finishingNames?: string[];
}

export interface CartItem {
    id: string;
    productId: string;
    product: Product;
    config: CartItemConfig;
    uploadedFile?: UploadedFile;
    designFile?: UploadedFile;
    unitPrice: number;
    totalPrice: number;
    createdAt: Date;
}

// File Upload Types
export interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
    status: 'uploading' | 'success' | 'error';
}

// Order Types
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
    notes?: string;
}

export interface ShippingAddress {
    id: string;
    recipientName: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    isDefault: boolean;
}

export interface ShippingMethod {
    id: string;
    name: string;
    provider: string;
    estimatedDays: string;
    price: number;
}

export interface PaymentMethod {
    id: string;
    name: string;
    type: 'bank_transfer' | 'virtual_account' | 'ewallet' | 'qris';
    icon: string;
    instructions?: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    userId?: string;
    user?: {
        id: string;
        name: string;
        email: string;
        phone?: string;
    };
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethod | string;
    notes?: string;
    subtotal: number;
    shippingCost: number;
    discount: number;
    totalAmount: number;
    status: OrderStatus;
    paymentStatus: 'pending' | 'paid' | 'expired' | 'refunded';
    paymentDeadline?: Date;
    createdAt: Date;
    updatedAt: Date;
}

// User Types
export interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    avatar?: string;
    addresses: ShippingAddress[];
    orders?: Order[];
    role?: 'customer' | 'admin' | 'super_admin';
    is_active?: boolean;
    email_verified_at?: string;
    createdAt?: Date;
    created_at?: string;
    updated_at?: string;
}

// UI Types
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

// Search Types
export interface SearchResult {
    products: Product[];
    categories: ProductCategory[];
    total: number;
}
