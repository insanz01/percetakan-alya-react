import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronLeft,
    User,
    Lock,
    Bell,
    Save,
    Loader2,
    Eye,
    EyeOff
} from 'lucide-react';
import { authService } from '../../lib/authService';
import { useUIStore } from '../../store';
import './AccountSettings.css';

interface ProfileForm {
    name: string;
    phone: string;
}

interface PasswordForm {
    current_password: string;
    password: string;
    password_confirmation: string;
}

export default function AccountSettings() {
    const { addToast } = useUIStore();

    const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications'>('profile');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [profileForm, setProfileForm] = useState<ProfileForm>({
        name: '',
        phone: '',
    });

    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        promotions: false,
        newsletter: true,
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await authService.getProfile();
            if (response.success) {
                setProfileForm({
                    name: response.data.name,
                    phone: response.data.phone || '',
                });
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Gagal memuat profil',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await authService.updateProfile(profileForm);
            if (response.success) {
                addToast({
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Profil berhasil diperbarui',
                });
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: error instanceof Error ? error.message : 'Gagal memperbarui profil',
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordForm.password !== passwordForm.password_confirmation) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Password baru tidak cocok',
            });
            return;
        }

        if (passwordForm.password.length < 8) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Password minimal 8 karakter',
            });
            return;
        }

        setIsSaving(true);
        try {
            const response = await authService.changePassword(passwordForm);
            if (response.success) {
                addToast({
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Password berhasil diubah',
                });
                setPasswordForm({
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                });
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: error instanceof Error ? error.message : 'Gagal mengubah password',
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
        addToast({
            type: 'success',
            title: 'Tersimpan',
            message: 'Pengaturan notifikasi diperbarui',
        });
    };

    if (isLoading) {
        return (
            <div className="account-settings">
                <div className="container">
                    <div className="loading-state">
                        <Loader2 size={48} className="spinner" />
                        <p>Memuat pengaturan...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="account-settings">
            <div className="container">
                {/* Header */}
                <div className="settings-header">
                    <Link to="/akun" className="back-btn">
                        <ChevronLeft size={20} />
                        Kembali
                    </Link>
                    <h1>Pengaturan Akun</h1>
                </div>

                <div className="settings-content">
                    {/* Tabs */}
                    <div className="settings-tabs">
                        <button
                            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <User size={18} />
                            Profil
                        </button>
                        <button
                            className={`tab ${activeTab === 'password' ? 'active' : ''}`}
                            onClick={() => setActiveTab('password')}
                        >
                            <Lock size={18} />
                            Password
                        </button>
                        <button
                            className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <Bell size={18} />
                            Notifikasi
                        </button>
                    </div>

                    {/* Content */}
                    <div className="settings-panel">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <form onSubmit={handleProfileSubmit} className="settings-form">
                                <h2>Informasi Profil</h2>
                                <p className="form-desc">Perbarui informasi profil Anda</p>

                                <div className="form-group">
                                    <label>Nama Lengkap</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profileForm.name}
                                        onChange={handleProfileChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Nomor Telepon</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileForm.phone}
                                        onChange={handleProfileChange}
                                        placeholder="081234567890"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 size={18} className="spinner" />
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Simpan Perubahan
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Password Tab */}
                        {activeTab === 'password' && (
                            <form onSubmit={handlePasswordSubmit} className="settings-form">
                                <h2>Ubah Password</h2>
                                <p className="form-desc">Pastikan password Anda aman dan mudah diingat</p>

                                <div className="form-group">
                                    <label>Password Saat Ini</label>
                                    <div className="password-input">
                                        <input
                                            type={showPasswords.current ? 'text' : 'password'}
                                            name="current_password"
                                            value={passwordForm.current_password}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="toggle-btn"
                                            onClick={() => setShowPasswords(p => ({ ...p, current: !p.current }))}
                                        >
                                            {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Password Baru</label>
                                    <div className="password-input">
                                        <input
                                            type={showPasswords.new ? 'text' : 'password'}
                                            name="password"
                                            value={passwordForm.password}
                                            onChange={handlePasswordChange}
                                            minLength={8}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="toggle-btn"
                                            onClick={() => setShowPasswords(p => ({ ...p, new: !p.new }))}
                                        >
                                            {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <span className="form-hint">Minimal 8 karakter</span>
                                </div>

                                <div className="form-group">
                                    <label>Konfirmasi Password Baru</label>
                                    <div className="password-input">
                                        <input
                                            type={showPasswords.confirm ? 'text' : 'password'}
                                            name="password_confirmation"
                                            value={passwordForm.password_confirmation}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="toggle-btn"
                                            onClick={() => setShowPasswords(p => ({ ...p, confirm: !p.confirm }))}
                                        >
                                            {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 size={18} className="spinner" />
                                            Mengubah...
                                        </>
                                    ) : (
                                        <>
                                            <Lock size={18} />
                                            Ubah Password
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div className="settings-form">
                                <h2>Pengaturan Notifikasi</h2>
                                <p className="form-desc">Kelola notifikasi yang ingin Anda terima</p>

                                <div className="notification-list">
                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <h4>Update Pesanan</h4>
                                            <p>Terima notifikasi tentang status pesanan Anda</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notifications.orderUpdates}
                                                onChange={() => handleNotificationChange('orderUpdates')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <h4>Promosi</h4>
                                            <p>Terima info promo dan penawaran khusus</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notifications.promotions}
                                                onChange={() => handleNotificationChange('promotions')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <h4>Newsletter</h4>
                                            <p>Terima tips dan berita terbaru</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notifications.newsletter}
                                                onChange={() => handleNotificationChange('newsletter')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
