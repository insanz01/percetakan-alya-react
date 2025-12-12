import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
    User,
    ShoppingBag,
    MapPin,
    Settings,
    LogOut,
    ChevronRight,
    Edit2,
    Loader2
} from 'lucide-react';
import { authService } from '../../lib/authService';
import { getToken } from '../../lib/api';
import { useUIStore } from '../../store';
import './Account.css';

interface UserData {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    role?: string;
    created_at?: string;
}

export default function Account() {
    const navigate = useNavigate();
    const location = useLocation();
    const { addToast } = useUIStore();
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate('/login');
            return;
        }

        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await authService.getProfile();
            if (response.success) {
                setUser(response.data);
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Gagal memuat data user',
            });
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            addToast({
                type: 'success',
                title: 'Logged Out',
                message: 'Anda telah keluar dari akun',
            });
            navigate('/');
        } catch (error) {
            // Still logout locally
            navigate('/');
        }
    };

    const menuItems = [
        { path: '/akun', label: 'Profil Saya', icon: User, exact: true },
        { path: '/akun/pesanan', label: 'Riwayat Pesanan', icon: ShoppingBag },
        { path: '/akun/alamat', label: 'Alamat Pengiriman', icon: MapPin },
        { path: '/akun/pengaturan', label: 'Pengaturan', icon: Settings },
    ];

    const isActive = (path: string, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    if (isLoading) {
        return (
            <div className="account-page">
                <div className="container">
                    <div className="loading-container">
                        <Loader2 className="spinner" size={48} />
                        <p>Memuat data...</p>
                    </div>
                </div>
            </div>
        );
    }

    // If we're on a sub-route, render the Outlet
    if (location.pathname !== '/akun') {
        return (
            <div className="account-page">
                <div className="container">
                    <div className="account-layout">
                        {/* Sidebar */}
                        <aside className="account-sidebar">
                            <div className="user-card">
                                <div className="user-avatar">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt={user.name} />
                                    ) : (
                                        <span>{user?.name?.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                                <div className="user-info">
                                    <div className="user-name">{user?.name}</div>
                                    <div className="user-email">{user?.email}</div>
                                </div>
                            </div>

                            <nav className="account-nav">
                                {menuItems.map(item => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`nav-item ${isActive(item.path, item.exact) ? 'active' : ''}`}
                                    >
                                        <item.icon size={20} />
                                        <span>{item.label}</span>
                                        <ChevronRight size={18} className="chevron" />
                                    </Link>
                                ))}
                                <button className="nav-item logout" onClick={handleLogout}>
                                    <LogOut size={20} />
                                    <span>Keluar</span>
                                </button>
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <main className="account-main">
                            <Outlet context={{ user, refetchUser: fetchUserData }} />
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    // Profile page (default /akun)
    return (
        <div className="account-page">
            <div className="container">
                <div className="account-layout">
                    {/* Sidebar */}
                    <aside className="account-sidebar">
                        <div className="user-card">
                            <div className="user-avatar">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt={user.name} />
                                ) : (
                                    <span>{user?.name?.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <div className="user-info">
                                <div className="user-name">{user?.name}</div>
                                <div className="user-email">{user?.email}</div>
                            </div>
                        </div>

                        <nav className="account-nav">
                            {menuItems.map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`nav-item ${isActive(item.path, item.exact) ? 'active' : ''}`}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                    <ChevronRight size={18} className="chevron" />
                                </Link>
                            ))}
                            <button className="nav-item logout" onClick={handleLogout}>
                                <LogOut size={20} />
                                <span>Keluar</span>
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content - Profile */}
                    <main className="account-main">
                        <div className="profile-section">
                            <div className="section-header">
                                <h1>Profil Saya</h1>
                                <Link to="/akun/edit" className="btn btn-outline btn-sm">
                                    <Edit2 size={16} />
                                    Edit Profil
                                </Link>
                            </div>

                            <div className="profile-card">
                                <div className="profile-avatar-large">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt={user.name} />
                                    ) : (
                                        <span>{user?.name?.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>

                                <div className="profile-details">
                                    <div className="detail-group">
                                        <label>Nama Lengkap</label>
                                        <p>{user?.name}</p>
                                    </div>
                                    <div className="detail-group">
                                        <label>Email</label>
                                        <p>{user?.email}</p>
                                    </div>
                                    <div className="detail-group">
                                        <label>Nomor Telepon</label>
                                        <p>{user?.phone || '-'}</p>
                                    </div>
                                    <div className="detail-group">
                                        <label>Bergabung Sejak</label>
                                        <p>{user?.created_at ? new Date(user.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        }) : '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="quick-actions">
                            <h2>Akses Cepat</h2>
                            <div className="actions-grid">
                                <Link to="/akun/pesanan" className="action-card">
                                    <ShoppingBag size={32} />
                                    <span>Lihat Pesanan</span>
                                </Link>
                                <Link to="/akun/alamat" className="action-card">
                                    <MapPin size={32} />
                                    <span>Kelola Alamat</span>
                                </Link>
                                <Link to="/kategori" className="action-card">
                                    <ShoppingBag size={32} />
                                    <span>Belanja</span>
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
