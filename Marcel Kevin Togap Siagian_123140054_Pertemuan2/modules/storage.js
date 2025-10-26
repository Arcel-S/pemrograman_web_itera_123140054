// modules/storage.js
// Fitur ES6+: export, const, Arrow Function, JSON

/**
 * Menyimpan data ke localStorage setelah mengubahnya menjadi JSON string.
 */
export const saveData = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error("Gagal menyimpan data ke localStorage:", e);
    }
};

/**
 * Memuat data dari localStorage.
 * Mengembalikan objek kosong jika tidak ada data atau terjadi error.
 */
export const loadData = (key) => {
    try {
        const data = localStorage.getItem(key);
        // Fitur ES6+: Default Parameter (via ||)
        return data ? JSON.parse(data) : {};
    } catch (e) {
        console.error("Gagal memuat data dari localStorage:", e);
        return {};
    }
};

/**
 * Menghapus item spesifik dari localStorage.
 */
export const clearData = (key) => {
    localStorage.removeItem(key);
};

/**
 * Menyimpan data ke sessionStorage.
 */
export const saveSession = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
};

/**
 * Memuat data dari sessionStorage.
 */
export const loadSession = (key) => {
    try {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
};

/**
 * Menghapus data dari sessionStorage.
 */
export const clearSession = (key) => {
    sessionStorage.removeItem(key);
};