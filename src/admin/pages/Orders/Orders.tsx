import { useState } from 'react';
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
    X,
    Mail,
    Phone,
    MapPin,
    Package,
    Calendar,
    CreditCard,
    User
} from 'lucide-react';
import { formatPrice } from '../../../lib/utils';
import './Orders.css';

// Order type definition
interface Order {
    id: string;
    customer: {
        nama: string;
        email: string;
        telepon: string;
        alamat?: string;
    };
    products: Array<{
        nama: string;
        jumlah: number;
        harga: number;
    }>;
    subtotal?: number;
    biayaKirim?: number;
    total: number;
    status: string;
    statusBayar: string;
    metodePembayaran?: string;
    metodePengiriman?: string;
    nomorResi?: string;
    catatan?: string;
    createdAt: string;
}

// Dummy orders data with more details
const dummyOrders: Order[] = [
    {
        id: 'ORD-001234',
        customer: {
            nama: 'Budi Santoso',
            email: 'budi@email.com',
            telepon: '081234567890',
            alamat: 'Jl. Sudirman No. 123, Jakarta Pusat 10110'
        },
        products: [{ nama: 'Brosur A5 Premium', jumlah: 500, harga: 350000 }],
        subtotal: 350000,
        biayaKirim: 35000,
        total: 385000,
        status: 'processing',
        statusBayar: 'paid',
        metodePembayaran: 'Bank Transfer - BCA',
        metodePengiriman: 'JNE Regular',
        catatan: 'Tolong dipacking dengan rapih',
        createdAt: '2024-12-12 10:30',
    },
    {
        id: 'ORD-001233',
        customer: {
            nama: 'Siti Rahma',
            email: 'siti@email.com',
            telepon: '081234567891',
            alamat: 'Jl. Gatot Subroto No. 45, Jakarta Selatan 12950'
        },
        products: [{ nama: 'Kartu Nama Premium', jumlah: 200, harga: 100000 }],
        subtotal: 100000,
        biayaKirim: 15000,
        total: 115000,
        status: 'completed',
        statusBayar: 'paid',
        metodePembayaran: 'QRIS',
        metodePengiriman: 'SiCepat Express',
        nomorResi: 'JNE123456789',
        createdAt: '2024-12-12 09:15',
    },
    {
        id: 'ORD-001232',
        customer: {
            nama: 'Ahmad Wijaya',
            email: 'ahmad@email.com',
            telepon: '081234567892',
            alamat: 'Jl. Thamrin No. 78, Jakarta Pusat 10350'
        },
        products: [{ nama: 'X-Banner Indoor', jumlah: 5, harga: 425000 }],
        subtotal: 425000,
        biayaKirim: 35000,
        total: 460000,
        status: 'shipped',
        statusBayar: 'paid',
        metodePembayaran: 'Bank Transfer - Mandiri',
        metodePengiriman: 'J&T Express',
        nomorResi: 'JT987654321',
        createdAt: '2024-12-11 16:45',
    },
    {
        id: 'ORD-001231',
        customer: {
            nama: 'Maya Putri',
            email: 'maya@email.com',
            telepon: '081234567893',
            alamat: 'Jl. Kemang Raya No. 12, Jakarta Selatan 12730'
        },
        products: [{ nama: 'Stiker Vinyl Outdoor', jumlah: 100, harga: 300000 }],
        subtotal: 300000,
        biayaKirim: 35000,
        total: 335000,
        status: 'pending',
        statusBayar: 'pending',
        metodePembayaran: 'Menunggu Pembayaran',
        metodePengiriman: 'JNE Regular',
        createdAt: '2024-12-11 14:20',
    },
    {
        id: 'ORD-001230',
        customer: {
            nama: 'Rudi Hartono',
            email: 'rudi@email.com',
            telepon: '081234567894',
            alamat: 'Jl. Rasuna Said No. 56, Jakarta Selatan 12940'
        },
        products: [
            { nama: 'Poster A3+ Photo Paper', jumlah: 10, harga: 300000 },
            { nama: 'Kertas HVS A4', jumlah: 5, harga: 225000 }
        ],
        subtotal: 525000,
        biayaKirim: 35000,
        total: 560000,
        status: 'completed',
        statusBayar: 'paid',
        metodePembayaran: 'Bank Transfer - BNI',
        metodePengiriman: 'SiCepat Regular',
        nomorResi: 'SC555666777',
        createdAt: '2024-12-10 11:00',
    },
    {
        id: 'ORD-001229',
        customer: {
            nama: 'Lisa Permata',
            email: 'lisa@email.com',
            telepon: '081234567895',
            alamat: 'Jl. Senopati No. 89, Jakarta Selatan 12190'
        },
        products: [{ nama: 'Undangan Hardcover Premium', jumlah: 100, harga: 4500000 }],
        subtotal: 4500000,
        biayaKirim: 150000,
        total: 4650000,
        status: 'in_production',
        statusBayar: 'paid',
        metodePembayaran: 'Bank Transfer - BCA',
        metodePengiriman: 'JNE YES',
        catatan: 'Deadline: 20 Desember 2024',
        createdAt: '2024-12-10 09:30',
    },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    pending: { label: 'Menunggu', color: 'yellow', icon: <Clock size={14} /> },
    processing: { label: 'Diproses', color: 'blue', icon: <Printer size={14} /> },
    in_production: { label: 'Produksi', color: 'purple', icon: <Printer size={14} /> },
    shipped: { label: 'Dikirim', color: 'orange', icon: <Truck size={14} /> },
    completed: { label: 'Selesai', color: 'green', icon: <CheckCircle size={14} /> },
    cancelled: { label: 'Dibatalkan', color: 'red', icon: <XCircle size={14} /> },
};

const paymentStatusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: 'Belum Bayar', color: 'yellow' },
    paid: { label: 'Lunas', color: 'green' },
    expired: { label: 'Kadaluarsa', color: 'red' },
};

export default function Orders() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = dummyOrders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.nama.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order);
        setActiveDropdown(null);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="admin-orders">
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <h2>Manajemen Pesanan</h2>
                    <p>{dummyOrders.length} pesanan</p>
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
                        <option value="pending">Menunggu</option>
                        <option value="processing">Diproses</option>
                        <option value="in_production">Produksi</option>
                        <option value="shipped">Dikirim</option>
                        <option value="completed">Selesai</option>
                        <option value="cancelled">Dibatalkan</option>
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
                            {filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>
                                        <span className="order-id">{order.id}</span>
                                    </td>
                                    <td>
                                        <div className="customer-cell">
                                            <p className="customer-name">{order.customer.nama}</p>
                                            <p className="customer-email">{order.customer.email}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="products-cell">
                                            {order.products.map((p, i) => (
                                                <span key={i} className="product-item">
                                                    {p.nama} x {p.jumlah}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="order-total">{formatPrice(order.total)}</span>
                                    </td>
                                    <td>
                                        <span className={`payment-badge ${paymentStatusConfig[order.statusBayar].color}`}>
                                            {paymentStatusConfig[order.statusBayar].label}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge-icon ${statusConfig[order.status].color}`}>
                                            {statusConfig[order.status].icon}
                                            {statusConfig[order.status].label}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="order-date">{order.createdAt}</span>
                                    </td>
                                    <td>
                                        <div className="actions-cell">
                                            <button
                                                className="action-btn"
                                                title="Lihat Detail"
                                                onClick={() => handleViewOrder(order)}
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <div className="dropdown-container">
                                                <button
                                                    className="action-btn"
                                                    onClick={() => setActiveDropdown(
                                                        activeDropdown === order.id ? null : order.id
                                                    )}
                                                >
                                                    <MoreVertical size={16} />
                                                </button>
                                                {activeDropdown === order.id && (
                                                    <div className="dropdown-menu">
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => handleViewOrder(order)}
                                                        >
                                                            <Eye size={14} /> Lihat Detail
                                                        </button>
                                                        <button className="dropdown-item">
                                                            <CheckCircle size={14} /> Update Status
                                                        </button>
                                                        <button className="dropdown-item">
                                                            <Printer size={14} /> Cetak Invoice
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="order-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h2>Detail Pesanan</h2>
                                <p className="modal-order-id">{selectedOrder.id}</p>
                            </div>
                            <button className="modal-close-btn" onClick={closeModal}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="modal-content">
                            {/* Status Bar */}
                            <div className="order-status-bar">
                                <div className="status-item">
                                    <span className="status-label">Status Pesanan</span>
                                    <span className={`status-badge-icon ${statusConfig[selectedOrder.status].color}`}>
                                        {statusConfig[selectedOrder.status].icon}
                                        {statusConfig[selectedOrder.status].label}
                                    </span>
                                </div>
                                <div className="status-item">
                                    <span className="status-label">Pembayaran</span>
                                    <span className={`payment-badge ${paymentStatusConfig[selectedOrder.paymentStatus].color}`}>
                                        {paymentStatusConfig[selectedOrder.paymentStatus].label}
                                    </span>
                                </div>
                                <div className="status-item">
                                    <span className="status-label">Tanggal Order</span>
                                    <span className="status-value">
                                        <Calendar size={14} />
                                        {selectedOrder.createdAt}
                                    </span>
                                </div>
                            </div>

                            <div className="modal-grid">
                                {/* Customer Info */}
                                <div className="modal-section">
                                    <h3>Informasi Pelanggan</h3>
                                    <div className="info-card">
                                        <div className="info-row">
                                            <User size={16} className="info-icon-svg" />
                                            <span>{selectedOrder.customer.nama}</span>
                                        </div>
                                        <div className="info-row">
                                            <Mail size={16} className="info-icon-svg" />
                                            <span>{selectedOrder.customer.email}</span>
                                        </div>
                                        <div className="info-row">
                                            <Phone size={16} className="info-icon-svg" />
                                            <span>{selectedOrder.customer.telepon}</span>
                                        </div>
                                        {selectedOrder.customer.alamat && (
                                            <div className="info-row">
                                                <MapPin size={16} className="info-icon-svg" />
                                                <span>{selectedOrder.customer.alamat}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Shipping & Payment */}
                                <div className="modal-section">
                                    <h3>Pengiriman & Pembayaran</h3>
                                    <div className="info-card">
                                        <div className="info-row">
                                            <Truck size={16} className="info-icon-svg" />
                                            <span>{selectedOrder.shippingMethod || '-'}</span>
                                        </div>
                                        {selectedOrder.trackingNumber && (
                                            <div className="info-row">
                                                <Package size={16} className="info-icon-svg" />
                                                <span>Resi: <strong>{selectedOrder.trackingNumber}</strong></span>
                                            </div>
                                        )}
                                        <div className="info-row">
                                            <CreditCard size={16} className="info-icon-svg" />
                                            <span>{selectedOrder.paymentMethod || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="modal-section">
                                <h3>Produk Dipesan</h3>
                                <div className="products-list">
                                    {selectedOrder.products.map((product, index) => (
                                        <div key={index} className="product-row">
                                            <div className="product-info">
                                                <span className="product-name">{product.nama}</span>
                                                <span className="product-qty">x {product.qty}</span>
                                            </div>
                                            <span className="product-price">{formatPrice(product.price)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Notes */}
                            {selectedOrder.catatan && (
                                <div className="modal-section">
                                    <h3>Catatan</h3>
                                    <div className="notes-box">
                                        {selectedOrder.catatan}
                                    </div>
                                </div>
                            )}

                            {/* Order Summary */}
                            <div className="order-summary">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(selectedOrder.subtotal || 0)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Ongkos Kirim</span>
                                    <span>{formatPrice(selectedOrder.shippingCost || 0)}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>{formatPrice(selectedOrder.total)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-outline" onClick={closeModal}>
                                Tutup
                            </button>
                            <button className="btn btn-primary">
                                <Printer size={18} />
                                Cetak Invoice
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
