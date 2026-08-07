import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Star, Clock, Truck, Shield, Headphones, Loader2, Flame, MessageCircle } from 'lucide-react';
import { useCategories, useProducts, useContent } from '../../hooks';
import { formatPrice } from '../../lib/utils';
import type { Product } from '../../types';
import './Home.css';

// Gradients/icons stay in code (presentation); text/images come from CMS content.
const bannerGradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
];
const uspIcons = [Truck, Shield, Clock, Headphones];

export default function Home() {
    const [currentBanner, setCurrentBanner] = useState(0);

    const content = useContent();
    const heroBanners = content.hero_banners;
    const features = content.features;

    const { data: categories, isLoading: categoriesLoading } = useCategories({ active: true });
    const { data: allProducts, isLoading: productsLoading } = useProducts({ active: true });

    const bestSellers = (allProducts || []).filter(p => p.terlaris).slice(0, 4);

    // Auto-slide banner (re-armed when the banner count changes)
    useEffect(() => {
        if (heroBanners.length <= 1) return;
        setCurrentBanner((prev) => (prev < heroBanners.length ? prev : 0));
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroBanners.length]);

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
                            key={index}
                            className={`hero-slide ${index === currentBanner ? 'active' : ''}`}
                            style={{ background: bannerGradients[index % bannerGradients.length] }}
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
                        {features.map((feature, index) => {
                            const Icon = uspIcons[index % uspIcons.length];
                            return (
                                <div className="usp-item" key={index}>
                                    <div className="usp-icon">
                                        <Icon size={28} />
                                    </div>
                                    <div className="usp-content">
                                        <h4>{feature.title}</h4>
                                        <p>{feature.description}</p>
                                    </div>
                                </div>
                            );
                        })}
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
                                        <img src={category.gambar} alt={category.nama} />
                                        <div className="category-overlay" />
                                    </div>
                                    <div className="category-content">
                                        <span className="category-icon">{category.ikon}</span>
                                        <h3 className="category-name">{category.nama}</h3>
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
                            <h2 className="section-title"><Flame size={22} /> Best Seller</h2>
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

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Butuh Cetakan Custom?</h2>
                        <p>Konsultasikan kebutuhan cetak Anda dengan tim kami</p>
                        <div className="cta-actions">
                            <a href={`https://wa.me/${content.contact.whatsapp.replace(/[^\d]/g, '')}`} className="btn btn-accent btn-lg" target="_blank" rel="noopener noreferrer">
                                <MessageCircle size={18} /> Chat WhatsApp
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
    const lowestPrice = product.tierJumlah?.[product.tierJumlah.length - 1]?.pricePerUnit || product.hargaDasar || 0;

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
                    src={product.gambar[0]}
                    alt={product.nama}
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
                    {product.terlaris && (
                        <span className="product-badge badge-bestseller">
                            <Star size={12} /> Best Seller
                        </span>
                    )}
                </div>
            </div>

            <div className="product-content">
                <h3 className="product-name">{product.nama}</h3>
                <p className="product-description">{product.deskripsiSingkat}</p>

                <div className="product-meta">
                    <div className="product-delivery">
                        <Clock size={14} />
                        <span>{product.estimasiHari} hari</span>
                    </div>
                    <div className="product-min-order">
                        Min. {product.minPesan} pcs
                    </div>
                </div>

                <div className="product-pricing">
                    <span className="product-price-label">Mulai dari</span>
                    <div className="product-prices">
                        <span className="product-price">{formatPrice(lowestPrice)}</span>
                    </div>
                    <span className="product-price-unit">/pcs</span>
                </div>
            </div>
        </Link>
    );
}
