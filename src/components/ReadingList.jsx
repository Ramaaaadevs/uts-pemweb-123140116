import React from 'react';

// Menerima 'list' (array buku) dan 'onRemove' (fungsi) dari App.jsx
function ReadingList({ list, onRemove }) {
  return (
    <section className="reading-list-section">
      <h2>My Reading List ({list.length})</h2>
      {list.length === 0 ? (
        <p className="no-results">Reading list kamu masih kosong.</p>
      ) : (
        <div className="reading-list-container">
          {list.map((book) => (
            <div key={book.key} className="list-item-card">
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={`Cover ${book.title}`}
                  className="list-item-cover"
                />
              ) : (
                <div className="list-item-no-cover">?</div>
              )}
              <div className="list-item-details">
                <p className="list-item-title">{book.title}</p>
                <p className="list-item-author">
                  {book.author_name ? book.author_name.join(', ') : 'N/A'}
                </p>
              </div>
              <button className="remove-button" onClick={() => onRemove(book.key)} // Kirim 'key' unik buku untuk dihapus
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ReadingList;