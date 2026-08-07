import { useState, useEffect } from 'react';
import {
    Save,
    Loader2,
    Plus,
    Trash2,
    Image as ImageIcon,
    Sparkles,
    FileText,
    Phone,
    Layout as LayoutIcon,
    ShieldAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { settingService } from '../../../lib/settingService';
import { fileService } from '../../../lib/fileService';
import { authService } from '../../../lib/authService';
import {
    CONTENT_KEYS as KEYS,
    contentDefaults as defaults,
    parseContent,
    type SiteContent as ContentState,
    type AboutContent,
    type FooterContent,
} from '../../../lib/content';

// Reusable editor for a list of plain strings (paragraphs, mission, address lines).
function StringListEditor({ label, items, onChange, textarea }: { label: string; items: string[]; onChange: (v: string[]) => void; textarea?: boolean }) {
    const set = (i: number, val: string) => onChange(items.map((v, x) => x === i ? val : v));
    return (
        <div className="form-group">
            <label className="label">{label}</label>
            {items.map((it, i) => (
                <div className="list-row" key={i}>
                    {textarea
                        ? <textarea className="input" rows={2} value={it} onChange={e => set(i, e.target.value)} />
                        : <input className="input" value={it} onChange={e => set(i, e.target.value)} />}
                    <button type="button" className="icon-danger" onClick={() => onChange(items.filter((_, x) => x !== i))}><Trash2 size={16} /></button>
                </div>
            ))}
            <button type="button" className="btn btn-outline add-btn btn-sm" onClick={() => onChange([...items, ''])}><Plus size={16} /> Tambah</button>
        </div>
    );
}

// Contact fields that hold a plain string (addressLines is edited separately)
type ContactTextField = 'address' | 'phone' | 'email' | 'whatsapp' | 'hours' | 'addressTitle' | 'maps' | 'mapsLink';
import { useUIStore } from '../../../store';
import { ImageUploader } from '../../../components/ImageUploader';
import './Content.css';

type TabId = 'hero' | 'features' | 'pages' | 'contact' | 'footer';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'hero', label: 'Hero / Banner', icon: <ImageIcon size={18} /> },
    { id: 'features', label: 'Keunggulan', icon: <Sparkles size={18} /> },
    { id: 'pages', label: 'Halaman Statis', icon: <FileText size={18} /> },
    { id: 'contact', label: 'Kontak', icon: <Phone size={18} /> },
    { id: 'footer', label: 'Footer', icon: <LayoutIcon size={18} /> },
];

async function uploadImage(file: File): Promise<string> {
    const res = await fileService.upload(file, 'design');
    return res.data.url;
}

export default function Content() {
    const { addToast } = useUIStore();
    const [activeTab, setActiveTab] = useState<TabId>('hero');
    const [content, setContent] = useState<ContentState>(defaults);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const isSuperAdmin = authService.isSuperAdmin();

    useEffect(() => {
        if (!isSuperAdmin) { setIsLoading(false); return; }
        (async () => {
            try {
                const res = await settingService.getSettingsByGroup('content');
                if (res.success && res.data) {
                    setContent(parseContent(res.data));
                }
            } catch {
                addToast({ type: 'warning', title: 'Konten default', message: 'Gagal memuat dari server, menampilkan konten default.' });
            } finally {
                setIsLoading(false);
            }
        })();
    }, [isSuperAdmin]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const settings = [
                { key: KEYS.hero_banners, value: content.hero_banners },
                { key: KEYS.features, value: content.features },
                { key: KEYS.about, value: content.about },
                { key: KEYS.faq, value: content.faq },
                { key: KEYS.contact, value: content.contact },
                { key: KEYS.footer, value: content.footer },
            ];
            const res = await settingService.updateSettings(settings);
            if (res.success) {
                addToast({ type: 'success', title: 'Tersimpan', message: 'Konten berhasil diperbarui.' });
            } else {
                addToast({ type: 'error', title: 'Gagal', message: res.message || 'Gagal menyimpan konten.' });
            }
        } catch {
            addToast({ type: 'error', title: 'Gagal', message: 'Gagal menyimpan konten ke server.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (!isSuperAdmin) {
        return (
            <div className="admin-content-page">
                <div className="empty-state access-denied">
                    <ShieldAlert size={48} />
                    <h3>Akses Ditolak</h3>
                    <p>Halaman ini hanya untuk Super Admin.</p>
                    <Link to="/admin" className="btn btn-primary">Kembali ke Dashboard</Link>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="admin-content-page">
                <div className="empty-state"><Loader2 className="spin" size={40} /><p>Memuat konten...</p></div>
            </div>
        );
    }

    // ---- generic list helpers ----
    const setList = <K extends 'hero_banners' | 'features' | 'faq'>(key: K, list: ContentState[K]) =>
        setContent(prev => ({ ...prev, [key]: list }));

    const setAbout = (patch: Partial<AboutContent>) =>
        setContent(prev => ({ ...prev, about: { ...prev.about, ...patch } }));

    return (
        <div className="admin-content-page">
            <div className="page-header">
                <div className="page-header-left">
                    <h2>Kelola Konten</h2>
                    <p>Atur konten publik website: banner, keunggulan, halaman statis, kontak & footer</p>
                </div>
                <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="spin" size={18} /> : <Save size={18} />}
                    Simpan Perubahan
                </button>
            </div>

            <div className="content-tabs">
                {tabs.map(t => (
                    <button key={t.id} className={`content-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                        {t.icon}{t.label}
                    </button>
                ))}
            </div>

            <div className="content-body admin-card">
                {/* HERO / BANNER */}
                {activeTab === 'hero' && (
                    <div className="content-section">
                        {content.hero_banners.map((b, i) => (
                            <div className="repeater-item" key={i}>
                                <div className="repeater-head">
                                    <span className="repeater-index">Banner {i + 1}</span>
                                    <button className="icon-danger" onClick={() => setList('hero_banners', content.hero_banners.filter((_, x) => x !== i))}><Trash2 size={16} /></button>
                                </div>
                                <div className="grid-2">
                                    <div className="form-group">
                                        <label className="label">Judul</label>
                                        <input className="input" value={b.title} onChange={e => setList('hero_banners', content.hero_banners.map((v, x) => x === i ? { ...v, title: e.target.value } : v))} />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Subjudul</label>
                                        <input className="input" value={b.subtitle} onChange={e => setList('hero_banners', content.hero_banners.map((v, x) => x === i ? { ...v, subtitle: e.target.value } : v))} />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Teks Tombol</label>
                                        <input className="input" value={b.ctaText} onChange={e => setList('hero_banners', content.hero_banners.map((v, x) => x === i ? { ...v, ctaText: e.target.value } : v))} />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Link Tombol</label>
                                        <input className="input" value={b.ctaLink} onChange={e => setList('hero_banners', content.hero_banners.map((v, x) => x === i ? { ...v, ctaLink: e.target.value } : v))} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="label">Gambar Banner</label>
                                    <ImageUploader value={b.image} onUpload={uploadImage} onChange={v => setList('hero_banners', content.hero_banners.map((val, x) => x === i ? { ...val, image: v as string } : val))} />
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-outline add-btn" onClick={() => setList('hero_banners', [...content.hero_banners, { title: '', subtitle: '', ctaText: 'Lihat Produk', ctaLink: '/kategori', image: '' }])}>
                            <Plus size={18} /> Tambah Banner
                        </button>
                    </div>
                )}

                {/* FEATURES */}
                {activeTab === 'features' && (
                    <div className="content-section">
                        {content.features.map((f, i) => (
                            <div className="repeater-item" key={i}>
                                <div className="repeater-head">
                                    <span className="repeater-index">Keunggulan {i + 1}</span>
                                    <button className="icon-danger" onClick={() => setList('features', content.features.filter((_, x) => x !== i))}><Trash2 size={16} /></button>
                                </div>
                                <div className="grid-2">
                                    <div className="form-group">
                                        <label className="label">Judul</label>
                                        <input className="input" value={f.title} onChange={e => setList('features', content.features.map((v, x) => x === i ? { ...v, title: e.target.value } : v))} />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Deskripsi</label>
                                        <input className="input" value={f.description} onChange={e => setList('features', content.features.map((v, x) => x === i ? { ...v, description: e.target.value } : v))} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-outline add-btn" onClick={() => setList('features', [...content.features, { title: '', description: '' }])}>
                            <Plus size={18} /> Tambah Keunggulan
                        </button>
                    </div>
                )}

                {/* STATIC PAGES: About + FAQ */}
                {activeTab === 'pages' && (
                    <div className="content-section">
                        <h3 className="subsection-title">Tentang — Hero</h3>
                        <div className="form-group">
                            <label className="label">Judul</label>
                            <input className="input" value={content.about.title} onChange={e => setAbout({ title: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label className="label">Isi</label>
                            <textarea className="input" rows={4} value={content.about.body} onChange={e => setAbout({ body: e.target.value })} />
                        </div>

                        <h3 className="subsection-title">Statistik</h3>
                        <div className="grid-2">
                            {content.about.stats.map((s, i) => (
                                <div className="repeater-item" key={i}>
                                    <div className="repeater-head">
                                        <span className="repeater-index">Statistik {i + 1}</span>
                                        <button type="button" className="icon-danger" onClick={() => setAbout({ stats: content.about.stats.filter((_, x) => x !== i) })}><Trash2 size={16} /></button>
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Nilai</label>
                                        <input className="input" value={s.value} placeholder="mis. 10+" onChange={e => setAbout({ stats: content.about.stats.map((v, x) => x === i ? { ...v, value: e.target.value } : v) })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Label</label>
                                        <input className="input" value={s.label} onChange={e => setAbout({ stats: content.about.stats.map((v, x) => x === i ? { ...v, label: e.target.value } : v) })} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="btn btn-outline add-btn" onClick={() => setAbout({ stats: [...content.about.stats, { value: '', label: '' }] })}><Plus size={18} /> Tambah Statistik</button>

                        <h3 className="subsection-title">Cerita Kami</h3>
                        <div className="grid-2">
                            <div className="form-group">
                                <label className="label">Badge</label>
                                <input className="input" value={content.about.story.badge} onChange={e => setAbout({ story: { ...content.about.story, badge: e.target.value } })} />
                            </div>
                            <div className="form-group">
                                <label className="label">Judul</label>
                                <input className="input" value={content.about.story.title} onChange={e => setAbout({ story: { ...content.about.story, title: e.target.value } })} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="label">Gambar</label>
                            <ImageUploader value={content.about.story.image} onUpload={uploadImage} onChange={v => setAbout({ story: { ...content.about.story, image: v as string } })} />
                        </div>
                        <StringListEditor label="Paragraf" textarea items={content.about.story.paragraphs} onChange={v => setAbout({ story: { ...content.about.story, paragraphs: v } })} />

                        <h3 className="subsection-title">Visi & Misi</h3>
                        <div className="form-group">
                            <label className="label">Visi</label>
                            <textarea className="input" rows={3} value={content.about.vision} onChange={e => setAbout({ vision: e.target.value })} />
                        </div>
                        <StringListEditor label="Misi" items={content.about.mission} onChange={v => setAbout({ mission: v })} />

                        <h3 className="subsection-title">Nilai-Nilai</h3>
                        <div className="grid-2">
                            {content.about.values.map((val, i) => (
                                <div className="repeater-item" key={i}>
                                    <div className="repeater-head">
                                        <span className="repeater-index">Nilai {i + 1}</span>
                                        <button type="button" className="icon-danger" onClick={() => setAbout({ values: content.about.values.filter((_, x) => x !== i) })}><Trash2 size={16} /></button>
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Judul</label>
                                        <input className="input" value={val.title} onChange={e => setAbout({ values: content.about.values.map((v, x) => x === i ? { ...v, title: e.target.value } : v) })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Deskripsi</label>
                                        <textarea className="input" rows={2} value={val.description} onChange={e => setAbout({ values: content.about.values.map((v, x) => x === i ? { ...v, description: e.target.value } : v) })} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="btn btn-outline add-btn" onClick={() => setAbout({ values: [...content.about.values, { title: '', description: '' }] })}><Plus size={18} /> Tambah Nilai</button>

                        <h3 className="subsection-title">FAQ</h3>
                        {content.faq.map((q, i) => (
                            <div className="repeater-item" key={i}>
                                <div className="repeater-head">
                                    <span className="repeater-index">Pertanyaan {i + 1}</span>
                                    <button className="icon-danger" onClick={() => setList('faq', content.faq.filter((_, x) => x !== i))}><Trash2 size={16} /></button>
                                </div>
                                <div className="grid-2">
                                    <div className="form-group">
                                        <label className="label">Kategori</label>
                                        <input className="input" value={q.category} placeholder="mis. Pemesanan" onChange={e => setList('faq', content.faq.map((v, x) => x === i ? { ...v, category: e.target.value } : v))} />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Pertanyaan</label>
                                        <input className="input" value={q.question} onChange={e => setList('faq', content.faq.map((v, x) => x === i ? { ...v, question: e.target.value } : v))} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="label">Jawaban</label>
                                    <textarea className="input" rows={2} value={q.answer} onChange={e => setList('faq', content.faq.map((v, x) => x === i ? { ...v, answer: e.target.value } : v))} />
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-outline add-btn" onClick={() => setList('faq', [...content.faq, { question: '', answer: '', category: 'Umum' }])}>
                            <Plus size={18} /> Tambah FAQ
                        </button>
                    </div>
                )}

                {/* CONTACT */}
                {activeTab === 'contact' && (
                    <div className="content-section">
                        <div className="grid-2">
                            {([
                                ['address', 'Alamat (ringkas)'], ['phone', 'Telepon'], ['email', 'Email'],
                                ['whatsapp', 'WhatsApp'], ['hours', 'Jam Buka'], ['addressTitle', 'Judul Alamat'],
                            ] as [ContactTextField, string][]).map(([field, label]) => (
                                <div className="form-group" key={field}>
                                    <label className="label">{label}</label>
                                    <input className="input" value={content.contact[field]} onChange={e => setContent(p => ({ ...p, contact: { ...p.contact, [field]: e.target.value } }))} />
                                </div>
                            ))}
                        </div>

                        <h3 className="subsection-title">Alamat Kantor (baris detail)</h3>
                        <StringListEditor label="Baris Alamat" items={content.contact.addressLines} onChange={v => setContent(p => ({ ...p, contact: { ...p.contact, addressLines: v } }))} />

                        <h3 className="subsection-title">Peta</h3>
                        <div className="form-group">
                            <label className="label">Google Maps Embed URL (src iframe)</label>
                            <textarea className="input" rows={2} value={content.contact.maps} onChange={e => setContent(p => ({ ...p, contact: { ...p.contact, maps: e.target.value } }))} />
                        </div>
                        <div className="form-group">
                            <label className="label">Link "Buka di Google Maps"</label>
                            <input className="input" value={content.contact.mapsLink} onChange={e => setContent(p => ({ ...p, contact: { ...p.contact, mapsLink: e.target.value } }))} />
                        </div>
                    </div>
                )}

                {/* FOOTER */}
                {activeTab === 'footer' && (
                    <div className="content-section">
                        <div className="form-group">
                            <label className="label">Deskripsi Footer</label>
                            <textarea className="input" rows={3} value={content.footer.description} onChange={e => setContent(p => ({ ...p, footer: { ...p.footer, description: e.target.value } }))} />
                        </div>
                        <div className="grid-2">
                            {([
                                ['instagram', 'Instagram'], ['facebook', 'Facebook'], ['tiktok', 'TikTok'], ['whatsapp', 'WhatsApp'],
                            ] as [keyof FooterContent, string][]).map(([field, label]) => (
                                <div className="form-group" key={field}>
                                    <label className="label">{label}</label>
                                    <input className="input" value={content.footer[field]} onChange={e => setContent(p => ({ ...p, footer: { ...p.footer, [field]: e.target.value } }))} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
