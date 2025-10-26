# 🚀 Aplikasi Personal Dashboard Mahasiswa

Ini adalah proyek Tugas Praktikum Pemrograman Web (JavaScript Next Gen - ES6+).

Aplikasi ini adalah *dashboard* pribadi yang dibuat untuk membantu mahasiswa melacak progres akademik mereka. Semua data disimpan secara lokal di browser menggunakan `localStorage`.

Aplikasi ini dibangun murni menggunakan **HTML5, CSS3, dan Vanilla JavaScript (ES6+)** tanpa *framework* apa pun, untuk memenuhi semua persyaratan tugas praktikum.

---

## 📸 Screenshot Aplikasi

Berikut adalah beberapa tangkapan layar dari aplikasi:

### Halaman Login
*Halaman login yang bersih untuk autentikasi pengguna.*
**(SERET & LEPASKAN SCREENSHOT LOGIN ANDA DI SINI)**

### Halaman Beranda (Dashboard Utama)
*Tampilan utama 4-kolom yang menampilkan Data Diri, Ringkasan IP, Target Matakuliah, dan Grafik IPK.*
**(SERET & LEPASKAN SCREENSHOT BERANDA ANDA DI SINI)**

### Halaman Rencana Studi
*Halaman interaktif untuk menambah/mengedit target, menginput nilai riil, dan melihat grafik pencapaian.*
**(SERET & LEPASKAN SCREENSHOT RENCANA STUDI ANDA DI SINI)**

### Halaman Jadwal Kuliah
*Halaman untuk menginput dan mengelola jadwal kuliah secara manual.*
**(SERET & LEPASKAN SCREENSHOT JADWAL KULIAH ANDA DI SINI)**

---

## ✨ Fitur-Fitur Utama

Aplikasi ini sepenuhnya interaktif dan menyimpan semua data di `localStorage` browser.

* **Dashboard Utama (4 Kolom):**
    * **Data Diri:** Menampilkan data profil pengguna.
    * **Ringkasan IP:** Menampilkan daftar IP & IPK per semester.
    * **Target Matakuliah:** Menampilkan daftar target nilai.
    * **Grafik IPK:** Visualisasi *line chart* progres IP dan IPK.
* **Fungsionalitas Penuh (CRUD):**
    * **Tambah:** Data IP, Target Matakuliah, dan Jadwal Kuliah.
    * **Edit:** Data Diri (melalui *modal*), data IP per semester, dan data Target Matakuliah.
    * **Hapus:** Target Matakuliah dan Jadwal Kuliah.
* **Halaman Rencana Studi:**
    * Input target matakuliah (Kode, Nama, SKS, Target).
    * Input "Nilai Riil" untuk perbandingan.
    * Grafik *Doughnut* yang otomatis menghitung persentase target yang **Tercapai**, **Tidak Tercapai**, dan **Pending**.
* **Halaman Jadwal Kuliah:**
    * Input manual untuk jadwal (Kode, Matkul, Dosen, Waktu, Ruangan).
    * Tampilan tabel yang rapi dengan tombol hapus.
* **Autentikasi:**
    * Sistem *Login* dan *Register* (dummy) yang aman.
    * Data setiap pengguna disimpan terpisah di `localStorage`.

---

## ✅ Daftar Fitur ES6+ yang Diimplementasikan

Aplikasi ini memenuhi semua persyaratan wajib dari tugas praktikum:

1.  **`let` dan `const`**: Digunakan di semua file `.js` untuk deklarasi variabel yang *block-scoped*. `let` untuk variabel yang nilainya berubah (misal: `currentUser`, `editingKode`) dan `const` untuk fungsi, elemen DOM, dan referensi yang tetap.
2.  **`Arrow Functions`**: Digunakan secara ekstensif untuk semua *event listener* (`e => ...`), *callback* metode array (`.map()`, `.filter()`), dan fungsi *helper* (`const saveDataToStorage = () => ...`).
3.  **`Template Literals`**: Menjadi dasar dari `modules/ui.js`. Semua *rendering* HTML dinamis (kartu, tabel, modal) menggunakan *string literals* (backtick `` ` ``).
4.  **`Async/Await` dan `Promises`**: Digunakan untuk menangani alur program asinkron, seperti saat *login* (`loginUser`), *register* (`registerUser`), dan memuat data (`loadAcademicData`). `new Promise` juga digunakan untuk simulasi *delay*.
5.  **`Classes`**: Menjadi inti dari logika aplikasi. File `modules/mahasiswa.js` berisi `class Mahasiswa` lengkap dengan `constructor`, *properties* (`this.profile`, `this.ip`), dan *methods* (`tambahIP`, `updateProfile`, `getTargetStats`, `tambahJadwal`, dll).

### Fitur ES6+ Lainnya yang Digunakan:

* **`Modules (import/export)`**: Seluruh struktur kode dipecah menjadi modul-modul yang rapi (`auth.js`, `ui.js`, `chart.js`, `mahasiswa.js`) dan saling terhubung menggunakan `import` dan `export`.
* **`Destructuring`**: Digunakan untuk mengekstrak data dari objek (misal: `const { ip, matakuliah, profile } = mahasiswa.getAllData();`) dan elemen form (`const { 'matkul-nama': nama, ... } = form.elements;`).
* **`Spread Operator (...)`**: Digunakan di `mahasiswa.js` untuk meng-update profil secara *immutable* (`this.profile = { ...this.profile, ...newProfileData };`).
* **`Default Parameters`**: Digunakan di `modules/ui.js` (misal: `renderMatkulList = (matkulData, showDeleteButton = false) => ...`).
* **`Array Methods` Modern**: `.map()`, `.filter()`, `.find()`, dan `.findIndex()` digunakan secara ekstensif di `mahasiswa.js` dan `ui.js` untuk mengelola data.