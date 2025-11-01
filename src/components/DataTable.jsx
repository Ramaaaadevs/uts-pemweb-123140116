import React from 'react';

// Menerima 'books' dan 'isLoading' sebagai props
function DataTable({ books, isLoading }) {

  // 1. Tampilkan status loading
  if (isLoading) {
    return <div className="loading-spinner">Sedang mengambil data...</div>;
  }

  // 2. Tampilkan jika tidak ada hasil
  if (books.length === 0) {
    return <div className="no-results">Belum ada data. Silakan lakukan pencarian.</div>;
  }

  // 3. Tampilkan tabel hasil
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Judul Buku</th>
            <th>Penulis (Author)</th>
            <th>Tahun Terbit Pertama</th>
            {/* Kolom Aksi untuk 'Reading List' akan ditambah di sini nanti */}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.key}>
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
                {book.author_name ? book.author_name.join(', ') : 'Penulis tidak diketahui'}
              </td>
              <td className="book-year">{book.first_publish_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;