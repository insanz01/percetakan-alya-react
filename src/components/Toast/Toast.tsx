import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useUIStore } from '../../store';
import './Toast.css';

export default function Toast() {
    const { toasts, removeToast } = useUIStore();

    if (toasts.length === 0) return null;

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle size={20} />;
            case 'error':
                return <AlertCircle size={20} />;
            case 'warning':
                return <AlertTriangle size={20} />;
            default:
                return <Info size={20} />;
        }
    };

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div key={toast.id} className={`toast toast-${toast.type}`}>
                    <div className="toast-icon">
                        {getIcon(toast.type)}
                    </div>
                    <div className="toast-content">
                        <p className="toast-title">{toast.title}</p>
                        {toast.message && <p className="toast-message">{toast.message}</p>}
                    </div>
                    <button
                        className="toast-close"
                        onClick={() => removeToast(toast.id)}
                        aria-label="Tutup"
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
}
