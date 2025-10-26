// modules/mahasiswa.js

// Fitur ES6+: class, constructor, export
export class Mahasiswa {
    constructor(username, data) {
        this.username = username;
        
        // Fitur ES6+: Default Parameters (via ||), Template Literals
        this.profile = data?.profile || {
            nama: "Mahasiswa", nim: username, prodi: "Teknik Informatika",
            fakultas: "Fakultas Teknik", semester: 1, email: `${username}@itera.ac.id`
        };
        
        this.ip = data?.ip || [];
        this.matakuliah = data?.matakuliah || [];
        this.jadwal = data?.jadwal || [];
    }

    /**
     * Revisi 1: Method untuk update profile
     * Fitur ES6+: Spread Operator
     */
    updateProfile(newProfileData) {
        this.profile = { ...this.profile, ...newProfileData };
    }

    /**
     * Revisi 2: Menambah/Update data IP dan menghitung ulang IPK.
     * Logika ini sudah otomatis menangani 'edit'
     * Fitur ES6+: Arrow Function (di dalam map), filter
     */
    tambahIP(semester, ip) {
        // Hapus data lama (jika ada) untuk semester ini (untuk handle edit)
        this.ip = this.ip.filter(item => item.semester !== semester);

        // Tambah data baru
        this.ip.push({ semester, ip });

        // Sortir array berdasarkan semester
        this.ip.sort((a, b) => a.semester - b.semester);

        // Hitung ulang semua IPK
        let totalIPSum = 0;
        this.ip = this.ip.map((item, index) => {
            totalIPSum += item.ip;
            const semesterCount = index + 1;
            const newIPK = totalIPSum / semesterCount;

            return {
                semester: item.semester,
                ip: item.ip,
                ipk: parseFloat(newIPK.toFixed(2))
            };
        });
    }

    /**
     * Revisi 3: Menambah matakuliah baru.
     * Fitur ES6+: Destructuring
     */
    tambahMatkul({ nama, kode, sks, target }) {
        if (this.matakuliah.some(m => m.kode === kode)) {
            alert('Error: Kode matakuliah sudah ada.');
            return false;
        }
        this.matakuliah.push({ nama, kode, sks, target, nilaiRiil: '-' });
        return true;
    }

    /**
     * Revisi 3: (BARU) Method untuk update matakuliah
     * Fitur ES6+: Arrow Function, findIndex, Spread Operator
     */
    updateMatkul(kode, newData) {
        const index = this.matakuliah.findIndex(m => m.kode === kode);
        if (index !== -1) {
            // Update data matkul, tapi pertahankan nilaiRiil yang mungkin sudah ada
            // Fitur ES6+: Spread Operator
            this.matakuliah[index] = {
                ...this.matakuliah[index], // Pertahankan nilaiRiil
                ...newData // Timpa dengan data baru dari form
            };
        }
    }

    /**
     * Menghapus matakuliah berdasarkan kode.
     * Fitur ES6+: Arrow Function, filter
     */
    hapusMatkul(kode) {
        this.matakuliah = this.matakuliah.filter(m => m.kode !== kode);
    }

    /**
     * Method untuk update nilai riil
     * Fitur ES6+: Arrow Function, findIndex, const
     */
    updateNilaiRiil(kode, nilaiRiil) {
        const index = this.matakuliah.findIndex(m => m.kode === kode);
        if (index !== -1) {
            this.matakuliah[index].nilaiRiil = nilaiRiil;
        }
    }

    /**
     * Method untuk menghitung statistik target
     * Fitur ES6+: const, forEach, Arrow Function
     */
    getTargetStats() {
        const gradeValues = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'E': 0, '-': -1 };
        let achieved = 0;
        let notAchieved = 0;
        let totalWithRiil = 0;
        
        this.matakuliah.forEach(m => {
            if (m.nilaiRiil && m.nilaiRiil !== '-') {
                totalWithRiil++;
                const targetValue = gradeValues[m.target] || 0;
                const riilValue = gradeValues[m.nilaiRiil] || 0;
                
                if (riilValue >= targetValue) {
                    achieved++;
                } else {
                    notAchieved++;
                }
            }
        });
        const pending = this.matakuliah.length - totalWithRiil;
        return { achieved, notAchieved, pending };
    }

    /**
     * Menambah jadwal baru
     * Fitur ES6+: Destructuring
     */
    tambahJadwal({ kode, matkul, dosen, waktu, ruangan }) {
         if (this.jadwal.some(j => j.kode === kode)) {
            alert('Error: Kode MK pada jadwal sudah ada.');
            return false;
        }
        this.jadwal.push({ kode, matkul, dosen, waktu, ruangan });
        return true;
    }

    /**
     * Menghapus jadwal berdasarkan kode
     * Fitur ES6+: filter
     */
    hapusJadwal(kode) {
        this.jadwal = this.jadwal.filter(j => j.kode !== kode);
    }

    /**
     * Mengembalikan seluruh data untuk disimpan. (Diperbarui)
     */
    getAllData() {
        return {
            profile: this.profile,
            ip: this.ip,
            matakuliah: this.matakuliah,
            jadwal: this.jadwal
        };
    }
}