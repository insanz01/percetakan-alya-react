import { AlertTriangle, Loader2, X } from 'lucide-react';
import './ConfirmDialog.css';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'default';
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = 'Hapus',
    cancelLabel = 'Batal',
    variant = 'danger',
    isLoading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <div className="modal-overlay confirm-dialog-overlay" onClick={onCancel}>
            <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn confirm-dialog-close" onClick={onCancel}>
                    <X size={20} />
                </button>

                <div className={`confirm-dialog-icon ${variant}`}>
                    <AlertTriangle size={24} />
                </div>

                <h3 className="confirm-dialog-title">{title}</h3>
                <p className="confirm-dialog-message">{message}</p>

                <div className="confirm-dialog-actions">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        className={`btn ${variant === 'danger' ? 'btn-danger' : 'btn-primary'}`}
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                        {isLoading ? 'Memproses...' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
