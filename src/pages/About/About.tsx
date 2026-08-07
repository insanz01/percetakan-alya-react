import { Link } from 'react-router-dom';
import {
    Target,
    Eye,
    Award,
    Clock,
    Shield,
    ThumbsUp,
    ChevronRight,
    Printer
} from 'lucide-react';
import { useContent } from '../../hooks';
import './About.css';

export default function About() {
    const { about } = useContent();

    // Icons stay in code, matched to value cards by position.
    const valueIcons = [Award, Clock, Shield, ThumbsUp];

    return (
        <div className="about-page">
            {/* Breadcrumb */}
            <div className="breadcrumb-section">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Beranda</Link>
                        <ChevronRight size={14} />
                        <span>Tentang Kami</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-content">
                        <h1>{about.title}</h1>
                        <p>{about.body}</p>
                    </div>
                </div>
                <div className="about-hero-pattern" />
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {about.stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section py-16">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-image">
                            <img
                                src={about.story.image}
                                alt="Semanggi Print Office"
                            />
                            <div className="story-image-overlay">
                                <Printer size={40} />
                            </div>
                        </div>
                        <div className="story-content">
                            <span className="section-badge">{about.story.badge}</span>
                            <h2>{about.story.title}</h2>
                            {about.story.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Mission */}
            <section className="vision-section py-16">
                <div className="container">
                    <div className="vision-grid">
                        <div className="vision-card">
                            <div className="vision-icon">
                                <Eye size={40} />
                            </div>
                            <h3>Visi Kami</h3>
                            <p>{about.vision}</p>
                        </div>
                        <div className="vision-card">
                            <div className="vision-icon">
                                <Target size={40} />
                            </div>
                            <h3>Misi Kami</h3>
                            <ul>
                                {about.mission.map((m, i) => (
                                    <li key={i}>{m}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section py-16">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">Nilai-Nilai Kami</span>
                        <h2>Mengapa Memilih Semanggi Print?</h2>
                        <p>Komitmen kami untuk memberikan yang terbaik</p>
                    </div>

                    <div className="values-grid">
                        {about.values.map((value, index) => {
                            const Icon = valueIcons[index % valueIcons.length];
                            return (
                                <div key={index} className="value-card">
                                    <div className="value-icon"><Icon size={32} /></div>
                                    <h4>{value.title}</h4>
                                    <p>{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta-section">
                <div className="container">
                    <div className="about-cta">
                        <div className="about-cta-content">
                            <h2>Siap Memulai Proyek Anda?</h2>
                            <p>Hubungi kami sekarang untuk konsultasi gratis tentang kebutuhan cetak Anda</p>
                            <div className="about-cta-buttons">
                                <Link to="/kontak" className="btn btn-accent btn-lg">
                                    Hubungi Kami
                                </Link>
                                <Link to="/kategori" className="btn btn-outline btn-lg">
                                    Lihat Produk
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
