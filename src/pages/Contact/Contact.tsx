import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    MessageCircle,
    ChevronRight,
    CheckCircle,
    Loader2
} from 'lucide-react';
import { useUIStore } from '../../store';
import './Contact.css';

export default function Contact() {
    const { addToast } = useUIStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const contactInfo = [
        {
            icon: <Phone size={24} />,
            title: 'Telepon',
            details: ['+62 812-3456-7890', '+62 21-1234-5678'],
            action: 'tel:+6281234567890',
            actionLabel: 'Hubungi Sekarang',
        },
        {
            icon: <Mail size={24} />,
            title: 'Email',
            details: ['info@printmaster.id', 'support@printmaster.id'],
            action: 'mailto:info@printmaster.id',
            actionLabel: 'Kirim Email',
        },
        {
            icon: <MessageCircle size={24} />,
            title: 'WhatsApp',
            details: ['+62 812-3456-7890', 'Respon cepat 24 jam'],
            action: 'https://wa.me/6281234567890',
            actionLabel: 'Chat WhatsApp',
        },
        {
            icon: <Clock size={24} />,
            title: 'Jam Operasional',
            details: ['Senin - Jumat: 08.00 - 17.00', 'Sabtu: 08.00 - 14.00'],
        },
    ];

    const faqItems = [
        {
            question: 'Berapa lama waktu pengerjaan?',
            answer: 'Waktu pengerjaan bervariasi tergantung jenis produk dan jumlah pesanan. Estimasi waktu tertera di halaman produk.',
        },
        {
            question: 'Apakah bisa cetak dalam jumlah kecil?',
            answer: 'Setiap produk memiliki minimum order yang berbeda. Silakan cek di halaman produk untuk detail lebih lanjut.',
        },
        {
            question: 'Bagaimana cara pembayaran?',
            answer: 'Kami menerima transfer bank, kartu kredit/debit, dan e-wallet seperti GoPay, OVO, dan DANA.',
        },
        {
            question: 'Apakah ada garansi?',
            answer: 'Ya, kami memberikan garansi cetak ulang gratis jika hasil tidak sesuai dengan pesanan.',
        },
    ];

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nama wajib diisi';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email wajib diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Nomor telepon wajib diisi';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subjek wajib diisi';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Pesan wajib diisi';
        } else if (formData.message.trim().length < 20) {
            newErrors.message = 'Pesan minimal 20 karakter';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);

        addToast({
            type: 'success',
            title: 'Pesan terkirim!',
            message: 'Tim kami akan menghubungi Anda segera.',
        });

        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="contact-page">
            {/* Breadcrumb */}
            <div className="breadcrumb-section">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Beranda</Link>
                        <ChevronRight size={14} />
                        <span>Hubungi Kami</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <div className="contact-hero-content">
                        <h1>Hubungi Kami</h1>
                        <p>
                            Punya pertanyaan atau butuh bantuan? Tim kami siap membantu Anda
                            dengan solusi terbaik untuk kebutuhan percetakan Anda.
                        </p>
                    </div>
                </div>
                <div className="contact-hero-pattern" />
            </section>

            {/* Contact Info Cards */}
            <section className="contact-info-section">
                <div className="container">
                    <div className="contact-info-grid">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="contact-info-card">
                                <div className="contact-info-icon">{info.icon}</div>
                                <h3>{info.title}</h3>
                                <div className="contact-info-details">
                                    {info.details.map((detail, i) => (
                                        <p key={i}>{detail}</p>
                                    ))}
                                </div>
                                {info.action && info.actionLabel && (
                                    <a href={info.action} className="contact-info-action" target="_blank" rel="noopener noreferrer">
                                        {info.actionLabel}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="contact-main py-16">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="contact-form-section">
                            <h2>Kirim Pesan</h2>
                            <p>Isi formulir di bawah ini dan kami akan merespons dalam 24 jam kerja.</p>

                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="label" htmlFor="name">Nama Lengkap *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={`input ${errors.name ? 'input-error' : ''}`}
                                            placeholder="Masukkan nama lengkap"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <span className="error-message">{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="phone">Nomor Telepon *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className={`input ${errors.phone ? 'input-error' : ''}`}
                                            placeholder="08xx-xxxx-xxxx"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="label" htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`input ${errors.email ? 'input-error' : ''}`}
                                        placeholder="nama@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="label" htmlFor="subject">Subjek *</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        className={`input ${errors.subject ? 'input-error' : ''}`}
                                        value={formData.subject}
                                        onChange={handleChange}
                                    >
                                        <option value="">Pilih subjek</option>
                                        <option value="inquiry">Pertanyaan Umum</option>
                                        <option value="order">Pertanyaan Pesanan</option>
                                        <option value="complaint">Komplain</option>
                                        <option value="partnership">Kerja Sama</option>
                                        <option value="other">Lainnya</option>
                                    </select>
                                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="label" htmlFor="message">Pesan *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className={`input textarea ${errors.message ? 'input-error' : ''}`}
                                        rows={5}
                                        placeholder="Tulis pesan Anda di sini..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                    {errors.message && <span className="error-message">{errors.message}</span>}
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Mengirim...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Kirim Pesan
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Map & Address */}
                        <div className="contact-map-section">
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.175247299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1234567890"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0, borderRadius: 'var(--radius-xl)' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Lokasi PrintMaster"
                                />
                            </div>

                            <div className="address-card">
                                <div className="address-icon">
                                    <MapPin size={24} />
                                </div>
                                <div className="address-content">
                                    <h3>Kantor & Workshop</h3>
                                    <p>Jl. Percetakan No. 123</p>
                                    <p>Kebayoran Baru, Jakarta Selatan</p>
                                    <p>DKI Jakarta 12110</p>
                                    <a
                                        href="https://maps.google.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline btn-sm"
                                    >
                                        <MapPin size={16} />
                                        Lihat di Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section py-16">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">FAQ</span>
                        <h2>Pertanyaan yang Sering Diajukan</h2>
                        <p>Temukan jawaban untuk pertanyaan umum di sini</p>
                    </div>

                    <div className="faq-grid">
                        {faqItems.map((item, index) => (
                            <div key={index} className="faq-card">
                                <div className="faq-icon">
                                    <CheckCircle size={20} />
                                </div>
                                <div className="faq-content">
                                    <h4>{item.question}</h4>
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="faq-more">
                        <p>Tidak menemukan jawaban yang Anda cari?</p>
                        <a
                            href="https://wa.me/6281234567890?text=Halo, saya ingin bertanya tentang layanan PrintMaster"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-accent"
                        >
                            <MessageCircle size={20} />
                            Chat dengan Kami
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
