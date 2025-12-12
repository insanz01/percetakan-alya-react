import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ChevronLeft,
    ChevronRight,
    Minus,
    Plus,
    Upload,
    ShoppingCart,
    Check,
    Clock,
    Truck,
    Shield,
    Star,
    Info,
    X,
    FileText,
    Loader2
} from 'lucide-react';
import { useProduct, useCategories } from '../../hooks';
import { formatPrice } from '../../lib/utils';
import { useCartStore, useUIStore } from '../../store';
import type { CartItemConfig, UploadedFile } from '../../types';
import './ProductDetail.css';

export default function ProductDetail() {
    const { slug } = useParams<{ slug: string }>();
    const { data: product, isLoading } = useProduct(slug || '', true);
    const { data: categories } = useCategories();

    const { addItem } = useCartStore();
    const { addToast } = useUIStore();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSizeId, setSelectedSizeId] = useState<string>('');
    const [selectedMaterialId, setSelectedMaterialId] = useState<string>('');
    const [selectedPrintSideId, setSelectedPrintSideId] = useState<string>('');
    const [selectedFinishingIds, setSelectedFinishingIds] = useState<string[]>([]);
    const [quantity, setQuantity] = useState<number>(100);
    const [customWidth, setCustomWidth] = useState<number>(0);
    const [customHeight, setCustomHeight] = useState<number>(0);
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Initialize defaults
    useEffect(() => {
        if (product) {
            setSelectedSizeId(product.sizes[0]?.id || '');
            setSelectedMaterialId(product.materials[0]?.id || '');
            setSelectedPrintSideId(product.printSides[0]?.id || '');
            setQuantity(product.minOrderQty);
        }
    }, [product]);

    // Calculate price
    const calculatedPrice = useMemo(() => {
        if (!product) return { unitPrice: 0, totalPrice: 0, breakdown: [] as { label: string; value: number }[] };

        const breakdown: { label: string; value: number }[] = [];

        // Get tier price based on quantity
        const tier = product.quantityTiers.find(t => quantity >= t.minQty && quantity <= t.maxQty);
        const baseUnitPrice = tier?.pricePerUnit || product.quantityTiers[0].pricePerUnit;
        breakdown.push({ label: 'Harga dasar per pcs', value: baseUnitPrice });

        // Size multiplier
        const size = product.sizes.find(s => s.id === selectedSizeId);
        let sizeMultiplier = size?.priceMultiplier || 1;

        // Custom size calculation
        if (size?.name.toLowerCase().includes('custom') && customWidth > 0 && customHeight > 0) {
            const baseSize = product.sizes[0];
            const baseArea = (baseSize?.width || 148) * (baseSize?.height || 210); // Default to A5 area
            const customArea = customWidth * customHeight;
            sizeMultiplier = Math.max(1, customArea / baseArea);
        }

        if (sizeMultiplier !== 1) {
            breakdown.push({ label: `Ukuran ${size?.name} (x${sizeMultiplier.toFixed(1)})`, value: baseUnitPrice * (sizeMultiplier - 1) });
        }

        // Material price
        const material = product.materials.find(m => m.id === selectedMaterialId);
        const materialPrice = material?.pricePerUnit || 0;
        breakdown.push({ label: `Bahan: ${material?.name} ${material?.weight}`, value: materialPrice });

        // Print side multiplier
        const printSide = product.printSides.find(p => p.id === selectedPrintSideId);
        const printSideMultiplier = printSide?.priceMultiplier || 1;
        if (printSideMultiplier !== 1) {
            breakdown.push({ label: `Cetak ${printSide?.name} (x${printSideMultiplier.toFixed(1)})`, value: baseUnitPrice * (printSideMultiplier - 1) });
        }

        // Finishing prices
        let finishingTotal = 0;
        selectedFinishingIds.forEach(fId => {
            const finishing = product.finishings.find(f => f.id === fId);
            if (finishing) {
                finishingTotal += finishing.price;
                breakdown.push({ label: `Finishing: ${finishing.name}`, value: finishing.price });
            }
        });

        // Calculate unit price
        const unitPrice = (baseUnitPrice * sizeMultiplier * printSideMultiplier) + materialPrice + finishingTotal;

        // Apply promo discount
        let discountedUnitPrice = unitPrice;
        if (product.isPromo && product.promoPercentage) {
            const discount = unitPrice * (product.promoPercentage / 100);
            discountedUnitPrice = unitPrice - discount;
            breakdown.push({ label: `Diskon ${product.promoPercentage}%`, value: -discount });
        }

        const totalPrice = discountedUnitPrice * quantity;

        return { unitPrice: discountedUnitPrice, totalPrice, breakdown };
    }, [product, quantity, selectedSizeId, selectedMaterialId, selectedPrintSideId, selectedFinishingIds, customWidth, customHeight]);

    const toggleFinishing = (finishingId: string) => {
        setSelectedFinishingIds(prev =>
            prev.includes(finishingId)
                ? prev.filter(id => id !== finishingId)
                : [...prev, finishingId]
        );
    };

    const handleQuantityChange = (value: number) => {
        if (product) {
            const newValue = Math.max(product.minOrderQty, value);
            setQuantity(newValue);
        }
    };

    const handleFileUpload = (files: FileList | null) => {
        if (!files || files.length === 0 || !product) return;

        const file = files[0];
        const extension = file.name.split('.').pop()?.toLowerCase() || '';

        // Validate file type
        if (!product.allowedFileTypes.includes(extension)) {
            addToast({
                type: 'error',
                title: 'Format file tidak didukung',
                message: `Format yang diizinkan: ${product.allowedFileTypes.join(', ').toUpperCase()}`,
            });
            return;
        }

        // Validate file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > product.maxFileSize) {
            addToast({
                type: 'error',
                title: 'Ukuran file terlalu besar',
                message: `Maksimal ${product.maxFileSize}MB`,
            });
            return;
        }

        // Create uploaded file object
        const uploaded: UploadedFile = {
            id: `file-${Date.now()}`,
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file),
            status: 'success',
        };

        setUploadedFile(uploaded);
        addToast({
            type: 'success',
            title: 'File berhasil diupload',
            message: file.name,
        });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileUpload(e.dataTransfer.files);
    };

    const handleAddToCart = () => {
        if (!product) return;

        // Only require file upload for print services, not retail products
        const needsDesignFile = product.requiresDesignFile !== false && !product.isRetailProduct;

        if (needsDesignFile && !uploadedFile) {
            addToast({
                type: 'warning',
                title: 'Upload file desain',
                message: 'Silakan upload file desain Anda sebelum menambahkan ke keranjang',
            });
            return;
        }

        const config: CartItemConfig = {
            sizeId: selectedSizeId,
            materialId: selectedMaterialId,
            printSideId: selectedPrintSideId,
            finishingIds: selectedFinishingIds,
            quantity,
            customWidth: customWidth || undefined,
            customHeight: customHeight || undefined,
        };

        addItem(product, config, calculatedPrice.unitPrice, calculatedPrice.totalPrice);

        addToast({
            type: 'success',
            title: 'Berhasil ditambahkan ke keranjang',
            message: `${product.name} x ${quantity} pcs`,
        });
    };

    if (isLoading) {
        return (
            <div className="container py-16">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat produk...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container py-16">
                <div className="not-found">
                    <h1>Produk tidak ditemukan</h1>
                    <p>Maaf, produk yang Anda cari tidak tersedia.</p>
                    <Link to="/" className="btn btn-primary">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    const category = (categories || []).find(c => c.id === product.categoryId);
    const selectedSize = product.sizes.find(s => s.id === selectedSizeId);

    return (
        <div className="product-detail-page">
            {/* Breadcrumb */}
            <div className="breadcrumb-section">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Beranda</Link>
                        <ChevronRight size={14} />
                        <Link to={`/kategori/${category?.slug}`}>{category?.name}</Link>
                        <ChevronRight size={14} />
                        <span>{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container py-8">
                <div className="product-detail-grid">
                    {/* Product Images */}
                    <div className="product-images">
                        <div className="product-main-image">
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.name}
                            />
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        className="image-nav image-nav-prev"
                                        onClick={() => setCurrentImageIndex(prev => (prev - 1 + product.images.length) % product.images.length)}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        className="image-nav image-nav-next"
                                        onClick={() => setCurrentImageIndex(prev => (prev + 1) % product.images.length)}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </>
                            )}
                            {product.isBestSeller && (
                                <span className="product-badge-large badge-bestseller">
                                    <Star size={14} /> Best Seller
                                </span>
                            )}
                            {product.isPromo && product.promoPercentage && (
                                <span className="product-badge-large badge-promo">
                                    -{product.promoPercentage}%
                                </span>
                            )}
                        </div>
                        {product.images.length > 1 && (
                            <div className="product-thumbnails">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    >
                                        <img src={img} alt={`${product.name} ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info & Calculator */}
                    <div className="product-info">
                        <div className="product-header">
                            <h1 className="product-title">{product.name}</h1>
                            <div className="product-meta-info">
                                <div className="meta-item">
                                    <Clock size={16} />
                                    <span>Estimasi {product.estimatedDays} hari kerja</span>
                                </div>
                                <div className="meta-item">
                                    <Truck size={16} />
                                    <span>Pengiriman seluruh Indonesia</span>
                                </div>
                            </div>
                        </div>

                        {/* Price Calculator */}
                        <div className="price-calculator">
                            <h3 className="calculator-title">Kustomisasi Pesanan</h3>

                            {/* Size Selection */}
                            <div className="config-section">
                                <label className="config-label">
                                    Ukuran
                                    <Info size={14} className="info-icon" />
                                </label>
                                <div className="config-options">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size.id}
                                            className={`config-option ${selectedSizeId === size.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedSizeId(size.id)}
                                        >
                                            {selectedSizeId === size.id && <Check size={14} />}
                                            {size.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Size Input */}
                                {selectedSize?.name.toLowerCase().includes('custom') && (
                                    <div className="custom-size-inputs">
                                        <div className="input-group">
                                            <label>Lebar (mm)</label>
                                            <input
                                                type="number"
                                                className="input"
                                                value={customWidth || ''}
                                                onChange={(e) => setCustomWidth(Number(e.target.value))}
                                                placeholder="Lebar"
                                                min={1}
                                            />
                                        </div>
                                        <span className="size-separator">×</span>
                                        <div className="input-group">
                                            <label>Tinggi (mm)</label>
                                            <input
                                                type="number"
                                                className="input"
                                                value={customHeight || ''}
                                                onChange={(e) => setCustomHeight(Number(e.target.value))}
                                                placeholder="Tinggi"
                                                min={1}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Material Selection */}
                            <div className="config-section">
                                <label className="config-label">Bahan</label>
                                <div className="config-options config-options-vertical">
                                    {product.materials.map(material => (
                                        <button
                                            key={material.id}
                                            className={`config-option-card ${selectedMaterialId === material.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedMaterialId(material.id)}
                                        >
                                            <div className="option-card-check">
                                                {selectedMaterialId === material.id && <Check size={16} />}
                                            </div>
                                            <div className="option-card-info">
                                                <span className="option-card-name">{material.name} {material.weight}</span>
                                                <span className="option-card-desc">{material.description}</span>
                                            </div>
                                            <span className="option-card-price">+{formatPrice(material.pricePerUnit)}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Print Side Selection */}
                            <div className="config-section">
                                <label className="config-label">Sisi Cetak</label>
                                <div className="config-options">
                                    {product.printSides.map(side => (
                                        <button
                                            key={side.id}
                                            className={`config-option ${selectedPrintSideId === side.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedPrintSideId(side.id)}
                                        >
                                            {selectedPrintSideId === side.id && <Check size={14} />}
                                            {side.name} ({side.code})
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Finishing Selection */}
                            <div className="config-section">
                                <label className="config-label">Finishing (Opsional)</label>
                                <div className="config-options config-options-wrap">
                                    {product.finishings.map(finishing => (
                                        <button
                                            key={finishing.id}
                                            className={`config-option ${selectedFinishingIds.includes(finishing.id) ? 'selected' : ''}`}
                                            onClick={() => toggleFinishing(finishing.id)}
                                        >
                                            {selectedFinishingIds.includes(finishing.id) && <Check size={14} />}
                                            {finishing.name}
                                            <span className="finishing-price">+{formatPrice(finishing.price)}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Input */}
                            <div className="config-section">
                                <label className="config-label">
                                    Jumlah (Minimum {product.minOrderQty} pcs)
                                </label>
                                <div className="quantity-input-group">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(quantity - 50)}
                                        disabled={quantity <= product.minOrderQty}
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <input
                                        type="number"
                                        className="input quantity-input"
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                                        min={product.minOrderQty}
                                    />
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(quantity + 50)}
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>

                                {/* Quantity Tiers Info */}
                                <div className="quantity-tiers">
                                    {product.quantityTiers.map((tier, index) => (
                                        <span
                                            key={index}
                                            className={`tier ${quantity >= tier.minQty && quantity <= tier.maxQty ? 'active' : ''}`}
                                        >
                                            {tier.minQty}-{tier.maxQty === 99999 ? '∞' : tier.maxQty}: {formatPrice(tier.pricePerUnit)}/pcs
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* File Upload - Only for print services */}
                            {product.requiresDesignFile !== false && !product.isRetailProduct && (
                                <div className="config-section">
                                    <label className="config-label">
                                        Upload File Desain
                                        <span className="required">*Wajib</span>
                                    </label>
                                    <div
                                        className={`upload-zone ${isDragging ? 'dragging' : ''} ${uploadedFile ? 'has-file' : ''}`}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                        onDragLeave={() => setIsDragging(false)}
                                        onDrop={handleDrop}
                                    >
                                        {uploadedFile ? (
                                            <div className="uploaded-file">
                                                <FileText size={32} />
                                                <div className="uploaded-file-info">
                                                    <p className="uploaded-file-name">{uploadedFile.name}</p>
                                                    <p className="uploaded-file-size">
                                                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                                                    </p>
                                                </div>
                                                <button
                                                    className="remove-file-btn"
                                                    onClick={() => setUploadedFile(null)}
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload size={40} />
                                                <p>Drag & drop file atau</p>
                                                <label className="btn btn-outline btn-sm">
                                                    Pilih File
                                                    <input
                                                        type="file"
                                                        className="sr-only"
                                                        accept={product.allowedFileTypes.map(t => `.${t}`).join(',')}
                                                        onChange={(e) => handleFileUpload(e.target.files)}
                                                    />
                                                </label>
                                                <p className="upload-info">
                                                    Format: {product.allowedFileTypes.join(', ').toUpperCase()} | Max: {product.maxFileSize}MB
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Price Summary */}
                            <div className="price-summary">
                                <h4>Ringkasan Harga</h4>
                                <div className="price-breakdown">
                                    {calculatedPrice.breakdown.map((item, index) => (
                                        <div key={index} className={`breakdown-row ${item.value < 0 ? 'discount' : ''}`}>
                                            <span>{item.label}</span>
                                            <span>{item.value < 0 ? '' : '+'}{formatPrice(item.value)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="price-total-section">
                                    <div className="price-per-unit">
                                        <span>Harga per pcs:</span>
                                        <span>{formatPrice(calculatedPrice.unitPrice)}</span>
                                    </div>
                                    <div className="price-total">
                                        <span>Total ({quantity} pcs):</span>
                                        <span className="total-amount">{formatPrice(calculatedPrice.totalPrice)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                className={`btn btn-accent btn-lg add-to-cart-btn ${!uploadedFile ? 'disabled' : ''}`}
                                onClick={handleAddToCart}
                                disabled={!uploadedFile}
                            >
                                <ShoppingCart size={20} />
                                {uploadedFile ? 'Tambah ke Keranjang' : 'Upload File Terlebih Dahulu'}
                            </button>

                            {/* Guarantee */}
                            <div className="guarantee-info">
                                <Shield size={16} />
                                <span>Garansi cetak ulang jika tidak sesuai pesanan</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="product-description-section">
                    <h2>Deskripsi Produk</h2>
                    <div className="product-description-content">
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
