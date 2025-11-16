Berikut adalah versi `README.md` yang telah dirombak total agar terlihat lebih **profesional**, **visual**, dan **menonjolkan sisi teknis**.

Saya telah menambahkan:

1.  **Badges Technology**: Agar terlihat modern.
2.  **Mapping Konsep OOP**: Memudahkan asisten praktikum/dosen melihat pemenuhan syarat tugas.
3.  **Placeholder Screenshot**: Area khusus untuk bukti running program.
4.  **Perbaikan Path**: Menghapus path lokal (`C:\Users\Arcel...`) agar generik dan aman untuk publik.

-----

````markdown
# 📚 Sistem Manajemen Perpustakaan (Python OOP)

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

Proyek ini adalah implementasi **Object-Oriented Programming (OOP)** untuk simulasi manajemen perpustakaan. Sistem ini dibangun sebagai tugas praktikum untuk mendemonstrasikan pemahaman mendalam mengenai 4 pilar utama OOP: *Encapsulation*, *Inheritance*, *Abstraction*, dan *Polymorphism*.

---

## 🛠️ Teknologi & Konsep

Proyek ini dibangun menggunakan *native* Python tanpa library eksternal yang berat, berfokus pada struktur kode yang bersih (*Clean Code*).

| Komponen | Keterangan |
| :--- | :--- |
| **Bahasa** | Python 3.x |
| **Paradigma** | Object-Oriented Programming (OOP) |
| **Interface** | Command Line Interface (CLI) |
| **Design Pattern** | Factory Method (Sederhana pada pembuatan objek) |

### Implementasi OOP
* ✅ **Abstract Class**: `LibraryItem` sebagai blueprint dasar.
* ✅ **Inheritance**: `Book` dan `Magazine` mewarisi sifat `LibraryItem`.
* ✅ **Encapsulation**: Penggunaan `@property`, `@setter`, dan atribut privat (`__author`).
* ✅ **Polymorphism**: Method `get_info()` memiliki perilaku berbeda di setiap subclass.

---

## 📸 Screenshot Aplikasi

> *Silakan ganti gambar di bawah ini dengan screenshot hasil terminal Anda sendiri.*

### 1. Tampilan Menu Utama
![Tampilan Menu](https://placehold.co/600x200/png?text=Screenshot+Menu+Utama+Di+Sini)

### 2. Contoh Fitur Pencarian & CRUD
![Tampilan Search](https://placehold.co/600x200/png?text=Screenshot+Hasil+Pencarian+Di+Sini)

---

## ✨ Fitur Utama

* **Interactive CRUD**: Create, Read, Update, dan Delete data Buku/Majalah secara *real-time*.
* **Smart Search**: Pencarian data berdasarkan Judul (Case-insensitive) atau ID unik.
* **Flexible Update**: Sistem update parsial (biarkan kosong jika data tidak ingin diubah).
* **Data Integrity**: Validasi ID unik saat penambahan data baru.
* **Demo Mode**: Mode otomatis untuk demonstrasi cepat tanpa input manual.

---

## 🚀 Cara Menjalankan

### Prasyarat
Pastikan Python 3.8+ sudah terinstal. Cek dengan:
```bash
python --version
````

### Langkah Instalasi

1.  **Clone atau Download Repository**

    ```bash
    git clone [https://github.com/username-anda/pemrograman_python_itera_123140054.git](https://github.com/username-anda/pemrograman_python_itera_123140054.git)
    ```

2.  **Masuk ke Direktori Project**
    Sesuaikan dengan struktur folder Anda:

    ```bash
    cd pemrograman_python_itera_123140054/marcel_123140054_pertemuan5
    ```

3.  **Jalankan Program**

      * **Mode Interaktif (User Interface):**
        ```bash
        python main.py
        ```

    <!-- end list -->

    ````
    
    * **Mode Demo (Otomatis):**
        ```bash
        python main.py --demo
    ````

-----

## 📂 Struktur File

```text
Marcel Kevin Togap Siagian_123140054 Pertemuan5/
├── main.py        # Source code utama (Class & Logic)
├── README.md      # Dokumentasi proyek
└──
```

-----

## 📝 Catatan Penggunaan

  * **ID Unik**: Pastikan memasukkan ID angka yang belum pernah digunakan.
  * **Validasi**: Jika input tahun bukan angka saat update, sistem akan mengabaikan perubahan pada field tersebut.

-----

## 👨‍💻 Author

**Marcel Kevin Togap Siagian** NIM: 123140054  
Teknik Informatika - Institut Teknologi Sumatera (ITERA)