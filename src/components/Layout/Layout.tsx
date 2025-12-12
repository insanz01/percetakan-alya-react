import { Link, useLocation } from 'react-router-dom';
import {
    Search,
    ShoppingCart,
    User,
    Menu,
    X,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    ChevronDown,
    Home,
    Grid3X3,
    FileText
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore, useUIStore, useAuthStore } from '../../store';
import { useCategories } from '../../hooks';
import { formatPrice } from '../../lib/utils';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

    const { items, getTotalItems, getTotalPrice, removeItem } = useCartStore();
    const {
        isMobileMenuOpen,
        setMobileMenuOpen,
        isCartOpen,
        setCartOpen
    } = useUIStore();
    const { isAuthenticated, user } = useAuthStore();
    const { data: categories } = useCategories({ active: true });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setCartOpen(false);
    }, [location, setMobileMenuOpen, setCartOpen]);

    return (
        <div className="layout">
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container">
                    <div className="top-bar-content">
                        <div className="top-bar-left">
                            <a href="tel:+6281234567890" className="top-bar-link">
                                <Phone size={14} />
                                <span>0812-3456-7890</span>
                            </a>
                            <a href="mailto:info@printmaster.id" className="top-bar-link">
                                <Mail size={14} />
                                <span>info@printmaster.id</span>
                            </a>
                        </div>
                        <div className="top-bar-right">
                            <a href="#location" className="top-bar-link">
                                <MapPin size={14} />
                                <span>Lokasi Kami</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
                <div className="container">
                    <div className="header-content">
                        {/* Logo */}
                        <Link to="/" className="logo">
                            <span className="logo-icon">🖨️</span>
                            <span className="logo-text">
                                Print<span className="logo-accent">Master</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="nav-desktop">
                            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                                Beranda
                            </Link>

                            <div
                                className="nav-dropdown"
                                onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                                onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                            >
                                <button className="nav-link nav-dropdown-trigger">
                                    Kategori
                                    <ChevronDown size={16} className={`chevron ${isCategoryDropdownOpen ? 'rotate' : ''}`} />
                                </button>

                                {isCategoryDropdownOpen && (
                                    <div className="nav-dropdown-menu animate-slideDown">
                                        <div className="nav-dropdown-menu-content">
                                            <div className="nav-dropdown-grid">
                                                {(categories || []).map((category) => (
                                                    <Link
                                                        key={category.id}
                                                        to={`/kategori/${category.slug}`}
                                                        className="nav-dropdown-item"
                                                    >
                                                        <span className="nav-dropdown-icon">{category.icon}</span>
                                                        <div className="nav-dropdown-info">
                                                            <span className="nav-dropdown-name">{category.name}</span>
                                                            <span className="nav-dropdown-count">{category.productCount} produk</span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link to="/promo" className={`nav-link ${location.pathname === '/promo' ? 'active' : ''}`}>
                                Promo
                            </Link>

                            <Link to="/tentang" className={`nav-link ${location.pathname === '/tentang' ? 'active' : ''}`}>
                                Tentang Kami
                            </Link>

                            <Link to="/kontak" className={`nav-link ${location.pathname === '/kontak' ? 'active' : ''}`}>
                                Kontak
                            </Link>
                        </nav>

                        {/* Header Actions */}
                        <div className="header-actions">
                            <Link to="/cari" className="header-action-btn" title="Cari Produk">
                                <Search size={20} />
                            </Link>

                            <button
                                className="header-action-btn cart-btn"
                                onClick={() => setCartOpen(!isCartOpen)}
                                title="Keranjang"
                            >
                                <ShoppingCart size={20} />
                                {getTotalItems() > 0 && (
                                    <span className="cart-badge">{getTotalItems()}</span>
                                )}
                            </button>

                            {isAuthenticated ? (
                                <Link to="/akun" className="header-action-btn user-btn" title="Akun Saya">
                                    <User size={20} />
                                    <span className="user-name">{user?.name}</span>
                                </Link>
                            ) : (
                                <Link to="/login" className="btn btn-primary btn-sm">
                                    Masuk
                                </Link>
                            )}

                            <button
                                className="mobile-menu-btn"
                                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Menu"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cart Dropdown */}
                {isCartOpen && (
                    <>
                        <div className="cart-overlay" onClick={() => setCartOpen(false)} />
                        <div className="cart-dropdown animate-slideDown">
                            <div className="cart-dropdown-header">
                                <h3>Keranjang Belanja</h3>
                                <button onClick={() => setCartOpen(false)} className="cart-close">
                                    <X size={20} />
                                </button>
                            </div>

                            {items.length === 0 ? (
                                <div className="cart-empty">
                                    <ShoppingCart size={48} />
                                    <p>Keranjang masih kosong</p>
                                    <Link to="/" className="btn btn-primary" onClick={() => setCartOpen(false)}>
                                        Mulai Belanja
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="cart-items">
                                        {items.slice(0, 3).map((item) => (
                                            <div key={item.id} className="cart-item">
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    className="cart-item-image"
                                                />
                                                <div className="cart-item-info">
                                                    <h4>{item.product.name}</h4>
                                                    <p className="cart-item-qty">Qty: {item.config.quantity}</p>
                                                    <p className="cart-item-price">{formatPrice(item.totalPrice)}</p>
                                                </div>
                                                <button
                                                    className="cart-item-remove"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                        {items.length > 3 && (
                                            <p className="cart-more">+{items.length - 3} item lainnya</p>
                                        )}
                                    </div>
                                    <div className="cart-dropdown-footer">
                                        <div className="cart-total">
                                            <span>Total:</span>
                                            <span className="cart-total-price">{formatPrice(getTotalPrice())}</span>
                                        </div>
                                        <div className="cart-actions">
                                            <Link
                                                to="/keranjang"
                                                className="btn btn-outline w-full"
                                                onClick={() => setCartOpen(false)}
                                            >
                                                Lihat Keranjang
                                            </Link>
                                            <Link
                                                to="/checkout"
                                                className="btn btn-primary w-full"
                                                onClick={() => setCartOpen(false)}
                                            >
                                                Checkout
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <>
                    <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
                    <nav className="mobile-menu animate-slideDown">
                        <div className="mobile-menu-header">
                            <span className="logo-text">
                                Print<span className="logo-accent">Master</span>
                            </span>
                        </div>

                        <div className="mobile-menu-content">
                            <Link to="/" className="mobile-nav-link">
                                <Home size={20} />
                                Beranda
                            </Link>

                            <div className="mobile-nav-section">
                                <p className="mobile-nav-section-title">Kategori</p>
                                {(categories || []).map((category) => (
                                    <Link
                                        key={category.id}
                                        to={`/kategori/${category.slug}`}
                                        className="mobile-nav-link mobile-nav-category"
                                    >
                                        <span>{category.icon}</span>
                                        {category.name}
                                    </Link>
                                ))}
                            </div>

                            <Link to="/promo" className="mobile-nav-link">
                                Promo
                            </Link>

                            <Link to="/tentang" className="mobile-nav-link">
                                <FileText size={20} />
                                Tentang Kami
                            </Link>

                            <Link to="/kontak" className="mobile-nav-link">
                                <Phone size={20} />
                                Kontak
                            </Link>

                            {isAuthenticated ? (
                                <Link to="/akun" className="mobile-nav-link">
                                    <User size={20} />
                                    Akun Saya
                                </Link>
                            ) : (
                                <div className="mobile-menu-auth">
                                    <Link to="/login" className="btn btn-primary w-full">
                                        Masuk
                                    </Link>
                                    <Link to="/register" className="btn btn-outline w-full">
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </>
            )}

            {/* Main Content */}
            <main className="main-content">
                {children}
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        {/* About */}
                        <div className="footer-section">
                            <Link to="/" className="footer-logo">
                                <span className="logo-icon">🖨️</span>
                                <span className="logo-text">
                                    Print<span className="logo-accent">Master</span>
                                </span>
                            </Link>
                            <p className="footer-about">
                                Platform percetakan online terpercaya dengan kualitas premium dan harga transparan.
                                Melayani kebutuhan cetak individu hingga corporate.
                            </p>
                            <div className="footer-social">
                                <a href="#" className="social-link" aria-label="Facebook">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="social-link" aria-label="Instagram">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="social-link" aria-label="Twitter">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-section">
                            <h4 className="footer-title">Menu Cepat</h4>
                            <ul className="footer-links">
                                <li><Link to="/">Beranda</Link></li>
                                <li><Link to="/promo">Promo</Link></li>
                                <li><Link to="/tentang">Tentang Kami</Link></li>
                                <li><Link to="/kontak">Hubungi Kami</Link></li>
                                <li><Link to="/faq">FAQ</Link></li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div className="footer-section">
                            <h4 className="footer-title">Kategori Produk</h4>
                            <ul className="footer-links">
                                {(categories || []).slice(0, 6).map((category) => (
                                    <li key={category.id}>
                                        <Link to={`/kategori/${category.slug}`}>{category.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="footer-section">
                            <h4 className="footer-title">Hubungi Kami</h4>
                            <ul className="footer-contact">
                                <li>
                                    <MapPin size={16} />
                                    <span>Jl. Percetakan No. 123, Jakarta Selatan</span>
                                </li>
                                <li>
                                    <Phone size={16} />
                                    <span>0812-3456-7890</span>
                                </li>
                                <li>
                                    <Mail size={16} />
                                    <span>info@printmaster.id</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} PrintMaster. All rights reserved.</p>
                        <div className="footer-bottom-links">
                            <Link to="/privacy">Kebijakan Privasi</Link>
                            <Link to="/terms">Syarat & Ketentuan</Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Mobile Bottom Navigation */}
            <nav className="mobile-bottom-nav">
                <Link to="/" className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                    <Home size={20} />
                    <span>Beranda</span>
                </Link>
                <Link to="/kategori" className={`bottom-nav-item ${location.pathname.startsWith('/kategori') ? 'active' : ''}`}>
                    <Grid3X3 size={20} />
                    <span>Kategori</span>
                </Link>
                <Link to="/keranjang" className={`bottom-nav-item ${location.pathname === '/keranjang' ? 'active' : ''}`}>
                    <div className="bottom-nav-cart">
                        <ShoppingCart size={20} />
                        {getTotalItems() > 0 && (
                            <span className="bottom-nav-badge">{getTotalItems()}</span>
                        )}
                    </div>
                    <span>Keranjang</span>
                </Link>
                <Link to="/akun" className={`bottom-nav-item ${location.pathname === '/akun' ? 'active' : ''}`}>
                    <User size={20} />
                    <span>Akun</span>
                </Link>
            </nav>
        </div>
    );
}
