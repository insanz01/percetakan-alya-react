import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Search, HelpCircle, MessageCircle } from 'lucide-react';
import './FAQ.css';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    // Pemesanan
    {
        id: 'order-1',
        category: 'Pemesanan',
        question: 'Bagaimana cara memesan produk di PrintMaster?',
        answer: 'Untuk memesan produk, pilih produk yang diinginkan, tentukan spesifikasi (ukuran, bahan, jumlah), upload file desain Anda, lalu lanjutkan ke checkout. Setelah pembayaran dikonfirmasi, pesanan akan segera diproses.'
    },
    {
        id: 'order-2',
        category: 'Pemesanan',
        question: 'Berapa minimum order untuk setiap produk?',
        answer: 'Minimum order bervariasi tergantung jenis produk. Untuk brosur dan flyer umumnya mulai dari 100 lembar, kartu nama mulai dari 100 pcs, dan banner mulai dari 1 pcs. Detail minimum order dapat dilihat di halaman masing-masing produk.'
    },
    {
        id: 'order-3',
        category: 'Pemesanan',
        question: 'Apakah bisa pesan dalam jumlah besar?',
        answer: 'Tentu! Kami menerima pesanan dalam jumlah besar dengan harga khusus. Semakin banyak jumlah pesanan, semakin hemat harga per unitnya. Untuk pesanan khusus dalam jumlah sangat besar, silahkan hubungi tim sales kami.'
    },
    // Pembayaran
    {
        id: 'payment-1',
        category: 'Pembayaran',
        question: 'Metode pembayaran apa saja yang tersedia?',
        answer: 'Kami menerima pembayaran melalui Transfer Bank (BCA, Mandiri, BNI, BRI), Virtual Account, E-Wallet (OVO, GoPay, DANA, ShopeePay), dan QRIS. Semua metode pembayaran aman dan terverifikasi.'
    },
    {
        id: 'payment-2',
        category: 'Pembayaran',
        question: 'Berapa lama batas waktu pembayaran?',
        answer: 'Batas waktu pembayaran adalah 24 jam setelah pesanan dibuat. Jika pembayaran tidak diterima dalam waktu tersebut, pesanan akan otomatis dibatalkan. Anda dapat membuat pesanan baru jika hal ini terjadi.'
    },
    // File Desain
    {
        id: 'design-1',
        category: 'File Desain',
        question: 'Format file apa yang diterima?',
        answer: 'Kami menerima file dalam format PDF, AI, PSD, JPG, dan PNG. Untuk hasil terbaik, kami merekomendasikan menggunakan format PDF dengan resolusi minimal 300 DPI dan mode warna CMYK.'
    },
    {
        id: 'design-2',
        category: 'File Desain',
        question: 'Bagaimana jika saya tidak punya desain?',
        answer: 'Tidak perlu khawatir! Kami menyediakan layanan desain dengan biaya tambahan. Tim desainer profesional kami siap membantu mewujudkan ide Anda. Silahkan hubungi customer service untuk informasi lebih lanjut.'
    },
    {
        id: 'design-3',
        category: 'File Desain',
        question: 'Apakah file desain saya akan diperiksa sebelum cetak?',
        answer: 'Ya, tim kami akan memeriksa file desain Anda untuk memastikan kualitas cetak optimal. Jika ada masalah dengan file (resolusi rendah, warna tidak sesuai, dll), kami akan menghubungi Anda sebelum melanjutkan produksi.'
    },
    // Produksi & Pengiriman
    {
        id: 'production-1',
        category: 'Produksi & Pengiriman',
        question: 'Berapa lama proses produksi?',
        answer: 'Waktu produksi bervariasi tergantung jenis produk dan jumlah pesanan. Umumnya 3-7 hari kerja setelah file desain disetujui. Untuk pesanan urgent, kami menyediakan layanan express dengan biaya tambahan.'
    },
    {
        id: 'production-2',
        category: 'Produksi & Pengiriman',
        question: 'Ekspedisi apa yang digunakan?',
        answer: 'Kami bekerja sama dengan berbagai ekspedisi terpercaya seperti JNE, J&T, SiCepat, Anteraja, dan Pos Indonesia. Anda dapat memilih ekspedisi sesuai kebutuhan saat checkout.'
    },
    {
        id: 'production-3',
        category: 'Produksi & Pengiriman',
        question: 'Apakah bisa COD?',
        answer: 'Saat ini kami belum menyediakan layanan COD. Semua pesanan harus dibayar terlebih dahulu sebelum proses produksi dimulai. Hal ini untuk memastikan kelancaran produksi dan pengiriman.'
    },
    // Garansi
    {
        id: 'warranty-1',
        category: 'Garansi & Retur',
        question: 'Apakah ada garansi untuk produk cetak?',
        answer: 'Ya, kami memberikan garansi 100% jika terjadi kesalahan cetak dari pihak kami atau produk tidak sesuai spesifikasi yang dipesan. Klaim garansi dapat diajukan maksimal 3 hari setelah produk diterima.'
    },
    {
        id: 'warranty-2',
        category: 'Garansi & Retur',
        question: 'Bagaimana jika produk rusak saat pengiriman?',
        answer: 'Jika produk rusak saat pengiriman, segera foto kondisi paket dan produk, lalu ajukan klaim melalui halaman akun atau hubungi customer service kami. Kami akan memproses pengiriman ulang tanpa biaya tambahan.'
    },
];

const categories = ['Semua', 'Pemesanan', 'Pembayaran', 'File Desain', 'Produksi & Pengiriman', 'Garansi & Retur'];

export default function FAQ() {
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        setExpandedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const filteredFAQs = faqData.filter(faq => {
        const matchesCategory = activeCategory === 'Semua' || faq.category === activeCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="faq-page">
            <div className="container">
                {/* Hero */}
                <div className="faq-hero">
                    <h1>Frequently Asked Questions</h1>
                    <p>Temukan jawaban untuk pertanyaan yang sering diajukan</p>

                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Cari pertanyaan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="faq-categories">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="faq-list">
                    {filteredFAQs.length === 0 ? (
                        <div className="empty-state">
                            <HelpCircle size={48} />
                            <h3>Tidak ada hasil</h3>
                            <p>Coba kata kunci lain atau hubungi kami langsung</p>
                        </div>
                    ) : (
                        filteredFAQs.map(faq => (
                            <div
                                key={faq.id}
                                className={`faq-item ${expandedItems.includes(faq.id) ? 'expanded' : ''}`}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleItem(faq.id)}
                                >
                                    <span className="question-text">{faq.question}</span>
                                    <ChevronDown className="chevron" size={20} />
                                </button>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Contact CTA */}
                <div className="faq-cta">
                    <div className="cta-content">
                        <MessageCircle size={48} />
                        <h2>Masih ada pertanyaan?</h2>
                        <p>Tim customer service kami siap membantu Anda</p>
                        <div className="cta-buttons">
                            <Link to="/kontak" className="btn btn-primary">
                                Hubungi Kami
                                <ChevronRight size={20} />
                            </Link>
                            <a href="https://wa.me/6281234567890" className="btn btn-outline">
                                Chat WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
