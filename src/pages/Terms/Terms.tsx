import { Link } from 'react-router-dom';
import { FileText, ChevronRight } from 'lucide-react';
import '../Privacy/Privacy.css';

export default function Terms() {
    const lastUpdated = 'Desember 2024';

    return (
        <div className="terms-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Beranda</Link>
                    <ChevronRight size={14} />
                    <span>Syarat & Ketentuan</span>
                </nav>

                {/* Header */}
                <div className="page-header">
                    <FileText size={48} />
                    <h1>Syarat & Ketentuan</h1>
                    <p>Terakhir diperbarui: {lastUpdated}</p>
                </div>

                {/* Content */}
                <div className="policy-content">
                    <section>
                        <h2>1. Penerimaan Syarat</h2>
                        <p>
                            Dengan mengakses dan menggunakan layanan PrintMaster, Anda menyetujui untuk
                            terikat oleh Syarat & Ketentuan ini. Jika Anda tidak menyetujui syarat-syarat
                            ini, mohon untuk tidak menggunakan layanan kami.
                        </p>
                    </section>

                    <section>
                        <h2>2. Layanan Kami</h2>
                        <p>
                            PrintMaster menyediakan layanan percetakan online yang meliputi cetak brosur,
                            flyer, kartu nama, banner, dan berbagai produk cetak lainnya. Kami berhak
                            untuk mengubah, menangguhkan, atau menghentikan layanan kapan saja tanpa
                            pemberitahuan sebelumnya.
                        </p>
                    </section>

                    <section>
                        <h2>3. Akun Pengguna</h2>
                        <p>Untuk menggunakan layanan kami, Anda harus:</p>
                        <ul>
                            <li>Berusia minimal 18 tahun atau memiliki izin orang tua/wali</li>
                            <li>Memberikan informasi yang akurat dan lengkap</li>
                            <li>Menjaga kerahasiaan password akun Anda</li>
                            <li>Bertanggung jawab atas semua aktivitas di akun Anda</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Pemesanan dan Pembayaran</h2>
                        <ul>
                            <li>Semua harga yang tercantum dalam Rupiah dan belum termasuk ongkos kirim</li>
                            <li>Pesanan dianggap sah setelah pembayaran dikonfirmasi</li>
                            <li>Pembayaran harus dilakukan dalam waktu 24 jam setelah pemesanan</li>
                            <li>Kami berhak membatalkan pesanan yang belum dibayar</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. File Desain</h2>
                        <ul>
                            <li>
                                Anda bertanggung jawab penuh atas konten file desain yang diunggah
                            </li>
                            <li>
                                File harus memenuhi spesifikasi teknis yang ditentukan (format, resolusi,
                                ukuran maksimal)
                            </li>
                            <li>
                                Kami berhak menolak file yang mengandung konten ilegal, menyinggung,
                                atau melanggar hak cipta
                            </li>
                            <li>
                                Pastikan ejaan dan desain sudah benar sebelum konfirmasi cetak
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2>6. Hak Kekayaan Intelektual</h2>
                        <p>
                            Anda menyatakan bahwa desain yang diunggah tidak melanggar hak cipta,
                            merek dagang, atau hak kekayaan intelektual pihak lain. Anda bertanggung
                            jawab penuh atas segala klaim yang timbul dari penggunaan desain tersebut.
                        </p>
                    </section>

                    <section>
                        <h2>7. Produksi dan Pengiriman</h2>
                        <ul>
                            <li>Waktu produksi dihitung sejak file desain disetujui</li>
                            <li>Estimasi waktu pengiriman tergantung lokasi dan jasa ekspedisi</li>
                            <li>Kami tidak bertanggung jawab atas keterlambatan dari pihak ekspedisi</li>
                            <li>Perbedaan warna minor antara layar dan hasil cetak adalah hal yang wajar</li>
                        </ul>
                    </section>

                    <section>
                        <h2>8. Kebijakan Garansi</h2>
                        <ul>
                            <li>Kami memberikan garansi 100% jika terjadi kesalahan cetak dari pihak kami</li>
                            <li>Klaim garansi harus diajukan dalam 3 hari setelah produk diterima</li>
                            <li>Garansi tidak berlaku untuk kesalahan desain dari pelanggan</li>
                            <li>Foto bukti kerusakan/kesalahan wajib dilampirkan saat klaim</li>
                        </ul>
                    </section>

                    <section>
                        <h2>9. Pembatalan dan Pengembalian Dana</h2>
                        <ul>
                            <li>Pembatalan dapat dilakukan sebelum proses produksi dimulai</li>
                            <li>Pesanan yang sudah dalam produksi tidak dapat dibatalkan</li>
                            <li>Pengembalian dana diproses dalam 3-7 hari kerja</li>
                            <li>Biaya transfer pengembalian dana ditanggung pelanggan</li>
                        </ul>
                    </section>

                    <section>
                        <h2>10. Batasan Tanggung Jawab</h2>
                        <p>
                            PrintMaster tidak bertanggung jawab atas kerugian tidak langsung,
                            konsekuensial, atau kehilangan keuntungan yang timbul dari penggunaan
                            layanan kami. Tanggung jawab kami terbatas pada nilai pesanan yang bersangkutan.
                        </p>
                    </section>

                    <section>
                        <h2>11. Perubahan Syarat</h2>
                        <p>
                            Kami berhak mengubah Syarat & Ketentuan ini kapan saja. Perubahan akan
                            berlaku segera setelah dipublikasikan di website. Penggunaan layanan
                            setelah perubahan dianggap sebagai persetujuan terhadap syarat yang baru.
                        </p>
                    </section>

                    <section>
                        <h2>12. Hukum yang Berlaku</h2>
                        <p>
                            Syarat & Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap
                            sengketa akan diselesaikan melalui pengadilan yang berwenang di Jakarta.
                        </p>
                    </section>

                    <section>
                        <h2>13. Hubungi Kami</h2>
                        <p>
                            Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi:
                        </p>
                        <div className="contact-info">
                            <p><strong>Email:</strong> legal@printmaster.id</p>
                            <p><strong>Telepon:</strong> (021) 1234-5678</p>
                            <p><strong>Alamat:</strong> Jl. Percetakan No. 123, Jakarta 12345</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
