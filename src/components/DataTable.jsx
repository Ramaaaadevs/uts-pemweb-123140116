import React from 'react';

// Terima props baru: 'onAdd' dan 'readingList'
function DataTable({ books, isLoading, onAdd, readingList }) {

  if (isLoading) {
    return <div className="loading-spinner">Sedang mengambil data...</div>;
  }
  if (books.length === 0) {
    return <div className="no-results">Belum ada data. Silakan lakukan pencarian.</div>;
  }

  // Buat helper set untuk mengecek buku duplikat dengan cepat
  const readingListKeys = new Set(readingList.map(book => book.key));

  return (
    <div className="table-container">
      <h2>Hasil Pencarian</h2>
      <table>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Judul Buku</th>
            <th>Penulis (Author)</th>
            <th>Tahun Terbit</th>
            <th>Aksi</th> {/* Tambah kolom header Aksi */}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            // Cek apakah buku ini sudah ada di reading list
            const isAdded = readingListKeys.has(book.key);

            return (
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
                  {book.author_name ? book.author_name.join(', ') : 'N/A'}
                </td>
                <td className="book-year">{book.first_publish_year}</td>
                
                {/* Tambah sel <td> untuk tombol Aksi */}
                <td className="action-cell">
                  <button 
                    className="action-button add"
                    onClick={() => onAdd(book)} // Panggil fungsi onAdd
                    disabled={isAdded} // Disable tombol jika 'isAdded' true
                  >
                    {isAdded ? 'Ditambahkan' : 'Tambah'}
                  </button>
                  {/*untuk tambah tombol 'detail' jika jadi (?) */}
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