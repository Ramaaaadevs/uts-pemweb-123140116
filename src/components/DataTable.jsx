import React, { useState } from 'react';

// Terima prop baru 'onShowDetail'
function DataTable({ books, isLoading, onAdd, readingList, onShowDetail }) {
  
  //LOGIKA FILTER
  // Buat untuk filter subject
  const [subjectFilter, setSubjectFilter] = useState('');

  // Terapkan filter ke 'books' prop SEBELUM di-map
  const filteredBooks = books.filter(book => {
    if (!subjectFilter.trim()) {
      return true; // Jika filter kosong, tampilkan semua
    }
    if (!book.subject) {
      return false; // Jika buku tidak punya subject, sembunyikan
    }
    
    // Cek miniml 1 subject di array...
    return book.subject.some(s => 
      // buat melakukan teks filter (case-insensitive)
      s.toLowerCase().includes(subjectFilter.toLowerCase())
    );
  });
  
  
  if (isLoading) {
    return <div className="loading-spinner">Sedang mengambil data...</div>;
  }
  
  // (tambahan untuk cek buku dulu sebelum buku terfilter)
  if (books.length === 0) {
    return <div className="no-results">Belum ada data. Silakan lakukan pencarian.</div>;
  }

  const readingListKeys = new Set(readingList.map(book => book.key));

  return (
    <div className="table-container">
      <h2>Hasil Pencarian</h2>
      
      {/* Render input untuk filter */}
      <input 
        type="text"
        placeholder="Filter berdasarkan subject (mis: fiction)..."
        className="filter-input"
        value={subjectFilter}
        onChange={(e) => setSubjectFilter(e.target.value)}
      />
      
      {/* Tampilkan pesan jika filter tidak menemukan hasil */}
      {filteredBooks.length === 0 && (
        <div className="no-results">Tidak ada buku yang cocok dengan filter subject.</div>
      )}

      <table>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Judul Buku</th>
            <th>Penulis (Author)</th>
            <th>Tahun Terbit</th>
            <th>Aksi</th>
          </tr>
        </thead>
        
        {/* Map menggunakan 'filteredBooks', bukan 'books' lagi */}
        <tbody>
          {filteredBooks.map((book) => {
            const isAdded = readingListKeys.has(book.key);

            return (
              <tr key={book.key}>
                {}
                <td>
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      alt={`Cover ${book.title}`}
                      className="book-cover"
                    />
                  ) : (
                    <span className="no-cover">Tidak Ada Cover</span>
                  )}
                </td>
                <td className="book-title">{book.title}</td>
                <td className="book-author">
                  {book.author_name ? book.author_name.join(', ') : 'N/A'}
                </td>
                <td className="book-year">{book.first_publish_year}</td>
                <td className="action-cell">
                  <button 
                    className="action-button add"
                    onClick={() => onAdd(book)}
                    disabled={isAdded}
                  >
                    {isAdded ? 'Ditambahkan' : 'Tambah'}
                  </button>
                  
                  {/*Update tombol Detail */}
                  <button 
                    className="action-button detail"
                    onClick={() => onShowDetail(book.key)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;