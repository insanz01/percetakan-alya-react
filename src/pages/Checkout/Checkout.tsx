import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    MapPin,
    Truck,
    CreditCard,
    ShoppingBag,
    Tag,
    Check,
    AlertCircle,
    Loader2,
    Plus,
    ChevronRight
} from 'lucide-react';
import { useUIStore } from '../../store';
import { shippingService, ShippingOption } from '../../lib/shippingService';
import { orderService } from '../../lib/orderService';
import { promoService } from '../../lib/promoService';
import { formatPrice } from '../../lib/utils';
import './Checkout.css';

// Mock cart data - in real app, get from cart store/context
const mockCartItems = [
    {
        id: '1',
        productId: 'prod-1',
        productName: 'Brosur A5 Premium',
        productImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600',
        quantity: 100,
        sizeName: 'A5 (148 x 210 mm)',
        materialName: 'Art Paper 120gr',
        printSideName: '2 Sisi (4/4)',
        finishingNames: ['Laminasi Doff'],
        unitPrice: 850,
        totalPrice: 85000,
    },
];

interface ShippingAddress {
    id: string;
    recipientName: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
}

// Mock addresses - in real app, get from API
const mockAddresses: ShippingAddress[] = [
    {
        id: 'addr-1',
        recipientName: 'Budi Santoso',
        phone: '081234567890',
        address: 'Jl. Jendral Sudirman No. 123',
        city: 'Jakarta Selatan',
        province: 'DKI Jakarta',
        postalCode: '12930',
    },
];

const paymentMethods = [
    { id: 'bank_transfer', name: 'Transfer Bank', icon: '🏦', description: 'BCA, Mandiri, BNI, BRI' },
    { id: 'virtual_account', name: 'Virtual Account', icon: '💳', description: 'Pembayaran otomatis' },
    { id: 'ewallet', name: 'E-Wallet', icon: '📱', description: 'OVO, GoPay, DANA, ShopeePay' },
    { id: 'qris', name: 'QRIS', icon: '📲', description: 'Scan & bayar' },
];

type CheckoutStep = 'address' | 'shipping' | 'payment' | 'review';

export default function Checkout() {
    const navigate = useNavigate();
    const { addToast } = useUIStore();

    const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
    const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(mockAddresses[0] || null);
    const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
    const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string>('');
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [promoApplied, setPromoApplied] = useState(false);
    const [isLoadingShipping, setIsLoadingShipping] = useState(false);
    const [isApplyingPromo, setIsApplyingPromo] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notes, setNotes] = useState('');

    const cartItems = mockCartItems;
    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const shippingCost = selectedShipping?.cost || 0;
    const discount = promoDiscount;
    const total = subtotal + shippingCost - discount;

    // Calculate total weight
    const totalWeight = cartItems.reduce((sum, item) => sum + (item.quantity * 5), 0); // 5g per piece

    useEffect(() => {
        if (selectedAddress && currentStep === 'shipping') {
            fetchShippingOptions();
        }
    }, [selectedAddress, currentStep]);

    const fetchShippingOptions = async () => {
        if (!selectedAddress) return;

        setIsLoadingShipping(true);
        try {
            const response = await shippingService.calculate({
                destination_city: selectedAddress.city,
                destination_province: selectedAddress.province,
                weight: totalWeight,
            });
            if (response.success) {
                setShippingOptions(response.data.shipping_options);
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Gagal memuat opsi pengiriman',
            });
        } finally {
            setIsLoadingShipping(false);
        }
    };

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) return;

        setIsApplyingPromo(true);
        try {
            const response = await promoService.validateCode(promoCode, subtotal);
            if (response.success && response.data.promo) {
                setPromoDiscount(response.data.discount);
                setPromoApplied(true);
                addToast({
                    type: 'success',
                    title: 'Promo Applied!',
                    message: `Diskon ${formatPrice(response.data.discount)} berhasil diterapkan`,
                });
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Promo Tidak Valid',
                message: error instanceof Error ? error.message : 'Kode promo tidak dapat digunakan',
            });
        } finally {
            setIsApplyingPromo(false);
        }
    };

    const handleSubmitOrder = async () => {
        if (!selectedAddress || !selectedShipping || !selectedPayment) {
            addToast({
                type: 'error',
                title: 'Data Tidak Lengkap',
                message: 'Mohon lengkapi semua informasi checkout',
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const orderData = {
                user_id: 'current-user-id', // Get from auth
                shipping_address_id: selectedAddress.id,
                shipping_method: selectedShipping.service,
                shipping_provider: selectedShipping.provider,
                payment_method: selectedPayment,
                subtotal,
                shipping_cost: shippingCost,
                discount,
                notes,
                items: cartItems.map(item => ({
                    product_id: item.productId,
                    size_name: item.sizeName,
                    material_name: item.materialName,
                    print_side_name: item.printSideName,
                    finishing_names: item.finishingNames,
                    quantity: item.quantity,
                    unit_price: item.unitPrice,
                    total_price: item.totalPrice,
                })),
            };

            const response = await orderService.createOrder(orderData);
            if (response.success) {
                addToast({
                    type: 'success',
                    title: 'Pesanan Berhasil!',
                    message: `Nomor pesanan: ${response.data.orderNumber}`,
                });
                navigate(`/akun/pesanan`);
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Gagal Membuat Pesanan',
                message: error instanceof Error ? error.message : 'Terjadi kesalahan',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const steps = [
        { key: 'address', label: 'Alamat', icon: MapPin },
        { key: 'shipping', label: 'Pengiriman', icon: Truck },
        { key: 'payment', label: 'Pembayaran', icon: CreditCard },
        { key: 'review', label: 'Review', icon: Check },
    ];

    const canProceed = () => {
        switch (currentStep) {
            case 'address': return !!selectedAddress;
            case 'shipping': return !!selectedShipping;
            case 'payment': return !!selectedPayment;
            case 'review': return true;
            default: return false;
        }
    };

    const goNext = () => {
        const stepOrder: CheckoutStep[] = ['address', 'shipping', 'payment', 'review'];
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex < stepOrder.length - 1) {
            setCurrentStep(stepOrder[currentIndex + 1]);
        }
    };

    const goBack = () => {
        const stepOrder: CheckoutStep[] = ['address', 'shipping', 'payment', 'review'];
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(stepOrder[currentIndex - 1]);
        }
    };

    return (
        <div className="checkout-page">
            <div className="container">
                {/* Header */}
                <div className="checkout-header">
                    <Link to="/keranjang" className="back-btn">
                        <ChevronLeft size={20} />
                        Kembali ke Keranjang
                    </Link>
                    <h1>Checkout</h1>
                </div>

                {/* Progress Steps */}
                <div className="checkout-steps">
                    {steps.map((step, index) => (
                        <div
                            key={step.key}
                            className={`step ${currentStep === step.key ? 'active' : ''} ${steps.findIndex(s => s.key === currentStep) > index ? 'completed' : ''}`}
                            onClick={() => {
                                if (steps.findIndex(s => s.key === currentStep) >= index) {
                                    setCurrentStep(step.key as CheckoutStep);
                                }
                            }}
                        >
                            <div className="step-icon">
                                {steps.findIndex(s => s.key === currentStep) > index ? (
                                    <Check size={20} />
                                ) : (
                                    <step.icon size={20} />
                                )}
                            </div>
                            <span className="step-label">{step.label}</span>
                        </div>
                    ))}
                </div>

                <div className="checkout-content">
                    {/* Main Content */}
                    <div className="checkout-main">
                        {/* Address Step */}
                        {currentStep === 'address' && (
                            <div className="checkout-section">
                                <h2><MapPin size={24} /> Alamat Pengiriman</h2>

                                {mockAddresses.length > 0 ? (
                                    <div className="address-list">
                                        {mockAddresses.map(addr => (
                                            <div
                                                key={addr.id}
                                                className={`address-card ${selectedAddress?.id === addr.id ? 'selected' : ''}`}
                                                onClick={() => setSelectedAddress(addr)}
                                            >
                                                <div className="address-radio">
                                                    <div className="radio-dot"></div>
                                                </div>
                                                <div className="address-content">
                                                    <div className="address-name">{addr.recipientName}</div>
                                                    <div className="address-phone">{addr.phone}</div>
                                                    <div className="address-text">
                                                        {addr.address}, {addr.city}, {addr.province} {addr.postalCode}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="empty-state">
                                        <AlertCircle size={48} />
                                        <p>Belum ada alamat tersimpan</p>
                                    </div>
                                )}

                                <button className="btn btn-outline add-address-btn">
                                    <Plus size={20} />
                                    Tambah Alamat Baru
                                </button>
                            </div>
                        )}

                        {/* Shipping Step */}
                        {currentStep === 'shipping' && (
                            <div className="checkout-section">
                                <h2><Truck size={24} /> Metode Pengiriman</h2>

                                {isLoadingShipping ? (
                                    <div className="loading-state">
                                        <Loader2 className="spinner" size={32} />
                                        <p>Memuat opsi pengiriman...</p>
                                    </div>
                                ) : shippingOptions.length > 0 ? (
                                    <div className="shipping-list">
                                        {shippingOptions.map(option => (
                                            <div
                                                key={option.id}
                                                className={`shipping-card ${selectedShipping?.id === option.id ? 'selected' : ''}`}
                                                onClick={() => setSelectedShipping(option)}
                                            >
                                                <div className="shipping-radio">
                                                    <div className="radio-dot"></div>
                                                </div>
                                                <div className="shipping-content">
                                                    <div className="shipping-provider">{option.provider}</div>
                                                    <div className="shipping-service">{option.service}</div>
                                                    <div className="shipping-eta">{option.estimated_days}</div>
                                                </div>
                                                <div className="shipping-price">
                                                    {formatPrice(option.cost)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="empty-state">
                                        <AlertCircle size={48} />
                                        <p>Tidak ada opsi pengiriman tersedia</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Payment Step */}
                        {currentStep === 'payment' && (
                            <div className="checkout-section">
                                <h2><CreditCard size={24} /> Metode Pembayaran</h2>

                                <div className="payment-list">
                                    {paymentMethods.map(method => (
                                        <div
                                            key={method.id}
                                            className={`payment-card ${selectedPayment === method.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedPayment(method.id)}
                                        >
                                            <div className="payment-radio">
                                                <div className="radio-dot"></div>
                                            </div>
                                            <div className="payment-icon">{method.icon}</div>
                                            <div className="payment-content">
                                                <div className="payment-name">{method.name}</div>
                                                <div className="payment-desc">{method.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Review Step */}
                        {currentStep === 'review' && (
                            <div className="checkout-section">
                                <h2><ShoppingBag size={24} /> Review Pesanan</h2>

                                {/* Order Items */}
                                <div className="review-items">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="review-item">
                                            <img src={item.productImage} alt={item.productName} />
                                            <div className="item-details">
                                                <div className="item-name">{item.productName}</div>
                                                <div className="item-specs">
                                                    {item.sizeName} • {item.materialName} • {item.printSideName}
                                                </div>
                                                <div className="item-qty">Qty: {item.quantity}</div>
                                            </div>
                                            <div className="item-price">{formatPrice(item.totalPrice)}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Shipping Info */}
                                <div className="review-section">
                                    <h3>Pengiriman</h3>
                                    <div className="review-info">
                                        <div>
                                            <strong>{selectedAddress?.recipientName}</strong>
                                            <p>{selectedAddress?.address}, {selectedAddress?.city}</p>
                                        </div>
                                        <div>
                                            <strong>{selectedShipping?.provider} - {selectedShipping?.service}</strong>
                                            <p>{selectedShipping?.estimated_days}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes */}
                                <div className="review-section">
                                    <h3>Catatan (Opsional)</h3>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Tambahkan catatan untuk pesanan..."
                                        rows={3}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="checkout-navigation">
                            {currentStep !== 'address' && (
                                <button className="btn btn-outline" onClick={goBack}>
                                    <ChevronLeft size={20} />
                                    Kembali
                                </button>
                            )}

                            {currentStep !== 'review' ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={goNext}
                                    disabled={!canProceed()}
                                >
                                    Lanjutkan
                                    <ChevronRight size={20} />
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSubmitOrder}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="spinner" size={20} />
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            Buat Pesanan
                                            <Check size={20} />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="checkout-sidebar">
                        <div className="order-summary">
                            <h3>Ringkasan Pesanan</h3>

                            <div className="summary-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="summary-item">
                                        <span>{item.productName} x{item.quantity}</span>
                                        <span>{formatPrice(item.totalPrice)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-divider"></div>

                            {/* Promo Code */}
                            <div className="promo-section">
                                <div className="promo-input">
                                    <Tag size={18} />
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                        placeholder="Kode promo"
                                        disabled={promoApplied || isApplyingPromo}
                                    />
                                    <button
                                        onClick={handleApplyPromo}
                                        disabled={!promoCode.trim() || promoApplied || isApplyingPromo}
                                    >
                                        {isApplyingPromo ? <Loader2 className="spinner" size={16} /> : 'Apply'}
                                    </button>
                                </div>
                                {promoApplied && (
                                    <div className="promo-applied">
                                        <Check size={16} />
                                        Promo {promoCode} diterapkan
                                    </div>
                                )}
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Ongkos Kirim</span>
                                <span>{shippingCost > 0 ? formatPrice(shippingCost) : '-'}</span>
                            </div>
                            {discount > 0 && (
                                <div className="summary-row discount">
                                    <span>Diskon</span>
                                    <span>-{formatPrice(discount)}</span>
                                </div>
                            )}

                            <div className="summary-divider"></div>

                            <div className="summary-total">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
