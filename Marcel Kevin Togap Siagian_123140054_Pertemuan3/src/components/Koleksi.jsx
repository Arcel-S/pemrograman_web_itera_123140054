import useFetch from '../hooks/useFetch';
import { useFavorites } from '../context/FavoritesContext';

const API_URL = 'https://68f99420ef8b2e621e7cae84.mockapi.io/tanaman';

function Koleksi() {
  const { data: tanaman, loading, error } = useFetch(API_URL);
  const { favorites, toggleFavorite } = useFavorites();

  if (loading) return <div className="card"><p>Sedang memuat data koleksi...</p></div>;
  if (error) return <div className="card"><p>Terjadi kesalahan: {error}</p></div>;

  return (
    <section id="koleksi">
      <div className="card">
        <h2>Koleksi Tanaman Unggulan</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Tanaman</th>
              <th>Nama Ilmiah</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tanaman) && tanaman.map((item, index) => {
              const isFavorited = favorites.includes(item.id);

              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td><em>{item.namaIlmiah}</em></td>
                  <td>
                    {/* Saat tombol diklik, panggil toggleFavorite dengan ID item yang spesifik ini */}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                      }}
                    >
                      {/* Tampilkan bintang yang sesuai berdasarkan 'isFavorited' */}
                      {isFavorited ? '★' : '☆'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Koleksi;