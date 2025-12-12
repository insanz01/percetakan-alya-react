import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Package,
    MapPin,
    CreditCard,
    Truck,
    Clock,
    CheckCircle,
    XCircle,
    FileText,
    MessageSquare,
    Loader2,
    Copy,
    HelpCircle
} from 'lucide-react';
import { orderService } from '../../lib/orderService';
import { formatPrice } from '../../lib/utils';
import { useUIStore } from '../../store';
import type { Order } from '../../types';
import './UserOrderDetail.css';

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType; description: string }> = {
    pending_payment: {
        label: 'Menunggu Pembayaran',
        color: 'yellow',
        icon: Clock,
        description: 'Silahkan selesaikan pembayaran Anda'
    },
    payment_verified: {
        label: 'Pembayaran Terverifikasi',
        color: 'blue',
        icon: CheckCircle,
        description: 'Pembayaran Anda telah diterima'
    },
    file_verification: {
        label: 'Verifikasi File',
        color: 'blue',
        icon: FileText,
        description: 'Tim kami sedang memeriksa file desain Anda'
    },
    file_rejected: {
        label: 'File Ditolak',
        color: 'red',
        icon: XCircle,
        description: 'File desain Anda perlu diperbaiki'
    },
    in_production: {
        label: 'Dalam Produksi',
        color: 'purple',
        icon: Package,
        description: 'Pesanan Anda sedang dicetak'
    },
    finishing: {
        label: 'Finishing',
        color: 'purple',
        icon: Package,
        description: 'Proses finishing sedang berlangsung'
    },
    shipped: {
        label: 'Dikirim',
        color: 'blue',
        icon: Truck,
        description: 'Pesanan dalam perjalanan'
    },
    delivered: {
        label: 'Selesai',
        color: 'green',
        icon: CheckCircle,
        description: 'Pesanan telah diterima'
    },
    cancelled: {
        label: 'Dibatalkan',
        color: 'red',
        icon: XCircle,
        description: 'Pesanan telah dibatalkan'
    },
};

export default function UserOrderDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToast } = useUIStore();

    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchOrder();
        }
    }, [id]);

    const fetchOrder = async () => {
        try {
            const response = await orderService.getOrderById(id!);
            if (response.success) {
                setOrder(response.data);
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Gagal memuat detail pesanan',
            });
            navigate('/akun/pesanan');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        addToast({
            type: 'success',
            title: 'Copied!',
            message: 'Nomor pesanan disalin',
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isLoading) {
        return (
            <div className="user-order-detail">
                <div className="container">
                    <div className="loading-state">
                        <Loader2 size={48} className="spinner" />
                        <p>Memuat detail pesanan...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="user-order-detail">
                <div className="container">
                    <div className="error-state">
                        <XCircle size={48} />
                        <h3>Pesanan Tidak Ditemukan</h3>
                        <Link to="/akun/pesanan" className="btn btn-primary">
                            Kembali ke Riwayat Pesanan
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const status = statusConfig[order.status] || statusConfig['pending_payment'];
    const StatusIcon = status.icon;

    return (
        <div className="user-order-detail">
            <div className="container">
                {/* Header */}
                <div className="order-header">
                    <Link to="/akun/pesanan" className="back-btn">
                        <ChevronLeft size={20} />
                        Kembali
                    </Link>
                    <div className="order-title">
                        <h1>Detail Pesanan</h1>
                        <div className="order-number-row">
                            <span className="order-id">{order.orderNumber}</span>
                            <button className="copy-btn" onClick={() => copyToClipboard(order.orderNumber)}>
                                <Copy size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Status Card */}
                <div className={`status-card status-${status.color}`}>
                    <StatusIcon size={32} />
                    <div className="status-info">
                        <h2>{status.label}</h2>
                        <p>{status.description}</p>
                    </div>
                </div>

                <div className="order-content">
                    {/* Main Content */}
                    <div className="order-main">
                        {/* Order Items */}
                        <div className="detail-section">
                            <h3><Package size={20} /> Item Pesanan</h3>
                            <div className="order-items">
                                {order.items?.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <img
                                            src={item.product?.images?.[0] || 'https://via.placeholder.com/80'}
                                            alt={item.product?.name}
                                        />
                                        <div className="item-info">
                                            <div className="item-name">{item.product?.name}</div>
                                            <div className="item-specs">
                                                {item.config?.sizeName && <span>{item.config.sizeName}</span>}
                                                {item.config?.materialName && <span>{item.config.materialName}</span>}
                                                {item.config?.printSideName && <span>{item.config.printSideName}</span>}
                                            </div>
                                            <div className="item-qty">Qty: {item.config?.quantity} pcs</div>
                                        </div>
                                        <div className="item-price">
                                            {formatPrice(item.totalPrice)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="detail-section">
                            <h3><MapPin size={20} /> Alamat Pengiriman</h3>
                            <div className="info-card">
                                <p className="recipient">{order.shippingAddress?.recipientName}</p>
                                <p className="phone">{order.shippingAddress?.phone}</p>
                                <p className="address">{order.shippingAddress?.address}</p>
                                <p className="location">
                                    {order.shippingAddress?.city}, {order.shippingAddress?.province} {order.shippingAddress?.postalCode}
                                </p>
                            </div>
                        </div>

                        {/* Notes */}
                        {order.notes && (
                            <div className="detail-section">
                                <h3><MessageSquare size={20} /> Catatan</h3>
                                <p className="order-notes">{order.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="order-sidebar">
                        {/* Payment Summary */}
                        <div className="summary-card">
                            <h3>Ringkasan Pembayaran</h3>
                            <div className="summary-rows">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(order.subtotal)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Ongkos Kirim</span>
                                    <span>{formatPrice(order.shippingCost)}</span>
                                </div>
                                {order.discount > 0 && (
                                    <div className="summary-row discount">
                                        <span>Diskon</span>
                                        <span>-{formatPrice(order.discount)}</span>
                                    </div>
                                )}
                                <div className="summary-divider"></div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>{formatPrice(order.totalAmount)}</span>
                                </div>
                            </div>
                            <div className="payment-method">
                                <CreditCard size={16} />
                                <span>{typeof order.paymentMethod === 'string' ? order.paymentMethod : order.paymentMethod?.name || 'Transfer Bank'}</span>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="timeline-card">
                            <h3><Clock size={18} /> Timeline</h3>
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <span className="timeline-label">Pesanan Dibuat</span>
                                        <span className="timeline-date">
                                            {formatDate(order.createdAt?.toString() || '')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Help */}
                        <div className="help-card">
                            <HelpCircle size={24} />
                            <h4>Butuh Bantuan?</h4>
                            <p>Tim kami siap membantu</p>
                            <Link to="/kontak" className="btn btn-outline btn-block">
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
