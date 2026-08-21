import { LogIn, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store';
import './SessionExpiredModal.css';

export default function SessionExpiredModal() {
    const isOpen = useUIStore((state) => state.isLoginModalOpen);
    const close = useUIStore((state) => state.setLoginModalOpen);
    const navigate = useNavigate();
    const location = useLocation();

    if (!isOpen) return null;

    const loginPath = location.pathname.startsWith('/admin') ? '/admin/login' : '/login';

    const handleLogin = () => {
        close(false);
        navigate(loginPath);
    };

    return (
        <div className="session-modal-overlay" onClick={() => close(false)}>
            <div className="session-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="session-modal-close" onClick={() => close(false)}>
                    <X size={20} />
                </button>
                <div className="session-modal-icon">
                    <LogIn size={28} />
                </div>
                <h2>Sesi Anda Telah Berakhir</h2>
                <p>Silakan login kembali untuk melanjutkan.</p>
                <button className="btn btn-primary session-modal-btn" onClick={handleLogin}>
                    Login Sekarang
                </button>
            </div>
        </div>
    );
}
