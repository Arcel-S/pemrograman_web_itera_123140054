# 📚 Sistem Manajemen Perpustakaan (Python OOP)

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

Proyek ini adalah implementasi **Object-Oriented Programming (OOP)** untuk simulasi manajemen perpustakaan. Sistem ini dibangun sebagai tugas praktikum untuk mendemonstrasikan pemahaman mengenai 4 pilar utama OOP: *Encapsulation*, *Inheritance*, *Abstraction*, dan *Polymorphism*.

---

## 🛠️ Teknologi & Konsep

Proyek ini menggunakan Python standar tanpa dependensi eksternal, berfokus pada struktur kode yang bersih (*Clean Code*).

| Komponen | Keterangan |
| :--- | :--- |
| **Bahasa** | Python 3.x |
| **Paradigma** | Object-Oriented Programming (OOP) |
| **Interface** | Command Line Interface (CLI) |
| **Design Pattern** | Sederhana (pembuatan objek terpisah) |

### Implementasi OOP
* ✅ **Abstract Class**: `LibraryItem` sebagai blueprint dasar.
* ✅ **Inheritance**: `Book` dan `Magazine` mewarisi `LibraryItem`.
* ✅ **Encapsulation**: Penggunaan `@property`, `@setter`, dan atribut privat (`__author`).
* ✅ **Polymorphism**: Method `get_info()` berbeda pada setiap subclass.

---

## 🏗️ Desain Sistem (Class Diagram)

```mermaid
classDiagram
  class LibraryItem {
    <<Abstract>>
    #item_id
    #title
    +year
    +get_info()
  }

  class Book {
    -author
    +get_info()
  }

  class Magazine {
    +edition
    +get_info()
  }

  class Library {
    -items
    +add_item()
    +show_items()
    +search_item()
    +update_item()
    +remove_item()
  }

  LibraryItem <|-- Book : Inherits
  LibraryItem <|-- Magazine : Inherits
  Library o-- LibraryItem : Aggregates
```

## 📸 Screenshot Aplikasi

### 1. Tampilan Menu Utama

<img src="https://github.com/user-attachments/assets/46f2635e-96c5-4eae-ab95-6155acd5a716" alt="Menu Utama" width="600" />

### 2. Tambah Item

<img src="https://github.com/user-attachments/assets/82f15ce6-a400-4153-89c9-7678506102fd" alt="Tambah Item" width="600" />

### 3. Tampilkan Item

<img src="https://github.com/user-attachments/assets/c9c6adb1-1680-4ce3-82b0-2d8d5bcce312" alt="Tampilkan Item" width="600" />

### 4. Cari Item

<img src="https://github.com/user-attachments/assets/ed5e822e-42dc-4c3a-9e82-6f66bcfb645d" alt="Cari Item" width="600" />

### 5. Update Item

<img src="https://github.com/user-attachments/assets/c160fd30-09f4-4bb2-b926-c71a38a73045" alt="Update Item" width="600" />

### 6. Keluar

<img src="https://github.com/user-attachments/assets/ff538599-c84f-48ba-b879-99692aabe445" alt="Keluar" width="400" />

---

## ✨ Fitur Utama

* **Interactive CRUD**: Create, Read, Update, dan Delete data Buku/Majalah.
* **Smart Search**: Pencarian berdasarkan Judul (case-insensitive) atau ID unik.
* **Flexible Update**: Update parsial — biarkan kosong untuk mempertahankan nilai lama.
* **Data Integrity**: Validasi ID unik saat penambahan.
* **Demo Mode**: Mode otomatis untuk demonstrasi cepat.

---

## 🚀 Cara Menjalankan

### Prasyarat

Pastikan Python 3.8+ terinstal. Periksa versi dengan:

```bash
python --version
```

### Langkah Singkat

1. Clone atau download repository:

```bash
git clone https://github.com/username-anda/pemrograman_python_itera_123140054.git
```

2. Masuk ke direktori project (sesuaikan path jika perlu):

```bash
cd pemrograman_python_itera_123140054/marcel_123140054_pertemuan5
```

3. Jalankan program:

* Mode interaktif:

```bash
python main.py
```

* Mode demo (non-interaktif):

```bash
python main.py --demo
```

---

## 📂 Struktur File

```text
Marcel Kevin Togap Siagian_123140054 Pertemuan5/
├── main.py        # Source code utama (Class & Logic)
└── README.md      # Dokumentasi proyek
```

---

## 📝 Catatan Penggunaan

* **ID Unik**: Masukkan ID (angka) yang belum digunakan.
* **Validasi Tahun**: Jika memasukkan tahun yang bukan angka saat update, perubahan tahun akan diabaikan.

---

## 👨‍💻 Author

**Marcel Kevin Togap Siagian** - NIM: 123140054  
Teknik Informatika - Institut Teknologi Sumatera (ITERA)

---