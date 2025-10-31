function HomeContent() {
  return (
    <main>
      <div className="container">
        <section id="tentang">
          {/* Kartu "Selamat Datang" */}
          <div className="card">
            <h2>Selamat Datang di Kebun Raya ITERA</h2>
            <p>
              Institut Teknologi Sumatera (Itera) yang berdiri di lahan seluas 273
              hektare tidak hanya berfokus pada pembangunan infrastruktur
              pendidikan, tetapi juga memiliki visi menghijaukan kampus melalui
              pendirian Kebun Raya Itera seluas 75,52 hektare pada tahun 2016
              oleh Rektor pertama, Alm. Prof. Ir. Ofyar Z. Tamin. Dengan tema
              “Konservasi Tumbuhan Pamah Sumatera,” pembangunan kebun raya ini
              didukung LIPI (kini BRIN) dalam pengelolaan serta Kementerian PUPR
              sejak 2018 untuk pengembangan infrastruktur. Diresmikan pada 8
              Juni 2022 oleh Rektor kedua, Prof. Mitra Djamal, Kebun Raya Itera
              menjadi kebun raya kedua di Indonesia yang dikelola perguruan
              tinggi dan pertama yang diresmikan, sekaligus menjadikan Lampung
              sebagai provinsi pertama di Sumatera dengan dua kebun raya. Saat
              ini, Kebun Raya Itera menjalankan lima fungsi utama konservasi,
              pendidikan, penelitian, wisata, dan jasa lingkungan di bawah UPA
              Konservasi Flora Sumatera serta terhubung dengan lebih dari 800
              kebun raya dunia melalui BGCI, memperkuat peran Itera dalam
              pelestarian keanekaragaman hayati dan riset berkelanjutan bagi
              bangsa dan negara.
            </p>
          </div>

          {/* Kartu "Visi dan Misi" */}
          <div className="card">
            <h3>Visi dan Misi</h3>
            <p>
              Menjadi kebun raya terkemuka di dunia dalam bidang konservasi,
              penelitian dan pendidikan berbasis tumbuhan pamah Sumatera untuk
              pemanfaatan yang berkelanjutan.
            </p>
          </div>
        </section>

        {/* Nanti bagian Tabel Koleksi akan kita buat komponennya sendiri */}
      </div>
    </main>
  );
}

export default HomeContent;