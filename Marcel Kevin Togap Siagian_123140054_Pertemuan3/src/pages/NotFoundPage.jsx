import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

function NotFoundPage() {
  return (
    <>
      <Hero />
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div className="card">
          <h1>404 - Halaman Tidak Ditemukan</h1>
          <p>Maaf, halaman yang Anda cari tidak ada.</p>
          <Link to="/" className="btn">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;