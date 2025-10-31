import instagramLogo from '../assets/instagram.png';
import youtubeLogo from '../assets/yt.png';

function Footer() {
  return (
    <footer id="kontak" className="footer">
      <div className="container">
        <div className="contact">
          <h2>Hubungi Kami</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-item">
            <h4>Alamat</h4>
            <a 
            href="https://maps.app.goo.gl/bJjZPkxuUM7yQ7Ke7"
            target="_blank"
            rel="noopener noreferrer"
            >📍Institut Teknologi Sumatera, Lampung Selatan</a>
          </div>

          <div className="contact-item">
            <h4>Email</h4>
            <p>
              <a href="mailto:kebunraya@itera.ac.id">
                📧kebunraya@itera.ac.id
              </a>
            </p>
          </div>

          <div className="contact-item">
            <h4>Media Sosial</h4>
            <div className="social-media">
              <a
                href="https://www.instagram.com/kebunrayaitera/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagramLogo} width="30" height="30" alt="Logo Instagram" />
              </a>
              <a
                href="https://www.youtube.com/@KebunRayaITERAOfficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={youtubeLogo} width="35" height="30" alt="Logo YouTube" />
              </a>
            </div>
          </div>
        </div>

        <p className="footer-copy">
          <small>&copy; IF25-22014 | UTS Pengembangan Web | Marcel Kevin Togap Siagian (123140054)</small>
        </p>
      </div>
    </footer>
  );
}

export default Footer;