import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Toast from './components/Toast';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Promo from './pages/Promo';
import Checkout from './pages/Checkout';
import Search from './pages/Search';
import FAQ from './pages/FAQ';
import BestSeller from './pages/BestSeller';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Account from './pages/Account';
import OrderHistory from './pages/Account/OrderHistory';
import AddressList from './pages/Account/AddressList';
import UserOrderDetail from './pages/Account/UserOrderDetail';
import AccountSettings from './pages/Account/AccountSettings';

// Admin imports
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import Dashboard from './admin/pages/Dashboard';
import Products from './admin/pages/Products';
import ProductForm from './admin/pages/Products/ProductForm';
import Categories from './admin/pages/Categories';
import CategoryForm from './admin/pages/Categories/CategoryForm';
import Orders from './admin/pages/Orders';
import OrderDetail from './admin/pages/Orders/OrderDetail';
import Customers from './admin/pages/Customers';
import Promos from './admin/pages/Promos';
import PromoForm from './admin/pages/Promos/PromoForm';
import Settings from './admin/pages/Settings';

function App() {
    return (
        <Router>
            <Routes>
                {/* Auth routes (no layout) */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/new" element={<ProductForm />} />
                    <Route path="products/:id/edit" element={<ProductForm />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="categories/new" element={<CategoryForm />} />
                    <Route path="categories/:id/edit" element={<CategoryForm />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="orders/:id" element={<OrderDetail />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="promos" element={<Promos />} />
                    <Route path="promos/new" element={<PromoForm />} />
                    <Route path="promos/:id/edit" element={<PromoForm />} />
                    <Route path="settings" element={<Settings />} />
                </Route>

                {/* Main routes with layout */}
                <Route path="*" element={
                    <Layout>
                        <Routes>
                            {/* Home */}
                            <Route path="/" element={<Home />} />

                            {/* Categories */}
                            <Route path="/kategori" element={<Category />} />
                            <Route path="/kategori/:slug" element={<Category />} />

                            {/* Product */}
                            <Route path="/produk/:slug" element={<ProductDetail />} />

                            {/* Cart & Checkout */}
                            <Route path="/keranjang" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />

                            {/* Search */}
                            <Route path="/cari" element={<Search />} />

                            {/* Static Pages */}
                            <Route path="/promo" element={<Promo />} />
                            <Route path="/best-seller" element={<BestSeller />} />
                            <Route path="/tentang" element={<About />} />
                            <Route path="/kontak" element={<Contact />} />
                            <Route path="/faq" element={<FAQ />} />

                            {/* User Account */}
                            <Route path="/akun" element={<Account />} />
                            <Route path="/akun/pesanan" element={<OrderHistory />} />
                            <Route path="/akun/pesanan/:id" element={<UserOrderDetail />} />
                            <Route path="/akun/alamat" element={<AddressList />} />
                            <Route path="/akun/pengaturan" element={<AccountSettings />} />

                            {/* Legal */}
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />

                            {/* 404 */}
                            <Route path="*" element={
                                <div className="container py-16">
                                    <div style={{
                                        textAlign: 'center',
                                        padding: 'var(--spacing-16)',
                                        background: 'var(--bg-primary)',
                                        borderRadius: 'var(--radius-xl)'
                                    }}>
                                        <h1 style={{ fontSize: 'var(--font-size-5xl)', marginBottom: 'var(--spacing-4)' }}>404</h1>
                                        <h2 style={{ marginBottom: 'var(--spacing-4)' }}>Halaman Tidak Ditemukan</h2>
                                        <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-8)' }}>
                                            Halaman yang Anda cari tidak tersedia.
                                        </p>
                                        <a href="/" className="btn btn-primary">
                                            Kembali ke Beranda
                                        </a>
                                    </div>
                                </div>
                            } />
                        </Routes>
                    </Layout>
                } />
            </Routes>

            {/* Global Toast */}
            <Toast />
        </Router>
    );
}

export default App;
