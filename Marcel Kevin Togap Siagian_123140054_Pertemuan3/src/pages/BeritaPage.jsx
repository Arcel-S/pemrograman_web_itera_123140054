import Hero from '../components/Hero';
import useFetch from '../hooks/useFetch';

// Pastikan URL ini adalah URL API berita Anda
const API_BERITA_URL = 'https://68f99420ef8b2e621e7cae84.mockapi.io/berita';

function BeritaPage() {
  const { data: beritaList, loading, error } = useFetch(API_BERITA_URL);

  const renderContent = () => {
    if (loading) {
      return <p>Sedang memuat berita...</p>;
    }

    if (error) {
      return <p>Terjadi kesalahan: {error}</p>;
    }

    return (
      <div className="berita-list">
        {/* Pastikan beritaList adalah array sebelum di-map */}
        {Array.isArray(beritaList) && beritaList.map(berita => (
          <div className="card" key={berita.id}>
            <h3>{berita.judul}</h3>
            <p>
              <strong>{berita.kategori}</strong> | {berita.tanggal}
            </p>
            <p>{berita.ringkasan}</p>

            {/* Cek apakah berita ini memiliki sumberUrl */}
            {berita.sumberUrl && (
              // Jika ada, buat tombol <a> yang mengarah ke URL tersebut
              <a
                href={berita.sumberUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ marginTop: '1rem' }}
              >
                Baca Selengkapnya
              </a>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Hero />
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="card">
          <h2>Berita & Publikasi</h2>
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default BeritaPage;