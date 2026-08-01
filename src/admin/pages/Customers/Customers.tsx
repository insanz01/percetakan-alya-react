import { useState, useMemo } from 'react';
import { Search, Mail, Phone, Loader2 } from 'lucide-react';
import { useCustomers } from '../../../hooks';
import { formatDate } from '../../../lib/utils';
import './Customers.css';

export default function Customers() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: apiCustomers, isLoading } = useCustomers();

    const customers = useMemo(() => {
        const customerList = apiCustomers || [];

        if (searchQuery) {
            return customerList.filter(c =>
                c.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                                                {customer.nama.charAt(0)}
                                            </div>
                                            <span className="customer-name">{customer.nama}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="contact-cell">
                                            <span><Mail size={12} /> {customer.email}</span>
                                            {customer.telepon && <span><Phone size={12} /> {customer.telepon}</span>}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="orders-count">{customer.orders_count || 0} pesanan</span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${customer.aktif ? 'green' : 'red'}`}>
                                            {customer.aktif ? 'Aktif' : 'Tidak Aktif'}
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
