// Fitur ES6+: let
let ipkChartInstance = null;
let targetChartInstance = null; // Revisi 5: Instance untuk chart target

/**
 * Merender grafik IPK (Line Chart)
 * Fitur ES6+: export, const, Arrow Function, map
 */
export const renderChart = (ctx, ipData) => {
    // Fitur ES6+: const, Arrow Function, map
    const semesters = ipData.map(d => `S${d.semester}`);
    const ipkValues = ipData.map(d => d.ipk);
    const ipValues = ipData.map(d => d.ip); 

    if (ipkChartInstance) {
        ipkChartInstance.destroy();
    }

    ipkChartInstance = new Chart(ctx, { // 'Chart' diambil dari global
        type: 'line',
        data: {
            labels: semesters,
            datasets: [
                {
                    label: 'IPK (Kumulatif)',
                    data: ipkValues,
                    borderColor: '#64FFDA',
                    backgroundColor: 'rgba(100, 255, 218, 0.2)',
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'IP (Semester)',
                    data: ipValues,
                    borderColor: '#E6F1FF',
                    fill: false,
                    tension: 0.1,
                    borderDash: [5, 5] // Fitur ES6+: Array literal
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // PERBAIKAN: Agar tidak terhimpit
            scales: {
                y: { beginAtZero: true, max: 4.0, ticks: { color: '#E6F1FF' }, grid: { color: 'rgba(230, 241, 255, 0.1)' }},
                x: { ticks: { color: '#E6F1FF' }, grid: { color: 'rgba(230, 241, 255, 0.1)' }}
            },
            plugins: { 
                legend: { 
                    usePointStyle: true, // PERBAIKAN: Gunakan style kotak
                    labels: { 
                        color: '#E6F1FF',
                        align: 'start', // PERBAIKAN: Ratakan teks
                        pointStyle: 'rect', // PERBAIKAN: Paksa jadi kotak
                        useBorderDash: false // <-- TAMBAHKAN BARIS INI
                    }
                }
            }
        }
    });
};


/**
 * Revisi 5: Merender Grafik Target (Doughnut Chart)
 * Fitur ES6+: Arrow Function, Destructuring
 */
export const renderTargetChart = (ctx, stats) => {
    // Fitur ES6+: Destructuring
    const { achieved, notAchieved, pending } = stats;
    
    // Hancurkan chart lama jika ada
    if (targetChartInstance) {
        targetChartInstance.destroy();
    }
    
    targetChartInstance = new Chart(ctx, { // 'Chart' diambil dari global
        type: 'doughnut',
        data: {
            labels: ['Tercapai', 'Tidak Tercapai', 'Pending'],
            datasets: [{
                label: 'Status Target',
                data: [achieved, notAchieved, pending],
                backgroundColor: [
                    '#64FFDA', // Tercapai (Cyan)
                    '#FF6B6B', // Tidak Tercapai (Merah)
                    '#E6F1FF'  // Pending (Putih)
                ],
                borderColor: '#112240', // Warna card bg
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#E6F1FF'
                    }
                },
                title: {
                    display: true,
                    text: 'Status Pencapaian Target',
                    color: '#E6F1FF'
                }
            }
        }
    });
};