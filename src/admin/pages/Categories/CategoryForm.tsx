import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ChevronLeft,
    Save,
    Loader2,
    Folder,
    Image as ImageIcon
} from 'lucide-react';
import { categoryService } from '../../../lib/categoryService';
import { fileService } from '../../../lib/fileService';
import { useUIStore } from '../../../store';
import { ImageUploader } from '../../../components';
import './CategoryForm.css';

interface CategoryFormData {
    name: string;
    slug: string;
    description: string;
    image: string;
    isActive: boolean;
}

const defaultFormData: CategoryFormData = {
    name: '',
    slug: '',
    description: '',
    image: '',
    isActive: true,
};

export default function CategoryForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToast } = useUIStore();
    const isEdit = !!id;

    const [formData, setFormData] = useState<CategoryFormData>(defaultFormData);
    const [isLoading, setIsLoading] = useState(isEdit);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isEdit && id) {
            fetchCategory();
        }
    }, [id, isEdit]);

    const fetchCategory = async () => {
        try {
            const response = await categoryService.getCategoryById(id!);
            if (response.success) {
                const category = response.data;
                setFormData({
                    name: category.name,
                    slug: category.slug,
                    description: category.description || '',
                    image: category.image || '',
                    isActive: true,
                });
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Gagal memuat data kategori',
            });
            navigate('/admin/categories');
        } finally {
            setIsLoading(false);
        }
    };

    const generateSlug = (name: string) => {
        return name.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                ...(name === 'name' && !isEdit ? { slug: generateSlug(value) } : {}),
            }));
        }
    };

    const handleImageChange = (newImage: string | string[]) => {
        setFormData(prev => ({
            ...prev,
            image: Array.isArray(newImage) ? newImage[0] : newImage
        }));
    };

    const handleImageUpload = async (file: File): Promise<string> => {
        try {
            const response = await fileService.uploadImage(file, 'categories');
            return response.data.url;
        } catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name) {
            addToast({
                type: 'error',
                title: 'Validasi Error',
                message: 'Nama kategori wajib diisi',
            });
            return;
        }

        setIsSaving(true);
        try {
            if (isEdit) {
                await categoryService.updateCategory(id!, formData);
                addToast({
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Kategori berhasil diperbarui',
                });
            } else {
                await categoryService.createCategory(formData);
                addToast({
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Kategori berhasil ditambahkan',
                });
            }
            navigate('/admin/categories');
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: error instanceof Error ? error.message : 'Gagal menyimpan kategori',
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="admin-category-form">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat data kategori...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-category-form">
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <Link to="/admin/categories" className="back-btn">
                        <ChevronLeft size={20} />
                        Kembali
                    </Link>
                    <h2>{isEdit ? 'Edit Kategori' : 'Tambah Kategori Baru'}</h2>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Simpan Kategori
                        </>
                    )}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="category-form">
                <div className="form-layout">
                    <div className="form-main">
                        <div className="form-card">
                            <h3><Folder size={20} /> Informasi Kategori</h3>

                            <div className="form-group">
                                <label>Nama Kategori *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Brosur & Flyer"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Slug URL</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="brosur-flyer"
                                />
                                <span className="form-hint">URL: /kategori/{formData.slug || 'slug-kategori'}</span>
                            </div>

                            <div className="form-group">
                                <label>Deskripsi</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Deskripsi singkat kategori..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-sidebar">
                        <div className="form-card">
                            <h3><ImageIcon size={20} /> Gambar Kategori</h3>

                            <ImageUploader
                                value={formData.image}
                                onChange={handleImageChange}
                                onUpload={handleImageUpload}
                                multiple={false}
                                placeholder="Upload icon/gambar"
                                className="category-uploader"
                            />
                        </div>

                        <div className="form-card">
                            <h3>Status</h3>

                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                />
                                <span className="checkmark"></span>
                                Kategori Aktif
                            </label>
                            <p className="form-hint">Kategori akan ditampilkan di website</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
