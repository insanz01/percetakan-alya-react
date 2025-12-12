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
        code: 'BROSUR20',
        discount: 20,
        type: 'percentage',
        description: 'Diskon 20% untuk semua produk brosur',
        min_purchase: 100000,
        max_discount: 50000,
        usage_limit: 100,
        usage_count: 45,
        start_date: '2024-12-01',
        end_date: '2024-12-31',
        is_active: true,
        created_at: '2024-12-01',
        updated_at: '2024-12-01',
    },
    {
        id: '2',
        code: 'KARTUNAMA15',
        discount: 15,
        type: 'percentage',
        description: 'Diskon 15% untuk kartu nama premium',
        min_purchase: 50000,
        max_discount: 25000,
        usage_limit: 50,
        usage_count: 23,
        start_date: '2024-12-01',
        end_date: '2024-12-15',
        is_active: true,
        created_at: '2024-12-01',
        updated_at: '2024-12-01',
    },
    {
        id: '3',
        code: 'FREESHIP',
        discount: 15000,
        type: 'fixed',
        description: 'Gratis ongkir untuk pembelian min Rp 200.000',
        min_purchase: 200000,
        max_discount: 15000,
        usage_limit: 200,
        usage_count: 156,
        start_date: '2024-11-01',
        end_date: '2024-12-31',
        is_active: true,
        created_at: '2024-11-01',
        updated_at: '2024-11-01',
    },
];

export default function Promos() {
    const { data: apiPromos, isLoading } = usePromos();

    const promos = useMemo(() => {
        return apiPromos || fallbackPromos;
    }, [apiPromos]);

    const activeCount = promos.filter(p => p.is_active).length;

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
                                {promo.type === 'percentage' ? <Percent size={14} /> : null}
                                {promo.type === 'percentage' ? 'Persentase' : 'Fixed'}
                            </span>
                            <span className={`promo-status ${promo.is_active ? 'active' : 'inactive'}`}>
                                {promo.is_active ? 'Aktif' : 'Nonaktif'}
                            </span>
                        </div>

                        <div className="promo-code-display">
                            <Tag size={20} />
                            <span className="promo-code">{promo.code}</span>
                        </div>

                        <div className="promo-discount">
                            {promo.type === 'percentage'
                                ? `${promo.discount}% OFF`
                                : formatPrice(promo.discount)
                            }
                        </div>

                        <p className="promo-description">{promo.description}</p>

                        <div className="promo-details">
                            <div className="promo-detail-item">
                                <Calendar size={14} />
                                <span>{promo.start_date || '-'} - {promo.end_date || '-'}</span>
                            </div>
                            <div className="promo-detail-item">
                                <Clock size={14} />
                                <span>Digunakan: {promo.usage_count}/{promo.usage_limit || '∞'}</span>
                            </div>
                        </div>

                        {promo.usage_limit && (
                            <div className="promo-usage-bar">
                                <div
                                    className="promo-usage-fill"
                                    style={{ width: `${(promo.usage_count / promo.usage_limit) * 100}%` }}
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
