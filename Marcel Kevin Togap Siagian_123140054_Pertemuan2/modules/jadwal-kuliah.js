// modules/jadwal-kuliah.js

// Fitur ES6+: import/export
import { getCurrentUser, logoutUser, getUserData, saveUserData } from './auth.js';
import { Mahasiswa } from './mahasiswa.js';
import { renderJadwalKuliah } from './ui.js';
// Hapus import dummySchedule

// Fitur ES6+: let
let currentUser;
let mahasiswa;

/**
 * Helper untuk inisialisasi Navbar
 * Fitur ES6+: Arrow Function, const
 */
const initializeNavbar = (currentUser) => {
    document.getElementById('welcome-message').textContent = `Selamat datang, ${currentUser}`;
    document.getElementById('logout-btn-nav').addEventListener('click', logoutUser);
};

/**
 * Simulasi memuat data (Fitur ES6+: Promise, async/await)
 */
async function loadAcademicData(username) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getUserData(username);
}

/**
 * Fungsi untuk menyimpan semua data mahasiswa ke localStorage.
 * Fitur ES6+: const, Arrow Function
 */
const saveDataToStorage = () => {
    const allData = mahasiswa.getAllData();
    saveUserData(currentUser, allData);
};

/**
 * Merender ulang tabel jadwal
 * Fitur ES6+: Arrow Function
 */
const refreshJadwalTable = () => {
    // Fitur ES6+: Destructuring
    const { jadwal } = mahasiswa.getAllData();
    const container = document.getElementById('jadwal-table-container');
    container.innerHTML = renderJadwalKuliah(jadwal);
};

/**
 * Mengatur event listener untuk form dan tabel
 * Fitur ES6+: Arrow Function, const
 */
const setupEventListeners = () => {
    const form = document.getElementById('form-tambah-jadwal');
    const tableContainer = document.getElementById('jadwal-table-container');

    // Event listener untuk submit form
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Ambil data dari form
        // Fitur ES6+: Destructuring
        const { 
            'jadwal-kode': kodeEl, 
            'jadwal-matkul': matkulEl, 
            'jadwal-dosen': dosenEl,
            'jadwal-waktu': waktuEl,
            'jadwal-ruangan': ruanganEl
        } = form.elements;
        
        const jadwalBaru = {
            kode: kodeEl.value,
            matkul: matkulEl.value,
            dosen: dosenEl.value,
            waktu: waktuEl.value,
            ruangan: ruanganEl.value
        };
        
        // Panggil method class Mahasiswa, cek sukses atau tidak
        const sukses = mahasiswa.tambahJadwal(jadwalBaru);
        
        if (sukses) {
            saveDataToStorage();
            refreshJadwalTable();
            form.reset(); // Reset form hanya jika sukses
        }
    });

    // Event listener untuk tombol Hapus (Event Delegation)
    tableContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const kode = e.target.dataset.kode;
            if (confirm(`Yakin ingin menghapus jadwal ${kode}?`)) {
                mahasiswa.hapusJadwal(kode);
                saveDataToStorage();
                refreshJadwalTable();
            }
        }
    });
};

/**
 * Fungsi utama untuk halaman Jadwal Kuliah
 * Fitur ES6+: async/await
 */
async function initializePage() {
    currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Anda harus login terlebih dahulu.');
        window.location.href = 'index.html';
        return;
    }

    initializeNavbar(currentUser);

    // Fitur ES6+: const, await
    const data = await loadAcademicData(currentUser);
    mahasiswa = new Mahasiswa(currentUser, data); // Fitur ES6+: Class
    
    refreshJadwalTable();
    setupEventListeners();
}

// Jalankan inisialisasi
document.addEventListener('DOMContentLoaded', initializePage);