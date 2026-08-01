import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Eye,
    Filter,
    ShoppingCart,
    CheckCircle,
    Truck,
    Clock,
    XCircle,
    MoreVertical,
    Printer,
    Loader2
} from 'lucide-react';
import { useOrders } from '../../../hooks';
import { formatPrice, formatDate } from '../../../lib/utils';
import './Orders.css';

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    pending_payment: { label: 'Menunggu Bayar', color: 'yellow', icon: <Clock size={14} /> },
    payment_verified: { label: 'Dibayar', color: 'blue', icon: <CheckCircle size={14} /> },
    file_verification: { label: 'Verifikasi File', color: 'blue', icon: <Clock size={14} /> },
    file_rejected: { label: 'File Ditolak', color: 'red', icon: <XCircle size={14} /> },
    in_production: { label: 'Produksi', color: 'purple', icon: <Printer size={14} /> },
    finishing: { label: 'Finishing', color: 'purple', icon: <Printer size={14} /> },
    shipped: { label: 'Dikirim', color: 'orange', icon: <Truck size={14} /> },
    delivered: { label: 'Selesai', color: 'green', icon: <CheckCircle size={14} /> },
    cancelled: { label: 'Dibatalkan', color: 'red', icon: <XCircle size={14} /> },
};

const paymentStatusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: 'Belum Bayar', color: 'yellow' },
    paid: { label: 'Lunas', color: 'green' },
    expired: { label: 'Kadaluarsa', color: 'red' },
    refunded: { label: 'Refund', color: 'gray' },
};

export default function Orders() {
    const navigate = useNavigate();
    const { data: orders, isLoading } = useOrders({ per_page: 100 });
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const filteredOrders = (orders || []).filter(order => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = order.nomor_pesanan.toLowerCase().includes(query) ||
            (order.user?.nama || '').toLowerCase().includes(query);
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const viewOrder = (id: string) => {
        navigate(`/admin/orders/${id}`);
    };

    if (isLoading) {
        return (
            <div className="admin-orders">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat pesanan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-orders">
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <h2>Manajemen Pesanan</h2>
                    <p>{orders?.length || 0} pesanan</p>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Cari Order ID atau nama pelanggan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-group">
                    <Filter size={18} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">Semua Status</option>
                        {Object.entries(statusConfig).map(([value, config]) => (
                            <option key={value} value={value}>{config.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="orders-table-card">
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Pelanggan</th>
                                <th>Produk</th>
                                <th>Total</th>
                                <th>Pembayaran</th>
                                <th>Status</th>
                                <th>Tanggal</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
                                const firstItem = order.items?.[0];
                                const status = statusConfig[order.status] || { label: order.status, color: 'gray', icon: <Clock size={14} /> };
                                const payment = paymentStatusConfig[order.status_bayar] || { label: order.status_bayar, color: 'gray' };
                                return (
                                    <tr key={order.id}>
                                        <td>
                                            <span className="order-id">{order.nomor_pesanan}</span>
                                        </td>
                                        <td>
                                            <div className="customer-cell">
                                                <p className="customer-name">{order.user?.nama || 'Guest'}</p>
                                                <p className="customer-email">{order.user?.email}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="products-cell">
                                                <span className="product-item">
                                                    {firstItem?.product?.nama || '-'}
                                                    {order.items && order.items.length > 1 && (
                                                        <span className="items-more"> +{order.items.length - 1} lainnya</span>
                                                    )}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="order-total">{formatPrice(order.total)}</span>
                                        </td>
                                        <td>
                                            <span className={`payment-badge ${payment.color}`}>
                                                {payment.label}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge-icon ${status.color}`}>
                                                {status.icon}
                                                {status.label}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="order-date">{formatDate(order.created_at)}</span>
                                        </td>
                                        <td>
                                            <div className="actions-cell">
                                                <button
                                                    className="action-btn"
                                                    title="Lihat Detail"
                                                    onClick={() => viewOrder(order.id)}
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <div className="dropdown-container">
                                                    <button
                                                        className="action-btn"
                                                        onClick={() => setActiveDropdown(
                                                            activeDropdown === order.id ? null : order.id
                                                        )}
                                                    >
                                                        <MoreVertical size={18} />
                                                    </button>
                                                    {activeDropdown === order.id && (
                                                        <div className="dropdown-menu">
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={() => viewOrder(order.id)}
                                                            >
                                                                <Eye size={14} /> Lihat Detail
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredOrders.length === 0 && (
                    <div className="empty-state">
                        <ShoppingCart size={48} />
                        <h3>Tidak ada pesanan ditemukan</h3>
                        <p>Coba ubah filter atau kata kunci pencarian</p>
                    </div>
                )}
            </div>
        </div>
    );
}
