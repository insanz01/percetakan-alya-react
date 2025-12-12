import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, Shield } from 'lucide-react';
import { authService, ApiError } from '../../../lib';
import './AdminLogin.css';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await authService.adminLogin({ email, password });

            if (response.success) {
                // Store admin info
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminUser', JSON.stringify(response.data.user));
                navigate('/admin');
            } else {
                setError(response.message || 'Login gagal');
            }
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                // Fallback to dummy login for development
                if (email === 'admin@printmaster.id' && password === 'admin123') {
                    localStorage.setItem('adminLoggedIn', 'true');
                    navigate('/admin');
                } else {
                    setError('Email atau password salah');
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-container">
                <div className="admin-login-card">
                    {/* Header */}
                    <div className="admin-login-header">
                        <div className="admin-login-icon">
                            <Shield size={32} />
                        </div>
                        <h1>Admin Panel</h1>
                        <p>Masuk untuk mengelola PrintMaster</p>
                    </div>

                    {/* Demo Credentials Info */}
                    <div className="demo-credentials">
                        <p><strong>Demo Login:</strong></p>
                        <p>Email: admin@printmaster.id</p>
                        <p>Password: admin123</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="admin-login-form">
                        <div className="form-group">
                            <label className="label" htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    className="input input-with-icon"
                                    placeholder="admin@printmaster.id"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="label" htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className="input input-with-icon"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

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
                                'Masuk ke Admin'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="admin-login-footer">
                        <a href="/">← Kembali ke Website</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
