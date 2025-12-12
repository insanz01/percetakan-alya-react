import { useState } from 'react';
import { Save, Store, Globe, Mail, Phone, MapPin, Bell, Shield, Palette } from 'lucide-react';
import './Settings.css';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('general');

    return (
        <div className="admin-settings">
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <h2>Pengaturan</h2>
                    <p>Kelola pengaturan website dan toko</p>
                </div>
            </div>

            <div className="settings-container">
                {/* Tabs */}
                <div className="settings-tabs">
                    <button
                        className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <Store size={18} />
                        Umum
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'contact' ? 'active' : ''}`}
                        onClick={() => setActiveTab('contact')}
                    >
                        <Mail size={18} />
                        Kontak
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <Bell size={18} />
                        Notifikasi
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('appearance')}
                    >
                        <Palette size={18} />
                        Tampilan
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        <Shield size={18} />
                        Keamanan
                    </button>
                </div>

                {/* Content */}
                <div className="settings-content">
                    {activeTab === 'general' && (
                        <div className="settings-section">
                            <h3>Informasi Toko</h3>
                            <p className="section-desc">Informasi dasar tentang toko Anda</p>

                            <div className="settings-form">
                                <div className="form-group">
                                    <label className="label">Nama Toko</label>
                                    <input
                                        type="text"
                                        className="input"
                                        defaultValue="PrintMaster Indonesia"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="label">Tagline</label>
                                    <input
                                        type="text"
                                        className="input"
                                        defaultValue="Platform Percetakan Online Terpercaya"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="label">Deskripsi</label>
                                    <textarea
                                        className="input textarea"
                                        rows={4}
                                        defaultValue="PrintMaster adalah platform percetakan online yang menyediakan layanan cetak berkualitas tinggi dengan harga transparan."
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="label">Website URL</label>
                                    <div className="input-with-addon">
                                        <span className="input-addon"><Globe size={16} /></span>
                                        <input
                                            type="url"
                                            className="input"
                                            defaultValue="https://printmaster.id"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div className="settings-section">
                            <h3>Informasi Kontak</h3>
                            <p className="section-desc">Detail kontak yang ditampilkan di website</p>

                            <div className="settings-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="label">Email</label>
                                        <div className="input-with-addon">
                                            <span className="input-addon"><Mail size={16} /></span>
                                            <input
                                                type="email"
                                                className="input"
                                                defaultValue="info@printmaster.id"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Telepon</label>
                                        <div className="input-with-addon">
                                            <span className="input-addon"><Phone size={16} /></span>
                                            <input
                                                type="tel"
                                                className="input"
                                                defaultValue="021-12345678"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="label">WhatsApp</label>
                                    <input
                                        type="text"
                                        className="input"
                                        defaultValue="+62 812-3456-7890"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="label">Alamat</label>
                                    <div className="input-with-addon">
                                        <span className="input-addon"><MapPin size={16} /></span>
                                        <textarea
                                            className="input textarea"
                                            rows={3}
                                            defaultValue="Jl. Percetakan No. 123, Jakarta Pusat, 10110"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <h3>Pengaturan Notifikasi</h3>
                            <p className="section-desc">Kelola notifikasi yang dikirim</p>

                            <div className="notification-settings">
                                <div className="notification-item">
                                    <div className="notification-info">
                                        <h4>Pesanan Baru</h4>
                                        <p>Kirim email saat ada pesanan baru</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div className="notification-item">
                                    <div className="notification-info">
                                        <h4>Pembayaran Diterima</h4>
                                        <p>Kirim email saat pembayaran dikonfirmasi</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div className="notification-item">
                                    <div className="notification-info">
                                        <h4>Status Pengiriman</h4>
                                        <p>Update pelanggan tentang status pengiriman</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="settings-section">
                            <h3>Pengaturan Tampilan</h3>
                            <p className="section-desc">Kustomisasi tampilan website</p>

                            <div className="appearance-info">
                                <p>Fitur kustomisasi tampilan akan segera hadir.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-section">
                            <h3>Keamanan</h3>
                            <p className="section-desc">Pengaturan keamanan akun admin</p>

                            <div className="settings-form">
                                <div className="form-group">
                                    <label className="label">Password Saat Ini</label>
                                    <input type="password" className="input" />
                                </div>
                                <div className="form-group">
                                    <label className="label">Password Baru</label>
                                    <input type="password" className="input" />
                                </div>
                                <div className="form-group">
                                    <label className="label">Konfirmasi Password Baru</label>
                                    <input type="password" className="input" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="settings-actions">
                        <button className="btn btn-primary">
                            <Save size={18} />
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
