// modules/ui.js

/**
 * Merender daftar IP Semester. (DIPERBARUI)
 * Revisi 2: Menambahkan tombol Edit
 * Fitur ES6+: Template Literals, Arrow Function, Destructuring
 */
export const renderIPList = (ipData) => {
    if (ipData.length === 0) {
        return '<p>Belum ada data IP.</p>';
    }

    return ipData.map(({ semester, ip, ipk }) => `
        <div class="ip-card">
            <div>
                <h4>Semester ${semester}</h4>
                <p>IP: ${ip} | IPK: ${ipk}</p>
            </div>
            <div class="ip-card-actions">
                <button class="edit-btn-small edit-ip-btn" data-semester="${semester}">Edit</button>
            </div>
        </div>
    `).join('');
};

/**
 * Revisi 3: Merender daftar target matakuliah (DIPERBARUI)
 * Menampilkan nilaiRiil dan tombol Edit
 * Fitur ES6+: Template Literals, Destructuring, Default Parameter
 */
export const renderMatkulList = (matkulData, showDeleteButton = false) => {
    if (matkulData.length === 0) {
        return '<p>Belum ada target matakuliah yang diinput.</p>';
    }

    return matkulData.map(({ nama, kode, sks, target, nilaiRiil }) => `
        <div class="matkul-card">
            <div>
                <h4>${nama} (${kode})</h4>
                <p>${sks} SKS | Target: ${target} | 
                   <span class="nilai-riil">Nilai Riil: ${nilaiRiil || '-'}</span>
                </p>
            </div>
            ${showDeleteButton ? 
                `<div class="matkul-card-actions">
                    <button class="edit-btn-small edit-matkul-btn" data-kode="${kode}">Edit</button>
                    <button class="delete-btn" data-kode="${kode}">Hapus</button>
                 </div>` 
                : ''
            }
        </div>
    `).join('');
};

/**
 * Revisi 1: Merender kontainer Data Diri (Diperbarui)
 * Menampilkan data dari profile dan tombol Edit
 * Fitur ES6+: Template Literals, Destructuring
 */
export const renderDataDiri = (profile) => {
    // Fitur ES6+: Destructuring dengan default value
    const { 
        nama = "N/A", 
        nim = "N/A", 
        prodi = "N/A", 
        fakultas = "N/A", 
        semester = "N/A", 
        email = "N/A" 
    } = profile || {};

    return `
        <div class="card-header-flex">
            <h2>Data Diri</h2>
            <button id="edit-profile-btn" class="btn btn-icon btn-secondary">Edit</button>
        </div>
        <div class="info-item">
            <label>Nama Lengkap</label>
            <p>${nama}</p>
        </div>
        <div class="info-item">
            <label>NIM</label>
            <p class="highlight">${nim}</p>
        </div>
        <div class="info-item">
            <label>Program Studi / Fakultas</label>
            <p>${prodi} / ${fakultas}</p>
        </div>
         <div class="info-item">
            <label>Semester</label>
            <p>${semester}</p>
        </div>
        <div class="info-item">
            <label>Email</label>
            <p>${email}</p>
        </div>
    `;
};

/**
 * Revisi 1: Merender Modal Edit Data Diri
 * Fitur ES6+: Template Literals, Destructuring
 */
export const renderDataDiriModal = (profile) => {
    const { nama, prodi, fakultas, semester, email } = profile;
    return `
    <div class="modal-content">
        <h2>Edit Data Diri</h2>
        <form id="form-edit-profile">
            <div class="form-group">
                <label for="profile-nama">Nama Lengkap</label>
                <input type="text" id="profile-nama" value="${nama}" required>
            </div>
            <div class="form-group">
                <label for="profile-prodi">Program Studi</label>
                <input type="text" id="profile-prodi" value="${prodi}" required>
            </div>
            <div class="form-group">
                <label for="profile-fakultas">Fakultas</label>
                <input type="text" id="profile-fakultas" value="${fakultas}" required>
            </div>
            <div class="form-group">
                <label for="profile-semester">Semester</label>
                <input type="number" id="profile-semester" value="${semester}" min="1" max="14" required>
            </div>
            <div class="form-group">
                <label for="profile-email">Email</label>
                <input type="email" id="profile-email" value="${email}" required>
            </div>
            <div class="modal-buttons">
                <button type="button" id="close-modal-btn" class="btn btn-secondary">Batal</button>
                <button type="submit" class="btn">Simpan</button>
            </div>
        </form>
    </div>
    `;
};

/**
 * Revisi 4: Merender Form Input Nilai Riil
 * Fitur ES6+: Template Literals, map, filter
 */
export const renderInputNilaiRiil = (matkulData) => {
    // Hanya tampilkan matkul yang BELUM diisi nilai riilnya
    const options = matkulData
        .filter(m => !m.nilaiRiil || m.nilaiRiil === '-')
        .map(m => `<option value="${m.kode}">${m.kode} - ${m.nama}</option>`)
        .join('');

    if (options.length === 0) {
        return `
        <div class="nilai-riil-form">
            <p>Semua nilai riil telah diinput.</p>
        </div>
        `;
    }

    return `
    <div class="nilai-riil-form">
        <h4>Input Nilai Riil</h4>
        <form id="form-input-riil" class="form-grid-nilai-riil">
            <select id="riil-kode" required>
                <option value="">Pilih Matkul...</option>
                ${options}
            </select>
            <select id="riil-nilai" required>
                <option value="">Pilih Nilai...</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
            </select>
            <button type="submit" class="btn">Simpan</button>
        </form>
    </div>
    `;
};


/**
 * Revisi Jadwal: Merender tabel Jadwal Kuliah dari data Mahasiswa
 * Sekarang menyertakan tombol Hapus.
 * Fitur ES6+: Template Literals, Arrow Function, map, Destructuring
 */
export const renderJadwalKuliah = (data) => {
    if (data.length === 0) {
        return `
            <p style="text-align: center; padding: 2rem 0; opacity: 0.8;">
                Belum ada jadwal yang diinput.
            </p>
        `;
    }

    // Header Tabel
    const header = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Kode MK</th>
                    <th>Mata Kuliah</th>
                    <th>Dosen Pengampu</th>
                    <th>Waktu</th>
                    <th>Ruangan</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Body Tabel
    const body = data.map(({ kode, matkul, dosen, waktu, ruangan }) => `
        <tr>
            <td>${kode}</td>
            <td>${matkul}</td>
            <td>${dosen}</td>
            <td>${waktu}</td>
            <td>${ruangan}</td>
            <td>
                <button class="delete-btn" data-kode="${kode}">Hapus</button>
            </td>
        </tr>
    `).join('');

    // Footer Tabel
    const footer = `
            </tbody>
        </table>
    `;

    return header + body + footer;
};