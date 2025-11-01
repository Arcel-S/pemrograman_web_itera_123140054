# UTS Pemrograman Web - Aplikasi Kebun Raya ITERA Dinamis
[![Status Proyek](https://img.shields.io/badge/Status-Selesai-brightgreen)](https://github.com/URL_GITHUB_ANDA)
[![Dibuat dengan](https://img.shields.io/badge/Framework-ReactJS%20%26%20Vite-blue)](https://reactjs.org/)
[![API](https://img.shields.io/badge/Data%20Source-MockAPI.io-lightgrey)](https://mockapi.io/)

---

## Deskripsi Proyek

Aplikasi ini adalah hasil Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web, yang bertujuan untuk mengubah desain website statis Kebun Raya ITERA menjadi **Single Page Application (SPA)** yang dinamis menggunakan **React JS**.

Proyek ini fokus pada implementasi fitur-fundamental React, termasuk **Data Fetching**, **State Management**, dan **Dynamic Routing**, untuk memenuhi seluruh kriteria penilaian yang ditetapkan.

## ✨ Fitur Utama (Berdasarkan Komponen Penilaian UTS)

| Fitur UTS | Bukti Implementasi | Status |
| :--- | :--- | :--- |
| **Data Fetching** | Mengambil data koleksi tanaman dan berita dari dua *endpoint* API (MockAPI.io). | ✅ |
| **Penggunaan Custom Hook** | Dibuat dan digunakan `useFetch.js` untuk mengelola proses *fetching* data yang *reusable*. | ✅ |
| **State Management** | Menggunakan **Context API** (`FavoritesContext`) untuk mengelola *state* global fitur "Tanaman Favorit". | ✅ |
| **Routing Dinamis** | Implementasi **Dynamic Routing** (`/berita/:id`) dan *Error Page* (404). | ✅ |
| **Komponen** | Lebih dari 5 komponen fungsional yang terpisah (`Navbar`, `Koleksi`, `Hero`, dll.). | ✅ |
| **Desain & UX** | Migrasi desain responsif dari CSS lama dengan perbaikan *styling* untuk *background fixed*. | ✅ |

---

## 🛠️ Persiapan & Instalasi Lokal

Proyek ini dibangun menggunakan **Vite** sebagai *build tool* dan **ReactJS** sebagai *library* utama.

### Prasyarat
* Node.js (Versi terbaru)
* NPM/Yarn

### Langkah Menjalankan Proyek

1.  **Clone Repositori (Jika dari GitHub):**
    ```bash
    git clone [https://github.com/URL_GITHUB_ANDA/uts_pemrograman_web](https://github.com/URL_GITHUB_ANDA/uts_pemrograman_web)_[NIM].git
    cd uts_pemrograman_web_[NIM]
    ```
2.  **Instal Dependensi:**
    ```bash
    npm install
    ```
3.  **Jalankan Server Pengembangan:**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:5173`.

---

## Data API

Semua data untuk aplikasi ini bersifat dinamis dan diambil dari API *custom* yang dibuat menggunakan MockAPI.io.

| Sumber Data | Endpoint yang Digunakan | Tujuan |
| :--- | :--- | :--- |
| **Tanaman** | `https://68f99420ef8b2e621e7cae84.mockapi.io/tanaman` | Menampilkan daftar Koleksi Tanaman di Beranda. |
| **Berita** | `https://68f99420ef8b2e621e7cae84.mockapi.io/berita` | Menampilkan daftar dan detail berita, termasuk link eksternal. |

**PENTING:** Jika URL di atas mengalami masalah (misalnya sudah *expired*), ganti konstanta `API_URL` dan `API_BERITA_URL` di `src/components/Koleksi.jsx` dan `src/pages/BeritaPage.jsx` dengan *endpoint* MockAPI yang baru.

---

## 💡 Penjelasan Implementasi UTS Lanjutan

### 1. Penggunaan Custom Hook (`useFetch.js`)
Logika *data fetching* (`useState`, `useEffect`, *loading*, dan *error handling*) diisolasi ke dalam `src/hooks/useFetch.js`. Hook ini kemudian digunakan kembali di komponen `Koleksi.jsx` dan `BeritaPage.jsx`, membuat kode menjadi sangat rapi dan *reusable*.

### 2. Implementasi State Management (`FavoritesContext`)
* **Tujuan:** Mengelola *state* yang perlu dibagikan tanpa *prop drilling*.
* **Penerapan:** Dibuat `FavoritesContext.jsx` yang menyimpan array ID tanaman favorit.
    * Komponen **Koleksi** mengakses fungsi `toggleFavorite` (untuk menambah/menghapus item).
    * Komponen **FavoritesCounter** (di dalam Navbar) mengakses *state* `favorites` untuk menampilkan jumlah total item yang disukai.

### 3. Routing Dinamis
* **Rute:** Rute `/berita/:id` memungkinkan aplikasi untuk menampilkan detail berita yang berbeda tanpa harus membuat file komponen baru untuk setiap berita.
* **Mekanisme:** Komponen `BeritaDetailPage.jsx` menggunakan `useParams()` dari React Router untuk mengambil ID berita dari URL, dan kemudian menggunakan `useFetch` untuk mengambil detail spesifik berita tersebut dari API.

---

**Dibuat oleh:** [NAMA ANDA]
**NIM:** [NIM ANDA]
**Mata Kuliah:** Pemrograman Web