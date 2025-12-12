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
    Download,
    MessageSquare,
    Loader2,
    Copy
} from 'lucide-react';
import { orderService } from '../../../lib/orderService';
import { formatPrice } from '../../../lib/utils';
import { useUIStore } from '../../../store';
import type { Order } from '../../../types';
import './OrderDetail.css';

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    pending_payment: { label: 'Menunggu Pembayaran', color: 'yellow', icon: Clock },
    payment_verified: { label: 'Pembayaran Terverifikasi', color: 'blue', icon: CheckCircle },
    file_verification: { label: 'Verifikasi File', color: 'blue', icon: FileText },
    file_rejected: { label: 'File Ditolak', color: 'red', icon: XCircle },
    in_production: { label: 'Dalam Produksi', color: 'purple', icon: Package },
    finishing: { label: 'Finishing', color: 'purple', icon: Package },
    shipped: { label: 'Dikirim', color: 'blue', icon: Truck },
    delivered: { label: 'Selesai', color: 'green', icon: CheckCircle },
    cancelled: { label: 'Dibatalkan', color: 'red', icon: XCircle },
};

const paymentStatusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: 'Menunggu', color: 'yellow' },
    paid: { label: 'Lunas', color: 'green' },
    failed: { label: 'Gagal', color: 'red' },
    refunded: { label: 'Dikembalikan', color: 'gray' },
};

export default function OrderDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToast } = useUIStore();

    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

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
            navigate('/admin/orders');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (newStatus: string) => {
        setIsUpdating(true);
        try {
            const response = await orderService.updateOrderStatus(id!, newStatus);
            if (response.success) {
                setOrder(response.data);
                addToast({
                    type: 'success',
                    title: 'Berhasil',
                    message: `Status pesanan diubah menjadi ${statusConfig[newStatus]?.label || newStatus}`,
                });
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Gagal mengubah status pesanan',
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleUpdatePaymentStatus = async (newStatus: string) => {
        setIsUpdating(true);
        try {
            const response = await orderService.updatePaymentStatus(id!, newStatus);
            if (response.success) {
                setOrder(response.data);
                addToast({
                    type: 'success',
                    title: 'Berhasil',
                    message: `Status pembayaran diubah menjadi ${paymentStatusConfig[newStatus]?.label || newStatus}`,
                });
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Gagal mengubah status pembayaran',
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        addToast({
            type: 'success',
            title: 'Copied!',
            message: 'Teks berhasil disalin',
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
            <div className="admin-order-detail">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat detail pesanan...</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="admin-order-detail">
                <div className="error-state">
                    <XCircle size={48} />
                    <h3>Pesanan Tidak Ditemukan</h3>
                    <Link to="/admin/orders" className="btn btn-primary">
                        Kembali ke Daftar Pesanan
                    </Link>
                </div>
            </div>
        );
    }

    const status = statusConfig[order.status] || statusConfig['pending_payment'];
    const paymentStatus = paymentStatusConfig[order.paymentStatus] || paymentStatusConfig['pending'];
    const StatusIcon = status.icon;

    return (
        <div className="admin-order-detail">
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <Link to="/admin/orders" className="back-btn">
                        <ChevronLeft size={20} />
                        Kembali
                    </Link>
                    <div>
                        <h2>Detail Pesanan</h2>
                        <div className="order-number-row">
                            <span className="order-number">{order.orderNumber}</span>
                            <button className="copy-btn" onClick={() => copyToClipboard(order.orderNumber)}>
                                <Copy size={14} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="header-actions">
                    <div className={`status-badge status-${status.color}`}>
                        <StatusIcon size={16} />
                        {status.label}
                    </div>
                </div>
            </div>

            <div className="order-detail-content">
                {/* Left Column */}
                <div className="order-main">
                    {/* Order Items */}
                    <div className="detail-card">
                        <div className="card-header">
                            <h3><Package size={20} /> Item Pesanan</h3>
                        </div>
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
                                        <div className="item-qty">Qty: {item.config?.quantity}</div>
                                    </div>
                                    <div className="item-price">
                                        <div className="unit-price">{formatPrice(item.unitPrice)}/pcs</div>
                                        <div className="total-price">{formatPrice(item.totalPrice)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Design Files */}
                    <div className="detail-card">
                        <div className="card-header">
                            <h3><FileText size={20} /> File Desain</h3>
                        </div>
                        <div className="design-files">
                            {order.items?.some(item => item.designFile) ? (
                                order.items.map((item, index) => (
                                    item.designFile && (
                                        <div key={index} className="file-item">
                                            <FileText size={24} />
                                            <div className="file-info">
                                                <span className="file-name">{item.designFile.name || 'Design File'}</span>
                                                <span className="file-size">{item.product?.name}</span>
                                            </div>
                                            <button className="btn btn-ghost btn-sm">
                                                <Download size={16} />
                                                Download
                                            </button>
                                        </div>
                                    )
                                ))
                            ) : (
                                <div className="no-files">
                                    <FileText size={32} />
                                    <p>Belum ada file desain yang diupload</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Notes */}
                    {order.notes && (
                        <div className="detail-card">
                            <div className="card-header">
                                <h3><MessageSquare size={20} /> Catatan Pesanan</h3>
                            </div>
                            <p className="order-notes">{order.notes}</p>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="order-sidebar">
                    {/* Status Update */}
                    <div className="detail-card">
                        <div className="card-header">
                            <h3>Update Status</h3>
                        </div>
                        <div className="status-update">
                            <label>Status Pesanan</label>
                            <select
                                value={order.status}
                                onChange={(e) => handleUpdateStatus(e.target.value)}
                                disabled={isUpdating}
                            >
                                {Object.entries(statusConfig).map(([key, config]) => (
                                    <option key={key} value={key}>{config.label}</option>
                                ))}
                            </select>

                            <label>Status Pembayaran</label>
                            <select
                                value={order.paymentStatus}
                                onChange={(e) => handleUpdatePaymentStatus(e.target.value)}
                                disabled={isUpdating}
                            >
                                {Object.entries(paymentStatusConfig).map(([key, config]) => (
                                    <option key={key} value={key}>{config.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="detail-card">
                        <div className="card-header">
                            <h3>Informasi Pelanggan</h3>
                        </div>
                        <div className="customer-info">
                            <div className="info-row">
                                <span className="label">Nama</span>
                                <span className="value">{order.user?.name}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Email</span>
                                <span className="value">{order.user?.email}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Telepon</span>
                                <span className="value">{order.user?.phone || '-'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="detail-card">
                        <div className="card-header">
                            <h3><MapPin size={18} /> Alamat Pengiriman</h3>
                        </div>
                        <div className="shipping-info">
                            <p className="recipient">{order.shippingAddress?.recipientName}</p>
                            <p className="phone">{order.shippingAddress?.phone}</p>
                            <p className="address">{order.shippingAddress?.address}</p>
                            <p className="location">
                                {order.shippingAddress?.city}, {order.shippingAddress?.province} {order.shippingAddress?.postalCode}
                            </p>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="detail-card">
                        <div className="card-header">
                            <h3><CreditCard size={18} /> Ringkasan Pembayaran</h3>
                        </div>
                        <div className="payment-summary">
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
                            <div className="payment-status-row">
                                <span>Status Pembayaran</span>
                                <span className={`payment-badge status-${paymentStatus.color}`}>
                                    {paymentStatus.label}
                                </span>
                            </div>
                            <div className="payment-method">
                                <span>Metode</span>
                                <span>{typeof order.paymentMethod === 'string' ? order.paymentMethod : order.paymentMethod?.name || '-'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="detail-card">
                        <div className="card-header">
                            <h3><Clock size={18} /> Timeline</h3>
                        </div>
                        <div className="order-timeline">
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <span className="timeline-label">Pesanan Dibuat</span>
                                    <span className="timeline-date">{formatDate(order.createdAt?.toString() || '')}</span>
                                </div>
                            </div>
                            {order.updatedAt && order.updatedAt !== order.createdAt && (
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <span className="timeline-label">Terakhir Diupdate</span>
                                        <span className="timeline-date">{formatDate(order.updatedAt.toString())}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
