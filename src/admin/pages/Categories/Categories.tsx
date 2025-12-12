import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Grid3X3,
    Loader2
} from 'lucide-react';
import { useCategories } from '../../../hooks';
import './Categories.css';

export default function Categories() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: categories, isLoading } = useCategories();

    const filteredCategories = useMemo(() => {
        return (categories || []).filter(cat =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [categories, searchQuery]);

    if (isLoading) {
        return (
            <div className="admin-categories">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat kategori...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-categories">
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <h2>Manajemen Kategori</h2>
                    <p>{(categories || []).length} kategori</p>
                </div>
                <Link to="/admin/categories/new" className="btn btn-primary">
                    <Plus size={20} />
                    Tambah Kategori
                </Link>
            </div>

            {/* Search */}
            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Cari kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            {/* Categories Grid */}
            <div className="categories-grid">
                {filteredCategories.map((category) => (
                    <div key={category.id} className="category-card">
                        <div className="category-card-image">
                            <img src={category.image} alt={category.name} />
                            <span className="category-icon-badge">{category.icon}</span>
                        </div>
                        <div className="category-card-content">
                            <h3 className="category-card-name">{category.name}</h3>
                            <p className="category-card-desc">{category.description}</p>
                            <div className="category-card-stats">
                                <span className="product-count">
                                    <Grid3X3 size={14} />
                                    {category.productCount} Produk
                                </span>
                            </div>
                        </div>
                        <div className="category-card-actions">
                            <button className="action-btn edit">
                                <Edit2 size={16} />
                                Edit
                            </button>
                            <button className="action-btn delete">
                                <Trash2 size={16} />
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCategories.length === 0 && (
                <div className="empty-state">
                    <Grid3X3 size={48} />
                    <h3>Tidak ada kategori ditemukan</h3>
                    <p>Coba ubah kata kunci pencarian</p>
                </div>
            )}
        </div>
    );
}
