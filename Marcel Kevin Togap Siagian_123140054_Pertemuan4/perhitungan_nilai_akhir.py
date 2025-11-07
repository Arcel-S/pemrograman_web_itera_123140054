# Inisialisasi Data Mahasiswa
data_mahasiswa = [
    {
        'nama': 'Rifki Pratama',
        'NIM': '123140087',
        'nilai_uts': 92,
        'nilai_uas': 88,
        'nilai_tugas': 95
    },
    {
        'nama': 'Siti Nurhaliza',
        'NIM': '123140023',
        'nilai_uts': 75,
        'nilai_uas': 80,
        'nilai_tugas': 78
    },
    {
        'nama': 'Agung Mulyono',
        'NIM': '123140112',
        'nilai_uts': 60,
        'nilai_uas': 55,
        'nilai_tugas': 65
    },
    {
        'nama': 'Putri Handayani',
        'NIM': '123140009',
        'nilai_uts': 85,
        'nilai_uas': 90,
        'nilai_tugas': 88
    },
    {
        'nama': 'Zainal Arifin',
        'NIM': '123140156',
        'nilai_uts': 40,
        'nilai_uas': 50,
        'nilai_tugas': 45
    }
]

import re

# Fungsi Perhitungan Nilai akhir dan Grade
def hitung_nilai_akhir(uts: int, uas: int, tugas: int) -> float:
    """Menghitung nilai akhir berdasarkan bobot."""
    return (uts * 0.30) + (uas * 0.40) + (tugas * 0.30)

def tentukan_grade(nilai_akhir: float) -> str:
    """Menentukan grade huruf berdasarkan nilai akhir."""
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

# Fungsi Pembaruan Data
def perbarui_data_nilai(data: list) -> list:
    """
    Helper untuk memastikan semua data memiliki key 'nilai_akhir' dan 'grade' terbaru.
    """
    for mhs in data:
        mhs['nilai_akhir'] = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        mhs['grade'] = tentukan_grade(mhs['nilai_akhir'])
    return data

# Fungsi Fitur
def tampilkan_data(data: list):
    """
    Menampilkan tabel data.
    Otomatis mengurutkan berdasarkan nilai akhir tertinggi sebelum ditampilkan.
    """
    if not data:
        print("--- Tidak ada data untuk ditampilkan.")
        return

    # Sorting data agar yang nilai tertinggi muncul paling atas
    data_terurut = sorted(data, key=lambda mhs: mhs.get('nilai_akhir', 0), reverse=True)

    print("-" * 80)
    print(f"| {'NAMA':<20} | {'NIM':<10} | {'UTS':<5} | {'UAS':<5} | {'TUGAS':<7} | {'AKHIR':<6} | {'GRADE':<5} |")
    print("-" * 80)

    for mhs in data_terurut:
        print(f"| {mhs['nama']:<20} | {mhs['NIM']:<10} | {mhs['nilai_uts']:<5} | {mhs['nilai_uas']:<5} | {mhs['nilai_tugas']:<7} | {mhs['nilai_akhir']:<6.2f} | {mhs['grade']:<5} |")
    
    print("-" * 80)

def tambah_mahasiswa_baru() -> dict:
    """Meminta input user untuk data baru dengan validasi sederhana."""
    print("\n--- Menambah Data Mahasiswa Baru ---")
    # Validasi nama: harus berupa kata (hanya huruf dan spasi)
    while True:
        nama = input("Masukkan Nama: ").strip()
        if not nama:
            print("--- ERROR: Nama tidak boleh kosong.")
            continue
        # Hanya huruf, spasi, dan tanda hubung/minus jika perlu
        if not re.match(r"^[A-Za-z\s'-]+$", nama):
            print("--- ERROR: Nama hanya boleh berisi huruf, spasi, tanda '-' atau '\''.")
            continue
        break

    # Validasi NIM: harus berupa angka (hanya digit) dan akan disimpan sebagai int
    while True:
        nim_input = input("Masukkan NIM: ").strip()
        if not nim_input:
            print("--- ERROR: NIM tidak boleh kosong.")
            continue
        # Pastikan hanya digit
        if not nim_input.isdigit():
            print("--- ERROR: NIM harus berupa angka (hanya digit).")
            continue
        # Konversi ke int (aman karena sudah isdigit)
        try:
            nim = int(nim_input)
        except ValueError:
            print("--- ERROR: NIM tidak valid.")
            continue
        break

    # Validasi nilai: harus integer dan 0 <= nilai <= 100
    while True:
        try:
            uts = int(input("Masukkan Nilai UTS: "))
            uas = int(input("Masukkan Nilai UAS: "))
            tugas = int(input("Masukkan Nilai Tugas: "))
        except ValueError:
            print("--- ERROR: Nilai harus berupa angka bulat.")
            continue

        # Range check
        if not (0 <= uts <= 100):
            print("--- ERROR: Nilai UTS harus antara 0 dan 100.")
            continue
        if not (0 <= uas <= 100):
            print("--- ERROR: Nilai UAS harus antara 0 dan 100.")
            continue
        if not (0 <= tugas <= 100):
            print("--- ERROR: Nilai Tugas harus antara 0 dan 100.")
            continue
        break

    return {
        'nama': nama,
        'NIM': nim,
        'nilai_uts': uts,
        'nilai_uas': uas,
        'nilai_tugas': tugas
    }

def cari_nilai_ekstrem(data: list):
    """Menampilkan mahasiswa nilai tertinggi dan terendah dalam format tabel."""
    if not data:
        print(" --- Data masih kosong.")
        return
        
    tertinggi = max(data, key=lambda mhs: mhs['nilai_akhir'])
    terendah = min(data, key=lambda mhs: mhs['nilai_akhir'])

    print(f"\n--- Nilai Tertinggi dan Terendah ---")
    tampilkan_data([tertinggi, terendah]) 

def saring_berdasar_grade(data: list):
    """Menampilkan hanya mahasiswa dengan grade tertentu."""
    if not data:
        print("--- Data masih kosong.")
        return
        
    grade_dicari = input("Masukkan Grade yang ingin dicari (A/B/C/D/E): ").upper()
    hasil = [mhs for mhs in data if mhs['grade'] == grade_dicari]
    
    if not hasil:
        print(f"--- Tidak ditemukan mahasiswa dengan grade '{grade_dicari}'.")
    else:
        print(f"\n--- Mahasiswa dengan Grade '{grade_dicari}' ---")
        tampilkan_data(hasil)

def hitung_rata_rata(data: list) -> float:
    """Menghitung rata-rata nilai akhir kelas."""
    if not data: return 0.0
    return sum(mhs['nilai_akhir'] for mhs in data) / len(data)

def tampilkan_menu():
    """Menampilkan menu pilihan."""
    print("\n--- Program Pengelolaan Nilai Mahasiswa ---")
    print("1. Tampilkan Data Nilai Mahasiswa (Terurut)")
    print("2. Tambah Data Mahasiswa")
    print("3. Tampilkan Rata-rata Nilai Kelas")
    print("4. Filter Mahasiswa Berdasarkan Grade")
    print("5. Cari Nilai Tertinggi dan Terendah")
    print("0. Keluar Program")
    return input("Pilih menu (0-5): ")

# Main Loop
def utama():
    data = data_mahasiswa # Menggunakan data statis
    
    while True:
        data = perbarui_data_nilai(data)
        pilihan = tampilkan_menu()
        
        match pilihan:
            case '1':
                print(" " * 20, "\n--- Data Nilai Mahasiswa ---")
                tampilkan_data(data)
            case '2':
                data.append(tambah_mahasiswa_baru())
                print("--- Data berhasil ditambahkan.")
            case '3':
                print(f"\n--- Rata-rata nilai kelas: {hitung_rata_rata(data):.2f}")
            case '4':
                saring_berdasar_grade(data)
            case '5':
                cari_nilai_ekstrem(data)
            case '0':
                print("--- Program selesai.")
                break
            case _:
                print("--- Pilihan tidak valid.")

if __name__ == "__main__":
    utama()