import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, Printer, KeyRound } from 'lucide-react';
import { authService, ApiError } from '../../lib';
import { useUIStore } from '../../store';
import '../Login/Login.css';

interface FormErrors {
    email?: string;
    password?: string;
    password_confirmation?: string;
}

export default function ResetPassword() {
    const navigate = useNavigate();
    const { addToast } = useUIStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!email) {
            newErrors.email = 'Email wajib diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (!password) {
            newErrors.password = 'Password baru wajib diisi';
        } else if (password.length < 6) {
            newErrors.password = 'Password minimal 6 karakter';
        }

        if (!passwordConfirmation) {
            newErrors.password_confirmation = 'Konfirmasi password wajib diisi';
        } else if (password !== passwordConfirmation) {
            newErrors.password_confirmation = 'Password tidak cocok';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await authService.resetPassword({
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            if (response.success) {
                addToast({
                    type: 'success',
                    title: 'Password berhasil direset',
                    message: 'Silakan masuk dengan password baru Anda',
                });
                navigate('/login');
            } else {
                addToast({ type: 'error', title: 'Reset password gagal', message: response.message });
            }
        } catch (error) {
            const message = error instanceof ApiError ? error.message : 'Reset password gagal. Silakan coba lagi.';
            addToast({ type: 'error', title: 'Reset password gagal', message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <Link to="/" className="auth-logo">
                        <Printer className="logo-icon" size={24} />
                        <span className="logo-text">
                            Semanggi<span className="logo-accent">Print</span>
                        </span>
                    </Link>

                    <h1>Reset Password</h1>
                    <p className="auth-subtitle">Masukkan email Anda dan password baru untuk akun Anda.</p>

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
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        {/* New Password */}
                        <div className="form-group">
                            <label className="label" htmlFor="password">Password Baru</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className={`input input-with-icon ${errors.password ? 'input-error' : ''}`}
                                    placeholder="Minimal 6 karakter"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors({ ...errors, password: undefined });
                                    }}
                                    disabled={isLoading}
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

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label className="label" htmlFor="password_confirmation">Konfirmasi Password Baru</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password_confirmation"
                                    className={`input input-with-icon ${errors.password_confirmation ? 'input-error' : ''}`}
                                    placeholder="Ulangi password baru"
                                    value={passwordConfirmation}
                                    onChange={(e) => {
                                        setPasswordConfirmation(e.target.value);
                                        if (errors.password_confirmation) setErrors({ ...errors, password_confirmation: undefined });
                                    }}
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.password_confirmation && <span className="error-message">{errors.password_confirmation}</span>}
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
                                    <KeyRound size={20} />
                                    Reset Password
                                </>
                            )}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Ingat password Anda? <Link to="/login">Masuk di sini</Link>
                    </p>
                </div>

                <div className="auth-decoration">
                    <div className="decoration-content">
                        <h2>Atur Ulang Password Anda</h2>
                        <p>Masukkan email dan password baru untuk mengakses kembali akun Semanggi Print Anda.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
