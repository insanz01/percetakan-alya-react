import { Link } from 'react-router-dom';
import {
    Target,
    Eye,
    Award,
    Clock,
    Shield,
    ThumbsUp,
    ChevronRight,
    Printer
} from 'lucide-react';
import './About.css';

export default function About() {
    const stats = [
        { value: '10+', label: 'Tahun Pengalaman' },
        { value: '50K+', label: 'Pelanggan Puas' },
        { value: '500K+', label: 'Pesanan Selesai' },
        { value: '99%', label: 'Tingkat Kepuasan' },
    ];

    const values = [
        {
            icon: <Award size={32} />,
            title: 'Kualitas Premium',
            description: 'Kami menggunakan mesin cetak terbaru dan bahan berkualitas tinggi untuk menghasilkan produk terbaik.',
        },
        {
            icon: <Clock size={32} />,
            title: 'Tepat Waktu',
            description: 'Komitmen kami adalah menyelesaikan pesanan sesuai estimasi yang dijanjikan.',
        },
        {
            icon: <Shield size={32} />,
            title: 'Garansi Kepuasan',
            description: 'Jika hasil tidak sesuai, kami akan cetak ulang tanpa biaya tambahan.',
        },
        {
            icon: <ThumbsUp size={32} />,
            title: 'Harga Transparan',
            description: 'Tidak ada biaya tersembunyi. Harga yang Anda lihat adalah harga yang Anda bayar.',
        },
    ];

    return (
        <div className="about-page">
            {/* Breadcrumb */}
            <div className="breadcrumb-section">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Beranda</Link>
                        <ChevronRight size={14} />
                        <span>Tentang Kami</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-content">
                        <h1>Mitra Percetakan Terpercaya untuk Bisnis Anda</h1>
                        <p>
                            Sejak 2014, Semanggi Print telah menjadi solusi percetakan online terlengkap
                            dengan menggabungkan teknologi modern dan keahlian tradisional untuk
                            menghasilkan produk cetak berkualitas tinggi.
                        </p>
                    </div>
                </div>
                <div className="about-hero-pattern" />
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section py-16">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-image">
                            <img
                                src="https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=600"
                                alt="Semanggi Print Office"
                            />
                            <div className="story-image-overlay">
                                <Printer size={40} />
                            </div>
                        </div>
                        <div className="story-content">
                            <span className="section-badge">Cerita Kami</span>
                            <h2>Dari Garasi ke Ribuan Pelanggan</h2>
                            <p>
                                Semanggi Print didirikan dengan semangat untuk memberikan layanan percetakan
                                berkualitas yang mudah dijangkau oleh semua kalangan. Berawal dari usaha
                                kecil, kami kini melayani ribuan pelanggan dari seluruh Indonesia.
                            </p>
                            <p>
                                Perjalanan kami tidak selalu mulus, namun dengan komitmen pada kualitas
                                dan kepuasan pelanggan, kami terus berkembang. Saat ini, Semanggi Print
                                memiliki fasilitas produksi modern dengan berbagai mesin cetak offset
                                dan digital untuk memenuhi kebutuhan percetakan Anda.
                            </p>
                            <p>
                                Kami percaya bahwa setiap bisnis, besar maupun kecil, berhak mendapatkan
                                hasil cetakan berkualitas dengan harga yang terjangkau dan transparan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Mission */}
            <section className="vision-section py-16">
                <div className="container">
                    <div className="vision-grid">
                        <div className="vision-card">
                            <div className="vision-icon">
                                <Eye size={40} />
                            </div>
                            <h3>Visi Kami</h3>
                            <p>
                                Menjadi platform percetakan online nomor satu di Indonesia yang dikenal
                                dengan kualitas premium, inovasi teknologi, dan layanan pelanggan terbaik.
                            </p>
                        </div>
                        <div className="vision-card">
                            <div className="vision-icon">
                                <Target size={40} />
                            </div>
                            <h3>Misi Kami</h3>
                            <ul>
                                <li>Menyediakan produk cetak berkualitas tinggi dengan harga kompetitif</li>
                                <li>Menghadirkan pengalaman pemesanan yang mudah dan transparan</li>
                                <li>Memberikan layanan pelanggan yang responsif dan solutif</li>
                                <li>Mendukung pertumbuhan bisnis UMKM Indonesia</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section py-16">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">Nilai-Nilai Kami</span>
                        <h2>Mengapa Memilih Semanggi Print?</h2>
                        <p>Komitmen kami untuk memberikan yang terbaik</p>
                    </div>

                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card">
                                <div className="value-icon">{value.icon}</div>
                                <h4>{value.title}</h4>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta-section">
                <div className="container">
                    <div className="about-cta">
                        <div className="about-cta-content">
                            <h2>Siap Memulai Proyek Anda?</h2>
                            <p>Hubungi kami sekarang untuk konsultasi gratis tentang kebutuhan cetak Anda</p>
                            <div className="about-cta-buttons">
                                <Link to="/kontak" className="btn btn-accent btn-lg">
                                    Hubungi Kami
                                </Link>
                                <Link to="/kategori" className="btn btn-outline btn-lg">
                                    Lihat Produk
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
