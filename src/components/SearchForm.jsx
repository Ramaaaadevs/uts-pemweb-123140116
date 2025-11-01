import React, { useState } from 'react';

// Menerima sebuah prop 'onSearch' dari App.jsx
function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah halaman reload
    
    // Validasi: jangan cari jika input kosong
    if (!query.trim()) {
      alert('Silakan masukkan judul atau penulis buku.');
      return;
    }
    
    onSearch(query); // Kirim 'query' ke App.jsx
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ketik judul buku atau penulis..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Cari
      </button>
    </form>
  );
}

export default SearchForm;