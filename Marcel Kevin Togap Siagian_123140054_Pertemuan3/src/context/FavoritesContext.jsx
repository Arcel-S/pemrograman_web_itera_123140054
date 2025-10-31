import React, { createContext, useContext, useState } from 'react';

// 1. Membuat Context
const FavoritesContext = createContext();

// 2. Membuat custom hook agar lebih mudah digunakan
export function useFavorites() {
  return useContext(FavoritesContext);
}

// 3. Membuat Provider yang akan menyediakan state dan fungsi
export function FavoritesProvider({ children }) {
  // State untuk menyimpan daftar ID tanaman favorit dalam sebuah array
  const [favorites, setFavorites] = useState([]);

  // Fungsi untuk menambah atau menghapus ID dari array favorites
  const toggleFavorite = (tanamanId) => {
    setFavorites((prevFavorites) => {
      // Cek apakah ID sudah ada di dalam array
      if (prevFavorites.includes(tanamanId)) {
        // Jika sudah ada, kembalikan array baru yang sudah difilter (tanpa ID tersebut)
        return prevFavorites.filter((id) => id !== tanamanId);
      } else {
        // Jika belum ada, kembalikan array baru dengan tambahan ID tersebut
        return [...prevFavorites, tanamanId];
      }
    });
  };

  // Nilai yang akan dibagikan ke seluruh aplikasi
  const value = {
    favorites,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}