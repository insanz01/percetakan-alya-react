import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAuthStore, useUIStore } from '../../store';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const { login, isLoading } = useAuthStore();
    const { addToast } = useUIStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const validateForm = (): boolean => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email) {
            newErrors.email = 'Email wajib diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (!password) {
            newErrors.password = 'Password wajib diisi';
        } else if (password.length < 6) {
            newErrors.password = 'Password minimal 6 karakter';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const success = await login(email, password);

        if (success) {
            addToast({
                type: 'success',
                title: 'Login berhasil',
                message: 'Selamat datang kembali!',
            });
            navigate('/');
        } else {
            addToast({
                type: 'error',
                title: 'Login gagal',
                message: 'Email atau password salah',
            });
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    {/* Logo */}
                    <Link to="/" className="auth-logo">
                        <span className="logo-icon">🖨️</span>
                        <span className="logo-text">
                            Print<span className="logo-accent">Master</span>
                        </span>
                    </Link>

                    <h1>Masuk ke Akun</h1>
                    <p className="auth-subtitle">Selamat datang kembali! Silakan masuk ke akun Anda.</p>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {/* Email */}
                        <div className="form-group">
                            <label className="label" htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    className={`input input-with-icon ${errors.email ? 'input-error' : ''}`}
                                    placeholder="nama@email.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors({ ...errors, email: undefined });
                                    }}
                                />
                            </div>
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label className="label" htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className={`input input-with-icon ${errors.password ? 'input-error' : ''}`}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors({ ...errors, password: undefined });
                                    }}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        {/* Forgot Password */}
                        <div className="form-options">
                            <Link to="/lupa-password" className="forgot-password">
                                Lupa password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    Masuk
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="social-divider">
                        <span>atau masuk dengan</span>
                    </div>

                    <div className="social-buttons">
                        <button type="button" className="btn btn-outline social-btn">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                    </div>

                    {/* Register Link */}
                    <p className="auth-footer">
                        Belum punya akun? <Link to="/register">Daftar sekarang</Link>
                    </p>
                </div>

                {/* Decorative Side */}
                <div className="auth-decoration">
                    <div className="decoration-content">
                        <h2>Platform Percetakan Online Terpercaya</h2>
                        <p>Cetak berbagai kebutuhan bisnis dan personal dengan kualitas premium dan harga transparan.</p>

                        <div className="decoration-features">
                            <div className="feature-item">
                                <span className="feature-icon">✨</span>
                                <span>Kualitas Cetak Premium</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">💰</span>
                                <span>Harga Transparan</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🚚</span>
                                <span>Pengiriman Cepat</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🛡️</span>
                                <span>Garansi Kepuasan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
