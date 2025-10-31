import { Link } from 'react-router-dom';
import FavoritesCounter from './FavoritesCounter'; // Impor komponen counter

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Kebun Raya ITERA
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/berita">Berita</Link></li>
          <li><a href="/#koleksi">Koleksi</a></li>
          <li><a href="/#kontak">Kontak</a></li>
          <li><FavoritesCounter /></li> {/* Tampilkan counter di sini */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;