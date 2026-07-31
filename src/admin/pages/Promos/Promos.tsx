import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Tag, Calendar, Percent, Clock, Loader2 } from 'lucide-react';
import { usePromos } from '../../../hooks';
import { formatPrice } from '../../../lib/utils';
import type { Promo } from '../../../lib/promoService';
import './Promos.css';

// Fallback dummy promos
const fallbackPromos: Promo[] = [
    {
        id: '1',
        kode: 'BROSUR20',
        tipe: 'percentage',
        diskon: 20,
        deskripsi: 'Diskon 20% untuk semua produk brosur',
        min_beli: 100000,
        maks_diskon: 50000,
        batas_penggunaan: 100,
        jumlah_penggunaan: 45,
        tanggal_mulai: '2024-12-01',
        tanggal_berakhir: '2024-12-31',
        aktif: true,
        created_at: '2024-12-01',
        updated_at: '2024-12-01',
    },
    {
        id: '2',
        kode: 'KARTUNAMA15',
        tipe: 'percentage',
        diskon: 15,
        deskripsi: 'Diskon 15% untuk kartu nama premium',
        min_beli: 50000,
        maks_diskon: 25000,
        batas_penggunaan: 50,
        jumlah_penggunaan: 23,
        tanggal_mulai: '2024-12-01',
        tanggal_berakhir: '2024-12-15',
        aktif: true,
        created_at: '2024-12-01',
        updated_at: '2024-12-01',
    },
    {
        id: '3',
        kode: 'FREESHIP',
        tipe: 'fixed',
        diskon: 15000,
        deskripsi: 'Gratis ongkir untuk pembelian min Rp 200.000',
        min_beli: 200000,
        maks_diskon: 15000,
        batas_penggunaan: 200,
        jumlah_penggunaan: 156,
        tanggal_mulai: '2024-11-01',
        tanggal_berakhir: '2024-12-31',
        aktif: true,
        created_at: '2024-11-01',
        updated_at: '2024-11-01',
    },
];

export default function Promos() {
    const { data: apiPromos, isLoading } = usePromos();

    const promos = useMemo(() => {
        return apiPromos || fallbackPromos;
    }, [apiPromos]);

    const activeCount = promos.filter(p => p.aktif).length;

    if (isLoading) {
        return (
            <div className="admin-promos">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat promo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-promos">
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <h2>Manajemen Promo</h2>
                    <p>{activeCount} promo aktif</p>
                </div>
                <Link to="/admin/promos/new" className="btn btn-primary">
                    <Plus size={20} />
                    Buat Promo Baru
                </Link>
            </div>

            {/* Promos Grid */}
            <div className="promos-grid">
                {promos.map((promo) => (
                    <div key={promo.id} className="promo-card">
                        <div className="promo-card-header">
                            <span className="promo-type-badge">
                                {promo.tipe === 'percentage' ? <Percent size={14} /> : null}
                                {promo.tipe === 'percentage' ? 'Persentase' : 'Fixed'}
                            </span>
                            <span className={`promo-status ${promo.aktif ? 'active' : 'inactive'}`}>
                                {promo.aktif ? 'Aktif' : 'Nonaktif'}
                            </span>
                        </div>

                        <div className="promo-code-display">
                            <Tag size={20} />
                            <span className="promo-code">{promo.kode}</span>
                        </div>

                        <div className="promo-discount">
                            {promo.tipe === 'percentage'
                                ? `${promo.diskon}% OFF`
                                : formatPrice(promo.diskon)
                            }
                        </div>

                        <p className="promo-description">{promo.deskripsi}</p>

                        <div className="promo-details">
                            <div className="promo-detail-item">
                                <Calendar size={14} />
                                <span>{promo.tanggal_mulai || '-'} - {promo.tanggal_berakhir || '-'}</span>
                            </div>
                            <div className="promo-detail-item">
                                <Clock size={14} />
                                <span>Digunakan: {promo.jumlah_penggunaan}/{promo.batas_penggunaan || '∞'}</span>
                            </div>
                        </div>

                        {promo.batas_penggunaan && (
                            <div className="promo-usage-bar">
                                <div
                                    className="promo-usage-fill"
                                    style={{ width: `${(promo.jumlah_penggunaan / promo.batas_penggunaan) * 100}%` }}
                                />
                            </div>
                        )}

                        <div className="promo-card-actions">
                            <button className="action-btn edit">
                                <Edit2 size={16} />
                                Edit
                            </button>
                            <button className="action-btn delete">
                                <Trash2 size={16} />
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
