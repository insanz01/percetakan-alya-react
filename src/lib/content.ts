// Single source of truth for editable site content.
// Used by the admin CMS page (edit) and the public pages (read).
// Defaults mirror the current live site so nothing changes visually until
// a Super Admin edits it — they double as the fallback when the API is down.
import type { SettingsMap } from './settingService';

export interface HeroBanner { title: string; subtitle: string; ctaText: string; ctaLink: string; image: string; }
export interface Feature { title: string; description: string; }
export interface FaqItem { question: string; answer: string; category: string; }
export interface StatItem { value: string; label: string; }
export interface StoryContent { badge: string; title: string; image: string; paragraphs: string[]; }
export interface ValueItem { title: string; description: string; }
export interface AboutContent {
    title: string;
    body: string;
    stats: StatItem[];
    story: StoryContent;
    vision: string;
    mission: string[];
    values: ValueItem[];
}
export interface ContactContent {
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
    hours: string;
    maps: string;          // Google Maps iframe embed src
    addressTitle: string;
    addressLines: string[];
    mapsLink: string;      // "open in Google Maps" link
}
export interface FooterContent { description: string; instagram: string; facebook: string; tiktok: string; whatsapp: string; }

export interface SiteContent {
    hero_banners: HeroBanner[];
    features: Feature[];
    about: AboutContent;
    faq: FaqItem[];
    contact: ContactContent;
    footer: FooterContent;
}

// Setting key for each content field (group `content` in the backend)
export const CONTENT_KEYS = {
    hero_banners: 'content_hero_banners',
    features: 'content_features',
    about: 'content_about',
    faq: 'content_faq',
    contact: 'content_contact',
    footer: 'content_footer',
} as const;

export const contentDefaults: SiteContent = {
    hero_banners: [
        { title: 'Cetak Berkualitas, Harga Terjangkau', subtitle: 'Solusi percetakan terpercaya untuk bisnis dan personal Anda', ctaText: 'Mulai Pesan', ctaLink: '/kategori', image: '/gambar/banner/1.jpeg' },
        { title: 'Kualitas Terjamin', subtitle: 'Garansi cetak ulang jika hasil tidak sesuai ekspektasi Anda', ctaText: 'Lihat Produk', ctaLink: '/kategori', image: '/gambar/banner/2.jpeg' },
        { title: 'Express Printing', subtitle: 'Pengerjaan cepat 1-5 hari kerja untuk kebutuhan urgent', ctaText: 'Lihat Produk', ctaLink: '/kategori', image: '/gambar/banner/3.jpeg' },
    ],
    features: [
        { title: 'Pengiriman Cepat', description: 'Gratis Ongkir untuk pekerjaan tertentu' },
        { title: 'Kualitas Terjamin', description: 'Garansi cetak ulang jika tidak sesuai' },
        { title: 'Proses Cepat', description: 'Proses estimasi 1-5 hari kerja' },
        { title: 'Support 24/7', description: 'Tim support siap membantu' },
    ],
    about: {
        title: 'Mitra Percetakan Terpercaya untuk Bisnis Anda',
        body: 'Sejak 2014, Semanggi Print telah menjadi solusi percetakan online terlengkap dengan menggabungkan teknologi modern dan keahlian tradisional untuk menghasilkan produk cetak berkualitas tinggi.',
        stats: [
            { value: '10+', label: 'Tahun Pengalaman' },
            { value: '50K+', label: 'Pelanggan Puas' },
            { value: '500K+', label: 'Pesanan Selesai' },
            { value: '99%', label: 'Tingkat Kepuasan' },
        ],
        story: {
            badge: 'Cerita Kami',
            title: 'Dari Garasi ke Ribuan Pelanggan',
            image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=600',
            paragraphs: [
                'Semanggi Print didirikan dengan semangat untuk memberikan layanan percetakan berkualitas yang mudah dijangkau oleh semua kalangan. Berawal dari usaha kecil, kami kini melayani ribuan pelanggan dari seluruh Indonesia.',
                'Perjalanan kami tidak selalu mulus, namun dengan komitmen pada kualitas dan kepuasan pelanggan, kami terus berkembang. Saat ini, Semanggi Print memiliki fasilitas produksi modern dengan berbagai mesin cetak offset dan digital untuk memenuhi kebutuhan percetakan Anda.',
                'Kami percaya bahwa setiap bisnis, besar maupun kecil, berhak mendapatkan hasil cetakan berkualitas dengan harga yang terjangkau dan transparan.',
            ],
        },
        vision: 'Menjadi platform percetakan online nomor satu di Indonesia yang dikenal dengan kualitas premium, inovasi teknologi, dan layanan pelanggan terbaik.',
        mission: [
            'Menyediakan produk cetak berkualitas tinggi dengan harga kompetitif',
            'Menghadirkan pengalaman pemesanan yang mudah dan transparan',
            'Memberikan layanan pelanggan yang responsif dan solutif',
            'Mendukung pertumbuhan bisnis UMKM Indonesia',
        ],
        values: [
            { title: 'Kualitas Premium', description: 'Kami menggunakan mesin cetak terbaru dan bahan berkualitas tinggi untuk menghasilkan produk terbaik.' },
            { title: 'Tepat Waktu', description: 'Komitmen kami adalah menyelesaikan pesanan sesuai estimasi yang dijanjikan.' },
            { title: 'Garansi Kepuasan', description: 'Jika hasil tidak sesuai, kami akan cetak ulang tanpa biaya tambahan.' },
            { title: 'Harga Transparan', description: 'Tidak ada biaya tersembunyi. Harga yang Anda lihat adalah harga yang Anda bayar.' },
        ],
    },
    faq: [
        { category: 'Pemesanan', question: 'Bagaimana cara memesan produk di Semanggi Print?', answer: 'Untuk memesan produk, pilih produk yang diinginkan, tentukan spesifikasi (ukuran, bahan, jumlah), upload file desain Anda, lalu lanjutkan ke checkout. Setelah pembayaran dikonfirmasi, pesanan akan segera diproses.' },
        { category: 'Pemesanan', question: 'Berapa minimum order untuk setiap produk?', answer: 'Minimum order bervariasi tergantung jenis produk. Untuk brosur dan flyer umumnya mulai dari 100 lembar, kartu nama mulai dari 100 pcs, dan banner mulai dari 1 pcs. Detail minimum order dapat dilihat di halaman masing-masing produk.' },
        { category: 'Pemesanan', question: 'Apakah bisa pesan dalam jumlah besar?', answer: 'Tentu! Kami menerima pesanan dalam jumlah besar dengan harga khusus. Semakin banyak jumlah pesanan, semakin hemat harga per unitnya. Untuk pesanan khusus dalam jumlah sangat besar, silahkan hubungi tim sales kami.' },
        { category: 'Pembayaran', question: 'Metode pembayaran apa saja yang tersedia?', answer: 'Kami menerima pembayaran melalui Transfer Bank (BCA, Mandiri, BNI, BRI), Virtual Account, E-Wallet (OVO, GoPay, DANA, ShopeePay), dan QRIS. Semua metode pembayaran aman dan terverifikasi.' },
        { category: 'Pembayaran', question: 'Berapa lama batas waktu pembayaran?', answer: 'Batas waktu pembayaran adalah 24 jam setelah pesanan dibuat. Jika pembayaran tidak diterima dalam waktu tersebut, pesanan akan otomatis dibatalkan. Anda dapat membuat pesanan baru jika hal ini terjadi.' },
        { category: 'File Desain', question: 'Format file apa yang diterima?', answer: 'Kami menerima file dalam format PDF, AI, PSD, JPG, dan PNG. Untuk hasil terbaik, kami merekomendasikan menggunakan format PDF dengan resolusi minimal 300 DPI dan mode warna CMYK.' },
        { category: 'File Desain', question: 'Bagaimana jika saya tidak punya desain?', answer: 'Tidak perlu khawatir! Kami menyediakan layanan desain dengan biaya tambahan. Tim desainer profesional kami siap membantu mewujudkan ide Anda. Silahkan hubungi customer service untuk informasi lebih lanjut.' },
        { category: 'File Desain', question: 'Apakah file desain saya akan diperiksa sebelum cetak?', answer: 'Ya, tim kami akan memeriksa file desain Anda untuk memastikan kualitas cetak optimal. Jika ada masalah dengan file (resolusi rendah, warna tidak sesuai, dll), kami akan menghubungi Anda sebelum melanjutkan produksi.' },
        { category: 'Produksi & Pengiriman', question: 'Berapa lama proses produksi?', answer: 'Waktu produksi bervariasi tergantung jenis produk dan jumlah pesanan. Umumnya 3-7 hari kerja setelah file desain disetujui. Untuk pesanan urgent, kami menyediakan layanan express dengan biaya tambahan.' },
        { category: 'Produksi & Pengiriman', question: 'Ekspedisi apa yang digunakan?', answer: 'Kami bekerja sama dengan berbagai ekspedisi terpercaya seperti JNE, J&T, SiCepat, Anteraja, dan Pos Indonesia. Anda dapat memilih ekspedisi sesuai kebutuhan saat checkout.' },
        { category: 'Produksi & Pengiriman', question: 'Apakah bisa COD?', answer: 'Saat ini kami belum menyediakan layanan COD. Semua pesanan harus dibayar terlebih dahulu sebelum proses produksi dimulai. Hal ini untuk memastikan kelancaran produksi dan pengiriman.' },
        { category: 'Garansi & Retur', question: 'Apakah ada garansi untuk produk cetak?', answer: 'Ya, kami memberikan garansi 100% jika terjadi kesalahan cetak dari pihak kami atau produk tidak sesuai spesifikasi yang dipesan. Klaim garansi dapat diajukan maksimal 3 hari setelah produk diterima.' },
        { category: 'Garansi & Retur', question: 'Bagaimana jika produk rusak saat pengiriman?', answer: 'Jika produk rusak saat pengiriman, segera foto kondisi paket dan produk, lalu ajukan klaim melalui halaman akun atau hubungi customer service kami. Kami akan memproses pengiriman ulang tanpa biaya tambahan.' },
    ],
    contact: {
        address: 'Jl. A.Yani No.39, Palangka Raya, Kalteng',
        phone: '0813-1115-2071',
        email: 'rudygrafika@gmail.com',
        whatsapp: '6281311152071',
        hours: 'Senin - Sabtu: 08.00 - 17.00',
        maps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3985.5!2d113.9213!3d-2.2072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMTInMjUuOSJTIDExM8KwNTUnMTYuNyJF!5e0!3m2!1sid!2sid!4v1234567890!5m2!1sid!2sid&q=Jl.+A.Yani+No.39+Palangka+Raya+Kalimantan+Tengah',
        addressTitle: 'Kantor & Workshop',
        addressLines: [
            'Jl. A.Yani No.39',
            'Kelurahan Langkai, Kec. Pahandut',
            'Kota Palangka Raya, Kalimantan Tengah 73111',
        ],
        mapsLink: 'https://www.google.com/maps/search/Jl.+A.Yani+No.39+Palangka+Raya+Kalimantan+Tengah',
    },
    footer: {
        description: 'Platform percetakan online terpercaya dengan kualitas premium dan harga transparan. Melayani kebutuhan cetak individu hingga corporate.',
        instagram: '',
        facebook: '',
        tiktok: '',
        whatsapp: '6281311152071',
    },
};

// Merge a settings map (from getPublicSettings / getSettingsByGroup) over the
// defaults. Missing/invalid keys fall back so a page never renders empty.
export function parseContent(map: SettingsMap | Record<string, unknown> | null | undefined): SiteContent {
    const m = (map ?? {}) as Record<string, unknown>;
    const pick = <T>(key: string, fallback: T): T => {
        const v = m[key];
        return v === undefined || v === null ? fallback : (v as T);
    };
    return {
        hero_banners: pick(CONTENT_KEYS.hero_banners, contentDefaults.hero_banners),
        features: pick(CONTENT_KEYS.features, contentDefaults.features),
        // Shallow-merge objects so a partially-filled row still has every subfield.
        about: { ...contentDefaults.about, ...pick(CONTENT_KEYS.about, {} as Partial<AboutContent>) },
        faq: pick(CONTENT_KEYS.faq, contentDefaults.faq),
        contact: { ...contentDefaults.contact, ...pick(CONTENT_KEYS.contact, {} as Partial<ContactContent>) },
        footer: { ...contentDefaults.footer, ...pick(CONTENT_KEYS.footer, {} as Partial<FooterContent>) },
    };
}
