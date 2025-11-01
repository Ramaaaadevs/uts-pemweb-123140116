import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import './App.css'; // Import file CSS untuk dark theme

function App() {
  // State untuk menampung istilah pencarian
  const [searchTerm, setSearchTerm] = useState('');
  
  // State untuk menampung hasil buku dari API
  const [books, setBooks] = useState([]);
  
  // State untuk status loading
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk error handling
  const [error, setError] = useState(null);

  // useEffect akan berjalan setiap kali 'searchTerm' berubah
  useEffect(() => {
    // Jangan jalankan API call jika searchTerm kosong
    if (!searchTerm) {
      setBooks([]); // Kosongkan hasil jika search dihapus
      return;
    }

    const fetchBooks = async () => {
      setIsLoading(true); // Mulai loading
      setError(null);     // Bersihkan error lama
      setBooks([]);       // Kosongkan hasil lama

      try {
        // Kita pakai API search, parameter 'q' untuk query umum (judul/penulis)
        // Kita batasi 20 hasil agar tidak terlalu berat
        const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}&limit=20`);
        
        if (!response.ok) {
          throw new Error('Respon jaringan tidak berhasil');
        }
        
        const data = await response.json();
        
        // Data buku ada di properti 'docs'
        setBooks(data.docs); 
        console.log(data.docs); // Cek console browser untuk lihat data mentahnya

      } catch (err) {
        setError(err.message);
        console.error("Gagal mengambil data:", err);
      } finally {
        setIsLoading(false); // Selesai loading, baik sukses atau gagal
      }
    };

    // Panggil fungsi fetch-nya
    fetchBooks();
    
  }, [searchTerm]); // <-- "Dependency array": useEffect ini bergantung pada searchTerm

  // Fungsi ini akan kita kirim sebagai prop ke SearchForm
  const handleSearch = (query) => {
    setSearchTerm(query); // Set state searchTerm, yang akan memicu useEffect
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <SearchForm onSearch={handleSearch} />
        {/* Tampilkan pesan error jika ada */}
        {error && <div className="error-message">Error: {error}</div>}
        <DataTable books={books} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;