import Hero from '../components/Hero';
import HomeContent from '../components/HomeContent';
import Koleksi from '../components/Koleksi';

function HomePage() {
  return (
    <>
      <Hero />
      <HomeContent />
      <div className="container">
        <Koleksi />
      </div>
    </>
  );
}

export default HomePage;