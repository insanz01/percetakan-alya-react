import { useState, useEffect } from 'react';
import {
    MapPin,
    Plus,
    Edit2,
    Trash2,
    Star,
    X,
    Loader2,
    Check
} from 'lucide-react';
import { useUIStore } from '../../store';
import { api, ApiResponse } from '../../lib/api';
import './AddressList.css';

interface ShippingAddress {
    id: string;
    recipient_name: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    is_default: boolean;
}

export default function AddressList() {
    const { addToast } = useUIStore();
    const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState<ShippingAddress | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        recipient_name: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postal_code: '',
        is_default: false,
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await api.get<ApiResponse<ShippingAddress[]>>('/addresses');
            if (response.success) {
                setAddresses(response.data);
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Gagal memuat alamat',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (address?: ShippingAddress) => {
        if (address) {
            setEditingAddress(address);
            setFormData({
                recipient_name: address.recipient_name,
                phone: address.phone,
                address: address.address,
                city: address.city,
                province: address.province,
                postal_code: address.postal_code,
                is_default: address.is_default,
            });
        } else {
            setEditingAddress(null);
            setFormData({
                recipient_name: '',
                phone: '',
                address: '',
                city: '',
                province: '',
                postal_code: '',
                is_default: false,
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingAddress(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            if (editingAddress) {
                await api.put(`/addresses/${editingAddress.id}`, formData);
                addToast({
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Alamat berhasil diperbarui',
                });
            } else {
                await api.post('/addresses', formData);
                addToast({
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Alamat baru berhasil ditambahkan',
                });
            }
            handleCloseModal();
            fetchAddresses();
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: error instanceof Error ? error.message : 'Gagal menyimpan alamat',
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Apakah Anda yakin ingin menghapus alamat ini?')) return;

        try {
            await api.delete(`/addresses/${id}`);
            addToast({
                type: 'success',
                title: 'Berhasil',
                message: 'Alamat berhasil dihapus',
            });
            fetchAddresses();
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Gagal menghapus alamat',
            });
        }
    };

    const provinces = [
        'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten',
        'DIY Yogyakarta', 'Bali', 'Sumatera Utara', 'Sumatera Barat', 'Sumatera Selatan',
        'Kalimantan Barat', 'Kalimantan Timur', 'Sulawesi Selatan', 'Sulawesi Utara',
        // Add more provinces as needed
    ];

    if (isLoading) {
        return (
            <div className="address-list">
                <div className="loading-state">
                    <Loader2 className="spinner" size={48} />
                    <p>Memuat alamat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="address-list">
            <div className="section-header">
                <h1>Alamat Pengiriman</h1>
                <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                    <Plus size={18} />
                    Tambah Alamat
                </button>
            </div>

            {addresses.length === 0 ? (
                <div className="empty-state">
                    <MapPin size={64} />
                    <h3>Belum Ada Alamat</h3>
                    <p>Tambahkan alamat pengiriman untuk memudahkan checkout</p>
                    <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                        <Plus size={18} />
                        Tambah Alamat Pertama
                    </button>
                </div>
            ) : (
                <div className="address-cards">
                    {addresses.map(address => (
                        <div key={address.id} className={`address-card ${address.is_default ? 'default' : ''}`}>
                            {address.is_default && (
                                <div className="default-badge">
                                    <Star size={14} />
                                    Alamat Utama
                                </div>
                            )}
                            <div className="address-content">
                                <div className="recipient-name">{address.recipient_name}</div>
                                <div className="recipient-phone">{address.phone}</div>
                                <div className="address-text">
                                    {address.address}
                                </div>
                                <div className="address-location">
                                    {address.city}, {address.province} {address.postal_code}
                                </div>
                            </div>
                            <div className="address-actions">
                                <button
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => handleOpenModal(address)}
                                >
                                    <Edit2 size={16} />
                                    Edit
                                </button>
                                <button
                                    className="btn btn-ghost btn-sm text-error"
                                    onClick={() => handleDelete(address.id)}
                                >
                                    <Trash2 size={16} />
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingAddress ? 'Edit Alamat' : 'Tambah Alamat Baru'}</h2>
                            <button className="modal-close" onClick={handleCloseModal}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="address-form">
                            <div className="form-group">
                                <label>Nama Penerima</label>
                                <input
                                    type="text"
                                    name="recipient_name"
                                    value={formData.recipient_name}
                                    onChange={handleChange}
                                    placeholder="Nama lengkap penerima"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Nomor Telepon</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="08xxxxxxxxxx"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Alamat Lengkap</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Nama jalan, nomor rumah, RT/RW, dll"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Kota/Kabupaten</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Jakarta Selatan"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Kode Pos</label>
                                    <input
                                        type="text"
                                        name="postal_code"
                                        value={formData.postal_code}
                                        onChange={handleChange}
                                        placeholder="12345"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Provinsi</label>
                                <select
                                    name="province"
                                    value={formData.province}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Pilih Provinsi</option>
                                    {provinces.map(prov => (
                                        <option key={prov} value={prov}>{prov}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="is_default"
                                        checked={formData.is_default}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark"></span>
                                    Jadikan alamat utama
                                </label>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                                    Batal
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="spinner" size={18} />
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={18} />
                                            Simpan Alamat
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
