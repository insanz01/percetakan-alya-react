import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Eye,
    MoreVertical,
    Package,
    Filter,
    X,
    Tag,
    Layers,
    Clock,
    FileText,
    CheckCircle,
    ExternalLink,
    Loader2,
    Grid,
    List
} from 'lucide-react';
import { useProducts, useCategories } from '../../../hooks';
import { formatPrice } from '../../../lib/utils';
import type { Product } from '../../../types';
import './Products.css';

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

    const { data: products, isLoading: productsLoading } = useProducts();
    const { data: categories, isLoading: categoriesLoading } = useCategories();

    const isLoading = productsLoading || categoriesLoading;

    const filteredProducts = useMemo(() => {
        return (products || []).filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    const getCategoryName = (categoryId: string) => {
        return (categories || []).find(c => c.id === categoryId)?.name || 'Unknown';
    };

    const handleViewProduct = (product: Product) => {
        setSelectedProduct(product);
        setActiveDropdown(null);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    if (isLoading) {
        return (
            <div className="admin-products">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat produk...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-products">
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <h2>Manajemen Produk</h2>
                    <p>{(products || []).length} produk terdaftar</p>
                </div>
                <Link to="/admin/products/new" className="btn btn-primary">
                    <Plus size={20} />
                    Tambah Produk
                </Link>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-group">
                    <Filter size={18} />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">Semua Kategori</option>
                        {(categories || []).map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="view-toggle">
                    <button
                        className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                        onClick={() => setViewMode('table')}
                        title="Tampilan Tabel"
                    >
                        <List size={18} />
                    </button>
                    <button
                        className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                        title="Tampilan Grid"
                    >
                        <Grid size={18} />
                    </button>
                </div>
            </div>

            {/* Products Display - Table or Grid */}
            {viewMode === 'table' ? (
                <div className="products-table-card">
                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Produk</th>
                                    <th>Kategori</th>
                                    <th>Harga</th>
                                    <th>Min. Order</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="product-cell">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="product-image"
                                                />
                                                <div className="product-info">
                                                    <p className="product-name">{product.name}</p>
                                                    <p className="product-desc">{product.shortDescription}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="category-badge">
                                                {getCategoryName(product.categoryId)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="price-cell">
                                                <span className="base-price">
                                                    {formatPrice(product.quantityTiers[0].pricePerUnit)}
                                                </span>
                                                <span className="price-unit">/pcs</span>
                                            </div>
                                        </td>
                                        <td>{product.minOrderQty} pcs</td>
                                        <td>
                                            <div className="status-badges">
                                                {product.isBestSeller && (
                                                    <span className="status-badge bestseller">Best Seller</span>
                                                )}
                                                {product.isPromo && (
                                                    <span className="status-badge promo">Promo</span>
                                                )}
                                                {product.isRetailProduct && (
                                                    <span className="status-badge retail">Retail</span>
                                                )}
                                                {!product.isBestSeller && !product.isPromo && !product.isRetailProduct && (
                                                    <span className="status-badge normal">Aktif</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="actions-cell">
                                                <button
                                                    className="action-btn"
                                                    title="Lihat"
                                                    onClick={() => handleViewProduct(product)}
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button className="action-btn" title="Edit">
                                                    <Edit2 size={16} />
                                                </button>
                                                <div className="dropdown-container">
                                                    <button
                                                        className="action-btn"
                                                        onClick={() => setActiveDropdown(
                                                            activeDropdown === product.id ? null : product.id
                                                        )}
                                                    >
                                                        <MoreVertical size={16} />
                                                    </button>
                                                    {activeDropdown === product.id && (
                                                        <div className="dropdown-menu">
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={() => handleViewProduct(product)}
                                                            >
                                                                <Eye size={14} /> Lihat Detail
                                                            </button>
                                                            <button className="dropdown-item">
                                                                <Edit2 size={14} /> Edit Produk
                                                            </button>
                                                            <button className="dropdown-item delete">
                                                                <Trash2 size={14} /> Hapus
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="empty-state">
                            <Package size={48} />
                            <h3>Tidak ada produk ditemukan</h3>
                            <p>Coba ubah filter atau kata kunci pencarian</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="product-card" onClick={() => handleViewProduct(product)}>
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="product-card-image"
                            />
                            <div className="product-card-content">
                                <div>
                                    <h3 className="product-card-title">{product.name}</h3>
                                    <p className="product-card-desc">{product.shortDescription}</p>
                                </div>

                                <div className="product-card-price">
                                    <span className="price">
                                        {formatPrice(product.quantityTiers[0].pricePerUnit)}
                                    </span>
                                    <span className="unit">/pcs</span>
                                </div>

                                <div className="product-card-meta">
                                    <span className="product-card-quantity">{product.minOrderQty} pcs</span>
                                    <div className="product-card-badges">
                                        {product.isBestSeller && (
                                            <span className="status-badge bestseller">Best Seller</span>
                                        )}
                                        {product.isPromo && (
                                            <span className="status-badge promo">Promo</span>
                                        )}
                                    </div>
                                </div>

                                <div className="product-card-actions">
                                    <button
                                        className="action-btn"
                                        title="Lihat"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleViewProduct(product);
                                        }}
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        className="action-btn"
                                        title="Edit"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        className="action-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveDropdown(activeDropdown === product.id ? null : product.id);
                                        }}
                                    >
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredProducts.length === 0 && (
                        <div className="empty-state">
                            <Package size={48} />
                            <h3>Tidak ada produk ditemukan</h3>
                            <p>Coba ubah filter atau kata kunci pencarian</p>
                        </div>
                    )}
                </div>
            )}

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="product-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h2>Detail Produk</h2>
                                <p className="modal-product-id">ID: {selectedProduct.id}</p>
                            </div>
                            <button className="modal-close-btn" onClick={closeModal}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="modal-content">
                            {/* Product Header */}
                            <div className="product-detail-header">
                                <div className="product-images">
                                    <img
                                        src={selectedProduct.images[0]}
                                        alt={selectedProduct.name}
                                        className="main-image"
                                    />
                                    {selectedProduct.images.length > 1 && (
                                        <div className="thumbnail-list">
                                            {selectedProduct.images.slice(0, 4).map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`${selectedProduct.name} ${idx + 1}`}
                                                    className="thumbnail"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="product-header-info">
                                    <div className="product-badges">
                                        {selectedProduct.isBestSeller && (
                                            <span className="status-badge bestseller">Best Seller</span>
                                        )}
                                        {selectedProduct.isPromo && (
                                            <span className="status-badge promo">Promo</span>
                                        )}
                                        {selectedProduct.isRetailProduct && (
                                            <span className="status-badge retail">Retail</span>
                                        )}
                                    </div>
                                    <h3 className="product-title">{selectedProduct.name}</h3>
                                    <p className="product-short-desc">{selectedProduct.shortDescription}</p>

                                    <div className="product-meta">
                                        <div className="meta-item">
                                            <Tag size={16} />
                                            <span>{getCategoryName(selectedProduct.categoryId)}</span>
                                        </div>
                                        <div className="meta-item">
                                            <Package size={16} />
                                            <span>Min. Order: {selectedProduct.minOrderQty} pcs</span>
                                        </div>
                                        <div className="meta-item">
                                            <Clock size={16} />
                                            <span>Estimasi: {selectedProduct.estimatedDays} hari kerja</span>
                                        </div>
                                    </div>

                                    <div className="product-price-display">
                                        <span className="price-label">Harga Mulai</span>
                                        <span className="price-value">
                                            {formatPrice(selectedProduct.quantityTiers[0].pricePerUnit)}
                                            <span className="price-suffix">/pcs</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="modal-section">
                                <h4><FileText size={16} /> Deskripsi</h4>
                                <p className="description-text">{selectedProduct.description}</p>
                            </div>

                            {/* Options Grid */}
                            <div className="options-grid">
                                {/* Sizes */}
                                {selectedProduct.sizes.length > 0 && (
                                    <div className="modal-section">
                                        <h4><Layers size={16} /> Ukuran Tersedia</h4>
                                        <div className="option-tags">
                                            {selectedProduct.sizes.map(size => (
                                                <span key={size.id} className="option-tag">
                                                    {size.name}
                                                    {size.priceMultiplier > 1 && (
                                                        <span className="option-price">x{size.priceMultiplier}</span>
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Materials */}
                                {selectedProduct.materials.length > 0 && (
                                    <div className="modal-section">
                                        <h4><Layers size={16} /> Material Tersedia</h4>
                                        <div className="option-tags">
                                            {selectedProduct.materials.map(material => (
                                                <span key={material.id} className="option-tag">
                                                    {material.name}
                                                    {material.pricePerUnit > 0 && (
                                                        <span className="option-price">+{formatPrice(material.pricePerUnit)}</span>
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Finishings */}
                                {selectedProduct.finishings.length > 0 && (
                                    <div className="modal-section">
                                        <h4><CheckCircle size={16} /> Finishing Tersedia</h4>
                                        <div className="option-tags">
                                            {selectedProduct.finishings.map(finishing => (
                                                <span key={finishing.id} className="option-tag">
                                                    {finishing.name}
                                                    <span className="option-price">+{formatPrice(finishing.price)}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Price Tiers */}
                            <div className="modal-section">
                                <h4><Tag size={16} /> Tingkatan Harga</h4>
                                <div className="price-tiers-table">
                                    <div className="tier-row header">
                                        <span>Jumlah</span>
                                        <span>Harga per Pcs</span>
                                    </div>
                                    {selectedProduct.quantityTiers.map((tier, idx) => (
                                        <div key={idx} className="tier-row">
                                            <span>
                                                {tier.minQty} - {tier.maxQty === 99999 ? '∞' : tier.maxQty} pcs
                                            </span>
                                            <span className="tier-price">{formatPrice(tier.pricePerUnit)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* File Requirements */}
                            {!selectedProduct.isRetailProduct && selectedProduct.requiresDesignFile !== false && (
                                <div className="modal-section">
                                    <h4><FileText size={16} /> Persyaratan File</h4>
                                    <div className="file-requirements">
                                        <div className="requirement-item">
                                            <span className="req-label">Format yang diterima:</span>
                                            <span className="req-value">
                                                {selectedProduct.allowedFileTypes.map(t => t.toUpperCase()).join(', ')}
                                            </span>
                                        </div>
                                        <div className="requirement-item">
                                            <span className="req-label">Ukuran maksimal:</span>
                                            <span className="req-value">{selectedProduct.maxFileSize} MB</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-outline" onClick={closeModal}>
                                Tutup
                            </button>
                            <Link
                                to={`/produk/${selectedProduct.slug}`}
                                target="_blank"
                                className="btn btn-outline"
                            >
                                <ExternalLink size={18} />
                                Lihat di Website
                            </Link>
                            <button className="btn btn-primary">
                                <Edit2 size={18} />
                                Edit Produk
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
