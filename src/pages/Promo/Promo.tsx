import { Link } from 'react-router-dom';
import {
    ChevronRight,
    Star,
    Clock,
    Percent,
    Gift,
    Timer,
    Sparkles
} from 'lucide-react';
import { useProducts } from '../../hooks';
import { formatPrice } from '../../lib/utils';
import type { Product } from '../../types';
import './Promo.css';

export default function Promo() {
    const { data: allProducts } = useProducts({ active: true });

    const promoProducts = (allProducts || []).filter(p => p.isPromo);

    // Calculate countdown (dummy - 3 days from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);

    const countdownDays = 3;
    const countdownHours = 12;
    const countdownMinutes = 45;
    const countdownSeconds = 30;

    const promoBanners = [
        {
            title: 'Promo Akhir Tahun',
            description: 'Diskon hingga 30% untuk semua produk brosur & flyer',
            discount: '30%',
            code: 'AKHIRTAHUN30',
            bgColor: 'linear-gradient(135deg, #667eea, #764ba2)',
            validUntil: '31 Desember 2024',
        },
        {
            title: 'Gratis Ongkir',
            description: 'Bebas ongkir untuk pembelian minimal Rp500.000',
            discount: 'FREE',
            code: 'FREEONGKIR',
            bgColor: 'linear-gradient(135deg, #f093fb, #f5576c)',
            validUntil: '15 Januari 2025',
        },
        {
            title: 'Bonus Cetak',
            description: 'Bonus 50 pcs untuk setiap pembelian 500 pcs kartu nama',
            discount: '+50',
            code: 'BONUSKARTU',
            bgColor: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            validUntil: '20 Januari 2025',
        },
    ];

    return (
        <div className="promo-page">
            {/* Breadcrumb */}
            <div className="breadcrumb-section">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Beranda</Link>
                        <ChevronRight size={14} />
                        <span>Promo</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="promo-hero">
                <div className="promo-hero-bg" />
                <div className="container">
                    <div className="promo-hero-content">
                        <div className="promo-hero-badge">
                            <Sparkles size={16} />
                            <span>Penawaran Spesial</span>
                        </div>
                        <h1>Promo Minggu Ini!</h1>
                        <p>Nikmati diskon spesial dan penawaran terbatas untuk berbagai produk percetakan berkualitas</p>

                        {/* Countdown Timer */}
                        <div className="countdown-container">
                            <p className="countdown-label">
                                <Timer size={16} />
                                Berakhir dalam:
                            </p>
                            <div className="countdown-timer">
                                <div className="countdown-item">
                                    <span className="countdown-value">{countdownDays}</span>
                                    <span className="countdown-unit">Hari</span>
                                </div>
                                <span className="countdown-separator">:</span>
                                <div className="countdown-item">
                                    <span className="countdown-value">{String(countdownHours).padStart(2, '0')}</span>
                                    <span className="countdown-unit">Jam</span>
                                </div>
                                <span className="countdown-separator">:</span>
                                <div className="countdown-item">
                                    <span className="countdown-value">{String(countdownMinutes).padStart(2, '0')}</span>
                                    <span className="countdown-unit">Menit</span>
                                </div>
                                <span className="countdown-separator">:</span>
                                <div className="countdown-item">
                                    <span className="countdown-value">{String(countdownSeconds).padStart(2, '0')}</span>
                                    <span className="countdown-unit">Detik</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Promo Banners */}
            <section className="promo-banners-section py-12">
                <div className="container">
                    <div className="section-header">
                        <div className="section-header-left">
                            <Gift size={24} className="section-icon" />
                            <div>
                                <h2>Kode Promo Aktif</h2>
                                <p>Gunakan kode berikut saat checkout</p>
                            </div>
                        </div>
                    </div>

                    <div className="promo-banners-grid">
                        {promoBanners.map((banner, index) => (
                            <div key={index} className="promo-banner-card" style={{ background: banner.bgColor }}>
                                <div className="promo-banner-content">
                                    <span className="promo-banner-discount">{banner.discount}</span>
                                    <h3>{banner.title}</h3>
                                    <p>{banner.description}</p>
                                    <div className="promo-banner-code">
                                        <span>Kode:</span>
                                        <strong>{banner.code}</strong>
                                    </div>
                                    <span className="promo-banner-valid">Berlaku s/d {banner.validUntil}</span>
                                </div>
                                <div className="promo-banner-pattern" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Promo Products */}
            <section className="promo-products-section py-12">
                <div className="container">
                    <div className="section-header">
                        <div className="section-header-left">
                            <Percent size={24} className="section-icon" />
                            <div>
                                <h2>Produk Diskon</h2>
                                <p>Produk dengan potongan harga spesial</p>
                            </div>
                        </div>
                    </div>

                    {promoProducts.length > 0 ? (
                        <div className="promo-products-grid">
                            {promoProducts.map((product) => (
                                <PromoProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-promo">
                            <Percent size={48} />
                            <h3>Tidak ada promo saat ini</h3>
                            <p>Pantau terus halaman ini untuk mendapatkan penawaran menarik!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Info Section */}
            <section className="promo-info-section py-12">
                <div className="container">
                    <div className="promo-info-grid">
                        <div className="promo-info-card">
                            <div className="promo-info-icon">
                                <Percent size={28} />
                            </div>
                            <h4>Diskon Langsung</h4>
                            <p>Potongan harga langsung tanpa minimum pembelian untuk produk tertentu</p>
                        </div>
                        <div className="promo-info-card">
                            <div className="promo-info-icon">
                                <Gift size={28} />
                            </div>
                            <h4>Kode Promo</h4>
                            <p>Masukkan kode promo saat checkout untuk mendapatkan diskon tambahan</p>
                        </div>
                        <div className="promo-info-card">
                            <div className="promo-info-icon">
                                <Timer size={28} />
                            </div>
                            <h4>Waktu Terbatas</h4>
                            <p>Promo berlaku dalam waktu terbatas. Segera order sebelum kehabisan!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="promo-cta-section">
                <div className="container">
                    <div className="promo-cta">
                        <div className="promo-cta-content">
                            <h2>Tidak Ingin Ketinggalan Promo?</h2>
                            <p>Daftar sekarang dan dapatkan notifikasi promo langsung di email Anda!</p>
                            <div className="promo-cta-form">
                                <input
                                    type="email"
                                    placeholder="Masukkan email Anda"
                                    className="input"
                                />
                                <button className="btn btn-accent">
                                    Berlangganan
                                </button>
                            </div>
                            <span className="promo-cta-note">* Kami tidak akan mengirim spam</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function PromoProductCard({ product }: { product: Product }) {
    const lowestPrice = product.quantityTiers[product.quantityTiers.length - 1].pricePerUnit;
    const originalPrice = lowestPrice / (1 - (product.promoPercentage || 0) / 100);

    return (
        <Link to={`/produk/${product.slug}`} className="promo-product-card">
            <div className="promo-product-image-wrapper">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="promo-product-image"
                    loading="lazy"
                />
                <div className="promo-product-badges">
                    {product.promoPercentage && (
                        <span className="promo-badge-discount">
                            -{product.promoPercentage}%
                        </span>
                    )}
                    {product.isBestSeller && (
                        <span className="promo-badge-bestseller">
                            <Star size={12} /> Best Seller
                        </span>
                    )}
                </div>
                <div className="promo-product-overlay">
                    <span>Lihat Detail</span>
                </div>
            </div>

            <div className="promo-product-content">
                <h3 className="promo-product-name">{product.name}</h3>
                <p className="promo-product-description">{product.shortDescription}</p>

                <div className="promo-product-meta">
                    <div className="promo-product-delivery">
                        <Clock size={14} />
                        <span>{product.estimatedDays} hari</span>
                    </div>
                    <div className="promo-product-min-order">
                        Min. {product.minOrderQty} pcs
                    </div>
                </div>

                <div className="promo-product-pricing">
                    <div className="promo-price-row">
                        <span className="promo-original-price">{formatPrice(originalPrice)}</span>
                        <span className="promo-discount-badge">-{product.promoPercentage}%</span>
                    </div>
                    <div className="promo-price-row">
                        <span className="promo-current-price">{formatPrice(lowestPrice)}</span>
                        <span className="promo-price-unit">/pcs</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
