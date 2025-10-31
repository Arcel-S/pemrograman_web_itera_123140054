import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Impor gambar sebagai variabel
import BackgroundImage from './assets/background.jpg'; 

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage.jsx';
import BeritaPage from './pages/BeritaPage.jsx';
import BeritaDetailPage from './pages/BeritaDetailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  // 2. Buat objek style untuk background
  const appStyle = {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    minHeight: '100vh', // Pastikan div mengisi seluruh tinggi layar
  };

  return (
    <Router>
      {/* 3. Terapkan style ke div utama */}
      <div style={appStyle}> 
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/berita" element={<BeritaPage />} />
            <Route path="/berita/:id" element={<BeritaDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;