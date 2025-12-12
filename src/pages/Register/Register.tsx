import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, ChevronRight, Loader2, CheckCircle } from 'lucide-react';
import { authService } from '../../lib/authService';
import { useUIStore } from '../../store';
import './Register.css';

interface FormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
}

export default function Register() {
    const navigate = useNavigate();
    const { addToast } = useUIStore();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nama lengkap wajib diisi';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'Nama minimal 3 karakter';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email wajib diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (formData.phone && !/^[0-9+\-\s]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Format nomor telepon tidak valid';
        }

        if (!formData.password) {
            newErrors.password = 'Password wajib diisi';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password minimal 6 karakter';
        }

        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password wajib diisi';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Password tidak cocok';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.register(formData);
            if (response.success) {
                addToast({
                    type: 'success',
                    title: 'Registrasi Berhasil!',
                    message: 'Selamat datang di PrintMaster',
                });
                navigate('/');
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Registrasi Gagal',
                message: error instanceof Error ? error.message : 'Terjadi kesalahan, silakan coba lagi',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const passwordStrength = (): { level: number; text: string; color: string } => {
        const password = formData.password;
        if (!password) return { level: 0, text: '', color: 'var(--text-muted)' };

        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        if (score <= 2) return { level: 1, text: 'Lemah', color: 'var(--color-error)' };
        if (score <= 3) return { level: 2, text: 'Sedang', color: 'var(--color-warning)' };
        return { level: 3, text: 'Kuat', color: 'var(--color-success)' };
    };

    const strength = passwordStrength();

    return (
        <div className="register-page">
            <div className="register-container">
                {/* Left side - Branding */}
                <div className="register-branding">
                    <div className="branding-content">
                        <Link to="/" className="logo">
                            <span className="logo-icon">🖨️</span>
                            <span className="logo-text">PrintMaster</span>
                        </Link>
                        <h1>Bergabung dengan PrintMaster</h1>
                        <p>Nikmati kemudahan mencetak dengan kualitas terbaik dan harga terjangkau.</p>

                        <div className="benefits-list">
                            <div className="benefit-item">
                                <CheckCircle size={20} />
                                <span>Ribuan produk cetak berkualitas</span>
                            </div>
                            <div className="benefit-item">
                                <CheckCircle size={20} />
                                <span>Pengiriman ke seluruh Indonesia</span>
                            </div>
                            <div className="benefit-item">
                                <CheckCircle size={20} />
                                <span>Harga transparan tanpa biaya tersembunyi</span>
                            </div>
                            <div className="benefit-item">
                                <CheckCircle size={20} />
                                <span>Dukungan pelanggan 24/7</span>
                            </div>
                        </div>
                    </div>

                    <div className="branding-decoration">
                        <div className="circle circle-1"></div>
                        <div className="circle circle-2"></div>
                        <div className="circle circle-3"></div>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="register-form-section">
                    <div className="form-header">
                        <h2>Buat Akun Baru</h2>
                        <p>Sudah punya akun? <Link to="/login">Masuk di sini</Link></p>
                    </div>

                    <form onSubmit={handleSubmit} className="register-form">
                        {/* Name Field */}
                        <div className={`form-group ${errors.name ? 'error' : ''}`}>
                            <label htmlFor="name">Nama Lengkap</label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={18} />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Masukkan nama lengkap"
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        {/* Email Field */}
                        <div className={`form-group ${errors.email ? 'error' : ''}`}>
                            <label htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={18} />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="nama@email.com"
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        {/* Phone Field */}
                        <div className={`form-group ${errors.phone ? 'error' : ''}`}>
                            <label htmlFor="phone">Nomor Telepon <span className="optional">(opsional)</span></label>
                            <div className="input-wrapper">
                                <Phone className="input-icon" size={18} />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="081234567890"
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>

                        {/* Password Field */}
                        <div className={`form-group ${errors.password ? 'error' : ''}`}>
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Minimal 6 karakter"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {formData.password && (
                                <div className="password-strength">
                                    <div className="strength-bars">
                                        <div className={`bar ${strength.level >= 1 ? 'active' : ''}`} style={{ backgroundColor: strength.level >= 1 ? strength.color : undefined }}></div>
                                        <div className={`bar ${strength.level >= 2 ? 'active' : ''}`} style={{ backgroundColor: strength.level >= 2 ? strength.color : undefined }}></div>
                                        <div className={`bar ${strength.level >= 3 ? 'active' : ''}`} style={{ backgroundColor: strength.level >= 3 ? strength.color : undefined }}></div>
                                    </div>
                                    <span style={{ color: strength.color }}>{strength.text}</span>
                                </div>
                            )}
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        {/* Confirm Password Field */}
                        <div className={`form-group ${errors.password_confirmation ? 'error' : ''}`}>
                            <label htmlFor="password_confirmation">Konfirmasi Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="Ulangi password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password_confirmation && <span className="error-message">{errors.password_confirmation}</span>}
                        </div>

                        {/* Terms */}
                        <p className="terms-text">
                            Dengan mendaftar, Anda menyetujui <Link to="/terms">Syarat & Ketentuan</Link> dan <Link to="/privacy">Kebijakan Privasi</Link> kami.
                        </p>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="spinner" size={20} />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    Daftar Sekarang
                                    <ChevronRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="form-footer">
                        <Link to="/" className="back-link">
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
