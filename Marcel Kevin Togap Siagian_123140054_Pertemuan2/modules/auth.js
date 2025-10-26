// modules/auth.js

import { saveData, loadData, saveSession, loadSession, clearSession } from './storage.js';

const USERS_KEY = 'users';

/**
 * Simulasi delay untuk proses asynchronous.
 * Fitur ES6+: Arrow Function, Promise
 */
const dummyDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mendaftarkan user baru (DIPERBARUI)
 * Inisialisasi 'profile', 'jadwal: []'
 * Fitur ES6+: async/await, Template Literals, const
 */
export const registerUser = async (username, password) => {
    await dummyDelay(); 
    const allUsers = loadData(USERS_KEY);

    if (allUsers[username]) {
        throw new Error('Username (NIM) sudah terdaftar.');
    }

    allUsers[username] = {
        password: password, // Di dunia nyata, ini harus di-hash
        data: {
            // Revisi 1: Tambahkan objek profile
            profile: {
                nama: "Mahasiswa",
                nim: username, // Otomatis isi NIM
                prodi: "Teknik Informatika",
                fakultas: "Fakultas Teknik",
                semester: 1, // Default
                email: `${username}@itera.ac.id` // Default
            },
            ip: [],
            matakuliah: [],
            jadwal: [] // Revisi Jadwal: Tambahkan array jadwal
        }
    };

    saveData(USERS_KEY, allUsers);
    console.log('User baru terdaftar:', username);
    return { success: true, user: username };
};

/**
 * Mencoba login user.
 * Fitur ES6+: async/await, const
 */
export const loginUser = async (username, password) => {
    await dummyDelay(); // Simulasi validasi async
    const allUsers = loadData(USERS_KEY);
    
    const user = allUsers[username];

    if (user && user.password === password) {
        // Sukses login, simpan user aktif di sessionStorage
        saveSession('currentUser', username);
        return { success: true, user: username };
    } else {
        throw new Error('Username atau password salah.');
    }
};

/**
 * Mengambil data user yang sedang login dari sessionStorage.
 * Fitur ES6+: Arrow Function
 */
export const getCurrentUser = () => {
    return loadSession('currentUser');
};

/**
 * Logout user.
 * Fitur ES6+: Arrow Function
 */
export const logoutUser = () => {
    clearSession('currentUser');
    console.log('User logged out.');
    window.location.href = 'index.html'; // Redirect ke halaman login
};

/**
 * Mengambil data akademik milik user yang sedang aktif.
 * Fitur ES6+: Arrow Function, Default Parameter (via ||)
 */
export const getUserData = (username) => {
    const allUsers = loadData(USERS_KEY);
    return allUsers[username]?.data || null;
};

/**
 * Menyimpan data akademik untuk user yang sedang aktif.
 * Fitur ES6+: Arrow Function
 */
export const saveUserData = (username, data) => {
    const allUsers = loadData(USERS_KEY);
    if (allUsers[username]) {
        allUsers[username].data = data;
        saveData(USERS_KEY, allUsers);
    } else {
        console.error('Gagal menyimpan: User tidak ditemukan.');
    }
};