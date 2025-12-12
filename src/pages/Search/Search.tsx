import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X, Loader2, Package, ChevronRight } from 'lucide-react';
import { useProductSearch } from '../../hooks';
import { formatPrice } from '../../lib/utils';
import './Search.css';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const { results, isLoading, error } = useProductSearch(query);

    useEffect(() => {
        if (query) {
            setSearchParams({ q: query });
        } else {
            setSearchParams({});
        }
    }, [query, setSearchParams]);

    const handleClear = () => {
        setQuery('');
    };

    return (
        <div className="search-page">
            <div className="container">
                {/* Search Header */}
                <div className="search-header">
                    <h1>Pencarian Produk</h1>
                    <div className="search-box-large">
                        <SearchIcon size={24} />
                        <input
                            type="text"
                            placeholder="Cari produk yang Anda inginkan..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        {query && (
                            <button className="clear-btn" onClick={handleClear}>
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Search Results */}
                <div className="search-results">
                    {isLoading ? (
                        <div className="loading-state">
                            <Loader2 className="spinner" size={48} />
                            <p>Mencari produk...</p>
                        </div>
                    ) : error ? (
                        <div className="error-state">
                            <p>{error}</p>
                        </div>
                    ) : query.length < 2 ? (
                        <div className="hint-state">
                            <SearchIcon size={64} />
                            <h3>Mulai Mencari</h3>
                            <p>Ketik minimal 2 karakter untuk mencari produk</p>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="empty-state">
                            <Package size={64} />
                            <h3>Tidak Ada Hasil</h3>
                            <p>Tidak ditemukan produk untuk "{query}"</p>
                            <div className="suggestions">
                                <h4>Saran:</h4>
                                <ul>
                                    <li>Coba kata kunci yang berbeda</li>
                                    <li>Coba kata kunci yang lebih umum</li>
                                    <li>Periksa ejaan kata kunci</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="results-header">
                                <p>Ditemukan <strong>{results.length}</strong> produk untuk "{query}"</p>
                            </div>

                            <div className="products-grid">
                                {results.map(product => (
                                    <Link
                                        key={product.id}
                                        to={`/produk/${product.slug}`}
                                        className="product-card"
                                    >
                                        <div className="product-image">
                                            <img
                                                src={product.images?.[0] || 'https://via.placeholder.com/300'}
                                                alt={product.name}
                                            />
                                            {product.isPromo && product.promoPercentage && (
                                                <div className="promo-badge">
                                                    -{product.promoPercentage}%
                                                </div>
                                            )}
                                        </div>
                                        <div className="product-content">
                                            <h3 className="product-name">{product.name}</h3>
                                            <p className="product-category">{product.shortDescription}</p>
                                            <div className="product-price">
                                                <span className="price">
                                                    {formatPrice(product.basePrice)}
                                                </span>
                                                <span className="unit">/lembar</span>
                                            </div>
                                            <div className="product-footer">
                                                <span className="view-detail">
                                                    Lihat Detail
                                                    <ChevronRight size={16} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
