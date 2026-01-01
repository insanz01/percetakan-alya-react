import { useState, useRef, useCallback } from 'react';
import { Upload, Link, X, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import './ImageUploader.css';

export interface ImageUploaderProps {
    value?: string | string[];
    onChange: (value: string | string[]) => void;
    onUpload?: (file: File) => Promise<string>; // Returns uploaded URL
    multiple?: boolean;
    maxImages?: number;
    accept?: string;
    maxSizeMB?: number;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export default function ImageUploader({
    value,
    onChange,
    onUpload,
    multiple = false,
    maxImages = 5,
    accept = 'image/jpeg,image/png,image/gif,image/webp',
    maxSizeMB = 5,
    placeholder = 'Upload gambar atau masukkan URL',
    className = '',
    disabled = false,
}: ImageUploaderProps) {
    const [mode, setMode] = useState<'upload' | 'url'>('upload');
    const [urlInput, setUrlInput] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Normalize value to array for internal use
    const images = Array.isArray(value) ? value : value ? [value] : [];

    const handleFileSelect = useCallback(async (files: FileList | null) => {
        if (!files || files.length === 0 || !onUpload) return;

        setError(null);
        const maxBytes = maxSizeMB * 1024 * 1024;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Validate file type
            if (!accept.split(',').some(type => file.type.match(type.trim()))) {
                setError(`Tipe file tidak didukung: ${file.name}`);
                continue;
            }

            // Validate file size
            if (file.size > maxBytes) {
                setError(`Ukuran file maksimal ${maxSizeMB} MB`);
                continue;
            }

            // Check max images
            if (multiple && images.length >= maxImages) {
                setError(`Maksimal ${maxImages} gambar`);
                break;
            }

            try {
                setIsUploading(true);
                const uploadedUrl = await onUpload(file);

                if (multiple) {
                    onChange([...images, uploadedUrl]);
                } else {
                    onChange(uploadedUrl);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Upload gagal');
            } finally {
                setIsUploading(false);
            }

            // If not multiple, only process first file
            if (!multiple) break;
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [onUpload, multiple, maxImages, maxSizeMB, accept, images, onChange]);

    const handleUrlSubmit = useCallback(() => {
        if (!urlInput.trim()) return;

        setError(null);

        // Basic URL validation
        try {
            new URL(urlInput);
        } catch {
            setError('URL tidak valid');
            return;
        }

        // Check if it looks like an image URL
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const lowerUrl = urlInput.toLowerCase();
        const hasImageExtension = imageExtensions.some(ext => lowerUrl.includes(ext));
        const hasImageParam = lowerUrl.includes('image') || lowerUrl.includes('unsplash') || lowerUrl.includes('pexels');

        if (!hasImageExtension && !hasImageParam) {
            // Show warning but still allow
            console.warn('URL may not be an image');
        }

        if (multiple) {
            if (images.length >= maxImages) {
                setError(`Maksimal ${maxImages} gambar`);
                return;
            }
            onChange([...images, urlInput.trim()]);
        } else {
            onChange(urlInput.trim());
        }

        setUrlInput('');
    }, [urlInput, multiple, maxImages, images, onChange]);

    const handleRemoveImage = useCallback((index: number) => {
        if (multiple) {
            const newImages = images.filter((_, i) => i !== index);
            onChange(newImages);
        } else {
            onChange('');
        }
    }, [multiple, images, onChange]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (!disabled && e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files);
        }
    }, [disabled, handleFileSelect]);

    const canAddMore = multiple ? images.length < maxImages : images.length === 0;

    return (
        <div className={`image-uploader ${className}`}>
            {/* Image Preview Grid */}
            {images.length > 0 && (
                <div className="image-uploader-preview">
                    {images.map((img, index) => (
                        <div key={index} className="image-uploader-item">
                            <img src={img} alt={`Image ${index + 1}`} />
                            <button
                                type="button"
                                className="image-uploader-remove"
                                onClick={() => handleRemoveImage(index)}
                                disabled={disabled}
                            >
                                <X size={14} />
                            </button>
                            {index === 0 && multiple && (
                                <span className="image-uploader-primary">Utama</span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Area */}
            {canAddMore && (
                <div className="image-uploader-input">
                    {/* Mode Toggle */}
                    <div className="image-uploader-tabs">
                        <button
                            type="button"
                            className={`image-uploader-tab ${mode === 'upload' ? 'active' : ''}`}
                            onClick={() => setMode('upload')}
                            disabled={disabled}
                        >
                            <Upload size={16} />
                            Upload File
                        </button>
                        <button
                            type="button"
                            className={`image-uploader-tab ${mode === 'url' ? 'active' : ''}`}
                            onClick={() => setMode('url')}
                            disabled={disabled}
                        >
                            <Link size={16} />
                            URL Gambar
                        </button>
                    </div>

                    {/* Upload Mode */}
                    {mode === 'upload' && (
                        <div
                            className={`image-uploader-dropzone ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => !disabled && fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept={accept}
                                multiple={multiple}
                                onChange={(e) => handleFileSelect(e.target.files)}
                                disabled={disabled || isUploading}
                                style={{ display: 'none' }}
                            />

                            {isUploading ? (
                                <div className="image-uploader-loading">
                                    <Loader2 size={32} className="animate-spin" />
                                    <span>Mengupload...</span>
                                </div>
                            ) : (
                                <div className="image-uploader-placeholder">
                                    <ImageIcon size={32} />
                                    <span>{placeholder}</span>
                                    <small>
                                        Drag & drop atau klik untuk memilih
                                        <br />
                                        Max {maxSizeMB}MB • {accept.split(',').map(t => t.split('/')[1]).join(', ')}
                                    </small>
                                </div>
                            )}
                        </div>
                    )}

                    {/* URL Mode */}
                    {mode === 'url' && (
                        <div className="image-uploader-url">
                            <div className="image-uploader-url-input">
                                <input
                                    type="url"
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    disabled={disabled}
                                    onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                                />
                                <button
                                    type="button"
                                    onClick={handleUrlSubmit}
                                    disabled={disabled || !urlInput.trim()}
                                    className="btn btn-primary"
                                >
                                    <Check size={16} />
                                </button>
                            </div>
                            <small>Masukkan URL gambar dari internet (Unsplash, dll)</small>
                        </div>
                    )}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="image-uploader-error">
                    {error}
                </div>
            )}

            {/* Image Count */}
            {multiple && (
                <div className="image-uploader-count">
                    {images.length} / {maxImages} gambar
                </div>
            )}
        </div>
    );
}
