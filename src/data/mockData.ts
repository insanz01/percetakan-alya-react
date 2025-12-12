import type { Product, ProductCategory, ShippingMethod, PaymentMethod } from '../types';

// Product Categories
export const categories: ProductCategory[] = [
    {
        id: 'cat-1',
        name: 'Brosur & Flyer',
        slug: 'brosur-flyer',
        icon: '📄',
        description: 'Brosur dan flyer berkualitas tinggi untuk promosi bisnis Anda',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400',
        productCount: 12,
    },
    {
        id: 'cat-2',
        name: 'Kartu Nama',
        slug: 'kartu-nama',
        icon: '💳',
        description: 'Kartu nama profesional dengan berbagai finishing premium',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400',
        productCount: 8,
    },
    {
        id: 'cat-3',
        name: 'Banner & Spanduk',
        slug: 'banner-spanduk',
        icon: '🎌',
        description: 'Banner dan spanduk outdoor/indoor dengan bahan tahan lama',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        productCount: 15,
    },
    {
        id: 'cat-4',
        name: 'Poster & Print A3+',
        slug: 'poster-print',
        icon: '🖼️',
        description: 'Cetak poster dan foto ukuran besar dengan kualitas tinggi',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
        productCount: 10,
    },
    {
        id: 'cat-5',
        name: 'Undangan',
        slug: 'undangan',
        icon: '💌',
        description: 'Undangan pernikahan, ulang tahun, dan acara spesial lainnya',
        image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=400',
        productCount: 20,
    },
    {
        id: 'cat-6',
        name: 'Kop Surat & Amplop',
        slug: 'kop-surat-amplop',
        icon: '✉️',
        description: 'Kop surat dan amplop profesional untuk kebutuhan bisnis',
        image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400',
        productCount: 6,
    },
    {
        id: 'cat-7',
        name: 'Stiker & Label',
        slug: 'stiker-label',
        icon: '🏷️',
        description: 'Stiker dan label custom untuk produk dan kemasan',
        image: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=400',
        productCount: 14,
    },
    {
        id: 'cat-8',
        name: 'Kalender',
        slug: 'kalender',
        icon: '📅',
        description: 'Kalender custom untuk personal dan corporate gift',
        image: 'https://images.unsplash.com/photo-1506784926709-22f1ec395907?w=400',
        productCount: 5,
    },
    {
        id: 'cat-9',
        name: 'ATK & Perlengkapan',
        slug: 'atk-perlengkapan',
        icon: '✏️',
        description: 'Alat tulis kantor dan perlengkapan kerja berkualitas',
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400',
        productCount: 15,
    },
    {
        id: 'cat-10',
        name: 'Aksesoris Kantor',
        slug: 'aksesoris-kantor',
        icon: '📎',
        description: 'Aksesoris dan perlengkapan penunjang produktivitas',
        image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400',
        productCount: 12,
    },
];

// Sample Products
export const products: Product[] = [
    {
        id: 'prod-1',
        name: 'Brosur A5 Premium',
        slug: 'brosur-a5-premium',
        categoryId: 'cat-1',
        description: `Brosur A5 premium dengan kualitas cetak terbaik. Cocok untuk promosi produk, layanan, atau event Anda. 
    
Keunggulan:
- Warna cetak tajam dan akurat
- Bahan kertas premium pilihan
- Finishing profesional
- Gratis desain template`,
        shortDescription: 'Brosur A5 dengan finishing premium untuk promosi bisnis',
        images: [
            'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600',
            'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=600',
        ],
        basePrice: 500,
        sizes: [
            { id: 'size-a5', name: 'A5 (148 x 210 mm)', width: 148, height: 210, priceMultiplier: 1 },
            { id: 'size-a4', name: 'A4 (210 x 297 mm)', width: 210, height: 297, priceMultiplier: 1.5 },
            { id: 'size-a3', name: 'A3 (297 x 420 mm)', width: 297, height: 420, priceMultiplier: 2.5 },
            { id: 'size-custom', name: 'Custom Size', width: 0, height: 0, priceMultiplier: 1 },
        ],
        materials: [
            { id: 'mat-art-paper-120', name: 'Art Paper', weight: '120gr', pricePerUnit: 200, description: 'Kertas glossy standar' },
            { id: 'mat-art-carton-190', name: 'Art Carton', weight: '190gr', pricePerUnit: 350, description: 'Kertas tebal semi-glossy' },
            { id: 'mat-art-carton-210', name: 'Art Carton', weight: '210gr', pricePerUnit: 450, description: 'Kertas tebal premium' },
            { id: 'mat-art-carton-260', name: 'Art Carton', weight: '260gr', pricePerUnit: 600, description: 'Kertas paling tebal dan kokoh' },
        ],
        printSides: [
            { id: 'side-1', name: '1 Sisi', code: '4/0', priceMultiplier: 1 },
            { id: 'side-2', name: '2 Sisi (Bolak-balik)', code: '4/4', priceMultiplier: 1.8 },
        ],
        finishings: [
            { id: 'fin-lam-doff', name: 'Laminasi Doff', type: 'laminating', price: 150, description: 'Finishing matte yang elegan' },
            { id: 'fin-lam-glossy', name: 'Laminasi Glossy', type: 'laminating', price: 150, description: 'Finishing mengkilap dan hidup' },
            { id: 'fin-potong', name: 'Potong/Die Cut', type: 'cutting', price: 200, description: 'Potong sesuai bentuk desain' },
            { id: 'fin-lipat-1', name: 'Lipat 1x', type: 'folding', price: 50, description: 'Lipatan tengah' },
            { id: 'fin-lipat-2', name: 'Lipat 2x (Z-Fold)', type: 'folding', price: 100, description: 'Lipatan Z atau accordion' },
        ],
        quantityTiers: [
            { minQty: 100, maxQty: 249, pricePerUnit: 700 },
            { minQty: 250, maxQty: 499, pricePerUnit: 600 },
            { minQty: 500, maxQty: 999, pricePerUnit: 500 },
            { minQty: 1000, maxQty: 2499, pricePerUnit: 400 },
            { minQty: 2500, maxQty: 4999, pricePerUnit: 350 },
            { minQty: 5000, maxQty: 99999, pricePerUnit: 300 },
        ],
        isBestSeller: true,
        isPromo: true,
        promoPercentage: 15,
        minOrderQty: 100,
        estimatedDays: 3,
        weightPerPiece: 5,
        allowedFileTypes: ['pdf', 'jpg', 'jpeg', 'png', 'tiff'],
        maxFileSize: 50,
    },
    {
        id: 'prod-2',
        name: 'Kartu Nama Premium',
        slug: 'kartu-nama-premium',
        categoryId: 'cat-2',
        description: `Kartu nama premium dengan berbagai pilihan material dan finishing eksklusif. Berikan kesan profesional dengan kartu nama berkualitas tinggi.`,
        shortDescription: 'Kartu nama dengan finishing eksklusif dan material premium',
        images: [
            'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600',
            'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600',
        ],
        basePrice: 300,
        sizes: [
            { id: 'size-std', name: 'Standard (9 x 5.5 cm)', width: 90, height: 55, priceMultiplier: 1 },
            { id: 'size-us', name: 'US Standard (8.5 x 5 cm)', width: 85, height: 50, priceMultiplier: 1 },
            { id: 'size-sq', name: 'Square (5.5 x 5.5 cm)', width: 55, height: 55, priceMultiplier: 1.2 },
        ],
        materials: [
            { id: 'mat-ac-260', name: 'Art Carton', weight: '260gr', pricePerUnit: 200, description: 'Standard business card' },
            { id: 'mat-ac-310', name: 'Art Carton', weight: '310gr', pricePerUnit: 350, description: 'Tebal dan kokoh' },
            { id: 'mat-linen', name: 'Linen', weight: '250gr', pricePerUnit: 500, description: 'Tekstur kain eksklusif' },
            { id: 'mat-kraft', name: 'Brown Kraft', weight: '300gr', pricePerUnit: 400, description: 'Tampilan natural rustic' },
        ],
        printSides: [
            { id: 'side-1', name: '1 Sisi', code: '4/0', priceMultiplier: 1 },
            { id: 'side-2', name: '2 Sisi', code: '4/4', priceMultiplier: 1.6 },
        ],
        finishings: [
            { id: 'fin-lam-doff', name: 'Laminasi Doff', type: 'laminating', price: 50, description: 'Finishing matte' },
            { id: 'fin-lam-glossy', name: 'Laminasi Glossy', type: 'laminating', price: 50, description: 'Finishing mengkilap' },
            { id: 'fin-spot-uv', name: 'Spot UV', type: 'other', price: 150, description: 'UV coating pada area tertentu' },
            { id: 'fin-emboss', name: 'Emboss/Deboss', type: 'other', price: 200, description: 'Efek timbul/cekung' },
            { id: 'fin-foil', name: 'Hot Foil Stamping', type: 'other', price: 300, description: 'Foil emas/silver' },
            { id: 'fin-round', name: 'Rounded Corner', type: 'cutting', price: 30, description: 'Sudut melengkung' },
        ],
        quantityTiers: [
            { minQty: 100, maxQty: 249, pricePerUnit: 500 },
            { minQty: 250, maxQty: 499, pricePerUnit: 400 },
            { minQty: 500, maxQty: 999, pricePerUnit: 300 },
            { minQty: 1000, maxQty: 99999, pricePerUnit: 250 },
        ],
        isBestSeller: true,
        isPromo: false,
        minOrderQty: 100,
        estimatedDays: 2,
        weightPerPiece: 3,
        allowedFileTypes: ['pdf', 'jpg', 'jpeg', 'png', 'ai', 'psd'],
        maxFileSize: 30,
    },
    {
        id: 'prod-3',
        name: 'X-Banner Indoor',
        slug: 'x-banner-indoor',
        categoryId: 'cat-3',
        description: `X-Banner berkualitas tinggi untuk promosi indoor. Mudah dipasang dan portable, cocok untuk pameran, seminar, atau toko.`,
        shortDescription: 'X-Banner portable untuk promosi indoor',
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        ],
        basePrice: 50000,
        sizes: [
            { id: 'size-60x160', name: '60 x 160 cm', width: 600, height: 1600, priceMultiplier: 1 },
            { id: 'size-80x180', name: '80 x 180 cm', width: 800, height: 1800, priceMultiplier: 1.3 },
            { id: 'size-80x200', name: '80 x 200 cm', width: 800, height: 2000, priceMultiplier: 1.5 },
        ],
        materials: [
            { id: 'mat-albatros', name: 'Albatros', weight: '280gr', pricePerUnit: 50000, description: 'Bahan standar indoor' },
            { id: 'mat-flexy', name: 'Flexy China', weight: '340gr', pricePerUnit: 75000, description: 'Lebih tebal dan tahan lama' },
            { id: 'mat-korean', name: 'Korean Flexy', weight: '440gr', pricePerUnit: 100000, description: 'Kualitas premium' },
        ],
        printSides: [
            { id: 'side-1', name: '1 Sisi', code: '4/0', priceMultiplier: 1 },
        ],
        finishings: [
            { id: 'fin-stand-eco', name: 'Stand Ekonomis', type: 'other', price: 35000, description: 'Stand X-Banner standar' },
            { id: 'fin-stand-premium', name: 'Stand Premium', type: 'other', price: 75000, description: 'Stand kokoh dan tahan lama' },
        ],
        quantityTiers: [
            { minQty: 1, maxQty: 4, pricePerUnit: 85000 },
            { minQty: 5, maxQty: 9, pricePerUnit: 75000 },
            { minQty: 10, maxQty: 24, pricePerUnit: 65000 },
            { minQty: 25, maxQty: 99999, pricePerUnit: 55000 },
        ],
        isBestSeller: false,
        isPromo: true,
        promoPercentage: 20,
        minOrderQty: 1,
        estimatedDays: 2,
        weightPerPiece: 500,
        allowedFileTypes: ['pdf', 'jpg', 'jpeg', 'png', 'ai', 'psd', 'tiff'],
        maxFileSize: 100,
    },
    {
        id: 'prod-4',
        name: 'Poster A3+ Photo Paper',
        slug: 'poster-a3-plus-photo-paper',
        categoryId: 'cat-4',
        description: `Cetak poster dan foto ukuran A3+ dengan kualitas foto premium. Warna tajam dan detail tinggi, cocok untuk dekorasi atau display.`,
        shortDescription: 'Cetak poster A3+ dengan kualitas foto premium',
        images: [
            'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
        ],
        basePrice: 25000,
        sizes: [
            { id: 'size-a3plus', name: 'A3+ (32 x 48 cm)', width: 320, height: 480, priceMultiplier: 1 },
            { id: 'size-a2', name: 'A2 (42 x 60 cm)', width: 420, height: 600, priceMultiplier: 1.8 },
            { id: 'size-a1', name: 'A1 (60 x 84 cm)', width: 600, height: 840, priceMultiplier: 3 },
        ],
        materials: [
            { id: 'mat-photo-glossy', name: 'Photo Paper Glossy', weight: '200gr', pricePerUnit: 15000, description: 'Glossy seperti foto studio' },
            { id: 'mat-photo-luster', name: 'Photo Paper Luster', weight: '260gr', pricePerUnit: 20000, description: 'Semi-matte premium' },
            { id: 'mat-canvas', name: 'Canvas Art', weight: '380gr', pricePerUnit: 50000, description: 'Tekstur kanvas artistik' },
        ],
        printSides: [
            { id: 'side-1', name: '1 Sisi', code: '4/0', priceMultiplier: 1 },
        ],
        finishings: [
            { id: 'fin-lam-doff', name: 'Laminasi Doff', type: 'laminating', price: 10000, description: 'Perlindungan matte' },
            { id: 'fin-lam-glossy', name: 'Laminasi Glossy', type: 'laminating', price: 10000, description: 'Perlindungan glossy' },
            { id: 'fin-mount', name: 'Mounting Foam Board', type: 'other', price: 25000, description: 'Ditempelkan di foam board' },
            { id: 'fin-frame', name: 'Bingkai Minimalis', type: 'other', price: 75000, description: 'Frame kayu/aluminium' },
        ],
        quantityTiers: [
            { minQty: 1, maxQty: 4, pricePerUnit: 35000 },
            { minQty: 5, maxQty: 9, pricePerUnit: 30000 },
            { minQty: 10, maxQty: 24, pricePerUnit: 25000 },
            { minQty: 25, maxQty: 99999, pricePerUnit: 20000 },
        ],
        isBestSeller: true,
        isPromo: false,
        minOrderQty: 1,
        estimatedDays: 1,
        weightPerPiece: 50,
        allowedFileTypes: ['pdf', 'jpg', 'jpeg', 'png', 'tiff'],
        maxFileSize: 100,
    },
    {
        id: 'prod-5',
        name: 'Stiker Vinyl Outdoor',
        slug: 'stiker-vinyl-outdoor',
        categoryId: 'cat-7',
        description: `Stiker vinyl tahan air dan UV untuk outdoor. Cocok untuk branding kendaraan, signage, atau promosi outdoor lainnya.`,
        shortDescription: 'Stiker vinyl tahan air dan UV untuk outdoor',
        images: [
            'https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=600',
        ],
        basePrice: 50,
        sizes: [
            { id: 'size-a5', name: 'A5 (148 x 210 mm)', width: 148, height: 210, priceMultiplier: 1 },
            { id: 'size-a4', name: 'A4 (210 x 297 mm)', width: 210, height: 297, priceMultiplier: 1.8 },
            { id: 'size-a3', name: 'A3 (297 x 420 mm)', width: 297, height: 420, priceMultiplier: 3 },
            { id: 'size-custom', name: 'Custom Size', width: 0, height: 0, priceMultiplier: 1 },
        ],
        materials: [
            { id: 'mat-vinyl-std', name: 'Vinyl Standar', weight: '100mic', pricePerUnit: 2000, description: 'Outdoor 1-2 tahun' },
            { id: 'mat-vinyl-pre', name: 'Vinyl Premium', weight: '120mic', pricePerUnit: 3500, description: 'Outdoor 3-5 tahun' },
            { id: 'mat-vinyl-tra', name: 'Vinyl Transparan', weight: '100mic', pricePerUnit: 4000, description: 'Tembus pandang' },
        ],
        printSides: [
            { id: 'side-1', name: '1 Sisi', code: '4/0', priceMultiplier: 1 },
        ],
        finishings: [
            { id: 'fin-kiss-cut', name: 'Kiss Cut', type: 'cutting', price: 500, description: 'Potong stiker, bukan backing' },
            { id: 'fin-die-cut', name: 'Die Cut', type: 'cutting', price: 1000, description: 'Potong sesuai bentuk desain' },
            { id: 'fin-lam-uv', name: 'Laminasi UV Protection', type: 'laminating', price: 1500, description: 'Perlindungan ekstra' },
        ],
        quantityTiers: [
            { minQty: 10, maxQty: 49, pricePerUnit: 5000 },
            { minQty: 50, maxQty: 99, pricePerUnit: 4000 },
            { minQty: 100, maxQty: 499, pricePerUnit: 3000 },
            { minQty: 500, maxQty: 99999, pricePerUnit: 2000 },
        ],
        isBestSeller: false,
        isPromo: true,
        promoPercentage: 10,
        minOrderQty: 10,
        estimatedDays: 2,
        weightPerPiece: 10,
        allowedFileTypes: ['pdf', 'jpg', 'jpeg', 'png', 'ai', 'svg'],
        maxFileSize: 50,
    },
    {
        id: 'prod-6',
        name: 'Undangan Hardcover Premium',
        slug: 'undangan-hardcover-premium',
        categoryId: 'cat-5',
        description: `Undangan pernikahan hardcover dengan desain mewah dan elegan. Tersedia berbagai pilihan finishing eksklusif untuk momen spesial Anda.`,
        shortDescription: 'Undangan hardcover mewah untuk momen spesial',
        images: [
            'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=600',
        ],
        basePrice: 15000,
        sizes: [
            { id: 'size-std', name: 'Standard (15 x 15 cm)', width: 150, height: 150, priceMultiplier: 1 },
            { id: 'size-dl', name: 'DL (10 x 21 cm)', width: 100, height: 210, priceMultiplier: 1.1 },
            { id: 'size-a5', name: 'A5 (15 x 21 cm)', width: 150, height: 210, priceMultiplier: 1.3 },
        ],
        materials: [
            { id: 'mat-hc-std', name: 'Hardcover Standard', weight: '', pricePerUnit: 20000, description: 'Cover 2mm + isi art carton' },
            { id: 'mat-hc-lux', name: 'Hardcover Luxury', weight: '', pricePerUnit: 35000, description: 'Cover 3mm + isi premium' },
            { id: 'mat-hc-vel', name: 'Hardcover Velvet', weight: '', pricePerUnit: 50000, description: 'Cover velvet + insert' },
        ],
        printSides: [
            { id: 'side-2', name: 'Full Color', code: '4/4', priceMultiplier: 1 },
        ],
        finishings: [
            { id: 'fin-foil-gold', name: 'Foil Emas', type: 'other', price: 5000, description: 'Nama pengantin foil emas' },
            { id: 'fin-foil-silver', name: 'Foil Silver', type: 'other', price: 5000, description: 'Nama pengantin foil silver' },
            { id: 'fin-emboss', name: 'Emboss', type: 'other', price: 3000, description: 'Efek timbul pada cover' },
            { id: 'fin-ribbon', name: 'Pita/Ribbon', type: 'other', price: 2000, description: 'Pita satin untuk pengikat' },
            { id: 'fin-box', name: 'Box Kemasan', type: 'other', price: 10000, description: 'Box eksklusif per undangan' },
        ],
        quantityTiers: [
            { minQty: 50, maxQty: 99, pricePerUnit: 50000 },
            { minQty: 100, maxQty: 199, pricePerUnit: 45000 },
            { minQty: 200, maxQty: 499, pricePerUnit: 40000 },
            { minQty: 500, maxQty: 99999, pricePerUnit: 35000 },
        ],
        isBestSeller: false,
        isPromo: false,
        minOrderQty: 50,
        estimatedDays: 7,
        weightPerPiece: 100,
        allowedFileTypes: ['pdf', 'jpg', 'jpeg', 'png', 'ai', 'psd'],
        maxFileSize: 50,
    },
    // RETAIL PRODUCTS (No design file required)
    {
        id: 'prod-7',
        name: 'Kertas HVS A4 80gr',
        slug: 'kertas-hvs-a4-80gr',
        categoryId: 'cat-9',
        description: `Kertas HVS A4 berkualitas tinggi untuk kebutuhan cetak dan fotokopi sehari-hari. Kertas putih bersih dengan kualitas premium, cocok untuk dokumen kantor, laporan, dan keperluan cetak lainnya.

Spesifikasi:
- Ukuran: A4 (210 x 297 mm)
- Gramatur: 80 gsm
- Brightness: 95%
- Isi: 500 lembar per rim`,
        shortDescription: 'Kertas HVS A4 80gr 1 Rim (500 lembar) kualitas premium',
        images: [
            'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600',
        ],
        basePrice: 45000,
        sizes: [
            { id: 'size-a4', name: 'A4 (210 x 297 mm)', width: 210, height: 297, priceMultiplier: 1 },
        ],
        materials: [
            { id: 'mat-80gr', name: 'HVS 80gr', weight: '80gr', pricePerUnit: 0, description: 'Standard office paper' },
        ],
        printSides: [
            { id: 'side-na', name: 'N/A', code: '-', priceMultiplier: 1 },
        ],
        finishings: [],
        quantityTiers: [
            { minQty: 1, maxQty: 4, pricePerUnit: 55000 },
            { minQty: 5, maxQty: 9, pricePerUnit: 50000 },
            { minQty: 10, maxQty: 24, pricePerUnit: 47000 },
            { minQty: 25, maxQty: 99999, pricePerUnit: 45000 },
        ],
        isBestSeller: true,
        isPromo: false,
        minOrderQty: 1,
        estimatedDays: 1,
        weightPerPiece: 2500,
        isRetailProduct: true,
        requiresDesignFile: false,
        allowedFileTypes: [],
        maxFileSize: 0,
    },
    {
        id: 'prod-8',
        name: 'Pulpen Gel 0.5mm (Box 12pcs)',
        slug: 'pulpen-gel-05mm-box',
        categoryId: 'cat-9',
        description: `Pulpen gel berkualitas tinggi dengan ujung 0.5mm untuk tulisan halus dan presisi. Tinta smooth tanpa skip, nyaman digunakan untuk menulis lama.

Keunggulan:
- Tinta gel super smooth
- Quick dry - tidak mudah smear
- Ergonomic grip
- Isi: 12 pcs/box`,
        shortDescription: 'Pulpen gel 0.5mm 1 Box (12 pcs) tinta hitam',
        images: [
            'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600',
        ],
        basePrice: 35000,
        sizes: [
            { id: 'size-std', name: 'Standard', width: 0, height: 0, priceMultiplier: 1 },
        ],
        materials: [
            { id: 'mat-black', name: 'Tinta Hitam', weight: '', pricePerUnit: 0, description: 'Warna tinta hitam' },
            { id: 'mat-blue', name: 'Tinta Biru', weight: '', pricePerUnit: 0, description: 'Warna tinta biru' },
            { id: 'mat-red', name: 'Tinta Merah', weight: '', pricePerUnit: 0, description: 'Warna tinta merah' },
        ],
        printSides: [
            { id: 'side-na', name: 'N/A', code: '-', priceMultiplier: 1 },
        ],
        finishings: [],
        quantityTiers: [
            { minQty: 1, maxQty: 2, pricePerUnit: 42000 },
            { minQty: 3, maxQty: 5, pricePerUnit: 38000 },
            { minQty: 6, maxQty: 11, pricePerUnit: 36000 },
            { minQty: 12, maxQty: 99999, pricePerUnit: 35000 },
        ],
        isBestSeller: false,
        isPromo: true,
        promoPercentage: 15,
        minOrderQty: 1,
        estimatedDays: 1,
        weightPerPiece: 200,
        isRetailProduct: true,
        requiresDesignFile: false,
        allowedFileTypes: [],
        maxFileSize: 0,
    },
    {
        id: 'prod-9',
        name: 'Stapler HD-10 + Isi Staples',
        slug: 'stapler-hd10-isi-staples',
        categoryId: 'cat-10',
        description: `Stapler heavy duty HD-10 dengan kapasitas 20 lembar. Dilengkapi dengan 1 box isi staples no.10 (1000 pcs). Desain ergonomis dan tahan lama untuk penggunaan kantor sehari-hari.

Spesifikasi:
- Kapasitas: 20 lembar kertas 80gr
- Material: Metal + Plastik ABS
- Include: 1 box staples No.10 (1000 pcs)`,
        shortDescription: 'Stapler HD-10 kapasitas 20 lembar + bonus isi staples',
        images: [
            'https://images.unsplash.com/photo-1568209865332-a15790aed756?w=600',
        ],
        basePrice: 35000,
        sizes: [
            { id: 'size-std', name: 'Standard', width: 0, height: 0, priceMultiplier: 1 },
        ],
        materials: [
            { id: 'mat-black', name: 'Warna Hitam', weight: '', pricePerUnit: 0, description: 'Body warna hitam' },
            { id: 'mat-blue', name: 'Warna Biru', weight: '', pricePerUnit: 0, description: 'Body warna biru' },
        ],
        printSides: [
            { id: 'side-na', name: 'N/A', code: '-', priceMultiplier: 1 },
        ],
        finishings: [],
        quantityTiers: [
            { minQty: 1, maxQty: 4, pricePerUnit: 42000 },
            { minQty: 5, maxQty: 9, pricePerUnit: 38000 },
            { minQty: 10, maxQty: 99999, pricePerUnit: 35000 },
        ],
        isBestSeller: false,
        isPromo: false,
        minOrderQty: 1,
        estimatedDays: 1,
        weightPerPiece: 250,
        isRetailProduct: true,
        requiresDesignFile: false,
        allowedFileTypes: [],
        maxFileSize: 0,
    },
    {
        id: 'prod-10',
        name: 'Desk Organizer Multifungsi',
        slug: 'desk-organizer-multifungsi',
        categoryId: 'cat-10',
        description: `Desk organizer multifungsi dengan berbagai kompartemen untuk menyimpan alat tulis, gadget, dan perlengkapan kantor. Desain modern minimalis yang cocok untuk meja kerja profesional.

Fitur:
- Slot smartphone/tablet
- Kompartemen pulpen dan pensil
- Laci kecil untuk paper clip, binder, dll
- Tempat sticky notes
- Material: Mesh Metal Premium`,
        shortDescription: 'Desk organizer mesh metal dengan multi kompartemen',
        images: [
            'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600',
        ],
        basePrice: 85000,
        sizes: [
            { id: 'size-std', name: 'Standard', width: 0, height: 0, priceMultiplier: 1 },
        ],
        materials: [
            { id: 'mat-black', name: 'Hitam', weight: '', pricePerUnit: 0, description: 'Warna hitam elegan' },
            { id: 'mat-silver', name: 'Silver', weight: '', pricePerUnit: 5000, description: 'Warna silver modern' },
            { id: 'mat-rosegold', name: 'Rose Gold', weight: '', pricePerUnit: 10000, description: 'Warna rose gold premium' },
        ],
        printSides: [
            { id: 'side-na', name: 'N/A', code: '-', priceMultiplier: 1 },
        ],
        finishings: [],
        quantityTiers: [
            { minQty: 1, maxQty: 2, pricePerUnit: 95000 },
            { minQty: 3, maxQty: 5, pricePerUnit: 90000 },
            { minQty: 6, maxQty: 99999, pricePerUnit: 85000 },
        ],
        isBestSeller: true,
        isPromo: false,
        minOrderQty: 1,
        estimatedDays: 1,
        weightPerPiece: 500,
        isRetailProduct: true,
        requiresDesignFile: false,
        allowedFileTypes: [],
        maxFileSize: 0,
    },
    {
        id: 'prod-11',
        name: 'Binder Clip Set (3 Ukuran)',
        slug: 'binder-clip-set-3-ukuran',
        categoryId: 'cat-10',
        description: `Set binder clip lengkap dengan 3 ukuran berbeda untuk berbagai kebutuhan. Material logam premium dengan finishing anti karat.

Isi Paket:
- 12 pcs Binder Clip Small (19mm)
- 8 pcs Binder Clip Medium (32mm)  
- 4 pcs Binder Clip Large (51mm)
Total: 24 pcs`,
        shortDescription: 'Binder clip metal set 24 pcs (3 ukuran)',
        images: [
            'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600',
        ],
        basePrice: 25000,
        sizes: [
            { id: 'size-std', name: 'Set 24 pcs', width: 0, height: 0, priceMultiplier: 1 },
        ],
        materials: [
            { id: 'mat-black', name: 'Hitam Classic', weight: '', pricePerUnit: 0, description: 'Warna hitam standar' },
            { id: 'mat-color', name: 'Warna Warni', weight: '', pricePerUnit: 5000, description: 'Mix warna cerah' },
        ],
        printSides: [
            { id: 'side-na', name: 'N/A', code: '-', priceMultiplier: 1 },
        ],
        finishings: [],
        quantityTiers: [
            { minQty: 1, maxQty: 4, pricePerUnit: 28000 },
            { minQty: 5, maxQty: 9, pricePerUnit: 26000 },
            { minQty: 10, maxQty: 99999, pricePerUnit: 25000 },
        ],
        isBestSeller: false,
        isPromo: false,
        minOrderQty: 1,
        estimatedDays: 1,
        weightPerPiece: 150,
        isRetailProduct: true,
        requiresDesignFile: false,
        allowedFileTypes: [],
        maxFileSize: 0,
    },
];

// Shipping Methods
export const shippingMethods: ShippingMethod[] = [
    {
        id: 'ship-1',
        name: 'JNE REG',
        provider: 'JNE',
        estimatedDays: '2-3 hari',
        price: 15000,
    },
    {
        id: 'ship-2',
        name: 'JNE YES',
        provider: 'JNE',
        estimatedDays: '1-2 hari',
        price: 25000,
    },
    {
        id: 'ship-3',
        name: 'GoSend Instant',
        provider: 'Gojek',
        estimatedDays: 'Hari ini',
        price: 35000,
    },
    {
        id: 'ship-4',
        name: 'GrabExpress',
        provider: 'Grab',
        estimatedDays: 'Hari ini',
        price: 35000,
    },
    {
        id: 'ship-5',
        name: 'Ambil Sendiri',
        provider: 'Self Pickup',
        estimatedDays: 'Langsung',
        price: 0,
    },
];

// Payment Methods
export const paymentMethods: PaymentMethod[] = [
    {
        id: 'pay-1',
        name: 'BCA Virtual Account',
        type: 'virtual_account',
        icon: '🏦',
        instructions: 'Transfer ke Virtual Account BCA yang tertera',
    },
    {
        id: 'pay-2',
        name: 'Mandiri Virtual Account',
        type: 'virtual_account',
        icon: '🏦',
        instructions: 'Transfer ke Virtual Account Mandiri yang tertera',
    },
    {
        id: 'pay-3',
        name: 'BNI Virtual Account',
        type: 'virtual_account',
        icon: '🏦',
        instructions: 'Transfer ke Virtual Account BNI yang tertera',
    },
    {
        id: 'pay-4',
        name: 'QRIS',
        type: 'qris',
        icon: '📱',
        instructions: 'Scan QR Code dengan aplikasi e-wallet Anda',
    },
    {
        id: 'pay-5',
        name: 'GoPay',
        type: 'ewallet',
        icon: '💚',
        instructions: 'Bayar dengan GoPay',
    },
    {
        id: 'pay-6',
        name: 'OVO',
        type: 'ewallet',
        icon: '💜',
        instructions: 'Bayar dengan OVO',
    },
    {
        id: 'pay-7',
        name: 'Transfer Bank Manual',
        type: 'bank_transfer',
        icon: '🏧',
        instructions: 'Transfer ke rekening BCA 1234567890 a.n. PT PrintMaster',
    },
];

// Banner/Promo Data
export const heroBanners = [
    {
        id: 'banner-1',
        title: 'Diskon 20% Semua Produk Brosur',
        subtitle: 'Gunakan kode BROSUR20 saat checkout',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200',
        ctaText: 'Pesan Sekarang',
        ctaLink: '/kategori/brosur-flyer',
        gradient: 'linear-gradient(135deg, #0066e6 0%, #003d80 100%)',
    },
    {
        id: 'banner-2',
        title: 'Kartu Nama Premium',
        subtitle: 'Mulai dari Rp 250/lembar dengan finishing eksklusif',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200',
        ctaText: 'Lihat Produk',
        ctaLink: '/kategori/kartu-nama',
        gradient: 'linear-gradient(135deg, #ff8f00 0%, #cc6600 100%)',
    },
    {
        id: 'banner-3',
        title: 'X-Banner Promo',
        subtitle: 'Gratis stand untuk pembelian minimal 10 pcs',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
        ctaText: 'Promo Terbatas',
        ctaLink: '/kategori/banner-spanduk',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
];

// Helper functions
export const getProductsByCategory = (categoryId: string): Product[] => {
    return products.filter(p => p.categoryId === categoryId);
};

export const getProductBySlug = (slug: string): Product | undefined => {
    return products.find(p => p.slug === slug);
};

export const getCategoryBySlug = (slug: string): ProductCategory | undefined => {
    return categories.find(c => c.slug === slug);
};

export const getBestSellerProducts = (): Product[] => {
    return products.filter(p => p.isBestSeller);
};

export const getPromoProducts = (): Product[] => {
    return products.filter(p => p.isPromo);
};

export const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.shortDescription.toLowerCase().includes(lowerQuery)
    );
};

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};
