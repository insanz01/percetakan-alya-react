import { useState } from 'react';
import {
    TrendingUp,
    ShoppingCart,
    Package,
    Users,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Eye,
    Loader2
} from 'lucide-react';
import { useOrderStatistics, useCustomerStatistics, useProducts, useCategories } from '../../../hooks';
import { formatPrice } from '../../../lib/utils';
import './Dashboard.css';

// Fallback dummy recent orders (will be replaced when order API is connected)
const fallbackRecentOrders = [
    { id: 'ORD-001234', customer: 'Budi Santoso', product: 'Brosur A5 Premium', qty: 500, total: 350000, status: 'processing' },
    { id: 'ORD-001233', customer: 'Siti Rahma', product: 'Kartu Nama Premium', qty: 200, total: 100000, status: 'completed' },
    { id: 'ORD-001232', customer: 'Ahmad Wijaya', product: 'X-Banner Indoor', qty: 5, total: 425000, status: 'shipped' },
    { id: 'ORD-001231', customer: 'Maya Putri', product: 'Stiker Vinyl Outdoor', qty: 100, total: 300000, status: 'pending' },
    { id: 'ORD-001230', customer: 'Rudi Hartono', product: 'Poster A3+ Photo Paper', qty: 10, total: 300000, status: 'completed' },
];

const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: 'Menunggu', color: 'yellow' },
    pending_payment: { label: 'Menunggu', color: 'yellow' },
    processing: { label: 'Diproses', color: 'blue' },
    payment_verified: { label: 'Diproses', color: 'blue' },
    in_production: { label: 'Produksi', color: 'blue' },
    shipped: { label: 'Dikirim', color: 'purple' },
    completed: { label: 'Selesai', color: 'green' },
    delivered: { label: 'Selesai', color: 'green' },
};

export default function Dashboard() {
    const { data: orderStats, isLoading: orderStatsLoading } = useOrderStatistics();
    const { data: customerStats, isLoading: customerStatsLoading } = useCustomerStatistics();
    const { data: products, isLoading: productsLoading } = useProducts({ active: true });
    const { data: categories, isLoading: categoriesLoading } = useCategories({ active: true });

    const [recentOrders] = useState(fallbackRecentOrders);

    const isLoading = orderStatsLoading || customerStatsLoading || productsLoading || categoriesLoading;

    // Build stats cards
    const stats = [
        {
            label: 'Total Pendapatan',
            value: orderStats ? formatPrice(orderStats.total_revenue) : formatPrice(0),
            change: orderStats ? `+${formatPrice(orderStats.revenue_this_month)}` : '+0',
            trend: 'up',
            icon: <DollarSign size={24} />,
            color: 'green',
        },
        {
            label: 'Total Pesanan',
            value: orderStats?.total_orders?.toString() || '0',
            change: `+${orderStats?.orders_this_month || 0} bulan ini`,
            trend: 'up',
            icon: <ShoppingCart size={24} />,
            color: 'blue',
        },
        {
            label: 'Total Produk',
            value: products?.length?.toString() || '0',
            change: 'Aktif',
            trend: 'up',
            icon: <Package size={24} />,
            color: 'purple',
        },
        {
            label: 'Total Pelanggan',
            value: customerStats?.total_customers?.toString() || '0',
            change: `+${customerStats?.new_customers_this_month || 0} bulan ini`,
            trend: 'up',
            icon: <Users size={24} />,
            color: 'orange',
        },
    ];

    // Popular products (top 5 by best seller status)
    const popularProducts = (products || [])
        .filter(p => p.isBestSeller)
        .slice(0, 5)
        .map((p, i) => ({
            ...p,
            salesCount: [150, 120, 98, 85, 72][i] || 50,
            views: [2500, 2100, 1800, 1500, 1200][i] || 500,
        }));

    if (isLoading) {
        return (
            <div className="admin-dashboard">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {/* Welcome Section */}
            <div className="welcome-section">
                <div className="welcome-content">
                    <h2>Selamat Datang, Admin! 👋</h2>
                    <p>Berikut ringkasan aktivitas PrintMaster hari ini.</p>
                </div>
                <div className="welcome-date">
                    {new Date().toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className={`stat-card ${stat.color}`}>
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-content">
                            <p className="stat-label">{stat.label}</p>
                            <h3 className="stat-value">{stat.value}</h3>
                            <span className={`stat-change ${stat.trend}`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-grid">
                {/* Recent Orders */}
                <div className="dashboard-card orders-card">
                    <div className="card-header">
                        <h3>Pesanan Terbaru</h3>
                        <a href="/admin/orders" className="view-all-link">
                            Lihat Semua
                            <ArrowUpRight size={14} />
                        </a>
                    </div>
                    <div className="orders-table-wrapper">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Pelanggan</th>
                                    <th>Produk</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="order-id">{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td className="product-name">{order.product}</td>
                                        <td>{order.qty}</td>
                                        <td className="order-total">{formatPrice(order.total)}</td>
                                        <td>
                                            <span className={`status-badge ${statusLabels[order.status]?.color || 'gray'}`}>
                                                {statusLabels[order.status]?.label || order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Popular Products */}
                <div className="dashboard-card products-card">
                    <div className="card-header">
                        <h3>Produk Populer</h3>
                        <a href="/admin/products" className="view-all-link">
                            Lihat Semua
                            <ArrowUpRight size={14} />
                        </a>
                    </div>
                    <div className="popular-products">
                        {popularProducts.length > 0 ? (
                            popularProducts.map((product, index) => (
                                <div key={product.id} className="popular-product-item">
                                    <span className="product-rank">#{index + 1}</span>
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="product-thumb"
                                    />
                                    <div className="product-details">
                                        <p className="product-name">{product.name}</p>
                                        <div className="product-stats">
                                            <span><ShoppingCart size={12} /> {product.salesCount} terjual</span>
                                            <span><Eye size={12} /> {product.views} views</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="empty-text">Belum ada produk populer</p>
                        )}
                    </div>
                </div>

                {/* Categories Overview */}
                <div className="dashboard-card categories-card">
                    <div className="card-header">
                        <h3>Kategori</h3>
                        <a href="/admin/categories" className="view-all-link">
                            Kelola
                            <ArrowUpRight size={14} />
                        </a>
                    </div>
                    <div className="categories-list">
                        {(categories || []).map((category) => (
                            <div key={category.id} className="category-item">
                                <span className="category-icon">{category.icon}</span>
                                <div className="category-info">
                                    <p className="category-name">{category.name}</p>
                                    <p className="category-count">{category.productCount} produk</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="dashboard-card actions-card">
                    <div className="card-header">
                        <h3>Aksi Cepat</h3>
                    </div>
                    <div className="quick-actions">
                        <a href="/admin/products/new" className="quick-action-btn">
                            <Package size={20} />
                            Tambah Produk
                        </a>
                        <a href="/admin/categories/new" className="quick-action-btn">
                            <TrendingUp size={20} />
                            Tambah Kategori
                        </a>
                        <a href="/admin/promos/new" className="quick-action-btn">
                            <DollarSign size={20} />
                            Buat Promo
                        </a>
                        <a href="/admin/orders" className="quick-action-btn">
                            <ShoppingCart size={20} />
                            Kelola Pesanan
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
