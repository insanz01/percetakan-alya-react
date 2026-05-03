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
                            <div className="section-header">
                                <div>
                                    <h3>Informasi Toko</h3>
                                    <p className="section-desc">Informasi dasar tentang toko Anda</p>
                                </div>
                                <button className="btn btn-primary">
                                    <Save size={18} />
                                    Simpan Perubahan
                                </button>
                            </div>

                            <div className="settings-form">
                                <div className="form-group">
                                    <label className="label">Nama Toko</label>
                                    <input
                                        type="text"
                                        className="input"
                                        defaultValue="Semanggi Print"
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
                                        defaultValue="Semanggi Print adalah percetakan online terpercaya yang menyediakan layanan cetak berkualitas tinggi dengan harga transparan di Palangka Raya."
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="label">Website URL</label>
                                    <div className="input-with-addon">
                                        <span className="input-addon"><Globe size={16} /></span>
                                        <input
                                            type="url"
                                            className="input"
                                            defaultValue="https://semanggiprintpalangkaraya.com"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <div>
                                    <h3>Informasi Kontak</h3>
                                    <p className="section-desc">Detail kontak yang ditampilkan di website</p>
                                </div>
                                <button className="btn btn-primary">
                                    <Save size={18} />
                                    Simpan Perubahan
                                </button>
                            </div>

                            <div className="settings-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="label">Email</label>
                                        <div className="input-with-addon">
                                            <span className="input-addon"><Mail size={16} /></span>
                                            <input
                                                type="email"
                                                className="input"
                                                defaultValue="rudygrafika@gmail.com"
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
                                                defaultValue="0813-1115-2071"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="label">WhatsApp</label>
                                    <input
                                        type="text"
                                        className="input"
                                        defaultValue="0813-1115-2071"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="label">Alamat</label>
                                    <div className="input-with-addon">
                                        <span className="input-addon"><MapPin size={16} /></span>
                                        <textarea
                                            className="input textarea"
                                            rows={3}
                                            defaultValue="Jl. A.Yani No.39, Kelurahan Langkai, Kec. Pahandut, Kota Palangka Raya, Kalimantan Tengah 73111"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <div>
                                    <h3>Pengaturan Notifikasi</h3>
                                    <p className="section-desc">Kelola notifikasi yang dikirim</p>
                                </div>
                                <button className="btn btn-primary">
                                    <Save size={18} />
                                    Simpan Perubahan
                                </button>
                            </div>

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
                            <div className="section-header">
                                <div>
                                    <h3>Pengaturan Tampilan</h3>
                                    <p className="section-desc">Kustomisasi tampilan website</p>
                                </div>
                            </div>

                            <div className="appearance-info">
                                <p>Fitur kustomisasi tampilan akan segera hadir.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <div>
                                    <h3>Keamanan</h3>
                                    <p className="section-desc">Pengaturan keamanan akun admin</p>
                                </div>
                                <button className="btn btn-primary">
                                    <Save size={18} />
                                    Simpan Perubahan
                                </button>
                            </div>

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
                </div>
            </div>
        </div>
    );
}
