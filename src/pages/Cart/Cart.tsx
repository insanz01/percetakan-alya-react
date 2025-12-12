import { Link } from 'react-router-dom';
import {
    Trash2,
    Plus,
    Minus,
    ShoppingCart,
    ArrowRight,
    ChevronRight,
    FileText
} from 'lucide-react';
import { useCartStore, useUIStore } from '../../store';
import { useCategories } from '../../hooks';
import { formatPrice } from '../../lib/utils';
import './Cart.css';

export default function Cart() {
    const { items, removeItem, updateItemQuantity, getTotalPrice, getTotalWeight, clearCart } = useCartStore();
    const { addToast } = useUIStore();
    const { data: categories } = useCategories();

    const handleQuantityChange = (itemId: string, newQuantity: number, minQty: number) => {
        if (newQuantity < minQty) return;
        updateItemQuantity(itemId, newQuantity);
    };

    const handleRemoveItem = (itemId: string) => {
        removeItem(itemId);
        addToast({
            type: 'info',
            title: 'Item dihapus dari keranjang',
        });
    };

    const formatWeight = (grams: number): string => {
        if (grams >= 1000) {
            return `${(grams / 1000).toFixed(1)} kg`;
        }
        return `${grams} gr`;
    };

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container py-16">
                    <div className="empty-cart">
                        <ShoppingCart size={64} />
                        <h1>Keranjang Belanja Kosong</h1>
                        <p>Anda belum memiliki item di keranjang. Mulai berbelanja sekarang!</p>
                        <Link to="/" className="btn btn-primary btn-lg">
                            Mulai Belanja
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            {/* Breadcrumb */}
            <div className="breadcrumb-section">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Beranda</Link>
                        <ChevronRight size={14} />
                        <span>Keranjang Belanja</span>
                    </nav>
                </div>
            </div>

            <div className="container py-8">
                <div className="cart-header">
                    <h1>Keranjang Belanja</h1>
                    <p>{items.length} item</p>
                </div>

                <div className="cart-grid">
                    {/* Cart Items */}
                    <div className="cart-items-section">
                        {items.map((item) => {
                            const selectedSize = item.product.sizes.find(s => s.id === item.config.sizeId);
                            const selectedMaterial = item.product.materials.find(m => m.id === item.config.materialId);
                            const selectedPrintSide = item.product.printSides.find(p => p.id === item.config.printSideId);
                            const selectedFinishings = item.product.finishings.filter(f => item.config.finishingIds.includes(f.id));
                            const category = (categories || []).find(c => c.id === item.product.categoryId);

                            return (
                                <div key={item.id} className="cart-item-card">
                                    <div className="cart-item-image">
                                        <img src={item.product.images[0]} alt={item.product.name} />
                                    </div>

                                    <div className="cart-item-details">
                                        <div className="cart-item-header">
                                            <div>
                                                <Link to={`/kategori/${category?.slug}`} className="cart-item-category">
                                                    {category?.name}
                                                </Link>
                                                <h3 className="cart-item-name">{item.product.name}</h3>
                                            </div>
                                            <button
                                                className="cart-item-remove"
                                                onClick={() => handleRemoveItem(item.id)}
                                                title="Hapus item"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>

                                        {/* Specifications */}
                                        <div className="cart-item-specs">
                                            <div className="spec-tag">
                                                <span className="spec-label">Ukuran:</span>
                                                <span>{selectedSize?.name}</span>
                                                {item.config.customWidth && item.config.customHeight && (
                                                    <span> ({item.config.customWidth} x {item.config.customHeight} mm)</span>
                                                )}
                                            </div>
                                            <div className="spec-tag">
                                                <span className="spec-label">Bahan:</span>
                                                <span>{selectedMaterial?.name} {selectedMaterial?.weight}</span>
                                            </div>
                                            <div className="spec-tag">
                                                <span className="spec-label">Cetak:</span>
                                                <span>{selectedPrintSide?.name} ({selectedPrintSide?.code})</span>
                                            </div>
                                            {selectedFinishings.length > 0 && (
                                                <div className="spec-tag">
                                                    <span className="spec-label">Finishing:</span>
                                                    <span>{selectedFinishings.map(f => f.name).join(', ')}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Uploaded File */}
                                        {item.uploadedFile && (
                                            <div className="cart-item-file">
                                                <FileText size={16} />
                                                <span>{item.uploadedFile.name}</span>
                                            </div>
                                        )}

                                        {/* Price and Quantity */}
                                        <div className="cart-item-footer">
                                            <div className="cart-item-quantity">
                                                <button
                                                    className="quantity-btn"
                                                    onClick={() => handleQuantityChange(item.id, item.config.quantity - 50, item.product.minOrderQty)}
                                                    disabled={item.config.quantity <= item.product.minOrderQty}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.config.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value), item.product.minOrderQty)}
                                                    min={item.product.minOrderQty}
                                                    className="quantity-display"
                                                />
                                                <button
                                                    className="quantity-btn"
                                                    onClick={() => handleQuantityChange(item.id, item.config.quantity + 50, item.product.minOrderQty)}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                                <span className="quantity-unit">pcs</span>
                                            </div>

                                            <div className="cart-item-pricing">
                                                <span className="unit-price">{formatPrice(item.unitPrice)}/pcs</span>
                                                <span className="total-price">{formatPrice(item.totalPrice)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Clear Cart Button */}
                        <div className="cart-actions-bottom">
                            <button
                                className="btn btn-ghost"
                                onClick={() => {
                                    clearCart();
                                    addToast({
                                        type: 'info',
                                        title: 'Keranjang dikosongkan',
                                    });
                                }}
                            >
                                <Trash2 size={18} />
                                Kosongkan Keranjang
                            </button>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="cart-summary-section">
                        <div className="cart-summary-card">
                            <h3>Ringkasan Pesanan</h3>

                            <div className="summary-rows">
                                <div className="summary-row">
                                    <span>Subtotal ({items.length} item)</span>
                                    <span>{formatPrice(getTotalPrice())}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Total Berat</span>
                                    <span>{formatWeight(getTotalWeight())}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Ongkos Kirim</span>
                                    <span className="text-muted">Dihitung saat checkout</span>
                                </div>
                            </div>

                            <div className="summary-divider" />

                            <div className="summary-total">
                                <span>Total</span>
                                <span className="total-amount">{formatPrice(getTotalPrice())}</span>
                            </div>

                            <Link to="/checkout" className="btn btn-accent btn-lg checkout-btn">
                                Lanjut ke Checkout
                                <ArrowRight size={20} />
                            </Link>

                            <Link to="/" className="btn btn-ghost w-full">
                                Lanjut Belanja
                            </Link>
                        </div>

                        {/* Info Box */}
                        <div className="cart-info-box">
                            <h4>📦 Informasi Pengiriman</h4>
                            <p>Pengiriman tersedia ke seluruh Indonesia. Estimasi ongkir akan dihitung berdasarkan berat dan tujuan saat checkout.</p>
                        </div>

                        <div className="cart-info-box">
                            <h4>🎁 Promo Tersedia</h4>
                            <p>Masukkan kode promo saat checkout untuk mendapatkan diskon tambahan!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
