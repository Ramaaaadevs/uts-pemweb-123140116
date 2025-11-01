import React, { useState, useEffect } from 'react';

// Menerima 'bookKey' (misal: /works/OL1234W) dan 'onClose' (fungsi)
function DetailCard({ bookKey, onClose }) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect ini berjalan HANYA saat 'bookKey' berubah
  useEffect(() => {
    // Jangan fetch jika tidak ada key
    if (!bookKey) return;

    const fetchBookDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Kita panggil API 'works' untuk mendapat detail, termasuk deskripsi
        const response = await fetch(`https://openlibrary.org${bookKey}.json`);
        if (!response.ok) {
          throw new Error('Gagal mengambil detail buku');
        }
        const data = await response.json();
        setDetails(data);
        console.log("Detail Data:", data); // Cek console untuk lihat datanya

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookKey]); // <-- Dependency array

  // Helper untuk membersihkan format deskripsi
  const getDescription = () => {
    if (!details?.description) {
      return <p><i>Tidak ada deskripsi tersedia.</i></p>;
    }
    // Deskripsi bisa berupa string atau objek {value: "..."}
    return <p>{typeof details.description === 'string' ? details.description : details.description.value}</p>;
  };

  // Helper untuk menampilkan subject
  const getSubjects = () => {
    if (!details?.subjects || details.subjects.length === 0) {
      return <li>Tidak ada subject.</li>;
    }
    // Tampilkan 10 subject pertama saja
    return details.subjects.slice(0, 10).map((subject, index) => (
      <li key={index} className="subject-tag">{subject}</li>
    ));
  };

  return (
    // Modal Overlay (latar belakang gelap)
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal Content (kotak putih di tengah) */}
      {/* e.stopPropagation() mencegah modal tertutup saat diklik bagian putihnya */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        {isLoading && <div className="loading-spinner">Memuat detail...</div>}
        {error && <div className="error-message">{error}</div>}
        
        {details && (
          <>
            <h2>{details.title}</h2>
            
            <div className="detail-section">
              <h3>Deskripsi</h3>
              {getDescription()}
            </div>
            
            <div className="detail-section">
              <h3>Subject</h3>
              <ul className="subject-list">
                {getSubjects()}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailCard;