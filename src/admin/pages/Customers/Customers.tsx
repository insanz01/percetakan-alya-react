import { useState, useMemo } from 'react';
import { Search, Mail, Phone, Loader2 } from 'lucide-react';
import { useCustomers } from '../../../hooks';
import { formatDate } from '../../../lib/utils';
import './Customers.css';

// Fallback dummy customers
const fallbackCustomers = [
    { id: '1', name: 'Budi Santoso', email: 'budi@email.com', phone: '081234567890', orders: 12, totalSpent: 4500000, joinDate: '2024-01-15' },
    { id: '2', name: 'Siti Rahma', email: 'siti@email.com', phone: '081234567891', orders: 8, totalSpent: 2200000, joinDate: '2024-02-20' },
    { id: '3', name: 'Ahmad Wijaya', email: 'ahmad@email.com', phone: '081234567892', orders: 5, totalSpent: 1500000, joinDate: '2024-03-10' },
    { id: '4', name: 'Maya Putri', email: 'maya@email.com', phone: '081234567893', orders: 15, totalSpent: 6800000, joinDate: '2024-01-05' },
    { id: '5', name: 'Rudi Hartono', email: 'rudi@email.com', phone: '081234567894', orders: 3, totalSpent: 750000, joinDate: '2024-04-12' },
];

export default function Customers() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: apiCustomers, isLoading } = useCustomers();

    // Use API data or fallback
    const customers = useMemo(() => {
        const customerList = apiCustomers || fallbackCustomers.map(c => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone,
            role: 'customer' as const,
            is_active: true,
            created_at: c.joinDate,
            orders: [],
            addresses: [],
        }));

        // Filter by search
        if (searchQuery) {
            return customerList.filter(c =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return customerList;
    }, [apiCustomers, searchQuery]);

    if (isLoading) {
        return (
            <div className="admin-customers">
                <div className="loading-state">
                    <Loader2 size={48} className="animate-spin" />
                    <p>Memuat pelanggan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-customers">
            {/* Header */}
            <div className="page-header">
                <div className="page-header-left">
                    <h2>Manajemen Pelanggan</h2>
                    <p>{customers.length} pelanggan terdaftar</p>
                </div>
            </div>

            {/* Search */}
            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Cari nama atau email pelanggan..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Customers Table */}
            <div className="customers-table-card">
                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Pelanggan</th>
                                <th>Kontak</th>
                                <th>Total Pesanan</th>
                                <th>Status</th>
                                <th>Bergabung</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>
                                        <div className="customer-cell">
                                            <div className="customer-avatar">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <span className="customer-name">{customer.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="contact-cell">
                                            <span><Mail size={12} /> {customer.email}</span>
                                            {customer.phone && <span><Phone size={12} /> {customer.phone}</span>}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="orders-count">{customer.orders?.length || 0} pesanan</span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${customer.is_active ? 'green' : 'red'}`}>
                                            {customer.is_active ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="join-date">
                                            {customer.created_at ? formatDate(customer.created_at) : '-'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
