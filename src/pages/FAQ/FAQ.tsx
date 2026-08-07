import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Search, HelpCircle, MessageCircle } from 'lucide-react';
import { useContent } from '../../hooks';
import './FAQ.css';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
}


export default function FAQ() {
    const { faq: managedFaq, contact } = useContent();
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    // Managed FAQ from the admin panel; category tabs derived from the data.
    const faqData: FAQItem[] = managedFaq.map((f, i) => ({ id: `faq-${i}`, ...f }));
    const categories = ['Semua', ...Array.from(new Set(faqData.map(f => f.category)))];

    const toggleItem = (id: string) => {
        setExpandedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const filteredFAQs = faqData.filter(faq => {
        const matchesCategory = activeCategory === 'Semua' || faq.category === activeCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="faq-page">
            <div className="container">
                {/* Hero */}
                <div className="faq-hero">
                    <h1>Frequently Asked Questions</h1>
                    <p>Temukan jawaban untuk pertanyaan yang sering diajukan</p>

                    <div className="search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Cari pertanyaan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="faq-categories">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="faq-list">
                    {filteredFAQs.length === 0 ? (
                        <div className="empty-state">
                            <HelpCircle size={48} />
                            <h3>Tidak ada hasil</h3>
                            <p>Coba kata kunci lain atau hubungi kami langsung</p>
                        </div>
                    ) : (
                        filteredFAQs.map(faq => (
                            <div
                                key={faq.id}
                                className={`faq-item ${expandedItems.includes(faq.id) ? 'expanded' : ''}`}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleItem(faq.id)}
                                >
                                    <span className="question-text">{faq.question}</span>
                                    <ChevronDown className="chevron" size={20} />
                                </button>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Contact CTA */}
                <div className="faq-cta">
                    <div className="cta-content">
                        <MessageCircle size={48} />
                        <h2>Masih ada pertanyaan?</h2>
                        <p>Tim customer service kami siap membantu Anda</p>
                        <div className="cta-buttons">
                            <Link to="/kontak" className="btn btn-primary">
                                Hubungi Kami
                                <ChevronRight size={20} />
                            </Link>
                            <a href={`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, '')}`} className="btn btn-outline">
                                Chat WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
