// modules/dashboard.js

// Fitur ES6+: import/export
import { getCurrentUser, logoutUser, getUserData, saveUserData } from './auth.js';
import { Mahasiswa } from './mahasiswa.js';
import { 
    renderIPList, 
    renderMatkulList, 
    renderDataDiri, 
    renderDataDiriModal 
} from './ui.js';
import { renderChart } from './chart.js';

// Fitur ES6+: let
let currentUser;
let mahasiswa;
let chartContext;
let modalOverlay; // Revisi 1: Referensi ke Modal

/**
 * Helper untuk inisialisasi Navbar
 * Fitur ES6+: Arrow Function, const
 */
const initializeNavbar = () => {
    document.getElementById('welcome-message').textContent = `Selamat datang, ${currentUser}`;
    document.getElementById('logout-btn-nav').addEventListener('click', logoutUser);
};

/**
 * Fungsi utama untuk memuat dan merender seluruh dashboard.
 * Fitur ES6+: async/await
 */
async function initializeDashboard() {
    currentUser = getCurrentUser();
    
    if (!currentUser) {
        alert('Anda harus login terlebih dahulu.');
        window.location.href = 'index.html';
        return;
    }

    initializeNavbar();
    
    // Fitur ES6+: const, await, Promise
    const data = await loadAcademicData(currentUser);
    
    // Fitur ES6+: Class
    mahasiswa = new Mahasiswa(currentUser, data);
    
    chartContext = document.getElementById('ipk-chart').getContext('2d');
    
    // Revisi 1: Inisialisasi Modal Overlay
    modalOverlay = document.getElementById('modal-container');

    refreshUI();
    setupEventListeners();
}

/**
 * Simulasi memuat data (Fitur ES6+: Promise, async/await)
 */
async function loadAcademicData(username) {
    // Fitur ES6+: Promise
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
 * Merender ulang semua bagian UI
 * Fitur ES6+: Destructuring
 */
function refreshUI() {
    // Fitur ES6+: Destructuring
    const { ip, matakuliah, profile } = mahasiswa.getAllData();

    // Revisi 1: Render Kontainer Data Diri
    const dataDiriContainer = document.getElementById('data-diri-container');
    dataDiriContainer.innerHTML = renderDataDiri(profile);
    
    // Revisi 1: Render Konten Modal
    modalOverlay.innerHTML = renderDataDiriModal(profile);

    // Render Kontainer IP
    const ipListContainer = document.getElementById('ip-list-container');
    ipListContainer.innerHTML = renderIPList(ip);

    // Revisi 2: Render Kontainer Matkul
    const matkulListContainer = document.getElementById('matkul-list-container');
    matkulListContainer.innerHTML = renderMatkulList(matakuliah, false); // false = jangan tunjukkan tombol hapus

    // Revisi 2: Render Kontainer Grafik IPK
    renderChart(chartContext, ip);
}

/**
 * Mengatur semua event listener (DIPERBARUI)
 * Revisi 2: Menambahkan listener untuk Edit IP
 * Fitur ES6+: Arrow Function
 */
function setupEventListeners() {
    const ipForm = document.getElementById('form-tambah-ip');
    const ipListContainer = document.getElementById('ip-list-container');

    // Form Tambah/Update IP
    ipForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Logika tambahIP sudah otomatis menangani edit (karena me-replace semester)
        mahasiswa.tambahIP(
            parseInt(ipForm['ip-semester'].value), 
            parseFloat(ipForm['ip-value'].value)
        );
        saveDataToStorage();
        refreshUI();
        ipForm.reset();
    });

    // Revisi 2: Event Listener untuk Edit IP (Event Delegation)
    ipListContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-ip-btn')) {
            const semester = e.target.dataset.semester;
            const ipData = mahasiswa.ip.find(item => item.semester == semester);
            
            if (ipData) {
                // Isi form dengan data yang ada
                ipForm['ip-semester'].value = ipData.semester;
                ipForm['ip-value'].value = ipData.ip;
                // Fokus ke form agar user tahu
                ipForm['ip-semester'].focus();
            }
        }
    });


    // Revisi 1: Event Listener untuk Modal Edit Profile
    const dataDiriContainer = document.getElementById('data-diri-container');
    
    // Tampilkan Modal
    dataDiriContainer.addEventListener('click', (e) => {
        if (e.target.id === 'edit-profile-btn') {
            modalOverlay.classList.add('show');
        }
    });

    // Sembunyikan Modal (saat klik overlay atau tombol batal)
    modalOverlay.addEventListener('click', (e) => {
        if (e.target.id === 'modal-container' || e.target.id === 'close-modal-btn') {
            modalOverlay.classList.remove('show');
        }
    });
    
    // Submit Modal
    modalOverlay.addEventListener('submit', (e) => {
        if (e.target.id === 'form-edit-profile') {
            e.preventDefault();
            const form = e.target;
            
            // Fitur ES6+: const
            const newProfileData = {
                nama: form['profile-nama'].value,
                prodi: form['profile-prodi'].value,
                fakultas: form['profile-fakultas'].value,
                semester: parseInt(form['profile-semester'].value),
                email: form['profile-email'].value
            };
            
            // Panggil method class Mahasiswa
            mahasiswa.updateProfile(newProfileData);
            saveDataToStorage();
            refreshUI(); // Render ulang UI dengan data baru
            
            modalOverlay.classList.remove('show'); // Tutup modal
        }
    });
}

// Jalankan inisialisasi
document.addEventListener('DOMContentLoaded', initializeDashboard);