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

    useEffect(() => {
        if (product) {
            setSelectedSizeId(product.ukuran[0]?.id || '');
            setSelectedMaterialId(product.bahan[0]?.id || '');
            setSelectedPrintSideId(product.sisiCetak[0]?.id || '');
            setQuantity(product.minPesan);
        }
    }, [product]);

    const calculatedPrice = useMemo(() => {
        if (!product) return { unitPrice: 0, totalPrice: 0, breakdown: [] as { label: string; value: number }[] };

        const breakdown: { label: string; value: number }[] = [];

        const tier = product.tierJumlah.find(t => quantity >= t.minQty && quantity <= t.maxQty);
        const baseUnitPrice = tier?.pricePerUnit || product.tierJumlah[0].pricePerUnit;
        breakdown.push({ label: 'Harga dasar per pcs', value: baseUnitPrice });

        const size = product.ukuran.find(s => s.id === selectedSizeId);
        let sizeMultiplier = size?.priceMultiplier || 1;

        if (size?.nama.toLowerCase().includes('custom') && customWidth > 0 && customHeight > 0) {
            const baseSize = product.ukuran[0];
            const baseArea = (baseSize?.width || 148) * (baseSize?.height || 210);
            const customArea = customWidth * customHeight;
            sizeMultiplier = Math.max(1, customArea / baseArea);
        }

        if (sizeMultiplier !== 1) {
            breakdown.push({ label: `Ukuran ${size?.nama} (x${sizeMultiplier.toFixed(1)})`, value: baseUnitPrice * (sizeMultiplier - 1) });
        }

        const material = product.bahan.find(m => m.id === selectedMaterialId);
        const materialPrice = material?.pricePerUnit || 0;
        breakdown.push({ label: `Bahan: ${material?.nama} ${material?.weight}`, value: materialPrice });

        const printSide = product.sisiCetak.find(p => p.id === selectedPrintSideId);
        const printSideMultiplier = printSide?.priceMultiplier || 1;
        if (printSideMultiplier !== 1) {
            breakdown.push({ label: `Cetak ${printSide?.nama} (x${printSideMultiplier.toFixed(1)})`, value: baseUnitPrice * (printSideMultiplier - 1) });
        }

        let finishingTotal = 0;
        selectedFinishingIds.forEach(fId => {
            const finishing = product.finishing.find(f => f.id === fId);
            if (finishing) {
                finishingTotal += finishing.price;
                breakdown.push({ label: `Finishing: ${finishing.nama}`, value: finishing.price });
            }
        });

        const unitPrice = (baseUnitPrice * sizeMultiplier * printSideMultiplier) + materialPrice + finishingTotal;

        let discountedUnitPrice = unitPrice;
        if (product.promo && product.persenPromo) {
            const discount = unitPrice * (product.persenPromo / 100);
            discountedUnitPrice = unitPrice - discount;
            breakdown.push({ label: `Diskon ${product.persenPromo}%`, value: -discount });
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
            const newValue = Math.max(product.minPesan, value);
            setQuantity(newValue);
        }
    };

    const handleFileUpload = (files: FileList | null) => {
        if (!files || files.length === 0 || !product) return;

        const file = files[0];
        const extension = file.name.split('.').pop()?.toLowerCase() || '';

        if (!product.tipeFileDiperbolehkan.includes(extension)) {
            addToast({
                type: 'error',
                title: 'Format file tidak didukung',
                message: `Format yang diizinkan: ${product.tipeFileDiperbolehkan.join(', ').toUpperCase()}`,
            });
            return;
        }

        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > product.ukuranFileMaks) {
            addToast({
                type: 'error',
                title: 'Ukuran file terlalu besar',
                message: `Maksimal ${product.ukuranFileMaks}MB`,
            });
            return;
        }

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

        const needsDesignFile = product.butuhFileDesain !== false && !product.produkRetail;

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
            jumlah: quantity,
            customWidth: customWidth || undefined,
            customHeight: customHeight || undefined,
        };

        addItem(product, config, calculatedPrice.unitPrice, calculatedPrice.totalPrice);

        addToast({
            type: 'success',
            title: 'Berhasil ditambahkan ke keranjang',
            message: `${product.nama} x ${quantity} pcs`,
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

    const category = (categories || []).find(c => c.id === product.kategoriId);
    const selectedSize = product.ukuran.find(s => s.id === selectedSizeId);

    return (
        <div className="product-detail-page">
            <div className="breadcrumb-section">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Beranda</Link>
                        <ChevronRight size={14} />
                        <Link to={`/kategori/${category?.slug}`}>{category?.nama}</Link>
                        <ChevronRight size={14} />
                        <span>{product.nama}</span>
                    </nav>
                </div>
            </div>

            <div className="container py-8">
                <div className="product-detail-grid">
                    <div className="product-images">
                        <div className="product-main-image">
                            <img
                                src={product.gambar[currentImageIndex]}
                                alt={product.nama}
                            />
                            {product.gambar.length > 1 && (
                                <>
                                    <button
                                        className="image-nav image-nav-prev"
                                        onClick={() => setCurrentImageIndex(prev => (prev - 1 + product.gambar.length) % product.gambar.length)}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        className="image-nav image-nav-next"
                                        onClick={() => setCurrentImageIndex(prev => (prev + 1) % product.gambar.length)}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </>
                            )}
                            {product.terlaris && (
                                <span className="product-badge-large badge-bestseller">
                                    <Star size={14} /> Best Seller
                                </span>
                            )}
                            {product.promo && product.persenPromo && (
                                <span className="product-badge-large badge-promo">
                                    -{product.persenPromo}%
                                </span>
                            )}
                        </div>
                        {product.gambar.length > 1 && (
                            <div className="product-thumbnails">
                                {product.gambar.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    >
                                        <img src={img} alt={`${product.nama} ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="product-info">
                        <div className="product-header">
                            <h1 className="product-title">{product.nama}</h1>
                            <div className="product-meta-info">
                                <div className="meta-item">
                                    <Clock size={16} />
                                    <span>Estimasi {product.estimasiHari} hari kerja</span>
                                </div>
                                <div className="meta-item">
                                    <Truck size={16} />
                                    <span>Pengiriman seluruh Indonesia</span>
                                </div>
                            </div>
                        </div>

                        <div className="price-calculator">
                            <h3 className="calculator-title">Kustomisasi Pesanan</h3>

                            <div className="config-section">
                                <label className="config-label">
                                    Ukuran
                                    <Info size={14} className="info-icon" />
                                </label>
                                <div className="config-options">
                                    {product.ukuran.map(size => (
                                        <button
                                            key={size.id}
                                            className={`config-option ${selectedSizeId === size.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedSizeId(size.id)}
                                        >
                                            {selectedSizeId === size.id && <Check size={14} />}
                                            {size.nama}
                                        </button>
                                    ))}
                                </div>

                                {selectedSize?.nama.toLowerCase().includes('custom') && (
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

                            <div className="config-section">
                                <label className="config-label">Bahan</label>
                                <div className="config-options config-options-vertical">
                                    {product.bahan.map(material => (
                                        <button
                                            key={material.id}
                                            className={`config-option-card ${selectedMaterialId === material.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedMaterialId(material.id)}
                                        >
                                            <div className="option-card-check">
                                                {selectedMaterialId === material.id && <Check size={16} />}
                                            </div>
                                            <div className="option-card-info">
                                                <span className="option-card-name">{material.nama} {material.weight}</span>
                                                <span className="option-card-desc">{material.deskripsi}</span>
                                            </div>
                                            <span className="option-card-price">+{formatPrice(material.pricePerUnit)}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="config-section">
                                <label className="config-label">Sisi Cetak</label>
                                <div className="config-options">
                                    {product.sisiCetak.map(side => (
                                        <button
                                            key={side.id}
                                            className={`config-option ${selectedPrintSideId === side.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedPrintSideId(side.id)}
                                        >
                                            {selectedPrintSideId === side.id && <Check size={14} />}
                                            {side.nama} ({side.kode})
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="config-section">
                                <label className="config-label">Finishing (Opsional)</label>
                                <div className="config-options config-options-wrap">
                                    {product.finishing.map(finishing => (
                                        <button
                                            key={finishing.id}
                                            className={`config-option ${selectedFinishingIds.includes(finishing.id) ? 'selected' : ''}`}
                                            onClick={() => toggleFinishing(finishing.id)}
                                        >
                                            {selectedFinishingIds.includes(finishing.id) && <Check size={14} />}
                                            {finishing.nama}
                                            <span className="finishing-price">+{formatPrice(finishing.price)}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="config-section">
                                <label className="config-label">
                                    Jumlah (Minimum {product.minPesan} pcs)
                                </label>
                                <div className="quantity-input-group">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(quantity - 50)}
                                        disabled={quantity <= product.minPesan}
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <input
                                        type="number"
                                        className="input quantity-input"
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                                        min={product.minPesan}
                                    />
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(quantity + 50)}
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>

                                <div className="quantity-tiers">
                                    {product.tierJumlah.map((tier, index) => (
                                        <span
                                            key={index}
                                            className={`tier ${quantity >= tier.minQty && quantity <= tier.maxQty ? 'active' : ''}`}
                                        >
                                            {tier.minQty}-{tier.maxQty === 99999 ? '∞' : tier.maxQty}: {formatPrice(tier.pricePerUnit)}/pcs
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {product.butuhFileDesain !== false && !product.produkRetail && (
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
                                                        accept={product.tipeFileDiperbolehkan.map(t => `.${t}`).join(',')}
                                                        onChange={(e) => handleFileUpload(e.target.files)}
                                                    />
                                                </label>
                                                <p className="upload-info">
                                                    Format: {product.tipeFileDiperbolehkan.join(', ').toUpperCase()} | Max: {product.ukuranFileMaks}MB
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

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

                            <button
                                className={`btn btn-accent btn-lg add-to-cart-btn ${!uploadedFile ? 'disabled' : ''}`}
                                onClick={handleAddToCart}
                                disabled={!uploadedFile}
                            >
                                <ShoppingCart size={20} />
                                {uploadedFile ? 'Tambah ke Keranjang' : 'Upload File Terlebih Dahulu'}
                            </button>

                            <div className="guarantee-info">
                                <Shield size={16} />
                                <span>Garansi cetak ulang jika tidak sesuai pesanan</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="product-description-section">
                    <h2>Deskripsi Produk</h2>
                    <div className="product-description-content">
                        <p>{product.deskripsi}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
