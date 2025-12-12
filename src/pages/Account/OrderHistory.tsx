import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Package,
    ChevronRight,
    Clock,
    CheckCircle,
    Truck,
    XCircle,
    Eye,
    Loader2,
    Filter,
    Search
} from 'lucide-react';
import { useMyOrders } from '../../hooks';
import { formatPrice } from '../../lib/utils';
import './OrderHistory.css';

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    pending_payment: { label: 'Menunggu Pembayaran', color: 'yellow', icon: Clock },
    payment_verified: { label: 'Pembayaran Terverifikasi', color: 'blue', icon: CheckCircle },
    file_verification: { label: 'Verifikasi File', color: 'blue', icon: Clock },
    file_rejected: { label: 'File Ditolak', color: 'red', icon: XCircle },
    in_production: { label: 'Dalam Produksi', color: 'purple', icon: Package },
    finishing: { label: 'Finishing', color: 'purple', icon: Package },
    shipped: { label: 'Dikirim', color: 'blue', icon: Truck },
    delivered: { label: 'Selesai', color: 'green', icon: CheckCircle },
    cancelled: { label: 'Dibatalkan', color: 'red', icon: XCircle },
};

export default function OrderHistory() {
    const { data: orders, isLoading, error } = useMyOrders();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const filteredOrders = orders?.filter(order => {
        const matchesSearch =
            order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items?.some(item => item.product?.name?.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div className="order-history">
                <div className="loading-state">
                    <Loader2 className="spinner" size={48} />
                    <p>Memuat pesanan...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-history">
                <div className="error-state">
                    <XCircle size={48} />
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="order-history">
            <div className="section-header">
                <h1>Riwayat Pesanan</h1>
            </div>

            {/* Filters */}
            <div className="order-filters">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Cari nomor pesanan atau produk..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-select">
                    <Filter size={18} />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">Semua Status</option>
                        <option value="pending_payment">Menunggu Pembayaran</option>
                        <option value="in_production">Dalam Produksi</option>
                        <option value="shipped">Dikirim</option>
                        <option value="delivered">Selesai</option>
                        <option value="cancelled">Dibatalkan</option>
                    </select>
                </div>
            </div>

            {/* Order List */}
            {!filteredOrders || filteredOrders.length === 0 ? (
                <div className="empty-state">
                    <Package size={64} />
                    <h3>Belum Ada Pesanan</h3>
                    <p>Anda belum memiliki riwayat pesanan</p>
                    <Link to="/kategori" className="btn btn-primary">
                        Mulai Belanja
                    </Link>
                </div>
            ) : (
                <div className="order-list">
                    {filteredOrders.map(order => {
                        const status = statusConfig[order.status] || statusConfig['pending_payment'];
                        const StatusIcon = status.icon;

                        return (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <div className="order-number">
                                        <span className="label">No. Pesanan</span>
                                        <span className="value">{order.orderNumber}</span>
                                    </div>
                                    <div className="order-date">
                                        {formatDate(order.createdAt?.toString() || '')}
                                    </div>
                                    <div className={`order-status status-${status.color}`}>
                                        <StatusIcon size={16} />
                                        <span>{status.label}</span>
                                    </div>
                                </div>

                                <div className="order-items">
                                    {order.items?.slice(0, 2).map((item, index) => (
                                        <div key={index} className="order-item">
                                            <img
                                                src={item.product?.images?.[0] || 'https://via.placeholder.com/80'}
                                                alt={item.product?.name}
                                            />
                                            <div className="item-info">
                                                <div className="item-name">{item.product?.name}</div>
                                                <div className="item-qty">Qty: {item.config?.quantity}</div>
                                            </div>
                                            <div className="item-price">{formatPrice(item.totalPrice)}</div>
                                        </div>
                                    ))}
                                    {order.items && order.items.length > 2 && (
                                        <div className="more-items">
                                            +{order.items.length - 2} produk lainnya
                                        </div>
                                    )}
                                </div>

                                <div className="order-footer">
                                    <div className="order-total">
                                        <span className="label">Total Pesanan</span>
                                        <span className="value">{formatPrice(order.totalAmount)}</span>
                                    </div>
                                    <Link to={`/akun/pesanan/${order.id}`} className="btn btn-outline btn-sm">
                                        <Eye size={16} />
                                        Lihat Detail
                                        <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
