import { Link } from 'react-router-dom';
import { Shield, ChevronRight } from 'lucide-react';
import './Privacy.css';

export default function Privacy() {
    const lastUpdated = 'Desember 2024';

    return (
        <div className="privacy-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Beranda</Link>
                    <ChevronRight size={14} />
                    <span>Kebijakan Privasi</span>
                </nav>

                {/* Header */}
                <div className="page-header">
                    <Shield size={48} />
                    <h1>Kebijakan Privasi</h1>
                    <p>Terakhir diperbarui: {lastUpdated}</p>
                </div>

                {/* Content */}
                <div className="policy-content">
                    <section>
                        <h2>1. Pendahuluan</h2>
                        <p>
                            Selamat datang di PrintMaster. Kami menghargai privasi Anda dan berkomitmen untuk
                            melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami
                            mengumpulkan, menggunakan, dan melindungi informasi Anda ketika Anda menggunakan
                            layanan kami.
                        </p>
                    </section>

                    <section>
                        <h2>2. Informasi yang Kami Kumpulkan</h2>
                        <p>Kami mengumpulkan beberapa jenis informasi, termasuk:</p>
                        <ul>
                            <li>
                                <strong>Informasi Pribadi:</strong> Nama, alamat email, nomor telepon,
                                dan alamat pengiriman yang Anda berikan saat mendaftar atau melakukan pemesanan.
                            </li>
                            <li>
                                <strong>Informasi Pembayaran:</strong> Data yang diperlukan untuk memproses
                                transaksi pembayaran Anda. Kami tidak menyimpan informasi kartu kredit secara langsung.
                            </li>
                            <li>
                                <strong>File Desain:</strong> File yang Anda unggah untuk keperluan pencetakan.
                            </li>
                            <li>
                                <strong>Informasi Penggunaan:</strong> Data tentang bagaimana Anda berinteraksi
                                dengan website kami, termasuk halaman yang dikunjungi dan waktu akses.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Penggunaan Informasi</h2>
                        <p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
                        <ul>
                            <li>Memproses dan mengirimkan pesanan Anda</li>
                            <li>Berkomunikasi dengan Anda tentang status pesanan</li>
                            <li>Memberikan dukungan pelanggan</li>
                            <li>Mengirimkan informasi promosi (dengan persetujuan Anda)</li>
                            <li>Meningkatkan layanan dan pengalaman pengguna</li>
                            <li>Memenuhi kewajiban hukum</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Perlindungan Data</h2>
                        <p>
                            Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai
                            untuk melindungi data pribadi Anda dari akses tidak sah, penggunaan, atau
                            pengungkapan. Ini termasuk enkripsi data, firewall, dan akses terbatas ke
                            informasi pribadi.
                        </p>
                    </section>

                    <section>
                        <h2>5. Berbagi Informasi</h2>
                        <p>
                            Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga.
                            Kami hanya berbagi informasi dengan:
                        </p>
                        <ul>
                            <li>Mitra pengiriman untuk mengantarkan pesanan Anda</li>
                            <li>Penyedia layanan pembayaran untuk memproses transaksi</li>
                            <li>Pihak berwenang jika diwajibkan oleh hukum</li>
                        </ul>
                    </section>

                    <section>
                        <h2>6. Penyimpanan File Desain</h2>
                        <p>
                            File desain yang Anda unggah akan disimpan secara aman selama periode yang
                            diperlukan untuk menyelesaikan pesanan Anda. Setelah pesanan selesai, file
                            akan disimpan selama 30 hari untuk keperluan reprint, kemudian akan dihapus
                            secara permanen.
                        </p>
                    </section>

                    <section>
                        <h2>7. Hak Anda</h2>
                        <p>Anda memiliki hak untuk:</p>
                        <ul>
                            <li>Mengakses data pribadi yang kami miliki tentang Anda</li>
                            <li>Meminta koreksi atas data yang tidak akurat</li>
                            <li>Meminta penghapusan data pribadi Anda</li>
                            <li>Menolak penggunaan data untuk pemasaran</li>
                            <li>Menarik persetujuan yang sebelumnya diberikan</li>
                        </ul>
                    </section>

                    <section>
                        <h2>8. Cookies</h2>
                        <p>
                            Website kami menggunakan cookies untuk meningkatkan pengalaman browsing Anda.
                            Cookies adalah file kecil yang disimpan di perangkat Anda. Anda dapat mengatur
                            browser Anda untuk menolak cookies, namun hal ini dapat mempengaruhi fungsi
                            website kami.
                        </p>
                    </section>

                    <section>
                        <h2>9. Perubahan Kebijakan</h2>
                        <p>
                            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan
                            akan diberitahukan melalui email atau pemberitahuan di website kami. Kami
                            menyarankan Anda untuk memeriksa halaman ini secara berkala.
                        </p>
                    </section>

                    <section>
                        <h2>10. Hubungi Kami</h2>
                        <p>
                            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin
                            menggunakan hak Anda terkait data pribadi, silakan hubungi kami:
                        </p>
                        <div className="contact-info">
                            <p><strong>Email:</strong> privacy@printmaster.id</p>
                            <p><strong>Telepon:</strong> (021) 1234-5678</p>
                            <p><strong>Alamat:</strong> Jl. Percetakan No. 123, Jakarta 12345</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
