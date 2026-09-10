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
import { categoryService } from '../../../lib/categoryService';
import { useUIStore } from '../../../store';
import type { ProductCategory } from '../../../types';
import './Categories.css';

export default function Categories() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: categories, isLoading, refetch: refetchCategories } = useCategories();
    const { addToast } = useUIStore();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const filteredCategories = useMemo(() => {
        return (categories || []).filter(cat =>
            cat.nama.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [categories, searchQuery]);

    const handleDeleteCategory = async (category: ProductCategory) => {
        if ((category.productCount ?? 0) > 0) {
            addToast({
                type: 'warning',
                title: 'Tidak bisa dihapus',
                message: `Pindahkan atau hapus ${category.productCount} produk di kategori ini terlebih dahulu`,
            });
            return;
        }

        if (!window.confirm(`Hapus kategori "${category.nama}"? Tindakan ini tidak bisa dibatalkan.`)) {
            return;
        }

        setDeletingId(category.id);
        try {
            await categoryService.deleteCategory(category.id);
            addToast({ type: 'success', title: 'Kategori dihapus', message: category.nama });
            refetchCategories();
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Gagal menghapus kategori',
                message: error instanceof Error ? error.message : 'Terjadi kesalahan, silakan coba lagi',
            });
        } finally {
            setDeletingId(null);
        }
    };

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
                            <img src={category.gambar} alt={category.nama} />
                            <span className="category-icon-badge">{category.ikon}</span>
                        </div>
                        <div className="category-card-content">
                            <h3 className="category-card-name">{category.nama}</h3>
                            <p className="category-card-desc">{category.deskripsi}</p>
                            <div className="category-card-stats">
                                <span className="product-count">
                                    <Grid3X3 size={14} />
                                    {category.productCount} Produk
                                </span>
                            </div>
                        </div>
                        <div className="category-card-actions">
                            <Link to={`/admin/categories/${category.id}/edit`} className="action-btn edit">
                                <Edit2 size={18} />
                                Edit
                            </Link>
                            <button
                                className="action-btn delete"
                                disabled={deletingId === category.id}
                                onClick={() => handleDeleteCategory(category)}
                            >
                                <Trash2 size={18} />
                                {deletingId === category.id ? 'Menghapus...' : 'Hapus'}
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
