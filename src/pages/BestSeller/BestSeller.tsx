import { Link } from 'react-router-dom';
import { Star, ChevronRight, Loader2, Package } from 'lucide-react';
import { useProducts } from '../../hooks';
import { formatPrice } from '../../lib/utils';
import './BestSeller.css';

export default function BestSeller() {
    const { data: products, isLoading } = useProducts({ best_seller: true });

    if (isLoading) {
        return (
            <div className="bestseller-page">
                <div className="container">
                    <div className="loading-state">
                        <Loader2 className="spinner" size={48} />
                        <p>Memuat produk...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bestseller-page">
            <div className="container">
                {/* Hero */}
                <div className="bestseller-hero">
                    <div className="hero-badge">
                        <Star size={20} />
                        Produk Terpopuler
                    </div>
                    <h1>Best Seller</h1>
                    <p>Produk-produk terlaris pilihan pelanggan kami</p>
                </div>

                {/* Products Grid */}
                {!products || products.length === 0 ? (
                    <div className="empty-state">
                        <Package size={64} />
                        <h3>Belum Ada Produk Best Seller</h3>
                        <p>Produk best seller akan tampil di sini</p>
                        <Link to="/kategori" className="btn btn-primary">
                            Lihat Semua Produk
                        </Link>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product, index) => (
                            <Link
                                key={product.id}
                                to={`/produk/${product.slug}`}
                                className="product-card"
                            >
                                {index < 3 && (
                                    <div className="rank-badge">#{index + 1}</div>
                                )}
                                <div className="bestseller-badge">
                                    <Star size={12} />
                                    Best Seller
                                </div>
                                <div className="product-image">
                                    <img
                                        src={product.images[0] || 'https://via.placeholder.com/300'}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="product-content">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-desc">{product.shortDescription}</p>
                                    <div className="product-price">
                                        <span className="price">
                                            {formatPrice(product.quantityTiers[0]?.pricePerUnit || product.basePrice)}
                                        </span>
                                        <span className="unit">/pcs</span>
                                    </div>
                                    <div className="product-footer">
                                        <span className="min-order">
                                            Min. {product.minOrderQty} pcs
                                        </span>
                                        <span className="view-link">
                                            Lihat
                                            <ChevronRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
