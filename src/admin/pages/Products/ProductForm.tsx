import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ChevronLeft,
    Save,
    Plus,
    Trash2,
    Loader2
} from 'lucide-react';
import { productService } from '../../../lib/productService';
import { fileService } from '../../../lib/fileService';
import { useCategories } from '../../../hooks';
import { useUIStore } from '../../../store';
import { ImageUploader } from '../../../components';
import type { ProductSize, ProductMaterial, PrintSide, Finishing, QuantityTier } from '../../../types';
import './ProductForm.css';

interface ProductFormData {
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    categoryId: string;
    basePrice: number;
    minOrderQty: number;
    estimatedDays: number;
    weightPerPiece: number;
    images: string[];
    sizes: ProductSize[];
    materials: ProductMaterial[];
    printSides: PrintSide[];
    finishings: Finishing[];
    quantityTiers: QuantityTier[];
    isBestSeller: boolean;
    isPromo: boolean;
    isRetailProduct?: boolean;
    isActive: boolean;
    promoPercentage?: number;
    requiresDesignFile?: boolean;
    allowedFileTypes: string[];
    maxFileSize: number;
}

const defaultFormData: ProductFormData = {
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    categoryId: '',
    basePrice: 0,
    minOrderQty: 100,
    estimatedDays: 3,
    weightPerPiece: 10,
    images: [],
    sizes: [],
    materials: [],
    printSides: [],
    finishings: [],
    quantityTiers: [{ minQty: 100, maxQty: 499, pricePerUnit: 0 }],
    isBestSeller: false,
    isPromo: false,
    isRetailProduct: false,
    isActive: true,
    promoPercentage: undefined,
    requiresDesignFile: true,
    allowedFileTypes: ['pdf', 'ai', 'psd', 'jpg', 'png'],
    maxFileSize: 50,
};

export default function ProductForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToast } = useUIStore();
    const isEdit = !!id;

    const { data: categories } = useCategories();
    const [formData, setFormData] = useState<ProductFormData>(defaultFormData);
    const [isLoading, setIsLoading] = useState(isEdit);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'basic' | 'options' | 'pricing' | 'settings'>('basic');

    useEffect(() => {
        if (isEdit && id) {
            fetchProduct();
        }
    }, [id, isEdit]);

    const fetchProduct = async () => {
        try {
            const response = await productService.getProductById(id!);
            if (response.success) {
                const product = response.data;
                setFormData({
                    name: product.name,
                    slug: product.slug,
                    shortDescription: product.shortDescription,
                    description: product.description,
                    categoryId: product.categoryId,
                    basePrice: product.basePrice,
                    minOrderQty: product.minOrderQty,
                    estimatedDays: product.estimatedDays,
                    weightPerPiece: product.weightPerPiece || 10,
                    images: product.images,
                    sizes: product.sizes,
                    materials: product.materials,
                    printSides: product.printSides,
                    finishings: product.finishings,
                    quantityTiers: product.quantityTiers,
                    isBestSeller: product.isBestSeller,
                    isPromo: product.isPromo,
                    isRetailProduct: product.isRetailProduct,
                    isActive: true,
                    promoPercentage: product.promoPercentage,
                    requiresDesignFile: product.requiresDesignFile !== false,
                    allowedFileTypes: product.allowedFileTypes,
                    maxFileSize: product.maxFileSize,
                });
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Gagal memuat data produk',
            });
            navigate('/admin/products');
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked,
            }));
        } else if (type === 'number') {
            setFormData(prev => ({
                ...prev,
                [name]: parseFloat(value) || 0,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                ...(name === 'name' && !isEdit ? { slug: generateSlug(value) } : {}),
            }));
        }
    };

    // Size handlers
    const addSize = () => {
        setFormData(prev => ({
            ...prev,
            sizes: [...prev.sizes, { id: Date.now().toString(), name: '', dimensions: '', priceMultiplier: 1 }],
        }));
    };

    const updateSize = (index: number, field: keyof ProductSize, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.map((size, i) =>
                i === index ? { ...size, [field]: value } : size
            ),
        }));
    };

    const removeSize = (index: number) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.filter((_, i) => i !== index),
        }));
    };

    // Material handlers
    const addMaterial = () => {
        setFormData(prev => ({
            ...prev,
            materials: [...prev.materials, { id: Date.now().toString(), name: '', description: '', pricePerUnit: 0 }],
        }));
    };

    const updateMaterial = (index: number, field: keyof ProductMaterial, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            materials: prev.materials.map((mat, i) =>
                i === index ? { ...mat, [field]: value } : mat
            ),
        }));
    };

    const removeMaterial = (index: number) => {
        setFormData(prev => ({
            ...prev,
            materials: prev.materials.filter((_, i) => i !== index),
        }));
    };

    // Print Side handlers
    const addPrintSide = () => {
        setFormData(prev => ({
            ...prev,
            printSides: [...prev.printSides, { id: Date.now().toString(), name: '', priceMultiplier: 1 }],
        }));
    };

    const updatePrintSide = (index: number, field: keyof PrintSide, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            printSides: prev.printSides.map((ps, i) =>
                i === index ? { ...ps, [field]: value } : ps
            ),
        }));
    };

    const removePrintSide = (index: number) => {
        setFormData(prev => ({
            ...prev,
            printSides: prev.printSides.filter((_, i) => i !== index),
        }));
    };

    // Finishing handlers
    const addFinishing = () => {
        setFormData(prev => ({
            ...prev,
            finishings: [...prev.finishings, { id: Date.now().toString(), name: '', price: 0 }],
        }));
    };

    const updateFinishing = (index: number, field: keyof Finishing, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            finishings: prev.finishings.map((fin, i) =>
                i === index ? { ...fin, [field]: value } : fin
            ),
        }));
    };

    const removeFinishing = (index: number) => {
        setFormData(prev => ({
            ...prev,
            finishings: prev.finishings.filter((_, i) => i !== index),
        }));
    };

    // Quantity Tier handlers
    const addTier = () => {
        const lastTier = formData.quantityTiers[formData.quantityTiers.length - 1];
        setFormData(prev => ({
            ...prev,
            quantityTiers: [...prev.quantityTiers, {
                minQty: (lastTier?.maxQty || 0) + 1,
                maxQty: (lastTier?.maxQty || 0) + 500,
                pricePerUnit: lastTier?.pricePerUnit || 0
            }],
        }));
    };

    const updateTier = (index: number, field: keyof QuantityTier, value: number) => {
        setFormData(prev => ({
            ...prev,
            quantityTiers: prev.quantityTiers.map((tier, i) =>
                i === index ? { ...tier, [field]: value } : tier
            ),
        }));
    };

    const removeTier = (index: number) => {
        if (formData.quantityTiers.length > 1) {
            setFormData(prev => ({
                ...prev,
                quantityTiers: prev.quantityTiers.filter((_, i) => i !== index),
            }));
        }
    };

    // Image handlers
    const handleImagesChange = (newImages: string | string[]) => {
        setFormData(prev => ({
            ...prev,
            images: Array.isArray(newImages) ? newImages : [newImages]
        }));
    };

    const handleImageUpload = async (file: File): Promise<string> => {
        try {
            // Use generic upload first
            const response = await fileService.uploadImage(file, 'products');
            return response.data.url;
        } catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.categoryId) {
            addToast({
                type: 'error',
                title: 'Validasi Error',
                message: 'Nama dan kategori wajib diisi',
            });
            return;
        }

        setIsSaving(true);
        try {
            if (isEdit) {
                await productService.updateProduct(id!, formData);
                addToast({
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Produk berhasil diperbarui',
                });
            } else {
                await productService.createProduct(formData);
                addToast({
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Produk berhasil ditambahkan',
                });
            }
            navigate('/admin/products');
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: error instanceof Error ? error.message : 'Gagal menyimpan produk',
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="admin-product-form">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat data produk...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-product-form">
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <Link to="/admin/products" className="back-btn">
                        <ChevronLeft size={20} />
                        Kembali
                    </Link>
                    <h2>{isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
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
                            Simpan Produk
                        </>
                    )}
                </button>
            </div>

            {/* Tabs */}
            <div className="form-tabs">
                <button
                    className={`tab ${activeTab === 'basic' ? 'active' : ''} `}
                    onClick={() => setActiveTab('basic')}
                >
                    Informasi Dasar
                </button>
                <button
                    className={`tab ${activeTab === 'options' ? 'active' : ''} `}
                    onClick={() => setActiveTab('options')}
                >
                    Opsi Produk
                </button>
                <button
                    className={`tab ${activeTab === 'pricing' ? 'active' : ''} `}
                    onClick={() => setActiveTab('pricing')}
                >
                    Harga & Tier
                </button>
                <button
                    className={`tab ${activeTab === 'settings' ? 'active' : ''} `}
                    onClick={() => setActiveTab('settings')}
                >
                    Pengaturan
                </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
                {/* Basic Info */}
                {activeTab === 'basic' && (
                    <div className="form-section">
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Nama Produk *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Brosur A5 Premium"
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
                                    placeholder="brosur-a5-premium"
                                />
                            </div>

                            <div className="form-group">
                                <label>Kategori *</label>
                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories?.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group full-width">
                                <label>Deskripsi Singkat</label>
                                <input
                                    type="text"
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleChange}
                                    placeholder="Brosur berkualitas dengan berbagai pilihan bahan"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Deskripsi Lengkap</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Deskripsi lengkap produk..."
                                />
                            </div>

                            <div className="form-group">
                                <label>Minimum Order</label>
                                <input
                                    type="number"
                                    name="minOrderQty"
                                    value={formData.minOrderQty}
                                    onChange={handleChange}
                                    min={1}
                                />
                            </div>

                            <div className="form-group">
                                <label>Estimasi Hari Kerja</label>
                                <input
                                    type="number"
                                    name="estimatedDays"
                                    value={formData.estimatedDays}
                                    onChange={handleChange}
                                    min={1}
                                />
                            </div>
                        </div>

                        {/* Images */}
                        <div className="images-section">
                            <h3>Gambar Produk</h3>
                            <ImageUploader
                                value={formData.images}
                                onChange={handleImagesChange}
                                onUpload={handleImageUpload}
                                multiple={true}
                                maxImages={5}
                                placeholder="Upload gambar produk"
                            />
                        </div>
                    </div>
                )}

                {/* Options */}
                {activeTab === 'options' && (
                    <div className="form-section">
                        {/* Sizes */}
                        <div className="options-card">
                            <div className="options-header">
                                <h3>Ukuran</h3>
                                <button type="button" className="btn btn-sm btn-outline" onClick={addSize}>
                                    <Plus size={16} /> Tambah Ukuran
                                </button>
                            </div>
                            {formData.sizes.length === 0 ? (
                                <p className="no-options">Belum ada ukuran. Klik tombol di atas untuk menambahkan.</p>
                            ) : (
                                <div className="options-list">
                                    {formData.sizes.map((size, index) => (
                                        <div key={size.id} className="option-row">
                                            <input
                                                type="text"
                                                value={size.name}
                                                onChange={(e) => updateSize(index, 'name', e.target.value)}
                                                placeholder="Nama (misal: A5)"
                                            />
                                            <input
                                                type="text"
                                                value={size.dimensions || ''}
                                                onChange={(e) => updateSize(index, 'dimensions', e.target.value)}
                                                placeholder="Dimensi (misal: 148 x 210 mm)"
                                            />
                                            <input
                                                type="number"
                                                value={size.priceMultiplier}
                                                onChange={(e) => updateSize(index, 'priceMultiplier', parseFloat(e.target.value))}
                                                placeholder="Multiplier"
                                                step="0.1"
                                            />
                                            <button type="button" className="remove-btn" onClick={() => removeSize(index)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Materials */}
                        <div className="options-card">
                            <div className="options-header">
                                <h3>Material/Bahan</h3>
                                <button type="button" className="btn btn-sm btn-outline" onClick={addMaterial}>
                                    <Plus size={16} /> Tambah Material
                                </button>
                            </div>
                            {formData.materials.length === 0 ? (
                                <p className="no-options">Belum ada material.</p>
                            ) : (
                                <div className="options-list">
                                    {formData.materials.map((mat, index) => (
                                        <div key={mat.id} className="option-row">
                                            <input
                                                type="text"
                                                value={mat.name}
                                                onChange={(e) => updateMaterial(index, 'name', e.target.value)}
                                                placeholder="Nama material"
                                            />
                                            <input
                                                type="text"
                                                value={mat.description || ''}
                                                onChange={(e) => updateMaterial(index, 'description', e.target.value)}
                                                placeholder="Deskripsi"
                                            />
                                            <input
                                                type="number"
                                                value={mat.pricePerUnit}
                                                onChange={(e) => updateMaterial(index, 'pricePerUnit', parseFloat(e.target.value))}
                                                placeholder="Harga tambahan"
                                            />
                                            <button type="button" className="remove-btn" onClick={() => removeMaterial(index)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Print Sides */}
                        <div className="options-card">
                            <div className="options-header">
                                <h3>Sisi Cetak</h3>
                                <button type="button" className="btn btn-sm btn-outline" onClick={addPrintSide}>
                                    <Plus size={16} /> Tambah
                                </button>
                            </div>
                            {formData.printSides.length === 0 ? (
                                <p className="no-options">Belum ada opsi sisi cetak.</p>
                            ) : (
                                <div className="options-list">
                                    {formData.printSides.map((ps, index) => (
                                        <div key={ps.id} className="option-row">
                                            <input
                                                type="text"
                                                value={ps.name}
                                                onChange={(e) => updatePrintSide(index, 'name', e.target.value)}
                                                placeholder="Nama (misal: 1 Sisi)"
                                            />
                                            <input
                                                type="number"
                                                value={ps.priceMultiplier}
                                                onChange={(e) => updatePrintSide(index, 'priceMultiplier', parseFloat(e.target.value))}
                                                placeholder="Multiplier"
                                                step="0.1"
                                            />
                                            <button type="button" className="remove-btn" onClick={() => removePrintSide(index)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Finishings */}
                        <div className="options-card">
                            <div className="options-header">
                                <h3>Finishing</h3>
                                <button type="button" className="btn btn-sm btn-outline" onClick={addFinishing}>
                                    <Plus size={16} /> Tambah
                                </button>
                            </div>
                            {formData.finishings.length === 0 ? (
                                <p className="no-options">Belum ada opsi finishing.</p>
                            ) : (
                                <div className="options-list">
                                    {formData.finishings.map((fin, index) => (
                                        <div key={fin.id} className="option-row">
                                            <input
                                                type="text"
                                                value={fin.name}
                                                onChange={(e) => updateFinishing(index, 'name', e.target.value)}
                                                placeholder="Nama finishing"
                                            />
                                            <input
                                                type="number"
                                                value={fin.price}
                                                onChange={(e) => updateFinishing(index, 'price', parseFloat(e.target.value))}
                                                placeholder="Harga"
                                            />
                                            <button type="button" className="remove-btn" onClick={() => removeFinishing(index)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Pricing */}
                {activeTab === 'pricing' && (
                    <div className="form-section">
                        <div className="form-group" style={{ maxWidth: '300px' }}>
                            <label>Harga Dasar per Unit</label>
                            <input
                                type="number"
                                name="basePrice"
                                value={formData.basePrice}
                                onChange={handleChange}
                                min={0}
                            />
                        </div>

                        <div className="options-card">
                            <div className="options-header">
                                <h3>Tingkatan Harga (Quantity Tiers)</h3>
                                <button type="button" className="btn btn-sm btn-outline" onClick={addTier}>
                                    <Plus size={16} /> Tambah Tier
                                </button>
                            </div>
                            <div className="tier-header">
                                <span>Min. Qty</span>
                                <span>Max. Qty</span>
                                <span>Harga per Unit</span>
                                <span></span>
                            </div>
                            <div className="options-list">
                                {formData.quantityTiers.map((tier, index) => (
                                    <div key={index} className="option-row tier-row">
                                        <input
                                            type="number"
                                            value={tier.minQty}
                                            onChange={(e) => updateTier(index, 'minQty', parseInt(e.target.value))}
                                        />
                                        <input
                                            type="number"
                                            value={tier.maxQty}
                                            onChange={(e) => updateTier(index, 'maxQty', parseInt(e.target.value))}
                                        />
                                        <input
                                            type="number"
                                            value={tier.pricePerUnit}
                                            onChange={(e) => updateTier(index, 'pricePerUnit', parseFloat(e.target.value))}
                                        />
                                        <button
                                            type="button"
                                            className="remove-btn"
                                            onClick={() => removeTier(index)}
                                            disabled={formData.quantityTiers.length <= 1}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings */}
                {activeTab === 'settings' && (
                    <div className="form-section">
                        <div className="settings-grid">
                            <div className="setting-item">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark"></span>
                                    Produk Aktif
                                </label>
                                <p className="setting-desc">Produk akan ditampilkan di website</p>
                            </div>

                            <div className="setting-item">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="isBestSeller"
                                        checked={formData.isBestSeller}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark"></span>
                                    Best Seller
                                </label>
                                <p className="setting-desc">Tandai sebagai produk terlaris</p>
                            </div>

                            <div className="setting-item">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="isPromo"
                                        checked={formData.isPromo}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark"></span>
                                    Produk Promo
                                </label>
                                <p className="setting-desc">Tampilkan badge promo</p>
                                {formData.isPromo && (
                                    <div className="promo-field-container">
                                        <label>Persentase Diskon</label>
                                        <div className="promo-input-group">
                                            <input
                                                type="number"
                                                name="promoPercentage"
                                                value={formData.promoPercentage || ''}
                                                onChange={handleChange}
                                                min={0}
                                                max={100}
                                                placeholder="10"
                                            />
                                            <span>%</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="setting-item">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="isRetailProduct"
                                        checked={formData.isRetailProduct}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark"></span>
                                    Produk Retail
                                </label>
                                <p className="setting-desc">Produk jadi tanpa perlu desain</p>
                            </div>

                            <div className="setting-item">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="requiresDesignFile"
                                        checked={formData.requiresDesignFile}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark"></span>
                                    Wajib Upload File Desain
                                </label>
                                <p className="setting-desc">Pelanggan harus upload file desain</p>
                            </div>
                        </div>

                        {formData.requiresDesignFile && (
                            <div className="file-settings">
                                <h3>Pengaturan File</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Ukuran Maksimal (MB)</label>
                                        <input
                                            type="number"
                                            name="maxFileSize"
                                            value={formData.maxFileSize}
                                            onChange={handleChange}
                                            min={1}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Format yang Diizinkan</label>
                                        <input
                                            type="text"
                                            value={formData.allowedFileTypes.join(', ')}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                allowedFileTypes: e.target.value.split(',').map(t => t.trim().toLowerCase()),
                                            }))}
                                            placeholder="pdf, ai, psd, jpg, png"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}
