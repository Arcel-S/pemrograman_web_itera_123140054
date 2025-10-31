import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Hero from '../components/Hero';

const API_BERITA_URL = 'https://68f99420ef8b2e621e7cae84.mockapi.io/berita';

function BeritaDetailPage() {
  const { id } = useParams(); // Mengambil 'id' dari URL, misal: /berita/5
  const { data: berita, loading, error } = useFetch(`${API_BERITA_URL}/${id}`);

  const renderContent = () => {
    if (loading) return <p>Sedang memuat detail berita...</p>;
    if (error) return <p>Terjadi kesalahan: {error}</p>;
    if (!berita) return <p>Berita tidak ditemukan.</p>;

    return (
      <article>
        <header className="berita-header">
          <h2>{berita.judul}</h2>
          <p>
            <strong>{berita.kategori}</strong> | {berita.tanggal}
          </p>
        </header>
        {/* Tampilkan gambar jika ada URL-nya */}
        {berita.gambarUrl && (
          <div className="berita-image-container">
            <img src={berita.gambarUrl} alt={berita.judul} />
          </div>
        )}
        <p>{berita.ringkasan}</p>
        {/* Di sini Anda bisa menambahkan konten berita yang lebih lengkap jika ada di API */}
      </article>
    );
  };

  return (
    <>
      <Hero />
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="card">
          {renderContent()}
          <div className="back-link">
            <Link to="/berita" className="btn">
              ← Kembali ke Daftar Berita
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default BeritaDetailPage;