import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi abort untuk membersihkan proses fetch jika komponen di-unmount
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server.');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Fungsi cleanup yang akan dijalankan saat komponen "menghilang"
    return () => {
      abortController.abort();
    };
  }, [url]); // Hook akan berjalan kembali jika URL berubah

  return { data, loading, error };
}

export default useFetch;