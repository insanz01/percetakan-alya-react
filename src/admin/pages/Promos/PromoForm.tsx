import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ChevronLeft,
    Save,
    Loader2,
    Tag,
    Calendar,
    Percent
} from 'lucide-react';
import { promoService, PromoInput } from '../../../lib/promoService';
import { useUIStore } from '../../../store';
import './PromoForm.css';

const defaultFormData: PromoInput = {
    kode: '',
    deskripsi: '',
    tipe: 'percentage',
    diskon: 0,
    min_beli: 0,
    maks_diskon: undefined,
    batas_penggunaan: undefined,
    tanggal_mulai: '',
    tanggal_berakhir: '',
    aktif: true,
};

export default function PromoForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToast } = useUIStore();
    const isEdit = !!id;

    const [formData, setFormData] = useState<PromoInput>(defaultFormData);
    const [isLoading, setIsLoading] = useState(isEdit);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isEdit && id) {
            fetchPromo();
        }
    }, [id, isEdit]);

    const fetchPromo = async () => {
        try {
            const response = await promoService.getPromoById(id!);
            if (response.success) {
                const promo = response.data;
                setFormData({
                    kode: promo.kode,
                    deskripsi: promo.deskripsi || '',
                    tipe: promo.tipe,
                    diskon: promo.diskon,
                    min_beli: promo.min_beli || 0,
                    maks_diskon: promo.maks_diskon,
                    batas_penggunaan: promo.batas_penggunaan,
                    // API returns full ISO datetimes (datetime cast); <input type="date">
                    // only accepts yyyy-MM-dd, so trim it down.
                    tanggal_mulai: promo.tanggal_mulai ? promo.tanggal_mulai.slice(0, 10) : '',
                    tanggal_berakhir: promo.tanggal_berakhir ? promo.tanggal_berakhir.slice(0, 10) : '',
                    aktif: promo.aktif,
                });
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Gagal memuat data promo',
            });
            navigate('/admin/promos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked,
            }));
        } else if (type === 'number') {
            setFormData(prev => ({
                ...prev,
                [name]: value === '' ? undefined : parseFloat(value),
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.kode || formData.diskon <= 0) {
            addToast({
                type: 'error',
                title: 'Validasi Error',
                message: 'Kode promo dan nilai diskon wajib diisi',
            });
            return;
        }

        setIsSaving(true);
        try {
            if (isEdit) {
                await promoService.updatePromo(id!, formData);
                addToast({
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Promo berhasil diperbarui',
                });
            } else {
                await promoService.createPromo(formData);
                addToast({
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Promo berhasil ditambahkan',
                });
            }
            navigate('/admin/promos');
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: error instanceof Error ? error.message : 'Gagal menyimpan promo',
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="admin-promo-form">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat data promo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-promo-form">
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <Link to="/admin/promos" className="back-btn">
                        <ChevronLeft size={20} />
                        Kembali
                    </Link>
                    <h2>{isEdit ? 'Edit Promo' : 'Buat Promo Baru'}</h2>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Simpan Promo
                        </>
                    )}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="promo-form">
                <div className="form-grid">
                    {/* Basic Info */}
                    <div className="form-card">
                        <h3><Tag size={20} /> Informasi Promo</h3>

                        <div className="form-group">
                            <label>Kode Promo *</label>
                            <input
                                type="text"
                                name="kode"
                                value={formData.kode}
                                onChange={handleChange}
                                placeholder="DISKON10"
                                style={{ textTransform: 'uppercase' }}
                                required
                            />
                            <span className="form-hint">Kode yang dimasukkan pelanggan saat checkout</span>
                        </div>

                        <div className="form-group">
                            <label>Deskripsi</label>
                            <textarea
                                name="deskripsi"
                                value={formData.deskripsi}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Deskripsi promo..."
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Tipe Diskon *</label>
                                <select
                                    name="tipe"
                                    value={formData.tipe}
                                    onChange={handleChange}
                                >
                                    <option value="percentage">Persentase (%)</option>
                                    <option value="fixed">Nominal Tetap (Rp)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Nilai Diskon *</label>
                                <div className="input-with-addon">
                                    <input
                                        type="number"
                                        name="diskon"
                                        value={formData.diskon}
                                        onChange={handleChange}
                                        min={0}
                                        max={formData.tipe === 'percentage' ? 100 : undefined}
                                        required
                                    />
                                    <span className="addon">
                                        {formData.tipe === 'percentage' ? '%' : 'Rp'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Limits */}
                    <div className="form-card">
                        <h3><Percent size={20} /> Batasan</h3>

                        <div className="form-group">
                            <label>Minimal Pembelian</label>
                            <div className="input-with-addon">
                                <span className="addon left">Rp</span>
                                    <input
                                        type="number"
                                        name="min_beli"
                                        value={formData.min_beli || ''}
                                    onChange={handleChange}
                                    min={0}
                                    placeholder="0"
                                />
                            </div>
                            <span className="form-hint">Minimal total belanja untuk menggunakan promo</span>
                        </div>

                        {formData.tipe === 'percentage' && (
                            <div className="form-group">
                                <label>Maksimal Diskon</label>
                                <div className="input-with-addon">
                                    <span className="addon left">Rp</span>
                                    <input
                                        type="number"
                                        name="maks_diskon"
                                        value={formData.maks_diskon || ''}
                                        onChange={handleChange}
                                        min={0}
                                        placeholder="Tidak terbatas"
                                    />
                                </div>
                                <span className="form-hint">Batas maksimal potongan harga</span>
                            </div>
                        )}

                        <div className="form-group">
                            <label>Batas Penggunaan</label>
                            <input
                                type="number"
                                name="batas_penggunaan"
                                value={formData.batas_penggunaan || ''}
                                onChange={handleChange}
                                min={1}
                                placeholder="Tidak terbatas"
                            />
                            <span className="form-hint">Berapa kali promo bisa digunakan</span>
                        </div>
                    </div>

                    {/* Schedule */}
                    <div className="form-card">
                        <h3><Calendar size={20} /> Jadwal</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Tanggal Mulai</label>
                                <input
                                    type="date"
                                    name="tanggal_mulai"
                                    value={formData.tanggal_mulai}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Tanggal Berakhir</label>
                                <input
                                    type="date"
                                    name="tanggal_berakhir"
                                    value={formData.tanggal_berakhir}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <span className="form-hint">Kosongkan jika promo berlaku tanpa batas waktu</span>
                    </div>

                    {/* Status */}
                    <div className="form-card">
                        <h3>Status</h3>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="aktif"
                                checked={formData.aktif}
                                onChange={handleChange}
                            />
                            <span className="checkmark"></span>
                            Promo Aktif
                        </label>
                        <p className="form-hint">Promo dapat digunakan oleh pelanggan</p>
                    </div>
                </div>
            </form>
        </div>
    );
}
