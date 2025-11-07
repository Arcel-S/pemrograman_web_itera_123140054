# 🎓 Student Grade Management System CLI

![Python Badge](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python)
![License Badge](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Maintenance Badge](https://img.shields.io/badge/Maintained-Yes-brightgreen?style=for-the-badge)

---

## ✨ Tentang Proyek

Program ini dirancang untuk membantu dosen atau tenaga pengajar dalam mengelola data nilai mahasiswa. Tidak sekadar pencatat nilai, sistem ini bertindak sebagai **asisten cerdas** yang otomatis menangani perhitungan bobot, konversi grade huruf, hingga pengurutan ranking kelas secara *real-time*.

Dibangun dengan **Python 3.10+**, program ini memanfaatkan fitur modern seperti `match-case` untuk struktur kode yang lebih bersih dan keterbacaan yang lebih baik.

---

## 🚀 Fitur Unggulan (Highlights)

Apa yang membuat program ini berbeda dari program nilai biasa?

### 🛡️ 1. Validasi Input yang Kuat (Robust Validation)
Program ini "anti-error" karena dilengkapi validasi berlapis saat input data baru:
* **Nama**: Hanya menerima huruf, spasi, dan tanda petik/hubung (mencegah input angka/simbol aneh di nama).
* **NIM**: Memastikan input hanya berupa digit angka.
* **Nilai**: Menjaga agar nilai yang dimasukkan hanya berada dalam rentang logis (0-100).

### 📊 2. Auto-Sorting & Real-time Calculation
* **Peringkat Otomatis**: Setiap kali data ditampilkan, tabel otomatis terurut dari mahasiswa dengan nilai tertinggi ke terendah.
* **Perhitungan Langsung**: Tidak perlu menekan tombol "hitung". Semua nilai akhir dan grade diperbarui otomatis setiap kali ada perubahan data.

### 📱 3. Tampilan Tabel yang Rapi
Data disajikan menggunakan *formatted string* yang presisi, menghasilkan tampilan tabel yang mudah dibaca langsung di terminal tanpa berantakan.

---

## 🧮 Sistem Penilaian

Program ini menggunakan formula perhitungan standar akademik dengan bobot sebagai berikut:

| Komponen | Bobot (%) |
| :--- | :--- |
| **UTS (Ujian Tengah Semester)** | 30% |
| **UAS (Ujian Akhir Semester)** | 40% |
| **Tugas** | 30% |

$$Nilai Akhir = (UTS \times 0.3) + (UAS \times 0.4) + (Tugas \times 0.3)$$

### Konversi Grade Huruf

| Nilai Akhir | Grade | Status |
| :--- | :---: | :--- |
| 80 - 100 | **A** | Sangat Baik |
| 70 - 79 | **B** | Baik |
| 60 - 69 | **C** | Cukup |
| 50 - 59 | **D** | Kurang |
| < 50 | **E** | Gagal |

---

## 🛠️ Cara Instalasi dan Penggunaan

### Prasyarat
* Pastikan Anda telah menginstal **Python 3.10** atau versi yang lebih baru (karena program menggunakan fitur `match-case`).

### Langkah-langkah
1.  **Clone** repositori ini atau unduh file `main.py`.
2.  Buka terminal atau CMD di direktori folder proyek.
3.  Jalankan perintah:
    ```bash
    python main.py
    ```
4.  Program siap digunakan! Gunakan menu angka (0-5) untuk navigasi.

---

## 📂 Struktur Menu

Saat dijalankan, Anda akan disuguhkan menu interaktif berikut:

1.  **Tampilkan Data Nilai Mahasiswa** (Otomatis terurut ranking tertinggi)
2.  **Tambah Data Mahasiswa** (Dengan validasi input)
3.  **Tampilkan Rata-rata Nilai Kelas** (Statistik cepat performa kelas)
4.  **Filter Mahasiswa Berdasarkan Grade** (Mencari siapa saja yang mendapat A, B, dst)
5.  **Cari Nilai Tertinggi dan Terendah** (Menemukan juara kelas dan yang perlu remedial)
0.  **Keluar Program**

---

## 🤝 Kontribusi

Kontribusi sangat terbuka! Jika Anda memiliki ide untuk fitur baru (misalnya: *export* ke CSV, atau nambah bobot kuis), silakan buat *Pull Request* atau buka *Issue*.

---