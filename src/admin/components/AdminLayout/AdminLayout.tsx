import { useState, useMemo, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Grid3X3,
    ShoppingCart,
    Users,
    Tag,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Bell
} from 'lucide-react';
import './AdminLayout.css';
import '../../styles/admin-shared.css';

// Default admin user
const defaultAdminUser = {
    name: 'Admin PrintMaster',
    email: 'admin@printmaster.id',
    role: 'Super Admin',
    avatar: '👤'
};

const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard', exact: true },
    { path: '/admin/products', icon: <Package size={20} />, label: 'Produk' },
    { path: '/admin/categories', icon: <Grid3X3 size={20} />, label: 'Kategori' },
    { path: '/admin/orders', icon: <ShoppingCart size={20} />, label: 'Pesanan' },
    { path: '/admin/customers', icon: <Users size={20} />, label: 'Pelanggan' },
    { path: '/admin/promos', icon: <Tag size={20} />, label: 'Promo' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Pengaturan' },
];

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Sample notifications data
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            title: 'Pesanan Baru',
            message: 'Pesanan #ORD-001 telah diterima',
            time: '5 menit yang lalu',
            read: false,
            type: 'order'
        },
        {
            id: '2',
            title: 'Pembayaran Dikonfirmasi',
            message: 'Pembayaran untuk pesanan #ORD-002 telah dikonfirmasi',
            time: '1 jam yang lalu',
            read: false,
            type: 'payment'
        },
        {
            id: '3',
            title: 'Produk Stok Rendah',
            message: 'Brosur A5 Premium memiliki stok rendah',
            time: '3 jam yang lalu',
            read: false,
            type: 'stock'
        }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
    };

    // Get admin user from localStorage or use default
    const adminUser = useMemo(() => {
        try {
            const stored = localStorage.getItem('adminUser');
            if (stored) {
                const user = JSON.parse(stored);
                return {
                    name: user.name || defaultAdminUser.name,
                    email: user.email || defaultAdminUser.email,
                    role: user.role || 'Admin',
                    avatar: '👤'
                };
            }
        } catch {
            // ignore parse error
        }
        return defaultAdminUser;
    }, []);

    const isActive = (path: string, exact?: boolean) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        // In real app, clear admin session
        navigate('/admin/login');
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            // Close notification dropdown if clicked outside
            if (isNotificationOpen && !target.closest('.notification-dropdown')) {
                setIsNotificationOpen(false);
            }

            // Close profile dropdown if clicked outside
            if (isProfileOpen && !target.closest('.profile-dropdown')) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isNotificationOpen, isProfileOpen]);


    return (
        <div className="admin-layout">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/admin" className="admin-logo">
                        <span className="logo-icon">🖨️</span>
                        <span className="logo-text">
                            Print<span className="logo-accent">Master</span>
                        </span>
                    </Link>
                    <button
                        className="sidebar-close-btn"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="sidebar-badge">Admin Panel</div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-link ${isActive(item.path, item.exact) ? 'active' : ''}`}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <Link to="/" className="sidebar-link" target="_blank">
                        <span>🌐</span>
                        <span>Lihat Website</span>
                    </Link>
                    <button className="sidebar-link logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Keluar</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="admin-main">
                {/* Top Header */}
                <header className="admin-header">
                    <div className="header-left">
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="page-title">
                            {menuItems.find(m => isActive(m.path, m.exact))?.label || 'Admin'}
                        </h1>
                    </div>

                    <div className="header-right">
                        <div className="notification-dropdown">
                            <button
                                className="header-action-btn notification-btn"
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="notification-badge">{unreadCount}</span>
                                )}
                            </button>

                            {isNotificationOpen && (
                                <div className="notification-menu">
                                    <div className="notification-menu-header">
                                        <h3>Notifikasi</h3>
                                        {unreadCount > 0 && (
                                            <button
                                                className="mark-all-read-btn"
                                                onClick={markAllAsRead}
                                            >
                                                Tandai Semua Dibaca
                                            </button>
                                        )}
                                    </div>

                                    <div className="notification-list">
                                        {notifications.length === 0 ? (
                                            <div className="notification-empty">
                                                <Bell size={32} />
                                                <p>Tidak ada notifikasi</p>
                                            </div>
                                        ) : (
                                            notifications.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                                                    onClick={() => markAsRead(notif.id)}
                                                >
                                                    <div className="notification-icon">
                                                        {notif.type === 'order' && '📦'}
                                                        {notif.type === 'payment' && '💳'}
                                                        {notif.type === 'stock' && '📊'}
                                                    </div>
                                                    <div className="notification-content">
                                                        <h4>{notif.title}</h4>
                                                        <p>{notif.message}</p>
                                                        <span className="notification-time">{notif.time}</span>
                                                    </div>
                                                    {!notif.read && <div className="notification-dot"></div>}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="profile-dropdown">
                            <button
                                className="profile-btn"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            >
                                <span className="profile-avatar">{adminUser.avatar}</span>
                                <div className="profile-info">
                                    <span className="profile-name">{adminUser.name}</span>
                                    <span className="profile-role">{adminUser.role}</span>
                                </div>
                                <ChevronDown size={16} className={isProfileOpen ? 'rotate' : ''} />
                            </button>

                            {isProfileOpen && (
                                <div className="profile-menu">
                                    <div className="profile-menu-header">
                                        <span className="profile-avatar-lg">{adminUser.avatar}</span>
                                        <div>
                                            <p className="profile-name">{adminUser.name}</p>
                                            <p className="profile-email">{adminUser.email}</p>
                                        </div>
                                    </div>
                                    <div className="profile-menu-divider" />
                                    <Link to="/admin/settings" className="profile-menu-item">
                                        <Settings size={16} />
                                        Pengaturan
                                    </Link>
                                    <button className="profile-menu-item logout" onClick={handleLogout}>
                                        <LogOut size={16} />
                                        Keluar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
