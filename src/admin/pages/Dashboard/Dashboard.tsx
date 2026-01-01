import {
    TrendingUp,
    ShoppingCart,
    Package,
    Users,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Loader2
} from 'lucide-react';
import {
    useOrderStatistics,
    useCustomerStatistics,
    useProducts,
    useCategories,
    useRecentOrders,
    usePopularProducts
} from '../../../hooks';
import { formatPrice } from '../../../lib/utils';
import './Dashboard.css';

const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: 'Menunggu', color: 'yellow' },
    pending_payment: { label: 'Menunggu', color: 'yellow' },
    processing: { label: 'Diproses', color: 'blue' },
    payment_verified: { label: 'Diproses', color: 'blue' },
    in_production: { label: 'Produksi', color: 'blue' },
    finishing: { label: 'Finishing', color: 'blue' },
    shipped: { label: 'Dikirim', color: 'purple' },
    completed: { label: 'Selesai', color: 'green' },
    delivered: { label: 'Selesai', color: 'green' },
    cancelled: { label: 'Dibatalkan', color: 'red' },
};

export default function Dashboard() {
    const { data: orderStats, isLoading: orderStatsLoading } = useOrderStatistics();
    const { data: customerStats, isLoading: customerStatsLoading } = useCustomerStatistics();
    const { data: products, isLoading: productsLoading } = useProducts({ active: true });
    const { data: categories, isLoading: categoriesLoading } = useCategories({ active: true });
    const { data: recentOrders, isLoading: recentOrdersLoading } = useRecentOrders(5);
    const { data: popularProducts, isLoading: popularProductsLoading } = usePopularProducts(5);

    const isLoading = orderStatsLoading || customerStatsLoading || productsLoading || categoriesLoading || recentOrdersLoading || popularProductsLoading;

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
                        {recentOrders && recentOrders.length > 0 ? (
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
                                            <td className="order-id">{order.order_number}</td>
                                            <td>{order.customer}</td>
                                            <td className="product-name">
                                                {order.product}
                                                {order.items_count > 1 && (
                                                    <span className="items-more"> +{order.items_count - 1} lainnya</span>
                                                )}
                                            </td>
                                            <td>{order.quantity}</td>
                                            <td className="order-total">{formatPrice(order.total_amount)}</td>
                                            <td>
                                                <span className={`status-badge ${statusLabels[order.status]?.color || 'gray'}`}>
                                                    {statusLabels[order.status]?.label || order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-state">
                                <ShoppingCart size={32} />
                                <p>Belum ada pesanan</p>
                            </div>
                        )}
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
                        {popularProducts && popularProducts.length > 0 ? (
                            popularProducts.map((product, index) => (
                                <div key={product.id} className="popular-product-item">
                                    <span className="product-rank">#{index + 1}</span>
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="product-thumb"
                                        />
                                    ) : (
                                        <div className="product-thumb placeholder">
                                            <Package size={20} />
                                        </div>
                                    )}
                                    <div className="product-details">
                                        <p className="product-name">{product.name}</p>
                                        <div className="product-stats">
                                            <span><ShoppingCart size={12} /> {product.total_sold} terjual</span>
                                            <span className="category-tag">{product.category || 'Uncategorized'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <Package size={32} />
                                <p>Belum ada produk populer</p>
                            </div>
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
                        {(categories || []).length > 0 ? (
                            categories!.map((category) => (
                                <div key={category.id} className="category-item">
                                    <span className="category-icon">{category.icon || '📁'}</span>
                                    <div className="category-info">
                                        <p className="category-name">{category.name}</p>
                                        <p className="category-count">{category.productCount || 0} produk</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <TrendingUp size={32} />
                                <p>Belum ada kategori</p>
                            </div>
                        )}
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
