import type { Product, ProductCategory, ShippingMethod, PaymentMethod } from '../types';

export const categories: ProductCategory[] = [
    {
        id: 'cat-1',
        nama: 'Brosur & Flyer',
        slug: 'brosur-flyer',
        ikon: 'Newspaper',
        deskripsi: 'Brosur dan flyer berkualitas tinggi untuk promosi bisnis Anda',
        gambar: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400',
        jumlah_produk: 12,
    },
    {
        id: 'cat-2',
        nama: 'Kartu Nama',
        slug: 'kartu-nama',
        ikon: 'CreditCard',
        deskripsi: 'Kartu nama profesional dengan berbagai finishing premium',
        gambar: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400',
        jumlah_produk: 8,
    },
    {
        id: 'cat-3',
        nama: 'Banner & Spanduk',
        slug: 'banner-spanduk',
        ikon: 'Flag',
        deskripsi: 'Banner dan spanduk outdoor/indoor dengan bahan tahan lama',
        gambar: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        jumlah_produk: 15,
    },
    {
        id: 'cat-4',
        nama: 'Poster & Print A3+',
        slug: 'poster-print',
        ikon: 'Image',
        deskripsi: 'Cetak poster dan foto ukuran besar dengan kualitas tinggi',
        gambar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
        jumlah_produk: 10,
    },
    {
        id: 'cat-5',
        nama: 'Undangan',
        slug: 'undangan',
        ikon: 'Heart',
        deskripsi: 'Undangan pernikahan, ulang tahun, dan acara spesial lainnya',
        gambar: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=400',
        jumlah_produk: 20,
    },
    {
        id: 'cat-6',
        nama: 'Kop Surat & Amplop',
        slug: 'kop-surat-amplop',
        ikon: 'FileText',
        deskripsi: 'Kop surat dan amplop profesional untuk kebutuhan bisnis',
        gambar: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400',
        jumlah_produk: 6,
    },
    {
        id: 'cat-7',
        nama: 'Stiker & Label',
        slug: 'stiker-label',
        ikon: 'Tag',
        deskripsi: 'Stiker dan label custom untuk produk dan kemasan',
        gambar: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=400',
        jumlah_produk: 14,
    },
    {
        id: 'cat-8',
        nama: 'Kalender',
        slug: 'kalender',
        ikon: 'Calendar',
        deskripsi: 'Kalender custom untuk personal dan corporate gift',
        gambar: 'https://images.unsplash.com/photo-1506784926709-22f1ec395907?w=400',
        jumlah_produk: 5,
    },
    {
        id: 'cat-9',
        nama: 'ATK & Perlengkapan',
        slug: 'atk-perlengkapan',
        ikon: 'Pencil',
        deskripsi: 'Alat tulis kantor dan perlengkapan kerja berkualitas',
        gambar: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400',
        jumlah_produk: 15,
    },
    {
        id: 'cat-10',
        nama: 'Aksesoris Kantor',
        slug: 'aksesoris-kantor',
        ikon: 'Paperclip',
        deskripsi: 'Aksesoris dan perlengkapan penunjang produktivitas',
        gambar: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400',
        jumlah_produk: 12,
    },
];

export const products: Product[] = [
    {
        id: 'prod-1',
        nama: 'Brosur A5 Premium',
        slug: 'brosur-a5-premium',
        kategori_id: 'cat-1',
        deskripsi: `Brosur A5 premium dengan kualitas cetak terbaik. Cocok untuk promosi produk, layanan, atau event Anda. 
    
Keunggulan:
- Warna cetak tajam dan akurat
- Bahan kertas premium pilihan
- Finishing profesional
- Gratis desain template`,
        deskripsi_singkat: 'Brosur A5 dengan finishing premium untuk promosi bisnis',
        gambar: [
            'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600',
            'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=600',
        ],
        harga_dasar: 500,
        ukuran: [
            { id: 'size-a5', name: 'A5 (148 x 210 mm)', width: 148, height: 210, priceMultiplier: 1 },
            { id: 'size-a4', name: 'A4 (210 x 297 mm)', width: 210, height: 297, priceMultiplier: 1.5 },
            { id: 'size-a3', name: 'A3 (297 x 420 mm)', width: 297, height: 420, priceMultiplier: 2.5 },
            { id: 'size-custom', name: 'Custom Size', width: 0, height: 0, priceMultiplier: 1 },
        ],
        bahan: [
            { id: 'mat-art-paper-120', name: 'Art Paper', weight: '120gr', pricePerUnit: 200, description: 'Kertas glossy standar' },
            { id: 'mat-art-carton-190', name: 'Art Carton', weight: '190gr', pricePerUnit: 350, description: 'Kertas tebal semi-glossy' },
            { id: 'mat-art-carton-210', name: 'Art Carton', weight: '210gr', pricePerUnit: 450, description: 'Kertas tebal premium' },
            { id: 'mat-art-carton-260', name: 'Art Carton', weight: '260gr', pricePerUnit: 600, description: 'Kertas paling tebal dan kokoh' },
        ],
        sisi_cetak: [
            { id: 'side-1', name: '1 Sisi', code: '4/0', priceMultiplier: 1 },
            { id: 'side-2', name: '2 Sisi (Bolak-balik)', code: '4/4', priceMultiplier: 1.8 },
        ],
        finishing: [
            { id: 'fin-lam-doff', name: 'Laminasi Doff', type: 'laminating', price: 150, description: 'Finishing matte yang elegan' },
            { id: 'fin-lam-glossy', name: 'Laminasi Glossy', type: 'laminating', price: 150, description: 'Finishing mengkilap dan hidup' },
            { id: 'fin-potong', name: 'Potong/Die Cut', type: 'cutting', price: 200, description: 'Potong sesuai bentuk desain' },
            { id: 'fin-lipat-1', name: 'Lipat 1x', type: 'folding', price: 50, description: 'Lipatan tengah' },
            { id: 'fin-lipat-2', name: 'Lipat 2x (Z-Fold)', type: 'folding', price: 100, description: 'Lipatan Z atau accordion' },
        ],
        tier_jumlah: [
            { minQty: 100, maxQty: 249, pricePerUnit: 700 },
            { minQty: 250, maxQty: 499, pricePerUnit: 600 },
            { minQty: 500, maxQty: 999, pricePerUnit: 500 },
            { minQty: 1000, maxQty: 2499, pricePerUnit: 400 },
            { minQty: 2500, maxQty: 4999, pricePerUnit: 350 },
            { minQty: 5000, maxQty: 99999, pricePerUnit: 300 },
        ],
        terlaris: true,
        promo: true,
        persen_promo: 15,
        min_pesan: 100,
        estimasi_hari: 3,
        berat_per_pcs: 5,
        tipe_file_diperbolehkan: ['pdf', 'jpg', 'jpeg', 'png', 'tiff'],
        ukuran_file_maks: 50,
    },
    {
        id: 'prod-2',
        nama: 'Kartu Nama Premium',
        slug: 'kartu-nama-premium',
        kategori_id: 'cat-2',
        deskripsi: `Kartu nama premium dengan berbagai pilihan material dan finishing eksklusif. Berikan kesan profesional dengan kartu nama berkualitas tinggi.`,
        deskripsi_singkat: 'Kartu nama dengan finishing eksklusif dan material premium',
        gambar: [
            'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600',
            'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600',
        ],
        harga_dasar: 300,
        ukuran: [
            { id: 'size-std', name: 'Standard (9 x 5.5 cm)', width: 90, height: 55, priceMultiplier: 1 },
            { id: 'size-us', name: 'US Standard (8.5 x 5 cm)', width: 85, height: 50, priceMultiplier: 1 },
            { id: 'size-sq', name: 'Square (5.5 x 5.5 cm)', width: 55, height: 55, priceMultiplier: 1.2 },
        ],
        bahan: [
            { id: 'mat-ac-260', name: 'Art Carton', weight: '260gr', pricePerUnit: 200, description: 'Standard business card' },
            { id: 'mat-ac-310', name: 'Art Carton', weight: '310gr', pricePerUnit: 350, description: 'Tebal dan kokoh' },
            { id: 'mat-linen', name: 'Linen', weight: '250gr', pricePerUnit: 500, description: 'Tekstur kain eksklusif' },
            { id: 'mat-kraft', name: 'Brown Kraft', weight: '300gr', pricePerUnit: 400, description: 'Tampilan natural rustic' },
        ],
        sisi_cetak: [
            { id: 'side-1', name: '1 Sisi', code: '4/0', priceMultiplier: 1 },
            { id: 'side-2', name: '2 Sisi', code: '4/4', priceMultiplier: 1.6 },
        ],
        finishing: [
            { id: 'fin-lam-doff', name: 'Laminasi Doff', type: 'laminating', price: 50, description: 'Finishing matte' },
            { id: 'fin-lam-glossy', name: 'Laminasi Glossy', type: 'laminating', price: 50, description: 'Finishing mengkilap' },
            { id: 'fin-spot-uv', name: 'Spot UV', type: 'other', price: 150, description: 'UV coating pada area tertentu' },
            { id: 'fin-emboss', name: 'Emboss/Deboss', type: 'other', price: 200, description: 'Efek timbul/cekung' },
            { id: 'fin-foil', name: 'Hot Foil Stamping', type: 'other', price: 300, description: 'Foil emas/silver' },
            { id: 'fin-round', name: 'Rounded Corner', type: 'cutting', price: 30, description: 'Sudut melengkung' },
        ],
        tier_jumlah: [
            { minQty: 100, maxQty: 249, pricePerUnit: 500 },
            { minQty: 250, maxQty: 499, pricePerUnit: 400 },
            { minQty: 500, maxQty: 999, pricePerUnit: 300 },
            { minQty: 1000, maxQty: 99999, pricePerUnit: 250 },
        ],
        terlaris: true,
        promo: false,
        min_pesan: 100,
        estimasi_hari: 2,
        berat_per_pcs: 3,
        tipe_file_diperbolehkan: ['pdf', 'jpg', 'jpeg', 'png', 'ai', 'psd'],
        ukuran_file_maks: 30,
    },
    {
        id: 'prod-3',
        nama: 'X-Banner Indoor',
        slug: 'x-banner-indoor',
        kategori_id: 'cat-3',
        deskripsi: `X-Banner berkualitas tinggi untuk promosi indoor. Mudah dipasang dan portable, cocok untuk pameran, seminar, atau toko.`,
        deskripsi_singkat: 'X-Banner portable untuk promosi indoor',
        gambar: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        ],
        harga_dasar: 50000,
        ukuran: [
            { id: 'size-60x160', name: '60 x 160 cm', width: 600, height: 1600, priceMultiplier: 1 },
            { id: 'size-80x180', name: '80 x 180 cm', width: 800, height: 1800, priceMultiplier: 1.3 },
            { id: 'size-80x200', name: '80 x 200 cm', width: 800, height: 2000, priceMultiplier: 1.5 },
        ],
        bahan: [
            { id: 'mat-albatros', name: 'Albatros', weight: '280gr', pricePerUnit: 50000, description: 'Bahan standar indoor' },
            { id: 'mat-flexy', name: 'Flexy China', weight: '340gr', pricePerUnit: 75000, description: 'Lebih tebal dan tahan lama' },
            { id: 'mat-korean', name: 'Korean Flexy', weight: '440gr', pricePerUnit: 100000, description: 'Kualitas premium' },
        ],
        sisi_cetak: [
            { id: 'side-1', name: '1 Sisi', code: '4/0', priceMultiplier: 1 },
        ],
        finishing: [
            { id: 'fin-stand-eco', name: 'Stand Ekonomis', type: 'other', price: 35000, description: 'Stand X-Banner standar' },
            { id: 'fin-stand-premium', name: 'Stand Premium', type: 'other', price: 75000, description: 'Stand kokoh dan tahan lama' },
        ],
        tier_jumlah: [
            { minQty: 1, maxQty: 4, pricePerUnit: 85000 },
            { minQty: 5, maxQty: 9, pricePerUnit: 75000 },
            { minQty: 10, maxQty: 24, pricePerUnit: 65000 },
            { minQty: 25, maxQty: 99999, pricePerUnit: 55000 },
        ],
        terlaris: false,
        promo: true,
        persen_promo: 20,
        min_pesan: 1,
        estimasi_hari: 2,
        berat_per_pcs: 500,
        tipe_file_diperbolehkan: ['pdf', 'jpg', 'jpeg', 'png', 'ai', 'psd', 'tiff'],
        ukuran_file_maks: 100,
    },
    {
        id: 'prod-4',
        nama: 'Poster A3+ Photo Paper',
        slug: 'poster-a3-plus-photo-paper',
        kategori_id: 'cat-4',
        deskripsi: `Cetak poster dan foto ukuran A3+ dengan kualitas foto premium. Warna tajam dan detail tinggi, cocok untuk dekorasi atau display.`,
        deskripsi_singkat: 'Cetak poster A3+ dengan kualitas foto premium',
        gambar: [
            'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
        ],
        harga_dasar: 25000,
        ukuran: [
            { id: 'size-a3plus', name: 'A3+ (32 x 48 cm)', width: 320, height: 480, priceMultiplier: 1 },
            { id: 'size-a2', name: 'A2 (42 x 60 cm)', width: 420, height: 600, priceMultiplier: 1.8 },
            { id: 'size-a1', name: 'A1 (60 x 84 cm)', width: 600, height: 840, priceMultiplier: 3 },
        ],
        bahan: [
            { id: 'mat-photo-glossy', name: 'Photo Paper Glossy', weight: '200gr', pricePerUnit: 15000, description: 'Glossy seperti foto studio' },
            { id: 'mat-photo-luster', name: 'Photo Paper Luster', weight: '260gr', pricePerUnit: 20000, description: 'Semi-matte premium' },
            { id: 'mat-canvas', name: 'Canvas Art', weight: '380gr', pricePerUnit: 50000, description: 'Tekstur kanvas artistik' },
        ],
        sisi_cetak: [
            { id: 'side-1', name: '1 Sisi', code: '4/0', priceMultiplier: 1 },
        ],
        finishing: [
            { id: 'fin-lam-doff', name: 'Laminasi Doff', type: 'laminating', price: 10000, description: 'Perlindungan matte' },
            { id: 'fin-lam-glossy', name: 'Laminasi Glossy', type: 'laminating', price: 10000, description: 'Perlindungan glossy' },
            { id: 'fin-mount', name: 'Mounting Foam Board', type: 'other', price: 25000, description: 'Ditempelkan di foam board' },
            { id: 'fin-frame', name: 'Bingkai Minimalis', type: 'other', price: 75000, description: 'Frame kayu/aluminium' },
        ],
        tier_jumlah: [
            { minQty: 1, maxQty: 4, pricePerUnit: 35000 },
            { minQty: 5, maxQty: 9, pricePerUnit: 30000 },
            { minQty: 10, maxQty: 24, pricePerUnit: 25000 },
            { minQty: 25, maxQty: 99999, pricePerUnit: 20000 },
        ],
        terlaris: true,
        promo: false,
        min_pesan: 1,
        estimasi_hari: 1,
        berat_per_pcs: 50,
        tipe_file_diperbolehkan: ['pdf', 'jpg', 'jpeg', 'png', 'tiff'],
        ukuran_file_maks: 100,
    },
    {
        id: 'prod-5',
        nama: 'Stiker Vinyl Outdoor',
        slug: 'stiker-vinyl-outdoor',
        kategori_id: 'cat-7',
        deskripsi: `Stiker vinyl tahan air dan UV untuk outdoor. Cocok untuk branding kendaraan, signage, atau promosi outdoor lainnya.`,
        deskripsi_singkat: 'Stiker vinyl tahan air dan UV untuk outdoor',
        gambar: [
            'https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=600',
        ],
        harga_dasar: 50,
        ukuran: [
            { id: 'size-a5', name: 'A5 (148 x 210 mm)', width: 148, height: 210, priceMultiplier: 1 },
            { id: 'size-a4', name: 'A4 (210 x 297 mm)', width: 210, height: 297, priceMultiplier: 1.8 },
            { id: 'size-a3', name: 'A3 (297 x 420 mm)', width: 297, height: 420, priceMultiplier: 3 },
            { id: 'size-custom', name: 'Custom Size', width: 0, height: 0, priceMultiplier: 1 },
        ],
        bahan: [
            { id: 'mat-vinyl-std', name: 'Vinyl Standar', weight: '100mic', pricePerUnit: 2000, description: 'Outdoor 1-2 tahun' },
            { id: 'mat-vinyl-pre', name: 'Vinyl Premium', weight: '120mic', pricePerUnit: 3500, description: 'Outdoor 3-5 tahun' },
            { id: 'mat-vinyl-tra', name: 'Vinyl Transparan', weight: '100mic', pricePerUnit: 4000, description: 'Tembus pandang' },
        ],
        sisi_cetak: [
            { id: 'side-1', name: '1 Sisi', code: '4/0', priceMultiplier: 1 },
        ],
        finishing: [
            { id: 'fin-kiss-cut', name: 'Kiss Cut', type: 'cutting', price: 500, description: 'Potong stiker, bukan backing' },
            { id: 'fin-die-cut', name: 'Die Cut', type: 'cutting', price: 1000, description: 'Potong sesuai bentuk desain' },
            { id: 'fin-lam-uv', name: 'Laminasi UV Protection', type: 'laminating', price: 1500, description: 'Perlindungan ekstra' },
        ],
        tier_jumlah: [
            { minQty: 10, maxQty: 49, pricePerUnit: 5000 },
            { minQty: 50, maxQty: 99, pricePerUnit: 4000 },
            { minQty: 100, maxQty: 499, pricePerUnit: 3000 },
            { minQty: 500, maxQty: 99999, pricePerUnit: 2000 },
        ],
        terlaris: false,
        promo: true,
        persen_promo: 10,
        min_pesan: 10,
        estimasi_hari: 2,
        berat_per_pcs: 10,
        tipe_file_diperbolehkan: ['pdf', 'jpg', 'jpeg', 'png', 'ai', 'svg'],
        ukuran_file_maks: 50,
    },
    {
        id: 'prod-6',
        nama: 'Undangan Hardcover Premium',
        slug: 'undangan-hardcover-premium',
        kategori_id: 'cat-5',
        deskripsi: `Undangan pernikahan hardcover dengan desain mewah dan elegan. Tersedia berbagai pilihan finishing eksklusif untuk momen spesial Anda.`,
        deskripsi_singkat: 'Undangan hardcover mewah untuk momen spesial',
        gambar: [
            'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=600',
        ],
        harga_dasar: 15000,
        ukuran: [
            { id: 'size-std', name: 'Standard (15 x 15 cm)', width: 150, height: 150, priceMultiplier: 1 },
            { id: 'size-dl', name: 'DL (10 x 21 cm)', width: 100, height: 210, priceMultiplier: 1.1 },
            { id: 'size-a5', name: 'A5 (15 x 21 cm)', width: 150, height: 210, priceMultiplier: 1.3 },
        ],
        bahan: [
            { id: 'mat-hc-std', name: 'Hardcover Standard', weight: '', pricePerUnit: 20000, description: 'Cover 2mm + isi art carton' },
            { id: 'mat-hc-lux', name: 'Hardcover Luxury', weight: '', pricePerUnit: 35000, description: 'Cover 3mm + isi premium' },
            { id: 'mat-hc-vel', name: 'Hardcover Velvet', weight: '', pricePerUnit: 50000, description: 'Cover velvet + insert' },
        ],
        sisi_cetak: [
            { id: 'side-2', name: 'Full Color', code: '4/4', priceMultiplier: 1 },
        ],
        finishing: [
            { id: 'fin-foil-gold', name: 'Foil Emas', type: 'other', price: 5000, description: 'Nama pengantin foil emas' },
            { id: 'fin-foil-silver', name: 'Foil Silver', type: 'other', price: 5000, description: 'Nama pengantin foil silver' },
            { id: 'fin-emboss', name: 'Emboss', type: 'other', price: 3000, description: 'Efek timbul pada cover' },
            { id: 'fin-ribbon', name: 'Pita/Ribbon', type: 'other', price: 2000, description: 'Pita satin untuk pengikat' },
            { id: 'fin-box', name: 'Box Kemasan', type: 'other', price: 10000, description: 'Box eksklusif per undangan' },
        ],
        tier_jumlah: [
            { minQty: 50, maxQty: 99, pricePerUnit: 50000 },
            { minQty: 100, maxQty: 199, pricePerUnit: 45000 },
            { minQty: 200, maxQty: 499, pricePerUnit: 40000 },
            { minQty: 500, maxQty: 99999, pricePerUnit: 35000 },
        ],
        terlaris: false,
        promo: false,
        min_pesan: 50,
        estimasi_hari: 7,
        berat_per_pcs: 100,
        tipe_file_diperbolehkan: ['pdf', 'jpg', 'jpeg', 'png', 'ai', 'psd'],
        ukuran_file_maks: 50,
    },
    {
        id: 'prod-7',
        nama: 'Kertas HVS A4 80gr',
        slug: 'kertas-hvs-a4-80gr',
        kategori_id: 'cat-9',
        deskripsi: `Kertas HVS A4 berkualitas tinggi untuk kebutuhan cetak dan fotokopi sehari-hari. Kertas putih bersih dengan kualitas premium, cocok untuk dokumen kantor, laporan, dan keperluan cetak lainnya.

Spesifikasi:
- Ukuran: A4 (210 x 297 mm)
- Gramatur: 80 gsm
- Brightness: 95%
- Isi: 500 lembar per rim`,
        deskripsi_singkat: 'Kertas HVS A4 80gr 1 Rim (500 lembar) kualitas premium',
        gambar: [
            'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600',
        ],
        harga_dasar: 45000,
        ukuran: [
            { id: 'size-a4', name: 'A4 (210 x 297 mm)', width: 210, height: 297, priceMultiplier: 1 },
        ],
        bahan: [
            { id: 'mat-80gr', name: 'HVS 80gr', weight: '80gr', pricePerUnit: 0, description: 'Standard office paper' },
        ],
        sisi_cetak: [
            { id: 'side-na', name: 'N/A', code: '-', priceMultiplier: 1 },
        ],
        finishing: [],
        tier_jumlah: [
            { minQty: 1, maxQty: 4, pricePerUnit: 55000 },
            { minQty: 5, maxQty: 9, pricePerUnit: 50000 },
            { minQty: 10, maxQty: 24, pricePerUnit: 47000 },
            { minQty: 25, maxQty: 99999, pricePerUnit: 45000 },
        ],
        terlaris: true,
        promo: false,
        min_pesan: 1,
        estimasi_hari: 1,
        berat_per_pcs: 2500,
        produk_retail: true,
        butuh_file_desain: false,
        tipe_file_diperbolehkan: [],
        ukuran_file_maks: 0,
    },
    {
        id: 'prod-8',
        nama: 'Pulpen Gel 0.5mm (Box 12pcs)',
        slug: 'pulpen-gel-05mm-box',
        kategori_id: 'cat-9',
        deskripsi: `Pulpen gel berkualitas tinggi dengan ujung 0.5mm untuk tulisan halus dan presisi. Tinta smooth tanpa skip, nyaman digunakan untuk menulis lama.

Keunggulan:
- Tinta gel super smooth
- Quick dry - tidak mudah smear
- Ergonomic grip
- Isi: 12 pcs/box`,
        deskripsi_singkat: 'Pulpen gel 0.5mm 1 Box (12 pcs) tinta hitam',
        gambar: [
            'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=600',
        ],
        harga_dasar: 35000,
        ukuran: [
            { id: 'size-std', name: 'Standard', width: 0, height: 0, priceMultiplier: 1 },
        ],
        bahan: [
            { id: 'mat-black', name: 'Tinta Hitam', weight: '', pricePerUnit: 0, description: 'Warna tinta hitam' },
            { id: 'mat-blue', name: 'Tinta Biru', weight: '', pricePerUnit: 0, description: 'Warna tinta biru' },
            { id: 'mat-red', name: 'Tinta Merah', weight: '', pricePerUnit: 0, description: 'Warna tinta merah' },
        ],
        sisi_cetak: [
            { id: 'side-na', name: 'N/A', code: '-', priceMultiplier: 1 },
        ],
        finishing: [],
        tier_jumlah: [
            { minQty: 1, maxQty: 2, pricePerUnit: 42000 },
            { minQty: 3, maxQty: 5, pricePerUnit: 38000 },
            { minQty: 6, maxQty: 11, pricePerUnit: 36000 },
            { minQty: 12, maxQty: 99999, pricePerUnit: 35000 },
        ],
        terlaris: false,
        promo: true,
        persen_promo: 15,
        min_pesan: 1,
        estimasi_hari: 1,
        berat_per_pcs: 200,
        produk_retail: true,
        butuh_file_desain: false,
        tipe_file_diperbolehkan: [],
        ukuran_file_maks: 0,
    },
    {
        id: 'prod-9',
        nama: 'Stapler HD-10 + Isi Staples',
        slug: 'stapler-hd10-isi-staples',
        kategori_id: 'cat-10',
        deskripsi: `Stapler heavy duty HD-10 dengan kapasitas 20 lembar. Dilengkapi dengan 1 box isi staples no.10 (1000 pcs). Desain ergonomis dan tahan lama untuk penggunaan kantor sehari-hari.

Spesifikasi:
- Kapasitas: 20 lembar kertas 80gr
- Material: Metal + Plastik ABS
- Include: 1 box staples No.10 (1000 pcs)`,
        deskripsi_singkat: 'Stapler HD-10 kapasitas 20 lembar + bonus isi staples',
        gambar: [
            'https://images.unsplash.com/photo-1568209865332-a15790aed756?w=600',
        ],
        harga_dasar: 35000,
        ukuran: [
            { id: 'size-std', name: 'Standard', width: 0, height: 0, priceMultiplier: 1 },
        ],
        bahan: [
            { id: 'mat-black', name: 'Warna Hitam', weight: '', pricePerUnit: 0, description: 'Body warna hitam' },
            { id: 'mat-blue', name: 'Warna Biru', weight: '', pricePerUnit: 0, description: 'Body warna biru' },
        ],
        sisi_cetak: [
            { id: 'side-na', name: 'N/A', code: '-', priceMultiplier: 1 },
        ],
        finishing: [],
        tier_jumlah: [
            { minQty: 1, maxQty: 4, pricePerUnit: 42000 },
            { minQty: 5, maxQty: 9, pricePerUnit: 38000 },
            { minQty: 10, maxQty: 99999, pricePerUnit: 35000 },
        ],
        terlaris: false,
        promo: false,
        min_pesan: 1,
        estimasi_hari: 1,
        berat_per_pcs: 250,
        produk_retail: true,
        butuh_file_desain: false,
        tipe_file_diperbolehkan: [],
        ukuran_file_maks: 0,
    },
    {
        id: 'prod-10',
        nama: 'Desk Organizer Multifungsi',
        slug: 'desk-organizer-multifungsi',
        kategori_id: 'cat-10',
        deskripsi: `Desk organizer multifungsi dengan berbagai kompartemen untuk menyimpan alat tulis, gadget, dan perlengkapan kantor. Desain modern minimalis yang cocok untuk meja kerja profesional.

Fitur:
- Slot smartphone/tablet
- Kompartemen pulpen dan pensil
- Laci kecil untuk paper clip, binder, dll
- Tempat sticky notes
- Material: Mesh Metal Premium`,
        deskripsi_singkat: 'Desk organizer mesh metal dengan multi kompartemen',
        gambar: [
            'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600',
        ],
        harga_dasar: 85000,
        ukuran: [
            { id: 'size-std', name: 'Standard', width: 0, height: 0, priceMultiplier: 1 },
        ],
        bahan: [
            { id: 'mat-black', name: 'Hitam', weight: '', pricePerUnit: 0, description: 'Warna hitam elegan' },
            { id: 'mat-silver', name: 'Silver', weight: '', pricePerUnit: 5000, description: 'Warna silver modern' },
            { id: 'mat-rosegold', name: 'Rose Gold', weight: '', pricePerUnit: 10000, description: 'Warna rose gold premium' },
        ],
        sisi_cetak: [
            { id: 'side-na', name: 'N/A', code: '-', priceMultiplier: 1 },
        ],
        finishing: [],
        tier_jumlah: [
            { minQty: 1, maxQty: 2, pricePerUnit: 95000 },
            { minQty: 3, maxQty: 5, pricePerUnit: 90000 },
            { minQty: 6, maxQty: 99999, pricePerUnit: 85000 },
        ],
        terlaris: true,
        promo: false,
        min_pesan: 1,
        estimasi_hari: 1,
        berat_per_pcs: 500,
        produk_retail: true,
        butuh_file_desain: false,
        tipe_file_diperbolehkan: [],
        ukuran_file_maks: 0,
    },
    {
        id: 'prod-11',
        nama: 'Binder Clip Set (3 Ukuran)',
        slug: 'binder-clip-set-3-ukuran',
        kategori_id: 'cat-10',
        deskripsi: `Set binder clip lengkap dengan 3 ukuran berbeda untuk berbagai kebutuhan. Material logam premium dengan finishing anti karat.

Isi Paket:
- 12 pcs Binder Clip Small (19mm)
- 8 pcs Binder Clip Medium (32mm)  
- 4 pcs Binder Clip Large (51mm)
Total: 24 pcs`,
        deskripsi_singkat: 'Binder clip metal set 24 pcs (3 ukuran)',
        gambar: [
            'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600',
        ],
        harga_dasar: 25000,
        ukuran: [
            { id: 'size-std', name: 'Set 24 pcs', width: 0, height: 0, priceMultiplier: 1 },
        ],
        bahan: [
            { id: 'mat-black', name: 'Hitam Classic', weight: '', pricePerUnit: 0, description: 'Warna hitam standar' },
            { id: 'mat-color', name: 'Warna Warni', weight: '', pricePerUnit: 5000, description: 'Mix warna cerah' },
        ],
        sisi_cetak: [
            { id: 'side-na', name: 'N/A', code: '-', priceMultiplier: 1 },
        ],
        finishing: [],
        tier_jumlah: [
            { minQty: 1, maxQty: 4, pricePerUnit: 28000 },
            { minQty: 5, maxQty: 9, pricePerUnit: 26000 },
            { minQty: 10, maxQty: 99999, pricePerUnit: 25000 },
        ],
        terlaris: false,
        promo: false,
        min_pesan: 1,
        estimasi_hari: 1,
        berat_per_pcs: 150,
        produk_retail: true,
        butuh_file_desain: false,
        tipe_file_diperbolehkan: [],
        ukuran_file_maks: 0,
    },
];

export const shippingMethods: ShippingMethod[] = [
    {
        id: 'ship-1',
        nama: 'JNE REG',
        kurir: 'JNE',
        estimasi_hari: '2-3 hari',
        price: 15000,
    },
    {
        id: 'ship-2',
        nama: 'JNE YES',
        kurir: 'JNE',
        estimasi_hari: '1-2 hari',
        price: 25000,
    },
    {
        id: 'ship-3',
        nama: 'GoSend Instant',
        kurir: 'Gojek',
        estimasi_hari: 'Hari ini',
        price: 35000,
    },
    {
        id: 'ship-4',
        nama: 'GrabExpress',
        kurir: 'Grab',
        estimasi_hari: 'Hari ini',
        price: 35000,
    },
    {
        id: 'ship-5',
        nama: 'Ambil Sendiri',
        kurir: 'Self Pickup',
        estimasi_hari: 'Langsung',
        price: 0,
    },
];

export const paymentMethods: PaymentMethod[] = [
    {
        id: 'pay-1',
        nama: 'BCA Virtual Account',
        tipe: 'virtual_account',
        ikon: 'Building2',
        instructions: 'Transfer ke Virtual Account BCA yang tertera',
    },
    {
        id: 'pay-2',
        nama: 'Mandiri Virtual Account',
        tipe: 'virtual_account',
        ikon: 'Building2',
        instructions: 'Transfer ke Virtual Account Mandiri yang tertera',
    },
    {
        id: 'pay-3',
        nama: 'BNI Virtual Account',
        tipe: 'virtual_account',
        ikon: 'Building2',
        instructions: 'Transfer ke Virtual Account BNI yang tertera',
    },
    {
        id: 'pay-4',
        nama: 'QRIS',
        tipe: 'qris',
        ikon: 'QrCode',
        instructions: 'Scan QR Code dengan aplikasi e-wallet Anda',
    },
    {
        id: 'pay-5',
        nama: 'GoPay',
        tipe: 'ewallet',
        ikon: 'Wallet',
        instructions: 'Bayar dengan GoPay',
    },
    {
        id: 'pay-6',
        nama: 'OVO',
        tipe: 'ewallet',
        ikon: 'Wallet',
        instructions: 'Bayar dengan OVO',
    },
    {
        id: 'pay-7',
        nama: 'Transfer Bank Manual',
        tipe: 'bank_transfer',
        ikon: 'Landmark',
        instructions: 'Transfer ke rekening BCA 1234567890 a.n. Semanggi Print',
    },
];

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

export const getProductsByCategory = (categoryId: string): Product[] => {
    return products.filter(p => p.kategori_id === categoryId);
};

export const getProductBySlug = (slug: string): Product | undefined => {
    return products.find(p => p.slug === slug);
};

export const getCategoryBySlug = (slug: string): ProductCategory | undefined => {
    return categories.find(c => c.slug === slug);
};

export const getBestSellerProducts = (): Product[] => {
    return products.filter(p => p.terlaris);
};

export const getPromoProducts = (): Product[] => {
    return products.filter(p => p.promo);
};

export const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
        p.nama.toLowerCase().includes(lowerQuery) ||
        p.deskripsi.toLowerCase().includes(lowerQuery) ||
        p.deskripsi_singkat.toLowerCase().includes(lowerQuery)
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
