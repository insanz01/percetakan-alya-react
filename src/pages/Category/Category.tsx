import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Clock, Filter, SortDesc, Loader2 } from 'lucide-react';
import { useCategories, useCategory, useProductsByCategory } from '../../hooks';
import { formatPrice } from '../../lib/utils';
import type { Product } from '../../types';
import './Category.css';

export default function Category() {
    const { slug } = useParams<{ slug: string }>();

    // If no slug, show all categories
    if (!slug) {
        return <AllCategories />;
    }

    return <CategoryDetail slug={slug} />;
}

// All Categories View
function AllCategories() {
    const { data: categories, isLoading } = useCategories({ active: true });

    if (isLoading) {
        return (
            <div className="category-page">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat kategori...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="category-page">
            <div className="page-header">
                <div className="container">
                    <h1>Semua Kategori</h1>
                    <p>Temukan berbagai kebutuhan cetak Anda</p>
                </div>
            </div>

            <div className="container py-12">
                <div className="all-categories-grid">
                    {(categories || []).map(category => (
                        <Link
                            key={category.id}
                            to={`/kategori/${category.slug}`}
                            className="category-list-card"
                        >
                            <div className="category-list-image">
                                <img src={category.gambar} alt={category.nama} />
                            </div>
                            <div className="category-list-content">
                                <span className="category-list-icon">{category.ikon}</span>
                                <h3>{category.nama}</h3>
                                <p>{category.deskripsi}</p>
                                <span className="category-list-count">{category.productCount} Produk</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Category Detail View
function CategoryDetail({ slug }: { slug: string }) {
    const { data: category, isLoading: categoryLoading } = useCategory(slug, true);
    const { data: products, isLoading: productsLoading } = useProductsByCategory(slug);

    const isLoading = categoryLoading || productsLoading;

    if (isLoading) {
        return (
            <div className="category-page">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat kategori...</p>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="container py-16">
                <div className="not-found">
                    <h1>Kategori tidak ditemukan</h1>
                    <p>Kategori yang Anda cari tidak tersedia.</p>
                    <Link to="/kategori" className="btn btn-primary">
                        Lihat Semua Kategori
                    </Link>
                </div>
            </div>
        );
    }

    const productList = products || [];

    return (
        <div className="category-page">
            {/* Breadcrumb */}
            <div className="breadcrumb-section">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Beranda</Link>
                        <ChevronRight size={14} />
                        <Link to="/kategori">Kategori</Link>
                        <ChevronRight size={14} />
                        <span>{category.nama}</span>
                    </nav>
                </div>
            </div>

            {/* Category Header */}
            <div className="category-header" style={{ backgroundImage: `url(${category.gambar})` }}>
                <div className="category-header-overlay" />
                <div className="container">
                    <div className="category-header-content">
                        <span className="category-header-icon">{category.ikon}</span>
                        <h1>{category.nama}</h1>
                        <p>{category.deskripsi}</p>
                        <span className="category-product-count">{category.productCount} Produk tersedia</span>
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="container py-12">
                {/* Toolbar */}
                <div className="products-toolbar">
                    <div className="toolbar-left">
                        <p>Menampilkan {productList.length} produk</p>
                    </div>
                    <div className="toolbar-right">
                        <button className="btn btn-ghost">
                            <Filter size={18} />
                            Filter
                        </button>
                        <button className="btn btn-ghost">
                            <SortDesc size={18} />
                            Urutkan
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                {productList.length > 0 ? (
                    <div className="products-grid">
                        {productList.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-category">
                        <p>Belum ada produk di kategori ini.</p>
                        <Link to="/" className="btn btn-primary">
                            Kembali ke Beranda
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

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
                    {product.promo && product.persenPromo && (
                        <span className="product-badge badge-promo">
                            -{product.persenPromo}%
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
                    <span className="product-price">{formatPrice(lowestPrice)}</span>
                    <span className="product-price-unit">/pcs</span>
                </div>
            </div>
        </Link>
    );
}
