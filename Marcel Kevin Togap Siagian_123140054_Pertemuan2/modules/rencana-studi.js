// modules/rencana-studi.js

// Fitur ES6+: import/export
import { getCurrentUser, logoutUser, getUserData, saveUserData } from './auth.js';
import { Mahasiswa } from './mahasiswa.js';
import { renderMatkulList, renderInputNilaiRiil } from './ui.js';
import { renderTargetChart } from './chart.js';

// Fitur ES6+: let
let currentUser;
let mahasiswa;
let pieChartContext;
let editingKode = null; // Revisi 3: State untuk mode edit

/**
 * Helper untuk inisialisasi Navbar
 * Fitur ES6+: Arrow Function
 */
const initializeNavbar = () => {
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
 * Revisi 3: (BARU) Fungsi helper untuk reset form matkul
 * Fitur ES6+: const, Arrow Function
 */
const resetMatkulForm = () => {
    const form = document.getElementById('form-tambah-matkul');
    form.reset();
    form['matkul-kode'].disabled = false; // Aktifkan lagi input kode
    form.querySelector('button').textContent = 'Tambah Matkul'; // Kembalikan teks tombol
    editingKode = null; // Keluar dari mode edit
}

/**
 * Fungsi gabungan untuk me-refresh semua UI di halaman ini
 * Fitur ES6+: Arrow Function
 */
const refreshAllUI = () => {
    // Fitur ES6+: Destructuring
    const { matakuliah } = mahasiswa.getAllData();
    
    // Refresh List Matkul
    const matkulListContainer = document.getElementById('matkul-list-container');
    matkulListContainer.innerHTML = renderMatkulList(matakuliah, true);
    
    // Refresh Form Input Nilai Riil
    const nilaiRiilFormContainer = document.getElementById('nilai-riil-form-container');
    nilaiRiilFormContainer.innerHTML = renderInputNilaiRiil(matakuliah);
    
    // Refresh Grafik Target
    // Fitur ES6+: const
    const stats = mahasiswa.getTargetStats();
    renderTargetChart(pieChartContext, stats);
};


/**
 * Mengatur semua event listener untuk halaman ini (DIPERBARUI)
 * Revisi 3: Logika form dan list diubah total
 * Fitur ES6+: Arrow Function
 */
const setupEventListeners = () => {
    const matkulForm = document.getElementById('form-tambah-matkul');
    const listContainer = document.getElementById('list-container'); // Kontainer untuk list & form nilai riil

    // Event listener untuk Form Tambah/Update Matkul
    matkulForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Kumpulkan data baru dari form
        // Fitur ES6+: const
        const newData = {
            nama: matkulForm['matkul-nama'].value,
            kode: matkulForm['matkul-kode'].value,
            sks: parseInt(matkulForm['matkul-sks'].value),
            target: matkulForm['matkul-target'].value
        };

        if (editingKode) {
            // === MODE EDIT ===
            // Panggil method updateMatkul baru
            mahasiswa.updateMatkul(editingKode, newData);
            saveDataToStorage();
            refreshAllUI();
            resetMatkulForm(); // Reset form setelah update
        } else {
            // === MODE TAMBAH ===
            const sukses = mahasiswa.tambahMatkul(newData);
            if (sukses) {
                saveDataToStorage();
                refreshAllUI();
                resetMatkulForm(); // Reset form setelah tambah
            }
        }
    });

    // Event listener untuk semua tombol di dalam list (Event Delegation)
    listContainer.addEventListener('click', (e) => {
        
        // Revisi 3: Tombol EDIT MATKUL diklik
        if (e.target.classList.contains('edit-matkul-btn')) {
            const kode = e.target.dataset.kode;
            // Fitur ES6+: Arrow Function (di dalam find)
            const matkul = mahasiswa.matakuliah.find(m => m.kode === kode);
            
            if (matkul) {
                // Isi form dengan data matkul
                matkulForm['matkul-nama'].value = matkul.nama;
                matkulForm['matkul-kode'].value = matkul.kode;
                matkulForm['matkul-sks'].value = matkul.sks;
                matkulForm['matkul-target'].value = matkul.target;
                
                // Masuk ke mode edit
                editingKode = kode;
                matkulForm['matkul-kode'].disabled = true; // Nonaktifkan edit Kode MK
                matkulForm.querySelector('button').textContent = 'Update Matkul';
                
                // Scroll ke form
                matkulForm.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Tombol HAPUS MATKUL diklik
        if (e.target.classList.contains('delete-btn')) {
            const kode = e.target.dataset.kode;
            if (confirm(`Yakin ingin menghapus matakuliah ${kode}?`)) {
                
                // Jika matkul yang dihapus adalah yang sedang diedit, reset form
                if (editingKode === kode) {
                    resetMatkulForm();
                }
                
                mahasiswa.hapusMatkul(kode);
                saveDataToStorage();
                refreshAllUI();
            }
        }
    });

    // Event Listener untuk Form Input Nilai Riil
    listContainer.addEventListener('submit', (e) => {
        if (e.target.id === 'form-input-riil') {
            e.preventDefault();
            const form = e.target;
            const kode = form['riil-kode'].value;
            const nilai = form['riil-nilai'].value;
            
            if (!kode || !nilai) {
                alert("Harap pilih matakuliah dan nilai.");
                return;
            }
            
            mahasiswa.updateNilaiRiil(kode, nilai);
            saveDataToStorage();
            refreshAllUI();
        }
    });
};

/**
 * Fungsi utama untuk halaman Rencana Studi
 * Fitur ES6+: async/await
 */
async function initializePage() {
    currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Anda harus login terlebih dahulu.');
        window.location.href = 'index.html';
        return;
    }

    initializeNavbar();
    
    pieChartContext = document.getElementById('target-chart').getContext('2d');
    
    // Fitur ES6+: const, await
    const data = await loadAcademicData(currentUser);
    mahasiswa = new Mahasiswa(currentUser, data);
    
    refreshAllUI();
    setupEventListeners();
}

// Jalankan inisialisasi
document.addEventListener('DOMContentLoaded', initializePage);