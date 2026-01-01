import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Star, Clock, Truck, Shield, Headphones, Loader2 } from 'lucide-react';
import { useCategories, useProducts } from '../../hooks';
import { formatPrice } from '../../lib/utils';
import type { Product } from '../../types';
import './Home.css';

// Hero banners - static data
const heroBanners = [
    {
        id: 'banner-1',
        title: 'Cetak Berkualitas, Harga Terjangkau',
        subtitle: 'Solusi percetakan terpercaya untuk bisnis dan personal Anda',
        ctaText: 'Mulai Pesan',
        ctaLink: '/kategori',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
        id: 'banner-2',
        title: 'Diskon Spesial 20%',
        subtitle: 'Untuk pelanggan baru! Gunakan kode WELCOME20',
        ctaText: 'Dapatkan Promo',
        ctaLink: '/promo',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
        id: 'banner-3',
        title: 'Express Printing',
        subtitle: 'Pengerjaan cepat 1-2 hari kerja untuk kebutuhan urgent',
        ctaText: 'Lihat Produk',
        ctaLink: '/kategori/brosur-flyer',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
];

export default function Home() {
    const [currentBanner, setCurrentBanner] = useState(0);

    const { data: categories, isLoading: categoriesLoading } = useCategories({ active: true });
    const { data: allProducts, isLoading: productsLoading } = useProducts({ active: true });

    const bestSellers = (allProducts || []).filter(p => p.isBestSeller).slice(0, 4);
    const promoProducts = (allProducts || []).filter(p => p.isPromo).slice(0, 4);

    // Auto-slide banner
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextBanner = () => {
        setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
    };

    const prevBanner = () => {
        setCurrentBanner((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-slider">
                    {heroBanners.map((banner, index) => (
                        <div
                            key={banner.id}
                            className={`hero-slide ${index === currentBanner ? 'active' : ''}`}
                            style={{ background: banner.gradient }}
                        >
                            <div className="container">
                                <div className="hero-content">
                                    <div className="hero-text animate-slideUp">
                                        <h1 className="hero-title">{banner.title}</h1>
                                        <p className="hero-subtitle">{banner.subtitle}</p>
                                        <Link to={banner.ctaLink} className="btn btn-accent btn-lg">
                                            {banner.ctaText}
                                            <ArrowRight size={20} />
                                        </Link>
                                    </div>
                                    <div className="hero-image">
                                        <img src={banner.image} alt={banner.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slider Controls */}
                <button className="hero-nav hero-nav-prev" onClick={prevBanner} aria-label="Previous">
                    <ChevronLeft size={24} />
                </button>
                <button className="hero-nav hero-nav-next" onClick={nextBanner} aria-label="Next">
                    <ChevronRight size={24} />
                </button>

                {/* Slider Dots */}
                <div className="hero-dots">
                    {heroBanners.map((_, index) => (
                        <button
                            key={index}
                            className={`hero-dot ${index === currentBanner ? 'active' : ''}`}
                            onClick={() => setCurrentBanner(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* USP Section */}
            <section className="usp-section">
                <div className="container">
                    <div className="usp-grid">
                        <div className="usp-item">
                            <div className="usp-icon">
                                <Truck size={28} />
                            </div>
                            <div className="usp-content">
                                <h4>Pengiriman Cepat</h4>
                                <p>Gratis ongkir untuk pembelian tertentu</p>
                            </div>
                        </div>
                        <div className="usp-item">
                            <div className="usp-icon">
                                <Shield size={28} />
                            </div>
                            <div className="usp-content">
                                <h4>Kualitas Terjamin</h4>
                                <p>Garansi cetak ulang jika tidak sesuai</p>
                            </div>
                        </div>
                        <div className="usp-item">
                            <div className="usp-icon">
                                <Clock size={28} />
                            </div>
                            <div className="usp-content">
                                <h4>Proses Cepat</h4>
                                <p>Estimasi 1-3 hari kerja</p>
                            </div>
                        </div>
                        <div className="usp-item">
                            <div className="usp-icon">
                                <Headphones size={28} />
                            </div>
                            <div className="usp-content">
                                <h4>Support 24/7</h4>
                                <p>Tim support siap membantu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section py-16">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <h2 className="section-title">Kategori Produk</h2>
                            <p className="section-subtitle">Temukan kebutuhan cetak Anda</p>
                        </div>
                        <Link to="/kategori" className="btn btn-outline">
                            Lihat Semua
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    {categoriesLoading ? (
                        <div className="loading-inline">
                            <Loader2 size={24} className="animate-spin" />
                            <span>Memuat kategori...</span>
                        </div>
                    ) : (
                        <div className="categories-grid">
                            {(categories || []).map((category, index) => (
                                <Link
                                    key={category.id}
                                    to={`/kategori/${category.slug}`}
                                    className="category-card"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="category-image">
                                        <img src={category.image} alt={category.name} />
                                        <div className="category-overlay" />
                                    </div>
                                    <div className="category-content">
                                        <span className="category-icon">{category.icon}</span>
                                        <h3 className="category-name">{category.name}</h3>
                                        <p className="category-count">{category.productCount} Produk</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="products-section py-16">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <h2 className="section-title">🔥 Best Seller</h2>
                            <p className="section-subtitle">Produk terlaris pilihan pelanggan</p>
                        </div>
                        <Link to="/best-seller" className="btn btn-outline">
                            Lihat Semua
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    {productsLoading ? (
                        <div className="loading-inline">
                            <Loader2 size={24} className="animate-spin" />
                            <span>Memuat produk...</span>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {bestSellers.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Promo Banner */}
            <section className="promo-banner-section">
                <div className="container">
                    <div className="promo-banner">
                        <div className="promo-banner-content">
                            <span className="promo-badge-large">PROMO SPESIAL</span>
                            <h2>Diskon Hingga 30%</h2>
                            <p>Untuk semua produk Banner dan Spanduk. Berlaku sampai akhir bulan!</p>
                            <Link to="/promo" className="btn btn-accent btn-lg">
                                Lihat Promo
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                        <div className="promo-banner-image">
                            <img
                                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                                alt="Promo Banner"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Promo Products Section */}
            <section className="products-section py-16">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <h2 className="section-title">💰 Promo Minggu Ini</h2>
                            <p className="section-subtitle">Hemat lebih banyak dengan promo spesial</p>
                        </div>
                        <Link to="/promo" className="btn btn-outline">
                            Lihat Semua
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    {productsLoading ? (
                        <div className="loading-inline">
                            <Loader2 size={24} className="animate-spin" />
                            <span>Memuat produk...</span>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {promoProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Butuh Cetakan Custom?</h2>
                        <p>Konsultasikan kebutuhan cetak Anda dengan tim kami</p>
                        <div className="cta-actions">
                            <a href="https://wa.me/6281234567890" className="btn btn-accent btn-lg" target="_blank" rel="noopener noreferrer">
                                💬 Chat WhatsApp
                            </a>
                            <Link to="/kontak" className="btn btn-outline btn-lg">
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
    const lowestPrice = product.quantityTiers?.[product.quantityTiers.length - 1]?.pricePerUnit || product.basePrice || 0;
    const originalPrice = product.isPromo && product.promoPercentage
        ? lowestPrice / (1 - product.promoPercentage / 100)
        : null;

    return (
        <Link to={`/produk/${product.slug}`} className="product-card">
            <div
                className="product-image-wrapper"
                style={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    background: '#f1f5f9'
                }}
            >
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
                <div className="product-badges">
                    {product.isBestSeller && (
                        <span className="product-badge badge-bestseller">
                            <Star size={12} /> Best Seller
                        </span>
                    )}
                    {product.isPromo && product.promoPercentage && (
                        <span className="product-badge badge-promo">
                            -{product.promoPercentage}%
                        </span>
                    )}
                </div>
            </div>

            <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.shortDescription}</p>

                <div className="product-meta">
                    <div className="product-delivery">
                        <Clock size={14} />
                        <span>{product.estimatedDays} hari</span>
                    </div>
                    <div className="product-min-order">
                        Min. {product.minOrderQty} pcs
                    </div>
                </div>

                <div className="product-pricing">
                    <span className="product-price-label">Mulai dari</span>
                    <div className="product-prices">
                        <span className="product-price">{formatPrice(lowestPrice)}</span>
                        {originalPrice && (
                            <span className="product-price-original">{formatPrice(originalPrice)}</span>
                        )}
                    </div>
                    <span className="product-price-unit">/pcs</span>
                </div>
            </div>
        </Link>
    );
}
